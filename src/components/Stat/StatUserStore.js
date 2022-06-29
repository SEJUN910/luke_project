import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { UserDataAll, Color } from './Data';
import StatStyle from '../../style/css/StatStyle.module.css';


function Chart_bar(props) {

    return(
        <Doughnut 
            data={props.chartData}
            className={StatStyle.statChartBox}
        />
    )

}

function Chart_User_All() {
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
            <Chart_bar chartData={userDataAll}></Chart_bar>
        </div>
    )
}

export default Chart_User_All;