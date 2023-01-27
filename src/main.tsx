import React from 'react'
import ReactDOM from 'react-dom/client'
import { MapsApp } from './MapsApp'
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidG90b3JvZGF2aWQiLCJhIjoiY2xkZDZ4MGcwMDBwaDNwcHRscjh3a3d2MSJ9.IEUYatigS-qA2cY44KgPZA'

//for to know if the user has the geolocation in his navigator
if (!navigator.geolocation) {
  alert(`your navigator doesn't have Geolocation`)
  throw new Error(`your navigator doesn't have Geolocation`)
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
)
