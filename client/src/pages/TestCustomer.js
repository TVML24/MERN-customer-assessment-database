import React from 'react';
import { RuleProvider } from '../utils/useRuleContext';
import Tester from '../components/Tester';

const RuleTester = () => {

    return (
      <main>
      <RuleProvider>
        <Tester />
      </RuleProvider>
      </main>
    );
  };
  
  export default RuleTester;