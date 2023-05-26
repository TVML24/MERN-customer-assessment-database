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