import React from 'react';
import {connect} from "react-redux"
import {changeCountry, changeRegion, changeCity, fetchRegionList, fetchCityList, fetchCityLocation} from "../store/actions/weathers"


class ChangeCity extends React.Component{

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.countryName !== this.props.countryName){
            this.props.fetchRegionList()
        } else if(prevProps.regionId !== this.props.regionId) {
            this.props.fetchCityList()
        } else if(prevProps.cityName && prevProps.cityName !== this.props.cityName ){
            this.props.fetchCityLocation()
        }
    }

    getSelectedValue = (event, id) => {
        event.preventDefault()
        const index =document.getElementById(id).selectedIndex
        const value = document.getElementById(id).options[index].value;
        return value
    }

    render() {
        return (
            <section className="city">
                <label className="city__label" htmlFor="countries" >
                    Страна
                    <select
                        className='city__select select-css'
                        id="countries"
                        onChange={(event) => this.props.changeCountry(this.getSelectedValue(event, 'countries'))}
                    >
                        <option className='city__options' value={this.props.countryName}>--</option>
                        <option className='city__options' value="UA">Украина</option>
                        <option className='city__options' value="RU">Россия</option>
                        <option className='city__options' value="BY">Беларусь</option>
                        <option className='city__options' value="GB">Великобритания</option>
                        <option className='city__options' value="NL">Нидерланды</option>
                        <option className='city__options' value="KZ">Казахстан</option>
                        <option className='city__options' value="MD">Молдова</option>
                    </select>
                </label>

                <label className="city__label" htmlFor="regions" >
                    Область
                    <select
                        className='city__select select-css'
                        id="regions"
                        onChange={(event) => this.props.changeRegion(this.getSelectedValue(event, 'regions'))}
                    >
                        <option className='city__options' value={this.props.regionId}> -- </option>
                        {this.props.regionList.map((item, index) => {
                            return(
                                <option className='city__options' value={item.id} key={index}>{item.localizedNames.ru}</option>
                            )
                        })}
                    </select>
                </label>

                <label className="city__label" htmlFor="cities" >
                    Город
                    <select
                        className='city__select select-css'
                        id="cities"
                        onChange={(event) => this.props.changeCity(this.getSelectedValue(event, 'cities'))}
                    >
                        <option className='city__options' value={this.props.cityName}> -- </option>
                        {this.props.cityList.map((item, index) => {
                            return(
                                <option className='city__options' value={item.name} key={index}>{item.name}</option>
                            )
                        })}
                    </select>
                </label>

            </section>
        );
    }


}
function mapStateToProps(state){
    return{
        countryName: state.weathers.countryName,
        regionId: state.weathers.regionId,
        regionList: state.weathers.regionList,
        cityList: state.weathers.cityList,
        cityName: state.weathers.cityName
    }
}
function mapDispatchToProps(dispatch){
    return{
        changeCountry: (value) => dispatch(changeCountry(value)),
        changeRegion: (value) => dispatch(changeRegion(value)),
        changeCity: (value) => dispatch(changeCity(value)),
        fetchRegionList: () => dispatch(fetchRegionList()),
        fetchCityList: () => dispatch(fetchCityList()),
        fetchCityLocation: () => dispatch(fetchCityLocation()),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeCity);


/*
exter
*/
