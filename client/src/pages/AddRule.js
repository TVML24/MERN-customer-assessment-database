import React, { useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useMutation } from '@apollo/client';
import { ADD_RULE } from '../utils/mutations';
import {useNavigate} from 'react-router-dom';

const AddRule = () => {
    const [formState, setFormState] = useState({ rulename: '', agemin: '', agemax: '', area: '', incomemin: '', incomemax: '', assetsmin: '', assetsmax: '',});
    const [addrule, { error }] = useMutation(ADD_RULE);
    const [validated, setValidated] = useState(false);

    const navigate = useNavigate();
    const navBack = useCallback(() => navigate('/ruleshome', {replace: true}), [navigate]);

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
            const { data } = await addrule({
              variables: { ...formState, 
                agemin:+formState.agemin,
                agemax:+formState.agemax,
                incomemin:+formState.incomemin,
                incomemax:+formState.incomemax,
                assetsmin:+formState.assetsmin,
                assetsmax:+formState.assetsmax
             },
            });
            window.location.reload(false);
        } catch (e) {
            console.error(e);
        }
      
          // clear form values
          setFormState({ rulename: '', agemin: '', agemax: '', area: '', incomemin: '', incomemax: '', assetsmin: '', assetsmax: '',});
        };
      
  return (
    <main >
        <div>  
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <h1>Define your new rule</h1>
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput1">
                    <Form.Label>Rule Name:</Form.Label>
                    <Form.Control required type="rule-name" placeholder="enter the name here" onChange={handleChange} value={formState.rulename} name='rulename'/>
                    <Form.Control.Feedback type="invalid">Please give the rule a name</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput2">
                    <Form.Label>Minumum Age Restriction:</Form.Label>
                    <Form.Control required type="minimum-age" placeholder="enter the minimum age here" onChange={handleChange} value={formState.agemin} name='agemin'/>
                    <Form.Control.Feedback type="invalid">Please enter the minimum age</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput3">
                    <Form.Label>Maximum Age Restriction:</Form.Label>
                    <Form.Control required type="maximum-age" placeholder="enter the maximum age here" onChange={handleChange} value={formState.agemax} name='agemax'/>
                    <Form.Control.Feedback type="invalid">Please enter the maximum age</Form.Control.Feedback>
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
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput5">
                    <Form.Label>Minimum Income:</Form.Label>
                    <Form.Control required type="minimum-income" placeholder="enter the minimum income here" onChange={handleChange} value={formState.incomemin} name='incomemin'/>
                    <Form.Control.Feedback type="invalid">Please enter the minimum income</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput6">
                    <Form.Label>Maximum Income:</Form.Label>
                    <Form.Control required type="maximum-income" placeholder="enter the income threshold here" onChange={handleChange} value={formState.incomemax} name='incomemax'/>
                    <Form.Control.Feedback type="invalid">Please enter the maximum income</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput7">
                    <Form.Label>Minimum Asset Value:</Form.Label>
                    <Form.Control required type="minimum-asset" placeholder="enter the minimum asset value here" onChange={handleChange} value={formState.assetsmin} name='assetsmin'/>
                    <Form.Control.Feedback type="invalid">Please enter the minimum asset value</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="ruleForm.ControlInput8">
                    <Form.Label>Maximum Asset Value:</Form.Label>
                    <Form.Control required type="maximum-asset" placeholder="enter the asset threshold here" onChange={handleChange} value={formState.assetsmax} name='assetsmax'/>
                    <Form.Control.Feedback type="invalid">Please enter the maximum asset value</Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <Button variant="secondary" onClick={navBack}>Go Back</Button>
            </Form>
        </div>  
    </main>
  );
};

export default AddRule;
