import React from 'react';
import {connect} from "react-redux"

const CurrentWeatherText = (props) => {


    return (
        <section className="weather-overview">
            <img className="icon--overview icon" src={`http://openweathermap.org/img/wn/${props.currentWeatherSky.icon}@2x.png`} alt={props.currentWeatherSky.main} title={props.currentWeatherSky.description}/>
            <p className="weather-overview__text">
                Сейчас {props.currentWeatherSky.description}. Максимальная температура воздуха составит {Math.round(props.maxTemp)}°.
                Сегодня ночью {props.todayNightWeather.description}, минимальная температура воздуха {Math.round(props.minTemp)}°.
            </p>
        </section>
    );
}
function mapStateToProps(state){

    return{
        currentWeatherSky: state.weathers.currentWeatherSky,
        maxTemp: state.weathers.tempToday.max,
        minTemp: state.weathers.tempToday.min,
        todayNightWeather: state.weathers.todayNightWeather,
        todayNightTemp: state.weathers.todayNightTemp


    }
}
export default connect(mapStateToProps)(CurrentWeatherText);