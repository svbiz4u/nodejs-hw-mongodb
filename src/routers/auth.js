import { Router } from 'express';

// import * as authControllers from '../controllers/auth.js';
import { loginController, logoutController, refreshSessionController, registerController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { userLoginSchema, userRegisterSchema } from '../validation/auth.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userRegisterSchema),
  ctrlWrapper(registerController),
);

authRouter.post(
  '/login',
  validateBody(userLoginSchema),
  ctrlWrapper(loginController),
);

authRouter.post(
  '/refresh',
  ctrlWrapper(refreshSessionController),
);

authRouter.post('/logout', ctrlWrapper(logoutController));

export default authRouter;