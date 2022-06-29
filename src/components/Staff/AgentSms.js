import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper, Grid, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import Dialog from '@mui/material/Dialog';
import { Table } from 'react-bootstrap';

function MyHistoryList(props) {
    const [open, setOpen] = useState(false);
    const [list, setList] = useState([]);
    const year = new Date().getFullYear();

    const getLSmsAgentHistoryList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getLSmsAgentHistoryList",
            },
            { withCredentials: true }
        )
       .then((response) => setList(response.data))
        } catch(e) { console.error(e.message) }
    };

    useEffect(() => {
        getLSmsAgentHistoryList();
    },[]);

    return(
        <> 
        <Paper elevation={9} className="p-3 miniBox sortPersonal" style={{height: '200px !important'}}>
            <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                <div className="fw-bolder">SMS / LMS</div>
                {/* <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                        <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                </IconButton> */}
            </div>
            <div className="mt-4 d-flex flex-column align-items-center">
                <Button variant="outlined" size="small" className="w-75 mb-3 text-nowrap" onClick={()=>setOpen(true)}>내가 보낸 최근목록</Button>
                {list && list.result && <Button variant="outlined" size="small" className="w-75 text-success" href={list.result.link} target="_blank">전체목록확인</Button>}
            </div>
        </Paper>
        <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
            <Grid className="p-3">                
                <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom mb-3 pb-2 ms-1">
                    <div className="d-flex flex-row align-items-center">
                        <span>SMS / LMS</span>
                        {list && list.result && <Button variant="outlined" size="small" className="ms-3" href={list.result.link} target="_blank">전체목록확인</Button>}
                    </div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Paper elevation={3} className="p-3 mb-4" >
                    <div>SMS 목록 ( 최근 5개 )</div>
                    <Table striped bordered hover className="text_sm mt-2">
                        <thead>
                            <tr>
                                <th>받는번호</th>
                                <th>보낸번호</th>
                                <th>보낸시각</th>
                                <th>내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.result && list.result.sms && list.result.sms.map(Lists => {
                                return(
                                    <tr key={Lists.Sent_Date}>
                                        <td style={{ width : '10%'}}>{Lists.Call_To}</td>
                                        <td style={{ width : '10%'}}>{Lists.Call_From}</td>
                                        <td style={{ width : '15%'}}>{Lists.Sent_Date}</td>
                                        <td style={{ width : '65%'}}>{Lists.Sms_Txt}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Paper>
                <Paper elevation={3} className="p-3">
                    <div>LMS 목록 ( 최근 5개 )</div>
                    <Table striped bordered hover className="text_sm mt-2">
                        <thead>
                            <tr>
                                <th>받는번호</th>
                                <th>보낸번호</th>
                                <th>보낸시각</th>
                                <th>내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list && list.result && list.result.lms && list.result.lms.map(Lists => {
                                return(
                                    <tr key={Lists.Sent_Date}>
                                        <td style={{ width : '10%'}}>{Lists.Call_To}</td>
                                        <td style={{ width : '10%'}}>{Lists.Call_From}</td>
                                        <td style={{ width : '15%'}}>{Lists.Sent_Date}</td>
                                        <td style={{ width : '65%'}}>{Lists.MMS_BODY}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Paper>
            </Grid>
        </Dialog>
        </>
    )
}


// MyHistoryList.propTypes = {
//     onClose: PropTypes.func.isRequired,
//     opening: PropTypes.bool.isRequired,
//     selectedValue: PropTypes.string.isRequired,
// };

export default MyHistoryList;