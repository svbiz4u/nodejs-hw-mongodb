import {ContactCollection} from "../db/models/Contact.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);

export const addContact = payload => ContactCollection.create(payload);

export const deleteContactById = _id => ContactCollection.findOneAndDelete({_id});

export const updateContactById = async (_id, payload, options = {}) =>{
const result = await ContactCollection.findOneAndUpdate(
    { _id }, payload,  {new: true, includeResultMetadata: true, ...options}
);

if(!result || !result.value) return null;

return {
    data: result.value
};
};