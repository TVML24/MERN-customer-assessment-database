import React, {useCallback} from 'react';
import Auth from '../utils/auth';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

const RulesHome = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/addrule', {replace: true}), [navigate]);
    const othHandleonClick = useCallback(() => navigate('/deleterule', {replace: true}), [navigate]);
    const anothHandleonClick = useCallback(() => navigate('/viewrules', {replace: true}), [navigate]);
    
    return (
        <main>
            <div className="bucket" >
              {Auth.loggedIn() ? (
                <>
                <Row>
                  <div style={{ width: 400 }} className="left-tile-rules" onClick={handleOnClick}>
                    Add a Rule
                  </div>
                  <div style={{ width: 400 }}className="centre-tile-rules" onClick={othHandleonClick}>
                    Delete a Rule
                    </div>
                    <div style={{ width: 400 }}className="right-tile-rules" onClick={anothHandleonClick}>
                    View Rules
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
