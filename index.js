var mysql      = require('mysql');
const axios = require('axios');
var connection = mysql.createConnection({
    host     : '106.53.115.12',
    user     : 'fenxi',
    password : 'TNMz2YMnF3M3CekZ',
    database : 'fenxi'
});

connection.connect();

axios.get('https://fenxi.iming.info/api/public/stock_zcfz_em?date=20220930')
    .then(res => {
        console.log(res.data);
        res.data.forEach(data => {
            console.log(data)
            let sql = "insert into zcfz values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
            let params = [data["股票代码"], data["股票简称"], data["资产-货币资金"], data["资产-应收账款"], data["资产-存货"],data["资产-总资产"], data["资产-总资产同比"], data["负债-应付账款"] , data["负债-预收账款"], data["负债-总负债"], data["负债-总负债同比"], data["资产负债率"], data["股东权益合计"], data["公告日期"], "20220930"]
            connection.query(sql, params, function (error, results, fields) {
                if (error) throw error;
                console.log('The solution is: ', results);
            })
        })

    })
    .catch(err => {
        console.log(err);
    });