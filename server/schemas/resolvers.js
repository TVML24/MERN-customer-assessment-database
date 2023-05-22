const { AuthenticationError } = require('apollo-server-express');
const { User, Rule, Customer, Asset, Income } = require('../models');
const { signToken } = require('../utils/auth');
const { DateScalar, TimeScalar, DateTimeScalar } = require ('graphql-date-scalars');

const resolvers = {
  Date: DateScalar,
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
      return Rule.findOne({ rulename: rulename });
    },
    customers: async () => {
      return Customer.find().populate('assets');
    },
    customer: async (parent, { customerid }) => {
      return Customer.findOne({ customerid: customerid }).populate('assets');
    },
  },

  Mutation: {
    addIncome: async (parent, { customerid, type, startdate, incomesource, payfrequency, amount }) => {
      const income = await Income.create({ type, startdate, incomesource, payfrequency, amount, customerid });
      const customer = await Customer.findOne({ customerid: customerid }).populate('income');
      return { income, customer };
    },
    deleteIncome: async (parent, { incomeid, customerid }) => {
      const income = await Income.findOneAndDelete({ incomeid: incomeid });
      const customer = await Customer.findOne({ customerid: customerid }).populate('income');
      return { income, customer };
    },
    updateIncome: async (parent, { incomeid, customerid }) => {
      const income = await Income.findOneAndUpdate({ incomeid: incomeid },
        {type: type, startdate: startdate, incomesource: incomesource, payfrequency: payfrequency, amount: amount, customerid: customerid},
        {new: true});
      const customer = await Customer.findOne({ customerid: customerid }).populate('income');
    },
    addAsset: async (parent, { customerid, type, startdate, asxcode, unit, numberunits, priceperunit }) => {
      const asset = await Asset.create({ type, startdate, asxcode, unit, numberunits, priceperunit, customerid });
      const customer = await Customer.findOne({ customerid: customerid }).populate('assets');
      return { asset, customer };
    },
    deleteAsset: async (parent, { assetid, customerid }) => {
      const asset = await Asset.findOneAndDelete({ assetid: assetid });
      const customer = await Customer.findOne({ customerid: customerid }).populate('assets');
      return { asset, customer };
    },
    updateAsset: async (parent, { assetid, customerid, type, startdate, asxcode, unit, numberunits, priceperunit}) => {
      const asset = await Asset.findOneAndUpdate({ assetid: assetid }, 
        { assetid:assetid, customerid:customerid, type:type, startdate: startdate, asxcode:asxcode, unit:unit, numberunits:numberunits, priceperunit:priceperunit },
        {new: true});
      const customer = await Customer.findOne({ customerid: customerid }).populate('assets');
      return { asset, customer };
    },
    addCustomer: async (parent, { first, last, age, area, address, contactnumber, email }) => {
      const customer = await Customer.create({ first, last, age, area, address, contactnumber, email });
      return customer;
    },
    updateCustomer: async (parent, { customerid, first, last, age, area, address, contactnumber, email }) => {
      const customer = await Customer.findOneAndUpdate({ customerid: customerid }, 
        {first: first, last:last, age:age, area:area, address:address, contactnumber: contactnumber, email: email},
        {new: true});
        return customer;
    },
    deleteCustomer: async (parent, { customerid }) => {
      const customer = await Customer.findOneAndDelete({ customerid: customerid });
      return customer;
    },
    addRule: async (parent, { rulename, agemin, agemax, area, incomemax, incomemin, assetsmax, assetsmin }) => {
      const rule = await Rule.create({ rulename, agemin, agemax, area, incomemax, incomemin, assetsmax, assetsmin });
      return rule;
    },
    deleteRule : async (parent, { rulename: rulename }) => {
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
