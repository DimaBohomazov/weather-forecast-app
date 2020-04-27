import axios from "axios";
import {
    openWeatherMapApi,
    googleGetCity,
    googleGetLocation,
    geohelperGetRegion,
    geohelperGetCity
} from "../../utils/api"

import{
    FETCH_WEATHERS_START,
    FETCH_WEATHERS_SUCCESS,
    FETCH_CITY_SUCCESS,
    GET_GEO_POSITION,
    HANDLE_CHANGE_BODY_STYLE,
    CHANGE_COUNTRY,
    CHANGE_REGION,
    CHANGE_CITY,
    FETCH_REGION_LIST_SUCCESS,
    FETCH_CITY_LIST_SUCCESS,
    FETCH_CITY_LOCATION_SUCCESS,
    CLOSED_GEOLOCATION
} from './actionsTypes'

export function openAccessToGeolocation(position){
    return dispatch => {
        dispatch(getGeoPosition(position))
        dispatch(fetchWeathers())
        dispatch(fetchCityName())
    }
}
export function accessDeniedToGeolocation(){
    return dispatch => {
        dispatch(closedGeolocation())
    }
}
export function closedGeolocation() {
    return{
        type: CLOSED_GEOLOCATION
    }
}
export function fetchWeathers(){
    return async (dispatch, getState) => {
        dispatch(fetchWeathersStart())
        try{
            const response = await axios.get(openWeatherMapApi(getState().weathers.latitude, getState().weathers.longitude))
            dispatch(fetchWeathersSuccess(response.data))
        } catch (e) {
            document.write(`<h1>Please add your valid OPEN_WEATHER_API_KEY to /src/utils/keys.js </h1>`,e)
        }
    }
}
export function fetchCityName(){
    return async (dispatch, getState) => {
        try{
            const response = await axios.get(googleGetCity(getState().weathers.latitude, getState().weathers.longitude))
            dispatch(fetchCitySuccess(response.data))
        } catch (e) {
            document.write(`<h1>Please add your valid GOOGLE_API_KEY to /src/utils/keys.js </h1>`,e)
        }
    }
}

export function fetchWeathersStart() {
    return{
        type: FETCH_WEATHERS_START
    }
}
export function fetchWeathersSuccess(data) {
    const hours = [...data.hourly]
    hours.length = 24
    const night = hours.filter(item => new Date(item.dt * 1000).getHours() === 0).pop()
    return{
        type: FETCH_WEATHERS_SUCCESS,
        current: data.current,
        currentWeatherSky: data.current.weather[0],
        tempToday: data.daily[0].temp,
        hourly: data.hourly,
        todayNightWeather: night.weather[0],
        daily: data.daily,
    }
}
export function fetchCitySuccess(data) {
    return{
        type: FETCH_CITY_SUCCESS,
        cityName: data.results[0].address_components[0].long_name
    }
}
export function getGeoPosition(position) {
    return {
        type: GET_GEO_POSITION,
        longitude: position.coords.longitude.toFixed(5),
        latitude: position.coords.latitude.toFixed(5)
    }
}

export function handleChangeBodyStyle(){
        return{
            type: HANDLE_CHANGE_BODY_STYLE
        }
}

export function changeCountry(value){
    return{
        type: CHANGE_COUNTRY,
        countryName: value
    }
}
export function changeRegion(value){
    return{
        type: CHANGE_REGION,
        regionId: value
    }
}
export function changeCity(value){
    return{
        type: CHANGE_CITY,
        cityName: value
    }
}
export function fetchRegionListSuccess(data){
    return{
        type: FETCH_REGION_LIST_SUCCESS,
        regionList: data
    }
}
export function fetchCityListSuccess(data){
    return{
        type: FETCH_CITY_LIST_SUCCESS,
        cityList: data
    }
}
export function fetchCityLocationSuccess(data){
    return{
        type: FETCH_CITY_LOCATION_SUCCESS,
        longitude: data.lng,
        latitude: data.lat,
    }
}

export function fetchRegionList(){
    return async (dispatch, getState) => {
        try{
            const response = await axios.get(geohelperGetRegion(getState().weathers.countryName))
            dispatch(fetchRegionListSuccess(response.data.result))
        }catch(e){
            if (e.message === 'Network Error'){
                document.write('<h1>Please check your internet connection!</h1>', e)
            } else {
                document.write(`<h1>Please add your valid GEOHELPER_API_KEY to /src/utils/keys.js </h1>`,e)
            }

        }
    }
}
export function fetchCityList(){
    return async (dispatch, getState) => {
        try{
            const response = await axios.get(geohelperGetCity(getState().weathers.countryName, getState().weathers.regionId))
            dispatch(fetchCityListSuccess(response.data.result))
        }catch(e){
            document.write(`<h1>Please add your valid GEOHELPER_API_KEY to /src/utils/keys.js </h1>`,e)
        }
    }
}

export function fetchCityLocation(){
    return async (dispatch, getState) => {
        try{
            const response = await axios.get(googleGetLocation(getState().weathers.cityName))
            dispatch(fetchCityLocationSuccess(response.data.results[0].geometry.location))
        }catch(e){
            document.write(`<h1>Please add your valid GOOGLE_API_KEY to /src/utils/keys.js </h1>`,e)
        }
    }
}

