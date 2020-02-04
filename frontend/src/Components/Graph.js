import {Hint, LineMarkSeries, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Crosshair} from 'react-vis';
import "react-vis/dist/style.css";
import React from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';



function getData(data){

    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let temp = [];
    data.forEach((item)=>{
        temp.push({x: days[new Date(item.Timestamp).getDay()], y: item.Total})
    })

    temp.sort((a,b) => days.indexOf(a.x)-days.indexOf(b.x));
  
console.log(temp);

    return temp;
}

export default class DynamicCrosshair extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loaded: false,
            value: null
        };
    }
  
    componentDidMount() {
        let dateMinus7Days= new Date();
        dateMinus7Days.setDate(dateMinus7Days.getDate() - 7)
        axios.get('http://localhost:3001/specificReceipts', {params: {
            "startDate": (dateMinus7Days.toISOString().slice(0,10)),
            "endDate": (new Date().toISOString().slice(0,10))}
        })
        .then(res => {
            const data = getData(res.data);
            this.setState({ data });
            this.setState({loaded: true});
        })
    };

  _forgetValue = () => {
    this.setState({
      value: null
    });
  };

  _rememberValue = value => {
    this.setState({value});
  };

    render() {
        if (this.state.loaded)
        {
            return (
                <XYPlot xType='ordinal' onMouseLeave={this._onMouseLeave} width={600} height={600} style={{backgroundColor: "#ffffff"}}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <LineMarkSeries  onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue} onNearestX={this._onNearestX} data={this.state.data} />
                    {this.state.value ? <Hint value={this.state.value} /> : null}
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