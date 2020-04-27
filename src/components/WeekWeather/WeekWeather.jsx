import React from 'react';
import {connect} from "react-redux"
import DailyWeather from "./DailyWeather/DailyWeather";


const WeekWeather =(props) => {

    const getDailyItems = () => {
        const daily = [...props.daily]
        return daily.splice(1, 5)
    }
    return (
        <section className='daily'>
            <ul className="daily__list">
                {
                    getDailyItems().map(item => {
                        return(
                            <DailyWeather
                                key={item.dt}
                                date={item.dt*1000}
                                iconInfo={item.weather[0]}
                                humidity={item.humidity}
                                temp={item.temp}
                            />
                        )
                    })
                }
            </ul>
        </section>
    );
}

function mapStateToProps(state){
    return{
        daily: state.weathers.daily
    }
}
export default connect(mapStateToProps)(WeekWeather);