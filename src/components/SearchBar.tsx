import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext, SearchResults } from '../';

export const SearchBar = () => {

    const { searchPlacesByTerm } = useContext(PlacesContext)

    const debounceRef = useRef<any>()

    const onQueryChanged = (event: ChangeEvent<HTMLInputElement>) => {

        if (debounceRef.current)
            clearTimeout(debounceRef.current)

        debounceRef.current = setTimeout(() => {
            searchPlacesByTerm(event.target.value)
        }, 1000)
    }

    return (
        <div className="search_container"
        >
            <input
                type="text"
                className="form-control"
                placeholder="search a new place"
                onChange={onQueryChanged}
            />
            <SearchResults />
        </div>
    )
}
