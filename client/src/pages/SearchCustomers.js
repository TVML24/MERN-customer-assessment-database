import React, { useState } from 'react';
import CustomerList from '../components/CustomerList';
import { CustomerProvider } from '../utils/useCustomerContext';

const SearchCustomers = () => {

  return (
    <main>
      <CustomerProvider>
        <CustomerList />
      </CustomerProvider>
    </main>
  );
};
export default SearchCustomers;
