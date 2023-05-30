import React, { useCallback } from 'react';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {useRuleContext} from '../../utils/useRuleContext';
import { useMutation } from '@apollo/client';
import { VIEW_CUSTOMER, VIEW_RULE } from '../../utils/mutations';
import {useNavigate} from 'react-router-dom';

export default function Tester() {
    const customerid = localStorage.getItem("customerid");
    const [viewcustomer, { error }] = useMutation(VIEW_CUSTOMER);
    const [viewrule, { err }] = useMutation(VIEW_RULE);
 
    const navigate = useNavigate();
    const navToProfile = useCallback(() => navigate('/customerprofile', {replace: true}), [navigate]);

    const testCustomer = async (rulename) => {
        try {
            const testData = await viewcustomer({
                variables: { customerid: customerid },
            })
            const ruleData = await viewrule({
                variables: { rulename: rulename },
            })
            const assetSum = testData.data.viewCustomer.assets.reduce(function(acc, val) { 
                return acc + (val.numberunits*val.priceperunit); 
            }, 0);

            const incomeSum = testData.data.viewCustomer.income.reduce(function(acc, val) { 
                if (val.payfrequency == "fn") {
                    return acc + (val.amount*26); 
                } else {
                    return acc + (val.amount);
                }
            }, 0);
            if (ruleData.data.viewRule.area !== "AUS") {
                if (incomeSum < ruleData.data.viewRule.incomemax && incomeSum >= ruleData.data.viewRule.incomemin 
                    && assetSum < ruleData.data.viewRule.assetsmax && assetSum >= ruleData.data.viewRule.assetsmin
                    && testData.data.viewCustomer.age > ruleData.data.viewRule.agemin && testData.data.viewCustomer.age < ruleData.data.viewRule.agemax
                    && ruleData.data.viewRule.area === testData.data.viewCustomer.area) {
                        const displayDiv = document.getElementById("display-heading").textContent= "Customer is eligible for " + ruleData.data.viewRule.rulename;
                        const secondDiv = document.getElementById("secondary-heading").textContent= "Customer Total Income: $" + incomeSum + " p.a, " + "Customer Total Assets: $" + assetSum;  
                    } else {
                        const displayDiv = document.getElementById("display-heading").textContent= "Customer is not eligible for " + ruleData.data.viewRule.rulename;
                        const secondDiv = document.getElementById("secondary-heading").textContent= "Customer Total Income: $" + incomeSum + " p.a, " + "Customer Total Assets: $" + assetSum; 
                    }
            } else if (incomeSum < ruleData.data.viewRule.incomemax && incomeSum >= ruleData.data.viewRule.incomemin 
                && assetSum < ruleData.data.viewRule.assetsmax && assetSum >= ruleData.data.viewRule.assetsmin
                && testData.data.viewCustomer.age > ruleData.data.viewRule.agemin && testData.data.viewCustomer.age < ruleData.data.viewRule.agemax) {
                const displayDiv = document.getElementById("display-heading").textContent= "Customer is eligible for " + ruleData.data.viewRule.rulename;
                const secondDiv = document.getElementById("secondary-heading").textContent= "Customer Total Income: $" + incomeSum + " p.a, " + "Customer Total Assets: $" + assetSum; 
            } else {
                const displayDiv = document.getElementById("display-heading").textContent= "Customer is not eligible for " + ruleData.data.viewRule.rulename;
                const secondDiv = document.getElementById("secondary-heading").textContent= "Customer Total Income: $" + incomeSum + " p.a, " + "Customer Total Assets: $" + assetSum; 
            }
        } catch (e) {
            console.error(e);
        }
      };

  const {data, removeRule} = useRuleContext();
  return (
    <div>
        <Row>
            <Button variant="primary" size="lg" onClick={navToProfile}>Return to Customer</Button>
        </Row>
      {data ? (
        <>
          <section className="rule-list">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Rule Name</th>
                  <th>Minimum Age</th>
                  <th>Maximum Age</th>
                  <th>Area</th>
                  <th>Minimum Income</th>
                  <th>Maximum Income</th>
                  <th>Minimum Asset Value</th>
                  <th>Maximum Asset Value</th>
                  <th>Test Rule</th>
                </tr>
              </thead>

              <tbody>
                {data.map((rule) => (
                  <tr key={rule.rulename}>
                    <td>{rule.rulename}</td>
                    <td>{rule.agemin}</td>
                    <td>{rule.agemax}</td>
                    <td>{rule.area}</td>
                    <td>{rule.incomemin}</td>
                    <td>{rule.incomemax}</td>
                    <td>{rule.assetsmin}</td>
                    <td>{rule.assetsmax}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => testCustomer(rule.rulename)
                        }
                      >
                        <span role="img">
                          ✖️
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <h1 id= "display-heading"></h1>
            <h2 id= "secondary-heading"></h2>
          </section>
        </>
      ) : (
        <span>No Rules Have been created!</span>
      )}
    </div>
  );
}
