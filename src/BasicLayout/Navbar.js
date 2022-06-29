import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../style/css/Layout.module.css';
import PersonIcon from '@mui/icons-material/Person';
import InboxIcon from '@mui/icons-material/Inbox';
import HelpIcon from '@mui/icons-material/Help';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DashboardIcon from '@mui/icons-material/Dashboard';

function NavList(){
    return (
        <nav className={`${Layout.navbar} vh80 border rounded`}>
            <div className="p-0 pt-2 d-flex flex-column gap-4">
                <div className={Layout.navlist}>
                    <PersonIcon></PersonIcon>
                    <Link to="/" className={Layout.navbtn}>회원정보</Link>
                </div>
                <div className={Layout.navlist}>
                    <PersonSearchIcon></PersonSearchIcon>
                    <Link to="/search" className={Layout.navbtn}>회원검색</Link>
                </div>
                <div className={Layout.navlist}>
                    <InboxIcon></InboxIcon>
                    <Link to="/crm" className={Layout.navbtn}>문의</Link>
                </div>
                <div className={Layout.navlist}>
                    <HelpIcon></HelpIcon>
                    <Link to="/faq" className={Layout.navbtn}>FAQ</Link>
                </div>
                <div className={Layout.navlist}>
                    <DashboardIcon></DashboardIcon>
                    <Link to="/dash" className={Layout.navbtn}>대쉬</Link>
                </div>
                <div className={Layout.navlist}>
                    <InsertChartIcon></InsertChartIcon>
                    <Link to="/stat" className={Layout.navbtn}>통계</Link>
                </div>
            </div>
        </nav>
    )
}

function NavBar() {
    return(
        <NavList></NavList>
    )
}

export default NavBar;