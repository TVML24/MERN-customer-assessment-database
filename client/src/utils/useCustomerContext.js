import React, { createContext, useContext } from 'react';
import { QUERY_CUSTOMERS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const CustomerContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useCustomerContext = () => useContext(CustomerContext);

// The provider is responsible for creating our state, updating the state, and persisting values to the children
export const CustomerProvider = ({ children }) => {
    const { data, loading, error } = useQuery(QUERY_CUSTOMERS);

// these functions push the customers info into local storage
// they then send the page on to customerprofile.js (pending)
// that page uses local storage to build the page, then clears local storage
// four buttons: manage income, manage assets, test against rule, update personal data
    const SearchById = async (customerid) => {
        let filteredCustomer = data.customers.filter((customer) =>
            customer.customerid === customerid
        )
    console.log(filteredCustomer);
    };

    const SearchByLast = async (last) => {
        let filteredCustomer = data.customers.filter((customer) =>
            customer.last === last
        )
    console.log(filteredCustomer);
    };

    return (
        <CustomerContext.Provider
          value={{SearchById, SearchByLast,}}
        >
          {/* We render children in our component so that any descendent can access the value from the provider */}
          {children}
        </CustomerContext.Provider>
      );
}