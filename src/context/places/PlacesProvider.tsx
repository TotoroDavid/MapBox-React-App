import { useEffect, useReducer } from "react";
import { getUserLocation, placesReducer, PlacesContext } from "../../index"
import searchApi from '../../api/searchApi';
import { PlacesResponse, Feature } from '../../interfaces/places';

export interface PlacesStateProps {
    isLoading: boolean
    userLocation?: [number, number]
    isLoadingPlaces: boolean
    places: Feature[]
}

interface Props {
    children: JSX.Element | JSX.Element[]
}

const initial_state: PlacesStateProps = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: []
}

export const PlacesProvider = ({ children }: Props) => {

    const [state, dispatch] = useReducer(placesReducer, initial_state)
    // console.log(state)

    useEffect(() => {
        getUserLocation()
            .then(lngLat => dispatch({ type: 'setUserLocation', payload: lngLat }))
    }, [])

    const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {

        if ((query.length === 0)) {
            dispatch({ type: 'setPlaces', payload: [] })
            return []
        }
        if (!state.userLocation) throw new Error(`we don't have location`)

        dispatch({ type: 'setLoadingPlaces' })

        const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(',')
            }
        })
        dispatch({ type: 'setPlaces', payload: resp.data.features })
        // console.log(resp.data.features[0])
        return resp.data.features
    }


    return (
        <PlacesContext.Provider value={{
            ...state,
            //methods
            searchPlacesByTerm
        }}>
            {children}
        </PlacesContext.Provider>
    )
}
