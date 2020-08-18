import React from 'react'
import { Place } from './place'

type Props = {
    place: Place;
    setCurrentPlace(person: Place): void;
}

export const Row: React.FC<Props> = (props) => {
    // props.setCurrentPlace(props.place)
    return (
        <option>
            {props.place.name}   
        </option>
    )
}
