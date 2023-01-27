import { useContext } from 'react';
import { MapContext, PlacesContext } from '../';


export const BtnMyLocation = () => {

    const { map, isMapReady, setMap } = useContext(MapContext)
    const { isLoading, userLocation } = useContext(PlacesContext)

    const onClick = () => {

        if (!isMapReady) throw new Error(`the map is not ready`)
        if (!userLocation) throw new Error(`we don't have the user location`)

        map?.flyTo({
            zoom: 14,
            center: userLocation
        })

    }

    return (
        <button
            onClick={onClick}
            className="btn btn-primary"
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999
            }}
        >
            My location
        </button>
    )
}
