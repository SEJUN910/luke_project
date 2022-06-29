import React, { useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import { STOREAPI } from '../../items/URL';
import { Button } from '@mui/material';
import { Table } from 'react-bootstrap';

function UsingCoupon({coupon, kind, orderNo}){
     
    // 히스토리 취소
     const powerCancelGrouponUsingCoupon = async (order_no, user_n) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerCancelGrouponUsingCoupon",
                "order_no": order_no,
                "user_n": user_n,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('사용내역이 취소되었습니다.') : alert(response.data.error_msg)})
        } catch(e) { console.error(e.message) }
    }

    return(
        <>
        {   
            kind === 'multipon' &&
            <Table striped bordered className="text_m">
                <thead className="text-center">
                    <tr>
                        <th>사용여부</th>
                        <th>쿠폰번호</th>
                        <th>고객번호</th>
                        <th>고객명</th>
                        <th>시작시간</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {coupon.length > 0 && coupon.map(Lists =>{
                        return(
                            <tr key={Lists.coupon_no}>
                                <td>{Lists.start_time === '0000-00-00 00:00:00'
                                    ? <div className="border rounded text-white bg-danger">미사용</div>
                                    : <div className="border rounded text-white bg-primary">사용</div>}</td>
                                <td>{Lists.coupon_no}</td>
                                <td>{Lists.user_n}</td>
                                <td>{Lists.name}</td>
                                <td>{Lists.start_time}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        }
        {   
            kind === 'groupon' &&
            <Table striped bordered className="text_m">
                <thead className="text-center">
                    <tr>
                        <th>사용여부</th>
                        <th>쿠폰번호</th>
                        <th>고객번호</th>
                        <th>고객명</th>
                        <th>시작시간</th>
                        <th>취소</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {coupon.length > 0 && coupon.map(Lists =>{
                        return(
                            <tr key={Lists.coupon_no}>
                                <td>{Lists.start_time === '0000-00-00 00:00:00'
                                    ? <div className="border rounded text-danger border-danger">미사용</div>
                                    : <div className="border rounded text-primary border-primary">사용</div>}</td>
                                <td>{Lists.codes}</td>
                                <td>{Lists.user_n}</td>
                                <td>{Lists.name}</td>
                                <td>{Lists.start_time}</td>
                                <td>
                                    {Lists.user_n && <Button variant="contained" color="error" size="small" className="py-0 px-3" onClick={()=>powerCancelGrouponUsingCoupon(orderNo, Lists.user_n)}>사용취소</Button>}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        }
        </>
    )
}

export default UsingCoupon;