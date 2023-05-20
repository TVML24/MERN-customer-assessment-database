const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
  }

  type Rule {
    _id: ID
    rulename: String
    agemin: Number
    agemax: Number
    area: String
    incomemax: Number
    incomemin: Number
    assetsmax: Number
    assetsmin: Number
  }

  type Customer {
    customerid: ObjectId
    first: String
    last: String
    age: Number
    area: String
    address: String
    contactnumber: Number
    email: String
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
    customer(customerid: ObjectId!): Customer
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addRule(rulename: String!, agemin: Number!, agemax: Number!, area: String!, incomemax: Number!, incomemin: Number!, assetsmax: Number!, assetsmin: Number!)
    deleteRule(rulename: String!)
    addCustomer(first: String!, last: String!, age: Number!, area, String!, address: String!, contactnumber: Number!, email: String!)
    deleteCustomer(customerId!)
    updateCustomer(customerid: customerId!, first: String!, last: String!, age: Number!, area, String!, address: String!, contactnumber: Number!, email: String!)
  }
`;

module.exports = typeDefs;
