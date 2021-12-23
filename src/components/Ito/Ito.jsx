import React, { useState } from 'react';
import { Form , Button, Card, Container } from "react-bootstrap";
const Ito = () => {
    const [ shareCount , setShareCount ] = useState();
    const [ sharePrice , setSharePrice ] = useState();

	const handleSubmit = (e) => {
		e.preventDefault();
		setSharePrice('');
		setShareCount('');
	};

    return(
    <>
    <Container className="d-flex flex-column align-items-center">
        <Card className="shadow w-50 mt-5">
            <Card.Header className='pt-3 pb d-flex flex-column align-items-center bg-dark text-white'>
                <h2><strong>Create ITO</strong></h2>
            </Card.Header>
            <Card.Body className='px-5'>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label><strong>Number of Shares</strong></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter the Number of Shares"
                            value={shareCount}
                            onChange={(event) => {setShareCount(event.target.value)}}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Price per share</strong></Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Price per share"
                            value={sharePrice}
                            onChange={(event) => {setSharePrice(event.target.value)}}
                        />
                    </Form.Group>
                    <div className='d-flex flex-column align-items-center'>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    </Container>
    </>);
}
export default Ito;