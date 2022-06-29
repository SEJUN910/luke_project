import React, { useState, useEffect } from "react";
import axios from 'axios';
import { CRMAPI } from '../../items/URL';
import { Paper, Grid, Button, ButtonGroup } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import HandshakeIcon from '@mui/icons-material/Handshake';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import BookIcon from '@mui/icons-material/Book';

function ManagerList() {

    const [open, setOpen] = useState(false);
    const [links, setLinks] = useState([]);

    const getLinkManagerList = async () => {
        try{
        const response = await axios.post
        (
            CRMAPI,
            {
                "task": "getLinkManagerList"
            },
            { withCredentials: true }
        )
       .then((response) => 
       {if(response.data.success == true){setLinks(response.data)}})
        } catch(e) { console.error(e.message) }
    };
    
    useEffect(() => {
        getLinkManagerList();
    },[]);

    return(
        <> 
        <Grid>
            <Paper elevation={9} className="p-3 miniBox sortManager" style={{height: '200px !important'}}>
                <div className="d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                    <div className="fw-bolder">매니저 링크</div>
                    {/* <OpenInFullIcon sx={{fontSize: '17px'}}></OpenInFullIcon> */}
                </div>
                <Grid container className="p-1" spacing={1} className="mt-2">
                    {links.result &&
                        links.result.map((Lists, index)=>
                            {
                                return(
                                    <Grid item xs={6} key={Lists.name}>
                                    {Lists.name === '몰 매니저' &&
                                        <a href={Lists.link} target="_blank" style={{textDecoration:'none'}}>
                                            <Button className="d-flex flex-row align-items-center gap-1">
                                                <ShoppingCartIcon></ShoppingCartIcon>
                                                <span className="text-secondary">{Lists.name}</span>
                                            </Button>
                                        </a>
                                    }
                                    {Lists.name === '검색 API' && 
                                        <a href={Lists.link} target="_blank" style={{textDecoration:'none'}}>
                                            <Button className="d-flex flex-row align-items-center gap-1">
                                                    <SearchIcon></SearchIcon>
                                                <span className="text-secondary">{Lists.name}</span>
                                            </Button>
                                        </a>
                                    }
                                    {Lists.name === '오픈마켓 매니저' &&
                                    <a href={Lists.link} target="_blank" style={{textDecoration:'none'}}>
                                        <Button className="d-flex flex-row align-items-center gap-1">
                                                <StorefrontIcon></StorefrontIcon>
                                            <span className="text-secondary text-nowrap">{Lists.name}</span>
                                        </Button>
                                    </a>
                                    }
                                    {Lists.name === 'OPS 센터' && 
                                        <a href={Lists.link} target="_blank" style={{textDecoration:'none'}}>
                                            <Button className="d-flex flex-row align-items-center gap-1">
                                                    <HandshakeIcon></HandshakeIcon>
                                                <span className="text-secondary">{Lists.name}</span>
                                            </Button>
                                        </a>
                                    }
                                    {Lists.name === '통계 센터' &&
                                        <a href={Lists.link} target="_blank" style={{textDecoration:'none'}}>
                                            <Button className="d-flex flex-row align-items-center gap-1">
                                                    <InsertChartIcon></InsertChartIcon>
                                                <span className="text-secondary">{Lists.name}</span>
                                            </Button>
                                        </a>
                                    }
                                    {Lists.name === '갓피플몰 위키' &&
                                        <a href={Lists.link} target="_blank" style={{textDecoration:'none'}}>
                                            <Button className="d-flex flex-row align-items-center gap-1">
                                                <BookIcon></BookIcon>
                                                <span className="text-secondary text-nowrap">{Lists.name}</span>
                                            </Button>
                                        </a>
                                    }
                                    </Grid>
                                )
                            }
                        )
                    }                    
                </Grid>
            </Paper>
        </Grid>
        {/* <Dialog onClose={()=>setOpen(false)} open={open} fullWidth={true} maxWidth="xl">
            <Grid item xs={12}>
                <Paper elevation={3} className="p-3" >
                    <div className="sticky-top bg-white rounded pt-1 d-flex flex-row align-items-center justify-content-between border-bottom pb-2 ms-1">
                        <div>매니저 링크</div>
                                <CloseFullscreenIcon fontSize="small"></CloseFullscreenIcon>
                    </div>
                    
                </Paper>
            </Grid>
        </Dialog> */}
        </>
    )
}

export default ManagerList;