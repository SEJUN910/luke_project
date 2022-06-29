import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CRMAPI } from '../../items/URL';
import { Dialog, Paper, Grid, IconButton } from '@mui/material';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import FaqStyle from '../../style/css/FaqStyle.module.css';

function FaqRecent(props) {
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showFaq, setShowFaq] = useState([]);
    const [open, setOpen] = useState([]);

   
    
    const getFaqList = useCallback( async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getFaqList",
                "service": props.service,
                "category_id": '', 
            },
            { withCredentials: true }
        )
       .then((response) =>{
       if(response.data.success === true){setShowFaq(response.data)}})
        } catch(e) { console.error(e.message) }
        setLoading(false);
      },[props.service]);

    useEffect(()=>{
        getFaqList();
    },[props.service])


    return(
        <div className={`${FaqStyle.FaqListBox} border w-100 mt-2 p-2`} style={{background: '#f9f9f9'}}>
            <div className="border">
                <div className="px-2 py-2 text-center border-bottom text_l fw-bolder bg-white">
                    <div>최근 등록된 FAQ</div>
                </div>
                <div className="w-100 bg-white border-bottom">
                    <Grid container className="py-2 text_sm text-center fw-bolder align-items-center">
                        <Grid item xs={10}>제목</Grid>
                        <Grid item xs={2}>
                            <span>등록일</span>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    {
                        showFaq.result &&
                        showFaq.result.faq_list.slice(0,10).map(Lists=>{
                            return(
                                <div key={Lists.f_no}>
                                    <div style={{cursor:'pointer'}} onClick={()=>setOpen(Lists.f_no)} className="p-3 bg-white border-bottom text_m d-flex flex-row justify-content-between">
                                        <div>{Lists.question}</div>
                                        <div className="text-nowrap">{Lists.rdate.substr(0,10)}</div>
                                    </div>   
                                    <Dialog open={open == Lists.f_no ? true : false} onClose={()=>{setOpen(false)}} maxWidth="lg">
                                        <div>
                                            <div className="p-4">
                                                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 mb-3">
                                                    <div className="fw-bolder">{Lists.question}</div>
                                                    <IconButton variant="outlined" size="small" className="border" onClick={()=> setOpen(false)}>
                                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                                    </IconButton>
                                                </div>
                                                <div dangerouslySetInnerHTML={{__html:Lists.answer}}></div>
                                            </div>
                                        </div>
                                    </Dialog>
                                </div>
                            )
                        }) 
                    }
                </div>
            </div>
        </div>
    )
}

export default FaqRecent;