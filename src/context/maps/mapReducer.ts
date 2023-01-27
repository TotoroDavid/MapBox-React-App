import { Map, Marker } from 'mapbox-gl';
import { MapStateProps } from './MapProvider';

type MapAction =
    | { type: 'setMap', payload: Map }
    | { type: 'setMarkers', payload: Marker[] }


export const mapReducer = (state: MapStateProps, action: MapAction): MapStateProps => {

    switch (action.type) {
        case 'setMap':
            return {
                ...state,
                isMapReady: true,
                map: action.payload
            }
        case 'setMarkers':
            return {
                ...state,
                markers: action.payload
            }
        default:
            return state
    }

}