import {
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
} from '../actions/actionsTypes'

const initialState = {
    current: {},
    currentWeatherSky: {},
    tempToday: {},
    daily: [],
    hourly: [],
    todayNightWeather: {},
    countryName: '',
    regionList:[],
    cityList:[],
    regionId: '',
    cityName: '',
    longitude: '',
    latitude: '',
    loading: true,
    nightStyle: false,
    location: false,
}

export default function weathersReducer(state = initialState, action) {
    switch(action.type){
        case FETCH_WEATHERS_START:
            return{
                ...state
            }
        case FETCH_WEATHERS_SUCCESS:
            return{
                ...state,
                loading:false,
                current: action.current,
                currentWeatherSky: action.currentWeatherSky,
                tempToday: action.tempToday,
                daily: action.daily,
                hourly: action.hourly,
                todayNightWeather: action.todayNightWeather,
                location: true
            }
        case FETCH_CITY_SUCCESS:
            return{
                ...state,
                cityName: action.cityName
            }
        case GET_GEO_POSITION:
            return{
                ...state,
                latitude: action.latitude,
                longitude: action.longitude
            }
        case HANDLE_CHANGE_BODY_STYLE:
            return{
                ...state,
                nightStyle: !state.nightStyle
            }
        case CHANGE_COUNTRY:
            return{
                ...state,
                countryName: action.countryName
            }
        case CHANGE_REGION:
            return{
                ...state,
                regionId: action.regionId
            }
        case CHANGE_CITY:
            return{
                ...state,
                cityName: action.cityName
            }
        case FETCH_REGION_LIST_SUCCESS:
            return{
                ...state,
                regionList: action.regionList
            }
        case FETCH_CITY_LIST_SUCCESS:
            return{
                ...state,
                cityList: action.cityList
            }
        case FETCH_CITY_LOCATION_SUCCESS:
            return{
                ...state,
                longitude: action.longitude,
                latitude: action.latitude
            }
        case CLOSED_GEOLOCATION:
            return{
                ...state,
                cityName: 1,
                longitude: 1,
                latitude: 1,
                loading: false
            }
        default:
            return state
    }
}