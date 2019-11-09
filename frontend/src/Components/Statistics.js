import React from 'react';
import '../App.css';
import { Card, Container, Button } from 'react-bootstrap';

function Statistics() {
  return (
		<Container>
			<Card>
				<Card.Header as="h5">Statistics</Card.Header>
				<Card.Body>
					<Card.Title>Spendings</Card.Title>
					<Card.Text>
						With supporting text below as a natural lead-in to additional content.
					</Card.Text>
					<Button variant="primary">Go somewhere</Button>
				</Card.Body>
			</Card>
		</Container>
  );
}

export default Statistics;
