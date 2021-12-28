import { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { Container, Row, Col, Table, Button, Modal, Card , Form , InputGroup, Alert } from 'react-bootstrap';
import Linechart from '../Linechart/Linechart';

//alert variants
const info = 'info';
const warning = 'warning';
const success = 'success';
const danger = 'danger';

const buy = "Buy Shares";
const sell = "Sell Shares";
const aggressive = "Aggresive Bid";
const normal = "Normal Bid";

const Trade = props => {
	const [influencer, setInfluencer] = useState({});

    const [ action , setAction ] = useState('');
    const [ shareCount , setShareCount ] = useState();
    const [ sharePrice , setSharePrice ] = useState();
    const [ bidType , setBidType ] = useState(normal);

    const [ isError , setIsError ] = useState(false);
    const [ message , setMessage ] = useState('');
    const [ alertVariant , setAlertVariant ] = useState('info');

    const [ formErrors , setFormErrors ] = useState({});

	const searchValue = new URLSearchParams(props.location.search).get(
		'search'
	);
	const { user } = useAuth0();

	useEffect(() => {
        let path = 'http://localhost:8080/getInfluencerDetails/' + searchValue;
		fetch(path)
			.then(response => response.json())
			.then(data => {
				if (data.msg==='Influencer Not Found'){
                    setIsError(true);
                    setAlertVariant(danger);
                    setMessage(data.msg);
                }else{
                    for(let i = 0; i < data.influencer.sharePriceHistory.length; i++) {
                        data.influencer.sharePriceHistory[i].atDateTime = new Date(data.influencer.sharePriceHistory[i].atDateTime).toLocaleString();
                    }
                    setInfluencer(data.influencer);
                }
			})
            .catch( (err) => {
                console.log(err);
                setIsError(true);
                setAlertVariant(danger);
                setMessage("Some Error occurred in getting Influencer details, please try again later :(");
            });
	}, [searchValue]);

    const findFormErrors = () => {
        const newErrors = {};
        if( !sharePrice || typeof(sharePrice)==='string' || (bidType===normal && sharePrice<0) || !Number.isInteger(sharePrice)){
            newErrors.sharePrice = 'Price per share is a required field and should contain a positive value'
        }
        if( !shareCount || typeof(shareCount)==='string' || shareCount<0 || !Number.isInteger(shareCount)){
            newErrors.shareCount = 'Number of shares is a required field and should contain a positive value'
        }
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = findFormErrors();
        setFormErrors(newErrors);
        if(Object.keys(newErrors).length===0){
            if(action===buy){
                let data = {
                    "influencerId":influencer.id,
                    "influencerName":influencer.name,
                    "maxBuyPrice":sharePrice,
                    "numShares":shareCount,
                    "userId":user.sub,
                };
                fetch('http://localhost:8080/buyShares', { method: "POST", body: JSON.stringify(data),
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        if(json.msg==='done'){
                            setIsError(true);
                            setMessage('Request made successfully, You can look at the status of the request in the Orders section');
                            setAlertVariant(success);
                        }else{
                            setIsError(true);
                            setMessage(json.msg);
                            setAlertVariant(danger);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        setIsError(true);
                        setMessage('Some error occurred when communicating to the server, Please try again later');
                        setAlertVariant(danger);
                    });
            }else if(action===sell){
                let data = {
                    "influencerId":influencer.id,
                    "influencerName":influencer.name,
                    "minSellPrice":sharePrice,
                    "numShares":shareCount,
                    "userId":user.sub,
                };
                fetch('http://localhost:8080/sellShares', {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {"Content-type": "application/json; charset=UTF-8"}
                    })
                    .then(response => response.json()) 
                    .then(json => {
                        if(json.msg==='done'){
                            setIsError(true);
                            setMessage('Request made successfully, You can look at the status of the request in the Orders section');
                            setAlertVariant(success);
                        }else{
                            setIsError(true);
                            setMessage(json.msg);
                            setAlertVariant(danger);
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        setIsError(true);
                        setMessage('Some error occurred when communicating to the server, Please try again later');
                        setAlertVariant(danger);
                    });
            }
        }
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

	return (
		<>
            <Container>
                <Row>
                    <Card.Title className='primary px-1 pt-2 text-center'>
                        <h2>Name: {searchValue}</h2>
                    </Card.Title>
                    <Col>
                        {influencer.sharePriceHistory !== undefined ? 
                            <Linechart data={influencer.sharePriceHistory} /> 
                        : null}
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
                                            onChange={(event) => {setShareCount(parseInt(event.target.value))}}
                                            isInvalid={!!formErrors.shareCount}
                                            disabled={action.length === 0}
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
                                        disabled={action.length === 0}
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
                                        disabled={action.length === 0}
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
                                                onChange={(event) => {setSharePrice(parseInt(event.target.value))}}
                                                disabled={action.length !== 0 ? bidType===aggressive : true}
                                                isInvalid={!!formErrors.sharePrice}
                                            />
                                            <InputGroup.Text id="basic-addon2">Youth Tokens</InputGroup.Text>
                                            <Form.Control.Feedback type='invalid'>
                                                { formErrors.sharePrice }
                                            </Form.Control.Feedback>
                                        </InputGroup>
                                    </Form.Group>
                                    <div className='d-flex flex-column align-items-center'>
                                    <Button variant="primary" type="submit" disabled={action.length === 0}>
                                        Submit
                                    </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </Row>
            </Container>
		</>
	);
};
export default withRouter(Trade);
