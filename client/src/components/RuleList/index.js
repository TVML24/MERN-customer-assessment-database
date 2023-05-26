import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import {useRuleContext} from '../../utils/useRuleContext'


export default function RuleList() {
  const {data, removeRule} = useRuleContext();
  return (
    <div>
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
                  <th>Delete Rule</th>
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
                        onClick={() => removeRule(rule.rulename)
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
      ) : (
        <span>No Rules Have been created!</span>
      )}
    </div>
  );
}
