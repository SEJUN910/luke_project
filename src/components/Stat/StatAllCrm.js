import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { UserDataAll, Color } from './Data';
import StatStyle from '../../style/css/StatStyle.module.css';


function ChartBar(props) {

    return(
        <Doughnut 
            data={props.chartData}
            className={StatStyle.statChartBox}
        />
    )

}

function StatAllCrm() {
    const [userDataAll, setUserDataAll] = useState({
        labels: UserDataAll.map((data)=> data.type),
        datasets: [
            {
                label: "Users Gained",
                data: UserDataAll.map((data) => data.userGain),
                backgroundColor: Color
            },
        ],
    });
    console.log(UserDataAll.map((data) => data.userGain));
    return(
        <div>
            <ChartBar chartData={userDataAll}></ChartBar>
        </div>
    )
}

export default StatAllCrm;