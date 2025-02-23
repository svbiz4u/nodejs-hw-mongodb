import createHttpError from 'http-errors';

import { addContact, deleteContactById, getContactById, getContacts, updateContactById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
    const data = await getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  };

  export const getContactByIdController = async (req, res, next) => {
    const {contactId} = req.params;
    const data = await getContactById(contactId);

   if(!data) {
   next ( createHttpError(404, 'Contact not found'));
   return;
 }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data,
    }

    );
  };

  export const addContactController = async (req, res) => {
const data = await addContact(req.body);

res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
});
  };

export const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
      }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result,
    });
};

export const deleteContactController = async (req, res, next) =>{
  const {contactId} = req.params;
  const data = await deleteContactById(contactId);
  
  if(!data) {
      next( createHttpError(404, 'Contact not found'));
      return;
  };
  
  res.status(204).send();
  };