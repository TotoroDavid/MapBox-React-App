import axios from 'axios'

const searchApi = axios.create({
    baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places`,
    params: {
        limit: 5,
        language: 'en',
        access_token: `pk.eyJ1IjoidG90b3JvZGF2aWQiLCJhIjoiY2xkZDZ4MGcwMDBwaDNwcHRscjh3a3d2MSJ9.IEUYatigS-qA2cY44KgPZA`
    }
})

export default searchApi