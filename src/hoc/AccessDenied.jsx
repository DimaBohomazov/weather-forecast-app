import React from 'react';
import {connect} from "react-redux"
import ChangeCity from "../components/ChangeCity";
import {handleChangeBodyStyle} from "../store/actions/weathers"

function AccessDenied(props) {
    if(!props.location){
        return (
            <div className='error'>

                <div className="error__message">
                    Там где <strong>Ты</strong> всегда хорошая погода!
                </div>
                <button
                    className="weather-title__btn"
                    onClick={()=>props.handleChangeBodyStyle()}
                >
                    <img className='weather-title__btn-img' src="https://image.flaticon.com/icons/svg/616/616461.svg" alt="button"/>
                </button>
                <div className="error__form">
                    <ChangeCity/>
                </div>
            </div>
        );
    } else {
        return props.children
    }

}
function mapStateToProps(state){
    return{
        location: state.weathers.location
    }
}
function mapDispatchToProps(dispatch){
    return{
        handleChangeBodyStyle: () => dispatch(handleChangeBodyStyle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessDenied);