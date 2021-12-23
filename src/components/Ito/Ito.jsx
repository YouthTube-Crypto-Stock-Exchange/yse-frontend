import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import web3 from '../../web3';
import { Form , Button, Card, Container , InputGroup } from "react-bootstrap";
import Spinner from '../Spinner/Spinner';
import contract from '../../contract';

const Ito = () => {
    const [ shareCount , setShareCount ] = useState();
    const [ sharePrice , setSharePrice ] = useState();
    const [ isLoading , setIsLoading ] = useState(false);
    const [ isError , setIsError ] = useState(false);
    const [ message , setMessage] = useState('');
    const { user } = useAuth0();

    useEffect( () => {
        console.log(user.sub);
        setIsLoading(true);
        setMessage('Fetching user details...');
		fetch(`http://localhost:8080/getUserDetails/${user.sub}`)
			.then(response => response.json())
			.then(async data => {
                console.log(data);
                if(data.user.isInfluencer){
                    setIsLoading(false);
                    setIsError(true);
                    setMessage("User is already an influencer");
                }
                setIsLoading(false);
			}).catch( err => {
                console.log(err);
                setIsLoading(false);
                setIsError(true);
                setMessage('User details could not be fetched');
            })
    },[])

	const handleSubmit = async (e) => {
		e.preventDefault();
        try{
            setIsLoading(true);
            setMessage('Creating ITO...')
            const accounts = await web3.eth.getAccounts();
            await contract.methods
                .ITO(shareCount, sharePrice, user.name)
                .send({
                    from: accounts[0],
                });
            setIsLoading(false);
            setIsError(true);
            setMessage('ITO has been Created');
        }catch(err){
            console.log(err);
            setIsLoading(false);
            setIsError(true);
            setMessage('Error in creating ITO , Try again :(');
        }
		setSharePrice('');
		setShareCount('');
	};

	if (isLoading) {
		return (
			<>
				<Spinner />
				<p>{message}</p>
			</>
		);
	}

	if (isError) {
		return <p>{message}</p>;
	}

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
                        <InputGroup>
                            <Form.Control
                                type="text"
                                placeholder="Enter Price per share"
                                value={sharePrice}
                                onChange={(event) => {setSharePrice(event.target.value)}}
                            />
                            <InputGroup.Text id="basic-addon2">Youth Tokens</InputGroup.Text>
                        </InputGroup>
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