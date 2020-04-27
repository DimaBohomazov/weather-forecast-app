import React from 'react';
import {connect} from "react-redux"
import {handleChangeBodyStyle} from "../store/actions/weathers"

function TitleWeather(props) {
    return (
        <section className="weather-title">
            <div className="weather-title__main">
                <img className="weather-title__img"
                     src="https://image.flaticon.com/icons/svg/1779/1779726.svg" alt="icon" title='weather'/>
                <div className="weather-title__text">
                    Погода
                </div>
            </div>
            <button
                className="weather-title__btn"
                onClick={()=>props.handleChangeBodyStyle()}
            >
                <img className='weather-title__btn-img' src="https://image.flaticon.com/icons/svg/616/616461.svg" alt="button"/>
            </button>
        </section>
    );
}
function mapDispatchTProps(dispatch){
    return{
        handleChangeBodyStyle: () => dispatch(handleChangeBodyStyle())
    }
}
export default connect(null, mapDispatchTProps)(TitleWeather);

