import React from 'react';
import { CustomerProvider } from '../utils/useCustomerContext';
import CustomerProfile from '../components/CustomerProfile';

const CustomerPersonalProfile = () => {

    return (
      <main>
        <CustomerProvider>
          <CustomerProfile />
        </CustomerProvider>
      </main>
    );
  };
  
  export default CustomerPersonalProfile;