const { gql } = require('apollo-server-express');

export const ThreatenMeTypeDefs = gql`
  scalar Date
  type Query {
    test: String
    updatechecked: String
  }
`;
