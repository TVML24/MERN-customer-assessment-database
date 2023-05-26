import React, { createContext, useContext, useState } from 'react';
import { QUERY_RULES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import {REMOVE_RULE} from '../utils/mutations';

// Initialize new context for students
const RuleContext = createContext();

// We create a custom hook to provide immediate usage of the student context value (students) in other components
export const useRuleContext = () => useContext(RuleContext);

// The provider is responsible for creating our state, updating the state, and persisting values to the children
export const RuleProvider = ({ children }) => {
const { data, loading, error } = useQuery(QUERY_RULES);
const [removerule, { err }] = useMutation(REMOVE_RULE);

const removeRule = async (rulename) => {
    // Copy the content of the students array into our new list with the spread operator, then filter out the student that matches the `id` that was passed
    try {
        console.log(rulename);
        const { data } = await removerule({
            variables: { rulename:rulename },
        })
    window.location.reload(false);
    } catch (e) {
        console.error(e);
    }
  };

  // The value prop expects an initial state object
  return (
    <RuleContext.Provider
      value={{removeRule, data: data?.rules ? data.rules : []}}
    >
      {/* We render children in our component so that any descendent can access the value from the provider */}
      {children}
    </RuleContext.Provider>
  );
};
