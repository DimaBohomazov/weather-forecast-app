import React from 'react';

function HourlyWeather(props) {
    const { time, getTime, humidity, iconInfo, temp} = props
    return (
        <li className="hourly__item" >
            <div className="hourly__time">
                {getTime(time).slice(0,2)}
            </div>
            <div className="hourly__humidity">
                {humidity} %
            </div>
            <img className="icon" src={`http://openweathermap.org/img/wn/${iconInfo.icon}@2x.png`} alt={iconInfo.main} title={iconInfo.description} />
            <div className="hourly__temp">
                {Math.round(temp)}°
            </div>
        </li>
    );
}

export default HourlyWeather;