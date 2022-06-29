import React,{ useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { CRMAPI } from '../../../items/URL';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Dialog from '@mui/material/Dialog';
import { blue, red, orange } from '@mui/material/colors';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import CloseIcon from '@mui/icons-material/Close';

// ModifyBible 은 components/Info/InfoBasic.js 에 있는 버튼입니다.

function ModifyBox(props) {
  const { onClose, selectedValue, open } = props;
  
  const [modiOpen, setModiOpen] = useState(false);
  const handleListItemClick = (value) => {onClose(value)}
  const [infoBible, setInfoBible] = useState([]);
  const [payBible, setPayBible] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reload, setReload] = useState([]);
  

  const Books = [];
  const BooksMini = [];

  const Audios = [];
  const AudiosMini = [];

  // 성경설치목록
  const getBibleStoreInstalledList = async () => {
      setLoading(true);
      try{
      const response = await axios.post
      (
          CRMAPI,
          {
              "task": "getBibleStoreInstalledList",
              "user_n": props.user_n,
              "user_id": props.user_id
          },
          { withCredentials: true }
      )
     .then((response) => setInfoBible(response.data))
      } catch(e) { console.error(e.message) }
      setLoading(false);
    };

    const AbleList = () =>
    {
        if(infoBible.result){
            if( infoBible.result.able_list == null ){
                return null;
            } else {
                infoBible.result.able_list.map((bible) => {
                    {bible.kind === 'bible' && Books.push(
                        <>
                        <div className="d-flex flex-row align-items-center justify-content-between text-nowrap" onClick={() => handleListItemClick(bible)} key={bible.code}>
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                                    <MenuBookOutlinedIcon></MenuBookOutlinedIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <span className="text-nowrap">{bible.title}</span>
                            <Button variant="outlined" className="py-1 px-2 ms-2" onClick={() => createBibleStoreInstalledJson(bible.code, bible.title)}>추가</Button>
                        </div>
                        </>
                    )}
                    {bible.kind === 'audio' && Audios.push(
                        <div className="d-flex flex-row align-items-center justify-content-between text-nowrap" onClick={() => handleListItemClick(bible)} key={bible.code}>
                            <ListItemAvatar>
                            <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
                                <HeadphonesOutlinedIcon></HeadphonesOutlinedIcon>
                            </Avatar>
                            </ListItemAvatar>
                            <span className="text-nowrap">{bible.title}</span>
                            <Button variant="outlined" className="py-1 px-2 ms-2" onClick={() => createBibleStoreInstalledJson(bible.code, bible.title)}>추가</Button>
                        </div>
                    )}
                })
            }
        }
    }

    const AbleListMini = () =>
    {
        if(infoBible.result){
            if( infoBible.result.able_list == null ){
                return null;
            } else {
                infoBible.result.able_list.map((bible) => {
                    {bible.kind === 'bible' && BooksMini.push(
                        <>
                        <div className="d-flex flex-row align-items-center gap-2" onClick={() => handleListItemClick(bible)} key={bible.code}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: red[100], color: red[600] }}>
                                <MenuBookOutlinedIcon style={{ fontSize: '17px' }}></MenuBookOutlinedIcon>
                            </Avatar>
                            <span className="text_sm">{bible.title}</span>
                        </div>
                        </>
                    )}
                    {bible.kind === 'audio' && AudiosMini.push(
                        <div className="d-flex flex-row align-items-center gap-2" onClick={() => handleListItemClick(bible)} key={bible.code}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: red[100], color: red[600] }}>
                                <HeadphonesOutlinedIcon style={{ fontSize: '17px' }}></HeadphonesOutlinedIcon>
                            </Avatar>
                            <span className="text_sm">{bible.title}</span>
                        </div>
                    )}
                })
            }
        }
    }

    const NoAbleList = () => 
        {
            if(infoBible.result){
                if( infoBible.result.no_able_list == null ){
                    return null;
                } else {
                    infoBible.result.no_able_list.map((media) => 
                    {
                        {media.kind === 'bible' && Books.push(
                            <div className="d-flex flex-row align-items-center justify-content-between text-nowrap" onClick={() => handleListItemClick(media)} key={media.code}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <MenuBookOutlinedIcon></MenuBookOutlinedIcon>
                                    </Avatar>
                                </ListItemAvatar>
                                <span className="text-nowrap">{media.title}</span>
                                <Button variant="outlined" className="p-1 ms-2" color="error" onClick={() => removeBibleStoreInstalledJson(media.code, media.title)}>삭제</Button>
                            </div>
                        )}
                        {media.kind === 'audio' && Audios.push(
                            <div className="d-flex flex-row align-items-center justify-content-between text-nowrap" onClick={() => handleListItemClick(media)} key={media.code}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                        <HeadphonesOutlinedIcon></HeadphonesOutlinedIcon>
                                    </Avatar>
                                </ListItemAvatar>
                                <span className="text-nowrap">{media.title}</span>
                                <Button variant="outlined" className="p-1 ms-2" color="error" onClick={() => removeBibleStoreInstalledJson(media.code, media.title)}>삭제</Button>
                            </div>
                        )}
                    })
                }
            }        
        }
        
    const NoAbleListMini = () => 
    {
        if(infoBible.result){
            if( infoBible.result.no_able_list == null ){
                return null;
            } else {
                infoBible.result.no_able_list.map((media) => 
                {
                    {media.kind === 'bible' && BooksMini.push(
                        <div className="d-flex flex-row align-items-center gap-2" onClick={() => handleListItemClick(media)} key={media.code}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: blue[100], color: blue[600] }}>
                                <MenuBookOutlinedIcon style={{ fontSize: '17px' }}></MenuBookOutlinedIcon>
                            </Avatar>
                            <span className="text_sm">{media.title}</span>
                        </div>
                    )}
                    {media.kind === 'audio' && AudiosMini.push(
                        <div className="d-flex flex-row align-items-center gap-2" onClick={() => handleListItemClick(media)} key={media.code}>
                            <Avatar sx={{ width: 24, height: 24, bgcolor: blue[100], color: blue[600] }}>
                                <HeadphonesOutlinedIcon style={{ fontSize: '17px' }}></HeadphonesOutlinedIcon>
                            </Avatar>
                            <span className="text_sm">{media.title}</span>
                        </div>
                    )}
                })
            }
        }        
    }
    
    // 성경설치목록추가
    const createBibleStoreInstalledJson = (code, bibleName) => {
        setLoading(true);
        setReload(new Date());
        try{
        const response = axios.post
        (
            CRMAPI,
            {
                "task": "createBibleStoreInstalledJson",
                "user_n": props.user_n,
                "user_id": props.user_id,
                "code": code,
                "name": bibleName
            },
            { withCredentials: true }
        );
        alert("'"+bibleName+"'"+"이 추가되었습니다.");
        } catch(e) { console.error(e.message); alert('ERROR 추가를 실패했습니다.'); }
        setLoading(false);
        };

    // 성경설치목록삭제
    const removeBibleStoreInstalledJson = (code, bibleName) => {
        setLoading(true);
        setReload(new Date());
        try{
        const response = axios.post
        (
            CRMAPI,
            {
                "task": "removeBibleStoreInstalledJson",
                "user_n": props.user_n,
                "user_id": props.user_id,
                "code": code
            },
            { withCredentials: true }
        );
        alert("'"+bibleName+"'"+"이 삭제되었습니다.");
        } catch(e) { console.error(e.message); alert('ERROR 삭제를 실패했습니다.'); }
        setLoading(false);
        };
  

    
    // 성경구매목록
    const getBibleStorePurchasedList = async () => {
        setLoading(true);
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getBibleStorePurchasedList",
                "user_n": props.user_n,
                "user_id": props.user_id
            },
            { withCredentials: true }
        )
       .then((response) => setPayBible(response.data))
        } catch(e) { console.error(e.message) }
        setLoading(false);
      };

    // 성경구매내역 취소
    const removeBibleStorePurchasedJson = async (bcu_idx, code, name) => {
        setLoading(true);
        setReload(new Date());
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "removeBibleStorePurchasedJson",
                "user_n": props.user_n,
                "user_id": props.user_id,
                "bcu_idx": bcu_idx,
                "code": code
            },
            { withCredentials: true }
        );
        alert("'"+name+"'"+"이 취소되었습니다.");
        } catch(e) { console.error(e.message) }
        setLoading(false);
    };


    useEffect(()=>{
        getBibleStoreInstalledList();
        getBibleStorePurchasedList();
    },[reload, props]);

    AbleList();
    NoAbleList();
    AbleListMini();
    NoAbleListMini();

    function ModifyBibleMini() {
        return(
            <>
            {
            infoBible &&
            infoBible.result ?
            <div className="d-flex flex-column">
                <div className="d-flex flex-row justify-content-between mb-2"> 
                    <div className="d-flex flex-row">           
                        <div className="px-1 border rounded text-primary border-primary text_m">이용중</div>
                        <div className="ms-1 text_m">성경어플</div>
                    </div>
                    <Button variant="contained" className="px-2 py-0" onClick={() => setModiOpen(true)}>
                        설치/구매목록
                    </Button>
                </div>
                <Grid container>
                        <Grid item xs={6} className="d-flex flex-column pe-3 border-end">
                            {BooksMini}
                        </Grid>
                        <Grid item xs={6} className="d-flex flex-column ps-3">
                            {AudiosMini}
                        </Grid>
                    </Grid>
            </div>
            : 
            <div className="d-flex flex-column">
                <div className="d-flex flex-row">            
                    <div className="px-1 border rounded text-danger border-danger text_m">미이용중</div>
                    <div className="ms-1 text_m">성경어플</div>
                </div>
            </div>
            }
            </>
        )
    }

    return (
        <>
        <ModifyBibleMini></ModifyBibleMini>
        <Dialog open={modiOpen} onClose={()=>setModiOpen(false)} fullWidth={true} maxWidth="md">
            <div className="p-2 d-flex justify-content-end">
            </div>
            <Grid container className="p-4 text_m">
                <Grid item xs={7}>
                    <div className="fs-5 mb-4">갓피플성경 <strong>설치목록</strong></div>
                    <Grid container>
                        <Grid item xs={6} className="d-flex flex-column pe-3 gap-3 border-end">
                            {Books}
                        </Grid>
                        <Grid item xs={6} className="d-flex flex-column ps-3 gap-3">
                            {Audios}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1} className="d-flex justify-content-center"><div className="border-end"></div></Grid>
                <Grid item xs={4}>
                    <div className="fs-5 mb-4 d-flex flex-row justify-content-between">
                        <div>갓피플성경&nbsp;<strong>구매목록</strong></div>            
                        <CloseIcon className="border border-secondary rounded" type="button" onClick={() => setModiOpen(false)}></CloseIcon>
                    </div>
                    <div className="d-flex flex-column gap-3 w-75">
                        {
                            payBible.result && payBible.result.length !== undefined &&
                            payBible.result.map(Lists=> {
                                return(
                                    <>
                                    {
                                        Lists.kind === 'bible' &&
                                        <div className="d-flex flex-row align-items-center justify-content-between text-nowrap" key={Lists.code}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                                                    <MenuBookOutlinedIcon></MenuBookOutlinedIcon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <span className="text-nowrap">{Lists.title}</span>
                                            {Lists.canceled === 0 && <Button variant="outlined" className="p-1 ms-2" color="error" onClick={()=> removeBibleStorePurchasedJson(Lists.bcu_idx, Lists.code, Lists.title)}>취소하기</Button>}
                                            {Lists.canceled === 1 && 
                                                <div className="d-flex flex-column text-nowrap text-center text-danger border rounded border-danger ms-3 px-1 text_s">
                                                    <div>취소완료</div>
                                                    <div>{Lists.cancel_date}</div>
                                                </div>} 
                                        </div>
                                    }
                                    {
                                        Lists.kind === 'audio' &&
                                        <div className="d-flex flex-row align-items-center justify-content-between text-nowrap" key={Lists.code}>
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: orange[100], color: orange[600] }}>
                                                    <HeadphonesOutlinedIcon></HeadphonesOutlinedIcon>
                                                </Avatar>
                                            </ListItemAvatar>
                                            <span className="text-nowrap">{Lists.title}</span>
                                            {Lists.canceled === 0 && <Button variant="outlined" className="p-1 ms-2" color="error" onClick={()=> removeBibleStorePurchasedJson(Lists.bcu_idx, Lists.code, Lists.title)}>취소하기</Button>}
                                            {Lists.canceled === 1 && 
                                                <div className="d-flex flex-column text-nowrap text-center text-danger border rounded border-danger ms-3 px-1 text_s">
                                                    <div>취소완료</div>
                                                    <div>{Lists.cancel_date}</div>
                                                </div>} 
                                        </div>
                                    }
                                    </>
                                )
                            })
                            || <div>내역없음</div>
                        }
                    </div>
                </Grid>
            </Grid>
        </Dialog>
        </>
    );
}

ModifyBox.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};



function ModifyBible(props) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {setOpen(true)}
  const handleClose = () => {setOpen(false)}

  return (
    <div>

      <ModifyBox
        user_n={props.user_n}
        user_id={props.user_id}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}

export default ModifyBible;