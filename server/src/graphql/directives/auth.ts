import { SchemaDirectiveVisitor, AuthenticationError } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAuthorizedDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field): any {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const [, , { req }] = args;
      if (!req.user) {
        throw new AuthenticationError('No authorization');
      }
      return await resolve.apply(this, args);
    };
  }
}

export default IsAuthorizedDirective;
