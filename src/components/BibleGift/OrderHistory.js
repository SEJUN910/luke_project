import React from 'react';
import { STOREAPI } from '../../items/URL';
import { Paper, Grid, Button, IconButton, Dialog, Alert, AlertTitle, Tooltip, TextField } from '@mui/material';
import axios from 'axios';
import { Table } from 'react-bootstrap';

function OrderHistory({history, order_no}){

     // 히스토리 취소
     const powerCancelGrouponConsult = async (bgh_idx) => {
        try{
        const response = await axios.post
        (
            STOREAPI,
            {
                "task": "powerCancelGrouponConsult",
                "bgh_idx": bgh_idx,
                "order_no": order_no,
                "secret_key": 'CI6ImNvc3RvbmUiLCJlbWFpbCI6Im11c2ljY29z'
            },
            { 
                withCredentials: true
            }
        )
       .then((response) => {response.data.success === true ? alert('히스토리 내역이 취소되었습니다.') : alert('히스토리 취소에 실패했습니다.')})
        } catch(e) { console.error(e.message) }
    }

    return(
        <>
        {
            <Table striped bordered className="text_m">
                <thead className="text-center">
                    <tr className="col">
                        <th className="col-1">종류</th>
                        <th className="col-5">내용</th>
                        <th className="col-2">시간</th>
                        <th className="col-1">취소/복원</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {history.length > 0 && history.map(Lists =>{
                        return(
                            <tr key={Lists.bgh_idx}>
                                <td className="text_sm">{Lists.h_kind}</td>
                                <td className="text_sm">{Lists.h_memo}</td>
                                <td className="text_sm">{Lists.h_time}</td>
                                <td className="text_sm">
                                    {Lists.cancel === '0000-00-00 00:00:00' && <Button variant="contained" color="error" size="small" onClick={()=>powerCancelGrouponConsult(Lists.bgh_idx)}>취소</Button>}
                                    {Lists.cancel !== '0000-00-00 00:00:00' && <Button variant="contained" size="small">복원</Button>}
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

export default OrderHistory;