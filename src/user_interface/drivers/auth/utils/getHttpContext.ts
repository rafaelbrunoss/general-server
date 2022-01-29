import { Request } from 'express';
import { interfaces } from 'inversify-express-utils';

import { Principal } from '@user_interface/drivers/auth/models/principal';

/**
 * @Description as HttpContext is not properly injected into controller this is kind of
 * workaround which is done manually. Watch this issue as it could solve it https://github.com/inversify/inversify-express-utils/pull/253
 * Also take a look at this source https://stackoverflow.com/questions/54218295/inject-httpcontext-into-inversifyjs-middleware/54233115#54233115
 * and https://github.com/inversify/InversifyJS/issues/673
 */
export const getCurrentUser = (request: Request): Principal => {
  const httpContext: interfaces.HttpContext = Reflect.getMetadata(
    'inversify-express-utils:httpcontext',
    request,
  );
  return httpContext.user;
};
