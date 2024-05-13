module.exports = {
    multipleMongooseToObj: function (mongooses) {
        return mongooses.map((item) => item.toObject());
    },
    mongooseToObj: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
