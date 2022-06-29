import React, { useState, useCallback, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper, Grid, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Dialog from '@mui/material/Dialog';
import { Form, Table } from 'react-bootstrap';

function Chatbot() {
    const [open, setOpen] = useState(false);
    const [buttons, setButtons] = useState([]);
    const [list, setList] = useState([]);
    const [openModify, setOpenModify] = useState(false);
    const [openButtons, setOpenButtons] = useState(false);
    const [title, setTitle] = useState([]);
    const [explain, setExplain] = useState([]);
    const [checked, setChecked] = useState(1);
    const [imageUrl, setImageUrl] = useState([]);
    const [webUrl, setWebUrl] = useState([]);
    const [code, setCode] = useState([]);
    const [no, setNo] = useState([]);
    const [label, setLabel] = useState([]);
    const [radioShow, setRadioShow] = useState('main');

    // 버튼목록 불러오기
    const getChatbotExhibitionButtonList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getChatbotExhibitionButtonList",
            },
            { withCredentials: true }
        )
       .then((response) => setButtons(response.data))
        } catch(e) { console.error(e.message) }
    };

    // 버튼별 수정
    const changeChatbotExhibitionButtonJson = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeChatbotExhibitionButtonJson",
                "label": label,
                "no": no,
                "checked": checked
            },
            { withCredentials: true }
        )
       .then((response) => {response.data.success === true ? alert('수정이 완료되었습니다.') : alert('수정에 실패했습니다.')})
        } catch(e) { console.error(e.message) }
        setOpenButtons(false);
        getChatbotExhibitionButtonList();
    };

    // 블록 목록 불러오기
    const getChatbotExhibitionList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getChatbotExhibitionList",
            },
            { withCredentials: true }
        )
       .then((response) => setList(response.data))
        } catch(e) { console.error(e.message) }
    };

    // 블록별 수정
    const changeChatbotExhibitionJson = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeChatbotExhibitionJson",
                "title": title,
                "explain": explain,
                "checked": checked,
                "imageUrl": imageUrl,
                "webUrl":  webUrl,
                "code": code
            },
            { withCredentials: true }
        )
       .then((response) => {response.data.success === true ? alert('수정이 완료되었습니다.') : alert('수정에 실패했습니다.')})
        } catch(e) { console.error(e.message) }
        setOpenModify(false);
        getChatbotExhibitionList();
    };

    useEffect(() => {
        getChatbotExhibitionList();
        getChatbotExhibitionButtonList();
    },[]);

    // 세팅하기
    const modifySetting = (title, explain, image_url, web_url, checked, code) => {
        setOpenModify(true);
        setTitle(title);
        setExplain(explain);
        setImageUrl(image_url);
        setWebUrl(web_url);
        setChecked(checked);
        setCode(code);
    }

    const buttonSetting = (label, no, checked) => {
        setOpenButtons(true);
        setNo(no);
        setLabel(label);
        setChecked(checked);
    }

    let button = [];
    let block1 = [];
    let block2 = [];
    let block3 = [];
    buttons.result && buttons.result.map(Lists=>{
        Lists.checked === '1' && button.push(Lists.code)
    })

    list.result && list.result.map(Lists=>{
        Lists.code.slice(0,1) === '1' && Lists.checked === '1' && block1.push(Lists.code)
        Lists.code.slice(0,1) === '2' && Lists.checked === '1' && block2.push(Lists.code)
        Lists.code.slice(0,1) === '3' && Lists.checked === '1' && block3.push(Lists.code)
    })
    return(
        <> 
        <Paper elevation={9} className="p-3 miniBox sortPersonal" style={{height: '200px !important'}}>
            <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                <div className="fw-bolder">챗봇매니저</div>
                <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                    <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                </IconButton>
            </div>
            <div className="d-flex flex-column gap-1 align-items-center mt-3">
                {buttons.result && <div>버튼활성 : {button.length}개</div>}
                <div>1번블록 활성 : {block1.length}개</div>
                <div>2번블록 활성 : {block2.length}개</div>
                <div>3번블록 활성 : {block3.length}개</div>
            </div>
        </Paper>
        <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
            <div className="px-3 pb-3 vh80">                
                <div className="sticky-top bg-white rounded pt-4 d-flex flex-row align-items-center justify-content-between border-bottom mb-3 pb-2">
                    <div className="d-flex flex-row align-items-center">
                        <span>챗봇매니저</span>
                    </div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>
                <Form.Group className="d-flex flex-row gap-4">
                    <Form.Check type="radio" label="메인" name="exhibition" checked={radioShow === 'main'} value='main' onChange={(e)=>setRadioShow(e.target.value)}></Form.Check>
                    <Form.Check type="radio" label="1번버튼" name="exhibition" checked={radioShow === 'block1'} value='block1' onChange={(e)=>setRadioShow(e.target.value)}></Form.Check>
                    <Form.Check type="radio" label="2번버튼" name="exhibition" checked={radioShow === 'block2'} value='block2' onChange={(e)=>setRadioShow(e.target.value)}></Form.Check>
                    <Form.Check type="radio" label="3번버튼" name="exhibition" checked={radioShow === 'block3'} value='block3' onChange={(e)=>setRadioShow(e.target.value)}></Form.Check>
                </Form.Group>
                {radioShow === 'main' &&
                <>
                <div className="d-flex justify-content-center">
                    <Table striped bordered className="my-3 w-50">
                        <thead className="text-center col">
                            <th className="col-1">분류</th>
                            <th className="col-2">버튼명</th>
                            <th className="col-1">노출여부</th>
                            <th className="col-1">수정하기</th>
                        </thead>
                        <tbody>
                            {buttons.result && buttons.result.map(Lists => {
                                return(
                                    <React.Fragment key={Lists.no}>
                                        <tr className="text_sm text-center">
                                            <td>{Lists.no}번</td>
                                            <td>{Lists.label}</td>
                                            <td>
                                                {Lists.checked === '1' && <div className="border text-primary border-primary rounded p-1">ON</div>}
                                                {Lists.checked === '0' && <div className="border text-danger border-danger rounded p-1">OFF</div>}
                                            </td>
                                            <td><Button variant="contained" color="secondary" size="small" onClick={()=>buttonSetting(Lists.label, Lists.no, Lists.checked)}>수정하기</Button></td>
                                        </tr>
                                    </React.Fragment>
                                )
                                
                            })}
                        </tbody>
                    </Table>
                </div>
                <Dialog open={openButtons} onClose={()=>setOpenButtons(false)} fullWidth={true} maxWidth="sm">
                    <div className="p-4">
                        <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                            <div className="fw-bolder">버튼수정</div>
                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenButtons(false)}>
                                <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                            </IconButton>
                        </div>
                        <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                            <Grid item xs={2}>버튼명</Grid>
                            <Grid item xs={5}>
                                <Form.Control size="sm" value={label} onChange={(e)=>setLabel(e.target.value)}></Form.Control>
                            </Grid>
                        </Grid>
                        <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                            <Grid item xs={2}>노출여부</Grid>
                            <Grid item xs={9}>
                                <Form.Check type="checkbox" size="sm" defaultChecked={checked === '1' ? true : false} onChange={(e)=>setChecked(checked === '1' ? '0' : '1')}></Form.Check>
                            </Grid>
                        </Grid>
                        <Button className="float-end mt-2" variant="contained" onClick={changeChatbotExhibitionButtonJson}>수정하기</Button>
                    </div>
                </Dialog>
                </>}
                
                {radioShow === 'block1' && 
                <Table striped bordered className="my-3">
                    <thead className="text-center col">
                        <th className="col-1">분류</th>
                        <th className="col-2">제목</th>
                        <th className="col-2">설명(옵션)</th>
                        <th className="col-3">이미지URL</th>
                        <th className="col-3">링크URL</th>
                        <th className="col-1">노출여부</th>
                        <th className="col-1">수정하기</th>
                    </thead>
                    <tbody>
                        {list.result && list.result.map(Lists => {
                            return(
                                <React.Fragment key={Lists.code}>
                                {Lists.block_no === '1' &&
                                    <tr className="text_sm text-center">
                                        <td>{Lists.block_no}번 블록</td>
                                        <td>{Lists.title}</td>
                                        <td>{Lists.explain}</td>
                                        <td>{Lists.image_url}</td>
                                        <td>{Lists.web_url}</td>
                                        <td>
                                            {Lists.checked === '1' && <div className="border text-primary border-primary rounded p-1">ON</div>}
                                            {Lists.checked === '0' && <div className="border text-danger border-danger rounded p-1">OFF</div>}
                                        </td>
                                        <td><Button variant="contained" color="secondary" size="small" className="text-nowrap" onClick={()=>modifySetting(Lists.title, Lists.explain, Lists.image_url, Lists.web_url, Lists.checked, Lists.code)}>수정하기</Button></td>
                                    </tr>
                                }
                                </React.Fragment>
                            )
                            
                        })}
                    </tbody>
                </Table>}

                {radioShow === 'block2' &&
                <Table striped bordered className="my-3">
                    <thead className="text-center col">
                        <th className="col-1">분류</th>
                        <th className="col-2">제목</th>
                        <th className="col-2">설명(옵션)</th>
                        <th className="col-3">이미지URL</th>
                        <th className="col-3">링크URL</th>
                        <th className="col-1">노출여부</th>
                        <th className="col-1">수정하기</th>
                    </thead>
                    <tbody>
                        {list.result && list.result.map(Lists => {
                            return(
                                <React.Fragment key={Lists.code}>
                                {Lists.block_no === '2' &&
                                    <tr className="text_sm text-center">
                                        <td>{Lists.block_no}번 블록</td>
                                        <td>{Lists.title}</td>
                                        <td>{Lists.explain}</td>
                                        <td>{Lists.image_url}</td>
                                        <td>{Lists.web_url}</td>
                                        <td>
                                            {Lists.checked === '1' && <div className="border text-primary border-primary rounded p-1">ON</div>}
                                            {Lists.checked === '0' && <div className="border text-danger border-danger rounded p-1">OFF</div>}
                                        </td>
                                        <td><Button variant="contained" color="secondary" size="small" className="text-nowrap" onClick={()=>modifySetting(Lists.title, Lists.explain, Lists.image_url, Lists.web_url, Lists.checked, Lists.code)}>수정하기</Button></td>
                                    </tr>
                                }
                                </React.Fragment>
                            )
                            
                        })}
                    </tbody>
                </Table>}

                {radioShow === 'block3' && 
                <Table striped bordered className="my-3">
                    <thead className="text-center col">
                        <th className="col-1">분류</th>
                        <th className="col-2">제목</th>
                        <th className="col-2">설명(옵션)</th>
                        <th className="col-3">이미지URL</th>
                        <th className="col-3">링크URL</th>
                        <th className="col-1">노출여부</th>
                        <th className="col-1">수정하기</th>
                    </thead>
                    <tbody>
                        {list.result && list.result.map(Lists => {
                            return(
                                <React.Fragment key={Lists.code}>
                                {Lists.block_no === '3' &&
                                    <tr className="text_sm text-center">
                                        <td>{Lists.block_no}번 블록</td>
                                        <td>{Lists.title}</td>
                                        <td>{Lists.explain}</td>
                                        <td>{Lists.image_url}</td>
                                        <td>{Lists.web_url}</td>
                                        <td>
                                            {Lists.checked === '1' && <div className="border text-primary border-primary rounded p-1">ON</div>}
                                            {Lists.checked === '0' && <div className="border text-danger border-danger rounded">OFF</div>}
                                        </td>
                                        <td><Button variant="contained" color="secondary" size="small" className="text-nowrap" onClick={()=>modifySetting(Lists.title, Lists.explain, Lists.image_url, Lists.web_url, Lists.checked, Lists.code)}>수정하기</Button></td>
                                    </tr>
                                }
                                </React.Fragment>
                            )
                            
                        })}
                    </tbody>
                </Table>}

            </div>
            <Dialog open={openModify} onClose={()=>setOpenModify(false)} fullWidth={true} maxWidth="sm">
                <div className="p-4">
                    <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div className="fw-bolder">블록수정</div>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpenModify(false)}>
                            <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                        </IconButton>
                    </div>
                    <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                        <Grid item xs={2}>제목</Grid>
                        <Grid item xs={5}>
                            <Form.Control size="sm" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
                        </Grid>
                    </Grid>
                    <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                        <Grid item xs={2}>설명(옵션)</Grid>
                        <Grid item xs={5}>
                            <Form.Control size="sm" value={explain} onChange={(e)=>setExplain(e.target.value)}></Form.Control>
                        </Grid>
                    </Grid>
                    <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                        <Grid item xs={2}>이미지URL</Grid>
                        <Grid item xs={9}>
                            <Form.Control size="sm" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)}></Form.Control>
                        </Grid>
                    </Grid>
                    <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                        <Grid item xs={2}>링크URL</Grid>
                        <Grid item xs={9}>
                            <Form.Control size="sm" value={webUrl} onChange={(e)=>setWebUrl(e.target.value)}></Form.Control>
                        </Grid>
                    </Grid>
                    <Grid container className="d-flex flex-row align-items-center mt-2 gap-1">
                        <Grid item xs={2}>노출여부</Grid>
                        <Grid item xs={9}>
                            <Form.Check type="checkbox" size="sm" defaultChecked={checked === '1' ? true : false} onChange={(e)=>setChecked(checked === '1' ? '0' : '1')}></Form.Check>
                        </Grid>
                    </Grid>
                    <Button className="float-end mt-2" variant="contained" onClick={changeChatbotExhibitionJson}>수정하기</Button>
                </div>
            </Dialog>
        </Dialog>
        </>
    )
}

export default Chatbot;