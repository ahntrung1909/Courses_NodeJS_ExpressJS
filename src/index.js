// import { join } from 'path';
// import express from 'express'; //import thư viện bằng require
// import morgan from 'morgan';
// import { engine } from 'express-handlebars';
//express sử dụng body parse npm

const path = require('path');
const express = require('express'); //import thư viện bằng require
const morgan = require('morgan');
const handleBars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express(); //trả lại 1 cái instance (đối tượng để xây dựng website)
const port = 3001; //cổng
const SortMiddleware = require('./app/middleware/SortMiddleware')

const route = require('./routes');
const db = require('./config/db');

//Connect DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
//__dirname trong trg hợp này là: E:\1. Cá nhân\Web\F8\blog\src

app.use(
    express.urlencoded({
        extended: true,
    }),
); //form html
app.use(express.json()); //từ code js vd: XMLHttpRequest, fetch, axios,...

app.use(methodOverride('_method'));

//Custom Middleware
app.use(SortMiddleware)

//HTTP Logger
// app.use(morgan('combined'))

//Middleware: thực chất là những callback function với đối số thứ nhất là path,
//từ đối số thứ 2 là middleware
app.get(
    '/middleware',
    function (req, res, next) {
        //bác bảo vệ 1 <=> validation
        if (['vethuong', 'vevip'].includes(req.query.ve)) {
            req.face = '///////!!'; //thay đổi, chỉnh sửa
            return next();
        }
        res.status(403).json({ msg: 'Access Denied' }); //không cho vào
    },
    function (req, res, next) {
        //bác bảo vệ 2 <=> validation
        res.json({
            msg: 'MIDDLEWARE',
            face: req.face,
        }); //cho vào
    },
);
//Nhà ======================> Bác bảo vệ 1 (middleware 1) : Bác bảo vệ 2 (middleware 2) : Sự kiện
// Thứ tự của các middleware
// Viết ở path nào thì SẼ CHỈ CÓ TÁC DỤNG Ở path đó
//Nhà <====================== Sự kiện

//Template engine
app.engine(
    'hbs',
    handleBars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
