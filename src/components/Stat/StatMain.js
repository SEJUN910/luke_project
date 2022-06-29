import React, { useState } from 'react';
import StatUserCrm from './StatUserCrm';
import StatUserStore from './StatUserStore';
import StatAllCrm from './StatAllCrm';
import StatAllstore from './StatAllstore';
import StatSummary from './StatSummary';

import Divider from '@mui/material/Divider';



function StatUser() {
    return (
        <div className="border rounded p-2">
            <div className="d-flex flex-column align-items-center">
                <div className="border-bottom w-75 text-center p-2 fw-bolder">문의고객분석</div>
                <StatUserCrm></StatUserCrm>
            </div>
            <Divider className="w-100 my-4"/>
            <div className="d-flex flex-column align-items-center">
                <div className="border-bottom w-75 text-center p-2 fw-bolder">매장별문의동향</div>
                <StatUserStore></StatUserStore>
            </div>
        </div>
    )
}

function StatAll() {
    return (
        <div className="border rounded p-2">
        <div className="d-flex flex-column align-items-center">
            <div className="border-bottom w-75 text-center p-2 fw-bolder">문의고객분석(전체)</div>
            <StatAllCrm></StatAllCrm>
        </div>
        <Divider className="w-100 my-4"/>
        <div className="d-flex flex-column align-items-center">
            <div className="border-bottom w-75 text-center p-2 fw-bolder">매장별문의동향(전체)</div>
            <StatAllstore></StatAllstore>
        </div>
    </div>
    )
}

function StatMain() {
    return (
        <div className="d-flex flex-row">
            <StatUser></StatUser>
            <StatAll></StatAll>
            <StatSummary></StatSummary>
        </div>
    )
}


export default StatMain;