import React, { useState } from 'react';
import { FormControl , Form , Button , Navbar , Nav , Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavBar({ setValue }){
    const [ inputValue , setInputValue ] = useState("");
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/trade');
        setValue(inputValue);
        setInputValue("");
    };
    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">YOUTHtube Stock Exchange</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="holdings">Holdings</Nav.Link>
                    <Nav.Link href="dashboard">Dashboard</Nav.Link>
                    <Nav.Link href="createITO">ITO</Nav.Link>
                </Nav>
                <Form
                    className="d-flex"
                >
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={inputValue}
                        onChange={(e)=>{
                            setInputValue(e.target.value);
                        }}
                    />
                    <Button
                        variant="outline-light"
                        onClick={handleSubmit}
                    >
                        Search
                    </Button>
                </Form>
            </Container>
        </Navbar>
    )
}
export default NavBar; 