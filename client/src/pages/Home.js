import React, {useCallback} from 'react';
import Auth from '../utils/auth';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

const Home = () => {

  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate('/ruleshome', {replace: true}), [navigate]);
  const othHandleonClick = useCallback(() => navigate('/customerhome', {replace: true}), [navigate]);

  return (
    <main>
        <div className="bucket" >
          {Auth.loggedIn() ? (
            <>
            <Row>
              <div style={{ width: 400 }} className="left-tile-home" onClick={handleOnClick}>
                Manage Rules
              </div>
              <div style={{ width: 400 }}className="right-tile-home" onClick={othHandleonClick}>
                Manage Customers</div>
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

export default Home;
