import React,{ useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper } from '@mui/material';

function ModifyRecruit(props) {
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState([]);
    const [recruit, setRecruit] = useState([]);

    const getRecruitInfoJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getRecruitInfoJson",
                "user_n": props.user_n,
                "user_id": props.user_id
            },
            { withCredentials: true }
        )
       .then((response) => setRecruit(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
      };

    useEffect(()=>{
        getRecruitInfoJson();
    },[props])
    
    return(
        <div className="d-flex flex-column">
            {
                recruit.result &&
                recruit.result.recruiter == false &&
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">            
                        <div className="px-1 border rounded text-danger border-danger text_m">미이용중</div>
                        <div className="ms-1">취업공고</div>
                    </div>
                </div>
            }
            {   
                recruit.result && recruit.result.Recruiter == true &&
                <>
                <div className="d-flex flex-row">            
                    <div className="px-1 border rounded text-primary border-primary text_m">이용중</div>
                    <div className="ms-1 text_m">최근등록 취업공고</div>
                </div>         
                <Paper elevation={4} className="p-1 mt-2">
                    <table className="w-100">
                        <tr className="col">
                            <td className="col-3 text_sm fw-bolder text-center border-end">공고명</td>
                            <td className="col-9 text_sm ps-1">{recruit.result.RecruitInfo .title}</td>
                        </tr>
                        <tr className="col border-top">
                            <td className="col-3 text_sm py-1 fw-bolder text-center border-end">마감일</td>
                            <td className="col-9 text_sm ps-1">{recruit.result.RecruitInfo .period_date}</td>
                        </tr>
                    </table>
                </Paper>
                </>    
            }
        </div>
    )
}

export default ModifyRecruit;