import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import web3 from '../../web3';
import { Form , Button, Card, Container , InputGroup , Alert } from "react-bootstrap";
import Spinner from '../Spinner/Spinner';
import contract from '../../contract';

const info = 'info';
const warning = 'warning';
const success = 'success';
const danger = 'danger';

const Ito = () => {
    const [ shareCount , setShareCount ] = useState('');
    const [ sharePrice , setSharePrice ] = useState('');
    const [ isLoading , setIsLoading ] = useState(false);
    const [ isError , setIsError ] = useState(false);
    const [ message , setMessage] = useState('');
    const [ formErrors , setFormErrors ] = useState({});
    const [ alertVariant , setAlertVariant ] = useState(info);
    const { user } = useAuth0();

    useEffect( () => {
        setIsLoading(true);
        setAlertVariant(warning);
        setMessage('Fetching user details...');
		fetch(`http://localhost:8080/getUserDetails/${user.sub}`)
			.then(response => response.json())
			.then(async data => {
                if(data.user.isInfluencer){
                    setIsLoading(false);
                    setIsError(true);
                    setAlertVariant(info)
                    setMessage("User is already an influencer");
                }
                setIsLoading(false);
			}).catch( err => {
                console.log(err);
                setIsLoading(false);
                setIsError(true);
                setAlertVariant(danger);
                setMessage('User details could not be fetched');
            })
    },[])

    const findFormErrors = () => {
        const newErrors = {};
        if( !shareCount || typeof(shareCount)==='string' || shareCount<0 || !Number.isInteger(shareCount)){
            newErrors.shareCount = 'Number of shares is a required field and should contain a positive integer'
        }
        if( !sharePrice || typeof(sharePrice)==='string' || sharePrice<0 || !Number.isInteger(sharePrice)){
            newErrors.sharePrice = 'Pice per share is a required field and should contain a positive integer'
        }
        return newErrors;
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
        let newErrors = findFormErrors();
        setFormErrors(newErrors);
        if(Object.keys(newErrors).length==0){
            try{
                setIsLoading(true);
                setMessage('Creating ITO...')
                setAlertVariant(warning);
                const accounts = await web3.eth.getAccounts();
                await contract.methods
                    .ITO(shareCount, sharePrice, user.sub)
                    .send({
                        from: accounts[0],
                    });
                setIsLoading(false);
                setIsError(true);
                setAlertVariant(success);
                setMessage('ITO has been Created');
                setSharePrice('');
                setShareCount('');
            }catch(err){
                console.log(err);
                setIsLoading(false);
                setIsError(true);
                setMessage('Error in creating ITO , Try again :(');
                setAlertVariant(danger);
            }
        }
	};

	if (isLoading) {
		return (
			<>
				<Spinner />
                <Container className='mt-5'>
                <Alert variant={alertVariant}>
                    <p>{message}</p>
                </Alert>
                </Container>
			</>
		);
	}

	if (isError) {
		return <>
            <Container className='mt-5'>
            <Alert variant={alertVariant}>
                <p>{message}</p>
            </Alert>
            </Container>
        </>
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
                            type="number"
                            placeholder="Enter the Number of Shares"
                            value={shareCount}
                            onChange={(event) => {setShareCount(parseInt(event.target.value))}}
                            isInvalid={!!formErrors.shareCount}
                        />
                        <Form.Control.Feedback type='invalid'>
                            { formErrors.shareCount }
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label><strong>Price per share</strong></Form.Label>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                placeholder="Enter Price per share"
                                value={sharePrice}
                                onChange={(event) => {setSharePrice(parseInt(event.target.value))}}
                                isInvalid={!!formErrors.sharePrice}
                            />
                            <InputGroup.Text id="basic-addon2">Youth Tokens</InputGroup.Text>
                            <Form.Control.Feedback type='invalid'>
                                { formErrors.sharePrice }
                            </Form.Control.Feedback>
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