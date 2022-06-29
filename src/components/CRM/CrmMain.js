import React, { useState, useCallback, useEffect } from 'react';
import CrmList from './CrmList';
import CrmHistory from './CrmHistory';
import { Dialog, Paper, Grid, Tooltip } from '@mui/material';
import axios from 'axios';
import { CRMAPI } from '../../items/URL';

import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Moment from 'moment';
import gplogo from '../../items/image/gp_logo.png';
import { Form } from 'react-bootstrap';


function CrmMain(props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [crmGodp, setCrmGodp] = useState([]);
    const [crmMall, setCrmMall] = useState([]);
    const [reload, setReload] = useState([]);
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(
        ()=> localStorage.getItem("crmTime") || 300000);

    const getQnaNoReplyListGodp = useCallback(async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getQnaNoReplyList",
                "service": "godp",
                "start_date": Moment().subtract(2, "weeks").format('YYYY-MM-DD HH:mm:ss'),
                "end_date": Moment().format('YYYY-MM-DD HH:mm:ss'),
                "limit": 9999
            },
            { withCredentials: true }
        )
        .then((response) => response.data.success == true && setCrmGodp(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
       },[])

    const getQnaNoReplyListMall = useCallback(async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getQnaNoReplyList",
                "service": "mall",     
                "start_date": Moment().subtract(2, "weeks").format('YYYY-MM-DD HH:mm:ss'),
                "end_date": Moment().format('YYYY-MM-DD HH:mm:ss'),
                "limit": 9999
            },
            { withCredentials: true }
        )
        .then((response) => response.data.success == true && setCrmMall(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
        },[])

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

    let notice = `CRM문의 > 갓피플 ${crmGodp.result && crmGodp.result.qna_total}건 / 몰 ${crmMall.result && crmMall.result.qna_total}건`
    const triggerNotif = showNotification("CRM 알림", {
        body: notice,
        icon: gplogo
    });
    
    useEffect(()=>{
        getQnaNoReplyListGodp();
        getQnaNoReplyListMall();        
    },[reload, count]);

    useEffect(()=>{
        if (count <= 36){ 
            setTimeout(()=>setCount(count+1), time);
        }
        count > 0 && triggerNotif();
    },[count]);

    const crmTimeSave = (e) => {
        setTime(e.target.value);
        setOpenTime(false);
        window.location.reload();
    }

    useEffect(()=>{
        localStorage.setItem("crmTime", time);
    },[time])

    let cs = []; let md = [];
    let app = []; let notapp = [];

	return(
        <>
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortCS">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="fw-bolder">CRM</div>
                    <div>
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
                                <div className="pb-2 text_m text-secondary">설정한 시간마다 CRM 알림이 발송되며, 설정한 시간은 브라우저에 저장됩니다.</div>
                                <Form.Select value={time} onChange={crmTimeSave}>
                                    <option value="5000">5초(테스트용)</option>
                                    <option value="300000">3분</option>
                                    <option value="400000">4분</option>
                                    <option value="500000">5분</option>
                                    <option value="1000000">10분</option>
                                    <option value="99999999">종료</option>
                                </Form.Select>
                            </div>
                        </Dialog>
                        <IconButton variant="outlined" size="small" className="border me-2" onClick={()=>setReload(new Date())}>
                            <RefreshOutlinedIcon sx={{fontSize: '17px'}}></RefreshOutlinedIcon>
                        </IconButton>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                            <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                        </IconButton>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between" style={{minHeight:'180px'}}>
                    <div className="p-2 mt-1">
                        <div>
                            <div className="text_m">갓피플</div>
                            <div className="text_sm mt-1 d-flex flex-row align-items-center">
                                <ArrowRightIcon size="small"></ArrowRightIcon><b>{crmGodp.result && crmGodp.result.qna_total}</b>&nbsp;건             
                                {crmGodp.result && crmGodp.result.qna_list.map(Lists=>{
                                    (Lists.category.startsWith('U')) ? app.push(Lists.q_no) : notapp.push(Lists.q_no)})}
                                <span className="ms-3">(App:&nbsp;<b>{app.length}</b>건&nbsp;/&nbsp;기타:&nbsp;<b>{notapp.length}</b>건)</span>
                            </div>
                        </div>
                        <div>
                            <div className="text_m">갓피플몰</div>
                            <div className="text_sm mt-1 d-flex flex-row align-items-center">
                                <ArrowRightIcon size="small"></ArrowRightIcon><b>{crmMall.result && crmMall.result.qna_total}</b>&nbsp;건
                                {crmMall.result && crmMall.result.qna_list.map(Lists => { 
                                (Lists.category === '상품문의') ? md.push(Lists.q_no) : cs.push(Lists.q_no)})}
                                <span className="text_sm ms-1">(섬김이:&nbsp;<b>{cs.length}</b>건&nbsp;/&nbsp;상품문의:&nbsp;<b>{md.length}</b>건)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text_sm pb-1 mb-1 text-end">{Moment().format('YYYY-MM-DD HH:mm:ss')} 기준</div>
                </div>
            </Paper>
        </Grid>
        <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
            <Grid item xs={12}>
                <Paper elevation={3} className="p-3">
                    <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div>CRM</div>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                        </IconButton>
                    </div>
                    <CrmList></CrmList>
                </Paper>
            </Grid>
        </Dialog>
        </>
    )
}

export default CrmMain;