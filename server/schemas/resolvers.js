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
      return Customer.find().populate('assets').populate('income');
    },
    customer: async (parent, { customerid }) => {
      const customer = Customer.findOne({ customerid: customerid }).populate(['assets', 'income']);
      return customer;
    },
    customerbyname: async (parent, { last }) => {
      const customer = Customer.findOne({ last: last }).populate(['assets', 'income']);
      return customer;
    }
  },

  Mutation: {
    //works
    addIncome: async (parent, { customerid, type, startdate, incomesource, payfrequency, amount }) => {
      const income = await Income.create({ type, startdate, incomesource, payfrequency, amount, customerid });
      const customer = await Customer.findOneAndUpdate({ customerid: customerid }, { $push: { income: income._id }}).populate('income');
      return income;
    },
    //works
    deleteIncome: async (parent, { _id, customerid }) => {
      const income = await Income.findOneAndDelete({ _id: _id });
      const customer = await Customer.findOneAndUpdate({ customerid: customerid }, { $pull: { income: _id }}).populate('income');
      return income;
    },
    //works
    updateIncome: async (parent, { _id, customerid, type, startdate, incomesource, payfrequency, amount }) => {
      const customerintitial = await Customer.findOneAndUpdate({ customerid:customerid }, { $pull: { income: _id }});
      const income = await Income.findOneAndUpdate({ _id: _id },
        {type: type, startdate: startdate, incomesource: incomesource, payfrequency: payfrequency, amount: amount, customerid: customerid},
        {new: true});
      const customerupdated = await Customer.findOneAndUpdate({customerid:customerid }, { $push: { income: _id }  });
      return income;
    },
    //works
    addAsset: async (parent, { customerid, type, startdate, asxcode, unit, numberunits, priceperunit }) => {
      const asset = await Asset.create({ type, startdate, asxcode, unit, numberunits, priceperunit, customerid });
      const customer = await Customer.findOneAndUpdate({ customerid: customerid }, { $push: { assets: asset._id }}).populate('assets');
      return asset;
    },
    //works
    deleteAsset: async (parent, {_id, customerid }) => {
      const asset = await Asset.findOneAndDelete({ _id: _id });
      const customer = await Customer.findOneAndUpdate({ customerid: customerid }, { $pull: { income: asset._id }}).populate('assets');
      return asset;
    },
    //works
    updateAsset: async (parent, { _id, customerid, type, startdate, asxcode, unit, numberunits, priceperunit}) => {
      const customerintitial = await Customer.findOneAndUpdate( { customerid:customerid }, { $pull: { asset: _id } });
      const asset = await Asset.findOneAndUpdate({ _id: _id }, 
        { _id:_id, customerid:customerid, type:type, startdate: startdate, asxcode:asxcode, unit:unit, numberunits:numberunits, priceperunit:priceperunit },
        {new: true});
      const customerupdated = await Customer.findOneAndUpdate( { customerid:customerid }, { $push: { asset: _id } });
      return asset;
    },
    //works
    addCustomer: async (parent, { first, last, age, area, address, contactnumber, email }) => {
      const customer = await Customer.create({ first, last, age, area, address, contactnumber, email });
      return customer;
    },
    //works
    updateCustomer: async (parent, { customerid, first, last, age, area, address, contactnumber, email }) => {
      const customer = await Customer.findOneAndUpdate({ customerid: customerid }, 
        {first: first, last:last, age:age, area:area, address:address, contactnumber: contactnumber, email: email},
        {new: true});
        return customer;
    },
    //works
    deleteCustomer: async (parent, { customerid }) => {
      const customer = await Customer.findOneAndDelete({ customerid: customerid });
      return customer;
    },
    //works
    addRule: async (parent, { rulename, agemin, agemax, area, incomemax, incomemin, assetsmax, assetsmin }) => {
      const rule = await Rule.create({ rulename, agemin, agemax, area, incomemax, incomemin, assetsmax, assetsmin });
      return rule;
    },
    //works
    deleteRule : async (parent, { rulename: rulename }) => {
      const rule = await Rule.findOneAndDelete({ rulename });
      return rule;
    },
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    viewCustomer: async (parent, { customerid }) => {
      const customer = Customer.findOne({ customerid: customerid }).populate(['assets', 'income']);
      return customer;
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
