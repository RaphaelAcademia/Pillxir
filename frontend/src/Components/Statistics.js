import React from 'react';
import '../App.css';
import { Card, Container, Button } from 'react-bootstrap';
import Graph from './Graph.js';


function Statistics() {
  return (
		<Container>
			<div class="row">
				<div class = "col-md-3 text-center">
						<Button id="btn-weekly" className="col-md-8 mt-5">Weekly</Button>
						<Button id="btn-monthly" className="col-md-8 mt-3">Monthly</Button>
						<Button id="btn-average" className="col-md-8 mt-3">Average Spendings</Button>
				</div>
				<div className="col-md-6 h-100 justify-content-center align-items-center mt-5">
					<Graph/>
				</div>
			</div>
		</Container>
  );
}

export default Statistics;
