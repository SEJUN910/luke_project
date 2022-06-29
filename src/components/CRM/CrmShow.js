import React, { useState, useMemo } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import QuizIcon from '@mui/icons-material/Quiz';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Checkbox from '@mui/material/Checkbox';
import CrmStyle from '../../style/css/CrmStyle.module.css';
import { CRMAPI } from '../../items/URL';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Accordion from '@mui/material/Accordion';
import Dialog from '@mui/material/Dialog';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

function AnswerBox(props) {
    const [newAns, setNewAns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hphone, sethphone] = useState(props.hphone);
    const [smsText, setSmsText] = useState('샬롬~ 1:1게시판에 답변이 등록되었습니다^^');
    const [answer, setAnswer] = useState(props.answer);
    const [image1, setImage1] = useState([]);
    const [showImage1, setShowImage1] = useState(false);
    const [image2, setImage2] = useState([]);
    const [showImage2, setShowImage2] = useState(false);
    const [imageOpen, setImageOpen] = useState(false);
    const [mail, setMail] = useState(props.mail);
    const [reload, setReload] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const showAnswer = (<div dangerouslySetInnerHTML={{__html:answer}}></div>);

    // checkbox
    const [checked, setChecked] = useState(true);
    const handleChange = (event) => {
        setChecked(event.target.value);
    };

    const changeQnaReplyJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeQnaReplyJson",
                "q_no": props.q_no,
                "flag": "answer",
                "answer": newAns
            },
            { withCredentials: true }
        )
        .then(alert(props.name+'님 문의 답변이 완료되었습니다.'))
        } catch(e) { console.error(e.message) }
        setLoading(false);
        setConfirmOpen(false);
       }
    
       
    return(
        <>
        <Grid container className="px-3 pt-3">
            <Grid item xs={6}>
                <BorderColorIcon></BorderColorIcon>
            </Grid>
            <Grid item xs={6} className="d-flex flex-row justify-content-end">
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={()=>setImageOpen(true)}>
                        <PhotoCamera />
                        <span className="text_sm ms-1 fw-bolder text-nowrap">이미지첨부</span>
                    </IconButton>
                    {showImage1 === false && 
                    <Dialog open={imageOpen} onClose={()=>setImageOpen(false)}>
                        <div className="p-4">
                            <div className="mb-2 text_m">이미지 링크</div>
                            <div className="d-flex flex-row align-items-center gap-2">
                                <TextField label="URL" placeholder="URL을 입력해주세요" size="small" value={image1} onChange={(e)=>setImage1(e.target.value)}></TextField>
                                <Button variant="contained" onClick={()=>{setShowImage1(true); setImageOpen(false)}}>확인</Button>
                            </div>
                        </div>
                    </Dialog>}
                    {showImage1 === true &&
                    <Dialog open={imageOpen} onClose={()=>setImageOpen(false)}>
                        <div className="p-4">
                            <div className="mb-2 text_m">이미지 링크</div>
                            <div className="d-flex flex-row align-items-center gap-2">
                                <TextField label="URL" placeholder="URL을 입력해주세요" size="small" value={image2} onChange={(e)=>setImage2(e.target.value)}></TextField>
                                <Button variant="contained" onClick={()=>{setShowImage2(true); setImageOpen(false)}}>확인</Button>
                            </div>
                        </div>
                    </Dialog>}
                </label>
                <Form.Group className="rounded mb-2 d-flex">           
                    <Form.Label className="ms-2 mt-2 text_m fw-bolder text-nowrap">템플릿선택</Form.Label>
                    <Form.Select size="sm" className="ms-2 w-25 text_sm" style={{minWidth: '100px'}}>
                        <option>배송문의</option>
                        <option>반품문의</option>
                    </Form.Select>
                </Form.Group>
            </Grid>
        </Grid>
        <div className="mt-2">
            {showImage1 === false && <div></div>
            ||
            <div style={{width: '100%', height: '110px'}} className="my-2 border">
                {showImage1 === true && <img src={image1} width="100"></img>}
                {showImage2 === true && <img src={image2} width="100"></img>}
            </div>}
            {answer === '' && 
            <div>
                <FormControl as="textarea" style={{height: '300px'}} value={newAns} onChange={(e)=>setNewAns(e.target.value)}/>
            </div>
            ||
            <div className="border rounded p-2 text_sm" contenteditable="true" style={{minHeight: '150px'}}>
                {showAnswer}
            </div>}
            <Grid container className="align-items-center mt-2">
                <Grid item xs={9}>
                    <Accordion>
                        <AccordionSummary className="ps-0 pe-2" expandIcon={<ExpandMoreIcon />}>
                            <div className="d-flex flex-row align-items-center">
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    size="small">         
                                </Checkbox>
                                <span className="me-2">SMS</span>
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChange}
                                    size="small">         
                                </Checkbox>
                                <div className="me-2">Email</div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Form.Group>
                                <Form.Label>SMS</Form.Label>
                                <Form.Control className={`${CrmStyle.input_num} text_s py-0 ps-2`} value={hphone} onChange={(e) => sethphone(e.target.value)}/>
                                <Form.Control className={`${CrmStyle.input_text} mt-1 text_s py-0 ps-2`} value="샬롬~ 1:1게시판에 답변이 등록되었습니다^^" onChange={(e)=>setSmsText(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mt-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control className={`${CrmStyle.input_email} me-2 text_s py-0 ps-2`} value={mail} onChange={(e)=>setMail(e.target.value)}/>  
                            </Form.Group>
                        </AccordionDetails>
                    </Accordion>                    
                </Grid>
                <Grid item xs={2} className="ps-4">
                    <Button variant="contained" className="text-nowrap" onClick={() => setConfirmOpen(true)}>답변하기</Button>
                </Grid>
            </Grid>    
            <Dialog open={confirmOpen} onClose={()=>setConfirmOpen(false)}>
                <div className="p-4">
                    <div className="mb-3">
                        답변하시겠습니까 ?
                    </div>
                    <div className="d-flex gap-3">
                        <Button variant="contained" className="px-3 py-1" onClick={()=>changeQnaReplyJson()}>답변하기</Button>
                        <Button variant="contained" color="error" className="px-3 py-1" onClick={()=> setConfirmOpen(false)}>취소하기</Button>
                    </div>
                </div>
            </Dialog> 
        </div>
        </>
    )
}


function CrmShow(props) {
    return (
        <div className="border p-2">
            <AnswerBox hphone={props.hphone} mail={props.mail} q_no={props.q_no} name={props.name} answer={props.answer}></AnswerBox>
        </div>
    )
}

export default CrmShow;