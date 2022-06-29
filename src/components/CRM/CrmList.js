import React, { useState, useEffect, useCallback, useRef } from 'react';
import Moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import CrmStyle from '../../style/css/CrmStyle.module.css';
import { CRMAPI, GKCAPI } from '../../items/URL';
import { img, s_img } from '../../items/Functions';

import axios from 'axios';
import {IconButton, Checkbox, Dialog, Paper, MenuList, MenuItem, Tooltip, Typography, Popover, Grid ,Button, ButtonGroup, TextField, Stack, AccordionSummary, AccordionDetails, Accordion, CircularProgress} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ChurchIcon from '@mui/icons-material/Church';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckIcon from '@mui/icons-material/Check';
import { Form, FloatingLabel } from 'react-bootstrap';
import InfoMain from '../Info/InfoMain';


function CrmList() {

   const [open, setOpen] = useState(false);
   const [qnaList, setQnaList] = useState([]);
   const [categoryList, setCategoryList] = useState([]);
   const [loading, setLoading] = useState(false);
   const [loading2, setLoading2] = useState(false);
   const [active, setActive] = useState('mall');
   const [showList, setShowList] = useState('NotYet');
   const [startDate, setStartDate] = useState(Moment().subtract(2, 'weeks').toDate());
   const [endDate, setEndDate] = useState(Moment().toDate());
   const [page,setPage] = useState(0);
   const [keyword, setKeyword] = useState([]);
   const [service,setService] = useState('mall');
   const [category, setCategory] = useState([]);
   const [kind, setKind] = useState([]);
   const [hide, setHide] = useState(0);
   const [count, setCount] = useState([]);
   const [findway, setFindway] = useState('notyet');
   const [noreply, setNoreply] = useState(1);
   const limit = 10;
   const [ansOpen, setAnsOpen] = useState([]);
   const [ansOpen2, setAnsOpen2] = useState([]);
   const [user_n, setUser_n] = useState('stop');
   const [userQna, setUserQna] = useState([]);
   const [service2, setService2] = useState("");
   const [q_no, setQ_no] = useState([]);
   const [deleteQ_no, setDeleteQ_no] = useState([]);
   const [deleteName, setDeleteName] = useState([]);
   const [deleteId, setDeleteId] = useState([]);
   const [deleteOpen, setDeleteOpen] = useState(false);
   const [moveQ_no, setMoveQ_no] = useState([]);
   const [moveId, setMoveId] = useState([]);
   const [moveName, setMoveName] = useState([]);
   const [moveGcode, setMoveGcode] = useState([]);
   const [moveOpen, setMoveOpen] = useState(false);        
   const [moveBigCate, setMoveBigCate] = useState([]);        
   const [moveSmallCate, setMoveSmallCate] = useState([]);
   const [crmGodp, setCrmGodp] = useState([]);
   const [crmMall, setCrmMall] = useState([]);
   const [infoOpen, setInfoOpen] = useState(false);
   const [infoUserId, setInfoUserId] = useState([]);
   const [infoUserN, setInfoUserN] = useState([]);
  
   const resetAll = () => { setCategory([]); setPage(1); setFindway([]); setNoreply(0); setHide(0); setKind([]);}
   const start = Moment(startDate).format('YYYY-MM-DD 00:00:00');
   const end = Moment(endDate).format('YYYY-MM-DD 23:59:59');

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

   const getQnaList = async () => {
       setLoading(true);
       try{
       const response = await axios.post
       (
           CRMAPI,
           {
               "task": "getQnaList",
               "start_date" : start,
               "end_date" : end,
               "keyword" : keyword,
               "limit" : limit,
               "service" : service,
               "category" : category,
               "page": page,
               "findway": findway,
               "noreply": noreply,
               "hide": hide,
               "kind": kind
           },
           { withCredentials: true }
       )
       .then((response) => response.data.success == true && setQnaList(response.data))
       } catch(e) { console.error(e.message) }
       setLoading(false)
   };

//    console.log(qnaList);
//    console.log(start+'/'+end+'/'+keyword+'/'+limit+'/'+service+'/키워드'+keyword+'/카테고리'+category+'/'+page+'/'+findway+'/'+noreply+'/'+hide+'/'+kind);

   useEffect(()=>{
    getQnaList();
   },[start, end, keyword, limit, service, category, page, findway, noreply, hide, kind, count])

   useEffect(()=>{
    getFaqCategoryList();
   },[kind, category, page, count, hide, findway]);

   const toggleAns = (q_no, user_n) => {
       setAnsOpen( ansOpen === q_no ? false : q_no);
       setQ_no(q_no);
       setUser_n(user_n);
   }

   const toggleAns2 = (q_no) => {
    setAnsOpen2( ansOpen2 === q_no ? false : q_no);
   }

   const DeleteItem = (q_no, name, id) => {
    setDeleteQ_no(q_no);
    setDeleteName(name);
    setDeleteId(id);
    setDeleteOpen(true);
   }

   const MoveItem = (q_no, gcode, name, id) => {
    setMoveQ_no(q_no);
    setMoveId(id);
    setMoveGcode(gcode);
    setMoveName(name);
    setMoveOpen(true);
   }

   const g_link = (gcode) => {
    return 'https://mall.godpeople.com/?G='+gcode;
   }
   const img_link = (gcode) => {
        if (gcode == 'dlv_gcode'){
            return 'https://img.godpeople.com/data/goods/3/5/1233223235-0/s_1233223235-0.gif';
        } else {
            return 'https://img.godpeople.com/data/goods'+s_img(gcode);
        }
    };
   const getUserQnaList = useCallback(async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
        CRMAPI,
        {
            "task": "getQnaList",
            "keyword" : user_n,
            "findway": 'user_n',
            "service": service2,
            "start_date" : Moment().subtract(52, 'weeks').toDate(),
            "end_date" : Moment().toDate(),
        },
        { withCredentials: true }
        )
        .then((response) => response.data.success == true && setUserQna(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
   },[user_n]);

   const removeQnaInfoJson = async () => {
    setLoading2(true);
    try{
    const response = await axios.post
    (
    CRMAPI,
    {
        "task": "removeQnaInfoJson",
        "q_no": deleteQ_no
    },
    { withCredentials: true }
    )
    .then(alert('정상적으로 삭제되었습니다.'))
    } catch(e) { alert('삭제에 실패했습니다.') }
    setTimeout(()=>setLoading2(false), 500);
    setDeleteOpen(false);
    setCount(new Date());
    setDeleteQ_no([]);
   }

   const changeQnaCategoryJson = async () => {
    setLoading2(true);
    try{
    const response = await axios.post
    (
    CRMAPI,
    {
        "task": "changeQnaCategoryJson",
        "q_no": moveQ_no,
        "service" : moveBigCate,
        "category" : moveSmallCate,
        "move_gcode": moveGcode,
    },
    { withCredentials: true }
    )
    .then(alert('정상적으로 이동되었습니다..'))
    } catch(e) { alert('이동에 실패했습니다.') }
    setTimeout(()=>setLoading2(false), 500);
    setMoveOpen(false);
    setMoveBigCate([]);
    setMoveSmallCate([]);
    setMoveGcode([]);
    setCount(new Date());
   }

   const getQnaNoReplyListGodp = async () => {
    setLoading(true);
    try{
    const response = await axios.post
    (
        CRMAPI,
        {
            "task": "getQnaNoReplyList",
            "service": "godp",
            "start_date": start,
            "end_date": end,
            "limit": 9999
        },
        { withCredentials: true }
    )
    .then((response) => response.data.success == true && setCrmGodp(response.data))
    } catch(e) { console.error(e.message) }
    setLoading(false);
   }

    const getQnaNoReplyListMall = async () => {
    setLoading(true);
    try{
    const response = await axios.post
    (
        CRMAPI,
        {
            "task": "getQnaNoReplyList",
            "service": "mall",     
            "start_date": start,
            "end_date": end,
            "limit": 9999
        },
        { withCredentials: true }
    )
    .then((response) => response.data.success == true && setCrmMall(response.data))
    } catch(e) { console.error(e.message) }
    setLoading(false);
    }
    useEffect(()=>{
        getQnaNoReplyListGodp();
        getQnaNoReplyListMall();
    },[category, count]);

   useEffect(()=>{
        getUserQnaList();
   },[user_n, service2])


   const infoOpenSet = (user_id, user_n) => {
    setInfoUserId(user_id);
    setInfoUserN(user_n);
    setInfoOpen(true);
    localStorage.setItem("user_n", infoUserN);
    localStorage.setItem("user_id", infoUserId);
   }

   const Refresh = () => {
    setService([]);
    setCategory([]);
    setPage(1);
    setFindway([]);
    setHide(0);
    setKind([]);
    setActive([]);
    setShowList('All');
    setNoreply(0);
   }

   function DatePick() {
        return (
            <div className="d-flex flex-row gap-3">
                <div className="d-flex flex-row align-items-center">
                    <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    locale={ko}
                    showPopperArrow={false}
                    customInput={
                        <TextField style={{width: '110px'}} variant="outlined" size="small" label="시작일" />
                    }
                    />
                    <ArrowRightAltIcon className="mx-2"></ArrowRightAltIcon>
                    <DatePicker
                    dateFormat="yyyy-MM-dd"
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    locale={ko}
                    showPopperArrow={false}
                    customInput={
                        <TextField style={{width: '150px'}} variant="outlined" size="small" label="종료일" />
                    }
                    />
                </div>
                <div className="d-flex flex-row gap-2">
                    <Button variant="outlined" className="text-nowrap px-3" style={{padding: '7px'}} onClick={Refresh}>새로고침</Button>
                    {showList === 'All' && <Button variant="outlined" className="px-3 text-nowrap" style={{padding: '7px'}} color="error" onClick={()=>{setShowList('NotYet'); setFindway('notyet'); setNoreply(1);}}>미답변만</Button>}
                    {showList === 'NotYet' && <Button variant="outlined" className="px-3 text-nowrap" style={{padding: '7px'}} color="success" onClick={()=>{setShowList('All'); setFindway([]); setNoreply(0);}}>전체문의</Button>}
                </div>
            </div>
       );
   };

   

    function CategoryList() {
        const [ panel1, setPanel1] = useState(true);
        const [ panel2, setPanel2] = useState(true);
        
        let A = [];
        let E = [];
        let H = [];
        let O = [];
        let Q = [];
        let R = [];
        let T = [];
        let U = [];
        let V = [];
        let W = [];
        let not_goods = [];
        let goods = [];
        let book = [];
        let ccm = [];
        let inst = [];

        crmGodp.result && crmGodp.result.qna_list && crmGodp.result.qna_list.map(Lists => {
            if (Lists.category.startsWith('A')) {
                A.push(Lists.q_no+Lists.category);
            } else if (Lists.category.startsWith('E')) {
                E.push(Lists.q_no);
            } else if (Lists.category.startsWith('H')) {
                H.push(Lists.q_no);
            } else if (Lists.category.startsWith('O')) {
                O.push(Lists.q_no);
            } else if (Lists.category.startsWith('Q')) {
                Q.push(Lists.q_no);
            } else if (Lists.category.startsWith('R')) {
                R.push(Lists.q_no);
            } else if (Lists.category.startsWith('T')) {
                T.push(Lists.q_no);
            } else if (Lists.category.startsWith('U')) {
                U.push(Lists.q_no);
            } else if (Lists.category.startsWith('V')) {
                V.push(Lists.q_no);
            } else if (Lists.category.startsWith('W')) {
                W.push(Lists.q_no);
            }
        })
            
        crmMall.result && crmMall.result.qna_list && crmMall.result.qna_list.map(Lists => {
            if(Lists.category === '상품문의' && Lists.kind === 'goods') {
                goods.push(Lists.q_no);
            } else if (Lists.category === '상품문의' && Lists.kind === 'book') {
                book.push(Lists.q_no);
            } else if (Lists.category === '상품문의' && Lists.kind === 'ccm') {
                ccm.push(Lists.q_no);
            } else if (Lists.category === '상품문의' && Lists.kind === 'inst') {
                inst.push(Lists.q_no);
            } else {
                not_goods.push(Lists.q_no)
            }
        })

        return(
            <Paper className="mt-2" style={{ minHeight: '70vh'}}>
                <Accordion expanded={panel2} disableGutters>
                    <div style={{height: '40px', overflow: 'hidden'}}>
                        <AccordionSummary
                        expandIcon={<ExpandMoreIcon onClick={()=>setPanel2(!panel2)}/>}
                        className="pb-2"
                        style={ active === 'mall' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} }
                        >
                            <div className="text-nowrap" onClick={()=>{setService('mall'); setPage(1); setCategory([]); setFindway('notyet'); setNoreply(1); setHide(0); setKind([]); setActive('mall'); setKeyword([]);}}>
                                <ShoppingCartIcon className="mx-2 my-1" style={{fontSize: '17px'}}></ShoppingCartIcon>
                                <span className="text_m">갓피플몰{(crmMall.result && crmMall.result.qna_total > 0) ? (<span>&nbsp;(<span className="text-danger">{crmMall.result && crmMall.result.qna_total}</span>)</span>) : ''}</span>
                            </div>
                        </AccordionSummary>
                    </div>
                    <AccordionDetails className="p-0">
                    <MenuList>
                        <MenuItem className="p-0 ps-2" onClick={(e)=>{setService('mall'); setCount(new Date()); setCategory('not_goods'); setHide(0); setKind([]); setPage(1); setActive('cs'); setKeyword([]);}} style={ active === 'cs' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} }><ArrowRightIcon></ArrowRightIcon><span className="text_sm">섬김이{(not_goods.length > 0) ? (<span>&nbsp;(<span className="text-danger">{not_goods.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem className="p-0 ps-2" onClick={(e)=>{setService('mall'); setHide(1); setCategory('not_goods'); setKind([]); setPage(1); setActive('delete'); setKeyword([]);}} style={ active === 'delete' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} }><ArrowRightIcon></ArrowRightIcon><span className="text_sm">삭제문의</span></MenuItem>
                        <MenuItem className="p-0 ps-2" onClick={(e)=>{setService('mall'); setHide(0); setCategory('goods'); setKind([]); setPage(1); setActive('goodss'); setKeyword([]);}} style={ active === 'goodss' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} }><ArrowRightIcon></ArrowRightIcon><span className="text_sm">상품문의</span></MenuItem>
                        <MenuItem onClick={()=>{setKind('book'); setService('mall'); setHide(0); setCategory('goods'); setPage(1); setActive('book'); setKeyword([]);}} style={ active === 'book' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-4"><ChevronRightIcon fontSize="small"></ChevronRightIcon><span className="text_sm">도서{(book.length > 0) ? (<span>&nbsp;(<span className="text-danger">{book.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=>{setKind('ccm'); setService('mall'); setHide(0); setCategory('goods'); setPage(1); setActive('ccm'); setKeyword([]);}} style={ active === 'ccm' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-4"><ChevronRightIcon fontSize="small"></ChevronRightIcon><span className="text_sm">뮤직{(ccm.length > 0) ? (<span>&nbsp;(<span className="text-danger">{ccm.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=>{setKind('inst'); setService('mall'); setHide(0); setCategory('goods'); setPage(1); setActive('inst'); setKeyword([]);}} style={ active === 'inst' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-4"><ChevronRightIcon fontSize="small"></ChevronRightIcon><span className="text_sm">악기,음향,영상{(inst.length > 0) ? (<span>&nbsp;(<span className="text-danger">{inst.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=>{setKind('goods'); setService('mall'); setHide(0); setCategory('goods'); setPage(1); setActive('goods'); setKeyword([]);}} style={ active === 'goods' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-4"><ChevronRightIcon fontSize="small"></ChevronRightIcon><span className="text_sm">교회,전도{(goods.length > 0) ? (<span>&nbsp;(<span className="text-danger">{goods.length}</span>)</span>) : ''}</span></MenuItem>
                    </MenuList>
                    </AccordionDetails>
                </Accordion> 
                <Accordion expanded={panel1} disableGutters>
                    <div style={{height: '40px', overflow: 'hidden'}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon onClick={()=>setPanel1(!panel1)}/>}
                            className="pb-2"
                            style={ active === 'godp' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} }
                            >
                            <div className="text-nowrap" onClick={()=>{setService('godp'); setPage(1); setCategory([]); setFindway('notyet'); setNoreply(1); setHide(0); setKind([]); setActive('godp'); setKeyword([]);}} >
                                <ChurchIcon className="mx-2 my-1" style={{fontSize: '17px'}}></ChurchIcon>
                                <span className="text_m">갓피플{(crmGodp.result && crmGodp.result.qna_total > 0) ? (<span>&nbsp;(<span className="text-danger">{crmGodp.result && crmGodp.result.qna_total}</span>)</span>) : ''}</span>
                            </div>
                        </AccordionSummary>
                    </div>
                    <AccordionDetails className="p-0">
                    <MenuList>
                        <MenuItem onClick={()=> {setCategory('A'); setService('godp'); setActive('A'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'A' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">회원정보{(A.length > 0) ? (<span>&nbsp;(<span className="text-danger">{A.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('E'); setService('godp'); setActive('E'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'E' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">취업{(E.length > 0) ? (<span>&nbsp;(<span className="text-danger">{E.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('H'); setService('godp'); setActive('H'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'H' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">만화{(H.length > 0) ? (<span>&nbsp;(<span className="text-danger">{H.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('O'); setService('godp'); setActive('O'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'O' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">성경쓰기&암송{(O.length > 0) ? (<span>&nbsp;(<span className="text-danger">{O.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('Q'); setService('godp'); setActive('Q'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'Q' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">컨텐츠몰{(Q.length > 0) ? (<span>&nbsp;(<span className="text-danger">{Q.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('R'); setService('godp'); setActive('R'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'R' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">씨앗{(R.length > 0) ? (<span>&nbsp;(<span className="text-danger">{R.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('T'); setService('godp'); setActive('T'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'T' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">모바일{(T.length > 0) ? (<span>&nbsp;(<span className="text-danger">{T.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('U'); setService('godp'); setActive('U'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'U' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">성경APP{(U.length > 0) ? (<span>&nbsp;(<span className="text-danger">{U.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('V'); setService('godp'); setActive('V'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'V' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">불법촬영물 신고{(V.length > 0) ? (<span>&nbsp;(<span className="text-danger">{V.length}</span>)</span>) : ''}</span></MenuItem>
                        <MenuItem onClick={()=> {setCategory('W'); setService('godp'); setActive('W'); setHide(0); setKind([]); setPage(1); setKeyword([]);}} style={ active === 'W' && { background : '#f0f0f0', transition: '1s'} || { background : 'white'} } className="p-0 ps-2"><ArrowRightIcon></ArrowRightIcon><span className="text_sm">게시글,사용자 신고{(W.length > 0) ? (<span>&nbsp;(<span className="text-danger">{W.length}</span>)</span>) : ''}</span></MenuItem>
                    </MenuList>
                    </AccordionDetails>
                </Accordion>
            </Paper>
        )
    }

    function AnswerBox(props) {
        const [newAns, setNewAns] = useState([]);
        const [loading, setLoading] = useState(false);
        const [hphone, sethphone] = useState(props.hphone);
        const [smsText, setSmsText] = useState('샬롬~ 1:1게시판에 답변이 등록되었습니다^^');
        const [answer, setAnswer] = useState(props.answer);
        const [image1, setImage1] = useState([]);
        const [showImage1, setShowImage1] = useState(false);
        const [image2, setImage2] = useState([]);
        const [showImage2, setShowImage2] = useState(false);
        const [imageOpen, setImageOpen] = useState(false);
        const [mail, setMail] = useState(props.mail);
        const [confirmOpen, setConfirmOpen] = useState(false);
        const [realImage, setRealImage] = useState(false);
        const [OpenTemplate, setOpenTemplate] = useState(false);
        const [openCreateTemplate, setOpenCreateTemplate] = useState(false);
        const [template, setTemplate] = useState([]);
        const [qnaKind, setQnaKind] = useState([]);
        const [title, setTitle] = useState([]);
        const [contents, setContents] = useState([]);
        const [category, setCategory] = useState([]);
        const [reload, setReload] = useState([]);
        const [showContents, setShowContents] = useState([]);
        const [openContents, setOpenContents] = useState(false);
        const [openChangeTemplate, setOpenChangeTemplate] = useState(false);
        const [best, setBest] = useState([]);
        const [tno, setTno] = useState([]);
        const [staff, setStaff] = useState([]);
    
        const showAnswer = (<div dangerouslySetInnerHTML={{__html:answer}} style={{whiteSpace:'pre-line'}}></div>);
        const sendImage1 = image1.length > 0 && `<span style="margin-right: 10px"><img src=${image1} style='max-width: 500px'></img></span>` || '';
        const sendImage2 = image2.length > 0 && `<span><img src=${image2} style='max-width: 500px'></img></span>` || '';
        const sendAnswer = 
        sendImage1+sendImage2+
        '<div>'+newAns+'</div>';
    
        const sendRealImage =
        `
            <div>
                ${image1.length !== 0 && sendImage1 || ''}
                ${image2.length !== 0 && sendImage2 || ''}
            </div>
        `
    
        // checkbox
        const [checked, setChecked] = useState(true);
        const handleChange = (event) => {
            setChecked(event.target.value);
        };
    
        const changeQnaReplyJson = async () => {
            setLoading(true);
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "changeQnaReplyJson",
                    "q_no": props.q_no,
                    "flag": "answer",
                    "answer": sendAnswer
                },
                { withCredentials: true }
            )
            .then(alert(props.name+'님 문의 답변이 완료되었습니다.'))
            } catch(e) { console.error(e.message) }
            setLoading(false);
            setConfirmOpen(false);
            setCount(new Date());
        }
    
        const textChange = (e) => {
            setNewAns(e.target.value.replaceAll(/(\r|\r\n)/g,"<br/>"));
        }
    
        // 템플릿용
        const createQnaTemplateJson = async () => {
            setLoading(true);
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "createQnaTemplateJson",
                    "category": category,
                    "title": title,
                    "contents": contents,
                },
                { withCredentials: true }
            )
            .then(res=>res.data.success === true && alert('템플릿이 정상적으로 등록되었습니다.'))
            } catch(e) { console.error(e.message); alert('템플릿이 등록에 실패했습니다. 다시 확인해주세요.') }
            setLoading(false);
            setOpenCreateTemplate(false);
            setCategory([]);
            setTitle([]);
            setContents([]);
            setReload(new Date());
        }
    
        const getQnaTemplateList = async () => {
            setLoading(true);
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "getQnaTemplateList",
                },
                { withCredentials: true }
            )
            .then(res=>res.data.success === true && setTemplate(res.data))
            } catch(e) { console.error(e.message) }
            setLoading(false);
        }

        useEffect(()=>{
            getQnaTemplateList();
        }, [reload])
    
        const get_godstaff_list = async () => {
            setLoading(true);
            try{
            const response = await axios.post
            (
                GKCAPI,
                {
                    "task": "get_godstaff_list",
                },
                { withCredentials: true }
            )
            .then(res=>res.data.success === true && setStaff(res.data))
            } catch(e) { console.error(e.message) }
            setLoading(false);
        }
        
        useEffect(()=>{
            get_godstaff_list();
        },[])
    
        const changeQnaTemplateJson = async (t_no, category, title, contents, best) => {
            setLoading(true);
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "changeQnaTemplateJson",
                    "t_no": t_no,
                    "category": category,
                    "title": title,
                    "contents": contents,
                    "best": best
                },
                { withCredentials: true }
            )
            .then(res=>res.data.success === true && alert('정상적으로 수정되었습니다.'))
            } catch(e) { console.error(e.message); alert('수정에 실패했습니다.') }
            setLoading(false);
            setReload(new Date());
            setOpenChangeTemplate(false);
            setTno([]);
            setCategory([]);
            setTitle([]);
            setContents([]);
            setBest([]);
        }
    
        const removeQnaTemplateJson = async (t_no) => {
            setLoading(true);
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "removeQnaTemplateJson",
                    "t_no": t_no
                },
                { withCredentials: true }
            )
            .then(res=>res.data.success === true && alert('정상적으로 삭제되었습니다.'))
            } catch(e) { console.error(e.message); alert('삭제에 실패했습니다.') }
            setLoading(false);
            setReload(new Date());
        }

    
        const ShowOpenContents = (t_no) => {
            setShowContents(t_no);
            setOpenContents(!openContents);
        }
    
        const changeTemplate = (t_noC, categoryC, titleC, contentsC, bestC) => {
            setOpenChangeTemplate(true);
            setTno(t_noC);
            setCategory(categoryC);
            setTitle(titleC);
            setContents(contentsC);
            setBest(bestC);
        }
        
        const applyTemplate = (contentsA) => {
            setNewAns(contentsA);
            setOpenTemplate(false);
        }
    
        return(
            <div className="border p-2 rounded">
            <Grid container className="px-3">
                <Grid item xs={6}>
                    <BorderColorIcon></BorderColorIcon>
                </Grid>
                <Grid item xs={6} className="d-flex flex-row justify-content-end">
                    <label htmlFor="icon-button-file">
                        <IconButton color="primary" aria-label="uploadPicture" component="span" onClick={()=>setImageOpen(true)}>
                            <PhotoCamera />
                            <span className="text_sm ms-1 fw-bolder text-nowrap">이미지첨부</span>
                        </IconButton>
                        {showImage1 === false && 
                        <Dialog open={imageOpen} onClose={()=>setImageOpen(false)}>
                            <div className="p-4">
                                <div className="mb-2 text_m">이미지 링크</div>
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <TextField label="URL" placeholder="URL을 입력해주세요" size="small" style={{width: '600px'}} value={image1} onChange={(e)=>setImage1(e.target.value)}></TextField>
                                    <Button variant="contained" onClick={()=>{setShowImage1(true); setImageOpen(false)}}>확인</Button>
                                </div>
                            </div>
                        </Dialog>}
                        {showImage1 === true &&
                        <Dialog open={imageOpen} onClose={()=>setImageOpen(false)}>
                            <div className="p-4">
                                <div className="mb-2 text_m">이미지 링크</div>
                                <div className="d-flex flex-row align-items-center gap-2">
                                    <TextField label="URL" placeholder="URL을 입력해주세요" size="small" style={{width: '600px'}} value={image2} onChange={(e)=>setImage2(e.target.value)}></TextField>
                                    <Button variant="contained" onClick={()=>{setShowImage2(true); setImageOpen(false)}}>확인</Button>
                                </div>
                            </div>
                        </Dialog>}
                    </label>
                    <Form.Group className="rounded mb-2 d-flex">           
                        <Form.Label className="ms-2 mt-2 text_m fw-bolder text-nowrap" style={{cursor:'pointer'}} onClick={()=>setOpenTemplate(true)}>템플릿</Form.Label>
                        <Form.Select size="sm" className="ms-2 w-25 text_sm" style={{minWidth: '100px'}} value={newAns} onChange={(e)=>setNewAns(e.target.value)}>
                            <option value="" style={{display:'none'}}>선택</option>
                            {template && template.result && template.result.map(Lists=>{
                                return(
                                    <React.Fragment key={Lists.t_no}>
                                    {Lists.best === '1' && <option value={Lists.contents}>{Lists.title}</option>}
                                    </React.Fragment>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Dialog open={OpenTemplate} onClose={()=>setOpenTemplate(false)} fullWidth={true} maxWidth="lg">
                        <div className="p-4">
                            <div>
                                <div className="border-bottom pb-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                    <h5>템플릿 목록</h5>
                                    <div className="d-flex flex-row align-items-center gap-3">
                                        <Button variant="contained" color="secondary" size="sm" onClick={()=>setOpenCreateTemplate(true)}>템플릿 작성</Button>
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenTemplate(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                </div>
                                <Grid container spacing={2} className="p-2 vh80">
                                    <Grid item xs={6} style={{overflowY:'auto'}}>
                                        <div className="fw-bolder text_l mb-2">갓피플몰</div>
                                        <ul className="p-0">
                                            {template && template.result && template.result.map(Lists=>{
                                                return(
                                                    <div key={Lists.t_no}>
                                                        {
                                                            Lists.category === 'mall' &&
                                                            <>
                                                            <li className={`${CrmStyle.templateList} col d-flex flex-row align-items-center border rounded p-1`}>
                                                                <div className="col-5 text_m" onClick={()=>ShowOpenContents(Lists.t_no)} style={{cursor:'pointer'}}>{Lists.title}</div>
                                                                {staff && staff.list && staff.list.map(staffs=>{
                                                                    if( staffs[0] === Lists.agent) {
                                                                        return(
                                                                            <div className="col-2 text_sm text-center" key={staffs[0]}>{staffs[1]}&nbsp;{staffs[2]}</div>
                                                                        )
                                                                    }
                                                                })}
                                                                <div className="col-2 text_sm text-center text-secondary">{Lists.rdate}</div>
                                                                <div className="col-3 text_sm text-center text-secondary">
                                                                    <Tooltip title="선택">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1`} onClick={()=>applyTemplate(Lists.contents)}>
                                                                            <LaunchIcon style={{fontSize:'20px'}}></LaunchIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="수정">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeTemplate(Lists.t_no, Lists.category, Lists.title, Lists.contents, Lists.best)}>
                                                                            <EditIcon style={{fontSize:'20px'}}></EditIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="삭제">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=> removeQnaTemplateJson(Lists.t_no)}>
                                                                            <DeleteIcon style={{fontSize:'20px'}}></DeleteIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    {Lists.best === '0' &&
                                                                    <Tooltip title="자주쓰는템플릿">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 1)}>
                                                                            <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    }
                                                                    {Lists.best === '1' &&
                                                                    <Tooltip title="자주쓰는템플릿">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} style={{color: '#FFF', background:'#90caf9'}} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 0)}>
                                                                            <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    }
                                                                </div>
                                                            </li>
                                                            {Lists.t_no === showContents && openContents === true && 
                                                            <div className="border p-1 text_m mb-2">
                                                                {Lists.contents}
                                                            </div>}
                                                            </>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className="fw-bolder text_l mb-2">갓피플</div>
                                        <ul className="p-0">
                                        {template && template.result && template.result.map(Lists=>{
                                                return(
                                                    <div key={Lists.t_no}>
                                                        {
                                                            Lists.category === 'godp' &&
                                                            <>
                                                            <li className={`${CrmStyle.templateList} col d-flex flex-row align-items-center border rounded p-1`}>
                                                                <div className="col-5 text_m" onClick={()=>ShowOpenContents(Lists.t_no)} style={{cursor:'pointer'}}>{Lists.title}</div>
                                                                {staff && staff.list && staff.list.map(staffs=>{
                                                                    if( staffs[0] === Lists.agent) {
                                                                        return(
                                                                            <div className="col-2 text_m text-center" key={staffs[0]}>{staffs[1]}&nbsp;{staffs[2]}</div>
                                                                        )
                                                                    }
                                                                })}
                                                                <div className="col-2 text_sm text-center text-secondary">{Lists.rdate}</div>
                                                                <div className="col-3 text_sm text-center text-secondary">
                                                                <Tooltip title="선택">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1`} onClick={()=>applyTemplate(Lists.contents)}>
                                                                            <LaunchIcon style={{fontSize:'20px'}}></LaunchIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="수정">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeTemplate(Lists.t_no, Lists.category, Lists.title, Lists.contents, Lists.best)}>
                                                                            <EditIcon style={{fontSize:'20px'}}></EditIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    <Tooltip title="삭제">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=> removeQnaTemplateJson(Lists.t_no)}>
                                                                            <DeleteIcon style={{fontSize:'20px'}}></DeleteIcon>
                                                                        </IconButton>
                                                                    </Tooltip>
                                                                    {Lists.best === '0' &&
                                                                    <Tooltip title="자주쓰는템플릿">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 1)}>
                                                                            <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                        </IconButton>
                                                                    </Tooltip>}
                                                                    {Lists.best === '1' &&
                                                                    <Tooltip title="자주쓰는템플릿">
                                                                        <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} style={{color: '#FFF', background:'#90caf9'}} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 0)}>
                                                                            <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                        </IconButton>
                                                                    </Tooltip>}
                                                                </div>
                                                            </li>
                                                            {Lists.t_no === showContents && openContents === true && <div className="border p-1 text_m mb-2">{Lists.contents}</div>}
                                                            </>
                                                        }
                                                    </div>
                                                )
                                            })}
                                        </ul>
                                    </Grid>
                                </Grid>
                                
                                <Dialog open={openCreateTemplate} onClose={()=>setOpenCreateTemplate(false)} fullWidth={true} maxWidth="sm">
                                    <div className="p-4">
                                        <div className="border-bottom pb-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                            <h5>템플릿 작성하기</h5>
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenCreateTemplate(false)}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </div>
                                        <Form.Select className="mb-3" style={{width:'30%'}} placeholder="카테고리를 선택해주세요" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                            <option value="" style={{display:'none'}}>카테고리 선택</option>
                                            <option value="mall">몰</option>
                                            <option value="godp">갓피플</option>
                                        </Form.Select>
                                        <FloatingLabel controlId="title" label="제목" className="mb-3">  
                                            <Form.Control placeholder="제목을 적어주세요" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="contents" label="내용" className="mb-3">       
                                            <Form.Control as="textarea" placeholder="내용을 적어주세요" style={{ minHeight:'200px'}} value={contents} onChange={(e)=>setContents(e.target.value)}/>
                                        </FloatingLabel>
                                        <Button variant="contained" className="float-end" onClick={createQnaTemplateJson}>등록하기</Button>
                                    </div>
                                </Dialog>
    
                                <Dialog open={openChangeTemplate} onClose={()=>setOpenChangeTemplate(false)} fullWidth={true} maxWidth="sm">
                                    <div className="p-4">
                                        <div className="border-bottom pb-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                            <h5>템플릿 수정하기</h5>
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenChangeTemplate(false)}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </div>
                                        <Form.Select className="mb-3" style={{width:'30%'}} placeholder="카테고리를 선택해주세요" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                            <option value="" style={{display:'none'}}>카테고리 선택</option>
                                            <option value="mall">몰</option>
                                            <option value="godp">갓피플</option>
                                        </Form.Select>
                                        <FloatingLabel controlId="title" label="제목" className="mb-3">  
                                            <Form.Control placeholder="제목을 적어주세요" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="contents" label="내용" className="mb-3">       
                                            <Form.Control as="textarea" placeholder="내용을 적어주세요" style={{ minHeight:'200px'}} value={contents} onChange={(e)=>setContents(e.target.value)}/>
                                        </FloatingLabel>
                                        <Button variant="contained" className="float-end" onClick={()=>changeQnaTemplateJson(tno, category, title, contents, best)}>수정하기</Button>
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                    </Dialog>
                </Grid>
            </Grid>
            <div className="mt-2">
                {showImage1 === false && <div></div>
                ||
                <>
                <div style={{width: '100%', height: '145px'}} className="my-2 ps-2 pt-2 border">
                    {showImage1 === true && <img src={image1} width="100" height="100" className="me-3"></img>}
                    {showImage2 === true && <img src={image2} width="100" height="100"></img>}
                    <div className="d-flex flex-row align-items-center gap-2 text_s p-1 text-secondary text-nowrap">
                        <span>발송되는 이미지는 실제 이미지 사이즈 입니다(최대 가로 500px)</span>
                        <Tooltip title="이미지 미리보기">
                            <IconButton size="small" className="p-0" color="primary" onClick={()=>setRealImage(true)}><ImageSearchIcon className="p-0"></ImageSearchIcon></IconButton>
                        </Tooltip>
                    </div>
                </div>
                <Dialog open={realImage} onClose={()=> setRealImage(false)} fullWidth={true} maxWidth="lg">
                    <div className="p-4">
                        <div dangerouslySetInnerHTML={{__html:sendRealImage}}></div>
                    </div>
                </Dialog>
                </>
                }
                {answer  &&
                <div className="border rounded p-2 text_sm" contenteditable="true" style={{minHeight: '150px'}}>
                    {showAnswer}
                </div>
                ||
                <div>
                    <Form.Control as="textarea" className="border rounded w-100 p-2 text_sm" style={{height: '250px'}} value={newAns} onChange={textChange}/>
                </div>
                }
                    <Grid container className="align-items-center mt-2">
                    <Grid item xs={9}>
                        <Accordion>
                            <AccordionSummary className="ps-0 pe-2" expandIcon={<ExpandMoreIcon />}>
                                <div className="d-flex flex-row align-items-center">
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        size="small">         
                                    </Checkbox>
                                    <span className="me-2">SMS</span>
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        size="small">         
                                    </Checkbox>
                                    <div className="me-2">Email</div>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Form.Group>
                                    <Form.Label>SMS</Form.Label>
                                    <Form.Control className={`${CrmStyle.input_num} text_s py-0 ps-2`} value={hphone} onChange={(e) => sethphone(e.target.value)}/>
                                    <Form.Control className={`${CrmStyle.input_text} mt-1 text_s py-0 ps-2`} value="샬롬~ 1:1게시판에 답변이 등록되었습니다^^" onChange={(e)=>setSmsText(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mt-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control className={`${CrmStyle.input_email} me-2 text_s py-0 ps-2`} value={mail} onChange={(e)=>setMail(e.target.value)}/>  
                                </Form.Group>
                            </AccordionDetails>
                        </Accordion>                    
                    </Grid>
                    <Grid item xs={2} className="ps-4">
                        <Button variant="contained" className="text-nowrap" onClick={() => setConfirmOpen(true)}>답변하기</Button>
                    </Grid>
                </Grid>    
                <Dialog open={confirmOpen} onClose={()=>setConfirmOpen(false)}>
                    <div className="p-5">
                        <div className="mb-3 pb-2 fw-bolder border-bottom">
                            답변하시겠습니까 ?
                        </div>
                        <div className="p-1 m-2 mb-4">
                            <Form.Group>
                                <Form.Label>문의유형</Form.Label>
                                <Form.Select value={qnaKind} onChange={(e)=>setQnaKind(e.target.value)}>
                                    <option value="" disabled selected style={{display:'none'}}>선택해주세요.</option>
                                    <option value="A">일반배송</option>
                                    <option value="B">반품/교환/환불</option>
                                    <option value="C">주문수정</option>
                                    <option value="D">상품문의</option>
                                    <option value="E">회원/사이트이용</option>
                                    <option value="F">기타</option>
                                </Form.Select>
                            </Form.Group>                        
                        </div>
                        <div className="d-flex gap-3">
                            <Button variant="contained" className="px-3 py-1" onClick={()=>changeQnaReplyJson()} disabled={qnaKind == '' && true || false}>답변하기</Button>
                            <Button variant="contained" color="error" className="px-3 py-1" onClick={()=> setConfirmOpen(false)}>취소하기</Button>
                        </div>
                    </div>
                </Dialog> 
            </div>
            </div>
        )
    }

    return(
        <div>     
            <div className="pt-3 d-flex flex-row gap-2 justify-content-between align-items-center">
                <DatePick></DatePick>
                <div className="d-flex flex-row gap-2 me-2">
                    <input className="form-control" style={{width:'220px'}} type="text" placeholder="검색입력" onChange={(e)=>setKeyword(e.target.value)} value={keyword} size="sm" onKeyPress={(e)=>{if(e.key === 'Enter'){resetAll()}}}></input>
                    <Button variant="contained" onClick={()=>{resetAll()}} className="p-1">검색</Button>
                </div>
            </div>
            {
            qnaList.success == true && 
            <>
            <Grid container>
                <Grid item xs={2}>
                    <CategoryList></CategoryList>
                </Grid>
                <Grid item xs={10}>
                    {
                        qnaList.result && qnaList.result.qna_list !== null &&
                        <Grid container>
                             <Grid item xs={6} className="p-2">
                                 <>
                                 <Paper elevation={4} style={{ height: '70vh', overflow: 'auto'}} className="d-flex flex-column px-2 pt-2">
                                    {loading2 === true && <div className="p-5 w-100 d-flex align-items-center justify-content-center"><CircularProgress></CircularProgress></div>}

                                    {   loading2 === false &&
                                        qnaList.result.qna_list.map((Lists, i)=>{
                                            const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no="+Lists.order_no;
                                            const files = Lists.files.split(',');
                                            
                                            return(
                                                <div className="text_m bg-white mb-5 border rounded" key={Lists.q_no}>
                                                    <Accordion expanded={ansOpen === Lists.q_no}>
                                                        <div className="d-flex flex-column px-3 py-4">
                                                            <div className="d-flex gap-1 flex-wrap text_sm">
                                                                {Lists.adate == '0000-00-00 00:00:00' && Lists.hide == 0 && <div className="text-white px-1 bg-danger rounded">미답변</div>}
                                                                {Lists.adate !== '0000-00-00 00:00:00' && Lists.hide == 0 && <div className="text-white px-1 bg-primary rounded">답변완료</div>}
                                                                {Lists.adate == '0000-00-00 00:00:00' && Lists.hide == 1 && <><div className="text-white px-1 rounded" style={{ background: '#e8873c'}}>삭제</div><div className="text-white px-1 bg-danger rounded">미답변</div></>}
                                                                {Lists.adate !== '0000-00-00 00:00:00' && Lists.hide == 1 && <><div className="text-white px-1 rounded" style={{ background: '#e8873c'}}>삭제</div><div className="text-white px-1 bg-primary rounded">답변완료</div></>}
                                                                {Lists.service === 'godp' &&
                                                                <>
                                                                    <div className="text-success px-1 border border-success rounded">갓피플</div>
                                                                    <div className="add_bar">
                                                                    { categoryList.success === true && categoryList.result &&
                                                                        categoryList.result.map(Cates => {
                                                                        if(Cates.category_id === Lists.category){ return (<span key={Cates.category_id}>{Cates.category_name}</span>)}
                                                                    })}
                                                                    </div>
                                                                </>
                                                                }
                                                                {Lists.service === 'mall' && 
                                                                <>
                                                                    <div className="text-primary px-1 border border-primary rounded">갓피플몰</div>
                                                                    <div className="add_bar">{Lists.category}</div>
                                                                </>}
                                                                <div className="add_bar text-secondary">{Lists.rdate}</div>
                                                                {Lists.order_no && 
                                                                <div className="add_bar text-secondary">
                                                                    <a href="#" style={{textDecoration:'none'}} onClick={() => window.open(order_link, "_blank", "width = 1300, height = 1000")}>{Lists.order_no}</a>
                                                                </div> 
                                                                || <div className="add_bar text-secondary">주문번호 없음</div>}
                                                                <div className="text-dark add_bar">{Lists.name}</div>
                                                                {Lists.user_id 
                                                                && <div type="button" className="text-primary" onClick={()=>infoOpenSet(Lists.user_id, Lists.user_n)}>{Lists.user_id}</div>
                                                                || <div className="text-secondary">비회원</div>}
                                                            </div>
                                                            <div className="d-flex flex-row">
                                                                <Grid container className="mt-2">
                                                                    <Grid item xs={12} className="d-flex flex-row align-items-center gap-2">
                                                                        {Lists.gcode &&
                                                                        <> 
                                                                        <a href={g_link(Lists.gcode)} target="_blank"><img src={img_link(Lists.gcode)}></img></a>
                                                                        <table>
                                                                        <tr>
                                                                            <td className="text_s add_bar text-nowrap">상품코드</td>    
                                                                            <td className="text_s">{Lists.gcode}</td> 
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="text_s add_bar text-nowrap">상품이름</td>
                                                                            <a href={g_link(Lists.gcode)} target="_blank" style={{textDecoration: 'none'}}><td className="text_s">{Lists.gname}</td></a>
                                                                        </tr>
                                                                        </table>
                                                                        </>
                                                                        ||
                                                                        <>
                                                                        {/* <HelpOutlineIcon fontSize="small"></HelpOutlineIcon>
                                                                        <Typography
                                                                        aria-owns={open ? 'mouse-over-popover' : undefined}
                                                                        aria-haspopup="true"
                                                                        >
                                                                            <span className="text_sm">{Lists.subject}</span>
                                                                        </Typography> */}
                                                                        </>
                                                                    }
                                                                    </Grid>

                                                                    <Grid item xs={12} className="mt-2">
                                                                        <Typography sx={{ p: 1 }}>
                                                                            <span className="text_sm"><div dangerouslySetInnerHTML={{__html:Lists.question}}></div></span>
                                                                        </Typography>
                                                                        {Lists.files && files.map(file => {
                                                                            const link = 'https://static.godpeople.com/mall/1on1/'+file.slice(0,-3);
                                                                            return(
                                                                                <img src={link} style={{maxWidth:'500px'}}/>
                                                                            )
                                                                        })}
                                                                    </Grid>
                                                                    
                                                                    <Grid item xs={3} className="mt-3">
                                                                        {ansOpen === Lists.q_no &&
                                                                        <ButtonGroup>
                                                                            <Button variant="outlined" className="py-0 px-2 text-nowrap" color="primary" onClick={()=>MoveItem(Lists.q_no, Lists.gcode, Lists.name, Lists.user_id)}>이동</Button>
                                                                            <Button variant="outlined" className="py-0 px-2 text-nowrap" color="error" onClick={()=>DeleteItem(Lists.q_no, Lists.name, Lists.user_id)}>삭제</Button>
                                                                        </ButtonGroup>}
                                                                    </Grid>
                                                                    <Grid item xs={7}></Grid>
                                                                    <Grid item xs={1} className="mt-3">
                                                                        {Lists.adate == '0000-00-00 00:00:00' 
                                                                        && <Button variant="outlined" color="warning" className="py-0 text-nowrap" onClick={()=> toggleAns(Lists.q_no, Lists.user_n)}>답변하기</Button>
                                                                        || <Button variant="outlined" color="primary" className="py-0 text-nowrap" onClick={()=> toggleAns(Lists.q_no, Lists.user_n)}>답변완료</Button>}
                                                                    </Grid>

                                                                </Grid>
                                                            </div>
                                                        </div>
                                                        <AccordionDetails>
                                                            <AnswerBox hphone={Lists.hphone} mail={Lists.mail} q_no={Lists.q_no} name={Lists.name} answer={Lists.answer}></AnswerBox>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            )
                                        })
                                    }
                                     <Dialog open={infoOpen} onClose={()=>setInfoOpen(false)} fullWidth={true} maxWidth="xl">
                                        <Paper elevation={3} className="p-3">
                                            <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                                                <div>고객정보조회</div>
                                                <div>
                                                    <IconButton className="border p-1 me-2" href="#" onClick={() => window.open("/add", "_blank", "width = 1300, height = 1000")}>
                                                        <PersonAddAltRoundedIcon></PersonAddAltRoundedIcon>
                                                    </IconButton>
                                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>{setInfoOpen(false)}}>
                                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                                    </IconButton>
                                                </div>
                                            </div>
                                            <InfoMain from="search" user_id={infoUserId} user_n={infoUserN} open={true}></InfoMain>
                                        </Paper>
                                     </Dialog>
                                     <Stack spacing={2} className="my-2 d-flex align-items-center">
                                        <Pagination defaultPage={1} count={qnaList.result && qnaList.result.qna_total > 0 ? Math.ceil(qnaList.result.qna_total/limit) : 1} color="primary" onChange={(e)=>setPage(e.target.textContent)}/>
                                     </Stack>
                                     <Dialog open={deleteOpen} onClose={()=>setDeleteOpen(false)}>
                                         <div className="p-4 d-flex flex-column align-items-center">
                                            <div className="mb-3">{deleteName}({deleteId})님의 문의를 삭제하시겠습니까?</div>
                                            <div className="d-flex gap-3">
                                                <Button variant="contained" color="error" size="small" onClick={()=>removeQnaInfoJson()}>삭제하기</Button>
                                                <Button variant="contained" color="primary" size="small" onClick={()=>setDeleteOpen(false)}>취소하기</Button>
                                            </div>
                                         </div>
                                     </Dialog>
                                     <Dialog open={moveOpen} onClose={()=>{setMoveOpen(false); setMoveBigCate([]); setMoveSmallCate([]);}}>
                                         <div className="p-4 d-flex flex-column gap-3">
                                            <div><b>{moveName}({moveId})</b>님의 문의 이동하기</div>
                                            <div className="d-flex flex-row gap-3">
                                                <Form.Select size="sm" value={moveBigCate} onChange={(e)=>setMoveBigCate(e.target.value)}>
                                                    <option value="" disabled selected style={{display:'none'}}>선택하세요</option>
                                                    <option value="godp">갓피플</option>
                                                    <option value="mall">몰</option>
                                                </Form.Select>
                                                {moveBigCate === 'godp' && 
                                                <Form.Select size="sm" value={moveSmallCate} onChange={(e)=>setMoveSmallCate(e.target.value)}>
                                                    <>
                                                    {categoryList.result && categoryList.result.map(Lists=> {
                                                        return (
                                                            <>
                                                            <option value="" disabled selected style={{display:'none'}}>선택하세요</option>
                                                            {Lists.service === 'godp' && Lists.category_id.length === 1 &&
                                                            <option value={Lists.category_id}>{Lists.category_name}</option>}
                                                            </>
                                                        )
                                                    })}
                                                    </>
                                                </Form.Select>}
                                                {moveBigCate === 'mall' &&
                                                <Form.Select size="sm" value={moveSmallCate} onChange={(e)=>setMoveSmallCate(e.target.value)}>
                                                    <option value="" disabled selected style={{display:'none'}}>선택하세요</option>
                                                    <option value="주문문의">섬김이</option>
                                                </Form.Select>}
                                            </div>
                                            <div className="w-100 d-flex justify-content-end gap-2">
                                                <Button variant="contained" color="error" size="small" onClick={()=>changeQnaCategoryJson()}>이동하기</Button>
                                                <Button variant="contained" color="primary" size="small" onClick={()=>setMoveOpen(false)}>취소하기</Button>
                                            </div>
                                        </div>
                                     </Dialog>
                                 </Paper>
                                 </>
                             </Grid>
                             <Grid item xs={6} className="p-2">
                                 <Paper elevation={3} className="p-2" style={{height: '70vh', overflow: 'auto'}} >
                                     <div className="text-center py-2">
                                        <div>문의히스토리</div>
                                        <div className="text-secondary text_s">지난 52주(1년) 히스토리입니다. 전체히스토리는 고객조회해주세요.</div>
                                    </div>
                                     <Grid container className="d-flex align-items-center">
                                         <Grid item xs={12} className="my-2 ms-2">
                                             { loading !== true && userQna.result && userQna.result.qna_total > 0 &&
                                                 <div className="d-flex flex-row text_sm fw-bolder">
                                                     <div className="text-dark">{userQna.result.qna_list[0].name} / {userQna.result.qna_list[0].user_id} 님의 히스토리</div>
                                                 </div>
                                             }   
                                         </Grid>
                                         {/* <Grid item xs={6}>
                                             <FormControl>
                                                 <RadioGroup row className="ms-2">
                                                     <FormControlLabel control={<Radio size="small" />} label="전체"  value="" checked={service2 === ""} onClick={ () => setService2("")} checked />
                                                     <FormControlLabel control={<Radio size="small" />} label="갓피플"  value="godp" checked={service2 === 'godp'} onClick={ () => setService2('godp')}/>
                                                     <FormControlLabel control={<Radio size="small"/>} label="갓피플몰" value="mall" checked={service2 === 'mall'} onClick={ () => setService2('mall')}/>
                                                 </RadioGroup>
                                             </FormControl>
                                         </Grid> */}
                                     </Grid>
                                     { loading === true && 
                                         <div className="d-flex align-items-center justify-content-center">
                                             <CircularProgress></CircularProgress>
                                         </div>
                                     }
                                     { loading !== true && userQna.result && userQna.result.qna_total > 0 &&
                                        
                                         userQna.result.qna_list.map(Lists => {
                                             const order_link = "https://mall.godpeople.com/_mng3_/_info_orders/info_orders.php?outlist=1&order_no="+Lists.order_no;
                                             return (                                       
                                                 <>
                                                 {
                                                  Lists.q_no !== q_no && 
                                                     <div className="text_m bg-white mt-2 border rounded" key={Lists.q_no}>
                                                         <Accordion expanded={ansOpen2 === Lists.q_no}>
                                                             <div className="d-flex flex-column p-2">
                                                                 <div className="d-flex gap-1 flex-wrap text_sm">
                                                                     {Lists.adate == '0000-00-00 00:00:00' && Lists.hide == 0 && <div className="text-white px-1 bg-danger rounded">미답변</div>}
                                                                     {Lists.adate !== '0000-00-00 00:00:00' && Lists.hide == 0 && <div className="text-white px-1 bg-primary rounded">답변완료</div>}
                                                                     {Lists.adate == '0000-00-00 00:00:00' && Lists.hide == 1 && <><div className="text-white px-1 rounded" style={{ background: '#e8873c'}}>삭제</div><div className="text-white px-1 bg-danger rounded">미답변</div></>}
                                                                     {Lists.adate !== '0000-00-00 00:00:00' && Lists.hide == 1 && <><div className="text-white px-1 rounded" style={{ background: '#e8873c'}}>삭제</div><div className="text-white px-1 bg-primary rounded">답변완료</div></>}
                                                                     {Lists.service === 'godp' &&
                                                                     <>
                                                                     <div className="text-success px-1 border border-success rounded">갓피플</div>
                                                                     <div className="add_bar">
                                                                     { categoryList.success === true && categoryList.result &&
                                                                         categoryList.result.map(Cates => {
                                                                         if(Cates.category_id === Lists.category){ return (<span key={Cates.category_id}>{Cates.category_name}</span>)}
                                                                     })}</div>
                                                                     </>
                                                                     }
                                                                     {Lists.service === 'mall' && 
                                                                     <>
                                                                     <div className="text-primary px-1 border border-primary rounded">갓피플몰</div>
                                                                     <div className="add_bar">{Lists.category}</div>
                                                                     </>
                                                                     }
                                                                     
                                                                     <div className="add_bar text-secondary">{Lists.rdate}</div>
                                                                     {Lists.order_no && 
                                                                     <div className="add_bar text-secondary">
                                                                         <a href="#" style={{textDecoration:'none'}} onClick={() => window.open(order_link, "_blank", "width = 1300, height = 1000")}>{Lists.order_no}</a>
                                                                     </div> 
                                                                     || <div className="text-secondary">주문번호 없음</div>}
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
                                                                         <Grid item xs={10}></Grid>
                                                                         <Grid item xs={2}>
                                                                             <Button variant="outlined" color="primary" className="py-0 mb-2 text-nowrap" onClick={()=> toggleAns2(Lists.q_no)}>답변확인</Button>
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
                                                 </>
                                             )
                                         })
                                     }
                                     { loading !== true && userQna.result && userQna.result.qna_total == 0 && <div className="p-2">이전 히스토리가 없습니다.</div>}
                                     
                                 </Paper>
                             </Grid>
                         </Grid> || 
                         <Grid container>
                             <Grid item xs={6}>
                                 <Paper elevation={3} className="mt-2 ms-3 p-3"><span className="text_m ">답변가능한 문의가 없습니다. <br/> 이전문의를 보시면 전체문의로 확인해주세요.</span></Paper>
                             </Grid>
                         </Grid>
                    }
                </Grid>
            </Grid>
            </>
            }
        </div>
    )
}

export default CrmList;