import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Crosshair} from 'react-vis';
import "react-vis/dist/style.css";
import React from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';



function getData(data){
    let temp = [];
    data.forEach((item)=>{
        temp.push({x: new Date(item.Timestamp).getTime(), y: item.Total})
    })
    return temp;
}

export default class DynamicCrosshair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        crosshairValues: [],
        data: {},
        loaded: false
        };
    }

    componentDidMount() {
        axios.get('http://localhost:3001/receipts')
        .then(res => {
            const data = getData(res.data);
            this.setState({ data });
            this.setState({loaded: true});
        })
    };

    /**
     * Event handler for onMouseLeave.
     * @private
     */
    _onMouseLeave = () => {
        this.setState({crosshairValues: []});
    };

    /**
     * Event handler for onNearestX.
     * @param {Object} value Selected value.
     * @param {index} index Index of the value in the data array.
     * @private
     */
    _onNearestX = (value, {index}) => {
        this.setState({crosshairValues: this.state.data.map(d => d[index])});
    };

    render() {
        if (this.state.loaded)
        {
            return (
                <XYPlot onMouseLeave={this._onMouseLeave} width={600} height={600} style={{backgroundColor: "#ffffff"}}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineSeries onNearestX={this._onNearestX} data={this.state.data} />
                    <Crosshair
                    values={this.state.crosshairValues}
                    className={'test-class-name'}
                    />
                </XYPlot>
                );
        }
        else{
            return (
                <Spinner animation="border" role="status" variant="light">
                <span className="sr-only ">Loading...</span>
                </Spinner>
            )
        }
        
    }
}