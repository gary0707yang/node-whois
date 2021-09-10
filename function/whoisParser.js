const whois = require('whois');

// 别人解析方式 whois-parsed-v2
const parseRawData = require("./parse_data");

// 自己的解析方式，todo list
// const parse_domian_info = require('./parse_data2');
// const { json } = require('express');



function whoisDemo(domain, func){
    setTimeout(func, 3000)
}

function domainCheck(domain) {
    
    // TODO
    // 检查格式
    // 处理格式

    return domain
}

// whois.lookup(domain)



var whoisHandler = function(domain, func){
    domain = domainCheck(domain)
    const result = {
        status:200,
        error: false,
        message: 'Not Ready!'
    }
    console.log('预备解析')

    
    whois.lookup(domain, (err, data) => {
        if(err){
            console.error(err);
            result.status = 400
            result.error = err.message
        }
        
        // console.log('开始解析')
        // console.log(domain);
        
        //解析
        result.message = parseRawData(data, domain)
        // console.log('解析完成')
        console.log(data)
        func(result)
        return result
    })
    console.log(`解析完成 ${result}`)

}

module.exports = whoisHandler