import React, {useCallback} from 'react';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/Container';
import {useNavigate} from 'react-router-dom';

const RulesHome = () => {
    const navigate = useNavigate();
    const handleOnClick = useCallback(() => navigate('/addrule', {replace: true}), [navigate]);
    const anothHandleonClick = useCallback(() => navigate('/viewrules', {replace: true}), [navigate]);
    
    return (
        <main>
            <div className="bucket" >
              {Auth.loggedIn() ? (
                <>
                <Container>
                  <div style={{ width: 400 }} className="left-tile-rules tile" onClick={handleOnClick}>
                    Add a Rule
                  </div>
                    <div style={{ width: 400 }}className="right-tile-rules tile" onClick={anothHandleonClick}>
                    View Rules
                    </div>
                </Container>
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
