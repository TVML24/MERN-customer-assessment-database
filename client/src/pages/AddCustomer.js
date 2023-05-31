import React, { useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { ADD_CUSTOMER }from '../../src/utils/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const [formState, setFormState] = useState({ first: '', last: '', age: '', area: '', address: '', contactnumber: '', email: '',});
    const [addcustomer, { error }] = useMutation(ADD_CUSTOMER);
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();
    const navBack = useCallback(() => navigate('/customerhome', {replace: true}), [navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
          ...formState,
          [name]: value,
        });
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        setValidated(true);
        try {
            console.log(formState)
            const { data } = await addcustomer({
              variables: { ...formState, 
                age:+formState.age,
                contactnumber:+formState.contactnumber,
             },
            });
            window.location.reload(true);
        } catch (e) {
            console.error(e);
        }
      
          // clear form values
          setFormState({ first: '', last: '', age: '', area: '', address: '', contactnumber: '', email: '', });
        };
  return (
    <main>
        <div>  
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Enter the details for the new customer</h1>
                <Form.Group className="mb-3" controlId="customerForm.ControlInput1">
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control required type="first-name" placeholder="Enter the first name here" onChange={handleChange} value={formState.first} name='first'/>
                    <Form.Control.Feedback type="invalid">Please enter the customer's first name</Form.Control.Feedback>
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
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Button variant="secondary" onClick={navBack}>Go Back</Button>
            </Form>
        </div>  
    </main>
  );
};

export default AddCustomer;
