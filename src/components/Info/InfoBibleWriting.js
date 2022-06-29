import React,{ useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import Paper from '@mui/material/Paper';

function InfoBibleWriting(props) {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState([]);
    const [writing, setWriting] = useState([]);

    const getBibleTypingInfoList = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getBibleTypingInfoJson",
                "user_n": props.user_n,
                "user_id": props.user_id
            },
            { withCredentials: true }
        )
       .then((response) => setWriting(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
      };

    useEffect(()=>{
        getBibleTypingInfoList();
    },[props])

    return(
        <div className="d-flex flex-column">
            
            {
                writing.result && (writing.result.rc_total_su > 0 || writing.result.tp_total_su > 0 || writing.result.rd_total_su > 0) &&
                <>
                <div className="d-flex flex-row">            
                    <div className="px-1 border rounded text-primary border-primary text_m">이용중</div>
                    <div className="ms-1">성경읽기/쓰기</div>
                </div>
                <Paper elevation={4} className="p-1 mt-2">
                    <table className="w-100">
                        <tr className="col">
                            <td colspan="2" className="col-3 text_sm fw-bolder text-center border-end">성경쓰기</td>
                        </tr>
                        <tr className="col">
                            <td className="col-3 text_sm fw-bolder text-center border-end">시작일시</td>
                            <td className="col-9 text_sm ps-1">{writing.result.start_tp_day}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm fw-bolder text-center border-end">최종일시</td>
                            <td className="col-9 text_sm ps-1">{writing.result.last_tp_day}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm fw-bolder text-center border-end">전체 장수</td>
                            <td className="col-9 text_sm ps-1">{writing.result.tp_total_su}</td>
                        </tr>
                    </table>
                </Paper>
                <Paper elevation={4} className="p-1 mt-2">
                    <table className="w-100">
                        <tr className="col">
                            <td colspan="2" className="col-3 text_sm fw-bolder text-center border-end">성경암송</td>
                        </tr>
                        <tr className="col">
                            <td className="col-3 text_sm fw-bolder text-center border-end">시작일시</td>
                            <td className="col-9 text_sm ps-1">{writing.result.start_rc_day === '0000-00-00 00:00:00' && <span className="text-danger fw-bolder">미시작</span> || <span>{writing.result.start_rc_day}</span>}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm fw-bolder text-center border-end">최종일시</td>
                            <td className="col-9 text_sm ps-1">{writing.result.last_rc_day === '0000-00-00 00:00:00' && <span className="text-danger fw-bolder">미시작</span> || <span>{writing.result.last_rc_day}</span>}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm fw-bolder text-center border-end">전체 장수</td>
                            <td className="col-9 text_sm ps-1">{writing.result.rc_total_su}</td>
                        </tr>
                    </table>
                </Paper>
                <Paper elevation={4} className="p-1 mt-2">
                    <table className="w-100">
                        <tr className="col">
                            <td colspan="2" className="col-3 text_sm fw-bolder text-center border-end">성경읽기</td>
                        </tr>
                        <tr className="col">
                            <td className="col-3 text_sm fw-bolder text-center border-end">시작일시</td>
                            <td className="col-9 text_sm ps-1">{writing.result.start_rd_day === '0000-00-00 00:00:00' && <span className="text-danger fw-bolder">미시작</span> || <span>{writing.result.start_rd_day}</span>}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm fw-bolder text-center border-end">최종일시</td>
                            <td className="col-9 text_sm ps-1">{writing.result.last_rd_day === '0000-00-00 00:00:00' && <span className="text-danger fw-bolder">미시작</span> || <span>{writing.result.last_rd_day}</span>}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm fw-bolder text-center border-end">전체 장수</td>
                            <td className="col-9 text_sm ps-1">{writing.result.rd_total_su}</td>
                        </tr>
                    </table>
                </Paper>
                </>
            }
            {writing.result && writing.result.rc_total_su == 0 && writing.result.tp_total_su == 0 && writing.result.rd_total_su == 0 && 
             <div className="d-flex flex-row">            
                <div className="px-1 border rounded text-danger border-danger text_m">미이용중</div>
                <div className="ms-1">성경읽기/쓰기</div>
            </div>}
        </div>
            
    )
}

export default InfoBibleWriting;