import { useContext, useLayoutEffect, useRef } from "react"
import { Loading, PlacesContext, MapContext } from '../';
import { Map } from 'mapbox-gl';

export const MapView = () => {

    const { isLoading, userLocation } = useContext(PlacesContext)
    const { setMap } = useContext(MapContext)

    const mapDiv = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {

        if (!isLoading) { //false !isLoading true->isLoading
            const map = new Map({
                container: mapDiv.current!,
                style: 'mapbox://styles/mapbox/light-v10', // style URL
                center: userLocation,
                zoom: 14, // starting zoom
            })
            setMap(map)
        }

    }, [isLoading])

    if (isLoading) { // true 
        return (<Loading />)
    }

    return (
        <div
            ref={mapDiv}
            style={{
                'background': 'grey',
                'height': '100vh',
                'left': 0,
                'position': 'fixed',
                'top': 0,
                'width': '100vw',
            }}
        >
            {userLocation?.join(' , ')}
        </div>
    )
}
