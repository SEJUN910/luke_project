import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from 'axios';
import { CRMAPI, GKCAPI } from '../../items/URL';
import {IconButton, Checkbox, Dialog, Grid ,Button, TextField, AccordionSummary, AccordionDetails, Accordion, Tooltip} from '@mui/material';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import ImageSearchIcon from '@mui/icons-material/ImageSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LaunchIcon from '@mui/icons-material/Launch';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckIcon from '@mui/icons-material/Check';
import { Form, FloatingLabel, Table } from 'react-bootstrap';
import CrmStyle from '../../style/css/CrmStyle.module.css';

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
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [realImage, setRealImage] = useState(false);
    const [OpenTemplate, setOpenTemplate] = useState(false);
    const [openCreateTemplate, setOpenCreateTemplate] = useState(false);
    const [template, setTemplate] = useState([]);
    const [qnaKind, setQnaKind] = useState([]);
    const [title, setTitle] = useState([]);
    const [contents, setContents] = useState([]);
    const [category, setCategory] = useState([]);
    const [reload, setReload] = useState([]);
    const [showContents, setShowContents] = useState([]);
    const [openContents, setOpenContents] = useState(false);
    const [openChangeTemplate, setOpenChangeTemplate] = useState(false);
    const [best, setBest] = useState([]);
    const [tno, setTno] = useState([]);
    const [staff, setStaff] = useState([]);

    const showAnswer = (<div dangerouslySetInnerHTML={{__html:answer}} style={{whiteSpace:'pre-line'}}></div>);
    const sendImage1 = image1.length > 0 && `<span style="margin-right: 10px"><img src=${image1} style='max-width: 500px'></img></span>` || '';
    const sendImage2 = image2.length > 0 && `<span><img src=${image2} style='max-width: 500px'></img></span>` || '';
    const sendAnswer = 
    sendImage1+sendImage2+
    '<div>'+newAns+'</div>';

    const sendRealImage =
    `
        <div>
            ${image1.length !== 0 && sendImage1 || ''}
            ${image2.length !== 0 && sendImage2 || ''}
        </div>
    `

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
                "answer": sendAnswer
            },
            { withCredentials: true }
        )
        .then(alert(props.name+'님 문의 답변이 완료되었습니다.'))
        } catch(e) { console.error(e.message) }
        setLoading(false);
        setConfirmOpen(false);
    }

    const textChange = (e) => {
        setNewAns(e.target.value.replaceAll(/(\r|\r\n)/g,"<br/>"));
    }

    // 템플릿용
    const createQnaTemplateJson = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "createQnaTemplateJson",
                "category": category,
                "title": title,
                "contents": contents,
            },
            { withCredentials: true }
        )
        .then(res=>res.data.success === true && alert('템플릿이 정상적으로 등록되었습니다.'))
        } catch(e) { console.error(e.message); alert('템플릿이 등록에 실패했습니다. 다시 확인해주세요.') }
        setLoading(false);
        setOpenCreateTemplate(false);
        setCategory([]);
        setTitle([]);
        setContents([]);
        setReload(new Date());
    }

    const getQnaTemplateList = useCallback(async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getQnaTemplateList",
            },
            { withCredentials: true }
        )
        .then(res=>res.data.success === true && setTemplate(res.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    },[])

    const get_godstaff_list = useCallback(async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            GKCAPI,
            {
                "task": "get_godstaff_list",
            },
            { withCredentials: true }
        )
        .then(res=>res.data.success === true && setStaff(res.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
    },[]);
    
    useEffect(()=>{
        get_godstaff_list();
    },[])

    const changeQnaTemplateJson = async (t_no, category, title, contents, best) => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeQnaTemplateJson",
                "t_no": t_no,
                "category": category,
                "title": title,
                "contents": contents,
                "best": best
            },
            { withCredentials: true }
        )
        .then(res=>res.data.success === true && alert('정상적으로 수정되었습니다.'))
        } catch(e) { console.error(e.message); alert('수정에 실패했습니다.') }
        setLoading(false);
        setReload(new Date());
        setOpenChangeTemplate(false);
        setTno([]);
        setCategory([]);
        setTitle([]);
        setContents([]);
        setBest([]);
    }

    const removeQnaTemplateJson = async (t_no) => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "removeQnaTemplateJson",
                "t_no": t_no
            },
            { withCredentials: true }
        )
        .then(res=>res.data.success === true && alert('정상적으로 삭제되었습니다.'))
        } catch(e) { console.error(e.message); alert('삭제에 실패했습니다.') }
        setLoading(false);
        setReload(new Date());
    }

    useEffect(()=>{
        getQnaTemplateList();
    }, [reload])

    const ShowOpenContents = (t_no) => {
        setShowContents(t_no);
        setOpenContents(!openContents);
    }

    const changeTemplate = (t_noC, categoryC, titleC, contentsC, bestC) => {
        setOpenChangeTemplate(true);
        setTno(t_noC);
        setCategory(categoryC);
        setTitle(titleC);
        setContents(contentsC);
        setBest(bestC);
    }
    
    const applyTemplate = (contentsA) => {
        setNewAns(contentsA);
        setOpenTemplate(false);
    }

    return(
        <div className="border p-2 rounded">
        <Grid container className="px-3">
            <Grid item xs={6}>
                <BorderColorIcon></BorderColorIcon>
            </Grid>
            <Grid item xs={6} className="d-flex flex-row justify-content-end">
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="uploadPicture" component="span" onClick={()=>setImageOpen(true)}>
                        <PhotoCamera />
                        <span className="text_sm ms-1 fw-bolder text-nowrap">이미지첨부</span>
                    </IconButton>
                    {showImage1 === false && 
                    <Dialog open={imageOpen} onClose={()=>setImageOpen(false)}>
                        <div className="p-4">
                            <div className="mb-2 text_m">이미지 링크</div>
                            <div className="d-flex flex-row align-items-center gap-2">
                                <TextField label="URL" placeholder="URL을 입력해주세요" size="small" style={{width: '600px'}} value={image1} onChange={(e)=>setImage1(e.target.value)}></TextField>
                                <Button variant="contained" onClick={()=>{setShowImage1(true); setImageOpen(false)}}>확인</Button>
                            </div>
                        </div>
                    </Dialog>}
                    {showImage1 === true &&
                    <Dialog open={imageOpen} onClose={()=>setImageOpen(false)}>
                        <div className="p-4">
                            <div className="mb-2 text_m">이미지 링크</div>
                            <div className="d-flex flex-row align-items-center gap-2">
                                <TextField label="URL" placeholder="URL을 입력해주세요" size="small" style={{width: '600px'}} value={image2} onChange={(e)=>setImage2(e.target.value)}></TextField>
                                <Button variant="contained" onClick={()=>{setShowImage2(true); setImageOpen(false)}}>확인</Button>
                            </div>
                        </div>
                    </Dialog>}
                </label>
                <Form.Group className="rounded mb-2 d-flex">           
                    <Form.Label className="ms-2 mt-2 text_m fw-bolder text-nowrap" style={{cursor:'pointer'}} onClick={()=>setOpenTemplate(true)}>템플릿</Form.Label>
                    <Form.Select size="sm" className="ms-2 w-25 text_sm" style={{minWidth: '100px'}} value={newAns} onChange={(e)=>setNewAns(e.target.value)}>
                        <option value="" style={{display:'none'}}>선택</option>
                        {template && template.result && template.result.map(Lists=>{
                            return(
                                <React.Fragment key={Lists.t_no}>
                                {Lists.best === '1' && <option value={Lists.contents}>{Lists.title}</option>}
                                </React.Fragment>
                            )
                        })}
                    </Form.Select>
                </Form.Group>
                <Dialog open={OpenTemplate} onClose={()=>setOpenTemplate(false)} fullWidth={true} maxWidth="lg">
                    <div className="p-4">
                        <div>
                            <div className="border-bottom pb-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                <h5>템플릿 목록</h5>
                                <div className="d-flex flex-row align-items-center gap-3">
                                    <Button variant="contained" color="secondary" size="sm" onClick={()=>setOpenCreateTemplate(true)}>템플릿 작성</Button>
                                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenTemplate(false)}>
                                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                    </IconButton>
                                </div>
                            </div>
                            <Grid container spacing={2} className="p-2 vh80">
                                <Grid item xs={6} style={{overflowY:'auto'}}>
                                    <div className="fw-bolder text_l mb-2">갓피플몰</div>
                                    <ul className="p-0">
                                        {template && template.result && template.result.map(Lists=>{
                                            return(
                                                <div key={Lists.t_no}>
                                                    {
                                                        Lists.category === 'mall' &&
                                                        <>
                                                        <li className={`${CrmStyle.templateList} col d-flex flex-row align-items-center border rounded p-1`}>
                                                            <div className="col-5 text_m" onClick={()=>ShowOpenContents(Lists.t_no)} style={{cursor:'pointer'}}>{Lists.title}</div>
                                                            {staff && staff.list && staff.list.map(staffs=>{
                                                                if( staffs[0] === Lists.agent) {
                                                                    return(
                                                                        <div className="col-2 text_sm text-center" key={staffs[0]}>{staffs[1]}&nbsp;{staffs[2]}</div>
                                                                    )
                                                                }
                                                            })}
                                                            <div className="col-2 text_sm text-center text-secondary">{Lists.rdate}</div>
                                                            <div className="col-3 text_sm text-center text-secondary">
                                                                <Tooltip title="선택">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1`} onClick={()=>applyTemplate(Lists.contents)}>
                                                                        <LaunchIcon style={{fontSize:'20px'}}></LaunchIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="수정">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeTemplate(Lists.t_no, Lists.category, Lists.title, Lists.contents, Lists.best)}>
                                                                        <EditIcon style={{fontSize:'20px'}}></EditIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="삭제">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=> removeQnaTemplateJson(Lists.t_no)}>
                                                                        <DeleteIcon style={{fontSize:'20px'}}></DeleteIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {Lists.best === '0' &&
                                                                <Tooltip title="자주쓰는템플릿">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 1)}>
                                                                        <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                }
                                                                {Lists.best === '1' &&
                                                                <Tooltip title="자주쓰는템플릿">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} style={{color: '#FFF', background:'#90caf9'}} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 0)}>
                                                                        <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                }
                                                            </div>
                                                        </li>
                                                        {Lists.t_no === showContents && openContents === true && 
                                                        <div className="border p-1 text_m mb-2">
                                                            {Lists.contents}
                                                        </div>}
                                                        </>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item xs={6}>
                                    <div className="fw-bolder text_l mb-2">갓피플</div>
                                    <ul className="p-0">
                                    {template && template.result && template.result.map(Lists=>{
                                            return(
                                                <div key={Lists.t_no}>
                                                    {
                                                        Lists.category === 'godp' &&
                                                        <>
                                                        <li className={`${CrmStyle.templateList} col d-flex flex-row align-items-center border rounded p-1`}>
                                                            <div className="col-5 text_m" onClick={()=>ShowOpenContents(Lists.t_no)} style={{cursor:'pointer'}}>{Lists.title}</div>
                                                            {staff && staff.list && staff.list.map(staffs=>{
                                                                if( staffs[0] === Lists.agent) {
                                                                    return(
                                                                        <div className="col-2 text_m text-center" key={staffs[0]}>{staffs[1]}&nbsp;{staffs[2]}</div>
                                                                    )
                                                                }
                                                            })}
                                                            <div className="col-2 text_sm text-center text-secondary">{Lists.rdate}</div>
                                                            <div className="col-3 text_sm text-center text-secondary">
                                                            <Tooltip title="선택">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1`} onClick={()=>applyTemplate(Lists.contents)}>
                                                                        <LaunchIcon style={{fontSize:'20px'}}></LaunchIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="수정">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeTemplate(Lists.t_no, Lists.category, Lists.title, Lists.contents, Lists.best)}>
                                                                        <EditIcon style={{fontSize:'20px'}}></EditIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                <Tooltip title="삭제">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=> removeQnaTemplateJson(Lists.t_no)}>
                                                                        <DeleteIcon style={{fontSize:'20px'}}></DeleteIcon>
                                                                    </IconButton>
                                                                </Tooltip>
                                                                {Lists.best === '0' &&
                                                                <Tooltip title="자주쓰는템플릿">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 1)}>
                                                                        <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                    </IconButton>
                                                                </Tooltip>}
                                                                {Lists.best === '1' &&
                                                                <Tooltip title="자주쓰는템플릿">
                                                                    <IconButton className={`${CrmStyle.templateListBtn} border p-1 ms-1`} style={{color: '#FFF', background:'#90caf9'}} onClick={()=>changeQnaTemplateJson(Lists.t_no, Lists.category, Lists.title, Lists.contents, 0)}>
                                                                        <CheckIcon style={{fontSize:'20px'}}></CheckIcon>
                                                                    </IconButton>
                                                                </Tooltip>}
                                                            </div>
                                                        </li>
                                                        {Lists.t_no === showContents && openContents === true && <div className="border p-1 text_m mb-2">{Lists.contents}</div>}
                                                        </>
                                                    }
                                                </div>
                                            )
                                        })}
                                    </ul>
                                </Grid>
                            </Grid>
                            
                            <Dialog open={openCreateTemplate} onClose={()=>setOpenCreateTemplate(false)} fullWidth={true} maxWidth="sm">
                                <div className="p-4">
                                    <div className="border-bottom pb-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                        <h5>템플릿 작성하기</h5>
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenCreateTemplate(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                    <Form.Select className="mb-3" style={{width:'30%'}} placeholder="카테고리를 선택해주세요" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                        <option value="" style={{display:'none'}}>카테고리 선택</option>
                                        <option value="mall">몰</option>
                                        <option value="godp">갓피플</option>
                                    </Form.Select>
                                    <FloatingLabel controlId="title" label="제목" className="mb-3">  
                                        <Form.Control placeholder="제목을 적어주세요" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="contents" label="내용" className="mb-3">       
                                        <Form.Control as="textarea" placeholder="내용을 적어주세요" style={{ minHeight:'200px'}} value={contents} onChange={(e)=>setContents(e.target.value)}/>
                                    </FloatingLabel>
                                    <Button variant="contained" className="float-end" onClick={createQnaTemplateJson}>등록하기</Button>
                                </div>
                            </Dialog>

                            <Dialog open={openChangeTemplate} onClose={()=>setOpenChangeTemplate(false)} fullWidth={true} maxWidth="sm">
                                <div className="p-4">
                                    <div className="border-bottom pb-2 mb-3 d-flex flex-row justify-content-between align-items-center">
                                        <h5>템플릿 수정하기</h5>
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenChangeTemplate(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                    <Form.Select className="mb-3" style={{width:'30%'}} placeholder="카테고리를 선택해주세요" value={category} onChange={(e)=>setCategory(e.target.value)}>
                                        <option value="" style={{display:'none'}}>카테고리 선택</option>
                                        <option value="mall">몰</option>
                                        <option value="godp">갓피플</option>
                                    </Form.Select>
                                    <FloatingLabel controlId="title" label="제목" className="mb-3">  
                                        <Form.Control placeholder="제목을 적어주세요" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                                    </FloatingLabel>
                                    <FloatingLabel controlId="contents" label="내용" className="mb-3">       
                                        <Form.Control as="textarea" placeholder="내용을 적어주세요" style={{ minHeight:'200px'}} value={contents} onChange={(e)=>setContents(e.target.value)}/>
                                    </FloatingLabel>
                                    <Button variant="contained" className="float-end" onClick={()=>changeQnaTemplateJson(tno, category, title, contents, best)}>수정하기</Button>
                                </div>
                            </Dialog>
                        </div>
                    </div>
                </Dialog>
            </Grid>
        </Grid>
        <div className="mt-2">
            {showImage1 === false && <div></div>
            ||
            <>
            <div style={{width: '100%', height: '145px'}} className="my-2 ps-2 pt-2 border">
                {showImage1 === true && <img src={image1} width="100" height="100" className="me-3"></img>}
                {showImage2 === true && <img src={image2} width="100" height="100"></img>}
                <div className="d-flex flex-row align-items-center gap-2 text_s p-1 text-secondary text-nowrap">
                    <span>발송되는 이미지는 실제 이미지 사이즈 입니다(최대 가로 500px)</span>
                    <Tooltip title="이미지 미리보기">
                        <IconButton size="small" className="p-0" color="primary" onClick={()=>setRealImage(true)}><ImageSearchIcon className="p-0"></ImageSearchIcon></IconButton>
                    </Tooltip>
                </div>
            </div>
            <Dialog open={realImage} onClose={()=> setRealImage(false)} fullWidth={true} maxWidth="lg">
                <div className="p-4">
                    <div dangerouslySetInnerHTML={{__html:sendRealImage}}></div>
                </div>
            </Dialog>
            </>
            }
            {answer  &&
            <div className="border rounded p-2 text_sm" contenteditable="true" style={{minHeight: '150px'}}>
                {showAnswer}
            </div>
            ||
            <div>
                <Form.Control as="textarea" className="border rounded w-100 p-2" style={{height: '250px'}} value={newAns} onChange={textChange}/>
            </div>
            }
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
                <div className="p-5">
                    <div className="mb-3 pb-2 fw-bolder border-bottom">
                        답변하시겠습니까 ?
                    </div>
                    <div className="p-1 m-2 mb-4">
                        <Form.Group>
                            <Form.Label>문의유형</Form.Label>
                            <Form.Select value={qnaKind} onChange={(e)=>setQnaKind(e.target.value)}>
                                <option value="" disabled selected style={{display:'none'}}>선택해주세요.</option>
                                <option value="A">일반배송</option>
                                <option value="B">반품/교환/환불</option>
                                <option value="C">주문수정</option>
                                <option value="D">상품문의</option>
                                <option value="E">회원/사이트이용</option>
                                <option value="F">기타</option>
                            </Form.Select>
                        </Form.Group>                        
                    </div>
                    <div className="d-flex gap-3">
                        <Button variant="contained" className="px-3 py-1" onClick={()=>changeQnaReplyJson()} disabled={qnaKind == '' && true || false}>답변하기</Button>
                        <Button variant="contained" color="error" className="px-3 py-1" onClick={()=> setConfirmOpen(false)}>취소하기</Button>
                    </div>
                </div>
            </Dialog> 
        </div>
        </div>
    )
}

export default AnswerBox;