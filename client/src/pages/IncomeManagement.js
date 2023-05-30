import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { VIEW_CUSTOMER, ADD_INCOME, REMOVE_INCOME } from '../utils/mutations';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';

const IncomeManagement = () => {
    // handlers for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // states for the form
    const [formState, setFormState] = useState({ type: "", startdate: "", incomesource: "", payfrequency: "", amount: "", });
    // states, effects, variables for the table
    const customerid = localStorage.getItem("customerid");
    const [viewcustomer, { error }] = useMutation(VIEW_CUSTOMER);
    const [addincome, { err }] = useMutation(ADD_INCOME);
    const [removeincome, { er }] = useMutation(REMOVE_INCOME);
    const [data, setData] = useState({ });
    const [ isLoading, setLoading ] = useState(true);
    
    useEffect(async () => {
        const result = await viewcustomer({
            variables: { customerid:customerid },
        })
        setData(result.data.viewCustomer.income);
        setLoading(false);
    }, []);
    
    //handlers for navigation
    const navigate = useNavigate();
    const navToProfile = useCallback(() => navigate('/customerprofile', {replace: true}), [navigate]);

    // handlers for the form
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
            const { datatwo } = await addincome({
            variables: { customerid, ...formState, 
                amount:+formState.amount,
            },
            });
            console.log(formState)
            window.location.reload(false);
        } catch (e) {
            console.error(e);
        }
    
      // clear form values
      setFormState({ type: "", startdate: "", incomesource: "", payfrequency: "", amount: "", });
    };

    const handleDelete = async (_id) => {
        console.log(_id);
        console.log(customerid);
        try {
            const { removedIncome } = await removeincome({
                variables: { customerid: customerid, _id: _id },
            })
        window.location.reload(false);
        } catch (e) {
            console.error(e);
        }
    }

    return (
      <main>
         { isLoading ? (
        <h1>Page is loading</h1>
         ) : (
        <>
        <h1>List of Regular Income for the Customer: </h1>  
        <section className="rule-list">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Income Type</th>
                  <th>Date of Commencement</th>
                  <th>Source of Income</th>
                  <th>Payment Frequency</th>
                  <th>Amount Paid</th>
                  <th>Delete Income Source</th>
                </tr>
              </thead>
              <tbody>
                {data.map((income) => (
                  <tr key={income._id}>
                    <td>{income.type}</td>
                    <td>{income.startdate}</td>
                    <td>{income.incomesource}</td>
                    <td>{income.payfrequency}</td>
                    <td>{income.amount}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(income._id)
                        }
                      >
                        <span role="img" aria-label="delete">
                          ✖️
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </section>
        </>
        )}
        <Button variant="secondary"onClick={navToProfile}>Back to Customer Overview</Button>
        <Button variant="primary" onClick={handleShow}>Add a new instance of Regular Income</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new instance of Regular Income</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Type of Income:</Form.Label>
                                <Form.Select onChange={handleChange} value={formState.type} name='type'>
                                    <option></option>
                                    <option>Employment</option>
                                    <option>Compensation</option>
                                    <option>Dividend</option>
                                    <option>Endowment</option>
                                    <option>Income Stream</option>
                                    <option>Misc</option>
                                </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="incomeForm.ControlInput1">
                            <Form.Label>Date of Commencement:</Form.Label>
                                <Form.Control required type="date" onChange={handleChange} value={formState.startdate} name='startdate'/>
                                <Form.Control.Feedback type="invalid">Please enter the date of commencement</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="incomeForm.ControlInput2">
                            <Form.Label>Source of Income:</Form.Label>
                                <Form.Control required type="income-source" placeholder="Enter the name of the business, company or trust" onChange={handleChange} value={formState.incomesource} name='incomesource'/>
                                <Form.Control.Feedback type="invalid">Please enter the payer of the income</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                            <Form.Label>Payment Frequency:</Form.Label>
                                <Form.Select onChange={handleChange} value={formState.payfrequency} name='payfrequency'>
                                    <option></option> 
                                    <option>fn</option>
                                    <option>ann</option>
                                </Form.Select>
                        </Form.Group>
                            <Form.Group className="mb-3" controlId="incomeForm.ControlInput3">
                                <Form.Label>Amount Paid:</Form.Label>
                                <Form.Control required type="amount-paid" placeholder="Enter regular amount of payment here" onChange={handleChange} value={formState.amount} name='amount'/>
                                <Form.Control.Feedback type="invalid">Please enter the regular amount paid</Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
    </main>
  )
}
  export default IncomeManagement;
  