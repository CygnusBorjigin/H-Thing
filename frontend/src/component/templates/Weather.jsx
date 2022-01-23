import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {

    const [weather, setWeather] = useState({});

    const getWeather = async () => {
    try{
        const userToken = localStorage.getItem('token');

        var data = JSON.stringify({
                                    "location": "boston",
                                    "unit": "metric"
                                });

        var config = {
                        method: 'post',
                        url: 'http://localhost:8000/api/internal/weather',
                        headers: { 
                                'Content-Type': 'application/json', 
                                'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFkMzBlZDU5NGYyM2E2NzA4ZTAyNDVhIn0sImlhdCI6MTY0MTM0NjczNywiZXhwIjoxNjQxNzc4NzM3fQ.8pPcz6EnOBTZ-7IbvnvDR-Q_iKpXqm1sKJNlSXWbxr4'
                        },
                        data : data
                        };

        const res = await axios(config);
        const result = res.data;
        setWeather(result);
    } catch (err) {
        console.log(err);
    }

    };

    useEffect(() => {
        const newWeather = getWeather();
        setWeather(newWeather);
    }, []);

    return(
        <div>
        {console.log(weather)}
        </div>
    )
};

export default Weather;