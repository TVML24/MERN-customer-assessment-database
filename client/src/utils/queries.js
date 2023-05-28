import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;

export const QUERY_RULES = gql`
query Rules {
  rules {
    _id
    agemax
    agemin
    area
    assetsmax
    assetsmin
    incomemax
    incomemin
    rulename
  }
}
`;

export const QUERY_CUSTOMER_ID = gql`
query Query($customerid: ID!) {
  customer(customerid: $customerid) {
    first
    last
    address
    age
    assets {
      _id
      asxcode
      customerid
      numberunits
      priceperunit
      startdate
      type
      unit
    }
    area
    contactnumber
    customerid
    email
    income {
      _id
      amount
      customerid
      incomesource
      payfrequency
      startdate
      type
    }
  }
}
`

export const QUERY_CUSTOMER_NAME = gql`
query Customerbyname($last: String!) {
  customerbyname(last: $last) {
    address
    age
    area
    assets {
      _id
      asxcode
      numberunits
      customerid
      priceperunit
      startdate
      type
      unit
    }
    contactnumber
    customerid
    email
    first
    income {
      _id
      amount
      customerid
      incomesource
      payfrequency
      startdate
      type
    }
    last
  }
}
`
export const QUERY_CUSTOMERS = gql`
query Customers {
  customers {
    address
    age
    area
    contactnumber
    customerid
    email
    first
    last
  }
}
`