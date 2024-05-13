const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

async function connect() {
    try {
        await mongoose
            .connect('mongodb://localhost:27017/f8_blog_dev')
            .then(() => console.log('Connected!'));
    } catch (err) {
        console.log('Failed!');
    }
}

module.exports = { connect };
