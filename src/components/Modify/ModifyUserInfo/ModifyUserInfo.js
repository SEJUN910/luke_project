import React, { useState, useEffect, useCallback } from 'react';
import { CRMAPI } from '../../../items/URL';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';

import { user_kind, mailingChecked } from '../../../items/Functions';

// ModifyUserInfo 는 components/Info/Infobasic 에서 사용

function ModifyBox(props) {
  const { onClose, selectedValue, open } = props;
  const [ name, setName ] = useState(props.name);
  const [ birthday, setBirthday ] = useState(props.birthday);
  const [ kind, setKind ] = useState(props.kind);
  const [ email, setEmail ] = useState(props.email);
  const [ phone, setPhone] = useState(props.phone);
  const [ mailing1, setMailing1] = useState([]);
  const [ Checked1, setChecked1] = useState(false);
  const [ mailing2, setMailing2] = useState([]);
  const [ Checked2, setChecked2] = useState(false);


  console.log(props);

  useEffect(()=>{
    !props.mailing && setChecked1(mailingChecked(props.mailing[0].agree));
    !props.mailing && setChecked2(mailingChecked(props.mailing[1].agree));
    !props.mailing && setMailing1(props.mailing[0].agree);
    !props.mailing && setMailing2(props.mailing[1].agree);
  },[]);

  const handleClose = () => {onClose(selectedValue)}
  const NewName = (e) => {setName(e.target.value)}
  const NewBirthday = (e) => {setBirthday(e.target.value)}
  const NewKind = (e) => {setKind(e.target.value)}
  const NewEmail = (e) => {setEmail(e.target.value)}
  const NewPhone = (e) => {setPhone(e.target.value)}
  const NewMailing1 = (e)=>{
    setChecked1(e.target.checked);
    if(e.target.checked === true){
      setMailing1('Y');
    } else if (e.target.checked === false){
      setMailing1('N');
    }
  }
  const NewMailing2 = (e)=>{
    setChecked2(e.target.checked);
    if(e.target.checked === true){
      setMailing2('Y');
    } else if (e.target.checked === false){
      setMailing2('N');
    }
  }
  const [authNo, setAuthNo] = useState(null);
  const [authEmail, setAuthEmail] = useState(null);
  const [authModifyNo, setAuthModifyNo] = useState(null);
  const [authModifyEmail, setAuthModifyEmail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthNo = async () => {
    setLoading(true);
    try{
      const response = await axios.post
      (CRMAPI,
          {
            "task": "getAuthNo",
            "user_n": props.user_n,
            "user_id": props.user_id,
            "flag": "phone"
          },{ withCredentials: true })
      .then(response => {
        if(response.data.success===true){setAuthNo(response.data)}})
    } catch(e) {console.error(e.message)}
    setLoading(false);
  }

  const getAuthEmail = async () => {
    setLoading(true);
    try{
       const response = await axios.post
      (CRMAPI,
          {
            "task": "getAuthNo",
            "user_n": props.user_n,
            "user_id": props.user_id,
            "flag": "email"
          },{ withCredentials: true })
      .then(response => {
        if(response.data.success===true){setAuthEmail(response.data)}})
    } catch(e) {console.error(e.message)}
    setLoading(false);
  }

  const getModifyAuthNo = async () => {
    setLoading(true);
    try{
      const response = await axios.post
      (CRMAPI,
          {
            "task": "getModifyAuthNo",
            "user_n": props.user_n,
            "user_id": props.user_id,
            "flag": "phone",
            "flag_value": phone
          },{ withCredentials: true })
      .then(response => {
        if(response.data.success===true){setAuthModifyNo(response.data)}})
    } catch(e) {console.error(e.message)}
    setLoading(false);
  }

  const getModifyAuthEmail = async () => {
    setLoading(true);
    try{
       const response = await axios.post
      (CRMAPI,
          {
            "task": "getModifyAuthNo",
            "user_n": props.user_n,
            "user_id": props.user_id,
            "flag": "email",
            "flag_value": email
          },{ withCredentials: true })
      .then(response => {
        if(response.data.success===true){setAuthModifyEmail(response.data)}})
    } catch(e) {console.error(e.message)}
    setLoading(false);
  }

  const changeUserInfoJson = async () => {
    setLoading(true);
    try{
       const response = await axios.post
      (CRMAPI,
          {
            "task": "changeUserInfoJson",
            "user_n": props.user_n,
            "user_id": props.user_id,
            "name" : name,
            "phone" : phone,
            "email" : email,
            "birthday" : birthday,
            "kind": kind,
            "mailing_news": mailing1,
            "mailing_goods": mailing2
          },{ withCredentials: true })
      .then(response => {
        if(response.data.success===true){alert('정보가 정상적으로 변경되었습니다.')}})
    } catch(e) {console.error(e.message)}
    setLoading(false);
    handleClose();
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle className="d-flex justify-content-between">
          기본정보수정
          <CloseIcon className="border border-secondary rounded" type="button" onClick={handleClose}></CloseIcon>
      </DialogTitle>
      <div className="border p-3 mx-4">
        <div className="text_m fw-bolder">* 회원 기본정보 수정을 위한 매체인증</div>
        <div className="text_sm ms-3">
          매체 선택시 <strong>가입된 정보에 있는</strong> 인증번호가 발송됩니다.<br/>
          인증이 어려울 경우 [최근배송지] 등의 정보를 이용해주세요.<br/>
          <span className="text-success">( 핸드폰/이메일 변경시 하단에 추가인증을 꼭 진행해주세요 )</span><br/><br/>
        </div>
        <div className="d-flex flex-row gap-3 justify-content-center">
            <div>
                <Button variant="contained" size="small" color="success" onClick={getAuthNo}>휴대폰 인증</Button>
                {
                    authNo &&
                    <div className="mt-2">
                        <span className="ms-2 text_sm me-2"><b>인증번호:</b></span>
                        <span className="text-success fw-bold">{authNo && authNo.result}</span>
                    </div>
                }
            </div>
            <div>     
                <Button variant="contained" size="small" color="success" onClick={getAuthEmail}>이메일 인증</Button>
                {
                    authEmail &&
                    <div className="mt-2">
                        <span className="ms-2 text_sm me-2"><b>인증번호:</b></span>
                        <span className="text-success fw-bold">{authEmail && authEmail.result}</span>
                    </div>
                }       
            </div>
        </div>
      </div>
      <Grid container className="p-4">
        <Box component="form" noValidate autoComplete="off" className="d-flex flex-column gap-4">
          <div>
            <TextField
              label="회원명"
              size="small"
              onChange={NewName}
              value={name}
              className="me-2">
            </TextField>
            <TextField
              label="생년월일"
              onChange={NewBirthday}
              value={birthday}
              size="small">
            </TextField>
          </div>
          <div className="border-bottom pb-3 d-flex flex-row">
            <FormControl className="w-25" size="small">
              <InputLabel id="demo-simple-select-label">회원종류</InputLabel>
              <Select
                value={kind}
                label="Age"
                onChange={NewKind}
              >
                <MenuItem value='S'>일반</MenuItem>
                <MenuItem value='Z'>직원</MenuItem>
                <MenuItem value='X'>블락</MenuItem>
              </Select>
            </FormControl>
            
            <div className="ms-3">
              <div className="text_sm ms-3"><b>메일링 선택</b></div>
              <div className="ms-2">
                <Checkbox
                  checked={Checked1}
                  onChange={NewMailing1}></Checkbox>
                <span className="text_m">갓피플 오늘의 묵상</span>
                <Checkbox
                  checked={Checked2}
                  onChange={NewMailing2}></Checkbox>
                <span className="text_m">갓피플몰 쇼핑</span>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <TextField
              label="이메일"
              onChange={NewEmail}
              value={email}
              size="small"
              className="me-2">
            </TextField>
            <Button variant="outlined" size="small" onClick={getModifyAuthEmail}>추가인증</Button>
            <span className="ms-2 text_sm me-2"><b>인증번호:</b></span>
            <span className="fw-bold">{authModifyEmail && authModifyEmail.result}</span>
          </div>
          <div className="d-flex align-items-center">
            <TextField
              label="핸드폰"
              onChange={NewPhone}
              value={phone}
              size="small"
              className="me-2">
            </TextField>
            <Button variant="outlined" size="small" onClick={getModifyAuthNo}>추가인증</Button>
            <span className="ms-2 text_sm me-2"><b>인증번호:</b></span>
            <span className="fw-bold">{authModifyNo && authModifyNo.result}</span>
          </div>
          <div className="d-flex justify-content-end">
            <Button type="submit" variant="contained" onClick={changeUserInfoJson}>수정</Button>
          </div>
        </Box>
      </Grid>
    </Dialog>
  )
}

ModifyBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

function ModifyUserInfo(props) {
  const [open, setOpen] = useState(false);
  const [userinfo, setUserinfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (value) => {
    setOpen(false);
  };

  const BasicData = useCallback(async () => {
      setLoading(true);
      try{
      const response = await axios.post
      (
          CRMAPI,
          {
            "task": "getModifyUserInfoJson",
            "user_n": props.user_n,
            "user_id": props.user_id
          },{ withCredentials: true })
     .then((response) => setUserinfo(response.data))
      } catch(e) {console.error(e.message)}
      setLoading(false);
  },[]);

  useEffect(() => { BasicData() },[]);

  return (
    <>
    {
      userinfo &&
      <div className="ps-2">
        <Button onClick={handleClickOpen} className="text-dark">
            개인정보수정
        </Button>
        <ModifyBox
            open={open}
            onClose={handleClose}
            name={userinfo.result.name}
            user_n={userinfo.result.user_n}
            user_id={userinfo.result.user_id}
            phone={userinfo.result.phone}
            kind={userinfo.result.kind}
            email={userinfo.result.email}
            birthday={userinfo.result.birthday}
            mailing={userinfo.result.mailing}
          />
      </div>
    }
    </>
  );
}

export default ModifyUserInfo;