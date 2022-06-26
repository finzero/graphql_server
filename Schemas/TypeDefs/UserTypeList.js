const { GraphQLObjectType, GraphQLInt, GraphQLList } = require('graphql');
const UserType = require('./UserType');

const UserTypeList = new GraphQLObjectType({
  name: 'users',
  fields: () => ({
    data: { type: new GraphQLList(UserType) },
    meta: {
      type: new GraphQLObjectType({
        name: 'pagination',
        fields: () => ({
          pageCount: { type: GraphQLInt },
          totalRecord: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

module.exports = UserTypeList;
