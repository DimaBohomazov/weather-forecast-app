import React from 'react';

function DailyWeather(props) {
    const {date,iconInfo,humidity,temp} = props
    const getWeekDay = (date) => new Date(date).toLocaleString('ua', {weekday: 'long'})
    return (
        <li className="daily__item">
            <div className="daily__day">
                {getWeekDay(date)}
            </div>
            <div className='daily__conditions'>
                <img className="icon icon--daily" src={`http://openweathermap.org/img/wn/${iconInfo.icon}@2x.png`} alt={iconInfo.main} title={iconInfo.description}/>
                <div className="daily__humidity">
                    {humidity}%
                </div>
            </div>

            <div className="daily__temp">
                <div className="daily__temp--day">
                    {Math.round(temp.max)}
                </div>
                <div className="daily__temp--night">
                    {Math.round(temp.night)}
                </div>
            </div>

        </li>
    );
}

export default DailyWeather;