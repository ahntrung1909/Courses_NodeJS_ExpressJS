const Course = require('../models/Course');
const { multipleMongooseToObj } = require('../../util/mongoose');

class SiteControllers {
    //[GET] /
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                courses = multipleMongooseToObj(courses);
                res.render('home', { courses });
            }) //đẩy sang home.hbs bằng đối số thứ 2 {}
            .catch(next);
    }

    //[GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteControllers();

// res.render('home');

//PROMISE
// async index
// try {
//     const data = await Course.find({});
//     res.json(data);
// } catch (err) {
//     res.status(400).json({error: err});
// }
