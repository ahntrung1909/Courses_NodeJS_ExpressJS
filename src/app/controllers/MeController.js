const Course = require('../models/Course');
const { multipleMongooseToObj, mongooseToObj } = require('../../util/mongoose');

class MeController {
    //[GET] /me/stored/courses
    storedCourses(req, res, next) {

        Promise.all([Course.find({}).sortable(req), //BƯỚC 2
            Course.countDocumentsDeleted()]
        )
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObj(courses),
                });
            })
            .catch(next);

        // Course.countDocumentsDeleted()
        //     .then((deletedCount) => {
        //         console.log(deletedCount);
        //     })
        //     .catch(next)

        // Course.find({})
        //     .then(courses => res.render('me/stored-courses', {
        //         courses: multipleMongooseToObj(courses)
        //     }))
        //     .catch(next)
    }
    //[GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObj(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController();
