var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/dimension/meta', function(req, res) {
    res.render('dimension/meta')
})

router.post('/meta_search', function(req, res) {
    var list = [{
        col_name : "igood",
        col_type : "int",
        is_blank : "yes",
        is_primary : "yes",
        comment : "测试测试",
        default_value : "hao"

    }];
    // res.send({ok : "no", message : "七七八八的错误"})

    res.send({ok : "yes", list : list, table_name : "ret-dfdfdfdf", product_name : "天天酷跑"})
})

router.post("/get_staff", function(req, res) {
    var result =     {"results":
        {"staff": {
            "chineseName":"淡欣",
            "loginName":"dylandan","deptId":967,"staffId":50092,"deptName":"互动娱乐运营部"},"permissionId":2},"total":0,"currentPageNum":1,"currentPageSize":50,"pageNum":1,"startIndex":0,"findType":null,"message":"get data sucessfull","status":"200","lastUpdateBy":null,"lastUpdateDate":null,"createBy":null,"createDate":null,"ok":"yes"}

    res.send(result)
})

module.exports = router;
