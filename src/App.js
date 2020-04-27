import React from 'react';
import CurrentWeatherText from "./components/CurrentWeatherText";
import TodayWeather from "./components/TodayWeather/TodayWeather";
import WeekWeather from "./components/WeekWeather/WeekWeather";
import TitleWeather from "./components/TitleWeather";
import ChangeCity from "./components/ChangeCity";
import Loader from "./components/UI/Loader";
import AccessDenied from "./hoc/AccessDenied";
import "./stylesheets/loader.css"
import {connect} from "react-redux"
import {openAccessToGeolocation, fetchWeathers, accessDeniedToGeolocation} from "./store/actions/weathers"

class App extends React.Component {

    componentDidMount() {
         if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.props.openAccessToGeolocation, this.props.accessDeniedToGeolocation);
        } else {
            console.log("geo location is not supported");
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.nightStyle !== this.props.nightStyle){
            this.changeBodyStyle()
        } else if(prevProps.longitude && prevProps.longitude !== this.props.longitude) {
            this.props.fetchWeathers();
        }
    }


    changeBodyStyle = () => {
        const body = document.querySelector('body')
        body.classList.toggle('night-schema')
    }


    getWeekDay = () => {
        let date = new Date()
        let result = date.toLocaleString('ru-Ua', {weekday: 'long'})
        return result.charAt(0).toUpperCase() + result.slice(1)
    }
    getDayAndMonth = () => {
        let date = new Date()
        return date.toLocaleString('ru-Ua', {day: 'numeric', month: 'long'})

    }

    render(){
        console.log('render')
        return (
            <div className='container'>
                <header className='header'>
                    <div className='header__date'>
                        <div className="header__date-item">
                            {this.getWeekDay()}, &nbsp;
                        </div>
                        <div className="header__date-item">
                            {this.getDayAndMonth()}
                        </div>
                    </div>
                </header>
                    {this.props.loading
                        ? <Loader/>
                        : <AccessDenied>

                            <CurrentWeatherText />

                            <main className="weather">

                                <TitleWeather />

                                <div className="weather__container">
                                    <TodayWeather />

                                    <WeekWeather />

                                </div>
                            </main>
                            <footer className='footer'>
                                <ChangeCity />
                            </footer>
                        </AccessDenied>
                    }
            </div>
        );
    }
}
function mapStateToProps(state){
    return{
        cityName: state.weathers.cityName,
        longitude: state.weathers.longitude,
        nightStyle: state.weathers.nightStyle,
        loading: state.weathers.loading
    }
}
function mapDispatchToProps(dispatch){
    return{
        openAccessToGeolocation: (position) => dispatch(openAccessToGeolocation(position)),
        fetchWeathers: () => dispatch(fetchWeathers()),
        accessDeniedToGeolocation: () => dispatch(accessDeniedToGeolocation())

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
