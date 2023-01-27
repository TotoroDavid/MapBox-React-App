import { useReducer, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl"
import { MapContext, mapReducer, PlacesContext } from '../../index'
import directionApi from '../../api/directionsApi';
import { DirectionsResponse } from '../../interfaces/direction';

export interface MapStateProps {
    isMapReady: boolean
    map?: Map
    markers: Marker[]
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const initial_state: MapStateProps = {
    isMapReady: false,
    map: undefined,
    markers: [],
}

export const MapProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(mapReducer, initial_state)

    const { places } = useContext(PlacesContext)

    useEffect(() => {
        state.markers.forEach(market => market.remove())
        const newMarkers: Marker[] = []

        for (const place of places) {
            const [lng, lat] = place.center
            const popUp = new Popup()
                .setHTML(`
                <h6>${place.text}</h6>
                <p>${place.place_name}</p>
                `)
            const newMarker = new Marker()
                .setPopup(popUp)
                .setLngLat([lng, lat])
                .addTo(state.map!)

            newMarkers.push(newMarker)
        }
        //clean the polyline
        dispatch({ type: 'setMarkers', payload: newMarkers })

    }, [places])


    const setMap = (map: Map) => {

        const myLocationPopUp = new Popup()
            .setHTML(`<h3>This is your currently location</h3>`)

        new Marker({ color: 'coral' }) //adding the central point
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopUp)
            .addTo(map)

        dispatch({ type: 'setMap', payload: map })

    }

    const getRouteBetweenPoints = async (start: [number, number], end: [number, number]) => {

        const resp = await directionApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`)
        // console.log(resp.data.routes[0])
        const { distance, duration, geometry } = resp.data.routes[0]
        const { coordinates: coords } = geometry

        let kms = distance / 1000
        kms = Math.round(kms * 100)
        kms /= 100

        const minutes = Math.floor(duration / 60)
        console.log({ kms, minutes })

        const bounds = new LngLatBounds(
            start,
            start
        )

        for (const coord of coords) {
            const newCoord: [number, number] = [coord[0], coord[1]]
            bounds.extend(newCoord)
        }
        state.map?.fitBounds(bounds, {
            padding: 200
        })

        //polyline -- line of route
        const sourceData: AnySourceData = {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: [
                    {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: coords
                        }
                    }
                ]
            }
        }
        // todo: remove polyline if that exist
        if (state.map?.getLayer('RouteString')) {
            state.map.removeLayer('RouteString')
            state.map.removeSource('RouteString')
        }

        state.map?.addSource('RouteString', sourceData)

        //define styles of my polyline
        state.map?.addLayer({
            id: 'RouteString',
            type: 'line',
            source: 'RouteString',
            layout: {
                'line-cap': 'round',
                'line-join': 'round'
            },
            paint: {
                'line-color': 'coral',
                'line-width': 3
            }
        })

    }

    return (
        <MapContext.Provider value={{
            ...state,
            //methods
            setMap,
            getRouteBetweenPoints
        }}
        >
            {children}
        </MapContext.Provider>
    )
}
