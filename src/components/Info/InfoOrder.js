import React, {useState,useEffect,useCallback} from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Button from '@mui/material/Button';
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoHistory from '../Info/InfoHistory';
import CrmHistory from '../CRM/CrmHistory';
import InfoStyle from '../../style/css/InfoStyle.module.css';
import { img, treat, treat_color, numComma } from '../../items/Functions';
import { CRMAPI } from '../../items/URL';
import { BtnTooltip } from '../../items/CustomItem';
import InfoHistoryBox from '../../items/Boxes/InfoHistoryBox';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function SaleLists(props) {
    const itemsLink = 'https://mall.godpeople.com/?G='+props.gcode;                   
    const img_link = () => {
        if (props.gcode == 'dlv_gcode'){
            return 'https://img.godpeople.com/data/goods/3/5/1233223235-0/200_1233223235-0.jpg';
        } else {
            return 'https://img.godpeople.com/data/goods'+img(props.gcode);
        }
    };
            
    return(
    <Grid key={props.gcode} container className="mt-2">
        <Grid item xs={2} className={`${InfoStyle.imgBox} d-flex justify-content-center align-items-center`}>
            <div><img src={img_link()} className={InfoStyle.imgList}></img></div>
        </Grid>
        <Grid item xs={10} className="px-2 text_m">
            <div>
                <span className="text-white p-1 text_sm rounded" style={{background: treat_color(props.treat)}}>{treat(props.treat)}</span>
                <span className="ps-2">
                    <span className="text_m"><a href={itemsLink} target="_blank" style={{textDecoration: 'none'}}>{props.gname}</a></span>
                    
                </span>
            </div>
            <div className="d-flex flex-row align-items-center mt-1">
                <div className="fw-bold ms-1 add_bar">{numComma(props.sale)}원</div>
                <div className="text-secondary fw-bold"><span className="text_sm">주문수량:</span> {numComma(props.su)}</div>
            </div>
        </Grid>
    </Grid>
    );
}

function OrderItemBox(props) {
    const [history, setHistory] = useState([]);
    const [open, setOpen] = useState(false);
    const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no="+props.order_no;
    const HistoryOpen = () => {
        setHistory(props.history_list);
        setOpen(!open);
    };
    const SaleList =
        props.sale_list.map(Lists => {
            return(   
                <SaleLists
                    key={Lists.sale_no}
                    treat={Lists.treat}
                    gcode={Lists.gcode}
                    gname={Lists.gname}
                    sale={Lists.sale}
                    su={Lists.su}
                >
                </SaleLists>
            )
        })
        
    return (
        <>  
            <div className="d-flex flex-row col mb-4 border-bottom pb-3">
                <div className="col-6 p-2 d-flex flex-column gap-1">
                    <div className="text_m border-bottom border-2 ps-1 mb-1 w-50 fw-bold">주문정보</div>
                    <div className="text_sm"><b>주문번호:</b> <a href="#" onClick={() => window.open(order_link, "_blank", "width = 1300, height = 1000")}>{props.order_no}</a></div>
                    <div className="text_sm"><b>구매자명:</b> {props.ord_name}</div>
                    <div className="text_sm">
                        <div><b>결제금액:</b> {numComma(props.mn_order)}원</div>
                        <div>[적립금 {numComma(props.used_point)}원, 쿠폰 {numComma(props.event_point)}원]</div>
                    </div>
                    <div className="d-flex flex-row text_m">
                        <div className="add_bar text_sm"><b>연락처:</b> {props.ord_hphone}</div>
                        <div>{props.ord_email}</div>
                    </div>
                </div>
                <div className="text_m d-flex flex-column col-6 p-2 mt-4">
                    <div className="text_sm mt-2">주문일&nbsp;{props.order_date}</div>
                    <div className="text_sm mt-1">결제일&nbsp;{props.paid_date === '0000-00-00 00:00:00' && <span className="text-danger fw-bolder">결제전</span> || <span>{props.paid_date}</span>}</div>
                    <div className="text_sm mt-1">배송일&nbsp;{props.send_date === '0000-00-00 00:00:00' && <span className="text-danger fw-bolder">배송전</span> || <span>{props.send_date}</span>}</div>

                    <div className="d-flex gap-2 mt-3">
                        <BtnTooltip title={
                            <>
                            <div>이름: {props.rcv_name}</div>
                            <div>연락처: {props.rcv_tel}&nbsp;/&nbsp;{props.rcv_hphone}</div>
                            <div>주소: {props.rcv_addr}</div>
                            </>
                        } arrow>
                            <Button variant="outlined" size="small">
                                <div className="me-1">배송정보</div>
                                <ExpandCircleDownOutlinedIcon fontSize="small"></ExpandCircleDownOutlinedIcon>
                            </Button>
                        </BtnTooltip>
                        <Button onClick={HistoryOpen} color="success" variant="outlined" size="small">히스토리<ExpandCircleDownOutlinedIcon fontSize="small"></ExpandCircleDownOutlinedIcon></Button>
                    </div>
                </div>
            </div>
            
            <div>{SaleList}</div>
            { open && <InfoHistoryBox data={history}></InfoHistoryBox> }
        </>
    )
}

