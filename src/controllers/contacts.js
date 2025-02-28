import createHttpError from 'http-errors';

// import { addContact, deleteContact, getContact, getContacts, updateContact } from '../services/contacts.js';

import * as contactsServices from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  filter.userId = userId;

   const data = await contactsServices.getContacts(
      {
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
      }

    );

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data,
    });
  };

  export const getContactByIdController = async (req, res, next) => {
  //   const {contactId} = req.params;
  //   const { _id: userId } = req.user;
  //  const data = await contactsServices.getContact({ contactId, userId });

  const {contactId} = req.params;
  const data = await contactsServices.getContactById(contactId);

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
// const data = await addContact(req.body);
const { _id: userId } = req.user;
  const data = await contactsServices.addContact({ ...req.body, userId });


res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data,
});
  };

export const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    // const result = await updateContactById(contactId, req.body);
  const { _id: userId } = req.user;
  const result = await contactsServices.updateContact(
    { _id: contactId, userId },
    req.body,
  );

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
  // const data = await deleteContactById(contactId);
  const { _id: userId } = req.user;
  const data = await contactsServices.deleteContact({ _id: contactId, userId });
  
  if(!data) {
      next( createHttpError(404, 'Contact not found'));
      return;
  };
  
  res.status(204).send();
  };