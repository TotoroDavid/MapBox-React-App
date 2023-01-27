import axios from 'axios'

const directionApi = axios.create({
    baseURL: `https://api.mapbox.com/directions/v5/mapbox/driving`,
    params: {
        alternatives: false,
        geometries: 'geojson',
        overview: 'simplified',
        steps: false,
        access_token: `pk.eyJ1IjoidG90b3JvZGF2aWQiLCJhIjoiY2xkZDZ4MGcwMDBwaDNwcHRscjh3a3d2MSJ9.IEUYatigS-qA2cY44KgPZA`
    }
})

export default directionApi