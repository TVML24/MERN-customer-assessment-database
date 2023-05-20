const { AuthenticationError } = require('apollo-server-express');
const { User, Rule, Customer } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    rules: async () => {
      return Rule.find();
    },
    rule: async (parent, { rulename }) => {
      return Rule.findOne({ rulename });
    },
    customers: async () => {
      return Customer.find();
    },
    customer: async (parent, { customerId }) => {
      return Customer.findOne({ customerId });
    },
  },

  Mutation: {
    addCustomer: async (parent, { first, last, age, area, address, contactnumber, email }) => {
      const customer = await Customer.create({ first, last, age, area, address, contactnumber, email });
      return customer;
    },
    updateCustomer: async (parent, { customerId, first, last, age, area, address, contactnumber, email }) => {
      const customer = await Customer.findOneAndUpdate({ customerId: customerId }, 
        {first: first, last:last, age:age, area:area, address:address, contactnumber: contactnumber, email: email},
        {new: true});
        return customer;
    },
    deleteCustomer: async (parent, { customerId }) => {
      const customer = await Customer.findOneAndDelete({ customerId: customerId });
      return customer;
    },
    addRule: async (parent, { rulename, agemin, agemax, area, incomemax, incomemin, assetsmax, assetsmin }) => {
      const rule = await Rule.create({ rulename, agemin, agemax, area, incomemax, incomemin, assetsmax, assetsmin });
      return rule;
    },
    deleteRule : async (parent, { rulename }) => {
      const rule = await Rule.findOneAndDelete({ rulename });
      return rule;
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
