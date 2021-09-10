const whois = require('whois')
const whoisHandler = require('./function/whoisParser')
const express = require('express')
// var bodyParser = require('body-parser')
let url = 'google.com'
const path = require('path')
// 引擎模板
// var template = require('art-template');
const PORT = process.env.PORT || 3000

// express 服务器设置
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// 模板引擎设置
app.engine('art', require('express-art-template'))
// app.set('views', {
//     debug: process.env.NODE_ENV !== 'production'
// });
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'art');
// 静态文件
app.use(express.static(path.join(__dirname, 'view')))


// 建立页面
app.get('/', (req, res) => {
    console.log(req.body);
    res.render('index.art')
})

app.post('/', (req, res) => {
    // console.log(req.body)
    domain = req.body.domain
    // whois 解析

    function handle(result){
        console.log('whois 异步完成')
        console.log('开始答复')
        console.log(result)
        res.status(result.status).render('index.art', result.message)
    }
    
    whoisHandler(domain, handle)

    whois.lookup(domain, (err, data)=>{
        // console.log(data)
    })
})


// 建立监听
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
