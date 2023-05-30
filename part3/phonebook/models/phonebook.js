const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const url =
  `${process.env.MONGODB_URI}`
console.log('connecting to', url)
mongoose.set('strictQuery',false)
mongoose.connect(url).then(() => {    console.log('connected to MongoDB')  })  .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: (v) => /^\d{2}-\d{6,}|\d{3}-\d{5,}|(?<!-)\d{8,}$/.test(v),
      message: (props) => `\`${props.value}\` is not a valid phone number.`,
    },
    minlength: 8,
    required: true,
  },
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Phonebook', phonebookSchema)