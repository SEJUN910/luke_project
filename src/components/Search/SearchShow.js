import react from 'react';
import SearchStyle from '../../style/css/SearchStyle.module.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ShowNor() {
    return(
        <div className={`${SearchStyle.ShowNorBox} p-2 border rounded mt-2`}>
            <span className="text_ms fw-bolder bg-white px-2 py-1 rounded shadow-sm"> 일반사용자</span>
            <TableContainer component={Paper} className="mt-2">
                <Table sx={{ minWidth: 700 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="fw-bolder">아이디</TableCell>
                            <TableCell className="fw-bolder">이름</TableCell>
                            <TableCell className="fw-bolder">이메일</TableCell>
                            <TableCell className="fw-bolder">핸드폰</TableCell>
                            <TableCell className="fw-bolder">생일</TableCell>
                            <TableCell className="fw-bolder">가입일</TableCell>
                            <TableCell className="fw-bolder">회원종류</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

function ShowDor() {
    return(
        <div className={`${SearchStyle.ShowDorBox} p-2 mt-2 border rounded`}>
            <span className="text_ms fw-bolder bg-white px-2 py-1 rounded shadow-sm"> 휴면사용자</span>
            <TableContainer component={Paper} className="mt-2">
                <Table sx={{ minWidth: 700 }} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className="fw-bolder">아이디</TableCell>
                            <TableCell className="fw-bolder">이름</TableCell>
                            <TableCell className="fw-bolder">이메일</TableCell>
                            <TableCell className="fw-bolder">핸드폰</TableCell>
                            <TableCell className="fw-bolder">생일</TableCell>
                            <TableCell className="fw-bolder">가입일</TableCell>
                            <TableCell className="fw-bolder">회원종류</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
function SearchShow() {
    return (
        <div className={SearchStyle.SearchInputBox}>
            <ShowNor></ShowNor>
            <ShowDor></ShowDor>
        </div>
    )
}

export default SearchShow;