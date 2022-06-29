import React, { useState, useEffect, useRef} from 'react';
import { STOREAPI } from '../../../items/URL';
import { bibleGiftCondition, numComma } from '../../../items/Functions';
import axios from 'axios';
import { Paper, Grid, Button, IconButton, Dialog, Tooltip } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import { Table, Form } from 'react-bootstrap';
import BibleGiftStyle from '../../../style/css/BibleGiftStyle.module.css';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';


function ModifyCoupon({order, sale, bible}){
    const [orderName, setOrderName] = useState(order.order_name);
    const [orderPhone, setOrderPhone] = useState(order.order_phone);
    const [orderEmail, setOrderEmail] = useState(order.order_email);
    const [church, setChurch] = useState(order.church);
    const [msgNo, setMsgNo] = useState(order.msg_no);
    const [message, setMessage] = useState(order.message);
    const [cpKind, setCpKind] = useState(order.cp_kind);
    const [grouponNo, setGrouponNo] = useState(order.groupon_no);
    const [title, setTitle] = useState(order.title);
    const [subtitle, setSubtitle] = useState(order.subtitle);
    const [createName, setCreateName] = useState(order.create_name);
    const [createTime, setCreateTime] = useState(order.create_time);
    const [expireTime, setExpireTime] = useState(order.expire_time);
    const [su, setSu] = useState(order.su);
    const [codes, setCodes] = useState(order.codes.split(','));
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
    const [modiLists, setModiLists] = useState([]);

    
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
                aprice: e.target[0].defaultValue,
                asale: e.target[0].value
            }
        ]);
    }

    const codeSaleListMulti = (e) =>{
        e.preventDefault();
        powerMultiponModifyGrouponSalesList(e.target[1].value, e.target[0].defaultValue, e.target[0].value);
        setOpenModifySalesMulti(false);
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
        let sale = "";
        bible && bible.map(Lists =>{
            if(Lists.code === s) {
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

    // 그룹쿠폰양식 생성하기
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

    // 정보 수정하기
    const powerModifyGrouponInfo = async () => {
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
                "church": church,
                "msg_no": msgNo,
                "message": message,
                "groupon_no": grouponNo,
                "title": title,
                "subtitle": subtitle,
                "create_name": createName,
                "create_time": createTime,
                "expire_time": expireTime,
                "issuable_su": issuableSu,
                "explain": explain,
                "custom_links": customLinks,
                "significant": significant,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('정상적으로 수정되었습니다.') : alert(response.data.error_msg)})
        } catch(e) { console.error(e.message) }
    };
    
    // 그룹쿠폰 단가목록 갱신
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
       .then((response) => alert('정상적으로 수정되었습니다.'))
        } catch(e) { console.error(e.message); alert('수정에 실패했습니다.') }
        setOpenModifySales(false);
    };

    // 선물쿠폰 단가목록 갱신
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
       .then((response) => alert('정상적으로 수정되었습니다.'))
        } catch(e) { console.error(e.message); alert('수정에 실패했습니다.') }
        setOpenModifySales(false);
    };

    return(
        <>
            <div>
                <div className={BibleGiftStyle.modifyTitle}>주문자정보</div>
                <ul>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>주문자</Grid>
                            <Grid item xs={4}>
                                <Form.Control size="sm" value={orderName} onChange={(e)=>setOrderName(e.targer.value)}></Form.Control>
                            </Grid>
                        </Grid>
                    </li>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>연락처</Grid>
                            <Grid item xs={4}>
                                <Form.Control size="sm" value={orderPhone} onChange={(e)=>setOrderPhone(e.targer.value)}></Form.Control>
                            </Grid>
                        </Grid>
                    </li>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>이메일</Grid>
                            <Grid item xs={4}>
                                <Form.Control size="sm" value={orderEmail} onChange={(e)=>setOrderEmail(e.targer.value)}></Form.Control>
                            </Grid>
                        </Grid>
                    </li>
                </ul>
            </div>

            <div>
                <div className={BibleGiftStyle.modifyTitle}>메세지정보</div>
                <ul>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>단체명</Grid>
                            <Grid item xs={4}>
                                <Form.Control size="sm" value={church} onChange={(e)=>setChurch(e.targer.value)}></Form.Control>
                            </Grid>
                        </Grid>
                    </li>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>이미지선택</Grid>
                            <Grid item xs={10} className="d-flex flex-row align-items-center gap-3">
                                <div className="border rounded text_m py-1 px-3 border-1"><strong>{msgNo}번</strong></div>
                                <Button variant="outlined" size="small" onClick={()=>setOpenImages(true)}>이미지 선택하기</Button>
                            </Grid>
                        </Grid>
                        <Dialog open={openImages} onClose={()=>setOpenImages(false)}>
                            <div className="p-4">
                                <Grid container spacing={6}>
                                {imageLists.map(Lists =>{
                                    return(
                                        <Grid item xs={6} key={Lists}>
                                            <Form.Check type="radio" name="msgImage" defaultChecked={msgNo === Lists ? true : false} value={Lists} label={`${Lists}번`} onChange={(e)=>setMsgNo(e.target.value)}></Form.Check>
                                            <img src={orderImageLink(Lists)} width="250"></img>
                                        </Grid>
                                    )
                                })}
                                </Grid>
                                <Button variant="contained" className="float-end" onClick={()=>setOpenImages(false)}>확인</Button>
                            </div>
                        </Dialog>
                    </li>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>메세지</Grid>
                            <Grid item xs={6}>
                                <Form.Control as="textarea" size="sm" value={message} onChange={(e)=>setMessage(e.target.value)}></Form.Control>
                            </Grid>
                        </Grid>
                    </li>
                </ul>
            </div>
            <div>
                <div className={BibleGiftStyle.modifyTitle}>쿠폰발급/수정</div>
                <ul>
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>쿠폰종류</Grid>
                            <Grid item xs={4}>
                                <Form.Select size="sm" style={{width: '100%', height:'30px'}} value={cpKind} onChange={(e)=>setCpKind(e.target.value)}>
                                    <option value="multipon">선물쿠폰</option>
                                    <option value="groupon">그룹쿠폰</option>
                                </Form.Select>
                            </Grid>
                            {cpKind === 'groupon' &&
                            <>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}>
                                <Form.Control value={grouponNo} onChange={(e)=>setGrouponNo(e.target.value)} size="sm"/>
                            </Grid>
                            <Grid item xs={2}><Button variant="contained" size="small" onClick={()=>powerMakeGrouponNoWithPrefix(prefixNo)}>쿠폰번호생성</Button></Grid>
                            </>}
                        </Grid>
                    </li>
                
                    <li className={BibleGiftStyle.modifyList}>
                        <Grid container spacing={2} className="d-flex flex-row align-items-center">
                            <Grid item xs={2}>수량</Grid>
                            <Grid item xs={4}>
                                <Form.Control size="sm" defaultValue={su} onChange={(e)=>setIssuableSu(e.target.value)}></Form.Control>
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
                                                            <Form.Check defaultChecked={singleCodes === Lists.code ? true : false} type="radio" value={Lists.code} onChange={(e)=>setSingleCodes(e.target.value)} name="radioMulti" label={Lists.title} className="mb-3"/>
                                                        </Grid>
                                                        <Grid item xs={4} className="text_sm">{Lists.price}원 / {Lists.sale}원</Grid>
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
                                                            <Form.Check defaultChecked={singleCodes === Lists.code ? true : false} type="radio" value={Lists.code} onChange={(e)=>setSingleCodes(e.target.value)} name="radioMulti" label={Lists.title} className="mb-3"/>
                                                        </Grid>
                                                        <Grid item xs={4} className="text_sm">{Lists.price}원 / {Lists.sale}원</Grid>
                                                    </Grid>
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </Grid>
                            </Grid>
                            <Dialog open={openModifySalesMulti} onClose={()=> setOpenModifySalesMulti(false)} fullWidth={true}>
                                <div className="p-4">
                                    <h6 className="border-bottom fw-bolder mb-2 pb-2 d-flex align-items-center justify-content-between">
                                        쿠폰/단가수정
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
                                                        <Form.Control defaultValue={bibleOriSale(singleCodes)}></Form.Control>
                                                        <Form.Control type="hidden" value={singleCodes}></Form.Control>
                                                    </Grid>
                                                    <Grid item xs={2}>
                                                        <Button type="submit" size="small" variant="contained" color="secondary">수정</Button>
                                                    </Grid>
                                                </Grid>
                                            </Form>
                                        </li>
                                    </ul>
                                </div>
                            </Dialog>
                            <div className="mt-2 float-end d-flex flex-row align-items-center gap-2">
                                <Tooltip title="쿠폰수정 후, [수정하기]가 활성화됩니다." placement="top">
                                    <Button variant="contained" color="secondary" onClick={()=>setOpenModifySalesMulti(true)} disabled={order.codes === singleCodes ? true : false}>쿠폰수정</Button>
                                </Tooltip>
                                <Tooltip title="쿠폰변경이 있을시, 쿠폰수정을 먼저 진행해주세요." placement="top">
                                    <Button variant="contained" disabled={order.codes === singleCodes ? false : true}>수정하기</Button>
                                </Tooltip>
                            </div>
                            
                        </>
                        }
                        {cpKind === 'groupon' &&
                        <>
                            <Grid container className="border rounded p-3 mt-3">
                                <Grid item xs={6} className="mt-2">
                                    {bible.map(Lists=>{
                                        return(
                                            <React.Fragment key={Lists.title}>
                                                {
                                                    Lists.code.slice(0,1) === 'B' &&
                                                    <>
                                                    <Grid container>
                                                        <Grid item xs={5}>
                                                            <Form.Check defaultChecked={codes.includes(Lists.code) ? true : false} type="checkbox" value={Lists.code} onChange={(e)=>checkGroupPick(e)} name="checkGroup" label={Lists.title} className="mb-3"/>
                                                        </Grid>
                                                        <Grid item xs={4} className="text_sm">{Lists.price}원 / {Lists.sale}원</Grid>
                                                    </Grid>
                                                    </>
                                                }
                                            </React.Fragment>
                                        )
                                    })}
                                </Grid>
                                <Grid item xs={6} className="mt-2">
                                    {bible.map(Lists=>{
                                        return(
                                            <React.Fragment key={Lists.title}>
                                                {
                                                    Lists.code.slice(0,1) === 'A' &&
                                                    <Grid container>
                                                        <Grid item xs={5}>
                                                            <Form.Check defaultChecked={codes.includes(Lists.code) ? true : false} type="checkbox" value={Lists.code} onChange={(e)=>checkGroupPick(e)} name="checkGroup" label={Lists.title} className="mb-3"/>
                                                        </Grid>
                                                        <Grid item xs={4} className="text_sm">{Lists.price}원 / {Lists.sale}원</Grid>
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
                                        쿠폰/단가수정
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
                                                                <Form.Control defaultValue={bibleOriSale(Lists)}></Form.Control>
                                                                <Form.Control type="hidden" value={Lists}></Form.Control>
                                                            </Grid>
                                                            <Grid item xs={2}>
                                                                {modiLists.includes(Lists) ? <></> : <Button type="submit" size="small" variant="contained">확인</Button>}
                                                            </Grid>
                                                        </Grid>
                                                    </Form>
                                                </li>
                                            )
                                        }) || <div>2개 이상 선택시에만 </div>}
                                    </ul>
                                    <Button variant="contained" size="small" className="float-end me-2 mt-2" color="secondary" disabled={codes.length === modiLists.length ? false : true} onClick={powerGrouponModifyGrouponSalesList}>수정확인</Button>
                                    <Button variant="contained" size="small" className="float-end me-2 mt-2" color="error" onClick={()=> {setModiLists([]); setCodeSale([]);}}>초기화</Button>
                                </div>
                            </Dialog>
                            <div className="mt-2 float-end d-flex flex-row align-items-center gap-2">
                                {codes.length < 2 && <div className="text-danger text_s">* 그룹쿠폰은 2개 이상 선택해주셔야 합니다.</div>}
                                <Tooltip title="쿠폰수정 후, [수정하기]가 활성화됩니다." placement="top">
                                    <Button variant="contained" color="secondary" onClick={()=>setOpenModifySales(true)} disabled={JSON.stringify(order.codes.split(',')) === JSON.stringify(codes) ? true : false}>쿠폰수정</Button>
                                </Tooltip>
                                <Tooltip title="쿠폰변경이 있을시, 쿠폰수정을 먼저 진행해주세요." placement="top">
                                    <Button variant="contained" onClick={powerModifyGrouponInfo} disabled={JSON.stringify(order.codes.split(',')) === JSON.stringify(codes) && codes.length > 1 ? false : true}>수정하기</Button>
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

export default ModifyCoupon;