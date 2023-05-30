import React, {useCallback} from 'react';
import Auth from '../utils/auth';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';

const Home = () => {

  const navigate = useNavigate();
  const handleOnClick = useCallback(() => navigate('/ruleshome', {replace: true}), [navigate]);
  const othHandleonClick = useCallback(() => navigate('/customerhome', {replace: true}), [navigate]);

  return (
    <main className='main-bucket'>
        <div className="bucket" >
          {Auth.loggedIn() ? (
            <>
            <Container>
              <div style={{ width: 400 }} className="left-tile-home tile" onClick={handleOnClick}>
                Manage Rules
              </div>
              <div style={{ width: 400 }}className="right-tile-home tile" onClick={othHandleonClick}>
                Manage Customers</div>
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

export default Home;
