const mongoose = require('mongoose');

const url = "mongodb+srv://SatyamSrivastava:1234@cluster0.zd8w8z4.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
    // console.log(result);
})
.catch((err) => {
    console.log(err);
});

module.exports = mongoose;