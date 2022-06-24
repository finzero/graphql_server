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

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve() {
        return userData;
      },
    },
    getUserByName: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parents, args) {
        const user = userData.find(
          (user) =>
            [user.first_name, user.last_name]
              .join(' ')
              .toLowerCase()
              .indexOf(args.name.toLowerCase()) !== -1
        );
        return user;
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
