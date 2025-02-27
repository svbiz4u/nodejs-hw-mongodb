import { Router } from "express";

import {getContactsController, 
    getContactByIdController,
     addContactController,
      updateContactController,
       deleteContactController} 
       from '../controllers/contacts.js';

       
import { validateBody } from '../middlewares/validateBody.js';       
import { isValidId } from "../middlewares/isValidId.js";
import { authenticate } from "../middlewares/authenticate.js";


import { contactAddSchema, contactUpdateSchema } from '../validation/contacts.js';

import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getContactsController) );

contactsRouter.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController) );

contactsRouter.post('/', validateBody(contactAddSchema), ctrlWrapper(addContactController));

contactsRouter.patch('/:contactId',isValidId, validateBody(contactUpdateSchema), ctrlWrapper(updateContactController));

contactsRouter.delete('/:contactId',isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;