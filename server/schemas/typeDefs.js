const { gql } = require('apollo-server-express');
const { DateScalar, TimeScalar, DateTimeScalar } = require ('graphql-date-scalars');

const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Rule {
    _id: ID
    rulename: String
    agemin: Int
    agemax: Int
    area: String
    incomemax: Int
    incomemin: Int
    assetsmax: Int
    assetsmin: Int
  }

  type Customer {
    customerid: ID
    first: String
    last: String
    age: Int
    area: String
    address: String
    contactnumber: Int
    assets: [Asset]
    income: [Income]
    email: String
  }

  type Asset {
    _id: ID
    type: String
    startdate: Date
    asxcode: String
    unit: String
    numberunits: Int
    priceperunit: Int
    customerid: ID
  }

  type Income {
    _id: ID
    type: String
    startdate: Date
    incomesource: String
    payfrequency: String
    amount: Int
    customerid: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    rules: [Rule]
    rule(rulename: String!): Rule
    customers: [Customer]
    customer(customerid: ID!): Customer
    customerbyname(last: String!): Customer
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    viewCustomer(customerid: ID!): Customer
    viewRule(rulename: String!): Rule
    addRule(rulename: String!, agemin: Int!, agemax: Int!, area: String!, incomemax: Int!, incomemin: Int!, assetsmax: Int!, assetsmin: Int!): Rule
    deleteRule(rulename: String!): Rule
    addCustomer(first: String!, last: String!, age: Int!, area: String!, address: String!, contactnumber: Int!, email: String!): Customer
    deleteCustomer(customerid: ID!): Customer
    updateCustomer(customerid: ID!, first: String!, last: String!, age: Int!, area: String!, address: String!, contactnumber: Int!, email: String!): Customer
    addAsset(type: String!, startdate: Date!, asxcode: String!, unit: String!, numberunits: Int!, priceperunit: Int!, customerid: ID!): Asset
    deleteAsset(_id: ID!, customerid: ID!): Asset
    updateAsset(_id: ID!, type: String!, startdate: Date!, asxcode: String!, unit: String!, numberunits: Int!, priceperunit: Int!, customerid: ID!): Asset
    addIncome(type: String!, startdate: Date!, incomesource: String!, payfrequency: String!, amount: Int!, customerid: ID!): Income
    deleteIncome(_id: ID!, customerid: ID!): Income
    updateIncome(_id: ID!, type: String!, startdate: Date!, incomesource: String!, payfrequency: String!, amount: Int!, customerid: ID!): Income
  }
`;

module.exports = typeDefs;

// testAgainstRule(customerid: ID!, rulename: String!): Customer