import React from 'react';
import {connect} from "react-redux"
import HourlyWeather from "./HourlyWeather/HourlyWeather";

const TodayWeather = (props) => {

    const getTime = (date = Date()) => {
        const time = new Date(date)
        const options = {hour: 'numeric', minute: 'numeric'}
        return time.toLocaleString('ua', options)
    }
    const getHourlyItems = () => {
        const hourly = [...props.hourly]
        return hourly.splice(1, 4)
    }

    return (
        <section className="today">
            <div className="current">
                <div className="location">
                    <div className="location__time">
                        {getTime()}
                        <img className='location__arrow' src="https://www.svgrepo.com/show/36314/navigation.svg" alt="current time"/>
                    </div>
                    <div className="location__city">
                        {props.cityName}
                    </div>
                </div>
                <div className="current-weather">
                    <img className="icon" src={`http://openweathermap.org/img/wn/${props.currentWeatherSky.icon}@2x.png`} alt={props.currentWeatherSky.main} title={props.currentWeatherSky.description}/>
                    <div className="current__temp">
                        {Math.round(props.currentTemp)}°
                    </div>
                </div>
            </div>
            <div className="hourly">
                <ul className='hourly__list'>
                    <li className="hourly__item">
                        <div className="hourly__time">
                            Сейчас
                        </div>
                        <div className="hourly__humidity">
                            {props.current.humidity}%
                        </div>
                        <img className="icon" src={`http://openweathermap.org/img/wn/${props.currentWeatherSky.icon}@2x.png`} alt={props.currentWeatherSky.main} title={props.currentWeatherSky.description} />
                        <div className="hourly__temp">
                            {Math.round(props.currentTemp)}°
                        </div>
                    </li>
                    {
                        getHourlyItems().map((item) => {
                        return(
                                <HourlyWeather
                                    key={item.dt}
                                    time={item.dt * 1000}
                                    humidity={item.humidity}
                                    temp={item.temp}
                                    iconInfo={item.weather[0]}
                                    getTime={getTime}
                                />
                        )
                    })}
                    <li className="hourly__item">
                        <div className="hourly__time">
                            {getTime(props.current.sunset*1000)}
                        </div>
                        <div className="sunset__icon">
                            <img className="icon--sunset" src="https://image.flaticon.com/icons/svg/1779/1779908.svg" alt="sunset-icon" title="sunset" />
                        </div>
                        <div className="hourly__temp">
                            --
                        </div>
                    </li>
                </ul>


            </div>
        </section>

    );
}
function mapStateToProps(state){
    return{
        cityName: state.weathers.cityName,
        current: state.weathers.current,
        currentWeatherSky: state.weathers.currentWeatherSky,
        currentTemp: state.weathers.current.temp,
        hourly: state.weathers.hourly
    }
}


export default connect(mapStateToProps)(TodayWeather);