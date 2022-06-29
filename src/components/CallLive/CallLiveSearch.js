import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Paper, TableCell, TableContainer, Table, TableHead, TableRow, TableBody, Grid, Button, Stack, Pagination } from '@mui/material';
import SearchStyle from '../../style/css/SearchStyle.module.css';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import { Form } from 'react-bootstrap';
import InfoMain from '../Info/InfoMain';
import { CRMAPI } from '../../items/URL';
import { user_kind } from '../../items/Functions';

function SearchMain(props) {
    const [open, setOpen] = useState(props.open ? props.open : false);
    const [openInfo, setOpenInfo] = useState(false);
    const [search, setSearch] = useState(props.number ? props.number : []);
    const [user_n, setUser_n] = useState([]);
    const [user_id, setUser_id] = useState([]);
    const [norPage, setNorPage] = useState(0);
    const [dorPage, setDorPage] = useState(0);
    const [startSearch, setStartSearch] = useState([]);
    const [loading, setLoading] = useState(false);
    const [norList, setNorList] = useState([]);
    const [dorList, setDorList] = useState([]);
    const [from, setFrom] = useState(props.from ? props.from : 'home');
    
    const limit = 15;
    const searchText = (e) => {setSearch(e.target.value)}
    const searchText2 = (e) => {setSearch(e.target.value)}
    const GoInfoMain = (user_n, user_id) => {
        setUser_n(user_n);
        setUser_id(user_id);
        setOpen(false);
        setOpenInfo(true);
        localStorage.setItem("user_n", user_n);
        localStorage.setItem("user_id", user_id);}


    // 사용계정리스트
    const getUserInfoNorList = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getUserInfoList",
                "keyword": search,
                "locate": "Normalcy",
                "page" : norPage,
                "limit" : limit
            },
            { withCredentials: true }
        )
       .then((response) => setNorList(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    }

    // 휴면계정리스트
    const getUserInfoDorList = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getUserInfoList",
                "keyword": search,
                "locate": "Dormancy",
                "page" : dorPage,
                "limit" : limit
            },
            { withCredentials: true }
        )
       .then((response) => setDorList(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    }

    useEffect(()=>{
        getUserInfoNorList();
        getUserInfoDorList();
    },[startSearch, norPage, dorPage]);
                               
    return(
        <>
            <Grid item xs={12}>
                <Paper elevation={3} className="p-3 vh90">
                    {/* <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div>회원검색</div>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                        </IconButton>
                    </div> */}
                    <div className="d-flex flex-row gap-2 mb-3 w-25">
                        <Form.Control placeholder="검색입력" onChange={searchText2} value={search} size="sm" onKeyPress={(e)=>{if(e.key === 'Enter'){setStartSearch(new Date())}}}></Form.Control>
                        <Button variant="contained" className="px-2 py-1" onClick={()=>setStartSearch(new Date())}>검색</Button>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {
                                norList.result &&
                                    <div className={`${SearchStyle.ShowNorBox} p-2 border rounded mt-2 d-flex flex-column justify-content-between`} style={{minHeight:'70vh'}}>
                                        <div>
                                            <span className="text_m px-2 py-1 fw-bolder">일반사용자&nbsp;(&nbsp;{norList.result.NormalcyTotal}&nbsp;)</span>              
                                            <TableContainer component={Paper} className="mt-2">
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">아이디</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">이름</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">이메일</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">핸드폰</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">가입일</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">회원종류</span></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                            {
                                                                norList.result.NormalcyList.map(Lists => {
                                                                    return(
                                                                    <TableRow key={Lists.user_n}>
                                                                        <TableCell className="px-1" align="center">
                                                                            <a href="#" onClick={()=> GoInfoMain(Lists.user_n, Lists.user_id)} style={{textDecoration:'none'}}>{Lists.user_id}</a>
                                                                        </TableCell>   
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.name}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.email}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.phone}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.enterdate}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{user_kind(Lists.kind)}</span></TableCell>
                                                                    </TableRow>
                                                                    )
                                                                })
                                                            }         
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <Stack className="d-flex py-2 align-items-center">
                                            <Pagination count={norList.result.NormalcyTotal < limit ? 1 : Math.ceil(Number(norList.result.NormalcyTotal)/limit)} color="primary" onChange={(e)=>setNorPage(e.target.textContent)}/>
                                        </Stack>
                                    </div>
                            }
                        </Grid>
                        <Grid item xs={6}>
                            {
                                dorList.result &&
                                    <div className={`${SearchStyle.ShowDorBox} p-2 mt-2 border rounded d-flex flex-column justify-content-between`} style={{minHeight:'70vh'}}>
                                        <div>
                                            <span className="text_ms fw-bolder px-2 py-1">휴면사용자&nbsp;(&nbsp;{dorList.result.DormancyTotal}&nbsp;)</span>
                                            <TableContainer component={Paper} className="mt-2">
                                                <Table size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">아이디</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">이름</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">이메일</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">핸드폰</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">가입일</span></TableCell>
                                                            <TableCell align="center" className="fw-bolder px-1"><span className="text_sm">회원종류</span></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                            {
                                                                dorList.result.DormancyList.map(Lists => {
                                                                    return(
                                                                    <TableRow key={Lists.user_n}>
                                                                        <TableCell className="px-1" align="center">
                                                                            <a href="#" onClick={()=> GoInfoMain(Lists.user_n, Lists.user_id)} style={{textDecoration:'none'}}>{Lists.user_id}</a>
                                                                        </TableCell>   
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.name}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.email}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.phone}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{Lists.enterdate}</span></TableCell>
                                                                        <TableCell className="px-1" align="center"><span className="text_sm">{user_kind(Lists.kind)}</span></TableCell>
                                                                    </TableRow>
                                                                    )
                                                                })
                                                            }         
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <Stack className="d-flex py-2 align-items-center">
                                            <Pagination count={dorList.result.DormancyTotal < limit ? 1 : Math.ceil(Number(dorList.result.DormancyTotal)/limit)} color="primary" onChange={(e)=>setDorPage(e.target.textContent)}/>
                                        </Stack>
                                    </div>
                            }
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        {openInfo == true && 
            <Dialog open={openInfo} onClose={()=>{setOpenInfo(false)}} fullWidth={true} maxWidth="xl">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom px-3 py-2 ms-1">
                    <div>고객정보조회</div>
                    <div>
                        <IconButton className="border p-1 me-2" href="#" onClick={() => window.open("/add", "_blank", "width = 1300, height = 1000")}>
                            <PersonAddAltRoundedIcon></PersonAddAltRoundedIcon>
                        </IconButton>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenInfo(false)}>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                        </IconButton>
                    </div>
                </div>
                <InfoMain from='search' open={true} user_n={user_n} user_id={user_id} reload={new Date()}></InfoMain>
            </Dialog>}
        </>
    )
}

export default SearchMain;