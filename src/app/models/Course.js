const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');
const autoIncrement = require('mongoose-sequence')(mongoose);

const CourseSchema = new Schema(
    {
        _id: {type: Number},
        name: { type: String, required: true, maxLength: 255 },
        description: { type: String },
        image: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        videoId: { type: String },
        // createAt: {type: Date, default: Date.now, },
        // updatedAt: {type: Date, default: Date.now, },
    },
    {
        _id: false,
        timestamps: true,
    },
);

//Custom query helpers
CourseSchema.query.sortable = function (req) {
    if(req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type)
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc'
        })
    }
    return this
}


//ADD PLUGINS
mongoose.plugin(slug);

//Auto Increment
CourseSchema.plugin(autoIncrement);
CourseSchema.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Course', CourseSchema);

//AUTO INCREMENT
//vào mongodb xem bảng counters, xem đang tăng trường gì, xem seq = bnhieu, gtri của seq là thg trc đó và ++ lên 
//reference_value: tăng vào bảng nào với trường nào
