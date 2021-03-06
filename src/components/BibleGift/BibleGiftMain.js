import React, { useState, useEffect, useCallback} from 'react';
import { STOREAPI } from '../../items/URL';
import { bibleGiftCondition, numComma, updateStateName } from '../../items/Functions';
import axios from 'axios';
import { Paper, Grid, Button, IconButton, Dialog, Alert, AlertTitle, Tooltip, TextField } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Table, Form } from 'react-bootstrap';
import BibleGiftStyle from '../../style/css/BibleGiftStyle.module.css';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import DynamicFeedOutlinedIcon from '@mui/icons-material/DynamicFeedOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import OrderHistory from './OrderHistory';
import UsingCoupon from './UsingCoupon';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Moment from 'moment';
import { ko } from "date-fns/esm/locale";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


function BibleGift(){
    const [open, setOpen] = useState(false);
    const [openOrder, setOpenOrder] = useState(false);
    const [openBible, setOpenBible] = useState(false);
    const [openBibleModify, setOpenBibleModify] = useState(false);
    const [giftList, setGiftList] = useState([]);
    const [giftTotal, setGiftTotal] = useState([]);
    const [giftOrder, setGiftOrder] = useState([]);
    const [updateState, setUpdateState] = useState([]);
    const [cpKind, setCpKind] = useState([]);
    const [bibleList, setBibleList] = useState([]);
    const [usingUserList, setUsingUserList] = useState([]);
    const [openMultiCoupon, setOpenMultiCoupon] = useState(false);
    const [openUpdateState, setOpenUpdateState] = useState(false);
    const [openCouponList, setOpenCouponList] = useState(false);
    const [openHistory, setOpenHistory] = useState(false);
    const [openExtendGroupon, setOpenExtendGroupon] = useState(false);
    const [reload, setReload] = useState([]);
    const [endDate, setEndDate] = useState(Moment().toDate());
    const [endDateCount, setEndDateCount] = useState(0);
    const [openCouponListGroup, setOpenCouponListGroup] = useState(false);
    const [openCouponListMain, setOpenCouponListMain] = useState(false);
    const [openConsult, setOpenConsult] = useState(false);
    const [consultMemo, setConsultMemo] = useState([]);
    const [bghIdx, setBghIdx] = useState([]);
    const [openConsultModify, setOpenConsultModify] = useState(false);
    const [openConsultInsert, setOpenConsultInsert] = useState(false);
    const [openMoneyInsert, setOpenMoneyInsert] = useState(false);
    const [moneyKind, setMoneyKind] = useState('deposit');
    const [moneyHowtoPay, setMoneyHowtoPay] = useState([]);
    const [moneyMoney, setMoneyMoney] = useState([]);
    const [moneyInfo, setMoneyInfo] = useState([]);
    const [radioUsing, setRadioUsing] = useState('usingList');
    const [extendExpireOption, setExtendExpireOption] = useState('extendCount');
    const [page, setPage] = useState(1);
    const [orderNoUsing, setOrderNoUsing] = useState([]);
    
    const maxDate = Moment().add(60, 'days').toDate();
    const limit = 15;

    console.log(giftOrder)
    // ????????????
    const powerOrderedGrouponList = async () => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerOrderedGrouponList",
                "limit": limit,
                "page": page,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => setGiftList(response.data))
        } catch(e) { console.error(e.message) }
    };

    // ???????????????
    const powerTotalOrderedGrouponList = async () => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerTotalOrderedGrouponList",
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => setGiftTotal(response.data))
        } catch(e) { console.error(e.message) }
    }

    // ????????? ??????????????????
    const powerGoodsList = async () => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerGoodsList",
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z',
                "codeset": '_ALL_'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => setBibleList(response.data))
        } catch(e) { console.error(e.message) }
    };

    useEffect(() => {    
        powerOrderedGrouponList();
        powerGoodsList();
        powerTotalOrderedGrouponList();
    },[open, reload, page]);
    
    // ????????? ????????????
    const powerOrderedGrouponInfo = async (order_no) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerOrderedGrouponInfo",
                "order_no": order_no,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )   
       .then((response) => setGiftOrder(response.data))
        } catch(e) { console.error(e.message) }
    };

    // ????????? ?????? ???????????? ?????????(powerOrderedGrouponInfo)
    const userOrderInfo = giftOrder.order_info && giftOrder.order_info || [];
    const userSaleInfo = giftOrder.sales_list && giftOrder.sales_list || [];
    const userHistoryInfo = giftOrder.history_list && giftOrder.history_list || [];
    const userUsingInfo = giftOrder.using_list && giftOrder.using_list || [];
    const uniIssuedSu = giftOrder.uni_issued_su && giftOrder.uni_issued_su || [];
    const totalPrice = giftOrder.total_price && giftOrder.total_price || [];
    const totalPerc = giftOrder.total_perc && giftOrder.total_perc || [];
    const totalSale = giftOrder.total_sale && giftOrder.total_sale || [];

    let saleUserCodes = [];
    let saleuserPrice = [];
    let saleUserSale = [];
    userSaleInfo.length > 0 && userSaleInfo.map(Lists =>{
        saleUserCodes.push(Lists.code);
        saleuserPrice.push(Lists.price);
        saleUserSale.push(Lists.sale);
    })

    // ???????????? ??????
    const powerUpdateGrouponState = async (order_no, update_state) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerUpdateGrouponState",
                "order_no": order_no,
                "update_state": update_state,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((res) => {res.data.success === true ? alert('????????? ?????????????????????.') : alert(res.data.error_msg)})
        } catch(e) { console.error(e.message); alert('??????????????? ??????????????????.'); }
        powerOrderedGrouponInfo(order_no);
        setOpenUpdateState(false);
        setReload(new Date());
    }

    // ????????? ???????????? ?????? ??????
    const powerGrouponUsingUserList = async (order_no, cp_kind) => {
        console.log(order_no);
        console.log(cp_kind);
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerGrouponUsingUserList",
                "order_no": order_no,
                "cp_kind": cp_kind,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => setUsingUserList(response.data))
        } catch(e) { console.error(e.message) }
        cp_kind === 'multipon' && setOpenCouponList(true);
        cp_kind === 'groupon' && setOpenCouponListGroup(true);
    };

    // ????????? ???????????? ??????
    const powerGrouponUsingUserListMain = async (order_no, cp_kind) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerGrouponUsingUserList",
                "order_no": order_no,
                "cp_kind": cp_kind,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => setUsingUserList(response.data))
        } catch(e) { console.error(e.message) }
        setCpKind(cp_kind);
        setOrderNoUsing(order_no);
        setOpenCouponListMain(true);
    };

    // ???????????? ????????????
    const powerIssueMultipon = async (order_no, code) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerIssueMultipon",
                "order_no": order_no,
                "code": code,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('??????('+response.data.issue_su+'???)??? ??????????????? ?????????????????????.') : alert(response.data.error_msg)})
        } catch(e) { console.error(e.message);  }
        setOpenMultiCoupon(false);
    };

    // ????????????
    const powerExtendGrouponPeriod = async (order_no, expire) => {
        try{
            let expire_date = "";
            let expire_count = "";
            const type = typeof expire;
            if( type === 'string' ){
                expire_date = expire;
            } else {
                expire_count = expire;
            }

        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerExtendGrouponPeriod",
                "order_no": order_no,
                "expire_date": expire_date,
                "period": expire_count,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('????????? ('+expire+')??? ?????????????????????.') : alert(response.data.error_msg)})
        } catch(e) { console.error(e.message);  }
        powerOrderedGrouponInfo(order_no);
        setOpenExtendGroupon(false);
        setEndDateCount(0);
    };

    // ??????????????????
    const powerInsertGrouponConsult = async (order_no) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerInsertGrouponConsult",
                "order_no": order_no,
                "memo": consultMemo,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('??????????????? ?????????????????????.') : alert('????????? ??????????????????.')})
        } catch(e) { console.error(e.message);  }
        setOpenConsultInsert(false);
        setConsultMemo([]);
        powerOrderedGrouponInfo(order_no);
    };

    // ???????????? ????????????
    const powerModifyGrouponConsult = async (bgh_idx, order_no) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerModifyGrouponConsult",
                "order_no": order_no,
                "bgh_idx": bgh_idx,
                "memo": consultMemo,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('??????????????? ?????????????????????.') : alert('????????? ??????????????????.')})
        } catch(e) { console.error(e.message);  }
        setOpenConsultModify(false);
        setConsultMemo([]);
        setBghIdx([]);
        powerOrderedGrouponInfo(order_no);
    };

    // ????????????????????????
    const powerInsertGrouponMoney = async (order_no) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerInsertGrouponMoney",
                "order_no": order_no,
                "kind": moneyKind,
                "howtopay": moneyHowtoPay,
                "money": Number(moneyMoney),
                "info": moneyInfo,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('??????????????? ?????????????????????.') : alert(response.data.error_msg)})
        } catch(e) { console.error(e.message);  }
        setOpenMoneyInsert(false);
        setMoneyKind('deposit');
        setMoneyHowtoPay([]);
        setMoneyMoney([]);
        setMoneyInfo([]);
        powerOrderedGrouponInfo(order_no);
    };

    // ?????? ??????
    const showConsultModify = (bgh_idx, memo) => {
        setConsultMemo(memo);
        setBghIdx(bgh_idx);
        setOpenConsultModify(true);
    }

    const showOrder = (order_no, update_state) => {
        setOpenOrder(true);
        setUpdateState(update_state);
        powerOrderedGrouponInfo(order_no);
    }

    const closeMoneyInsert = () => {
        setMoneyKind('deposit');
        setMoneyHowtoPay([]);
        setMoneyMoney([]);
        setMoneyInfo([]);
        setOpenMoneyInsert(false);
    }

    // ?????? Function
    function bookName(codeNames) {
        let name = [];
        const codeName = codeNames.split(',');
        if(bibleList.GoodsList) {
            bibleList.GoodsList.map(Lists => {
                codeName.includes(Lists.code) && name.push(Lists.title)
            })
        } else {
            name = "";
        }
        return name;
    }

    let orderImageLink = (num) => `https://store.godpeople.com/img/store/mcard_${num}.jpg`;

    function ModifyCoupon({order, sale, bible}){
        const [orderName, setOrderName] = useState(order.order_name);
        const [orderPhone, setOrderPhone] = useState(order.order_phone);
        const [orderEmail, setOrderEmail] = useState(order.order_email);
        const [msgNo, setMsgNo] = useState(order.msg_no);
        const [message, setMessage] = useState(order.message);
        const [cpKind, setCpKind] = useState(order.cp_kind);
        const [grouponNo, setGrouponNo] = useState(order.groupon_no);
        const [title, setTitle] = useState(order.title);
        const [subtitle, setSubtitle] = useState(order.subtitle);
        const [church, setChurch] = useState(order.church);
        const [createTime, setCreateTime] = useState(order.create_time);
        const [expireTime, setExpireTime] = useState(order.expire_time);
        const [su, setSu] = useState(order.su);
        const [codes, setCodes] = useState([]);
        const [singleCodes, setSingleCodes] = useState(order.codes);
        const [issuableSu, setIssuableSu] = useState(order.issuable_su);
        const [explain, setExplain] = useState(order.explain);
        const [customLinks, setCustomLinks] = useState(order.custom_links);
        const [significant, setSignificant] = useState(order.significant);
        const [orderNo, setOrderNo] = useState(order.order_no);
        const [prefixNo, setPrefixNo] = useState(order.prefix_no);
        const [codeSale, setCodeSale] = useState([]);
        const [openImages, setOpenImages] = useState(false);
        const [openModifySales, setOpenModifySales] = useState(false);
        const [openModifySalesMulti, setOpenModifySalesMulti] = useState(false);
        const [couponCheck, setCouponCheck] = useState(false);
        const [modiLists, setModiLists] = useState([]);
        const [acode, setAcode] = useState(order.codes);
        const [aprice, setAprice] = useState([]);
        const [asale, setAsale] = useState([]);

        let saleCodes = [];
        let salePrice = [];
        let saleSale = [];
        sale.length > 0 && sale.map(Lists =>{
            saleCodes.push(Lists.code);
            salePrice.push(Lists.price);
            saleSale.push(Lists.sale);
        })

        useEffect(()=>{
            setCodes(saleCodes);
        },[])

        const imageLists = ['1','2','3','4','5'];
        let orderImageLink = (num) => `https://store.godpeople.com/img/store/mcard_${num}.jpg`;
    
        const checkGroupPick = (e) =>{
            if(e.target.checked){
                setCodes((prev) => [...prev, e.target.value]);
            } else {
                setCodes(codes.filter(function(v) { return v!==e.target.value}))
            }
        }
    
        const codeSalesList =(e) => {
            e.preventDefault();
            setModiLists((prev) => [...prev, e.target[1].value]);
            setCodeSale((prev) => [...prev,
                {
                    code: e.target[1].value,
                    aprice: bibleOriSale(e.target[1].value),
                    asale: e.target[0].value
                }
            ]);
        }
    
        const codeSaleListMulti = (e) =>{
            e.preventDefault();
            setAcode(e.target[1].value);
            setAprice(bibleOriSale(e.target[1].value));
            setAsale(e.target[0].value);
            setOpenModifySalesMulti(false);
            setCouponCheck(true);
        }
    
        let acodeArr = [];
        let apriceArr = [];
        let asaleArr = [];
        codeSale.map(Lists =>{
            acodeArr.push(Lists.code);
            apriceArr.push(Lists.aprice);
            asaleArr.push(Lists.asale);
        })
    
        const bibleOriSale = (s) => {
            let price = "";
            bible && bible.map(Lists =>{
                if(Lists.code === s) {
                    price = Lists.price;
                }
            })
            return price;
        }

        const bibleSale = (p) => {
            let sale = "";
            bible && bible.map(Lists =>{
                if(Lists.code === p) {
                    sale = Lists.sale;
                }
            })
            return sale;
        }
    
        const bibleName = (t) => {
            let title = "";
            bible && bible.map(Lists =>{
                if(Lists.code === t) {
                    title = Lists.title;
                }
            })
            return title;
        }
    
        // ?????????????????? ????????????
        const powerMakeGrouponNoWithPrefix = async (prefix_no) => {
            try{
            const response = await axios.post
            (
                STOREAPI,
                {
                    "task": "powerMakeGrouponNoWithPrefix",
                    "prefix_no": prefix_no,
                    "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
                },
                { 
                    withCredentials: true
                }
            )
           .then((response) => setGrouponNo(response.data.groupon_no))
            } catch(e) { console.error(e.message) }
        };
    
        // ?????? ???????????? (??????)
        const powerModifyGrouponInfoMulti = async () => {
            try{
            const response = await axios.post
            (
                STOREAPI,
                {
                    "task": "powerModifyGrouponInfo",
                    "order_no": orderNo,
                    "order_name": orderName,
                    "order_phone": orderPhone,
                    "order_email": orderEmail,
                    "msg_no": msgNo,
                    "message": message,
                    "groupon_no": grouponNo,
                    "title": title,
                    "subtitle": subtitle,
                    "church": church,
                    "create_time": createTime,
                    "expire_time": expireTime,
                    "issuable_su": issuableSu,
                    "explain": explain,
                    "custom_links": customLinks,
                    "significant": significant,
                    "cp_kind": cpKind,
                    "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
                },
                { 
                    withCredentials: true
                }
            )
           .then((response) => {response.data.success === true ? alert('??????????????? ??????????????? ?????????????????????.') : alert(response.data.error_msg)})
            } catch(e) { console.error(e.message) }
            setOpenBibleModify(false);
            setCouponCheck(false);
            // const codeSplit = saleCodes.length >1 && saleCodes.split(',') || codes[0];
            // const code = saleCodes.length > 1 && codeSplit.sort().join(',') || codes[0];
            // console.log(code);
            // console.log(singleCodes);
            powerMultiponModifyGrouponSalesList(acode, aprice, asale);
        };

        // ?????? ???????????? (??????)
        const powerModifyGrouponInfoGroup = async () => {
            try{
            const response = await axios.post
            (
                STOREAPI,
                {
                    "task": "powerModifyGrouponInfo",
                    "order_no": orderNo,
                    "order_name": orderName,
                    "order_phone": orderPhone,
                    "order_email": orderEmail,
                    "msg_no": msgNo,
                    "message": message,
                    "groupon_no": grouponNo,
                    "title": title,
                    "subtitle": subtitle,
                    "church": church,
                    "create_time": createTime,
                    "expire_time": expireTime,
                    "issuable_su": issuableSu,
                    "explain": explain,
                    "custom_links": customLinks,
                    "significant": significant,
                    "cp_kind": cpKind,
                    "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
                },
                { 
                    withCredentials: true
                }
            )
           .then((response) => {response.data.success === true ? alert('??????????????? ??????????????? ?????????????????????.') : alert(response.data.error_msg)})
            } catch(e) { console.error(e.message) }
            setOpenBibleModify(false);
            powerGrouponModifyGrouponSalesList();
        };
        
        // ???????????? ???????????? ??????
        const powerGrouponModifyGrouponSalesList = async () => {
            try{
            let acode = acodeArr.join(',');
            let aprice = apriceArr.join(',');
            let asale = asaleArr.join(',');
            const response = await axios.post
            (
                STOREAPI,
                {
                    "task": "powerModifyGrouponSalesList",
                    "order_no": orderNo,
                    "acode": acode,
                    "aprice": aprice,
                    "asale": asale,
                    "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
                },
                { 
                    withCredentials: true
                }
            )
           .then((response) => alert('???????????? ????????? ??????????????? ?????????????????????.'))
            } catch(e) { console.error(e.message); alert('????????? ??????????????????.') }
            setOpenModifySales(false);
            powerOrderedGrouponInfo(order.order_no);
        };
    
        // ???????????? ???????????? ??????
        const powerMultiponModifyGrouponSalesList = async (acode, aprice, asale) => {
            try{
            const response = await axios.post
            (
                STOREAPI,
                {
                    "task": "powerModifyGrouponSalesList",
                    "order_no": orderNo,
                    "acode": acode,
                    "aprice": aprice,
                    "asale": asale,
                    "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
                },
                { 
                    withCredentials: true
                }
            )
           .then((response) => alert('???????????? ????????? ??????????????? ?????????????????????.'))
            } catch(e) { console.error(e.message); alert('????????? ??????????????????.') }
            setOpenModifySales(false);
            powerOrderedGrouponInfo(order.order_no);
        };
    
        return(
            <>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className={BibleGiftStyle.modifyTitle}>???????????????</div>
                        <ul>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>?????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={orderName} onChange={(e)=>setOrderName(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>?????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={orderPhone} onChange={(e)=>setOrderPhone(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>?????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={orderEmail} onChange={(e)=>setOrderEmail(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                        </ul>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={BibleGiftStyle.modifyTitle}>?????? ??????</div>
                        <ul>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>?????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>???????????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={subtitle} onChange={(e)=>setSubtitle(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>???????????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={customLinks} onChange={(e)=>setCustomLinks(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.modifyList}>
                                <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                    <Grid item xs={4}>????????????</Grid>
                                    <Grid item xs={8}>
                                        <Form.Control size="sm" value={significant} onChange={(e)=>setSignificant(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                            </li>
                        </ul>
                    </Grid>
                </Grid>
                
    
                <div>
                    <div className={BibleGiftStyle.modifyTitle}>???????????????</div>
                    <ul>
                        <li className={BibleGiftStyle.modifyList}>
                            <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                <Grid item xs={2}>?????????</Grid>
                                <Grid item xs={4}>
                                    <Form.Control size="sm" value={church} onChange={(e)=>setChurch(e.target.value)}></Form.Control>
                                </Grid>
                            </Grid>
                        </li>
                        <li className={BibleGiftStyle.modifyList}>
                            <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                <Grid item xs={2}>???????????????</Grid>
                                <Grid item xs={10} className="d-flex flex-row align-items-center gap-3">
                                    <div className="border rounded text_m py-1 px-3 border-1"><strong>{msgNo}???</strong></div>
                                    <Button variant="outlined" size="small" onClick={()=>setOpenImages(true)}>????????? ????????????</Button>
                                </Grid>
                            </Grid>
                            <Dialog open={openImages} onClose={()=>setOpenImages(false)}>
                                <div className="p-4">
                                    <Grid container spacing={6}>
                                    {imageLists.map(Lists =>{
                                        return(
                                            <Grid item xs={6} key={Lists}>
                                                <Form.Check type="radio" name="msgImage" defaultChecked={msgNo === Lists ? true : false} value={Lists} label={`${Lists}???`} onChange={(e)=>setMsgNo(e.target.value)}></Form.Check>
                                                <img src={orderImageLink(Lists)} width="250"></img>
                                            </Grid>
                                        )
                                    })}
                                    </Grid>
                                    <Button variant="contained" className="float-end" onClick={()=>setOpenImages(false)}>??????</Button>
                                </div>
                            </Dialog>
                        </li>
                        <li className={BibleGiftStyle.modifyList}>
                            <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                <Grid item xs={2}>?????????</Grid>
                                <Grid item xs={6}>
                                    <Form.Control as="textarea" size="sm" value={message} onChange={(e)=>setMessage(e.target.value)}></Form.Control>
                                </Grid>
                            </Grid>
                        </li>
                    </ul>
                </div>
                <div>
                    <div className={BibleGiftStyle.modifyTitle}>????????????/??????</div>
                    <ul>
                        <li className={BibleGiftStyle.modifyList}>
                            <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                <Grid item xs={2}>????????????</Grid>
                                <Grid item xs={4}>
                                    <Form.Select size="sm" style={{width: '100%', height:'30px'}} value={cpKind} onChange={(e)=>setCpKind(e.target.value)}>
                                        <option value="multipon">????????????</option>
                                        <option value="groupon">????????????</option>
                                    </Form.Select>
                                </Grid>
                                {cpKind === 'groupon' &&
                                <>
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}>
                                    <Form.Control value={grouponNo} onChange={(e)=>setGrouponNo(e.target.value)} size="sm"/>
                                </Grid>
                                <Grid item xs={2}><Button variant="contained" size="small" onClick={()=>powerMakeGrouponNoWithPrefix(prefixNo)}>??????????????????</Button></Grid>
                                </>}
                            </Grid>
                        </li>
                    
                        <li className={BibleGiftStyle.modifyList}>
                            <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                <Grid item xs={2}>??????</Grid>
                                <Grid item xs={4}>
                                    <Form.Control size="sm" value={issuableSu} onChange={(e)=>setIssuableSu(e.target.value)}></Form.Control>
                                </Grid>
                            </Grid>
                        </li>
    
                        <li className={BibleGiftStyle.modifyList}>
                        {cpKind === 'multipon' &&
                            <>
                                <Grid container className="border rounded p-3 mt-3">
                                    <Grid item xs={6} className="mt-2">
                                        {bible.map((Lists, index)=>{
                                            return(
                                                <React.Fragment key={index}>
                                                    {
                                                        Lists.code.slice(0,1) === 'B' &&
                                                        <Grid container>
                                                            <Grid item xs={5}>
                                                                <Form.Check defaultChecked={userOrderInfo.cp_kind === 'multipon' && saleCodes[0] === Lists.code ? true : false || ''} type="radio" value={Lists.code} onChange={(e)=>setSingleCodes(e.target.value)} name="radioMulti" label={Lists.title} className="mb-3"/>
                                                            </Grid>
                                                            <Grid item xs={4} className="text_sm">{Lists.price}??? / {Lists.sale}???</Grid>
                                                        </Grid>
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid>
                                    <Grid item xs={6} className="mt-2">
                                        {bible.map((Lists, index)=>{
                                            return(
                                                <React.Fragment key={index}>
                                                    {
                                                        Lists.code.slice(0,1) === 'A' &&
                                                        <Grid container>
                                                            <Grid item xs={5}>
                                                                <Form.Check defaultChecked={userOrderInfo.cp_kind === 'multipon' && saleCodes[0] === Lists.code ? true : false || ''} type="radio" value={Lists.code} onChange={(e)=>setSingleCodes(e.target.value)} name="radioMulti" label={Lists.title} className="mb-3"/>
                                                            </Grid>
                                                            <Grid item xs={4} className="text_sm">{Lists.price}??? / {Lists.sale}???</Grid>
                                                        </Grid>
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                                <div className="mt-2 float-end d-flex flex-row align-items-center gap-2">
                                    <Tooltip title="???????????? ???, [????????????]??? ??????????????????." placement="top">
                                        <span>
                                        <Button variant="contained" color="secondary" onClick={()=>setOpenModifySalesMulti(true)} disabled={couponCheck}>????????????/??????</Button>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="??????????????? ?????????, ??????????????? ?????? ??????????????????." placement="top">
                                        <span>
                                        <Button variant="contained" disabled={couponCheck === true ? false : true} onClick={powerModifyGrouponInfoMulti}>????????????</Button>
                                        </span>
                                    </Tooltip>
                                </div>
                                <Dialog open={openModifySalesMulti} onClose={()=> setOpenModifySalesMulti(false)} fullWidth={true}>
                                    <div className="p-4">
                                        <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                            ??????/????????????
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenModifySalesMulti(false)}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </h6>
                                        <ul className="p-0">
                                            <li className={BibleGiftStyle.modifyList}>
                                                <Form onSubmit={(e)=> codeSaleListMulti(e)}>
                                                    <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                                        <Grid item xs={5}>{bibleName(singleCodes)}</Grid>
                                                        <Grid item xs={5}>
                                                            <Form.Control defaultValue={bibleSale(singleCodes)}></Form.Control>
                                                            <Form.Control type="hidden" value={singleCodes}></Form.Control>
                                                        </Grid>
                                                        <Grid item xs={2}>
                                                            <Button type="submit" size="small" variant="contained" color="secondary">??????</Button>
                                                        </Grid>
                                                    </Grid>
                                                </Form>
                                            </li>
                                        </ul>
                                    </div>
                                </Dialog>
                            </>
                            }
                            {cpKind === 'groupon' &&
                            <>
                                <Grid container className="border rounded p-3 mt-3">
                                    <Grid item xs={6} className="mt-2">
                                        {bible.map((Lists, index)=>{
                                            return(
                                                <React.Fragment key={Lists.title}>
                                                    {
                                                        Lists.code.slice(0,1) === 'B' &&
                                                        <>
                                                        <Grid container>
                                                            <Grid item xs={5}>
                                                                <Form.Check defaultChecked={saleCodes.includes(Lists.code) ? true : false} type="checkbox" value={Lists.code} onChange={(e)=>checkGroupPick(e)} name="checkGroup" label={Lists.title} className="mb-3"/>
                                                            </Grid>
                                                            <Grid item xs={4} className="text_sm">{Lists.price}??? / {Lists.sale}???</Grid>{console.log(codeSale)}
                                                            <Grid item xs={3} className="text_sm text-danger fw-bolder">{acodeArr.includes(Lists.code) && <>{codeSale.map(codes => codes.code === Lists.code && <>{codes.asale}???</>)}</>}</Grid>
                                                        </Grid>
                                                        </>
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid>
                                    <Grid item xs={6} className="mt-2">
                                        {bible.map((Lists, index)=>{
                                            return(
                                                <React.Fragment key={Lists.title}>
                                                    {
                                                        Lists.code.slice(0,1) === 'A' &&
                                                        <Grid container>
                                                            <Grid item xs={5}>
                                                                <Form.Check defaultChecked={saleCodes.includes(Lists.code) ? true : false} type="checkbox" value={Lists.code} onChange={(e)=>checkGroupPick(e)} name="checkGroup" label={Lists.title} className="mb-3"/>
                                                            </Grid>
                                                            <Grid item xs={4} className="text_sm">{Lists.price}??? / {Lists.sale}???</Grid>
                                                            <Grid item xs={3} className="text_sm text-danger fw-bolder">{acodeArr.includes(Lists.code) && <>{codeSale.map(codes => codes.code === Lists.code && <>{codes.asale}???</>)}</>}</Grid>
                                                        </Grid>
                                                    }
                                                </React.Fragment>
                                            )
                                        })}
                                    </Grid>
                                </Grid>
                                <Dialog open={openModifySales} onClose={()=> setOpenModifySales(false)} fullWidth={true}>
                                    <div className="p-4">
                                        <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                            ??????/????????????
                                            <span className="text-danger text_s ms-2">??????????????? ?????? ????????? ????????? ??????????????????, ????????????????????? ????????? ?????????.</span>
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenModifySales(false)}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </h6>
                                        <ul className="p-0">
                                            {codes.length > 1 && codes.map(Lists => {
                                                return(
                                                    <li key={Lists} className={BibleGiftStyle.modifyList}>
                                                        <Form onSubmit={(e)=> codeSalesList(e)}>
                                                            <Grid container spacing={2} className="d-flex flex-row align-items-center">
                                                                <Grid item xs={5}>{bibleName(Lists)}</Grid>
                                                                <Grid item xs={5}>
                                                                    <Form.Control defaultValue={bibleSale(Lists)}></Form.Control>
                                                                    <Form.Control type="hidden" value={Lists}></Form.Control>
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    {modiLists.includes(Lists) ? <></> : <Button type="submit" size="small" variant="contained">??????</Button>}
                                                                </Grid>
                                                            </Grid>
                                                        </Form>
                                                    </li>
                                                )
                                            }) || <div>2??? ?????? ??????????????? </div>}
                                        </ul>
                                        <Button variant="contained" size="small" className="float-end me-2 mt-2" color="secondary" disabled={codes.length === modiLists.length ? false : true} onClick={()=>setOpenModifySales(false)}>????????????</Button>
                                        <Button variant="contained" size="small" className="float-end me-2 mt-2" color="error" onClick={()=> {setModiLists([]); setCodeSale([]);}}>?????????</Button>
                                    </div>
                                </Dialog>
                                <div className="mt-2 float-end d-flex flex-row align-items-center gap-2">
                                    {codes.length < 2 && <div className="text-danger text_s">* ??????????????? 2??? ?????? ?????????????????? ?????????.</div>}
                                    <Tooltip title="???????????? ???, [????????????]??? ??????????????????." placement="top">
                                        <span>
                                        <Button variant="contained" color="secondary" onClick={()=>setOpenModifySales(true)}
                                            disabled={saleCodes.sort().join(',') === codes.sort().join(',') && false || modiLists.sort().join(',') === codes.sort().join(',') && true}>????????????/??????</Button>
                                        </span>
                                    </Tooltip>
                                    <Tooltip title="??????????????? ?????????, ??????????????? ?????? ??????????????????." placement="top">
                                        <span>
                                        <Button variant="contained" onClick={powerModifyGrouponInfoGroup} disabled={modiLists.sort().join(',') === codes.sort().join(',') && codes.length > 1 ? false : true}>????????????</Button>
                                        </span>
                                    </Tooltip>
                                </div>
                            </>
                            }
                        </li>
                    </ul>
                </div>
            </>
        )
    }

    function OrderHistory({history, order_no}){

        // ???????????? ??????
        const powerCancelGrouponConsult = async (bgh_idx) => {
           try{
           const response = await axios.post
           (
               STOREAPI,
               {
                   "task": "powerCancelGrouponConsult",
                   "bgh_idx": bgh_idx,
                   "order_no": order_no,
                   "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
               },
               { 
                   withCredentials: true
               }
           )
          .then((response) => {response.data.success === true ? alert('???????????? ????????? ?????????????????????.') : alert('???????????? ????????? ??????????????????.')})
           } catch(e) { console.error(e.message) }
           powerOrderedGrouponInfo(order_no);
       }

       // ???????????? ??????
       const powerRepairGrouponConsult = async (bgh_idx) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerRepairGrouponConsult",
                "bgh_idx": bgh_idx,
                "order_no": order_no,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('???????????? ????????? ?????????????????????.') : alert('???????????? ????????? ??????????????????.')})
        } catch(e) { console.error(e.message) }
        powerOrderedGrouponInfo(order_no);
        }
        
        const kindArr = ['deposit', 'refund', 'adjust'];
        return(
           <>
           {
               <Table striped bordered className="text_m">
                   <thead className="text-center">
                       <tr className="col">
                           <th className="col-1">??????</th>
                           <th className="col-5">??????</th>
                           <th className="col-2">??????</th>
                           <th className="col-1">??????/??????</th>
                       </tr>
                   </thead>
                   <tbody className="text-center">
                       {history.length > 0 && history.map(Lists =>{
                           return(
                               <tr key={history.bgh_idx}>
                                   <td className="text_sm text-nowrap py-1">{Lists.kind_title}</td>
                                   {kindArr.includes(Lists.h_kind) &&
                                   <td className="text_sm py-1">
                                    ??????:&nbsp;{Lists.money}&nbsp;/&nbsp;
                                    ????????????:&nbsp;{Lists.howtopay}&nbsp;/&nbsp;
                                    {Lists.h_info && <>??????:&nbsp;{Lists.h_info}</>}
                                   </td> 
                                   || <td className="text_sm py-1">{Lists.h_memo}</td>}
                                   <td className="text_sm py-1">{Lists.h_time}</td>
                                   <td className="text_sm py-1">
                                       {Lists.cancel === '0000-00-00 00:00:00' && <Button variant="contained" className="px-1 py-0" color="error" size="small" onClick={()=>powerCancelGrouponConsult(Lists.bgh_idx)}>??????</Button>}
                                       {Lists.cancel !== '0000-00-00 00:00:00' && <Button variant="contained" className="px-1 py-0" size="small" onClick={()=>powerRepairGrouponConsult(Lists.bgh_idx)}>??????</Button>}
                                   </td>
                               </tr>
                           )
                       })}
                   </tbody>
               </Table>
           }
           </>
        )
   }

    return(
        <> 
        <Paper elevation={9} className="p-3 miniBox sortPersonal" style={{height: '200px !important'}}>
            <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                <div className="fw-bolder">????????????</div>
                <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                    <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                </IconButton>
            </div>
            <div className="mt-4 d-flex flex-column align-items-center">
                ?????????: {giftTotal.total_su}???
            </div>
        </Paper>
        <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
            <div className="p-4 vh80">
                <div className="mb-3 d-flex flex-row justify-content-between align-items-center">
                    <h5>????????????</h5>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Table className="border rounded" striped>
                    <thead className="text-center">
                        <tr>
                            <th className="py-2">??????</th>
                            <th className="py-2">????????????</th>
                            <th className="py-2">?????????</th>
                            <th className="py-2">?????????</th>
                            <th className="py-2">?????????</th>
                            <th className="py-2">??????</th>
                            <th className="py-2">??????</th>
                            <th className="py-2">????????????</th>
                            <th className="py-2">????????????</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        { giftList.list && bibleList.GoodsList &&
                        giftList.list.map(Lists => {
                            return(
                                <tr className="text_sm" key={Lists.order_no}>
                                    <td className={`p-1 ${Lists.update_state === 'created' && 'text-danger' || Lists.update_state === 'servicing' && 'text-primary'}`}>{bibleGiftCondition(Lists.update_state)}</td>
                                    <td className="py-1">
                                        <div type="button" className="p-0 fw-bolder" style={{color:' #6667AB', textDecoration:'underline'}} onClick={()=>showOrder(Lists.order_no, Lists.update_state, Lists.cp_kind, Lists.codes)}>{Lists.order_no}</div>
                                    </td>
                                    <td className="py-1">{Lists.order_time}</td>
                                    <td className="py-1">{Lists.order_name}</td>
                                    <td className="py-1">{Lists.church}</td>

                                    {Lists.cp_kind === 'multipon' && 
                                    <td className="py-1">
                                        <span><ConfirmationNumberOutlinedIcon style={{fontSize:'18px'}}></ConfirmationNumberOutlinedIcon></span>
                                        <span className="ms-2">????????????</span>
                                    </td>}
                                    {Lists.cp_kind === 'groupon' && 
                                    <td className="py-1" style={{color:'#00695f'}}>
                                        <span><DynamicFeedOutlinedIcon style={{fontSize:'18px'}}></DynamicFeedOutlinedIcon></span>
                                        <span className="ms-2">????????????</span>
                                    </td>}

                                    <td className="py-1 fw-bolder">{Lists.su}</td>

                                    {Lists.cp_kind === 'multipon' &&
                                    <td className="py-1">{bookName(Lists.codes)}</td>}
                                    {Lists.cp_kind === 'groupon' && 
                                    <td className="py-1">
                                        {bookName(Lists.codes)[0]}
                                        &nbsp;???&nbsp;
                                        {Lists.codes.split(',').length - 1}???
                                    </td>}

                                    <td className="py-1">
                                        {Lists.update_state === 'servicing' && <Button variant="contained" className="py-0 px-3" size="small" onClick={()=>powerGrouponUsingUserListMain(Lists.order_no, Lists.cp_kind)}>????????????</Button>}
                                    </td>
                                </tr>
                            )
                        }) }
                    </tbody>
                </Table>
                <Dialog open={openCouponListMain} onClose={()=>setOpenCouponListMain(false)} fullWidth={true} maxWidth="md">
                    <div className="p-3">
                        <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                            ????????????
                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenCouponListMain(false)}>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                            </IconButton>
                        </h6>
                        <UsingCoupon coupon={usingUserList.groupon_list} kind={cpKind} orderNo={orderNoUsing}></UsingCoupon>
                    </div>
                </Dialog>
            </div>
            <Stack spacing={2} className="w-100 pb-3 d-flex align-items-center">
                <Pagination count={giftTotal.total_su && giftTotal.total_su > 0 && Math.ceil(Number(giftTotal.total_su) / limit)} value={page} onChange={(e)=>setPage(e.target.textContent)} variant="outlined" shape="rounded" />
            </Stack>
        </Dialog>
    
        <Dialog onClose={()=> setOpenOrder(false)} open={openOrder} fullWidth={true} maxWidth="md">
            {giftOrder.order_info && bibleList.GoodsList &&
                <div className="p-4">
                    <div className={BibleGiftStyle.title}> 
                        <h5>????????????</h5>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenOrder(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                        </IconButton>
                    </div>
                    <div className="border rounded">
                        <ul className="px-2 m-0 py-1">
                            <li className={BibleGiftStyle.listSetting}>
                                <Grid container>
                                    <Grid item xs={3}>????????????</Grid>
                                    <Grid item xs={8}><strong>{userOrderInfo.order_no}</strong></Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.listSetting}>
                                <Grid container className="d-flex flex-row align-items-center">
                                    <Grid item xs={3}>????????????</Grid>
                                    <Grid item xs={6}>
                                        <Button className="p-0" onClick={()=>setOpenUpdateState(true)}>{updateStateName(userOrderInfo.update_state)}</Button>
                                    </Grid>
                                </Grid>
                                <Dialog open={openUpdateState} onClose={()=>setOpenUpdateState(false)}>
                                    <div className="p-4">
                                        <h6 className="border-bottom fw-bolder mb-3 pb-2 d-flex align-items-center justify-content-between">
                                            ??????????????????
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenUpdateState(false)}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </h6>
                                        <Form.Select defaultValue={userOrderInfo.update_state} onChange={(e)=>setUpdateState(e.target.value)}>
                                            <option value="created">????????????(????????????)</option>
                                            <option value="checking">????????????(?????????)</option>
                                            <option value="waiting">????????????(???????????? ???)</option>
                                            <option value="paid">????????????(????????????)</option>
                                            <option value="servicing">????????????(????????? ???)</option>
                                            <option value="finished">?????????(?????????)</option>
                                            <option value="canceled">?????????(??????)</option>
                                        </Form.Select>
                                        <Button variant="contained" size="small" className="mt-3 float-end" onClick={()=>powerUpdateGrouponState(userOrderInfo.order_no, updateState)}>????????????</Button>
                                    </div>
                                </Dialog>
                            </li>
                            <li className={BibleGiftStyle.listSetting}>
                                <Grid container>
                                    <Grid item xs={3}>?????????</Grid>
                                    <Grid item xs={8}>{userOrderInfo.order_time}</Grid>
                                </Grid>
                            </li>
                            <li className={BibleGiftStyle.listSetting}>
                                <Grid container>
                                    <Grid item xs={3}>?????????</Grid>
                                    <Grid item xs={8}></Grid>
                                </Grid>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div className="d-flex flex-row align-items-center justify-content-between mt-2">
                            <div className={BibleGiftStyle.listTitle}>?????? ????????????</div>
                        </div>
                        <div className="border rounded">
                            <ul className="px-2 m-0 py-1">
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>?????????</Grid>
                                        <Grid item xs={6}>{userOrderInfo.order_name}</Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>????????????</Grid>
                                        <Grid item xs={4}>{userOrderInfo.order_phone}</Grid>
                                        {userOrderInfo.cp_kind === 'groupon' &&
                                        <Grid item xs={5}>
                                            <span className="text_sm me-2">?????????????????????:</span><strong>{userOrderInfo.create_time === '0000-00-00 00:0000' ? <span className="text-danger">?????????</span> : <>{userOrderInfo.create_time}</>}</strong>
                                        </Grid>
                                        }
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>?????????</Grid>
                                        <Grid item xs={4}>{userOrderInfo.order_email}</Grid>
                                        {userOrderInfo.cp_kind === 'groupon' &&
                                        <Grid item xs={5}>
                                            <span className="text_sm me-2">?????????????????????:</span><strong>{userOrderInfo.expire_time === '0000-00-00 00:0000' ? <span className="text-danger">?????????</span> : <>{userOrderInfo.expire_time}</>}</strong>
                                        </Grid>
                                        }
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container className="d-flex flex-row align-items-center">
                                        <Grid item xs={3}>????????????</Grid>
                                        {userOrderInfo.cp_kind === 'groupon' &&
                                        <>
                                        <Grid item xs={4} className="fw-bolder">????????????</Grid>
                                        <Grid item xs={5}>
                                            <span className="text_sm me-2">??????????????????:</span><strong>{userOrderInfo.groupon_no === "" ? <>?????????<span className="text_sm ms-1 text-secondary">(????????????????????? ?????? ????????????)</span></> : <>{userOrderInfo.groupon_no}</>}</strong>
                                        </Grid>
                                        </>
                                        }
                                        {userOrderInfo.cp_kind === 'multipon' && 
                                        <>
                                        <Grid item xs={4} className="fw-bolder">????????????</Grid>
                                        <Grid item xs={5}>
                                            <span className="text_sm me-2">?????????????????????:</span><strong>{userOrderInfo.create_time === '0000-00-00 00:0000' ? <span className="text-danger">?????????</span> : <>{userOrderInfo.create_time}</>}</strong>
                                        </Grid>
                                        </>}
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>??????</Grid>
                                        <Grid item xs={8}>{userOrderInfo.issuable_su}&nbsp;???&nbsp;{userOrderInfo.update_state === 'servicing' && <span className="text_sm">(?????? {uniIssuedSu == "" ? 0 : uniIssuedSu}???)</span>}</Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>????????????</Grid>
                                        <Grid item xs={8}>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                {   
                                                    userSaleInfo.map(Lists => (
                                                        <React.Fragment key={Lists.code}>
                                                                {Lists.code.slice(0,1) === 'B' &&
                                                                <Grid container className="d-flex flex-row align-items-center">
                                                                    <Grid item xs={6} className="d-flex flex-row align-items-center gap-1 text_sm">
                                                                        <MenuBookOutlinedIcon style={{fontSize:'17px'}} />
                                                                        <span>{bookName(Lists.code)}</span>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <span className="text-nowrap">{Lists.sale}???</span>
                                                                    </Grid>
                                                                </Grid>}
                                                        </React.Fragment>
                                                    ))
                                                }
                                                </Grid>
                                                <Grid item xs={6}>
                                                {   
                                                    userSaleInfo.map(Lists => (
                                                        <React.Fragment key={Lists.code}>
                                                                {Lists.code.slice(0,1) === 'A' &&
                                                                <Grid container className="d-flex flex-row align-items-center">
                                                                    <Grid item xs={6} className="d-flex flex-row align-items-center gap-1 text_sm">
                                                                        <HeadphonesOutlinedIcon style={{fontSize:'18px'}} />
                                                                        <span>{bookName(Lists.code)}</span>
                                                                    </Grid>
                                                                    <Grid item xs={6}>
                                                                        <span className="text-nowrap">{Lists.sale}???</span>
                                                                    </Grid>
                                                                </Grid>}
                                                        </React.Fragment>
                                                    ))
                                                }
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Dialog open={openBible} onClose={()=>setOpenBible(false)} fullWidth={true} maxWidth="sm">
                                        <div className="p-3">
                                            <div>????????????</div>
                                        </div>
                                    </Dialog>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="d-flex flex-row align-items-center gap-2 w-100 justify-content-end mt-2">
                        {userOrderInfo.cp_kind === 'multipon' &&
                        <>
                        <Button variant="contained" className="text-" size="small" color="error" onClick={()=>powerGrouponUsingUserList(userOrderInfo.order_no, userOrderInfo.cp_kind)}>??????????????????</Button>
                        <Dialog open={openCouponList} onClose={()=>setOpenCouponList(false)} fullWidth={true} maxWidth="md">
                            <div className="p-3">
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenCouponList(false)}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <UsingCoupon coupon={usingUserList.groupon_list} kind={userOrderInfo.cp_kind}></UsingCoupon>
                            </div>
                        </Dialog>
                        <Button variant="contained" className="text-" size="small" color="secondary" onClick={()=>setOpenMultiCoupon(true)}>??????????????????</Button>
                        <Dialog open={openMultiCoupon} onClose={()=>setOpenMultiCoupon(false)}>
                            <Alert variant="outlined" severity="success">
                                <AlertTitle><strong>????????????</strong></AlertTitle>
                                <div>?????????????????? <strong>{bookName(userOrderInfo.codes)}</strong>??? ?????????????????????????</div>
                                <div className="text_s text-secondary mt-2">* ??????&???????????? ??????, (????????? ?????? - ???????????? ???)?????? ???????????????.</div>
                                <div className="text_s text-secondary mt-2">* ????????????/?????? ????????? [??????????????????]?????? ??????????????????.</div>
                                <div className="d-flex justify-content-end mt-3 gap-2">
                                    <Button variant="outlined" size="small" onClick={()=>powerIssueMultipon(userOrderInfo.order_no, userOrderInfo.codes)}>??????</Button>
                                    <Button variant="outlined" color="error" size="small" onClick={()=>setOpenMultiCoupon(false)}>??????</Button>
                                </div>
                            </Alert>
                        </Dialog>
                        </>
                        }
                        {userOrderInfo.cp_kind === 'groupon' && userOrderInfo.groupon_no &&
                        <>
                        <Button variant="contained" className="text-" size="small" color="error" onClick={()=>powerGrouponUsingUserList(userOrderInfo.order_no, userOrderInfo.cp_kind)}>??????????????????</Button>
                        <Dialog open={openCouponListGroup} onClose={()=>setOpenCouponListGroup(false)} fullWidth={true} maxWidth="md">
                            <div className="p-3">
                                <h6 className="border-bottom mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    <span className="me-3 fw-bolder">????????????</span>
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenCouponListGroup(false)}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <Form.Group className="d-flex flex-row gap-2 my-2">
                                    <Form.Check type="radio" name="groupCouponUsing" checked={radioUsing === 'usingList'} className="me-2 text_sm py-0" value="usingList" onChange={(e)=>setRadioUsing(e.target.value)} label="???????????????"></Form.Check>
                                    <Form.Check type="radio" name="groupCouponUsing" checked={radioUsing === 'usingUsers'} className="text_sm py-0" value="usingUsers" onChange={(e)=>setRadioUsing(e.target.value)} label="???????????????"></Form.Check>
                                </Form.Group>
                                {radioUsing === 'usingList' && 
                                <>
                                    {userUsingInfo &&
                                    <div className="w-100 d-flex justify-content-center">
                                        <Table striped bordered className="w-50">
                                            <thead className="text-center text_m border">
                                                <th className="py-1">????????????</th>
                                                <th className="py-1">????????????</th>
                                            </thead>
                                            <tbody className="text-center text_m">
                                                {Object.entries(userUsingInfo).map((key, val) =>
                                                {
                                                    return(
                                                        <tr key={key[0]}>
                                                        <td>{key[0]}</td>
                                                        <td>{key[1]}</td>
                                                    </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>}
                                </>}
                                {radioUsing === 'usingUsers' && <UsingCoupon coupon={usingUserList.groupon_list} kind={userOrderInfo.cp_kind} orderNo={userOrderInfo.order_no}></UsingCoupon>}
                            </div>
                        </Dialog>
                        <Button variant="contained" size="small" color="warning" onClick={()=>setOpenExtendGroupon(true)}>????????????</Button>
                        <Dialog open={openExtendGroupon} onClose={()=> {setOpenExtendGroupon(false); setEndDateCount(0);}}>
                            <div className="p-3" style={{'height': '490px', 'width':'500px'}}>
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between w-100">
                                    ????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenExtendGroupon(false); setEndDateCount(0);}}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <div>
                                    <Grid container className="d-flex flex-row align-items-center m-3">
                                        <Grid item xs={4} className="d-flex flex-row align-items-center gap-2">
                                            <Form.Check type="radio" name="datePick" value="extendCount" onChange={(e)=>setExtendExpireOption(e.target.value)} checked={extendExpireOption === 'extendCount' ? true : false}></Form.Check>
                                            <div>???????????? ??????</div>
                                        </Grid> 
                                        <Grid item xs={3}>
                                            <Form.Control size="sma" value={endDateCount} onChange={(e)=>setEndDateCount(e.target.value)} disabled={extendExpireOption === 'extendCount' ? false : true}></Form.Control>
                                        </Grid>
                                    </Grid>
                                    <Grid container className="d-flex flex-row border-bottom m-3 pb-3 w-100" style={{'height':'290px'}}>
                                        <Grid item xs={4} className="d-flex flex-row gap-2">
                                            <Form.Check type="radio" name="datePick" value="extendDate" onChange={(e)=>setExtendExpireOption(e.target.value)} checked={extendExpireOption === 'extendDate' ? true : false}></Form.Check>
                                            <div>????????????</div>
                                        </Grid> 
                                        <Grid item xs={3}>
                                            <DatePicker
                                                inline
                                                disabled={extendExpireOption === 'extendDate' ? false : true}
                                                dateFormat="yyyy-MM-dd"
                                                selected={endDate}
                                                maxDate={maxDate}
                                                minDate={new Date()}
                                                onChange={(date) => setEndDate(date)}
                                                locale={ko}
                                                showPopperArrow={false}
                                                customInput={
                                                    <Form.Control size="sm" style={{width: '150px'}} variant="outlined" size="small" label="?????????" />
                                                }>
                                            </DatePicker>
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="w-100 d-flex justify-content-center">
                                    <Button variant="contained" className="w-50" onClick={()=>powerExtendGrouponPeriod(userOrderInfo.order_no, extendExpireOption === 'extendCount' ? Number(endDateCount) : Moment(endDate).format('YYYY-MM-DD').toString())}>????????????</Button>
                                </div>
                            </div>
                        </Dialog>
                        </>}

                        <Button variant="contained" size="small" color="success" onClick={()=>setOpenConsult(true)}>??????????????????</Button>
                        <Dialog open={openConsult} onClose={()=>setOpenConsult(false)} fullWidth={true} maxWidth="md">
                            <div className="p-3">
                                <h6 className="border-bottom fw-bolder ms-1 mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ????????????
                                    <div>
                                        <Button className="me-2" color="warning" variant="contained" size="small" onClick={()=>setOpenMoneyInsert(true)}>????????????</Button>
                                        <Button className="me-2" color="success" variant="contained" size="small" onClick={()=>setOpenConsultInsert(true)}>????????????</Button>
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenConsult(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                </h6>
                                <Table striped bordered className="text_m">
                                    <thead className="text-center">
                                        <tr className="col">
                                            <th className="col-1">??????</th>
                                            <th className="col-5">??????</th>
                                            <th className="col-2">??????</th>
                                            <th className="col-1">??????</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        {userHistoryInfo.length > 0 && userHistoryInfo.map(Lists =>{
                                            return(
                                                <React.Fragment key={Lists.bgh_idx}>
                                                {Lists.h_kind === 'consult' &&
                                                <tr>
                                                    <td className="text-nowrap">{Lists.h_kind}</td>
                                                    <td>{Lists.h_memo}</td>
                                                    <td>{Lists.h_time}</td>
                                                    <td>
                                                        <Button variant="contained" size="small" onClick={()=>showConsultModify(Lists.bgh_idx, Lists.h_memo)}>????????????</Button>
                                                    </td>
                                                </tr>}
                                                </React.Fragment>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        </Dialog>

                        {/* ???????????? ?????? & ?????? */}
                        <Dialog open={openConsultModify} onClose={()=>{setOpenConsultModify(false); setConsultMemo([]); setBghIdx([]);}} fullWidth={true} maxWidth="sm">
                            <div className="p-4">
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ??????????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>{setOpenConsultModify(false); setConsultMemo([]); setBghIdx([]);}}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <Form.Control as="textarea" className="text_m" value={consultMemo} onChange={(e)=>setConsultMemo(e.target.value)} style={{minHeight:'200px'}}></Form.Control>
                                <Button className="float-end mt-3" variant="contained" onClick={()=>powerModifyGrouponConsult(bghIdx, userOrderInfo.order_no)}>????????????</Button>
                            </div>
                        </Dialog>
                        <Dialog open={openConsultInsert} onClose={()=>{setOpenConsultInsert(false); setConsultMemo([]);}} fullWidth={true} maxWidth="sm">
                            <div className="p-4">
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>{setOpenConsultInsert(false); setConsultMemo([]);}}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <Form.Control as="textarea" className="text_m" value={consultMemo} onChange={(e)=>setConsultMemo(e.target.value)} style={{minHeight:'200px'}}></Form.Control>
                                <Button className="float-end mt-3" variant="contained" onClick={()=>powerInsertGrouponConsult(userOrderInfo.order_no)}>????????????</Button>
                            </div>
                        </Dialog>
                        <Dialog open={openMoneyInsert} onClose={closeMoneyInsert} fullWidth={true} maxWidth="sm">
                            <div className="p-4">
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={closeMoneyInsert}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <Grid container className="mb-2">
                                    <Grid item xs={3}>??????</Grid>
                                    <Grid item xs={9}>
                                        <Form.Select value={moneyKind} onChange={(e)=>setMoneyKind(e.target.value)}>
                                            <option value="deposit">??????</option>
                                            <option value="refund">??????</option>
                                            <option value="adjust">??????</option>
                                        </Form.Select>
                                    </Grid>
                                </Grid>
                                <Grid container className="mb-2">
                                    <Grid item xs={3}>????????????</Grid>
                                    <Grid item xs={9}>
                                        <Form.Select value={moneyHowtoPay} onChange={(e)=>setMoneyHowtoPay(e.target.value)}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </Form.Select>
                                    </Grid>
                                </Grid>
                                <Grid container className="mb-2">
                                    <Grid item xs={3}>??????</Grid>
                                    <Grid item xs={9}>
                                        <Form.Control placeholder="????????? ??????????????????." value={moneyMoney} onChange={(e)=>setMoneyMoney(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                                <Grid container className="mb-2">
                                    <Grid item xs={3}>??????</Grid>
                                    <Grid item xs={9}>
                                        <Form.Control as="textarea" placeholder="????????? ??????" value={moneyInfo} onChange={(e)=>setMoneyInfo(e.target.value)}></Form.Control>
                                    </Grid>
                                </Grid>
                                <Button className="float-end mt-3" variant="contained" onClick={()=>powerInsertGrouponMoney(userOrderInfo.order_no)}>????????????</Button>
                            </div>
                        </Dialog>

                        <Button variant="contained" size="small" color="success" onClick={()=>setOpenHistory(true)}>????????????(??????)</Button>
                        <Dialog open={openHistory} onClose={()=>setOpenHistory(false)} fullWidth={true} maxWidth="md">
                            <div className="p-3">
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenHistory(false)}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <OrderHistory history={userHistoryInfo} order_no={userOrderInfo.order_no}></OrderHistory>
                            </div>
                        </Dialog>

                        <Button variant="contained" size="small" onClick={()=>setOpenBibleModify(true)}>??????????????????</Button>
                        </div>
                        <Dialog open={openBibleModify} onClose={()=>setOpenBibleModify(false)} fullWidth={true} maxWidth="md">
                            <div className="p-3">
                                <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                    ??????????????????
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenBibleModify(false)}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </h6>
                                <ModifyCoupon order={userOrderInfo} sale={userSaleInfo} bible={bibleList.GoodsList}></ModifyCoupon>
                            </div>
                        </Dialog>
                    <div>
                        <div className={BibleGiftStyle.listTitle}>??????</div>
                        <div className="border rounded">
                            <ul className="px-2 m-0 py-1">
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container className="d-flex align-items-center">
                                        <Grid item xs={3}>?????? ??????</Grid>
                                        <Grid item xs={8} className="fw-bolder">&nbsp;&nbsp;{numComma(totalPrice)}</Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container className="d-flex align-items-center">
                                        <Grid item xs={3}>?????? ??????</Grid>
                                        <Grid item xs={8} className="text-danger fw-bolder">- {numComma(totalPerc)}</Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container className="d-flex align-items-center">
                                        <Grid item xs={3}>?????? ????????????</Grid>
                                        <Grid item xs={8} className="text-primary fw-bolder">&nbsp;&nbsp;{numComma(totalSale)}</Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>????????????</Grid>
                                        <Grid item xs={8}>???????????????</Grid>
                                    </Grid>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <div className={BibleGiftStyle.listTitle}>???????????????</div>
                        <div className="border rounded">
                            <ul className="px-2 m-0 py-1">
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>?????????</Grid>
                                        <Grid item xs={8}>{userOrderInfo.church}</Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>???????????????</Grid>
                                        <Grid item xs={8}>
                                            <img src={orderImageLink(userOrderInfo.msg_no)} width="300"></img>
                                        </Grid>
                                    </Grid>
                                </li>
                                <li className={BibleGiftStyle.listSetting}>
                                    <Grid container>
                                        <Grid item xs={3}>?????????</Grid>
                                        <Grid item xs={8}>{userOrderInfo.message}</Grid>
                                    </Grid>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </Dialog>
        </>
    )
}

export default BibleGift;