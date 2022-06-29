import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Button, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper, Checkbox } from '@mui/material';
import axios from 'axios';
import { CRMAPI } from '../../../items/URL';
import CloseIcon from '@mui/icons-material/Close';

function ModifyMailing(props) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mailList, setMailList] = useState([]);
    const [reload, setReload] = useState([]);
    
    const handleClickOpen = () => {
        setOpen(true);  
    };
    const handleClickClose = () => {
        setOpen(false);
    }
    const changeMailingInfoJson = async (kind, agree, status) => {
        setLoading(true);
        setReload(new Date());
        try{
           const response = await axios.post
          (CRMAPI,
              {
                "task": "changeMailingInfoJson",
                "user_n": props.user_n,
                "user_id": props.user_id,
                "kind": kind,
                "agree": agree
              },{ withCredentials: true })
          .then(alert('메일링이 '+status+'되었습니다'))
        } catch(e) {console.error(e.message)}
        setLoading(false);
      }

    const getMailingInfoList = async () => {
        setLoading(true);
        try{
           const response = await axios.post
          (CRMAPI,
              {
                "task": "getMailingInfoList",
                "user_n": props.user_n,
                "user_id": props.user_id,
              },{ withCredentials: true })
          .then(response => {
            if(response.data.success===true){setMailList(response.data)}})
        } catch(e) {console.error(e.message)}
        setLoading(false);
      }
    useEffect(()=> {
        getMailingInfoList();
    }, [reload]);

    return(
        <div className="ps-2">
            <Button onClick={handleClickOpen} className="text-dark">
                메일링
            </Button>
            <Dialog open={open} onClose={handleClickClose} maxWidth="xl">
                <DialogTitle className="d-flex justify-content-between">
                    <span>메일링</span>
                    <CloseIcon className="border border-secondary rounded" type="button" onClick={()=>setOpen(false)}></CloseIcon>
                </DialogTitle>
                <TableContainer component={Paper} elevation={3} className="p-2">
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell className="fw-bolder text-center">발송시간</TableCell>
                                <TableCell className="fw-bolder text-center">종류</TableCell>
                                <TableCell className="fw-bolder text-center">타이틀</TableCell>
                                <TableCell className="fw-bolder text-center">등록일</TableCell>
                                <TableCell className="fw-bolder text-center">동의여부</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                mailList.result &&
                                mailList.result.map(Lists => {
                                    
                                    return(
                                    <TableRow>
                                        <TableCell className="border-end">{Lists.time}</TableCell>
                                        <TableCell className="text-center">{Lists.kind}</TableCell>
                                        <TableCell className="text-center">{Lists.title}</TableCell>
                                        <TableCell>{Lists.time}</TableCell>
                                        <TableCell className="text-center">
                                            {Lists.agree === 'Y' && Lists.cate === 'user' && <Checkbox checked={true} onClick={()=> changeMailingInfoJson(Lists.kind, 'N', '해지')}></Checkbox>}
                                            {Lists.cate === 'tester' && <Checkbox disabled checked={Lists.agree === 'Y' && true || false}></Checkbox>}
                                            {Lists.agree === 'N' && Lists.cate === 'user' && <Checkbox checked={false} onClick={()=> changeMailingInfoJson(Lists.kind, 'Y', '등록')}></Checkbox>}
                                        </TableCell>
                                    </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Dialog>
        </div>
    )
}


export default ModifyMailing;