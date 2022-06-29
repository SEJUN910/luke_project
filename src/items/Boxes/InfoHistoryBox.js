import React from 'react';

function HistoryBox(props) {
    const HistoryList =
        props.data.map(Items => {
            return(   
                <div className="text_m">
                    <div className="text_s fw-bolder mt-2"><span className="add_bar">{(Items.agent)? Items.agent : '시스템'}</span><span className="add_bar">{Items.type}</span>{Items.reg_date}</div>
                    <div className="border-bottom pb-1">
                        <div dangerouslySetInnerHTML={ {__html: Items.contents} }></div>
                    </div>
                </div>
            )
        })
    return(
        <div className="bg-white rounded shadow-sm p-2">
            <div className="border-bottom w-50 mb-1 border-2 text_m text-success"><b>히스토리</b></div>
            <div>
                {HistoryList}
            </div>
        </div>
    )
}

export default HistoryBox;