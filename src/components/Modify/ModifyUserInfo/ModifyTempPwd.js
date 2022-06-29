import React, { useState, useEffect, useCallback } from 'react';
import { CRMAPI } from '../../../items/URL';
import axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';

function ModifyTempPwd(props) {
    const [open, setOpen] = useState(false);
    const [pwdOpen, setPwdOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [temPwd, setTemPwd] = useState([]);
    const handleClickOpen = () => {
        setOpen(true);  
    };
    const handleClickClose = () => {
        setOpen(false);
    }
    const temPwdClose = () => {
        setPwdOpen(false);
    }

    const changeTempPasswdJson = async () => {
        setLoading(true);
        try{
           const response = await axios.post
          (CRMAPI,
              {
                "task": "changeTempPasswdJson",
                "user_n": props.user_n,
                "user_id": props.user_id
              },{ withCredentials: true })
          .then(response => {
            if(response.data.success===true){setTemPwd(response.data)}})
        } catch(e) {console.error(e.message)}
        setLoading(false);
        setOpen(false);
        setPwdOpen(true);
      }

    return (
        <div className="ps-2">
        <Button onClick={handleClickOpen} className="text-dark">
            임시비밀번호발급
        </Button>
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}>
            <Alert variant="outlined" severity="warning">
                <AlertTitle>확인알림</AlertTitle>
                <strong>정말로 '{props.name}({props.user_id})'님의 임시비밀번호를 발급하시겠습니까?</strong>
                <div className="d-flex justify-content-end mt-3 gap-2">
                    <Button variant="outlined" size="small" onClick={changeTempPasswdJson}>발급</Button>
                    <Button variant="outlined" color="error" size="small" onClick={handleClickClose}>취소</Button>
                </div>
            </Alert>
        </Dialog>
        <Dialog
            open={pwdOpen}
            >
            <div className="p-4">
                <DialogTitle><strong>임시비밀번호</strong></DialogTitle>
                <div className="text-center">
                    <div className="fw-bold border p-2 rounded">{temPwd && temPwd.result}</div>
                    <div className="d-flex justify-content-end mt-3">
                        <Button variant="contained" color="info" size="small" onClick={temPwdClose}>닫기</Button>
                    </div>
                </div>
            </div>
        </Dialog>
        </div>
    );
}

export default ModifyTempPwd;