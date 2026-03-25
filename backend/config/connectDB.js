const mongoose = require('mongoose');

function connectDatabase(app){
    mongoose.connect(process.env.MONGODB_URI).then(() => {
        console.log("Database connected successfully !");

        app.listen(process.env.PORT, () => {
            console.log("Server running on PORT " + process.env.PORT);
        });
        
    }).catch((err) => console.log("An error occured : " + err.message));
}

module.exports = {connectDatabase};

