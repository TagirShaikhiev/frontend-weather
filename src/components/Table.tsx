import React from "react";

import { inject, observer } from "mobx-react";
import { listOfCurrentPlace } from './currentList'
import { Row } from "./Row";
import xmark from './xmark.png'

type Props = {
    listOfPlaces?: listOfCurrentPlace;
};

type State = {
    search: string;
    value: string;
};

@inject("listOfPlaces")
@observer
export class Table extends React.Component<Props> {

    setCheck(): void {
        this.props.listOfPlaces?.setSearch(this.state.search)
    }

    // componentDidMount(): void {
    //     this.props.listOfPlaces?.init();
    //     console.log(this.props.listOfPlaces?.getAllPlaces);
    // }

    onChangeHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
          value: event.target.value
        });
        this.props.listOfPlaces?.changeCurrentPlace(event.target.value);
    }

    setStatus(): void {
        this.props.listOfPlaces?.init();
    }

    state: State = { search: "", value: ""};

    render() {
        return (
        <div className="search col-sm-8 row justify-content-center">
            <div className="col-sm-8 row justify-content-left container-fluid">
                <button
                onClick={() => {
                    this.setStatus();
                }}
                >
                Open
                </button>
                <input
                type="text"
                value={this.state.search}
                onChange={(event) =>
                    this.setState({ search: event.currentTarget.value })
                }
                />
                <button
                onClick={() =>
                    this.props.listOfPlaces!.setSearch(this.state.search)
                }>
                Поиск
                </button>
            </div>
            <div className="col-sm-8 row justify-content-left container-fluid">
                <select onChange={(event) => this.onChangeHandler(event)}>
                    {this.props.listOfPlaces!.searchPlaces.map((place) => (
                        <Row place={place} setCurrentPlace={this.props.listOfPlaces!.setCurrentPlace} />    
                    ))}
                </select>
                <button
                onClick={() => {
                this.props.listOfPlaces!.addCurrentPlace()}}>
                    Добавить
                </button>
            </div>
            <div className="col-sm-8 row justify-content-left container-fluid">
                {this.props.listOfPlaces!.arrayOfPersonalPlaces.map((place) => 
                    <div className="col-sm-8 row justify-content-start">
                        <tr>{place.name}</tr>
                        <div className="col-sm-8 row justify-content-end">{this.props.listOfPlaces!.getTempurature(place.id)}</div>
                        <img src={xmark} className="icons" onClick={() => this.props.listOfPlaces!.deleteFromPlaces(place.id)}/>
                    </div>
                )}        
            </div>
          </div>   
        )
    }

}