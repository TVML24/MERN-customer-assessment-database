import React, { useState } from 'react';
import {useCustomerContext} from '../../utils/useCustomerContext';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';
import { UPDATE_CUSTOMER } from '../../utils/mutations';


export default function CustomerProfile() {
// prepare the usemutation
    const [updatecustomer, { error }] = useMutation(UPDATE_CUSTOMER);
// get the customerid from local storage
    const customerid = localStorage.getItem("customerid");
    const first = localStorage.getItem("first");
    const last = localStorage.getItem("last");
    const age = localStorage.getItem("age");
    const address = localStorage.getItem("address");
    const area = localStorage.getItem("area");
    const contactnumber = localStorage.getItem("contactnumber");
    const email = localStorage.getItem("email");
// handlers for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
// states for the form
    const [formState, setFormState] = useState({ first: first, last: last, age: age, area: area, address: address, contactnumber: contactnumber, email: email,});
//handlers for the form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    const handleSubmit = async (event) => {
        try {
            console.log(formState);
            const { data } = await updatecustomer({
              variables: { customerid, ...formState, 
                age:+formState.age,
                contactnumber:+formState.contactnumber,
             },
            });
            console.log(formState.area);
            localStorage.removeItem("first");
            localStorage.removeItem("last");
            localStorage.removeItem("age");
            localStorage.removeItem("area");
            localStorage.removeItem("address");
            localStorage.removeItem("contactnumber");
            localStorage.removeItem("email");
            localStorage.setItem("first", formState.first);
            localStorage.setItem("last", formState.last);
            localStorage.setItem("age", formState.age);
            localStorage.setItem("area", formState.area);
            localStorage.setItem("address", formState.address);
            localStorage.setItem("contactnumber", formState.contactnumber);
            localStorage.setItem("email", formState.email);
            console.log(formState)
            window.location.reload(false);
        } catch (e) {
            console.error(e);
        }
      
          // clear form values
          setFormState({ first: first, last: last, age: age, area: area, address: address, contactnumber: contactnumber, email: email,});
        };
      
    return (
        <div>
          {
              <section>
                <Container>
                <Row>
                  <h1>{last}, {first}</h1>
                  <Card style={{ width: '18rem' }}>
                        <Card.Header>Personal</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>First Name: {first} </ListGroup.Item>
                            <ListGroup.Item>Last Name: {last} </ListGroup.Item>
                            <ListGroup.Item>Age: {age} </ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Location</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Current Address: {address}</ListGroup.Item>
                            <ListGroup.Item>Area: {area}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    <Card style={{ width: '18rem' }}>
                        <Card.Header>Contact</Card.Header>
                        <ListGroup variant="flush">
                            <ListGroup.Item>Phone Number: {contactnumber}</ListGroup.Item>
                            <ListGroup.Item>Email Address: {email}</ListGroup.Item>
                        </ListGroup>
                    </Card>
                    </Row>
                    </Container>
                    <div className="mb-2">
                        <Button variant="primary" size="lg">Manage Customer Assets</Button>{' '}
                        <Button variant="primary" size="lg">Manage Customer Income</Button>{' '}
                        <Button variant="primary" size="lg" onClick={handleShow}>Update Customer Details</Button>{' '}
                        <Button variant="primary" size="lg">Test Customer Against Rule</Button>{' '}
                        <Button variant="primary" size="lg">Back to Search</Button>{' '}
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Customer Details</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="customerForm.ControlInput1">
                                        <Form.Label>First Name:</Form.Label>
                                        <Form.Control required type="first-name" placeholder="Enter the customerID or Family Name here!" 
                                            onChange={handleChange} value={formState.first} name='first'/>
                                        <Form.Control.Feedback type="invalid">Please enter the customer's First Name</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="customerForm.ControlInput2">
                                        <Form.Label>Last Name:</Form.Label>
                                        <Form.Control required type="last-name" placeholder="Enter the last name here" onChange={handleChange} value={formState.last} name='last'/>
                                        <Form.Control.Feedback type="invalid">Please enter the customer's last name</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="customerForm.ControlInput3">
                                        <Form.Label>Age:</Form.Label>
                                        <Form.Control required type="age" placeholder="Enter the age here" onChange={handleChange} value={formState.age} name='age'/>
                                        <Form.Control.Feedback type="invalid">Please enter the customer's age</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Area:</Form.Label>
                                        <Form.Select onChange={handleChange} value={formState.area} name='area'>
                                            <option></option>
                                            <option>SA</option>
                                            <option>WA</option>
                                            <option>VIC</option>
                                            <option>NT</option>
                                            <option>NSW</option>
                                            <option>QLD</option>
                                            <option>ACT</option>
                                            <option>TAS</option>
                                            <option>AUS</option>
                                            <option>Territories</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="customerForm.ControlInput5">
                                        <Form.Label>Address:</Form.Label>
                                        <Form.Control required type="address" placeholder="Enter the address here" onChange={handleChange} value={formState.address} name='address'/>
                                        <Form.Control.Feedback type="invalid">Please enter the customer's address</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="customerForm.ControlInput6">
                                        <Form.Label>Contact Phone Number:</Form.Label>
                                        <Form.Control required type="contact-number" placeholder="Enter the contact number here" onChange={handleChange} value={formState.contactnumber} name='contactnumber'/>
                                        <Form.Control.Feedback type="invalid">Please enter the customer's phone number</Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="customerForm.ControlInput7">
                                        <Form.Label>Email Address:</Form.Label>
                                        <Form.Control required type="email-address" placeholder="enter the email address here" onChange={handleChange} value={formState.email} name='email'/>
                                        <Form.Control.Feedback type="invalid">Please enter the customer's email address</Form.Control.Feedback>
                                    </Form.Group>
                                    </Form>
                            </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </section>
          }
        </div>
      );
}