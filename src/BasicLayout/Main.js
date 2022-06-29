// UI LIST
import React, { useState, useEffect, useRef } from 'react';
import MainStyle from '../style/css/MainStyle.module.css';
import Grid from '@mui/material/Grid';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import {  DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {  GridContextProvider, GridDropZone, GridItem, swap, move } from "react-grid-dnd";
import { WidthProvider, Responsive } from "react-grid-layout";


// Component & Style
import SearchMain from '../components/Search/SearchMain';
import InfoMain from '../components/Info/InfoMain';
import FaqMain from '../components/FAQ/FaqMain';
import CallLiveMain from '../components/CallLive/CallLiveMain';
import DayOffList from '../components/Staff/DayOffList';
import MyHistoryList from '../components/Staff/MyHistoryList';
import CrmMain from '../components/CRM/CrmMain';
import ManagerList from '../components/Staff/ManagerLink';
import OrderError from '../components/Staff/OrderError';
import CSmodeMain from '../components/CSmode/CSmodeMain';
import AgentSms from '../components/Staff/AgentSms';
import StaffMessage from '../components/Staff/StaffMessage';
import BibleGift from '../components/BibleGift/BibleGiftMain';
import Chatbot from '../components/Staff/Chatbot';

function Main() {
    const [searchSwitch, setSearchSwitch] = useState(
        () => localStorage.getItem("searchSwitch") || true);
    const [infoSwitch, setInfoSwitch] = useState(
        () => localStorage.getItem("infoSwitch") || true);
    const [faqSwitch, setFaqSwitch] = useState(
        () => localStorage.getItem("faqSwitch") || true);
    const [callLineSwitch, setCallLineSwitch] = useState(
        () => localStorage.getItem("callLineSwitch") || true);
    const [dayOffSwitch, setDayOffSwitch] = useState(
        () => localStorage.getItem("dayOffSwitch") || true);
    const [myHistorySwtich, setMyHistorySwtich] = useState(
        () => localStorage.getItem("myHistorySwtich") || true);
    const [crmMainSwtich, setCrmMainSwtich] = useState(
        () => localStorage.getItem("crmMainSwtich") || true);
    const [managerListSwtich, setManagerListSwtich] = useState(
        () => localStorage.getItem("managerListSwtich") || true);
    const [orderErrorSwtich, setOrderErrorSwtich] = useState(
        () => localStorage.getItem("orderErrorSwtich") || true);
    const [csModeSwtich, setCsModeSwtich] = useState(
        () => localStorage.getItem("csModeSwtich") || true);
    const [agentSmsSwtich, setAgentSmsSwtich] = useState(
        () => localStorage.getItem("agentSmsSwtich") || true);
    const [staffMessageSwitch, setStaffMessageSwitch] = useState(
        () => localStorage.getItem("staffMessageSwitch") || true);
    const [bibleGiftSwtich, setBibleGiftSwtich] = useState(
        () => localStorage.getItem("bibleGiftSwtich") || true);
    const [chatbotSwtich, setChatbotSwtich] = useState(
        () => localStorage.getItem("chatbotSwtich") || true);

    let block = [];
    let changedBlock = [];

    const change = localStorage.getItem('changedBlock') ? JSON.parse(localStorage.getItem('changedBlock')) : block;

    const [setting, setSetting] = useState(null);
    const [blocks, setBlocks] = useState(block);
   

    if ( JSON.parse(callLineSwitch) === true )      {block.push({ id: 'callLineSwitch', tag: 'CallLiveMain'});  } 
    if ( JSON.parse(searchSwitch) === true )        {block.push({ id: 'searchSwitch', tag: 'SearchMain'});      }
    if ( JSON.parse(infoSwitch) === true )          {block.push({ id: 'infoSwitch', tag: 'InfoMain'});          } 
    if ( JSON.parse(crmMainSwtich) === true )       {block.push({ id: 'crmMainSwtich', tag: 'CrmMain'});        }
    if ( JSON.parse(csModeSwtich) === true )        {block.push({ id: 'csModeSwtich', tag: 'CSmodeMain'});      }
    if ( JSON.parse(staffMessageSwitch) === true )  {block.push({ id: 'staffMessageSwitch', tag: 'StaffMessage'});}
    if ( JSON.parse(myHistorySwtich) === true )     {block.push({ id: 'myHistorySwtich', tag: 'MyHistoryList'});}
    if ( JSON.parse(agentSmsSwtich) === true )      {block.push({ id: 'agentSmsSwtich', tag: 'AgentSms'});      }
    if ( JSON.parse(faqSwitch) === true )           {block.push({ id: 'faqSwitch', tag: 'FaqMain'});            } 
    if ( JSON.parse(managerListSwtich) === true )   {block.push({ id: 'managerListSwtich', tag: 'ManagerList'});}
    if ( JSON.parse(dayOffSwitch) === true )        {block.push({ id: 'dayOffSwitch', tag: 'DayOffList'});      }
    if ( JSON.parse(orderErrorSwtich) === true )    {block.push({ id: 'orderErrorSwtich', tag: 'OrderError'});  }
    if ( JSON.parse(bibleGiftSwtich) === true )    {block.push({ id: 'bibleGiftSwtich', tag: 'BibleGift'});  }
    if ( JSON.parse(chatbotSwtich) === true )    {block.push({ id: 'chatbotSwtich', tag: 'Chatbot'});  }

    const handleClick = (event) => {setSetting(event.currentTarget);}
    const handleClose = () => {
        setSetting(null);
        localStorage.setItem('changedBlock', JSON.stringify(block));
        setBlocks(block);
        alert('정렬순서는 초기화되었습니다. 다시 설정해주세요 :)')
    }

    const SearchSwitchClick = () => {setSearchSwitch(!searchSwitch)}
    const InfoSwitchClick = () => {setInfoSwitch(!infoSwitch)}
    const FaqSwitchClick = () => {setFaqSwitch(!faqSwitch)}
    const CallLiveSwitchClick = () => {setCallLineSwitch(!callLineSwitch)}
    const dayOffSwitchClick = () => {setDayOffSwitch(!dayOffSwitch)}
    const myHistorySwtichClick = () => {setMyHistorySwtich(!myHistorySwtich)}
    const crmMainSwtichClick = () => {setCrmMainSwtich(!crmMainSwtich)}
    const managerListSwtichClick = () => {setManagerListSwtich(!managerListSwtich)}
    const orderErrorSwtichClick = () => {setOrderErrorSwtich(!orderErrorSwtich)}
    const csModeSwtichClick = () => {setCsModeSwtich(!csModeSwtich);}
    const agentSmsSwtichClick = () => {setAgentSmsSwtich(!agentSmsSwtich);}
    const staffMessageSwitchClick = () => {setStaffMessageSwitch(!staffMessageSwitch);}
    const bibleGiftSwtichClick = () => {setBibleGiftSwtich(!bibleGiftSwtich);}
    const chatbotSwtichClick = () => {setChatbotSwtich(!chatbotSwtich);}
    const open = Boolean(setting);

    useEffect(() => {
        localStorage.setItem("searchSwitch", searchSwitch);
        localStorage.setItem("infoSwitch", infoSwitch);
        localStorage.setItem("faqSwitch", faqSwitch);
        localStorage.setItem("callLineSwitch", callLineSwitch);
        localStorage.setItem("dayOffSwitch", dayOffSwitch);
        localStorage.setItem("myHistorySwtich", myHistorySwtich);
        localStorage.setItem("crmMainSwtich", crmMainSwtich);
        localStorage.setItem("managerListSwtich", managerListSwtich);
        localStorage.setItem("orderErrorSwtich", orderErrorSwtich);
        localStorage.setItem("csModeSwtich", csModeSwtich);
        localStorage.setItem("agentSmsSwtich", agentSmsSwtich);
        localStorage.setItem("staffMessageSwitch", staffMessageSwitch);
        localStorage.setItem("bibleGiftSwtich", bibleGiftSwtich);
        localStorage.setItem("chatbotSwtich", chatbotSwtich);
    }, [searchSwitch, infoSwitch, faqSwitch, callLineSwitch,myHistorySwtich,crmMainSwtich,managerListSwtich,orderErrorSwtich,csModeSwtich,agentSmsSwtich,staffMessageSwitch, bibleGiftSwtich, chatbotSwtich]);
    

    function handleOnDragEnd(result) {
        if (!result.destination) return;
    
        const items = Array.from(blocks);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setBlocks(items);

        items.map(Lists => changedBlock.push({id: Lists.id, tag: Lists.tag}));
        localStorage.setItem('changedBlock', JSON.stringify(changedBlock));
      }

    return(
        <div className={MainStyle.main}>
            <IconButton onClick={handleClick} size="small" color="primary" className="border bg-white" style={{position: 'absolute', right:'20px'}}>
                <SettingsOutlinedIcon className={MainStyle.settingBtn}></SettingsOutlinedIcon>
            </IconButton>
            <Popover
                open={open}
                anchorEl={setting}
                onClose={handleClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <FormGroup className="p-3 mt-2">
                    <div className="border-top pt-1 ps-1 text_m text-secondary">CS관련</div>
                    <FormControlLabel control={<Switch />} label="실시간전화" onClick={CallLiveSwitchClick} checked={JSON.parse(callLineSwitch)}/>
                    <FormControlLabel control={<Switch />} label="회원검색"    onClick={SearchSwitchClick} checked={JSON.parse(searchSwitch)}/>
                    <FormControlLabel control={<Switch />} label="최근고객조회" onClick={InfoSwitchClick} checked={JSON.parse(infoSwitch)}/>
                    <FormControlLabel control={<Switch />} label="CRM" onClick={crmMainSwtichClick} checked={JSON.parse(crmMainSwtich)}/>
                    <FormControlLabel control={<Switch />} label="상담기록" onClick={csModeSwtichClick} checked={JSON.parse(csModeSwtich)}/>
                    <div className="border-top mt-1 pt-1 ps-1 text_m text-secondary">개인</div>
                    <FormControlLabel control={<Switch />} label="메세지" onClick={staffMessageSwitchClick} checked={JSON.parse(staffMessageSwitch)}/>
                    <FormControlLabel control={<Switch />} label="SMS/LMS" onClick={agentSmsSwtichClick} checked={JSON.parse(agentSmsSwtich)}/>
                    <FormControlLabel control={<Switch />} label="나의 히스토리" onClick={myHistorySwtichClick} checked={JSON.parse(myHistorySwtich)}/>
                    <div className="border-top mt-1 pt-1 ps-1 text_m text-secondary">모든직원</div>
                    <FormControlLabel control={<Switch />} label="FAQ" onClick={FaqSwitchClick} checked={JSON.parse(faqSwitch)}/>
                    <FormControlLabel control={<Switch />} label="매니저 목록" onClick={managerListSwtichClick} checked={JSON.parse(managerListSwtich)}/>
                    <FormControlLabel control={<Switch />} label="직원연차목록" onClick={dayOffSwitchClick} checked={JSON.parse(dayOffSwitch)}/>
                    <FormControlLabel control={<Switch />} label="주문결제오류" onClick={orderErrorSwtichClick} checked={JSON.parse(orderErrorSwtich)}/>
                    <FormControlLabel control={<Switch />} label="성경쿠폰" onClick={bibleGiftSwtichClick} checked={JSON.parse(bibleGiftSwtich)}/>
                    <FormControlLabel control={<Switch />} label="챗봇" onClick={chatbotSwtichClick} checked={JSON.parse(chatbotSwtich)}/>
                </FormGroup>
            </Popover>

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="swtiches" direction="horizontal">
                        {(provided, snapshot) => (
                        <div className="swtiches" {...provided.droppableProps} ref={provided.innerRef} style={{
                            background: snapshot.isDraggingOver ? 'lightblue' : 'white'
                        }}>
                            <Grid container spacing={6} className={MainStyle.mainBox}>
                            {change.length > 0 && change.map(({id, tag}, index) => {
                            return (
                                <Grid item
                                    xs={12}
                                    sm={tag === 'CallLiveMain' && 12 || 6}
                                    md={tag === 'CallLiveMain' && 6 || 3}
                                    key={id}>
                                    <Draggable draggableId={id} index={index}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {tag === 'SearchMain' && <SearchMain></SearchMain>}
                                            {tag === 'CrmMain' && <CrmMain></CrmMain>}
                                            {tag === 'InfoMain' && <InfoMain></InfoMain>}
                                            {tag === 'FaqMain' && <FaqMain></FaqMain>}
                                            {tag === 'CallLiveMain' && <CallLiveMain></CallLiveMain>}
                                            {tag === 'DayOffList' && <DayOffList></DayOffList>}
                                            {tag === 'MyHistoryList' && <MyHistoryList></MyHistoryList>}
                                            {tag === 'ManagerList' && <ManagerList></ManagerList>}
                                            {tag === 'OrderError' && <OrderError></OrderError>}
                                            {tag === 'CSmodeMain' && <CSmodeMain></CSmodeMain>}
                                            {tag === 'AgentSms' && <AgentSms></AgentSms>}
                                            {tag === 'StaffMessage' && <StaffMessage></StaffMessage>}
                                            {tag === 'BibleGift' && <BibleGift></BibleGift>}
                                            {tag === 'Chatbot' && <Chatbot></Chatbot>}
                                        </div>
                                    )}
                                    </Draggable>
                                </Grid>
                            );
                            })}
                            {provided.placeholder}
                            </Grid>
                        </div>
                        )}
                    </Droppable>
                </DragDropContext>
         
        </div>
    )
}

export default Main;