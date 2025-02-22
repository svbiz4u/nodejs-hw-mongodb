// import { ContactsCollection } from '../db/models/Contact.js';


// export const getAllContacts = async () => {
//   const contacts = await ContactsCollection.find();
//   return contacts;
// };

// export const getContactById = async (contactId) => {
//   const contact = await ContactsCollection.findById(contactId);
//   return contact;
// };


// import ContactCollection from "../db/models/Contact.js";
import {ContactCollection} from "../db/models/Contact.js";


export const getContacts = () => ContactCollection.find();

export const getContactById = id => ContactCollection.findById(id);