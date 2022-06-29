import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from 'axios';

function Test(){
    const [coords, saveCoords] = useState();
    const [temp, setTemp] = useState();
    const [weather, setWeather] = useState();
      
     function handleGeoSucc(position) {
      const latitude = position.coords.latitude;  // 경도  
      const longitude = position.coords.longitude;  // 위도
      const coordsObj = {
        latitude,
        longitude
      }
      saveCoords(coordsObj);
      getWeather(latitude, longitude);
    }
  
    function handleGeoErr(err) {
      console.log("geo err! " + err);
    }
  
    function requestCoords() {
      navigator.geolocation.getCurrentPosition(handleGeoSucc, handleGeoErr);
    }

    const getWeather = async (lat, lon) =>    
    {
        try{
            const response = await axios.get
            (
                `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst`,
                {
                    'serviceKey': '6yPSJC4TYq1Ne43Cxiuxoa%2FOAX4m6stZ%2F2b2Upv71bcIaflLtMIzh8L7W3I0I6wXD55e43O36cEJyDaIRuUlZQ%3D%3D',
                    'numOfRows': 10,
                    'pageNo': 1,
                    'dataType': 'JSON',
                    'base_date': '20220614',
                    'base_time': '0600',
                    'nx': 55,
                    'ny': 127
                },
                {
                    withCredentials: true
                }
            )
            .then(data => {
                console.log(data)
              })
            } catch(e) { console.error(e.message) }
        };
  
    useEffect(() => {
      requestCoords();
    }, []);
}
  
export default Test;