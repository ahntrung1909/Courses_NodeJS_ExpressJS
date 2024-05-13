const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    app.use('/news', newsRouter);
    app.use('/courses', coursesRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
}

module.exports = route;

//định nghĩa route = .get
//req chứa thông tin của ứng dụng được gửi lên server. F12 -> Network -> Headers
// app.get('/', (req, res) => {
//     res.render('home')
// })

// app.get('/news', (req, res) => {
//     console.log(req.query.ab);
//     res.render('news')
// })

//query đã được tích hợp sẵn nên khi .query có thể hiện ra ngay
//còn với form data .body thì phải dùng dòng 17 để tích hợp
//Query Parameters .query
// app.get(`/search`, (req, res) => {
//     console.log(req.query.q); //query của req, q là tên mình có thể đặt
//     res.render('search')
// })

//Form Data .body
//Client -> Middleware -> Server. Middleware sẽ xử lý dữ liệu của .body vs qs npm để hiện ra dữ liệu
// app.post(`/search`, (req, res) => {
//     console.log(req.body);
//     res.send('')
// })
