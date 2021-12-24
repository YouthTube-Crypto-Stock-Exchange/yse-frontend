import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Table, Button, Modal, Card , Form , InputGroup, Alert } from 'react-bootstrap';
import Linechart from '../Linechart/Linechart';

const buy = "Buy Shares";
const sell = "Sell Shares";
const aggressive = "Aggresive Bid";
const normal = "Normal Bid";

const Trade = props => {
	const [pageFound, setPageFound] = useState(true);
	const [influencer, setInfluencer] = useState({});

    const [ action , setAction ] = useState(buy);
    const [ shareCount , setShareCount ] = useState();
    const [ sharePrice , setSharePrice ] = useState();
    const [ bidType , setBidType ] = useState(normal);

    const [ formErrors , setFormErrors ] = useState({});

	const searchValue = new URLSearchParams(props.location.search).get(
		'search'
	);
	const { user } = useAuth0();

	useEffect(() => {
		console.log(user);
        let path = 'http://localhost:8080/getInfluencerDetails/' + searchValue;
		fetch(path)
			.then(response => response.json())
			.then(data => {
                console.log(data);
				if (data.msg==='Influencer Not Found') setPageFound(false);
				else setPageFound(true);
			});
	}, [searchValue]);

    const findFormErrors = () => {
        const newErrors = {};
        if( !sharePrice || (bidType===normal && sharePrice<0) ) newErrors.sharePrice = 'Pice per share is a required field and should contain a positive value'
        if( !shareCount || shareCount<0 ) newErrors.shareCount = 'Number of shares is a required field and should contain a positive value'
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('running handleSubmit');
        setFormErrors(findFormErrors());
        if(Object.keys(formErrors).length==0){
            console.log("form is valid!!!");
        }
    }
	return (
		<>
			{pageFound ? (
				<Container>
					<Row>
						<Card.Title className='primary px-1 pt-2 text-center'>
							<h2>Name: {searchValue}</h2>
						</Card.Title>
						<Col>
							<Linechart />
						</Col>
						<Col>
							<Table hover className='text-center'>
								<thead>
									<tr>
										<th>Current Price</th>
										<th>Average Price</th>
										<th>Number of Shares</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<th>{influencer.curPrice}</th>
										<th>{influencer.averagePrice}</th>
										<th>{influencer.numShares}</th>
									</tr>
								</tbody>
							</Table>
						</Col>
					</Row>
					<br />
					<br />
					<Row className='align-items-center'>
                        <Container className="d-flex flex-column align-items-center">
                            <Card className="shadow w-50 mt-5">
                                <Card.Body className='px-5'>
                                    <Form>
                                        <div key={'inline-radio'} className="my-3">
                                        <Form.Check
                                            inline
                                            label="Buy Shares"
                                            name="group1"
                                            type="radio"
                                            onClick={()=>{setAction(buy);}}
                                            id='inline-radio-1'
                                        />
                                        <Form.Check
                                            inline
                                            label="Sell Shares"
                                            name="group1"
                                            type="radio"
                                            id='inline-radio-2'
                                            onClick={()=>{setAction(sell)}}
                                        />
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Container>
                        <Container className="d-flex flex-column align-items-center mb-5">
                            <Card className="shadow w-50 mt-5">
                                <Card.Header className='pt-3 pb d-flex flex-column align-items-center bg-dark text-white'>
                                    <h2><strong>{ action }</strong></h2>
                                </Card.Header>
                                <Card.Body className='px-5'>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3">
                                            <Form.Label><strong>Number of Shares</strong></Form.Label>
                                            <Form.Control
                                                type="number"
                                                placeholder="Enter the Number of Shares"
                                                value={shareCount}
                                                onChange={(event) => {setShareCount(event.target.value)}}
                                                isInvalid={!!formErrors.shareCount}
                                            />
                                            <Form.Control.Feedback type='invalid'>
                                                { formErrors.shareCount }
                                            </Form.Control.Feedback>
                                        </Form.Group>

                                        <div key={'inline-radio'} className="my-3">
                                        <Form.Check
                                            inline
                                            label={normal}
                                            name="group1"
                                            type="radio"
                                            id='inline-radio-1'
                                            onClick={() => {
                                                setBidType(normal)
                                                setSharePrice('');
                                            }}
                                        />
                                        <Form.Check
                                            inline
                                            label={aggressive}
                                            name="group1"
                                            type="radio"
                                            id='inline-radio-2'
                                            onClick={() => {
                                                setBidType(aggressive)
                                                setSharePrice(-1);
                                            }}
                                        />
                                        </div>

                                        <Form.Group className="mb-3">
                                            <Form.Label><strong>Price per share</strong></Form.Label>
                                            <InputGroup>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Enter Price per share"
                                                    value={(bidType===aggressive)?'':sharePrice}
                                                    onChange={(event) => {setSharePrice(event.target.value)}}
                                                    disabled={(bidType===aggressive)?true:false}
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
					</Row>
				</Container>
			) : (
                <Container className='mt-5'>
                <Alert variant='danger'>
                    Channel doesn't exists Please Try again
                </Alert>
                </Container>
			)}
		</>
	);
};
export default withRouter(Trade);
