import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { numName } from '../../items/Functions';
import { Table, Form } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import { Paper, Grid, Button, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
 
function CSLiveCall() {
    const [count, setCount] = useState(0);
    const [info, setInfo] = useState([]);

    const getTelConsultingList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getTelConsultingList"
            },
            { withCredentials: true }
        )
       .then((response) => setInfo(response.data))
        } catch(e) { console.error(e.message) }
    };
    useEffect(() => {    
        getTelConsultingList();
    },[count]);

    const CallList =
    info.result &&
        info.result.slice(0).reverse().map(Calls => {
            const list = JSON.parse(Calls.user_info);
            const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no=";
            const order_no = (list.orders) ? list.orders.order_no : '';
            const order_others = (list.orders) ? list.orders.ord_name+' / '+list.orders.rcv_name+' / '+list.orders.rcv_addr : '';
            const purch = (list.purch) ? list.purch.purch_name : '';
            const sian = (list.sian) ? list.sian : '';

            return (
                <tr key={Calls.no}>
                    <td className="p-2">
                        <div className="border-bottom">
                            <span className="add_bar fw-bolder">수신</span>
                            <span>{numName(Calls.inbound)}</span>
                        </div>
                        <div className="text-nowrap  d-flex flex-row align-items-center">
                            <span className="add_bar">발신</span>
                            <span>{numName(Calls.outbound)}</span>
                        </div>
                    </td>
                    <td>
                        <div className="text-nowrap my-2 d-flex align-items-center">
                            {Calls.reg_date}
                        </div>
                    </td>
                    <td>
                        {order_no &&
                        <div className="text_sm">
                            <a href="#" style={{textDecoration: 'none'}} onClick={() => window.open(order_link+order_no, "_blank", "width = 1300, height = 1000")}>{order_no}</a>&nbsp;/&nbsp;
                            {order_others}
                        </div>
                        }
                        {purch && 
                        <span>{purch}</span>}
                        {sian &&
                        <span>{sian}</span>}
                    </td>
                </tr>
            )
        })

    return (
        <>
        <Grid style={{maxHeight: '80vh', overflow: 'auto'}}>
            <Paper elevation={3}>
                {/* <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="d-flex flex-row text-nowrap">
                        <span>실시간전화목록</span>
                    </div>
                </div> */}
                <Table striped bordered hover className="text_sm">
                    <thead>
                        <tr>
                            <th>전화</th>
                            <th>시각</th>
                            <th className="d-flex flex-row align-items-center">
                                <span>정보</span>
                                <IconButton variant="outlined" className="p-0 ms-1" onClick={()=>setCount(new Date())}>
                                    <RefreshOutlinedIcon sx={{fontSize: '17px'}}></RefreshOutlinedIcon>
                                </IconButton>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {CallList}
                    </tbody>
                </Table>
            </Paper>
        </Grid>
        </>
        
    )
}

export default CSLiveCall;