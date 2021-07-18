
// todo检查url后缀，确定解析格式，返回解析方式
const parse_format = 1 // .com 格式 用<<<区分


// 自己的解析方式
function parse_domian_info(parse_format, data){
    switch(parse_format){
        case 1:
            // 确定分界位置
            const split_sign = data.search('>>>')

            let json_data = data.substring(0, split_sign)
            let raw_data = data.substring(split_sign)
            // 分为raw_data 和 json_data 两个部分
            if (split_sign === -1) {
                json_data = data
            }
            
            // console.log(raw_data)

            let json_info = {}
            json_data.split('\n').forEach(element => {
                // 未包含当前键
                if ( !(element.substring(0, element.search(':')) in json_info )){
                    json_info[element.substring(0, element.search(':'))] = [element.substring(element.search(':') + 2 )]
                } else {
                    json_info[element.substring(0, element.search(':'))].push(element.substring(element.search(':') + 2))
                }

                json_info['raw_data'] = raw_data
                
            });
            return json_info
    }
    
}

module.exports = parse_domian_info;