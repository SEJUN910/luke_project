import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper, Grid } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Dialog from '@mui/material/Dialog';
import { Table } from 'react-bootstrap';
import Moment from 'moment';


function MyHistoryList(props) {

    const [open, setOpen] = useState(false);
    const [history, setHistory] = useState([]);
    const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no=";
    const year = new Date().getFullYear();
    const getHistoryOrderRecordList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getHistoryOrderRecordList",
                "page": 1,
                "count": 10
            },
            { withCredentials: true }
        )
       .then((response) => setHistory(response.data))
        } catch(e) { console.error(e.message) }
    };

    useEffect(() => {
        getHistoryOrderRecordList();
    },[]);


    let today = [];


    return(
        <> 
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortPersonal" style={{height: '200px !important'}}>
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="fw-bolder">My 히스토리</div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                            <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                    </IconButton>
                </div>

                    {
                    history.result && history.result.list && history.result.list.length > 0 &&
                    <div style={{height:'180px'}} className="d-flex flex-column justify-content-between">
                        <div>
                            
                            {history.result.list.slice(0,1).map(Lists=> (
                                <div key={Lists.no} className="text_m mt-2">
                                    <div className="d-flex flex-row align-items-center">
                                        <span className="text_s">마지막 히스토리</span>
                                        <ArrowRightIcon fontSize="small"></ArrowRightIcon>
                                        <a href="#" style={{textDecoration: 'none'}} className="text_sm" onClick={() => window.open(order_link+Lists.order_no, "_blank", "width = 1300, height = 1000")}>{Lists.order_no}</a>                   
                                    </div>
                                    <div className="mt-1">{Lists.contents.length < 35 && Lists.contents || Lists.contents.substr(0,35)+'...'}</div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex flex-column mt-3 pt-1 border-top text_sm">
                            <Grid container className="d-flex align-items-center">
                                <Grid item xs={3}>{year}년</Grid>
                                <Grid item xs={2}><ArrowRightIcon></ArrowRightIcon></Grid>
                                <Grid item xs={7}>{history.result.total} 개</Grid>                   
                            </Grid>
                            <Grid container className="d-flex align-items-center">
                            <Grid item xs={3}>오늘</Grid>
                            <Grid item xs={2}><ArrowRightIcon></ArrowRightIcon></Grid>
                            <Grid item xs={7}>
                                {history.result.total > 0 && history.result.list.map(Lists => {(Lists.reg_date >= Moment().format('YYYY-MM-DD 00:00:00') && Lists.reg_date <= Moment().format('YYYY-MM-DD 23:59:59')) && today.push(Lists.no)})}
                                {today.length} 개
                            </Grid>                   
                            </Grid>
                        </div>
                    </div>
                    ||  <div className="mt-2">작성된 히스토리가 없습니다.</div>
                    }

            </Paper>
        </Grid>
        <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
            <Grid item xs={12}>
                <Paper elevation={3} className="p-3" >
                    <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div>나의 히스토리</div>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                        </IconButton>
                    </div>
                    <Table striped bordered hover className="text_sm mt-2">
                        <thead>
                            <tr>
                                <th>주문번호</th>
                                <th>작성시각</th>
                                <th>내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                            history.result && history.result.list.length > 0 &&
                            history.result.list.map(Lists=> (
                                <tr key={Lists.no} className="text_sm">
                                    <td className="text-nowrap">
                                        <a href="#" style={{textDecoration: 'none'}} className="text_sm" onClick={() => window.open(order_link+Lists.order_no, "_blank", "width = 1300, height = 1000")}>{Lists.order_no}</a>                   
                                    </td>
                                    <td className="text-nowrap">2022-04-29 00:00:00</td>
                                    <td>{Lists.contents}</td>             
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Paper>
            </Grid>
        </Dialog>
        </>
    )
}


// MyHistoryList.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     opening: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };

export default MyHistoryList;