function InfoOrderItems(props) {
    const [info, setInfo] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const count = 10;

    const OrderData = async () => {
        setLoading(true);
        try{
        const response = await axios.post(CRMAPI,
            {
                "task": "getOrderInfoList",
                "user_n": props.user_n,
                "page": page,
                "count": count
            },
            { withCredentials: true })
       .then(response => {
           if(response.data.success===true) {
               setInfo(response.data);
           }})
        } catch(e) {
            console.error(e.message);
        }
        setLoading(false);
    };
    useEffect(() => {
        OrderData();
    },[page]);

    return(    
        <>
        {info && info.result &&
        info.result.list.map(OrderItems => {
            return(
                <div key = {OrderItems.order_no} className="border p-2 rounded bg-white mt-2">
                <OrderItemBox
                    order_no = {OrderItems.order_no}
                    order_date={OrderItems.order_date}
                    paid_date={OrderItems.paid_date}
                    send_date={OrderItems.send_date}
                    ord_name={OrderItems.ord_name}
                    mn_order={OrderItems.mn_order}
                    used_point={OrderItems.used_point}
                    event_point={OrderItems.event_point}
                    ord_hphone={OrderItems.ord_hphone}
                    ord_email={OrderItems.ord_email}
                    rcv_name={OrderItems.rcv_name}
                    rcv_tel={OrderItems.rcv_tel}
                    rcv_hphone={OrderItems.rcv_hphone}
                    rcv_addr={OrderItems.rcv_addr}
                    sale_list={OrderItems.sale_list}
                    history_list={OrderItems.history_list}
                >    
                </OrderItemBox>
                </div>
            )
        })}
        <Stack spacing={2} className="bg-white w-100 d-flex align-items-center py-2">
            <Pagination count={info && info.result && Math.ceil(Number(info.result.total)/count) || 1} variant="outlined" color="primary" onChange={(e)=>setPage(e.target.textContent)}/>
        </Stack>
        </>
    )
}

