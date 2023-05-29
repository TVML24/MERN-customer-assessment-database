import React, { useState, useEffect, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { VIEW_CUSTOMER, ADD_ASSET, REMOVE_ASSET } from '../utils/mutations';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import {useNavigate} from 'react-router-dom';

const AssetManagement = () => {
    // handlers for the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // states for the form
    const [formState, setFormState] = useState({ type: "", startdate: "", asxcode: "", unit: "", numberunits: "", priceperunit: "", });
    // states, effects, variables for the table
    const customerid = localStorage.getItem("customerid");
    const [viewcustomer, { error }] = useMutation(VIEW_CUSTOMER);
    const [addasset, { err }] = useMutation(ADD_ASSET);
    const [removeasset, { er }] = useMutation(REMOVE_ASSET);
    const [data, setData] = useState({ });
    const [ isLoading, setLoading ] = useState(true);
    
    useEffect(async () => {
        const result = await viewcustomer({
            variables: { customerid:customerid },
        })
        setData(result.data.viewCustomer.assets);
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
            const { datatwo } = await addasset({
            variables: { customerid, ...formState, 
                numberunits:+formState.numberunits,
                priceperunit:+formState.priceperunit,
            },
            });
            console.log(formState)
            window.location.reload(false);
        } catch (e) {
            console.error(e);
        }
    
      // clear form values
      setFormState({ type: "", startdate: "", asxcode: "", unit: "", numberunits: "", priceperunit: "", });
    };

    const handleDelete = async (_id) => {
        console.log(_id);
        console.log(customerid);
        try {
            const { removedAsset } = await removeasset({
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
        <h1>List of Assets belonging to Customer: </h1>  
        <section className="rule-list">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Asset Type</th>
                  <th>Date of Purchase</th>
                  <th>ASX code</th>
                  <th>Unit</th>
                  <th>Number of Units</th>
                  <th>Price per Unit</th>
                  <th>Delete this Asset</th>
                </tr>
              </thead>
              <tbody>
                {data.map((asset) => (
                  <tr key={asset._id}>
                    <td>{asset.type}</td>
                    <td>{asset.startdate}</td>
                    <td>{asset.asxcode}</td>
                    <td>{asset.unit}</td>
                    <td>{asset.numberunits}</td>
                    <td>{asset.priceperunit}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => handleDelete(asset._id)
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
        <Button variant="primary" onClick={handleShow}>Add a new Asset</Button>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add a new asset</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Type of Asset:</Form.Label>
                                <Form.Select onChange={handleChange} value={formState.type} name='type'>
                                    <option></option>
                                    <option>Savings Account</option>
                                    <option>Security</option>
                                    <option>Commodities</option>
                                    <option>Real Estate</option>
                                    <option>Misc</option>
                                </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assetForm.ControlInput1">
                            <Form.Label>Date of Purchase:</Form.Label>
                                <Form.Control required type="date" onChange={handleChange} value={formState.startdate} name='startdate'/>
                                <Form.Control.Feedback type="invalid">Please enter the date of purchase</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="assetForm.ControlInput2">
                            <Form.Label>ASX Code:</Form.Label>
                                <Form.Control required type="asx-code" placeholder="If not a security enter NA" onChange={handleChange} value={formState.asxcode} name='asxcode'/>
                                <Form.Control.Feedback type="invalid">Please enter the ASX Code or NA</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="assetForm.ControlInput3">
                                <Form.Label>Unit:</Form.Label>
                                <Form.Control required type="unit" placeholder="Enter the unit type here" onChange={handleChange} value={formState.unit} name='unit'/>
                                <Form.Control.Feedback type="invalid">Please enter the unit type</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="assetForm.ControlInput4">
                                <Form.Label>Number of Units:</Form.Label>
                                <Form.Control required type="number-units" placeholder="Enter the number of units here" onChange={handleChange} value={formState.numberunits} name='numberunits'/>
                                <Form.Control.Feedback type="invalid">Please enter the number of units</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="assetForm.ControlInput5">
                                <Form.Label>Price Per Unit:</Form.Label>
                                <Form.Control required type="price-per-unit" placeholder="enter the price per unit in whole dollars" onChange={handleChange} value={formState.priceperunit} name='priceperunit'/>
                                        <Form.Control.Feedback type="invalid">Please enter the price per unit of this asset</Form.Control.Feedback>
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
  export default AssetManagement;
  