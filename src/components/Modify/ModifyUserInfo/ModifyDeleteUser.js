import React, { useState, useEffect, useCallback } from 'react';
import { CRMAPI } from '../../../items/URL';
import axios from 'axios';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Dialog from '@mui/material/Dialog';

function ModifyDeleteUser(props) {
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
            <Button onClick={handleClickOpen} className="text-danger">
                회원탈퇴
            </Button>
            <Dialog
                open={open}
                onClose={()=>setOpen(false)}>
                <Alert variant="outlined" severity="error">
                    <AlertTitle><strong>확인알림</strong></AlertTitle>
                    정말로 <strong>'{props.name}({props.user_id})'</strong>님의&nbsp;<span className="text-danger"><strong>회원탈퇴</strong></span>를 진행하시겠습니까?
                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <Button variant="outlined" size="small" onClick={changeTempPasswdJson}>발급</Button>
                        <Button variant="outlined" color="error" size="small" onClick={handleClickClose}>취소</Button>
                    </div>
                </Alert>
            </Dialog>
        </div>
    );
}

export default ModifyDeleteUser;