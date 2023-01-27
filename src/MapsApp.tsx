import { MapProvider, PlacesProvider } from "./"
import { HomeScreen } from "./"
import './index.css'

export const MapsApp = () => {
    return (
        <PlacesProvider>
            <MapProvider>
                <HomeScreen />
            </MapProvider>
        </PlacesProvider>
    )
}
