import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import Divider from '@mui/material/Divider';
import { Popover, OverlayTrigger, DropdownButton, Dropdown } from 'react-bootstrap';
import ArrowRightTwoToneIcon from '@mui/icons-material/ArrowRightTwoTone';


import InfoStyle from '../../style/css/InfoStyle.module.css';
import ModifyUserInfo from '../Modify/ModifyUserInfo/ModifyUserInfoMain';
import ModifyBible from '../Modify/ModifyBible/ModifyBible';
import InfoRecruit from './InfoRecruit';
import InfoBibleWriting from './InfoBibleWriting';
import ModifyPoints from '../Modify/ModifyUserInfo/ModifyPoints';
import ModifySeed from '../Modify/ModifyUserInfo/ModifySeed';
import { numComma } from '../../items/Functions';

function InfoBox(props){
    
    return(
    <div className="bg-white p-1">
        <div className="text_m d-flex flex-row justify-content-between gap-2 mt-1 px-2 pt-1">
            <div className="fw-bolder text_ml border-bottom pb-1 me-1">고객기본정보</div>
            <ModifyUserInfo user_n={props.user_n} user_id={props.user_id} name={props.name}></ModifyUserInfo>
        </div>
        <div className={`${InfoStyle.listBox} px-0 px-2 mt-2`}>
            <div className={`${InfoStyle.listNone} d-flex gap-1 flex-wrap`}>
                <PersonOutlineIcon></PersonOutlineIcon>
                <div className="add_bar text_m fw-bold">{props.name}</div>
                <div className="add_bar text_m">{props.user_id}</div>
                <div className="add_bar text_m">{props.user_n}</div>
                <div className="add_bar text_m">{props.kind}</div>
            </div>
            <div className={`${InfoStyle.listNone} d-flex gap-1 mt-1 flex-wrap mb-3`}>
                <AddIcCallOutlinedIcon fontSize="small"></AddIcCallOutlinedIcon>
                <div className="add_bar text_m fw-bold">{props.phone}</div>
                <div className="text_m">{props.email}</div>
            </div>
            <div className={`${InfoStyle.listNone} d-flex flex-column border-bottom`}>
                <div className="d-flex flex-row justify-content-between">
                    <div className="text_sm">
                        <span className="fw-bold">적립금</span>
                        <ArrowRightTwoToneIcon></ArrowRightTwoToneIcon>
                        {numComma(props.mileage)}&nbsp;원
                    </div>
                    <div><ModifyPoints user_n={props.user_n} user_id={props.user_id}></ModifyPoints></div> 
                </div>
                <div className="d-flex flex-row justify-content-between my-2">
                    <div className="text_sm">
                            <span className="fw-bold">예치금</span>
                            <ArrowRightTwoToneIcon></ArrowRightTwoToneIcon>
                            (준비중)&nbsp;
                    </div>
                    <div><ModifySeed user_n={props.user_n} user_id={props.user_id}></ModifySeed></div>  
                </div>
            </div>
            <div className={`${InfoStyle.listNone} mt-2 d-flex flex-column text_sm`}>
                <Grid container>
                    <Grid item xs={4}><b>가입일:</b></Grid>
                    <Grid item xs={8}>{props.enterdate}</Grid>
                    <Grid item xs={4}><b>최근접속일:</b></Grid>
                    <Grid item xs={8}>{props.time_use_lately}</Grid>
                    <Grid item xs={4}><b>비밀번호수정일:</b></Grid>
                    <Grid item xs={8}>{props.time_passwd_modify}</Grid>
                    <Grid item xs={4}><b>최근배송지:</b></Grid>
                    <Grid item xs={8}>{props.recent_addr}</Grid>
                </Grid>
                {/* <OverlayTrigger trigger="click" placement="right" overlay={MemberInfo}  placement="bottom">
                    <Button variant="outlined" className="text_m px-2 py-1">
                        <div className="me-1">가입정보</div>
                        <ExpandCircleDownOutlinedIcon fontSize="small"></ExpandCircleDownOutlinedIcon>
                    </Button>
                </OverlayTrigger> */}
                {/* <OverlayTrigger trigger="click" placement="right" overlay={PointInfo}  placement="bottom">
                    <Button variant="outlined" color="success" className="text_m px-2 py-1">
                        <div className="me-1">적립/예치금</div>
                        <ExpandCircleDownOutlinedIcon fontSize="small"></ExpandCircleDownOutlinedIcon>
                    </Button>
                </OverlayTrigger> */}
            </div>
        </div>
    </div>
    )
}

function InfoOthers(props) {
    return(
        <div className="border rounded mt-2 bg-white p-1">
            <div className="text_m d-flex flex-row justify-content-between p-2">
                <div className="fw-bolder text_ml border-bottom pb-1 me-1">갓피플 이용정보</div>
            </div>
            <div className="mt-1 p-2 d-flex flex-column gap-3">
                <ModifyBible user_n={props.user_n} user_id={props.user_id} name={props.name}></ModifyBible>
                <InfoRecruit user_n={props.user_n} user_id={props.user_id} name={props.name}></InfoRecruit>
                <InfoBibleWriting user_n={props.user_n} user_id={props.user_id} name={props.name}></InfoBibleWriting>
            </div>
        </div>
    )
}

function InfoLog() {
    return (
        <div className="border rounded mt-2 bg-white">
            <div>고객로그</div>
            
        </div>
    )
}

function InfoBasic(props) {
    
    return(
        <>
        {props.data &&
            <div className={`${InfoStyle.infoBasicBox} border rounded p-2 vh80`}>
                <InfoBox
                    name=               {props.data.name}
                    user_n=             {props.data.user_n}
                    user_id=            {props.data.user_id}
                    kind=               {props.data.kind}
                    level=              {props.data.level}
                    phone=              {props.data.phone}
                    email=              {props.data.email}
                    enterdate=          {props.data.enterdate}
                    time_use_lately=    {props.data.time_use_lately}
                    time_passwd_modify= {props.data.time_passwd_modify}
                    recent_addr=        {props.data.recent_addr}
                    mileage=            {props.data.mileage}
                >
                </InfoBox>
                <InfoOthers user_n={props.data.user_n} user_id={props.data.user_id} name={props.data.name}></InfoOthers>
                {/* <InfoLog></InfoLog> */}
            </div>
        }
        </>
    )
}

export default InfoBasic;