import React, {useState, useEffect, useCallback, useMemo, useRef} from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { CRMAPI } from '../../items/URL';
import { Dialog, Paper, Grid, Button, TextField, IconButton } from '@mui/material';
import FaqStyle from '../../style/css/FaqStyle.module.css';
import {Form} from 'react-bootstrap';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';


function FaqList(props) {
    const [text, setText] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showFaq, setShowFaq] = useState([]);
    const [open, setOpen] = useState([]);
    const [reset, serReset] = useState([]);

    const getFaqList = useCallback( async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getFaqList",
                "service": props.service,
                "category": props.category, 
            },
            { withCredentials: true }
        )
       .then((response) =>{
       if(response.data.success === true){setShowFaq(response.data)}})
        } catch(e) { console.error(e.message) }
        setLoading(false);
      },[props.service, props.category]);

    useEffect(()=>{
        getFaqList();
    },[props.service, props.category, reset])



    function Qill(props) {
        const [contents, setContents] = useState(props.content);
        const [category2, setCategory2] = useState(props.category.substr(0,1));
        const [cateSmall, setCateSamll] = useState(props.category);
        const [bigCateList, setBigCateList] = useState([]);
        const [smallCate, setSmallCate] = useState([]);
        const [subject, setSubject] = useState(props.subject);
        const [device, setDevice] = useState(props.device);
        const [linkImage, setLinkImage] = useState([]);
        const [linkOpen, setLinkOpen] = useState(false);
        const [submit, setSubmit] = useState(false);

        //Quill
        const QuillRef = useRef();
        
        const imageHandler = () => {
            const input = document.createElement("input");
            const reader = new FileReader();
        
            input.setAttribute("type", "file");
            input.setAttribute("accept", "image/jpg, image/png");
            input.click();
        
            input.onchange = () => {
                const file = input.files;
                reader.readAsDataURL(file[0]);
                reader.onload =  () => {
                    const range = QuillRef.current?.getEditor().getSelection()?.index;
                    if (range !== null && range !== undefined) {
                        let quill = QuillRef.current?.getEditor();
                        quill?.setSelection(range, 1);
                        quill?.clipboard.dangerouslyPasteHTML(
                        range,
                        `<img src=${reader.result} alt="insert-image" />`
                        );
                    }
                }
            };
        };
    
        const linkImageInput = () => {
            const range = QuillRef.current.getEditor().getSelection();
            try {
                let quill = QuillRef.current?.getEditor();
                quill?.setSelection(range, 1);
                quill?.clipboard.dangerouslyPasteHTML(
                range,
                '<img src="'+linkImage+'" alt="insert-image" />'
                )
                setLinkOpen(false);
                setLinkImage([]);
            } catch(e) {console.error(e.message)}
        }
    
        const imageLinkHandler = () => {
            const Btn = document.createElement('button');
            Btn.click(setLinkOpen(true));
            console.log(linkImage);
        }
        
        const modules = useMemo(
            () => ({
                toolbar: {
                    container: [
                        ["bold", "italic", "underline", "strike", "blockquote"],
                        [{ size: ["small", false, "large", "huge"] }, { color: [] }, { background: []}],
                        [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                        { align: [] },
                        ],
                        ["link","image",],
                        ["imageLink"]
                    ],
                    handlers: {
                        image: imageHandler,
                        imageLink : imageLinkHandler
                    },
                },
                ImageResize: {
                    modules: [ 'Resize' ]
                }
            }),[]);
    
        const onChangeQuill = () => {
            QuillRef.current && setContents(QuillRef.current.state.value);
        }
      
        const getFaqBigCategoryList = async () => {
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "getFaqBigCategoryList",
                    "service": props.service
                },
                { withCredentials: true }
            )
           .then((response) =>{
           if(response.data.success === true){setBigCateList(response.data)}})
            } catch(e) { console.error(e.message) }
          };
        
          const getFaqCategoryListForSmallList = async () => {
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "getFaqCategoryList",
                    "service": props.service
                    // "category_id": category2
                },
                { withCredentials: true }
            )
           .then((response) =>{
           if(response.data.success === true){setSmallCate(response.data)}})
            } catch(e) { console.error(e.message) }
          };
    
          const changeFaqInfoJson = async () => {
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "changeFaqInfoJson",
                    "service": props.service,
                    "subject": subject,
                    "answer": contents,
                    "category": cateSmall,
                    "device": device,
                    "f_no": props.f_no
                },
                { withCredentials: true }
            )
           .then(alert('FAQ가 정상적으로 수정되었습니다.'))
            } catch(e) { console.error(e.message); alert('등록에 실패했습니다.'); }
            setOpen(false);
          };
    
          const removeFaqInfoJson = async () => {
            try{
            const response = await axios.post
            (
                CRMAPI,
                {
                    "task": "removeFaqInfoJson",
                    "f_no": props.f_no,
                    "service": props.service
                },
                { withCredentials: true }
            )
           .then(alert('FAQ가 정상적으로 삭제되었습니다.'))
            } catch(e) { console.error(e.message); alert('삭제에 실패했습니다.'); }
            setOpen(false);
            serReset(new Date());
          };
    
        useEffect(()=>{
            getFaqBigCategoryList();
            getFaqCategoryListForSmallList();
        },[])
    
      return (
          <>
            <div className="border rounded p-1 mb-3">
                <Grid container className="d-flex flex-row align-items-center border-bottom">
                    <Grid item xs={1} className="px-3 text_m">분류</Grid>
                    <Grid item xs={4}className="me-3">
                        <Form.Select className="my-1 border-primary" size="sm" value={category2} onChange={(e)=>setCategory2(e.target.value)}>
                            <option value=''>대분류명 선택</option>
                            {bigCateList.result && bigCateList.result.map(Lists=>(
                                <option value={Lists.category_id}>{Lists.category_name}</option>
                            ))}
                        </Form.Select>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Select className="my-1 border-primary" size="sm" value={cateSmall} onChange={(e)=>setCateSamll(e.target.value)}>
                            <option value=''>소분류명 선택</option>
                            {smallCate.result && smallCate.result.map(Lists=>(
                                <>
                                    {Lists.category_id.includes(category2) && <option value={Lists.category_id}>{Lists.category_name}</option>}
                                </>
                            ))}
                        </Form.Select>
                    </Grid>
                </Grid>
                <Grid container className="d-flex flex-row align-items-center py-2 border-bottom">
                    <Grid item xs={1}><div className="text-nowrap px-3 text_m">제목</div></Grid>
                    <Grid item xs={8}>
                        <Form.Control value={subject} onChange={(e)=>setSubject(e.target.value)} size="sm"></Form.Control>
                    </Grid>                            
                </Grid>
                <Grid container className="d-flex flex-row align-items-center">
                    <Grid item xs={1}><div className="text-nowrap px-3 text_m">공개</div></Grid>
                    <Grid item xs={8}>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={device}
                            onChange={(e)=>setDevice(e.target.value)}
                        >
                            <FormControlLabel value="all" control={<Radio size="small"/>} label="모두" />
                            <FormControlLabel value="iphone" control={<Radio size="small"/>} label="아이폰" />
                            <FormControlLabel value="android" control={<Radio size="small"/>} label="안드로이드" />
                        </RadioGroup>
                    </Grid>                            
                </Grid>
            </div>
            <ReactQuill
                ref={(element) => {
                if (element !== null) {
                    QuillRef.current = element;
                }
                }}
                value={contents}
                onBlur={onChangeQuill}
                modules={modules}
                theme="snow"
                placeholder="내용을 입력해주세요."
            />
            <Dialog open={linkOpen} onClose={()=>setLinkOpen(false)}>
                <div className="p-4">
                    <div className="mb-2 text_m">이미지 링크</div>
                    <div className="d-flex flex-row align-items-center gap-2">
                        <TextField label="URL" placeholder="URL을 입력해주세요" size="small" value={linkImage} onChange={(e)=>setLinkImage(e.target.value)}></TextField>
                        <Button variant="contained" onClick={linkImageInput}>확인</Button>
                    </div>
                </div>
            </Dialog>
            <div className="mt-2 float-end">
                <Button variant="contained" className="me-2" onClick={()=>{QuillRef.current.blur(); setSubmit(true)}} color="secondary" disabled={submit === true ? true : false}>수정완료</Button>
                <Button variant="contained" onClick={changeFaqInfoJson} disabled={submit === true ? false : true}>수정하기</Button>
                <Button variant="contained" className='ms-2' color="error" onClick={removeFaqInfoJson}>삭제하기</Button>
            </div>
          </>
      )
    }

    return(
        <div className={`${FaqStyle.FaqListBox} border p-2 w-100 mt-2`} style={{background: '#fafafa'}}>
            <div className="bg-white border">
                <div className="px-2 py-2 text-center border-bottom text_l fw-bolder">
                    {props.service == 'godp' && <div>갓피플 FAQ</div>}
                    {props.service == 'mall' && <div>갓피플몰 FAQ</div>}
                    
                </div>
                <div className="w-100">
                    <Grid container className="p-2 text_sm text-center fw-bolder align-items-center">
                        <Grid item xs={9}>제목</Grid>
                        <Grid item xs={3}>
                            <span className="add_bar">등록일</span>
                            <span>조회수</span>
                        </Grid>
                    </Grid>
                </div>
            </div>
                {
                    showFaq.result && showFaq.result.faq_list !== null &&
                    showFaq.result.faq_list.map(Lists=>{
                        
                        return(
                            <div className="border-bottom border-start p-2 border-end bg-white" key={Lists.f_no}>
                                <div style={{cursor:'pointer'}} onClick={()=>setOpen(Lists.f_no)} className="p-2">
                                    <Grid container>
                                        <Grid item xs={9}>
                                            <div className="text_m pe-2">{Lists.question}</div>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <span className="text_sm text-nowrap">
                                                <span className="add_bar">{Lists.rdate.substr(0,10)}</span>
                                                <span className="ms-2">{Lists.hits}</span>
                                            </span>
                                        </Grid>
                                    </Grid>
                                </div>
                                <Dialog open={open == Lists.f_no ? true : false} onClose={()=>{setOpen(false)}} fullWidth={true} maxWidth="md">
                                    <div className="p-4">
                                        <div className="d-flex flex-row align-items-center justify-content-between pb-3">
                                            <div className="ms-2">수정/삭제하기<span className="text_s text-secondary">&nbsp;(글 수정후, 수정완료&nbsp;&gt;&nbsp;수정하기를 해주셔야 수정이 완료됩니다.)</span></div>
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpen(false);}}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </div>
                                        <div className="text-editor w-100">
                                            <Qill content={Lists.answer} f_no={Lists.f_no} subject={Lists.subject} category={Lists.category} device={Lists.device} service={props.service}></Qill>
                                        </div>
                                    </div>
                                </Dialog>
                            </div>
                        )
                    })
                    || <div className="mt-2 p-2">목록이 없습니다.</div>
                }
        </div>
    )
}


export default FaqList;