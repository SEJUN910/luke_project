import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from 'axios';
import { CRMAPI, GKCAPI } from '../../items/URL';
import staffStyle from '../../style/css/staff.module.css';
import { Paper, Grid,Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ForwardToInboxOutlinedIcon from '@mui/icons-material/ForwardToInboxOutlined';
import OutboxOutlinedIcon from '@mui/icons-material/OutboxOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Dialog from '@mui/material/Dialog';
import { Table, Form } from 'react-bootstrap';
import Moment from 'moment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import gplogo from '../../items/image/gp_logo.png';

function StaffMessage(props) {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const [check, setCheck] = useState(0);
    const [receiver, setReceiver] = useState([]);
    const [reason, setReason] = useState('요청');
    const [message, setMessage] = useState([]);
    const [reasonOpen, setReasonOpen] = useState(false);
    const [sendOpen, setSendOpen] = useState(false);
    const [askOpen, setAskOpen] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [no, setNo] = useState([]);
    const [count, setCount] = useState([]);
    const [count2, setCount2] = useState(0);
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState(
        ()=> localStorage.getItem("messageTime") || 3000000);

    const startDate = Moment().subtract(30, 'days').format('YYYY-MM-DD');
    const endDate = Moment().format('YYYY-MM-DD');
 
    const createStaffMessagesJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "createStaffMessagesJson",
                "receiver": receiver,
                "message" : message,
                "reason" : reason
            },
            { withCredentials: true }
        )
       .then((response) => response.data.success === true && alert('메세지 등록에 성공했습니다.'))
        } catch(e) { console.error(e.message); alert('등록에 실패했습니다.') }
        setLoading(false);
        setSendOpen(false);
        setReceiver([]);
        setMessage([]);
    };

    const getStaffMessagesList = useCallback(async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getStaffMessagesList",
                "check": check,
                "start_date": startDate,
                "end_date": endDate
            },
            { withCredentials: true }
        )
       .then((response) => response.data.success === true && response.data.result.message_list && setMessageList(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    },[check, count]);

    const get_godstaff_list = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            GKCAPI,
            {
                "task": "get_godstaff_list"
            },
            { withCredentials: true }
        )
       .then((response) => response.data.success === true && setStaffList(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    };

    const changeStaffMessagesCheckJson = async (no) => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeStaffMessagesCheckJson",
                "no": no
            },
            { withCredentials: true }
        )
       .then((response) => alert('요청이 완료처리되었습니다.'))
        } catch(e) { console.error(e.message) }
        setLoading(false);
        setCount(new Date());
    };

    const changeStaffMessagesReasonJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeStaffMessagesReasonJson",
                "no": no,
                "reason": reason
            },
            { withCredentials: true }
        )
       .then((response) => alert('등록이 완료처리되었습니다.'))
        } catch(e) { console.error(e.message) }
        setLoading(false);
        setReasonOpen(false);
        setReason([]);
    };
    

    let asking = [];
    let doing = [];
    let userName = [];

    messageList && messageList.result 
    && messageList.result.message_list.map(Lists => 
    {
        userName = messageList.result.user;
        Lists.sender === userName && Lists.check === '0' && asking.push(Lists.no);
        Lists.receiver === userName && Lists.check === '0' && doing.push(Lists.no);
    }
    )

    const showNotification = (title, options) => {
        if (!("Notification" in window)) {
          return;
        }
      
        const fireNotif = () => {
            /* 권한 요청 부분 */
            if (Notification.permission !== "granted") {
                Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                /* 권한을 요청받고 nofi를 생성해주는 부분 */
                new Notification(title, options);
                } else {
                return;
                }
            });
            } else {
            /* 권한이 있을때 바로 noti 생성해주는 부분 */
            new Notification(title, options);
            }
        };
        return fireNotif;
    };

    const triggerNotif = showNotification("메세지알림", {
        body:
        `
        요청미처리: ${asking.length}건 / 수신미처리: ${doing.length}건
        `,
        icon: gplogo
    });

    useEffect(()=>{
        get_godstaff_list();
    },[])

    const crmTimeSave = (e) => {
        setTime(e.target.value);
        setOpenTime(false);
        window.location.reload();
    }

    useEffect(()=>{
        if (count <= 36){ 
            setTimeout(()=>setCount2(count2+1), time);
        }
        count2 > 0 && asking.length > 0 && triggerNotif();
    },[count2]);

    useEffect(() => {
        getStaffMessagesList();
    },[check, count]) 
    
    useEffect(()=>{
        localStorage.setItem("messageTime", time);
    },[time])

    return(
        <> 
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortPersonal" style={{height: '200px !important'}}>
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="d-flex flex-row align-items-center">
                        <div className="fw-bolder">메시지</div>
                        <div className="text_sm text-secondary ms-2">
                            (미확인건수:&nbsp;<b>{asking.length}</b>건)
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center">
                        <Tooltip title="알람 타이머">
                            <IconButton variant="outlined" size="small" className="border me-2" onClick={()=>setOpenTime(true)}>
                                <AccessAlarmIcon sx={{fontSize: '17px'}}></AccessAlarmIcon>
                            </IconButton>
                        </Tooltip>
                        <Dialog open={openTime} onClose={()=> setOpenTime(false)}>
                            <div className="p-4">
                                <h5 className="border-bottom pb-2 d-flex flex-row justify-content-between">
                                    <div>타이머설정</div>
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenTime(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h5>
                                <div className="pb-2 text_m text-secondary">설정한 시간마다 메세지 알림이 발송되며, 설정한 시간은 브라우저에 저장됩니다.</div>
                                <Form.Select value={time} onChange={crmTimeSave}>
                                    <option value="1000000">10분</option>
                                    <option value="3000000">30분</option>
                                    <option value="10000000">1시간</option>
                                    <option value="999999999">종료</option>
                                </Form.Select>
                            </div>
                        </Dialog>
                        <IconButton variant="outlined" size="small" className="border me-2" onClick={()=>setCount(new Date())}>
                            <RefreshOutlinedIcon sx={{fontSize: '17px'}}></RefreshOutlinedIcon>
                        </IconButton>
                    </div>
                </div>
                <div className="d-flex flex-column align-items-center">
                    <div className="d-flex justify-content-center">
                        <Tooltip title="메세지 보내기">
                            <IconButton className="d-flex flex-column" onClick={()=>setSendOpen(true)}>
                                <ForwardToInboxOutlinedIcon style={{fontSize: '80px'}}></ForwardToInboxOutlinedIcon>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="d-flex flex-row gap-4">
                            <IconButton className={staffStyle.Message_doingCount} data-count={doing.length} onClick={()=>setAskOpen(true)}>
                                <OutboxOutlinedIcon style={{fontSize: '40px'}}></OutboxOutlinedIcon>
                                <div className="text_l fw-bolder">요청함</div>
                            </IconButton>
                            <IconButton className={staffStyle.Message_askingCount} data-count={asking.length} onClick={()=>setOpen(true)}>
                                <ArchiveOutlinedIcon style={{fontSize:'40px'}}/>
                                <div className="text_l fw-bolder">수신함</div>
                            </IconButton>
                        </div>
                    </div>   
                </div>
            </Paper>
        </Grid>
        <Dialog open={sendOpen} onClose={()=>setSendOpen(false)} fullWidth={true} maxWidth="sm">
            <div className="p-4">
                <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom mb-3 pb-2 ms-1">
                    <div className="d-flex flex-row align-items-center">
                        <span>메시지보내기</span>
                    </div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setSendOpen(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <div className="p-1">받는사람</div>  
                        <Form.Select className="text_m" value={receiver} onChange={(e)=> setReceiver(e.target.value)}>
                            <option value="" disabled style={{display: 'none'}}>선택하세요</option>
                            {staffList.list && staffList.list.map(Lists => {
                                return(
                                    <option key={Lists[0]} value={Lists[0]}>{Lists[1]}&nbsp;{Lists[2]}</option>
                                )
                            })}
                        </Form.Select>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="p-1">메세지</div>
                        <Form.Control as="textarea" style={{height: '150px'}} value={message} onChange={(e)=> setMessage(e.target.value)}/>
                    </Grid>
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}><Button variant="contained" onClick={()=> createStaffMessagesJson()}>보내기</Button></Grid>
                </Grid>
            </div>
        </Dialog>

        {/* 요청함 */}
        <Dialog onClose={()=>setAskOpen(false)} open={askOpen} fullWidth={true} maxWidth="lg">
            <Grid className="p-3">                
                <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom mb-3 pb-2 ms-1">
                    <div className="d-flex flex-row align-items-center">
                        <span>메시지목록</span>
                    </div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setAskOpen(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Paper elevation={3} className="p-3 mb-4" >
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <span>요청함</span>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={check}
                                onChange={(e)=>setCheck(e.target.value)}
                                className="d-flex flex-row"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="완료" />
                                <FormControlLabel value="0" control={<Radio />} label="미처리"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Table striped bordered hover className="text_sm mt-2">
                        <thead>
                            <tr>
                                <th className="text-center">상태</th>
                                <th className="text-center">받는사람</th>
                                <th className="text-center">보낸시각</th>
                                <th className="text-center">메세지</th>
                                <th className="text-center">비고</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messageList.result && messageList.result.message_list && messageList.result.message_list.map(Lists => {
                                    return(
                                        <React.Fragment key={Lists.no}>
                                            {
                                                messageList.result.user === Lists.sender &&
                                                    <tr className="col">
                                                        {Lists.check === '0' && <td className="col-1 text-white text-nowrap text-center fw-bolder bg-danger">미처리</td>}
                                                        {Lists.check === '1' && <td className="col-1 text-white text-nowrap text-center fw-bolder bg-primary">완료</td>}
                                                        <td className="col-1 text-center">{Lists.receiver}</td>
                                                        <td className="col-2 text-center">{Lists.rdate}</td>
                                                        <td className="col-6">{Lists.message}</td>
                                                        <td className="col-2">
                                                            {Lists.reason === '요청' && <div>전송완료</div>}
                                                            {Lists.reason !== '요청' && 
                                                                <div>
                                                                    <span className="fw-bolder rounded px-1" style={{color:'purple', border:'1px solid purple'}}>보류사유</span>
                                                                    <div>{Lists.reason}</div>
                                                                </div>}
                                                        </td>
                                                    </tr>
                                                ||  <tr></tr>
                                            }
                                        </React.Fragment>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Paper>
            </Grid>
        </Dialog>

        {/* 수신함 */}
        <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="lg">
            <Grid className="p-3">                
                <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom mb-3 pb-2 ms-1">
                    <div className="d-flex flex-row align-items-center">
                        <span>메시지목록</span>
                    </div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Paper elevation={3} className="p-3 mb-4" >
                    <div className="d-flex flex-row align-items-center justify-content-between">
                        <span>체크리스트</span>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={check}
                                onChange={(e)=>setCheck(e.target.value)}
                                className="d-flex flex-row"
                            >
                                <FormControlLabel value="1" control={<Radio />} label="완료" />
                                <FormControlLabel value="0" control={<Radio />} label="미처리"/>
                            </RadioGroup>
                        </FormControl>
                    </div>
                    <Table striped bordered hover className="text_sm mt-2">
                        <thead>
                            <tr>
                                <th className="text-center">상태</th>
                                <th className="text-center">보낸사람</th>
                                <th className="text-center">보낸시각</th>
                                <th className="text-center">메세지</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                messageList.result && messageList.result.message_list && messageList.result.message_list.map(Lists => {
                                    return(
                                        <React.Fragment key={Lists.no}>
                                            {
                                                messageList.result.user === Lists.receiver &&
                                                    <tr className="col" key={Lists.no}>
                                                        {Lists.check === '0' && <td className="col-1 text-white text-nowrap text-center fw-bolder bg-danger">미처리</td>}
                                                        {Lists.check === '1' && <td className="col-1 text-white text-nowrap text-center fw-bolder bg-primary">완료</td>}
                                                        <td className="col-1 text-center">{Lists.sender}</td>
                                                        <td className="col-2 text-center">{Lists.rdate}</td>
                                                        <td className="col-6">{Lists.message}</td>
                                                        <td className="col-2">
                                                            {Lists.check === '0' &&
                                                            <>
                                                            <div className="d-flex flex-row gap-3 justify-content-center">
                                                                <Button variant="contained" size="small" onClick={()=>changeStaffMessagesCheckJson(Lists.no)}>확인</Button>
                                                                <Button variant="contained" size="small" color="secondary" onClick={()=> {setReasonOpen(true); setNo(Lists.no); setReason(Lists.reason);}}>보류</Button>
                                                            </div>
                                                            {Lists.reason !== '요청' && 
                                                            <div className="mt-2 ms-3">
                                                                <span className="fw-bolder rounded px-1" style={{color:'purple', border:'1px solid purple'}}>작성한 보류사유</span>
                                                                <div>{Lists.reason}</div>
                                                            </div>}
                                                            </>}
                                                            {Lists.check === '1' && <div>요청처리완료</div>}
                                                        </td>
                                                    </tr>
                                            }
                                        </React.Fragment>
                                    )
                                }) 
                            }
                        </tbody>
                    </Table>
                </Paper>
            </Grid>
        </Dialog>

        {/* 보류메세지 */}
        <Dialog open={reasonOpen} onClose={()=>{setReasonOpen(false); setNo([]); setReason('요청');}}>
            <div className="p-4 d-flex flex-column">
                <div className="p-2 d-flex align-items-center me-1">
                    보류사유작성
                    <Tooltip title="보류사유는 상대방이 볼 수 있습니다.">
                        <IconButton>
                        <HelpOutlineIcon className="text-secondary" style={{fontSize:'20px'}}></HelpOutlineIcon>
                        </IconButton>
                    </Tooltip>
                </div>
                <FormControl as="textarea" className="border rounded p-2" value={reason} onChange={(e)=>setReason(e.target.value)} style={{width: '500px', height:'150px'}}></FormControl>
                <Button variant='contained' className="mt-3" onClick={()=>changeStaffMessagesReasonJson()}>등록하기</Button>       
            </div>
        </Dialog>
        </>
    )
}

export default StaffMessage;