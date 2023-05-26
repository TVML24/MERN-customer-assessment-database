import React from 'react';
import RuleList from '../components/RuleList/index';
import { RuleProvider } from '../utils/useRuleContext';

const ViewRules = () => {

  return (
    <main>
      <RuleProvider>
        <RuleList />
      </RuleProvider>
    </main>
  );
};

export default ViewRules;
