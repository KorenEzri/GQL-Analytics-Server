import { GraphQLScalarType } from 'graphql';
import { analyzeDataByKeywords } from '../analytics/analyze';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  parseValue(value: string | number | Date) {
    return new Date(value);
  },
  serialize(value: { toISOString: () => any }) {
    return value.toISOString();
  },
});
export const ThreatenMeResolvers = {
  Date: dateScalar,
  Query: {
    test: async () => {
      console.log('TEST PASSED!');
      return 'OK!';
    },
    updatechecked: async () => {
      await analyzeDataByKeywords();
    },
  },
};
