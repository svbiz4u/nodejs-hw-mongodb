// import { model, Schema } from 'mongoose';

// const contactsSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: false,
//     },
//     isFavorite: {
//       type: Boolean,
//       required: true,
//       default: false,
//     },
//     contactType: {
//       type: String,
//       required: true,
//       enum: ['work', 'home', 'personal'],
//       default: 'personal',
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   },
// );

// export const ContactsCollection = model('contacts', contactsSchema);



import { Schema, model } from 'mongoose';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
  },
  { versionKey: false, timestamps: true },
);

const ContactCollection = model('contact', contactSchema);

export default ContactCollection;