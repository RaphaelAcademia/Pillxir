import {Hint, LineMarkSeries, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Crosshair} from 'react-vis';
import "react-vis/dist/style.css";
import React from 'react';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import {Button} from 'react-bootstrap';


function getWeeklyData(data){

    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

    let temp = [];
    data.forEach((item)=>{
        temp.push({x: days[new Date(item.Timestamp).getDay()], y: item.Total, Store: item.Store})
    })

    temp.sort((a,b) => days.indexOf(a.x)-days.indexOf(b.x));

    
    //Summing all the values for a particular day
    let tempSum = {};

    for (let i =0; i < temp.length; i++){
        let obj = temp[i];
     
        if (!tempSum[obj.x]){
            tempSum[obj.x] = obj;
        }
        else{
            tempSum[obj.x].y += obj.y;
            tempSum[obj.x].Store += ", " + obj.Store; 
        }
    }

    let result = [];

    for (var prop in tempSum)
        result.push(tempSum[prop]);

    return result;
}

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loaded: false,
            value: null,
            weekly: true,
            monthly: false,
            averageSpendings: false
        };
    }
  
    componentDidMount() {

        let dateMinus7Days= new Date();
        dateMinus7Days.setDate(dateMinus7Days.getDate() - 7)

        // Gets data from the last 7 days
        axios.get('http://localhost:3001/specificReceipts', {params: {
            "startDate": (dateMinus7Days.toISOString().slice(0,10)),
            "endDate": (new Date().toISOString().slice(0,10))}
        })

        .then(res => {
            const data = getWeeklyData(res.data);
            this.setState({ data });
            this.setState({loaded: true});
        })
    };

    _weekly = () => {

    };

    _monthly = () => {

    };

    _average = () => {
        
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
                <div className="row">
                    <div className="col-md-3 text-center">
                        <Button id="btn-weekly" onClick={this._weekly} className="col-md-8">Weekly</Button>
                        <Button id="btn-monthly" onClick={this._monthly} className="col-md-8 mt-3">Monthly</Button>
                        <Button id="btn-average" onClick={this._average} className="col-md-8 mt-3">Average Spendings</Button>
                    </div>
                    <div className="col-md-8">
                        <XYPlot xType='ordinal' onMouseLeave={this._onMouseLeave} width={510} height={510} style={{backgroundColor: "#ffffff"}}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis title="Day"/>
                            <YAxis title="Spending ($)"/>
                            <LineMarkSeries onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue} onNearestX={this._onNearestX} data={this.state.data} />
                            {this.state.value ? <Hint value={this.state.value}  /> : null}
                        </XYPlot>
                    </div>
                </div>
                
                );
        }
        else{
            return (
                <LoadingOverlay className="mt-auto pt-auto" active='true' spinner text='Loading'
                >
                </LoadingOverlay>
            )}
        
    }
}