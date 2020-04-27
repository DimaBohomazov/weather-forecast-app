import {
    OPEN_WEATHER_API_KEY,
    GEOHELPER_API_KEY,
    GOOGLE_API_KEY
} from './keys'


export const openWeatherMapApi = (latitude, longitude) =>
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=ru&appid=${OPEN_WEATHER_API_KEY}`;

export const googleGetCity = (latitude, longitude) =>
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&language=ru&result_type=locality&key=${GOOGLE_API_KEY}`;

export const googleGetLocation = (city) =>
    `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${GOOGLE_API_KEY}`;

export const geohelperGetRegion = (country) =>
    `http://geohelper.info/api/v1/regions?locale%5Blang%5D=ru&locale%5BfallbackLang%5D=ru&filter[countryIso]=${country}&pagination[limit]=50&apiKey=${GEOHELPER_API_KEY}`

export const geohelperGetCity = (country, region) =>
    `http://geohelper.info/api/v1/cities?locale%5Blang%5D=ru&locale%5BfallbackLang%5D=ru&filter[countryIso]=${country}&filter[regionId]=${region}&order[by]=population&order[dir]=desc&pagination[limit]=50&apiKey=${GEOHELPER_API_KEY}`