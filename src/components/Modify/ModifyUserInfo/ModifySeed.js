import React, { useState, useEffect, useCallback } from 'react';
import { CRMAPI } from '../../../items/URL';
import { numComma } from '../../../items/Functions';
import ModifyStyle from '../../../style/css/ModifyStyle.module.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';
import { Form } from 'react-bootstrap';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function ModifyPoints(props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [seedList, setSeedList] = useState([]);
    const [page, setPage] = useState(0);
    const [addPoint, setAddPoint] = useState([]);
    const [reason, setReason] = useState([]);
    const [reload, setReload] = useState([]);
    const [kind, setKind] = useState('add');
    const limit = 20;

    const handleClickOpen = () => {
        setOpen(true);  
    };

    const createAdvancePlusJson = async () => {
        setLoading(true);
        setReload(new Date());
        try{
            const response = await axios.post
           (CRMAPI,
               {
                 "task": "createAdvancePlusJson",
                 "user_n": props.user_n,
                 "user_id": props.user_id,
                 "pnts": addPoint,
                 "reason": reason
               },{ withCredentials: true })
           .then(alert("예치금 '+"+addPoint+"'가 적용되었습니다."))
         } catch(e) {console.error(e.message)}
         setLoading(false);
    }
    const createAdvanceSubJson = async () => {
        setLoading(true);
        setReload(new Date());
        try{
            const response = await axios.post
           (CRMAPI,
               {
                 "task": "createAdvanceSubJson",
                 "user_n": props.user_n,
                 "user_id": props.user_id,
                 "pnts": addPoint,
                 "reason": reason
               },{ withCredentials: true })
           .then(alert("예치금 '-"+addPoint+"'가 적용되었습니다."))
         } catch(e) {console.error(e.message)}
         setLoading(false);
    }

    const getAdvanceHistoryList = async () => {
        setLoading(true);
        try{
           const response = await axios.post
          (CRMAPI,
              {
                "task": "getAdvanceHistoryList",
                "user_n": props.user_n,
                "user_id": props.user_id,
                "limit": limit,
                "page": page
              },{ withCredentials: true })
          .then(response => {
            if(response.data.success===true){setSeedList(response.data)}})
        } catch(e) {console.error(e.message)}
        setLoading(false);
      }

    useEffect(()=>{
        getAdvanceHistoryList();
    },[page, reload]);

    return (
        <div>
            <Button variant="outlined" size="small" className="p-0 px-2" onClick={handleClickOpen}>
                예치금 조회/수정
            </Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}
                fullWidth={true}
                maxWidth="md">
                <DialogTitle className="d-flex justify-content-between">
                    <span>적립금 조회/수정</span>
                    <CloseIcon className="border border-secondary rounded" type="button" onClick={()=>setOpen(false)}></CloseIcon>
                </DialogTitle>
                <div className="d-flex p-2 mx-2">
                    <TableContainer component={Paper} elevation={3} className="p-2">
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell><span className="text_m">선택</span></TableCell>
                                    <TableCell><span className="text_m before_bar">적용치</span></TableCell>
                                    <TableCell><span className="text_m before_bar">이유</span></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <Form.Select size="sm" className={`${ModifyStyle.selectWidth} text_sm`} onChange={(e)=>setKind(e.target.value)}>
                                            <option value="add">더하기</option>
                                            <option value="sub">빼기</option>
                                        </Form.Select>
                                    </TableCell>
                                    <TableCell className={ModifyStyle.formPtWidth}>
                                        <Form.Control
                                            type="text"
                                            size="sm"
                                            onChange={(e)=>setAddPoint(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className={ModifyStyle.formRsWidth}>
                                        <Form.Control
                                            type="text"
                                            size="sm"
                                            onBlur={(e)=>setReason(e.target.value)}
                                        />
                                    </TableCell>
                                    <TableCell className="p-0 pe-2">
                                        <Button variant="contained" size="small" onClick={()=> kind === 'add' && createAdvancePlusJson() || kind === 'sub' && createAdvanceSubJson()}>적용</Button> 
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>

                    </TableContainer>
                </div>
                <TableContainer className="px-4 mt-1">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="fw-bolder" align="center"><span>일시</span></TableCell>
                                <TableCell className="fw-bolder" align="center"><span>적용전</span></TableCell>
                                <TableCell className="fw-bolder" align="center"><span>적용치</span></TableCell>
                                <TableCell className="fw-bolder" align="center"><span>적용후</span></TableCell>
                                <TableCell className="fw-bolder" align="center"><span>이유</span></TableCell>
                                {/* <TableCell className="fw-bolder" align="center"><span>비고</span></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody size="small">
                            {
                            seedList.result &&
                            seedList.result.cashes_list ? 
                                seedList.result.cashes_list.map((Lists) => (
                                <TableRow key={Lists.idx}>
                                    <TableCell className="border-end px-1" align="center"><span className="text_sm">{Lists.i_time.substr(0,16)}</span></TableCell>
                                    <TableCell className="py-0 px-2 border-end" align="right"><span className="text_sm">{numComma(Lists.pre_val)}</span></TableCell>
                                    <TableCell className="py-0 px-2 border-end" align="right"><span className="text_sm">{numComma(Lists.add_val)}</span></TableCell>
                                    <TableCell className="py-0 px-2 border-end" align="right"><span className="text_sm">{numComma(Lists.new_val)}</span></TableCell>
                                    <TableCell className="py-0 px-2" align="left"><span className="text_sm">{Lists.reason}</span></TableCell>
                                    <TableCell className="py-0 px-2" align="right">
                                        {/* <Button variant="outlined" size="small" className="my-1 p-0" color="error">보이기</Button>
                                        <Button variant="outlined" size="small" className="my-1 p-0">감추기</Button> */}
                                    </TableCell>
                                </TableRow>
                                ))
                            : <TableCell>없음</TableCell>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack className="d-flex py-2 align-items-center">
                    <Pagination count={seedList.result && seedList.result.cashes_total ? Math.ceil(Number(seedList.result.cashes_total)/20) : 1} color="primary" onChange={(e)=>setPage(e.target.textContent)}/>
                </Stack>
            </Dialog>
        </div>
    );
}

export default ModifyPoints;