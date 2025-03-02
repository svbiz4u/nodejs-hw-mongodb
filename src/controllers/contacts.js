import createHttpError from 'http-errors';

import * as contactsServices from '../services/contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

import { saveFileToUploadsDir } from '../utils/saveFileToUploadDir.js';
import { getEnvVar } from '../utils/getEnvVar.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

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
//   const data = await contactsServices.getContactById(contactId);

const { contactId: _id } = req.params;
const { _id: userId } = req.user;
const data = await contactsServices.getContact({ _id, userId });
if (!data) {

  //    next ( createHttpError(404, 'Contact not found'));

  next(createHttpError(404, `Contact not found contact with id ${_id}!`));
  return;
}
res.json({
  status: 200,

  // message: `Successfully found contact with id ${contactId}!`
  message: `Successfully found contact with id ${_id}!`,
  data,
});
};

  export const addContactController = async (req, res) => {
// const data = await addContact(req.body);
const { _id: userId } = req.user;
const photo = req.file;

  let photoUrl;

  if (photo) {
    // if (env('ENABLE_CLOUDINARY') === 'true') {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadsDir(photo);
    }
  }
  // const data = await contactsServices.addContact({ ...req.body, userId });
  const data = await contactsServices.addContact({
    ...req.body,
    photo: photoUrl,
    userId,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const updateContactController = async (req, res, next) => {
    const { contactId } = req.params;
    // const result = await updateContactById(contactId, req.body);
  const { _id: userId } = req.user;
  const photo = req.file;

  let photoUrl;

  if (photo) {

    // if (env('ENABLE_CLOUDINARY') === 'true') {
      if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {

      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadsDir(photo);
    }
  }

  const result = await contactsServices.updateContact(
    { _id: contactId, userId },
    // req.body,
    {
      ...req.body,
      photo: photoUrl,
    },
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