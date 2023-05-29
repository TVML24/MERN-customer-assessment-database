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
// update personal data loads a modal that uses the mutation to update the customer

    const SearchById = async (customerid) => {
        let filteredCustomer = data.customers.filter((customer) =>
            customer.customerid === customerid
        )
        localStorage.removeItem("customerid");
        localStorage.removeItem("first");
        localStorage.removeItem("last");
        localStorage.removeItem("age");
        localStorage.removeItem("area");
        localStorage.removeItem("address");
        localStorage.removeItem("contactnumber");
        localStorage.removeItem("email");
        localStorage.setItem("customerid", customerid);
        localStorage.setItem("first", filteredCustomer[0].first);
        localStorage.setItem("last", filteredCustomer[0].last);
        localStorage.setItem("age", filteredCustomer[0].age);
        localStorage.setItem("area", filteredCustomer[0].area);
        localStorage.setItem("address", filteredCustomer[0].address);
        localStorage.setItem("contactnumber", filteredCustomer[0].contactnumber);
        localStorage.setItem("email", filteredCustomer[0].email);
    };

    const SearchByLast = async (last) => {
        let filteredCustomer = data.customers.filter((customer) =>
            customer.last === last
        )
        localStorage.removeItem("customerid");
        localStorage.removeItem("first");
        localStorage.removeItem("last");
        localStorage.removeItem("age");
        localStorage.removeItem("area");
        localStorage.removeItem("address");
        localStorage.removeItem("contactnumber");
        localStorage.removeItem("email");
        localStorage.setItem("customerid", filteredCustomer[0].customerid);
        localStorage.setItem("first", filteredCustomer[0].first);
        localStorage.setItem("last", filteredCustomer[0].last);
        localStorage.setItem("age", filteredCustomer[0].age);
        localStorage.setItem("area", filteredCustomer[0].area);
        localStorage.setItem("address", filteredCustomer[0].address);
        localStorage.setItem("contactnumber", filteredCustomer[0].contactnumber);
        localStorage.setItem("email", filteredCustomer[0].email);
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