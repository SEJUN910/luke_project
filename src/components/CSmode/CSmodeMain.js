import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI, GKCAPI } from '../../items/URL';
import { Paper, Grid, Dialog, TextField, Button, Tooltip, Pagination, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ContentPasteSearchOutlinedIcon from '@mui/icons-material/ContentPasteSearchOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Moment from 'moment';
import { Form, Table } from 'react-bootstrap';
import CSLiveCall from './CSLiveCall';
import CSSearch from './CSSearch';


function CSmodeMain() {
    const [loading, setLoading] = useState([]);
    const [startTime, setStartTime] = useState([]);
    const [endTime, setEndTime] = useState([]);
    const [openWrite, setOpenWrite] = useState(false);
    const [openRead, setOpenRead] = useState(false);
    const [number, setNumber] = useState([]);
    const [searchStart, setSearchStart] = useState(false);
    const [openMemo, setOpenMemo] = useState(false);
    const [relatNum, setRelatNum] = useState([]);
    const [contents, setContents] = useState([]);
    const [kind, setKind] = useState('A');
    const [keyword, setKeyword] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [readKey, setReadKey] = useState('phone');
    const [readKeyword, setReadKeyword] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [readList, setReadList] = useState([]);
    const [page, setPage] = useState(1);
    const limit = 20;

    const createCallHistoryJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "createCallHistoryJson",
                "phone": number,
                "tel" : relatNum,
                "agent" : 'sejun910',
                "customer" : customer,
                "keyword" : keyword,
                "start_time" : startTime,
                "end_time" : endTime,
                "memo" : contents,
                "kind" : kind
            },
            { withCredentials: true }
        )
       .then((response) => alert('??????????????? ?????????????????????.'))
        } catch(e) { console.error(e.message); alert('????????? ??????????????????.') }
        setLoading(false);
        setOpenMemo(false);
        setOpenWrite(false);
        setNumber([]);
        setRelatNum([]);
        setKind('A');
        setCustomer([]);
        setKeyword([]);
        setStartTime([]);
        setEndTime([]);
        setContents([]);
        setSearchStart(false);
    }

    const get_godstaff_list = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            GKCAPI,
            {
                "task": "get_godstaff_list"
            },
            { withCredentials: true }
        )
       .then((response) => response.data.success === true && setStaffList(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    };
    
    const getCallHistoryList = async () => {
        setLoading(true);

        try{
        let keyPhone = "";
        let keyTel = "";
        let keyCustomer = "";
        let keyKeyWord = "";
        let keyAgent = "";

        if( readKey === 'phone') {
            keyPhone = readKeyword;
            keyTel = "";
            keyCustomer = "";
            keyKeyWord = "";
            keyAgent = "";
        } else if ( readKey === 'tel') {
            keyPhone = "";
            keyTel = readKeyword;
            keyCustomer = "";
            keyKeyWord = "";
            keyAgent = "";
        } else if ( readKey === 'customer') {
            keyPhone = "";
            keyTel = "";
            keyCustomer = readKeyword;
            keyKeyWord = "";
            keyAgent = "";
        } else if ( readKey === 'keyword') {
            keyPhone = "";
            keyTel = "";
            keyCustomer = "";
            keyKeyWord = readKeyword;
            keyAgent = "";
        } else if ( readKey === 'agent') {
            keyPhone = "";
            keyTel = "";
            keyCustomer = "";
            keyKeyWord = "";
            keyAgent = readKeyword;
            staffList && staffList.list.map(Lists => {
                if(readKeyword === Lists[1]){
                    return keyAgent = Lists[0];
                }
            })
        }
        const response = await axios.post
        (
            CRMAPI,
            {
                "task" : "getCallHistoryList",
                "tel" : "",
                "phone": keyPhone,
                "tel": keyTel,
                "agent": keyAgent,
                "customer": keyCustomer,
                "keyword": keyKeyWord,
                "page" : page,
                "limit" : limit 
            },
            { withCredentials: true }
        )
       .then((response) => response.data.success === true && setReadList(response.data))
        } catch(e) { console.error(e.message); alert('????????? ??????????????????.') }
        setLoading(false);
    }
    
    useEffect(()=>{
        setStartTime(Moment().format('YYYY-MM-DD hh:mm:ss'));
    },[searchStart])

    useEffect(()=>{
        get_godstaff_list();
    },[])

    return(
        <>   
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortCS">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="fw-bolder">????????????/??????</div>
                </div>
                <Grid container>
                    <Grid item xs={6} className="my-4 border-end">
                        <div className="d-flex justify-content-center">
                            <Tooltip title="????????????">
                                <IconButton className="p-1" onClick={()=>setOpenWrite(true)}>
                                    <PlayCircleFilledWhiteOutlinedIcon style={{fontSize: '100px'}}></PlayCircleFilledWhiteOutlinedIcon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                    <Grid item xs={6} className="my-4">
                        <div className="d-flex justify-content-center">
                            <Tooltip title="????????????">
                                <IconButton className="p-1" onClick={()=>setOpenRead(true)}>
                                    <ContentPasteSearchOutlinedIcon style={{fontSize: '100px'}}></ContentPasteSearchOutlinedIcon>
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

        {/* ??????????????? ?????? */}
        <Dialog open={openWrite} onClose={()=>{setOpenWrite(false); setNumber([]); setSearchStart(false); setStartTime([]);}} fullWidth={true} maxWidth="xl">
            <div className="p-3">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1 mb-2">
                    {searchStart === false && <div>????????????</div>}
                    {searchStart === true &&
                    <div className="d-flex align-items-center">
                        <span className="border p-2 rounded me-3 text_m">????????????: {startTime}</span>
                        <Button variant="outlined" color="warning" onClick={()=>{setOpenMemo(true); setEndTime(Moment().format('YYYY-MM-DD hh:mm:ss'))}}>???????????? & ????????????</Button>
                    </div>
                    }
                    <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenWrite(false); setSearchStart(false);}}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <div className="p-4">
                            {searchStart === false &&
                            <>
                            <div className="text_m mb-3">??????????????? ???????????????, ?????? ????????? ?????? ??????????????? ???????????? ??? ????????????.</div>
                            <TextField label="????????????" size="small" value={number} onChange={(e)=>setNumber(e.target.value)} onKeyPress={(e)=>{if(e.key === 'Enter'){setSearchStart(true)}}}></TextField>
                            <Button variant="contained" className="ms-3" onClick={()=> setSearchStart(true)}>????????????</Button>
                            </>}
                            {searchStart === true && <CSSearch number={number}></CSSearch>}
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <CSLiveCall></CSLiveCall>
                    </Grid>
                </Grid>
            </div>
        </Dialog>
        <Dialog open={openMemo} onClose={()=>setOpenMemo(false)} fullWidth={true} maxWidth="sm">
            <Paper className="d-flex justify-content-center">
                
                <Form className="p-4 w-100">
                    <Grid container className="border p-3">
                        <Grid item xs={12} className="text-center p-2 mb-3 fs-5 fw-bolder">??????????????????</Grid>
                        <Grid item xs={6} className="px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>????????????</Form.Label>
                                <Form.Control size="sm" type="text" value={number} onChange={(e)=>setNumber(e.target.value)}/>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={6} className="px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>????????????</Form.Label>
                                <Form.Control value={relatNum} onChange={(e)=>setRelatNum(e.target.value)} size="sm" type="text" placeholder="????????? ????????????"/>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={6} className="px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>????????????</Form.Label>
                                <Form.Control size="sm" type="text" value={startTime} disabled/>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={6} className="px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>????????????</Form.Label>
                                <Form.Control size="sm" type="text" value={endTime} disabled/>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={6} className="px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>????????????</Form.Label>
                                <Form.Select value={kind} onChange={(e)=>setKind(e.target.value)} size="sm">
                                    <option value='A'>??????</option>
                                    <option value='B'>??????</option>
                                    <option value='C'>??????</option>
                                    <option value='D'>??????</option>
                                    <option value='E'>??????/???????????????</option>
                                    <option value='F'>??????APP</option>
                                    <option value='G'>??????</option>
                                </Form.Select>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6} className="px-2">
                            <Form.Group className="mb-3">
                                <Form.Label>?????????</Form.Label>
                                <Form.Control size="sm" type="text" value={customer} onChange={(e)=>setCustomer(e.target.value)} placeholder='????????? ????????????'/>
                            </Form.Group>
                        </Grid>
                        <Grid item xs={12} className="px-2 mb-2">
                            <Form.Label>???????????????</Form.Label>
                            <Form.Control value={keyword} onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder="??????????????? ?????? ???????????? ????????? ??????????????????."/>
                        </Grid>
                        <Grid item xs={12} className="px-2 w-100">
                            <Form.Label>????????????</Form.Label>
                            <Form.Control as="textarea" value={contents} onChange={(e) => setContents((e.target.value))} placeholder="?????? ???????????? ????????? ????????? ????????? ????????? ???????????????" style={{ height: '150px'}}/>
                        </Grid>
                        <Grid item xs={12} className="px-2">
                            <Button variant="contained" className="mt-2 float-end" onClick={()=> createCallHistoryJson()}>????????????</Button>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </Dialog>

        {/* ??????????????? ?????? */}
        <Dialog open={openRead} onClose={()=>{setOpenRead(false)}} fullWidth={true} maxWidth="xl">
            <div className="p-3 vh80">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1 mb-2">
                    <div>??????????????????</div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=> setOpenRead(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <div className="d-flex flex-row gap-2 p-2 align-items-center pb-2">
                    <SearchIcon style={{fontSize:'34px'}}></SearchIcon>
                    <Form.Select value={readKey} onChange={(e)=>setReadKey(e.target.value)} style={{width: '160px'}}>
                        <option value="phone">????????????</option>
                        <option value="tel">????????????</option>
                        <option value="customer">?????????</option>
                        <option value="agent">?????????</option>
                        <option value="keyword">?????????&amp;??????</option>
                    </Form.Select>
                    <TextField label="?????????" size="small" style={{width: '200px'}} value={readKeyword} onChange={(e)=>setReadKeyword(e.target.value)} onKeyPress={(e)=>{if(e.key === 'Enter'){getCallHistoryList()}}}></TextField>
                    <Button variant="contained" onClick={getCallHistoryList}>????????????</Button>
                    <Tooltip 
                        title={
                            <>
                            <div>????????????&nbsp;&nbsp;&gt; (-) ????????????, ????????? 4?????? ????????????</div>
                            <div>????????????&nbsp;&nbsp;&gt; ?????????</div>
                            <div>?????????&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; ?????????</div>
                            <div>?????????&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; ?????????</div>
                            <div>?????????&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&gt; ??????????????? ????????????</div>
                            </>}>
                        <InfoOutlinedIcon style={{cursor:'pointer', fontSize: '30px', color: 'gray'}}></InfoOutlinedIcon>
                    </Tooltip>
                </div>
                <div className="p-2 mt-2">
                    <Table striped>
                        <thead className="text_sm">
                            <tr className="text-center">
                                <td className="text-nowrap" style={{width:'2%'}}>No</td>
                                <td className="text-nowrap" style={{width:'10%'}}>????????????</td>
                                <td className="text-nowrap" style={{width:'10%'}}>????????????</td>
                                <td className="text-nowrap" style={{width:'5%'}}>?????????</td>
                                <td className="text-nowrap" style={{width:'15%'}}>????????????</td>
                                <td className="text-nowrap" style={{width:'10%'}}>?????????</td>
                                <td className="text-nowrap" style={{width:'48%'}}>??????</td>
                            </tr>
                        </thead>
                        <tbody className="text_sm">
                        {readList.result && readList.result.call_list && readList.result.call_list.map((Lists, index) => {
                            let start = Moment(Lists.start_time);
                            let end = Moment(Lists.end_time);
                            let time = Moment.duration(end.diff(start)).asMinutes();
                            return (
                                <tr>
                                    <td className="border-start border-end p-1 text-center">{index+1}</td>
                                    <td className="border-end p-1 text-center">{Lists.main_number}</td>
                                    <td className="border-end p-1 text-center">{Lists.related_number !== 'NULL' ? Lists.related_number : ''}</td>
                                    <td className="border-end p-1 text-center">{Lists.customer}</td>
                                    <td className="border-end p-1 text_s text-nowrap">{Lists.start_time}<br/>~ &nbsp;{Lists.end_time}&nbsp;<span style={{color:'#ff3d00'}}>({Math.ceil(time)}???)</span></td>
                                    <td className="border-end p-1">{Lists.keyword}</td>
                                    <td className="border-end p-1">{Lists.memo}</td>
                                </tr>  
                            )
                        })
                        || <tr><td colspan="7">??????????????? ????????????.</td></tr>}
                        </tbody>
                    </Table>
                </div>
                <Stack spacing={2}>
                    <Pagination count={readList.result && readList.result.call_total > 0 ? Math.ceil(Number(readList.result.call_total)/limit) : 1} color="secondary" value={page} onChange={(e)=>setPage(e.target.value)} className="mx-auto"/>
                </Stack>
            </div>
        </Dialog>
        </>
    )
}

export default CSmodeMain;