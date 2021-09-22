const mongoose = require("mongoose");

const connection = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(process.env.DATABASE_ACCESS, connectionParams);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        console.log("Could not connect to database");
    }
};

module.exports = connection;