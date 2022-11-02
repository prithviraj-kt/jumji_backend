const express = require('express');
const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.json({extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', require( './Routes/Registration/Signup'));
app.use('/', require( './Routes/Registration/Login'));

// app.use('/', require("./Routes/profile"))
// app.use('/', require("./Routes/electives"))
// app.use('/', require("./Routes/edit"))
// app.use('/', require("./Routes/subjects"))
// app.use('/', require("./Routes/hod"))

const URL = 'mongodb://localhost:27017/OSNIL'

const PORT = process.env.PORT || '8000';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => { 
    app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
}).catch((error) => {
    console.log('Error:', error.message)
})