import React, { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { UserData, Color } from './Data';
import StatStyle from '../../style/css/StatStyle.module.css';


function ChartBar(props) {

    return(
        <Doughnut 
            data={props.chartData}
            className={StatStyle.statChartBox}
        />
    )

}

function Chart_User() {
    const [userData, setUserData] = useState({
        labels: UserData.map((data)=> data.type),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: Color
            },
        ],
    });
    console.log(UserData.map((data) => data.userGain));
    return(
        <div>
            <ChartBar chartData={userData}></ChartBar>
        </div>
    )
}

export default Chart_User;