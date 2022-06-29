import React,{ useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import { Paper, Grid } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';
import Dialog from '@mui/material/Dialog';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import InfoStyle from '../../style/css/InfoStyle.module.css';
import InfoBasic from './InfoBasic';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import InfoOrder from './InfoOrder';
import { CRMAPI } from '../../items/URL';
import { numComma } from '../../items/Functions';


function InfoMain(props) {
    const [open, setOpen] = useState(props.open || false);
    const [from, setFrom] = useState(props.from || 'dash');
    const [info, setInfo] = useState([]);
    const [reload, setReload] = useState(props.reload);
    const [user_n, setUser_n]   = useState(props.user_n);
    const [user_id, setUser_id] = useState(props.user_id);
    const [loading, setLoading] = useState(false);
    const searchList = JSON.parse(localStorage.getItem("searchLists"));
    
    // 유저인포
    const getUserInfoJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getUserInfoJson",
                "user_n": user_n,
                "user_id": user_id
            },
            { withCredentials: true }
        )
       .then((response) => {setInfo(response.data)})
        } catch(e) { console.error(e.message) }
        setLoading(false);
    };

    useEffect(() => {  
        getUserInfoJson();
    },[user_n, user_id]);

    function InfoMini() {
        return(
            <>
                <Grid>
                    <Paper elevation={9} className="p-3 miniBox sortCS">
                        <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                            <div className="fw-bolder">최근고객정보조회</div>
                            <div>
                                <IconButton className="border me-2" size="small" onClick={()=>window.location.reload()}>
                                    <RefreshRoundedIcon sx={{fontSize: '17px'}}></RefreshRoundedIcon>
                                </IconButton>
                                <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                                    <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                                </IconButton>
                            </div>
                        </div>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell className="text-center"><span className="text_sm text-nowrap">아이디</span></TableCell>
                                    <TableCell className="text-center"><span className="text_sm text-nowrap">회원번호</span></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {searchList && searchList.reverse().slice(0,3).map(Lists => {
                                return(
                                    <TableRow key={Lists.user_n}>
                                        <TableCell className="text-center"><span className="text_sm text-nowrap">{Lists.user_id}</span></TableCell>
                                        <TableCell className="text-center"><span className="text_sm text-nowrap btn text-primary" onClick={()=>{setUser_n(Lists.user_n); setUser_id(Lists.user_id); setOpen(true);}}>{Lists.user_n}</span></TableCell>
                                    </TableRow>
                                )
                            })}
                            </TableBody>
                        </Table>
                        {/* { props.data &&
                        <div className="gap-2 mt-3">
                            <div className="p-1 mb-2 text-nowrap overflow-hidden">
                                <div className="d-flex flex-row">
                                    <div className="add_bar text_m fw-bold">{props.data.name}</div>
                                    <div className="add_bar text_m">{props.data.user_id}</div>
                                    <div className="add_bar text_m">{props.data.kind}</div>
                                    <div className="text_m">{props.data.phone}</div>
                                </div>
                                <div className="d-flex flex-row">
                                    <div className="d-flex flex-row mt-1 align-items-center text-nowrap overflow-hidden">
                                        <div className="text_m fw-bold">적립금</div>
                                        <ArrowRightTwoToneIcon></ArrowRightTwoToneIcon>
                                        <div className="add_bar text_m">{numComma(props.data.mileage)} 원</div>
                                    </div>
                                    <div className="d-flex flex-row mt-1 align-items-center text-nowrap overflow-hidden">
                                        <div className="text_m fw-bold">예치금</div>
                                        <ArrowRightTwoToneIcon></ArrowRightTwoToneIcon>
                                        <div className="text_m">(준비중)</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        } */}
                    </Paper>
                </Grid>
            </>
        )
    }
    
	return(
        <>  
            {from === 'search' &&
            <>
            <Grid item xs={12}>
                <Paper elevation={3} className="p-3">
                    <div className="d-flex flex-row">
                        <InfoBasic
                            data={info.result}></InfoBasic>
                        <InfoOrder
                            data={info.result}></InfoOrder>
                    </div>
                </Paper>
            </Grid>
            </>
            }
           
            {from === 'dash' &&
            <>
            <InfoMini data={info.result}></InfoMini>
            <Dialog onClose={()=>{setOpen(false)}} open={open} fullWidth={true} maxWidth="xl">
                <Grid item xs={12}>
                    <Paper elevation={3} className="p-3">
                        <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                            <div>고객정보조회</div>
                            <div>
                                <IconButton className="border p-1 me-2" href="#" onClick={() => window.open("/add", "_blank", "width = 1300, height = 1000")}>
                                    <PersonAddAltRoundedIcon></PersonAddAltRoundedIcon>
                                </IconButton>
                                <IconButton variant="outlined" size="small" className="border" onClick={()=>{setOpen(false); setReload(new Date());}}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                </IconButton>
                            </div>
                        </div>
                        <div className="d-flex flex-row vh90">
                            <InfoBasic
                                data={info.result}></InfoBasic>
                            <InfoOrder
                                data={info.result}></InfoOrder>
                        </div>
                    </Paper>
                </Grid>
            </Dialog>
            </>
            }
            
        </>
    )
}

export default InfoMain;