import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {useCustomerContext} from '../../utils/useCustomerContext'
import {useNavigate} from 'react-router-dom';

export default function CustomerList() {
    const navigate = useNavigate();
    const {data, SearchById, SearchByLast} = useCustomerContext();
    const [formState, setFormState] = useState({ input: "",});
    const [validated, setValidated] = useState(false);
    const [selectState, setSelectState] = useState("Search by CustomerID");
    const [dataState, setDataState] = useState({ customerid: "", last: "", })


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
            });
        if (selectState === "Search by CustomerID") {
            setDataState({
            ...dataState, 
            "customerid": value,
            });
        } else if (selectState === "Search by Customer's Family Name") {
            setDataState({
            ...dataState, 
            "last": value,
            });
        }
      };

    const handleChangeTwo = (event) => {
        const {name, value} = event.target;
        setSelectState(value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.stopPropagation();
        }
        setValidated(true);
        try {
            if (selectState === "Search by CustomerID") {
                console.log(dataState.customerid);
                const d = await SearchById(dataState.customerid);
                // window.location.reload(false);
            } else {
                console.log(dataState.last);
                const d = await SearchByLast(dataState.last);
                // window.location.reload(false);
            }
            navigate('/customerprofile', {replace: true});
        } catch (e) {
            console.error(e);
        }
      
          // clear form values
          setFormState({customerid: '',  last: '',});
          setDataState({customerid: '',  last: '',})
        };


    return (
      <div>
        {
            <section>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <h1>Search for the customer</h1>
                <Form.Group className="mb-3" controlId="customerForm.ControlInput5">
                    <Form.Label>CustomerID/Family Name:</Form.Label>
                    <Form.Control required type="input" placeholder="Enter the customerID or Family Name here!" onChange={handleChange} value={formState.input} name='input'/>
                    <Form.Control.Feedback type="invalid">Please enter the customer's ID or Family Name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Area:</Form.Label>
                    <Form.Select onChange={handleChangeTwo} value={selectState.select} name='select'>
                        <option></option>
                        <option>Search by CustomerID</option>
                        <option>Search by Customer's Family Name</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </section>
        }
      </div>
    );
  }
  