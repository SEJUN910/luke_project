import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper, Grid } from '@mui/material';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


function DayOffList() {

    const [open, setOpen] = useState(false);
    const [dayOff, setDayOff] = useState([]);

    const getDayOffStaffList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getDayOffStaffList"
            },
            { withCredentials: true }
        )
       .then((response) => setDayOff(response.data))
        } catch(e) { console.error(e.message) }
    };
    
    useEffect(() => {
        getDayOffStaffList();
    },[]);

    return(
        <>   
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortManager">
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="fw-bolder">직원연차목록</div>
                </div>
                <div className="border rounded shadow-sm px-2 py-1 mt-2">
                    <div>
                        <span className="text-primary text_m">오늘</span>
                        <span className="text_sm">&nbsp;/&nbsp;{dayOff.result && dayOff.result.today && dayOff.result.today.day+' ('+dayOff.result.today.yoil+')'}</span>
                    </div>
                    <ul className="mt-2 d-flex flex-column gap-1 mb-0">
                        {
                            dayOff.result && dayOff.result.today && dayOff.result.today.list.length > 0 &&
                            dayOff.result.today.list.map(Lists => {
                                return(
                                    <li key={Lists.staff} className="text_m">{Lists.kind}-{Lists.staff}</li>
                                )
                            }) || <div>휴가자가 없습니다.</div>
                        }
                    </ul>
                </div>
                <div className="border rounded shadow-sm px-2 py-1 mt-2">
                    <div className="text_m">
                        <span className="text-primary text_m">내일</span>
                        <span className="text_sm">&nbsp;/&nbsp;{dayOff.result && dayOff.result.tomorrow && dayOff.result.tomorrow.day+' ('+dayOff.result.tomorrow.yoil+')'}</span>
                    </div>
                    <ul className="mt-2 d-flex flex-column gap-1 mb-0">
                        {
                            dayOff.result && dayOff.result.tomorrow && dayOff.result.tomorrow.list.length > 0 &&
                            dayOff.result.tomorrow.list.map(Lists => {
                                return(
                                    <li key={Lists.staff} className="text_m">{Lists.kind}-{Lists.staff}</li>
                                )
                            }) || <div>휴가자가 없습니다.</div>
                        }
                    </ul>
                </div>
            </Paper>
        </Grid>
        </>
    )
}

export default DayOffList;