import {ContactCollection} from "../db/models/Contact.js";

import { calcPaginationData } from '../utils/calcPaginationData.js';

export const getContacts =  async ({
page = 1,
perPage = 10,
sortBy = '_id',
sortOrder = 'asc',
filter = {},
}) => {
const limit = perPage;
const skip = (page - 1) * perPage;

const contactsQuery = ContactCollection.find();

if (filter.type) {
  contactsQuery.where('contactType').equals(filter.type);
}
if (filter.isFavourite) {
  contactsQuery.where('isFavourite').equals(filter.isFavourite);
}
if (filter.userId) {
  contactsQuery.where('userId').eq(filter.userId);
}

const [count, data] = await Promise.all([
  ContactCollection.find(contactsQuery).countDocuments(),
  contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec(),
]);

const paginationData = calcPaginationData(count, perPage, page);

return {
  data,
  ...paginationData,
};
};

// export const getContactById = (id) => ContactCollection.findById(id);

export const getContact = (filter) => ContactCollection.findOne(filter);


export const addContact = (payload) => ContactCollection.create(payload);

// export const deleteContactById = (_id) => ContactCollection.findOneAndDelete({_id});

export const deleteContact = (filter) =>  ContactCollection.findOneAndDelete(filter);

// export const updateContactById = async (_id, payload, options = {}) =>{
// const result = await ContactCollection.findOneAndUpdate(
//     { _id }, payload,  {new: true, includeResultMetadata: true, ...options}
// );

export const updateContact = async (filter, payload, options = {}) => {
  const result = await ContactCollection.findOneAndUpdate(filter, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });


if(!result || !result.value) return null;

return {
    data: result.value,
};
};






