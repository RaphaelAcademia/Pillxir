import React from 'react';
import '../App.css';
import { Card, Container, Button } from 'react-bootstrap';
import DynamicCrosshair from './Graph.js';

const data = [
	{x: 0, y: 8},
	{x: 1, y: 5},
	{x: 2, y: 4},
	{x: 3, y: 9},
	{x: 4, y: 1},
	{x: 5, y: 7},
	{x: 6, y: 6},
	{x: 7, y: 3},
	{x: 8, y: 2},
	{x: 9, y: 0}
  ];


function Statistics() {
  return (
		<Container>
			<div className="row h-100 justify-content-center align-items-center mt-5">
			<DynamicCrosshair/>
			</div>
		</Container>
  );
}

export default Statistics;
