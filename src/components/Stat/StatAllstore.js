import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { RelatDataAll, Color } from './Data';
import StatStyle from '../../style/css/StatStyle.module.css';



function ChartBar(props) {

    return(
        <Doughnut 
            data={props.chartData}
            className={StatStyle.statChartBox}
        />
    )

}


function StatAllstore() {
    const [relatDataAll, setRelatDataAll] = useState({
        labels: RelatDataAll.map((data)=> data.type),
        datasets: [
            {
                label: "Users Gained",
                data: RelatDataAll.map((data) => data.count),
                backgroundColor: Color
            },
        ],
    });

    return(
        <div>
            <ChartBar chartData={relatDataAll}></ChartBar>
        </div>
    )
}

export default StatAllstore;