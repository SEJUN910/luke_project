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
            /* ?????? ?????? ?????? */
            if (Notification.permission !== "granted") {
                Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                /* ????????? ???????????? nofi??? ??????????????? ?????? */
                new Notification(title, options);
                } else {
                return;
                }
            });
            } else {
            /* ????????? ????????? ?????? noti ??????????????? ?????? */
            new Notification(title, options);
            }
        };
        return fireNotif;
    };

    let notice = `CRM?????? > ????????? ${crmGodp.result && crmGodp.result.qna_total}??? / ??? ${crmMall.result && crmMall.result.qna_total}???`
    const triggerNotif = showNotification("CRM ??????", {
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
                        <Tooltip title="?????? ?????????">
                            <IconButton variant="outlined" size="small" className="border me-2" onClick={()=>setOpenTime(true)}>
                                <AccessAlarmIcon sx={{fontSize: '17px'}}></AccessAlarmIcon>
                            </IconButton>
                        </Tooltip>
                        <Dialog open={openTime} onClose={()=> setOpenTime(false)}>
                            <div className="p-4">
                                <h5 className="border-bottom pb-2 d-flex flex-row justify-content-between">
                                    <div>???????????????</div>
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenTime(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h5>
                                <div className="pb-2 text_m text-secondary">????????? ???????????? CRM ????????? ????????????, ????????? ????????? ??????????????? ???????????????.</div>
                                <Form.Select value={time} onChange={crmTimeSave}>
                                    <option value="5000">5???(????????????)</option>
                                    <option value="300000">3???</option>
                                    <option value="400000">4???</option>
                                    <option value="500000">5???</option>
                                    <option value="1000000">10???</option>
                                    <option value="99999999">??????</option>
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
                            <div className="text_m">?????????</div>
                            <div className="text_sm mt-1 d-flex flex-row align-items-center">
                                <ArrowRightIcon size="small"></ArrowRightIcon><b>{crmGodp.result && crmGodp.result.qna_total}</b>&nbsp;???             
                                {crmGodp.result && crmGodp.result.qna_list.map(Lists=>{
                                    (Lists.category.startsWith('U')) ? app.push(Lists.q_no) : notapp.push(Lists.q_no)})}
                                <span className="ms-3">(App:&nbsp;<b>{app.length}</b>???&nbsp;/&nbsp;??????:&nbsp;<b>{notapp.length}</b>???)</span>
                            </div>
                        </div>
                        <div>
                            <div className="text_m">????????????</div>
                            <div className="text_sm mt-1 d-flex flex-row align-items-center">
                                <ArrowRightIcon size="small"></ArrowRightIcon><b>{crmMall.result && crmMall.result.qna_total}</b>&nbsp;???
                                {crmMall.result && crmMall.result.qna_list.map(Lists => { 
                                (Lists.category === '????????????') ? md.push(Lists.q_no) : cs.push(Lists.q_no)})}
                                <span className="text_sm ms-1">(?????????:&nbsp;<b>{cs.length}</b>???&nbsp;/&nbsp;????????????:&nbsp;<b>{md.length}</b>???)</span>
                            </div>
                        </div>
                    </div>
                    <div className="text_sm pb-1 mb-1 text-end">{Moment().format('YYYY-MM-DD HH:mm:ss')} ??????</div>
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