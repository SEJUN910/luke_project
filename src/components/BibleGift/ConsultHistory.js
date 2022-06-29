import React from 'react';
import { Table } from 'react-bootstrap';

function ConsultHistory({history}){
    return(
        <>
        {
            <Table striped bordered className="text_m">
                <thead className="text-center">
                    <tr className="col">
                        <th className="col-1">종류</th>
                        <th className="col-5">내용</th>
                        <th className="col-2">시간</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {history.length > 0 && history.map(Lists =>{
                        return(
                            <React.Fragment key={history.bgh_idx}>
                            {Lists.h_kind === 'consult' &&
                            <tr>
                                <td>{Lists.h_kind}</td>
                                <td>{Lists.h_memo}</td>
                                <td>{Lists.h_time}</td>
                            </tr>}
                            </React.Fragment>
                        )
                    })}
                </tbody>
            </Table>
        }
        </>
    )
}

export default ConsultHistory;