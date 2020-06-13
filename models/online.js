const mongoose = require('mongoose');

const {Schema} = mongoose;

const onlineSchema = new Schema(
    {
      name: {
        type: String
      },
      
        message: {
          type: String
        },
        gender: {
          type: String
        },
        age: {
          type: String
        },
        country: {
          type: String
        },
        study: {
          type: String
        },
        interests: {
          type: String
        }
       
      }
     
    
   
   
  );


module.exports = mongoose.model('onlineusers', onlineSchema);
