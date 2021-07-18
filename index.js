
const whois = require('whois');
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

// 别人解析方式 whois-parsed-v2
const parseRawData = require("./parse_data.js");

// 自己的解析方式，todo list
const parse_domian_info = require('./parse_data2');
const { json } = require('express');

// 建立页面
app.get('/', (req, res) => {
    console.log(req.body);
    res.render('index.art')
})

app.post('/', (req, res) => {
    // console.log(req.body)
    url = req.body.domain
    let json_data = {}
    // whois 解析
    whois.lookup(url, function (error, data) {
        if (error) {
            res.status(504).render('index.art', {'error': error.toString()})
            return
        }
        try {
            json_data = (parseRawData(data, url))
        } catch (error) {
            console.error(`Error: ${error}`)
            res.status(500).render('index.art', {'error': error.toString()})
        }
        // console.log("Yes")
        
        // console.log(json_data)
        res.render('index.art', json_data)
        // res.sendFile(template(path.join(__dirname,'view', 'index.art'), json_data))
        // res.json(json_data)
        
        // console.log(parse_domian_info( parse_format, data))
    })

    
})




// 建立监听
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
