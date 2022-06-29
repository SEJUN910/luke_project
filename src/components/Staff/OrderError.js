import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper, Grid, Button } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Dialog from '@mui/material/Dialog';
import { Table } from 'react-bootstrap';
import Moment from 'moment';


function OrderError(props) {

    const [open, setOpen] = useState(false);
    const [orderError, setOrderError] = useState([]);
    const [reload, setReload] = useState([]);

    const getOrderErrorList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getOrderErrorList"
            },
            { withCredentials: true }
        )
       .then((response) => 
       {if(response.data.success == true){setOrderError(response.data)}})
        } catch(e) { console.error(e.message) }
    };

    useEffect(() => {
        getOrderErrorList();
    },[reload]);

    return(
        <> 
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortManager" style={{height: '200px !important'}}>
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div  className="fw-bolder">결제오류</div>
                    {/* <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                            <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                    </IconButton> */}
                </div>
                {orderError.result && orderError.result.length > 0 &&
                    <div className="d-flex flex-column justify-content-between" style={{minHeight:'180px'}}>
                        <div className="p-2 mt-1">
                            <span className="text_m">결제오류:&nbsp;&nbsp;<b>{orderError.result.length}</b> 건</span>
                        </div>
                        <Button variant="outlined" className="m-auto" size="small">
                            <a href={orderError.result[0].confirm_link} target="_blank" style={{textDecoration:'none'}}>확인페이지로 이동</a>
                        </Button>
                        <div className="text_sm border-bottom pb-1 mb-1 text-end">{Moment().format('YYYY-MM-DD HH:mm')} 기준</div>
                    </div>
                ||
                    <div className="d-flex flex-column justify-content-between" style={{minHeight:'180px'}}>
                        <div className="p-2">
                            <div className="me-2">결제 오류 주문이 없습니다.</div>
                        </div>
                        <IconButton variant="outlined" className="p-2 mx-auto" onClick={()=>setReload(new Date())}>
                                <RefreshOutlinedIcon sx={{fontSize: '35px'}}></RefreshOutlinedIcon>
                        </IconButton>
                
                        <div className="text_sm border-bottom pb-1 mb-1 text-end">{Moment().format('YYYY-MM-DD HH:mm:ss')} 기준</div>
                    </div>
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
                            {/* {
                            history.result && history.result.list.length > 0 &&
                            history.result.list.map(Lists=> (
                                <tr key={Lists.no} className="text_sm">
                                    <td className="text-nowrap">
                                        <a href="#" style={{textDecoration: 'none'}} className="text_sm" onClick={() => window.open(order_link+Lists.order_no, "_blank", "width = 1300, height = 1000")}>{Lists.order_no}</a>                   
                                    </td>
                                    <td className="text-nowrap">2022-04-29 00:00:00</td>
                                    <td>{Lists.contents}</td>             
                                </tr>
                            ))} */}
                        </tbody>
                    </Table>
                </Paper>
            </Grid>
        </Dialog>
        </>
    )
}

export default OrderError;