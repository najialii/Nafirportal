require('dotenv').config()
const express = require('express')

const mongoose = require('mongoose');
//creates express 
const mentorsessions = require('./routes/mentorSessions')       
const menreq = require('./routes/menSesReq')       
const userRoutes = require('./routes/userRoutes')       
const app = express()
const cors = require('cors')

app.use(cors());


//middlewear
app.use(express.json())
app.use((req ,res , next) => {
    console.log('middlewear excuated')
        console.log(req.path, req.method)
      next()
}) 


// routes
app.use('/api/mentorsessions',mentorsessions)
app.use("/api/requestsession", menreq);
app.use("/api/user", userRoutes);


// connnect to DB 
mongoose.connect(
    process.env.MONGO_URI
).then(() => {
    console.log('connnected to server ')
    
app.listen(process.env.PORT, () => {
    console.log('server is running on  the port ', process.env.PORT)
})

}).catch((error) => {
    console.error('something went wrong ', error)
}
)


