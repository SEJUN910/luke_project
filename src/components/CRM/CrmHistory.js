import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Divider, Dialog, Paper, MenuList, MenuItem, ListItemText, ListItemIcon, Typography, Popover, Grid ,Button, TextField, Stack, AccordionSummary, AccordionDetails, Accordion, CircularProgress} from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { CRMAPI } from '../../items/URL';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CrmStyle from '../../style/css/CrmStyle.module.css';
import Global from '../../style/css/Global.module.css';
import Moment from 'moment';

// 이용중인 페이지 -> InfoOrder.js

function CrmHistory(props) {
    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState("crm_history");
    const [loading, setLoading] = useState(false);
    const [service, setService] = useState("");
    const [userQna, setUserQna] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [ansOpen, setAnsOpen] = useState(false);
    const user_n = props.user_n;
    const start_date = '2004-01-01 00:00:00';

    const toggleAns = (q_no) => {
        setAnsOpen( ansOpen === q_no ? false : q_no);
       }
    
    const getUserQnaList = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
        CRMAPI,
        {
            "task": "getQnaList",
            "keyword" : user_n,
            "findway": 'user_n',
            "start_date" : start_date,
            "end_date" : Moment().format('YYYY-MM-DD HH:mm:ss'),
            "service": service,
            "limit": 999
        },
        { withCredentials: true }
        )
        .then((response) => response.data.success == true && setUserQna(response.data))
        } catch(e) { console.error(e.message) }
        setTimeout(()=>setLoading(false), 500);
   }

   const getFaqCategoryList = async () => {
    setLoading(true);
    try{
    const response = await axios.post
    (
        CRMAPI,
        {
            "task": "getFaqCategoryList",
        },
        { withCredentials: true }
    )
    .then((response) => response.data.success == true && setCategoryList(response.data))
    } catch(e) { console.error(e.message) }
    setLoading(false);
   }

   useEffect(()=>{
        getUserQnaList();
   },[user_n, service, props])

   useEffect(()=>{
    getFaqCategoryList();
   },[])

    return(
        <>
            <Grid item xs={6} className={CrmStyle.CrmHistoryBox}>
                <Paper elevation={3} className="p-2" style={{ minHeight: '90%', background: '#efebe9'}}>
                    <div className="bg-white rounded p-2 shadow-sm">
                        <div className="py-1 ms-2 mb-2 border-bottom fw-bolder w-25">문의히스토리</div>
                        <Grid container className="d-flex align-items-center">
                            {/* <Grid item xs={6}>
                                <FormControl>
                                    <RadioGroup row className="ms-2">
                                        <FormControlLabel control={<Radio size="small" />} label="전체"  value="" checked={service === 'godp'} onClick={ () => setService("")}/>
                                        <FormControlLabel control={<Radio size="small" />} label="갓피플"  value="godp" checked={service === 'godp'} onClick={ () => setService('godp')}/>
                                        <FormControlLabel control={<Radio size="small"/>} label="갓피플몰" value="mall" checked={service === 'mall'} onClick={ () => setService('mall')}/>
                                    </RadioGroup>
                                </FormControl>
                            </Grid> */}
                            <Grid item xs={12}>
                                { loading !== true && userQna.result && userQna.result.qna_total > 0 &&
                                    <div className="d-flex flex-row text_sm fw-bolder ms-2">
                                        <div className="text-dark">{userQna.result.qna_list[0].name} / {userQna.result.qna_list[0].user_id} 님의 히스토리</div>
                                    </div>
                                }   
                            </Grid>
                        </Grid>
                    </div>
                    { loading === true && 
                        <div className="d-flex align-items-center justify-content-center">
                            <CircularProgress></CircularProgress>
                        </div>
                    }
                    { loading == false && userQna.result && userQna.result.qna_total != 0 &&
                        userQna.result.qna_list.map(Lists => {
                            return (                                       
                                <React.Fragment key={Lists.q_no}>
                                {
                                    <div className="text_m bg-white mt-2 border rounded">
                                        <Accordion expanded={ansOpen === Lists.q_no}>
                                            <div className="d-flex flex-column p-2">
                                                <div className="d-flex gap-1 flex-wrap text_sm">
                                                    {Lists.adate == '0000-00-00 00:00:00' && Lists.hide == 0 && <div className="text-white px-1 bg-danger rounded">미답변</div>}
                                                    {Lists.adate !== '0000-00-00 00:00:00' && Lists.hide == 0 && <div className="text-white px-1 bg-primary rounded">답변완료</div>}
                                                    {Lists.adate == '0000-00-00 00:00:00' && Lists.hide == 1 && <><div className="text-white px-1 rounded" style={{ background: '#e8873c'}}>삭제</div><div className="text-white px-1 bg-danger rounded">미답변</div></>}
                                                    {Lists.adate !== '0000-00-00 00:00:00' && Lists.hide == 1 && <><div className="text-white px-1 rounded" style={{ background: '#e8873c'}}>삭제</div><div className="text-white px-1 bg-primary rounded">답변완료</div></>}
                                                    {Lists.service === 'godp' &&
                                                    <>
                                                    <div className="text-success px-1 border border-success rounded">갓피플</div>
                                                    { categoryList.result &&
                                                        categoryList.result.map(Cates => {
                                                        if(Cates.category_id === Lists.category){ return (<div className="add_bar text-nowrap" key={Cates.category_id}>{Cates.category_name}</div>)}
                                                    })}
                                                    </>
                                                    }
                                                    {Lists.service === 'mall' && 
                                                    <>
                                                    <div className="text-primary px-1 border border-primary rounded">갓피플몰</div>
                                                    <div className="add_bar">{Lists.category}</div>
                                                    </>
                                                    }
                                                    
                                                    <div className="add_bar text-secondary">{Lists.rdate}</div>
                                                    {Lists.order_no && <div className="text-secondary">{Lists.order_no}</div> || <div className="add_bar text-secondary">주문번호 없음</div>}
                                                </div>
                                                <div className="d-flex flex-row">
                                                    <Grid container className="mt-2">
                                                        <Grid item xs={12} className="d-flex flex-row align-items-center gap-2">
                                                            <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                                            <Typography
                                                            aria-owns={open ? 'mouse-over-popover' : undefined}
                                                            aria-haspopup="true"
                                                            >
                                                                <span className="text_sm">{Lists.subject}</span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography sx={{ p: 1 }}>
                                                                <span className="text_sm"><div dangerouslySetInnerHTML={{__html:Lists.question}}></div></span>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={9}></Grid>
                                                        <Grid item xs={2}>
                                                            {Lists.adate == '0000-00-00 00:00:00' && <Button variant="outlined" color="error" className="py-0 mb-2 text-nowrap">미답변</Button>
                                                            || <Button variant="outlined" color="primary" className="py-0 mb-2 text-nowrap" onClick={()=> toggleAns(Lists.q_no)}>답변확인</Button>}
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>
                                            <AccordionDetails>
                                                <div className="border rounded p-2 text_sm" contentEditable="true" style={{minHeight: '150px'}}>
                                                    <div dangerouslySetInnerHTML={{__html:Lists.answer}}></div>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                } 
                                </React.Fragment>
                            )
                        })
                    }
                    { loading !== true && userQna.result && userQna.result.qna_total == 0 && <div className="p-2">이전 히스토리가 없습니다.</div>}
                    
                </Paper>
            </Grid>
        </>
    )
}


export default CrmHistory;