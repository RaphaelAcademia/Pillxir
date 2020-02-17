import React from 'react';
import '../App.css';
import { Card, Container, Button } from 'react-bootstrap';
import Graph from './Graph.js';


function Statistics() {
  return (
		<Container>
			<div className="row">
				<div className="col-md-12 mt-5">
					<Graph/>
				</div>
			</div>
		</Container>
  );
}

export default Statistics;
