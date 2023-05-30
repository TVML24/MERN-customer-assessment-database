import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_RULE = gql`
mutation AddRule($rulename: String!, $agemin: Int!, $agemax: Int!, $area: String!, $incomemax: Int!, $incomemin: Int!, $assetsmax: Int!, $assetsmin: Int!) {
  addRule(rulename: $rulename, agemin: $agemin, agemax: $agemax, area: $area, incomemax: $incomemax, incomemin: $incomemin, assetsmax: $assetsmax, assetsmin: $assetsmin) {
  rulename
    agemax
    agemin
    area
    assetsmax
    assetsmin
    incomemax
    incomemin
    _id
  }
}
`;

export const REMOVE_RULE = gql`
mutation DeleteRule($rulename: String!) {
  deleteRule(rulename: $rulename) {
    _id
    agemax
    agemin
    area
    assetsmax
    assetsmin
    incomemin
    incomemax
    rulename
  }
}
`

export const ADD_CUSTOMER = gql`
mutation AddCustomer($first: String!, $last: String!, $age: Int!, $area: String!, $address: String!, $contactnumber: Int!, $email: String!) {
  addCustomer(first: $first, last: $last, age: $age, area: $area, address: $address, contactnumber: $contactnumber, email: $email) {
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

export const UPDATE_CUSTOMER = gql`
mutation UpdateCustomer($customerid: ID!, $first: String!, $last: String!, $age: Int!, $area: String!, $address: String!, $contactnumber: Int!, $email: String!) {
  updateCustomer(customerid: $customerid, first: $first, last: $last, age: $age, area: $area, address: $address, contactnumber: $contactnumber, email: $email) {
    address
    age
    area
    contactnumber
    customerid
    email
    first
    last
  }
}`

export const VIEW_CUSTOMER = gql`
mutation ViewCustomer($customerid: ID!) {
  viewCustomer(customerid: $customerid) {
    address
    age
    area
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

export const ADD_ASSET = gql`
mutation AddAsset($type: String!, $startdate: Date!, $asxcode: String!, $unit: String!, $numberunits: Int!, $priceperunit: Int!, $customerid: ID!) {
  addAsset(type: $type, startdate: $startdate, asxcode: $asxcode, unit: $unit, numberunits: $numberunits, priceperunit: $priceperunit, customerid: $customerid) {
    _id
    asxcode
    customerid
    numberunits
    priceperunit
    startdate
    type
    unit
  }
}
`

export const REMOVE_ASSET = gql`
mutation DeleteAsset($_id: ID!, $customerid: ID!) {
  deleteAsset(_id: $_id, customerid: $customerid) {
    _id
    asxcode
    customerid
    numberunits
    priceperunit
    startdate
    type
    unit
  }
}
`
export const VIEW_RULE = gql`
mutation ViewRule($rulename: String!) {
  viewRule(rulename: $rulename) {
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
`

export const ADD_INCOME = gql`
mutation AddIncome($type: String!, $startdate: Date!, $incomesource: String!, $payfrequency: String!, $amount: Int!, $customerid: ID!) {
  addIncome(type: $type, startdate: $startdate, incomesource: $incomesource, payfrequency: $payfrequency, amount: $amount, customerid: $customerid) {
    _id
    amount
    customerid
    incomesource
    payfrequency
    startdate
    type
  }
}
`
export const REMOVE_INCOME = gql`
mutation DeleteIncome($_id: ID!, $customerid: ID!) {
  deleteIncome(_id: $_id, customerid: $customerid) {
    _id
    amount
    customerid
    incomesource
    payfrequency
    startdate
    type
  }
}
`