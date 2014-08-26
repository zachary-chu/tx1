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

router.post("/get_product_list", function(req, res) {
                    
    var result = {"results":{"meteList":[{"pid":"tf","pname":"雷霆战机"},{"pid":"mrock","pname":"节奏大师"},{"pid":"smzt","pname":"神魔之塔"},{"pid":"mahjong","pname":"欢乐麻将"},{"pid":"poker","pname":"欢乐斗地主"},{"pid":"devilmaker","pname":"封印之城"},{"pid":"ssgame","pname":"天天飞车"},{"pid":"wefeng","pname":"天天酷跑"},{"pid":"welink","pname":"天天连萌"},{"pid":"wepang","pname":"天天爱消除"},{"pid":"wexiao","pname":"天天星连萌"},{"pid":"wepoker","pname":"天天德州"},{"pid":"gametotal","pname":"大盘数据"},{"pid":"dtyx","pname":"全民英雄"},{"pid":"pongpongpong","pname":"全民砰砰砰"},{"pid":"wedance","pname":"全民炫舞"},{"pid":"qmdgs","pname":"全民打怪兽"},{"pid":"mtown","pname":"全民小镇"},{"pid":"fx","pname":"傲世西游IOS"}]},"total":0,"pageNum":1,"startIndex":0,"currentPageNum":1,"currentPageSize":50,"findType":null,"message":"get data sucessfull","status":"200","createBy":null,"createDate":null,"ok":"yes","lastUpdateBy":null,"lastUpdateDate":null}
    
    res.send(result)
})

module.exports = router;