function InfoOrder(props) {
    const [open, setOpen] = useState('crm');
    const [infoStat, setInfoStat] = useState([]);
    const [total, setTotal] = useState(0);
    const OpenCrm = () => setOpen('crm');
    const OpenHistory = () => setOpen('history');
    const user_n = props.data ? props.data.user_n : "";
    const service = props.data ? props.data.service : "";
    const TotalCount = async () => {
        try{
        const response = await axios.post(CRMAPI,
            {
                "task": "getOrderInfoList",
                "user_n": user_n,
                "count": 1
            },
            { withCredentials: true })
       .then(response => {
           if(response.data.result) {
             setTotal(response.data.result.total);
           }})
        } catch(e) {
            console.error(e.message);
        }
    };
    
    const OrderDataForStat = async () => {
        try{
        const response = await axios.post(CRMAPI,
            {
                "task": "getOrderInfoList",
                "user_n": user_n,
                "count": total
            },
            { withCredentials: true })
       .then(response => {
           if(response.data.success===true) {
               setInfoStat(response.data);
           }})
        } catch(e) {
            console.error(e.message);
        }
    };
    useEffect(()=>{
        TotalCount();
    },[user_n])

    useEffect(()=>{
        OrderDataForStat();
    },[total, user_n]);

    let orderTotalArr = [];
    let relatBook = [];
    let relatMusic = [];
    let relatGoods = [];
    let relatFood = [];
    let relatInst = [];
    infoStat && infoStat.result && infoStat.result.list.length > 0 && infoStat.result.list.map(Lists => {
        Lists.sale_list.map(lists => {
            lists.treat !== 'C' && orderTotalArr.push(lists.sale)
            lists.treat !== 'C' && lists.relat_code === '01' && relatBook.push(lists.relat_code)
            lists.treat !== 'C' && lists.relat_code === '03' && relatMusic.push(lists.relat_code)
            lists.treat !== 'C' && lists.relat_code === '04' && relatGoods.push(lists.relat_code)
            lists.treat !== 'C' && lists.relat_code === '05' && relatFood.push(lists.relat_code)
            lists.treat !== 'C' && lists.relat_code === '08' && relatInst.push(lists.relat_code)
        })
    })
    const orderTotalSum = orderTotalArr.reduce(function add(sum, val){ return sum + val }, 0);
    const relatTotal = relatBook.length + relatMusic.length + relatGoods.length + relatFood.length + relatInst.length;
    const orderRelat = [
        {name:'도서', count: relatBook.length},
        {name:'뮤직', count: relatMusic.length},
        {name:'용품', count: relatGoods.length}, 
        {name:'식품', count: relatFood.length},
        {name:'악기', count: relatInst.length}];
    for( let i = 0; i < orderRelat.length; i++){
        if(orderRelat[i]['count'] === 0){
            orderRelat.splice(i, 1);
            i --;
        }
    }
    const orderResult = orderRelat.sort(function(a,b){
        return b.count - a.count;
    })
    return (
        <>
        {props.data &&
        <>
        <div className={`${InfoStyle.InfoOrderBox} border rounded vh80 p-1 d-flex flex-column ms-2`}>
            <span className="bg-white p-2 d-flex flex-row justify-content-between">
                <div style={{width: '65%'}}>
                    {/* <div className="fw-bolder">구매이력</div> */}
                    <ul>
                        <li className="text_m mt-1">
                            <Grid container>
                                <Grid item xs={3}>결제금액</Grid>    
                                <Grid item xs={9}>
                                    <strong>{numComma(orderTotalSum)}</strong>&nbsp;원   
                                </Grid>    
                            </Grid>
                        </li>
                        <li className="text_m mt-1">
                            <Grid container>
                                <Grid item xs={3}>결제유형</Grid>    
                                <Grid item xs={9}>
                                    <Grid container>
                                        {orderRelat.map(Lists =>{
                                            return(
                                                <Grid item xs={6} key={Lists.name}>
                                                <div className="text_sm text-nowrap">{Lists.name}&nbsp;{Lists.count}건({Math.round(Number(Lists.count/relatTotal)*1000)/10}%)&nbsp;</div>
                                                </Grid>
                                            )
                                        })}
                                    </Grid>
                                </Grid>    
                            </Grid>
                        </li>
                    </ul>
                </div>
                <div className="float-end d-flex flex-column gap-2">
                    <Button variant="contained" className="text_m p-1 ps-2" color="success" onClick={OpenHistory}>
                        <div className="text-nowrap">전체히스토리</div>
                        <ChevronRightRoundedIcon></ChevronRightRoundedIcon>
                    </Button>
                    <Button className="p-1 d-flex align-items-center" variant="contained" onClick={OpenCrm}>
                        <div className="text-nowrap">상담이력보기</div>
                        <ChevronRightRoundedIcon></ChevronRightRoundedIcon>
                    </Button>
                </div>
            </span>
            <Divider />
            <div className="d-flex flex-column">
                <InfoOrderItems user_n={user_n}></InfoOrderItems>
            </div>
        </div>
        {open === 'crm' && <CrmHistory user_n={user_n} service={service}></CrmHistory>}
        {open === 'history' && <InfoHistory user_n={user_n}></InfoHistory>}
        </>
        }
        </>
    )
}

export default InfoOrder;