const Course = require('../models/Course');
const { multipleMongooseToObj, mongooseToObj } = require('../../util/mongoose');

class CoursesController {
    //[GET] /courses/:slug
    show(req, res, next) {
        //req.params.slug: lấy ra thằng đằng sau của ../course/(thg đc lấy ra),
        //slug là tên đặt trong router.get ở course.js
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObj(course),
                });
            })
            .catch(next);
    }

    //[GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    //[POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
        const course = new Course(req.body);
        course
            .save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    //     const course = new Course(req.body)
    //     course.save()
    //         .then(() => res.redirect('/'))
    //         .catch(next)

    //[GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then((course) =>
                res.render('courses/edit', {
                    course: mongooseToObj(course),
                }),
            )
            .catch(next);
    }

    //[PUT] /courses/:id
    update(req, res, next) {
        const newVideoId = req.body.videoId;
        const newImage = `https://img.youtube.com/vi/${newVideoId}/sddefault.jpg`;

        // Sử dụng $set để chỉ định rằng chúng ta chỉ muốn cập nhật các trường được chỉ định
        // (trong trường hợp này là videoId và image).
        // Tùy chọn { new: true } được sử dụng để trả về tài liệu đã được cập nhật,
        // thay vì tài liệu trước khi được cập nhật.
        Course.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { ...req.body, videoId: newVideoId, image: newImage } },
            { new: true },
        )
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }
    // update(req, res, next) {
    //     Course.updateOne({ _id: req.params.id }, req.body)
    //         .then(() => res.redirect('/me/stored/courses'))
    //         .catch(next)
    // }

    //[DELETE] /courses/:id
    destroy(req, res, next) {
        Course.delete({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE] /courses/:id/force
    forceDestroy(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => res.redirect('back'))
            .catch(next);
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                Course.delete({ _id: { $in: req.body.courseIds } }) //đọc doc mongodb $in
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'restore':
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            case 'delete-permenantly':
                Course.deleteOne({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect('back'))
                    .catch(next);
                break;
            default:
                res.json({ msg: 'Action is invalid' });
        }
    }
}

module.exports = new CoursesController();

// const Course = new Course({
//     name: req.body.name,
//     description: req.body.description,
//     videoId: req.body.videoId,
// })
// await Course.save()
