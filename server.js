const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', err =>{
    console.log('UNCAUGHT EXCEPTION!!!   SHUTTING DOWN');
    console.log(err.name.replace,err.message);
    console.log(err);
    process.exit(1);
}) 


const app = require('./app');

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology:true
}).then(con =>{
    console.log('DB CONNECTION SUCCESFULL');
});   


const port = process.env.PORT || 3000;
const server = app.listen(port, () =>{
    console.log(`App running on port ${port}...`);
})    

process.on('unhandledRejection', err => {
    
    console.log('UNHANDLED REJECTION!!!   SHUTTING DOWN');
    console.log(err.name,err.message);
    server.close(() => {
        process.exit(1);
    })
        
})




