import React, {useCallback} from 'react';
import Auth from '../utils/auth';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

const RulesHome = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/addcustomer', {replace: true}), [navigate]);
    const othHandleonClick = useCallback(() => navigate('/searchcustomers', {replace: true}), [navigate]);
    
    return (
        <main>
            <div className="bucket" >
              {Auth.loggedIn() ? (
                <>
                <Row>
                  <div style={{ width: 400 }} className="left-tile-customer" onClick={handleOnClick}>
                    Add a Customer
                  </div>
                  <div style={{ width: 400 }}className="right-tile-customer" onClick={othHandleonClick}>
                    Search for a Customer
                    </div>
                </Row>
                </>
              ) : (
                <>
                  <h1 id="login-warning">You must be logged in to access the Database</h1>
                </>
              )}
            </div>
        </main>
      );
    };

export default RulesHome;
