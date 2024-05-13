const express = require('express');
const router = express.Router();
const coursesController = require('../app/controllers/CoursesController');

router.get(
    '/create',
    // function(req, res, next) {
    //     if (req.query.ve === 'vip') {
    //         return next()
    //     }
    //     res.status(403).json({msg: "Access Denied"})
    // },
    coursesController.create,
);
router.post('/store', coursesController.store);
router.post('/handle-form-actions', coursesController.handleFormActions);
router.get('/:id/edit', coursesController.edit);
router.put('/:id', coursesController.update);
router.patch('/:id/restore', coursesController.restore);
router.delete('/:id', coursesController.destroy);
router.delete('/:id/force', coursesController.forceDestroy);
router.get('/:slug', coursesController.show);

module.exports = router;

// delete
//data-toggle, data-target để khi bấm vào btn thì sẽ hiện modal 9:35
//truyền id vào btn xóa của mỗi thg 19:14
//đặt 1 biến ID ở ngoài, lấy ra id của từng khóa khi bấm vào mỗi nút xóa, truyền id đó vào ID ở ngoài 26:35
// tạo 1 form hidden, dùng 1 f để gán action của f đó = /courses/id?method="DELETE"
//giải thích 34:00
