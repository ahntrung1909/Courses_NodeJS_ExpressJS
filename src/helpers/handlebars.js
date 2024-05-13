const HandleBars = require('handlebars')

module.exports = {
    sum(a, b) {
        return a + b;
    },
    sortable(field, sort) {
        const sortType = field === sort.column ? sort.type : 'default'
        //kiểm tra xem bấm vào thg column nào truyền từ view sang f
        //vd: bấm vào column = name ở ngoài view, thì sortType sẽ bằng name
        //khi đó icon và type sẽ xét từ obj icons, types với sortType (=name) 
        //chỉ thay đổi thg name, còn những thg khác dùng default

        const icons = {
            default: `fa-solid fa-sort`,
            asc: `fa-solid fa-arrow-up`,
            desc: `fa-solid fa-arrow-down`,
        } //thay đổi theo url
        const icon = icons[sortType] //lấy biến từ _sort trả từ url hoặc view stored-courses 
        //và so sánh với icons vừa đặt ở trên

        //bấm vào thì ngược lại
        const types = {
            default: `desc`,
            asc: `desc`,
            desc: `asc`, 
        } 
        const type = types[sortType] 

        const href = HandleBars.escapeExpression(`?_sort&column=${field}&type=${type}`)

        const output = `<a href="${href}">
        <i class="${icon}"></i>
        </a>`

        return new HandleBars.SafeString(output)
    }
}