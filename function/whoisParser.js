const whois = require('whois');

// 别人解析方式 whois-parsed-v2
const parseRawData = require("./parse_data");

// 自己的解析方式，todo list
// const parse_domian_info = require('./parse_data2');
// const { json } = require('express');


function domainCheck(domain) {
    
    // TODO
    // 检查格式
    // 处理格式

    return domain
}

// whois.lookup(domain)



var whoisHandler = function(domain){

return new Promise(function(resolve, reject){
    // 检查域名格式
    domain = domainCheck(domain)
    const result = {
        status:200,
        error: false,
        message: 'Not Ready!'
    }
    whois.lookup(domain, (err, data) => {
        if(err){
            console.error(err)
            reject(err);
        }
        try{
            result.message = parseRawData(data, domain)
        } catch(err){
            reject(err)
        }
        
        resolve(result)
    })
})
}

module.exports = whoisHandler