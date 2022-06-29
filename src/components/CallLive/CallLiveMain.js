import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { callTimer, numName } from '../../items/Functions';
import { Table, Form } from 'react-bootstrap';
import Dialog from '@mui/material/Dialog';
import { Paper, Grid, Tooltip } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RefreshIcon from '@mui/icons-material/Refresh';
import SignalCellularAlt1BarIcon from '@mui/icons-material/SignalCellularAlt1Bar';
import SignalCellularAlt2BarIcon from '@mui/icons-material/SignalCellularAlt2Bar';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CallLiveSearch from "../CallLive/CallLiveSearch";

function CallLiveMain() {
    const [open, setOpen] = useState(false);
    const [sortOpen, setSortOpen] = useState(false);
    const [sort, setSort] = useState([]);
    const [count, setCount] = useState(0);
    const [number, setNumber] = useState([]);
    const [info, setInfo] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [csOpen, setCsOpen] = useState(false);
    const [openTime, setOpenTime] = useState(false);
    const [time, setTime] = useState(
        ()=> localStorage.getItem("liveCallTime") || 10000);

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
        if (count <= 200){ 
            setTimeout(()=>setCount(count+1), time);
        }
        getTelConsultingList();
    },[count]);

    const CallLists =
    info.result &&
        info.result.slice(-6).reverse().map(CallsMini => {
            const now = Date.now();
            const reg = new Date(CallsMini.reg_date);
            const time = Math.floor(now/1000) - Math.floor(reg/1000);

            const list = JSON.parse(CallsMini.user_info);
            const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no=";
            const order_no = (list.orders) ? list.orders.order_no : '';
            const order_others = (list.orders) ? list.orders.ord_name+' / '+list.orders.rcv_name+' / '+list.orders.rcv_addr : '';
            const purch = (list.purch) ? list.purch.purch_name : '';
            const sian = (list.sian) ? list.sian : '';

            return (
                <li key={CallsMini.no} className="overflow-hidden text_m">
                    <Grid container>
                        <Grid item xs={5} className="text-nowrap">
                            <span type="button" onClick={()=> {setCsOpen(true); setNumber(CallsMini.inbound)}}>{numName(CallsMini.inbound)}</span>
                            <ArrowRightIcon></ArrowRightIcon>
                            <span type="button" onClick={()=> {setCsOpen(true); setNumber(CallsMini.outbound)}}>{numName(CallsMini.outbound)}</span>
                            <span className="ms-2 text_m" style={{color:'#ff5722'}}>{callTimer(time)}</span>
                        </Grid>
                        <Grid item xs={1} className="text-center">|</Grid>
                        <Grid item xs={6}>
                            {order_no &&
                                <div className="text_sm text-nowrap">
                                    <a href="#" style={{textDecoration: 'none'}} onClick={() => window.open(order_link+order_no, "_blank", "width = 1300, height = 1000")}>{order_no}</a>&nbsp;/&nbsp;
                                    {order_others}
                                </div>
                                }
                            {purch && 
                            <span type="button" className="text-primary text_sm" onClick={()=>sortData(purch)}>{purch}</span>}
                            {sian &&
                            <span type="button" className="text-primary text_sm" onClick={()=>sortData(sian)}>{sian}</span>}
                        </Grid>
                    </Grid>
                </li>
            )
        })


    useEffect(()=>{
        if (count <= 36){ 
            setTimeout(()=>setCount(count+1), time);
        }
    },[count]);

    const crmTimeSave = (e) => {
        setTime(e.target.value);
        setOpenTime(false);
        window.location.reload();
    }

    useEffect(()=>{
        localStorage.setItem("liveCallTime", time);
    },[time])
    function CallLiveMini() {
        return(
            <>   
            <div>
                <Paper elevation={9} className="p-3 miniBox sortCS">
                    <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div className="fw-bolder">실시간전화목록</div>
                        <div>
                            {count % 4 === 1 && count < 200 && <SignalCellularAlt1BarIcon></SignalCellularAlt1BarIcon>}
                            {count % 4 === 2 && count < 200 && <SignalCellularAlt2BarIcon></SignalCellularAlt2BarIcon>}
                            {count % 4 === 3 && count < 200 && <SignalCellularAltIcon></SignalCellularAltIcon>}
                            {count >= 200 &&
                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setCount(0)}>
                                <RefreshIcon sx={{fontSize: '17px'}} color="primary"></RefreshIcon>
                            </IconButton>
                            }
                            <Tooltip title="타이머">
                                <IconButton variant="outlined" size="small" className="border mx-2" onClick={()=>setOpenTime(true)}>
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
                                    <div className="pb-2 text_m text-secondary">설정한 시간마다 실시간전화목록이 갱신됩니다.</div>
                                    <Form.Select value={time} onChange={crmTimeSave}>
                                        <option value="1000">1초</option>
                                        <option value="2000">2초</option>
                                        <option value="5000">5초</option>
                                        <option value="10000">10초</option>
                                        <option value="100000">1분</option>
                                        <option value="99999999">종료</option>
                                    </Form.Select>
                                </div>
                            </Dialog>
                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                                <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                            </IconButton>
                        </div>
                    </div>
                    <ul className="mt-2 d-flex flex-column gap-1 px-1">
                        {CallLists}
                    </ul>
                </Paper>
            </div>
            </>
        )
    }
    
    const sortData = (num) => {setSort(num); setSortOpen(true)}

    function SortList(){
        return(
            <div className="p-2">
                <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div>
                        <span className="fs-5 p-1"><strong> {sort} </strong></span>
                        <span className="fs-6">통화목록</span>
                    </div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setSortOpen(false)}>
                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Table striped bordered hover className="text_sm mt-2">
                    <thead>
                        <tr>
                            <th>전화</th>
                            <th>시각</th>
                            <th>정보</th>
                        </tr>
                    </thead>
                    <tbody>
                        {info.result.map(Calls=>{
                            const list = JSON.parse(Calls.user_info);
                            const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no=";
                            const order_no = (list.orders) ? list.orders.order_no : '';
                            const order_others = (list.orders) ? list.orders.ord_name+' / '+list.orders.rcv_name+' / '+list.orders.rcv_addr : '';
                            const purch = (list.purch) ? list.purch.purch_name : '';
                            const sian = (list.sian) ? list.sian : '';
                            return(
                            (Calls.inbound === sort || Calls.outbound === sort || purch === sort || sian === sort) && 
                                
                                <tr key={Calls.no}>
                                    <td className="p-2">
                                        <div className="border-bottom">
                                            <span className="add_bar fw-bolder">수신</span>
                                            {numName(Calls.inbound)}
                                        </div>
                                        <div className="text-nowrap">
                                            <span className="add_bar">발신</span>
                                            {numName(Calls.outbound)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className="text-nowrap my-2 d-flex align-items-center">
                                            {Calls.reg_date}
                                            <span className="ms-2" style={{color:'#ff5722'}}></span>
                                        </div>
                                    </td>
                                    <td>
                                        {Calls.order_no &&
                                        <div className="text_sm">
                                            <a href="#" style={{textDecoration: 'none'}} onClick={() => window.open(order_link+order_no, "_blank", "width = 1300, height = 1000")}>{order_no}</a>&nbsp;/&nbsp;
                                            {order_others}
                                        </div>
                                        }
                                        {purch && purch}
                                        {sian && sian}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }

    const CallList =
    info.result &&
        info.result.slice(0).reverse().map(Calls => {
            const list = JSON.parse(Calls.user_info);
            const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no=";
            const order_no = (list.orders) ? list.orders.order_no : '';
            const order_others = (list.orders) ? list.orders.ord_name+' / '+list.orders.rcv_name+' / '+list.orders.rcv_addr : '';
            const purch = (list.purch) ? list.purch.purch_name : '';
            const sian = (list.sian) ? list.sian : '';

            //Timer
            const now = Date.now();
            const reg = new Date(Calls.reg_date);
            const time = Math.floor(now/1000) - Math.floor(reg/1000);

            return (
                <tr key={Calls.no}>
                    <td className="p-2">
                        <div className="border-bottom">
                            <span className="add_bar fw-bolder">수신</span>
                            <span type="button" className="text-primary" onClick={()=>sortData(Calls.inbound)}>{numName(Calls.inbound)}</span>
                        </div>
                        <div className="text-nowrap  d-flex flex-row align-items-center">
                            <span className="add_bar">발신</span>
                            <span type="button" className="text-primary" onClick={()=>sortData(Calls.outbound)}>{numName(Calls.outbound)}</span>
                        </div>
                    </td>
                    <td>
                        <div className="text-nowrap my-2 d-flex align-items-center">
                            {Calls.reg_date}
                            <span className="ms-2" style={{color:'#ff5722'}}>{callTimer(time)}</span>
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
                        <span type="button" className="text-primary" onClick={()=>sortData(purch)}>{purch}</span>}
                        {sian &&
                        <span type="button" className="text-primary" onClick={()=>sortData(sian)}>{sian}</span>}
                    </td>
                </tr>
            )
        })

    return (
        <>
            <CallLiveMini></CallLiveMini>
            <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
                <Grid item xs={12}>
                    <Paper elevation={3} className="p-3" >
                        <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                            <div className="d-flex flex-row text-nowrap">
                                <span>실시간전화목록</span>
                                {/* <Form.Control placeholder="번호입력" className="test_m p-0 ps-2 ms-3" size="sm" value={number} onChange={setNumber}/>
                                <Button variant="contained" className="p-0 ms-2" size="small">고객검색</Button> */}
                            </div>
                            <div>
                                {count % 4 === 1 && count < 200 && <SignalCellularAlt1BarIcon></SignalCellularAlt1BarIcon>}
                                {count % 4 === 2 && count < 200 && <SignalCellularAlt2BarIcon></SignalCellularAlt2BarIcon>}
                                {count % 4 === 3 && count < 200 && <SignalCellularAltIcon></SignalCellularAltIcon>}
                                {count === 200 &&
                                <IconButton variant="outlined" size="small" className="border" onClick={()=>setCount(0)}>
                                    <RefreshIcon sx={{fontSize: '17px'}} color="primary"></RefreshIcon>
                                </IconButton>
                                }
                                <IconButton variant="outlined" size="small" className="ms-2 border" onClick={()=>setOpen(false)}>
                                    <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                </IconButton>
                            </div>
                        </div>
                        <Table striped bordered hover className="text_sm mt-2">
                            <thead>
                                <tr>
                                    <th>전화</th>
                                    <th>시각</th>
                                    <th>정보</th>
                                </tr>
                            </thead>
                            <tbody>
                                {CallList}
                            </tbody>
                        </Table>
                    </Paper>
                </Grid>
            </Dialog>
            <Dialog open={sortOpen} onClose={()=>setSortOpen(false)} fullWidth={true} maxWidth="md">
                <SortList></SortList>
            </Dialog>
            {csOpen == true && 
            <Dialog open={csOpen} onClose={()=>setCsOpen(false)} fullWidth={true} maxWidth="lg">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom p-2 ms-1">
                    <div className="ms-2">고객정보조회</div>
                    <div>
                        <IconButton className="border p-1 me-2" href="#" onClick={() => window.open("/add", "_blank", "width = 1300, height = 1000")}>
                            <PersonAddAltRoundedIcon></PersonAddAltRoundedIcon>
                        </IconButton>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setCsOpen(false)}>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                        </IconButton>
                    </div>
                </div>
                <CallLiveSearch number={number} open={true}></CallLiveSearch>
            </Dialog>}
        </>
    )
}

export default CallLiveMain;