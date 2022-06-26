const userData = require('../MOCK_DATA.json');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLObject,
  GraphQLList,
} = require('graphql');
const graphql = require('graphql');
const UserType = require('./TypeDefs/UserType');
const UserTypeList = require('./TypeDefs/UserTypeList');

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: {
      type: UserTypeList,
      args: {
        limit: { type: GraphQLInt },
        page: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let data = [...userData];
        if (args.limit) {
          const start = (args.page - 1) * args.limit;
          data = data.splice(start, args.limit);
        }
        const totalRecord = userData.length;
        const meta = {
          pageCount: Math.ceil(totalRecord / args.limit),
          totalRecord,
        };
        return { data, meta };
      },
    },
    getUserById: {
      type: UserType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parents, args) {
        return userData.find((user) => user.id === args.id);
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        gender: { type: GraphQLString },
        email: { type: GraphQLString },
        ip_address: { type: GraphQLString },
      },
      resolve(parents, args) {
        const { first_name, last_name, gender, email, ip_address } = args;
        userData.push({
          id: userData[userData.length - 1].id + 1,
          first_name,
          last_name,
          gender,
          email,
          ip_address,
        });
        return args;
      },
    },
    updateUser: {
      type: new GraphQLList(UserType),
      args: {
        id: { type: GraphQLInt },
        first_name: { type: GraphQLString },
        last_name: { type: GraphQLString },
        gender: { type: GraphQLString },
        email: { type: GraphQLString },
        ip_address: { type: GraphQLString },
      },
      resolve(parents, args) {
        const userIdx = userData.findIndex((user) => user.id === args.id);
        const { first_name, last_name, gender, email, ip_address } = args;
        userData[userIdx] = { ...args };
        return userData;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
