import React from 'react'
import { Place } from './place'
import { PlaceInfo } from './listOfPlaces'

type Props = {
    InfoPlace: PlaceInfo | undefined;
}

export const СurrentPlaceInfo: React.FC<Props> = (props) => {
    // props.setCurrentPlace(props.place)
    if (props.InfoPlace !== undefined){
    return (
        <div>
           Tempurature: <tr>{props.InfoPlace.main.temp - 273.15} </tr>
           Pressure: <tr>{props.InfoPlace.main.pressure} </tr>
           Weather: <tr>{props.InfoPlace.weather[0].main} </tr>
           Wind speed: <tr>{props.InfoPlace.wind} </tr>
        </div>  
    )
    }
    else {
        return <div></div>
    }
}