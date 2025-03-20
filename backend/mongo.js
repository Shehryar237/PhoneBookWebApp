const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://241605237:${password}@cluster0.hqwue.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})
    const Contact = mongoose.model('Contact', contactSchema)
    const contact = new Contact({
    name: `${name}`,
    number: `${number}`,
    })

    if(process.argv.length<=3){
        if (process.argv.length<=3){
            Contact.find({}).then(result => {
                result.forEach(contact => {
                  console.log(contact)
                })
                mongoose.connection.close()
              })
        }
    }
    else{
        contact.save().then(result => {
        console.log(`added ${name} number ${number} to phonebook!`)
        mongoose.connection.close()
        })
    }
