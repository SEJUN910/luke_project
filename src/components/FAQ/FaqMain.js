import React,{ useState, useCallback, useEffect, useRef, useMemo } from 'react';
import axios from 'axios';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from '@looop/quill-image-resize-module-react';
import { CRMAPI } from '../../items/URL';
import FaqList from './FaqList';
import FaqRecent from './FaqRecent';
import FaqStyle from '../../style/css/FaqStyle.module.css';
import {Form} from 'react-bootstrap';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import {List, ListItemButton, Dialog, Paper, Grid ,Button, ButtonGroup,IconButton, TextField, CircularProgress} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
Quill.register('modules/ImageResize', ImageResize);

function FaqMain() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openFaqCreate, setOpenFaqCreate] = useState(false);
    const [faqList, setFaqList] = useState([]);
    const [service, setService] = useState('godp');
    const [category_id, setCategory_id] = useState('A');
    const [page, setPage] = useState(0);
    const [openCate, setOpenCate] = useState(false);
    const [openBig, setOpenBig] = useState(false);
    const [sortCate, setSortCate] = useState([]);
    const [category_name, setCategory_name] = useState([]);
    const [big_category_id, setBig_category_id] = useState([]);
    const [bigCateList, setBigCateList] = useState([]);
    const [smallCate, setSmallCate] = useState([]);
    const [modiBigCate, setModiBigCate] = useState([]);
    const [modiCateOpen, setModiCateOpen] = useState(false);
    const [modiCateId, setModiCateId] = useState([]);
    const [modiCateName, setModiCateName] = useState([]);
    const [count, setCount] = useState([]);
    const [bigCateList2, setBigCateList2] = useState([]);
    const [smallCate2, setSmallCate2] = useState([]);

    const limit = 20;


    const getFaqCategoryList = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getFaqCategoryList",
                "service": service
            },
            { withCredentials: true }
        )
       .then((response) =>{
       if(response.data.success === true){setFaqList(response.data)}})
        } catch(e) { console.error(e.message) }
        setLoading(false);
      };

    // List for Quill 카테고리
    const getFaqBigCategoryList2 = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getFaqBigCategoryList",
                "service": service
            },
            { withCredentials: true }
        )
        .then((response) =>{
        if(response.data.success === true){setBigCateList2(response.data)}})
        } catch(e) { console.error(e.message) }
    };

    const getFaqCategoryListForSmallList2 = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getFaqCategoryList",
                "service": service
                // "category_id": category2
            },
            { withCredentials: true }
        )
        .then((response) =>{
        if(response.data.success === true){setSmallCate2(response.data)}})
        } catch(e) { console.error(e.message) }
    };

    useEffect(()=>{
        getFaqCategoryList();
    },[service,count])

    useEffect(()=>{
        getFaqBigCategoryList2();
        getFaqCategoryListForSmallList2();
    },[service, count])
    
    function Qill(props) {
        const [contents, setContents] = useState([]);
        const [category2, setCategory2] = useState([]);
        const [cateSmall, setCateSamll] = useState([]);
        const [subject, setSubject] = useState([]);
        const [device, setDevice] = useState('all');
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
        };
        
        const changeSubject = (e) => {
            setSubject(e.target.value);
        }
        
        const createFaqInfoJson = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "createFaqInfoJson",
                "service": props.service,
                "subject": subject,
                "answer": contents,
                "category": cateSmall,
                "device": device
            },
            { withCredentials: true }
        )    
        .then(res => res.data.success === true && alert('FAQ가 정상적으로 등록되었습니다.'))
        } catch(e) { console.error(e.message); alert('등록에 실패했습니다.'); }
            setSubject([]);
            setContents([]);
            setCateSamll([]);
            setDevice('all');
            setOpenBig(false);
        };
    
      return (
          <>
            {service === 'godp' && 
                <div className="d-flex flex-row align-items-center justify-content-between pb-3">
                    <div className="ms-2">갓피플 FAQ등록하기</div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenBig(false); setSortCate([]);}}>
                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>}
            {service === 'mall' &&
                <div className="d-flex flex-row align-items-center justify-content-between pb-3">
                    <div className="ms-2">갓피플몰 FAQ등록하기</div>
                    <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenBig(false); setSortCate([]);}}>
                        <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </IconButton>
                </div>}
            <div className="border rounded p-1 mb-3">
                <Grid container className="d-flex flex-row align-items-center border-bottom">
                    <Grid item xs={1} className="px-3 text_m">분류</Grid>
                    <Grid item xs={4}className="me-3">
                        <Form.Select className="my-1 border-primary" size="sm" value={category2} onChange={(e)=>setCategory2(e.target.value)}>
                            <option value=''>대분류명 선택</option>
                            {bigCateList2 && bigCateList2.result && bigCateList2.result.map(Lists=>(
                                <option value={Lists.category_id}>{Lists.category_name}</option>
                            ))}
                        </Form.Select>
                    </Grid>
                    <Grid item xs={4}>
                        <Form.Select className="my-1 border-primary" size="sm" value={cateSmall} onChange={(e)=>setCateSamll(e.target.value)}>
                            <option value='' style={{display:'none'}}>소분류명 선택</option>
                            {smallCate2 && smallCate2.result && smallCate2.result.map(Lists=>(
                                <>
                                    {Lists.category_id.includes(category2) && Lists.category_id.length === 2 && <option value={Lists.category_id}>{Lists.category_name}</option>}
                                </>
                            ))}
                        </Form.Select>
                    </Grid>
                </Grid>
                <Grid container className="d-flex flex-row align-items-center py-2 border-bottom">
                    <Grid item xs={1}><div className="text-nowrap px-3 text_m">제목</div></Grid>
                    <Grid item xs={8}>
                        <Form.Control type="text" value={subject} onChange={changeSubject} size="sm"></Form.Control>
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
                        <TextField label="URL" placeholder="URL을 입력해주세요" size="small" value={linkImage} onChange={(e)=>setLinkImage(e.target.value)} style={{width:'500px'}}></TextField>
                        <Button variant="contained" onClick={linkImageInput}>확인</Button>
                    </div>
                </div>
            </Dialog>
            <div className="float-end">
                <Button variant="contained" className="mt-2 me-2" onClick={()=>{QuillRef.current.blur(); setSubmit(true)}} color="secondary" disabled={submit === true ? true : false}>작성완료</Button>
                <Button variant="contained" className="mt-2" onClick={createFaqInfoJson} disabled={submit === true ? false : true}>등록하기</Button>
            </div>
          </>      
      )
    }

    function FaqMini() {
        return(
            <>   
            <Grid>
                <Paper elevation={9} className="p-3 miniBox sortManager">
                    <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div className="fw-bolder">FAQ</div>
                        <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(true)}>
                            <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon>
                        </IconButton>
                    </div>
                    <div className="text-center p-4">
                        <IconButton variant="outlined" size="large" onClick={()=>setOpen(true)}>
                            <QuizOutlinedIcon sx={{fontSize: '70px'}}></QuizOutlinedIcon>
                        </IconButton>
                    </div>
                </Paper>
            </Grid>
            </>
        )
    }

    function FaqCategoryList() {
        const [ page, setPage ] = useState(0);
       return(
           <Paper elevation={4} className="mt-2">
               <ButtonGroup className="w-100">
                    {service == 'godp' &&
                    <>
                    <Button className="w-50" variant="contained" size="small" onClick={()=>setService('godp')}>갓피플</Button>
                    <Button className="w-50" variant="outlined" size="small"onClick={()=>setService('mall')}>갓피플몰</Button>
                    </>}
                    {service == 'mall' &&
                    <>
                    <Button className="w-50" variant="outlined" size="small" onClick={()=>setService('godp')}>갓피플</Button>
                    <Button className="w-50" variant="contained" size="small"onClick={()=>setService('mall')}>갓피플몰</Button>
                    </>}
               </ButtonGroup>
               {
               faqList.result &&
               service === 'godp'&&
                <List>
                    { 
                    faqList.result.map(Lists =>{
                        return(
                            <>
                            {Lists.category_id.length == 1 && <ListItemButton key={Lists.category_id} selected={category_id == Lists.category_id} className="ps-1 py-0" onClick={()=>setCategory_id(Lists.category_id)}><ArrowRightIcon></ArrowRightIcon><span className="text_m fw-bolder">{Lists.category_name}</span></ListItemButton>}
                            {Lists.category_id.length > 1 && <ListItemButton key={Lists.category_id} selected={category_id == Lists.category_id} className="ps-3 py-1" onClick={()=>setCategory_id(Lists.category_id)}><span className="text_sm">- {Lists.category_name}</span></ListItemButton>}
                            </>
                        )
                    })}
                </List >
                }
                {service === 'mall' &&
                <List>
                    { 
                    faqList.result.map(Lists =>{
                        return(
                            <div key={Lists.category_id}>
                                {Lists.category_id.length == 1 && <ListItemButton key={Lists.category_id} selected={category_id == Lists.category_id} className="ps-1 py-1" onClick={()=>setCategory_id(Lists.category_id)}><ArrowRightIcon></ArrowRightIcon><span className="text_m fw-bolder">{Lists.category_name}</span></ListItemButton>}
                                {Lists.category_id.length > 1 && <ListItemButton key={Lists.category_id} selected={category_id == Lists.category_id} className="ps-3 py-1" onClick={()=>setCategory_id(Lists.category_id)}><span className="text_sm">- {Lists.category_name}</span></ListItemButton>}
                            </div>
                        )
                    })}
                </List>
                }
           </Paper>
       )
   }      
        
       const getFaqBigCategoryList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getFaqBigCategoryList",
                "service": service
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
                "service": service
                // "category_id": category2
            },
            { withCredentials: true }
        )
       .then((response) =>{
       if(response.data.success === true){setSmallCate(response.data)}})
        } catch(e) { console.error(e.message) }
      };

      useEffect(()=>{
        getFaqBigCategoryList();
        getFaqCategoryListForSmallList();
      },[service, count])

       const createFaqBigCategoryJson = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "createFaqBigCategoryJson",
                "service": service,
                "category_name": category_name
            },
            { withCredentials: true }
        )
       .then(res => res.data.success === true && alert('대분류가 정상적으로 등록되었습니다.'))
        } catch(e) { console.error(e.message); alert('등록에 실패했습니다.'); }
        setOpenBig(false);
        setCategory_name([]);
        setCount(new Date());
      };

      const createFaqSmallCategoryJson = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "createFaqSmallCategoryJson",
                "service": service,
                "category_name": category_name,
                "category_id": big_category_id,
                "is_hide": 0
            },
            { withCredentials: true }
        )
       .then(res => res.data.success === true && alert('중분류가 정상적으로 등록되었습니다.'))
        } catch(e) { console.error(e.message); alert('등록에 실패했습니다.'); }
        setOpenBig(false);
        setCategory_name([]);
        setCount(new Date());
      };

      const showModiSmall = (id) => {
          setModiBigCate(id);
      }
    
      const changeFaqCategoryJson = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "changeFaqCategoryJson",
                "service": service,
                "category_id" : modiCateId,
                "category_name": modiCateName
            },
            { withCredentials: true }
        )
       .then(res => res.data.success === true && alert('카테고리가 수정되었습니다.'))
        } catch(e) { console.error(e.message); alert('등록에 실패했습니다.'); }
        setModiCateId([]);
        setModiCateName([]);
        setCount(new Date());
        setModiCateOpen(false);
      };

      const removeFaqCategoryJson = async (id, name) => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "removeFaqCategoryJson",
                "service": service,
                "category_id": modiCateId
            },
            { withCredentials: true }
        )
       .then(res => res.data.success === true && alert('카테고리가 삭제되었습니다.'))
        } catch(e) { console.error(e.message); alert('등록에 실패했습니다.'); }
        setModiCateId([]);
        setModiCateName([]);
        setCount(new Date());
        setModiCateOpen(false);
      };

      const openModiDialog = (id, name) => {
        setModiCateOpen(true);
        setModiCateId(id);
        setModiCateName(name);
      }
	return(
        <>
        <FaqMini></FaqMini>
        <Dialog open={open} onClose={()=>setOpen(false)} fullWidth={true} maxWidth="xl">
            <Grid item xs={12}>
                <Paper elevation={3} className={`${FaqStyle.FaqBoxSet} p-3`}>
                    <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div>FAQ</div>
                        <div>
                            <Button variant="outlined" className="me-3" onClick={()=>setOpenCate(true)}>카테고리 관리</Button>
                            <Dialog open={openCate} onClose={()=> setOpenCate(false)}>
                                <div className="px-5 py-4 d-flex flex-column gap-3">
                                    <div className="d-flex flex-row align-items-center justify-content-between gap-3">
                                        {service === 'godp' && <div style={{fontSize: '1.3rem'}}>갓피플 카테고리</div>}
                                        {service === 'mall' && <div style={{fontSize: '1.3rem'}}>갓피플몰 카테고리</div>}
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=> setOpenCate(false)}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                    <Button variant="contained" size="large" onClick={()=> {setOpenCate(false); setOpenBig(true); setSortCate('big');}}>대분류 추가</Button>
                                    <Button variant="contained" size="large" color="warning" onClick={()=> {setOpenCate(false); setOpenBig(true); setSortCate('mid');}}>소분류 추가</Button>
                                    <Button variant="contained" size="large" color="secondary" onClick={()=> {setOpenCate(false); setOpenBig(true); setSortCate('modi');}}>카테고리 편집</Button>
                                    <Button variant="contained" size="large" color="success" onClick={()=> {setOpenCate(false); setOpenBig(true); setSortCate('add');}}>FAQ 등록</Button>
                                </div>
                            </Dialog>
                            <Dialog open={openBig} onClose={()=> {setOpenBig(false); setSortCate([]);}} fullWidth={true} maxWidth="md">
                                <div className="p-4">
                                    {sortCate === 'big' &&
                                    <>
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <div>FAQ&nbsp;
                                            <strong>
                                                {service === 'mall' && <>갓피플몰&nbsp;</>}
                                                {service === 'godp' && <>갓피플&nbsp;</>}
                                                대분류
                                            </strong> 등록하기</div>
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenBig(false); setSortCate([]);}}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                    <Form.Control placeholder="대분류명 입력" className="my-3" value={category_name} onChange={(e) => setCategory_name(e.target.value)}></Form.Control>
                                    <Button variant="contained" className="float-end" size="small" onClick={createFaqBigCategoryJson}>등록하기</Button>
                                    </>}
                                    {sortCate === 'mid' && bigCateList.result &&
                                    <>
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <div>FAQ <strong>소분류</strong> 등록하기</div>
                                        <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenBig(false); setSortCate([]);}}>
                                            <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                        </IconButton>
                                    </div>
                                    <Form.Select className="my-3 border-primary" value={big_category_id} onChange={(e)=>setBig_category_id(e.target.value)}>
                                        <option value=''>대분류명 선택</option>
                                        {bigCateList.result.map(Lists=>(
                                            <option value={Lists.category_id}>{Lists.category_name}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control placeholder="소분류명 입력" className="my-3" value={category_name} onChange={(e) => setCategory_name(e.target.value)}></Form.Control>
                                    <Button variant="contained" className="float-end" size="small" onClick={createFaqSmallCategoryJson}>등록하기</Button>
                                    </>}
                                    {sortCate === 'add' &&
                                    <Qill service={service}></Qill>
                                    }
                                    {sortCate === 'modi' &&
                                    <div>
                                        <div className="d-flex flex-row align-items-center justify-content-between border-bottom">
                                            <div className="pb-2">
                                                <div className="text-nowrap mx-2">
                                                    카테고리 편집
                                                    <span className="text_s text-secondary">&nbsp;(각 항목별 첫번째는 대분류입니다. 삭제시 유의해주세요.)</span>
                                                </div>
                                                <Form.Select className="my-1 w-50" value={service} onChange={(e)=>setService(e.target.value)}>
                                                    <option value="godp">갓피플</option>
                                                    <option value="mall">갓피플몰</option>
                                                </Form.Select>
                                            </div>
                                            <IconButton variant="outlined" size="small" className="border" onClick={()=> {setOpenBig(false); setSortCate([]);}}>
                                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                                            </IconButton>
                                        </div>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Grid container>
                                                    <Grid item xs={5}>
                                                        <List>
                                                        {
                                                            bigCateList.result && bigCateList.result.map(Lists => (
                                                                <ListItemButton className="d-flex flex-row justify-content-between p-2 border-bottom" onClick={()=>showModiSmall(Lists.category_id)}>
                                                                    <div className="text_m fw-bolder">{Lists.category_name}</div>
                                                                    <ArrowForwardIosIcon color="primary" style={{fontSize:'15px'}}></ArrowForwardIosIcon>
                                                                </ListItemButton>
                                                            ))
                                                        }
                                                        </List>
                                                    </Grid>
                                                    <Grid item xs={1}></Grid>
                                                    <Grid item xs={6}>
                                                        <List>
                                                        {
                                                            smallCate.result &&
                                                            smallCate.result.map(Lists =>
                                                                <>
                                                                {modiBigCate === Lists.category_id.substr(0,1) &&
                                                                <ListItemButton className="border-bottom" onClick={()=>openModiDialog(Lists.category_id, Lists.category_name)}>
                                                                    {Lists.category_name}
                                                                </ListItemButton>}
                                                                </>
                                                            )
                                                        }
                                                        </List>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={2}></Grid>
                                        </Grid>
                                        <Dialog open={modiCateOpen} onClose={()=>setModiCateOpen(false)}>
                                            <div className="p-4">
                                                <div className="px-2 pb-3 fw-bolder">카테고리 수정하기</div>
                                                <Form.Control value={modiCateName} onChange={(e)=>setModiCateName(e.target.value)}></Form.Control>
                                                <div className="d-flex flex-row gap-2 mt-3 justify-content-end">
                                                    <Button variant="contained" size="small" onClick={changeFaqCategoryJson}>수정하기</Button>
                                                    <Button variant="contained" size="small" color="error" onClick={removeFaqCategoryJson}>삭제하기</Button>
                                                </div>
                                            </div>
                                        </Dialog>
                                    </div>}
                                </div>
                            </Dialog>
                            <Dialog open={openFaqCreate} onClose={()=>setOpenFaqCreate(false)}>
                                <div className="p-4">
                                    등록하시겠습니까?
                                </div>
                            </Dialog>
                            <IconButton variant="outlined" size="small" className="border" onClick={()=>setOpen(false)}>
                                    <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                            </IconButton>
                        </div>
                    </div>
                    <Grid container spacing={1} className="d-flex flex-row">
                        <Grid item xs={2} className="text-nowrap">                    
                            <FaqCategoryList></FaqCategoryList>
                        </Grid>  
                        <Grid item xs={5}>
                            <FaqList service={service} category={category_id} page={page} limit={limit}></FaqList>
                        </Grid>
                        <Grid item xs={5}>
                            <FaqRecent service={service}></FaqRecent>
                        </Grid>
                    </Grid>        
                </Paper>
            </Grid>
        </Dialog>
        </>
    )
}

export default FaqMain;