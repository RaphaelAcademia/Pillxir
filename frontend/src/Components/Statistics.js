import React from 'react';
import '../App.css';
import { Card, Container, Button } from 'react-bootstrap';
import Graph from './Graph.js';


function Statistics() {
  return (
		<Container>
			<div class="row">
				<div class = "col-md-3">
					<div class="row" >
						<Button className="col-md-8 ml-3 mt-5">Weekly</Button>
						<Button className="col-md-8 ml-3 mt-3">Monthly</Button>
						<Button className="col-md-8 ml-3 mt-3">Average Spendings</Button>
					</div>
				</div>
				<div className="col-md-8 h-100 justify-content-center align-items-center mt-5 ml-1">
					<Graph/>
				</div>
			</div>
		</Container>
  );
}

export default Statistics;
