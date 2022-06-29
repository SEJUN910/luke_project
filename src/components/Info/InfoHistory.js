import React, { useState,useCallback,useEffect } from 'react';
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import Divider from '@mui/material/Divider';
import InfoStyle from '../../style/css/InfoStyle.module.css';


function HistoryBox(props) {
    const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no="+props.order_no;
    const HistoryList =
        props.history_list.map(Items => {
            return(   
                <div className="text_m">
                    <div className="text_s fw-bolder mt-2"><span className="add_bar">{(Items.agent)? Items.agent : '시스템'}</span><span className="add_bar">{Items.type}</span>{Items.reg_date}</div>
                    <div className="border-bottom pb-1 text_sm">
                        <div dangerouslySetInnerHTML={ {__html: Items.contents} }></div>
                    </div>
                </div>
            )
        })
    return(
        <div className="bg-white rounded shadow-sm p-2">
            <div className="border-bottom w-50 mb-1 border-2 text_m text-primary"><b>주문번호: <a href="#" style={{textDecoration: 'none'}} onClick={() => window.open(order_link, "_blank", "width = 1300, height = 1000")}>{props.order_no}</a></b></div>
            <div>
                {HistoryList}
            </div>
        </div>
    )
}

function InfoHistory(props) {
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(false);
    const user_n = props.user_n;

    const OrderData = async() => {
        setLoading(true);
        try{
        const response = await axios.post(
            CRMAPI,
            {
                "task": "getOrderInfoList",
                "user_n": user_n
            },{ withCredentials: true })
       .then(response => {if(response.data.success===true){setInfo(response.data)}})
        } catch(e) {console.error(e.message)}
        setLoading(false);
    };

    useEffect(() => {
        OrderData();
    },[props]);

    const Result =
    info && info.result &&
        info.result.list.map(Lists => {
            return(
                <div className="border p-2 rounded bg-white mt-2">
                <HistoryBox
                    history_list={Lists.history_list}
                    order_no={Lists.order_no}
                >    
                </HistoryBox>
                </div>
            )
        })
    
    return (
        <div className={`${InfoStyle.InfoCrmBox} rounded vh80 p-2 d-flex flex-column ms-2`}>
            <span className="bg-white p-2 border rounded">
                <span className="fw-bolder">주문히스토리</span>
            </span>
            {Result}
        </div>
    )
}

export default InfoHistory;