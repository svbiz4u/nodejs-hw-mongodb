import { Router } from 'express';

// import * as authControllers from '../controllers/auth.js';
import { loginController, logoutController, refreshSessionController, registerController, resetPasswordController, sendResetEmailController } from '../controllers/auth.js';

import { validateBody } from '../middlewares/validateBody.js';

import { resetPasswordSchema, sendResetEmailSchema, userLoginSchema, userRegisterSchema } from '../validation/auth.js';

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


authRouter.post(
  '/send-reset-email',
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController),
);

authRouter.post(
  '/reset-password',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default authRouter;