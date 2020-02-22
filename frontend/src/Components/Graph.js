import {Hint, LineMarkSeries, XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Crosshair} from 'react-vis';
import "react-vis/dist/style.css";
import React, {useState} from 'react';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import {Button} from 'react-bootstrap';
import {animated} from 'react-spring';
import {Spring} from 'react-spring/renderprops';
import  {getWeeklyData, getMonthlyData} from '../formatData';

export default class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loaded: false,
            value: null,
            weekly: true,
            monthly: false,
            averageSpendings: false,
            nothing: null
        };
        
    }    
  
    componentDidMount() {
      this._weeklyData();
    };

    _forgetValue = () => {
        this.setState({
        value: null
        });
    };

    _rememberValue = value => {
        this.setState({value});
    };

    // Toggles other button states based on the button pressed
    _toggleButton = button => {
        if (button === 'weekly') {
            this.setState({
                weekly: true,
                monthly: false,
                averageSpendings: false,
                nothing: true
          })
          this._weeklyData();
        }
        else if (button === 'monthly') {
            this.setState({
                weekly: false,
                monthly: true,
                averageSpendings: false,
                nothing: true
          })
          this._monthlyData();
        }
        else {
            this.setState({
                weekly: false,
                monthly: false,
                averageSpendings: true
          })
        }
    };

    _weeklyData = () => {
        let day = new Date();
        let currentWeekDay = day.getDay();
        let lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
        let weekStart = new Date(new Date(day).setDate(day.getDate() - lessDays));
        let weekEnd = new Date(new Date(weekStart).setDate(weekStart.getDate() + 6));
        
        weekStart.setHours(0,0,0,0);
        weekEnd.setHours(23,0,0,0);
        
        // Gets data for the week
        axios.get('http://localhost:3001/specificReceipts', {params: {
            "startDate": (weekStart.toISOString().slice(0,10)),
            "endDate": (weekEnd.toISOString().slice(0,10))}
        })

        .then(res => {
            const data = getWeeklyData(res.data);
            this.setState({ data });
            this.setState({loaded: true});
            this.setState({nothing: false});
        })
    }

    _monthlyData = () => {
        let date = new Date();
        let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        firstDay.setHours(0,0,0,0);
        lastDay.setHours(23,0,0,0);
        
        // Gets data for the week
        axios.get('http://localhost:3001/specificReceipts', {params: {
            "startDate": (firstDay.toISOString().slice(0,10)),
            "endDate": (lastDay.toISOString().slice(0,10))}
        })
        .then(res => {
            const data = getMonthlyData(res.data);
            this.setState({ data });
            this.setState({loaded: true});
            this.setState({nothing: false});
        });
    };

    render() {
        if (this.state.nothing)
        {
            return (
                <div className="row">
                <div className="col-md-3 text-center">
                    <Button id="btn-weekly" onClick={() => this._toggleButton('weekly')} className="col-md-8">Current Week</Button>
                    <Button id="btn-monthly" onClick={() => this._toggleButton('monthly')} className="col-md-8 mt-3">Current Month</Button>
                    <Button id="btn-averageSpendings" onClick={() => this._toggleButton('average')} active className="col-md-8 mt-3">Average Weekly Spendings</Button>
                </div>
            </div>
            );
        }
        else if (this.state.loaded && this.state.weekly)
        {
            return (
                <div className="row">
                    <div className="col-md-3 text-center">
                        <Button id="btn-weekly" onClick={() => this._toggleButton('weekly')} active className="col-md-8">Current Week</Button>
                        <Button id="btn-monthly" onClick={() => this._toggleButton('monthly')} className="col-md-8 mt-3">Current Month</Button>
                        <Button id="btn-averageSpendings" onClick={() => this._toggleButton('average')} className="col-md-8 mt-3">Average Weekly Spendings</Button>
                    </div>
                    <Spring from={{opacity: 0}} to={{opacity: 1}} className="col-md-8">
                        {props => (
                            <div className="col-md-9" style={props} >
                                <XYPlot xType='ordinal' onMouseLeave={this._onMouseLeave} width={550} height={550} style={{backgroundColor: "#ffffff"}}>
                                <VerticalGridLines />
                                <HorizontalGridLines />
                                <XAxis title="Day"/>
                                <YAxis title="Spending ($)"/>
                                <LineMarkSeries onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue} onNearestX={this._onNearestX} data={this.state.data} />
                                {this.state.value ? <Hint value={this.state.value}  /> : null}
                                </XYPlot>
                            </div>
                        )}
                    </Spring>
                </div>
            );
        }
        else if (this.state.loaded && this.state.monthly) {
            return (
                <div className="row">
                <div className="col-md-3 text-center">
                    <Button id="btn-weekly" onClick={() => this._toggleButton('weekly')} className="col-md-8">Current Week</Button>
                    <Button id="btn-monthly" onClick={() => this._toggleButton('monthly')} active className="col-md-8 mt-3">Current Month</Button>
                    <Button id="btn-averageSpendings" onClick={() => this._toggleButton('average')} className="col-md-8 mt-3">Average Weekly Spendings</Button>
                </div>
                <Spring from={{opacity: 0}} to={{opacity: 1}} className="col-md-8">
                        {props => (
                            <div className="col-md-9" style={props}>       
                                <XYPlot xType='ordinal' onMouseLeave={this._onMouseLeave} width={550} height={550} style={{backgroundColor: "#ffffff"}}>
                                    <VerticalGridLines />
                                    <HorizontalGridLines />
                                    <XAxis tickLabelAngle={-45} title="Day of Month"/>
                                    <YAxis title="Spending ($)"/>
                                    <LineMarkSeries onValueMouseOver={this._rememberValue} onValueMouseOut={this._forgetValue} onNearestX={this._onNearestX} data={this.state.data} />
                                    {this.state.value ? <Hint value={this.state.value}  /> : null}
                                </XYPlot>
                            </div>
                        )}
                    </Spring>    
            </div>
            );
        }
        else if (this.state.loaded && this.state.averageSpendings) {
            return (
                <div className="row">
                <div className="col-md-3 text-center">
                    <Button id="btn-weekly" onClick={() => this._toggleButton('weekly')} className="col-md-8">Current Week</Button>
                    <Button id="btn-monthly" onClick={() => this._toggleButton('monthly')} className="col-md-8 mt-3">Current Month</Button>
                    <Button id="btn-averageSpendings" onClick={() => this._toggleButton('average')} active className="col-md-8 mt-3">Average Weekly Spendings</Button>
                </div>
            </div>
            );
        }
        else{
            return (
            <div className="row">
                <div className="col-md-3 text-center">
                    <Button id="btn-weekly" onClick={() => this._toggleButton('weekly')} active className="col-md-8">Current Week</Button>
                    <Button id="btn-monthly" onClick={() => this._toggleButton('monthly')} className="col-md-8 mt-3">Current Month</Button>
                    <Button id="btn-averageSpendings" onClick={() => this._toggleButton('average')} className="col-md-8 mt-3">Average Weekly Spendings</Button>
                </div>
            </div>
            )}
        
    }
}