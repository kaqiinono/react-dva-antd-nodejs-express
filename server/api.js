const db = require('./db');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var crypto = require('crypto');
module.exports = function (app) {
    _pwd=(pwd)=>{
        let sha512 =  crypto.createHash('sha512');
        let md5 =  crypto.createHash('md5');
        let first_pwd = sha512.update(pwd).digest('hex')
        let second_pwd = md5.update(first_pwd).digest('hex')
        return first_pwd
    }
    app.use(bodyParser.json());
    app.use(cookieParser("keyboard cat"));
    app.use(session({
        name:'snat',
        secret: 'keyboard cat', 
        cookie: ({ maxAge:  1000*60*60*24*7 }),
        resave: false,
        saveUninitialized: true
    }));
    app.all("*", function(req, res, next) { 
        next();
    });
    //用户登录
    app.post('/api/user/login', function (req, res) {
        var name=req.body.name;
        var pwd =_pwd(req.body.pwd);
            db.userModel.findOne({name: req.body.name}, function(err, doc){
            if(!err){
                if(!doc){
                    res.json({code:100});//账号不存在
                        return;
                }else{
                    if(pwd != doc.pwd){
                        res.json({code:200});//密码不正确
                        return;
                    }else{
                        req.session.name=name;
                        req.session.wa = [];
                        res.json({code:300});//登录成功
                    }
                }
            }else{
                console.log('连接超时');
            }
        });      
    });
    // 用户注册
    app.post('/api/user/signup', function (req, res) {
        var name = req.body.name;
        var pwd = req.body.pwd;
        var nickname = req.body.nickname;
        db.userModel.create({
            name:name,
            pwd:_pwd(pwd),
            nickname:nickname,
            point:10
        },function(err,doc){
            if (!err) {
                res.json({code:200});//用户创建成功
                db.limModel.create({
                  name:name,
                  sendnum:0,
                  getnum:0
                });
                db.backnewModel.create({
                    name:name,
                    num:0
                });
                db.confirmbackModel.create({
                    name:name,
                    num:0
                });
                db.userDetailsModel.create({
                    name:name,
                    sex:'',
                    xz:'',
                    num:0
                })
            }else{
                console.log('出问题啦',err);
            }
        });
    });
    //每日消息发送
    app.post('/api/mes/post',function(req,res){
    //获取session中的name为mesSchema中的name
        var mes = req.body.message;
        var mood = req.body.mood
        var tittle = req.body.tittle
        if(!req.session.name){
            res.json({code:100})//请登录后尝试
        }else{
            db.limModel.findOne({name:req.session.name},function(err,doc){
                var limit = doc.sendnum;
        // var errnum = limit++
        // console.log(errnum)
                limit++;
                if(!err){
                    if(limit<2){
                //更新每日上限数据
                        db.limModel.update({name:req.session.name},{sendnum:limit},function(err,doc){
                            if(err){
                                console.log(err);
                            }else{
                                console.log(req.session.name);
                                console.log(doc);
                            }
                        });
                        db.mesModel.create({
                            name:req.session.name,
                            mes:mes,
                            tittle:tittle,
                            mood:mood,
                            thxtime:0
                        },(e,d)=>{
                            if(!e){
                                const time = d.time
                                const month = time.getMonth()
                                switch(month){
                                    case 0:
                                    db.JanModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        tittle:tittle,
                                        mood:mood,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 1:
                                    db.FebModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 2:
                                    db.MarModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 3:
                                    db.AprModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 4:
                                    db.MarModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 5:
                                    db.JunModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 6:
                                    db.JulyModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 7:
                                    db.AugModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 8:
                                    db.SepModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 9:
                                    db.OctModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 10:
                                    db.NovModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                    case 11:
                                    db.DecModel.create({
                                        name:req.session.name,
                                        mes:mes,
                                        mood:mood,
                                        tittle:tittle,
                                        time:time
                                    },(e,d)=>{
                                        if(!e){
                                            res.json({code:200})
                                        }
                                    })
                                    break;
                                }
                            }
                        })
                    }else{
                        res.json({code:400}); //今日消息发送上线
                    }
                }else{
                    console.log(err+'查询失败');
                }
            });
        }
    });
    //消息获取
    app.get('/api/mes/get',function(req,res){
    const wa = req.session.wa 
    if(!req.session.name){
        res.json({code:100})//么登录
        return;
    }else{
        db.limModel.findOne({name:req.session.name},(err,doc)=>{
            //更新限制次数
            var key = doc.getnum;
            key++;
            if(!err){
                if(key<10){
                    db.limModel.update({name:req.session.name},{getnum:key},(e,d)=>{
                        if(!e){
                            db.mesModel.find().count(function(err,num){
                                var maxnum = num 
                                if(!err){
                                    function ya(){
                                        var randnum = Math.round(maxnum*Math.random());
                                        if(wa.indexOf(randnum) == -1){
                                            wa.push(randnum)
                                            console.log(randnum)
                                            return randnum
                                        }else{
                                            return ya();
                                        }
                                    }
                                    console.log(req.session.wa)
                                    db.mesModel.find().skip(ya()).limit(1).exec(function(err,doc){
                                        const d1 = doc;
                                        db.userDetailsModel.findOne({name:req.session.name},(e,d)=>{
                                            if(!e){
                                                    res.json({d1,d})                                               
                                            }
                                        });
                                    })
                                }
                            })
                        }else{
                            console.log(e)
                        }
                    });
                }else{
                    res.json({code:200})//每天10次
                }
            }else{
                console.log(err)
            }
        })
    }
})
    //个人消息发送上限检验
    app.get('/api/user/cheack',function(req,res){
        const name = req.session.name
        if(name){
                    db.limModel.findOne({name:name},(e,d)=>{
            if(!e){
                if(d.sendnum == 1){
                    res.json({code:100})//今日上限
                    return
                }else{
                    res.json({code:200}) //正常
                    return
                }
            }
        })
        }
    })
    //消息回复
    app.post('/api/mes/replay',function(req,res){
        var replaymes = req.body.replaymes;
        var replayer = req.session.name;
        var mes = req.body.mes;
        if(!req.session.name){
            res.json({code:100}); //登录后尝试
        }else{
            db.mesModel.update({mes:mes},{$push:{replay:{replaymes:replaymes,replayer:replayer,replaythx:'heart-o'}}},function(err,doc){
                if(!err){
                    res.json({code:200});//回复成功
                }else{
                    console.log(err);
                }
            });
        }
    });
    //注册=>用户名检测
    app.post('/api/user/nameconfirm',function(req,res){
        var name = req.body.name;
        db.userModel.findOne({name:name},function(err,doc){
            if(!err){
                if(doc){
                    res.json({code:100});//用户名存在
                }else{
                    res.json({code:200});
                }
            }else{
                console.log(err+'错误');
            }
        });
    });
    //注册=>昵称检测
    app.post('/api/user/nicknameconfirm',function(req,res){
        var nickname = req.body.nickname;
        db.userModel.findOne({nickname:nickname},function(err,doc){
            if(!err){
                if(doc){
                    res.json({code:100});
                }else{
                    res.json({code:200});
                }
            }else{
                console.log("错误"+err);
            }
        });
    });
    //个人信息=>个人发布记录
    app.get('/api/user/getmes',function(req,res){
        const name = req.session.name
        if(!req.session.name){
            console.log('wa')
        }else{
            const JanMes = new Array()
            const FebMes = new Array()
            const MarMes = new Array()
            const AprMes = new Array()
            const MayMes = new Array()
            const JunMes = new Array()
            const JulyMes = new Array()
            const AugMes = new Array()
            const SepMes = new Array()
            const OctMes = new Array()
            const NovMes = new Array()
            const DecMes = new Array()
            //逐月查询
            //一月查询
            db.JanModel.find({name:name},(e,d)=>{
                JanMes.push(d);
                //二月查询
                db.FebModel.find({name:name},(e,d)=>{
                    FebMes.push(d)
                    //三月查询
                    db.MarModel.find({name:name},(e,d)=>{
                        MarMes.push(d)
                        //四月查询
                        db.AprModel.find({name:name},(e,d)=>{
                            AprMes.push(d)
                            //五月查询
                            db.MayModel.find({name:name},(e,d)=>{
                                MayMes.push(d)
                                //六月查询
                                db.JunModel.find({name:name},(e,d)=>{
                                    JunMes.push(d)
                                    //七月查询
                                    db.JulyModel.find({name:name},(e,d)=>{
                                        JulyMes.push(d)
                                        //八月查询
                                        db.AugModel.find({name:name},(e,d)=>{
                                            AugMes.push(d)
                                            //九月查询
                                            db.SepModel.find({name:name},(e,d)=>{
                                                SepMes.push(d)
                                                //十月查询
                                                db.OctModel.find({name:name},(e,d)=>{
                                                    OctMes.push(d)
                                                    //十一月查询
                                                    db.NovModel.find({name:name},(e,d)=>{
                                                        NovMes.push(d)
                                                        //十二月查询
                                                        db.DecModel.find({name:name},(e,d)=>{
                                                            DecMes.push(d)
                                                                res.json({
                                                                        Jan:JanMes,
                                                                        Feb:FebMes,
                                                                        Mar:MarMes,
                                                                        Apr:AprMes,
                                                                        May:MayMes,
                                                                        Jun:JunMes,
                                                                        July:JulyMes,
                                                                        Aug:AugMes,
                                                                        Sep:SepMes,
                                                                        Oct:OctMes,
                                                                        Nov:NovMes,
                                                                        Dec:DecMes,
                                                                    })                                                           
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        }
    });
    //个人细心 => 个人消息回复记录
    app.post('/api/user/getReplay',function(req,res){
        var mes = req.body.mes;
        db.mesModel.findOne({mes:mes},function(err,doc){
            var len = doc.replay.length;
            if(len == 0 ){
                res.json({code:100});//无消息回复
                return;
            }else{
                var getreplay = new Array();
                for(var i = 0; i<len; i++){
                    getreplay.push(doc.replay[i].replaymes);
                }
                res.json({len,getreplay});
                return;
            }
        });
    });
    //消息回复点赞=>点亮
app.post('/api/user/point',function(req,res){
        var replaymes = req.body.replaymes;
        var replaytime = req.body.replaytime;
        var mes = req.body.mes
        var time = req.body.time
        //查询点赞上限
        db.mesModel.findOne({mes:mes,time:new Date(time)},(e,d)=>{
            if(d.thxtime==1){
                res.json({code:100}) //点赞上限
                return
            }else{
                //更新点赞上限数量
                db.mesModel.update({mes:mes,time:new Date(time)},{thxtime:1},(e,d)=>{
                    //更新被点赞消息状态
                    db.mesModel.update({mes:mes, "replay.replaymes":replaymes}, { $set : {"replay.$.replaythx":'heart' }},(e,d)=>{
                        //被点赞人积分更新
                        db.mesModel.aggregate(
                            {
                                "$project":
                            {
                                "replay":"$replay"
                            }
                    },
                    {
                        "$unwind":"$replay"
                    },
                    {
                        "$match":
                            {
                                'replay.time':new Date(replaytime),
                                'replay.replaymes':replaymes
                            }
                     },
                    (e,d)=>{
                        var name = d[0].replay.replayer;
                        db.userModel.findOne({name:name},(e,d)=>{
                            var point = d.point;
                            var upPoint = point + 1;
                            db.userModel.update({name:name},{point:upPoint},(e,d)=>{
                                if(!e){
                                    //更新留言反馈数据状态！提醒被点赞用户有新的积分增加记录
                                        db.backnewModel.findOne({name:name},(e,d)=>{
                                        var timeNum = d.num
                                        var upTime = timeNum + 1
                                        db.backnewModel.update({name:name},{num:upTime},(e,d)=>{
                                            if(!e){
                                                res.json({code:200});//消息点赞成功
                                            }
                                        })
                                    })
                                }else{
                                    console.log(e+'错误')
                                }
                            })
                        })
                })
                    })
                })
            }
        })
    })
    //个人被点赞消息展示？
    //个人消息加载
    app.get('/api/user/getUserDetails',function(req,res){
        const name = req.session.name
        if(!req.session.name){
            res.json({code:100});//未登录
        }else{
            db.userModel.findOne({name:name},(e,d)=>{
                res.json(d)
            })
        }
    })
    app.post('/api/mes/dispay/',function(req,res){
        const name = req.session.name
        const time = req.body.time
        const tittle = req.body.tittle
        db.mesModel.findOne({tittle:tittle,time:new Date(time)},(e,d)=>{
            if(!e){
                res.json(d)
            }else{
                console.log(e)
            }
        })
    })
    //获取被点赞人消息提醒
    app.get('/api/user/cheackPoint',function(req,res){
        const name = req.session.name
        if(name){
            db.confirmbackModel.findOne({name:name},(e,d)=>{
                var num1 = d.num
                db.backnewModel.findOne({name:name},(e,d)=>{
                    if(num1 != d.num){
                        var num2 = d.num - num1
                        res.json({code:200,num2})//有新消息
                    }
                })
            })  
        }
    })
    //更新被点赞消息
    app.get('/api/user/cheackmessage',function(req,res){
        const name = req.session.name
        if(name){
            db.backnewModel.findOne({name:name},(e,d)=>{
                var num = d.num
                db.confirmbackModel.update({name:name},{num:num},(e,d)=>{
                    if(!e){
                        res.json({code:100})
                    }
                })
            })
        }
    })
    //密码修改
    app.post('/api/user/pwdchange',function(req,res){
        const name = req.session.name
        const pwd = _pwd(req.body.pwd)
        const newpwd = _pwd(req.body.newpwd)
        db.userModel.findOne({name:name},(e,d)=>{
            if(pwd == d.pwd){
                db.userModel.update({name:name},{pwd:newpwd},(e,d)=>{
                    if(!e){
                        res.json({code:100})//修改成功
                        return
                    }
                })
            }else{
                res.json({code:200})//原密码输入错误
                return
            }
        })
    })
    //个人详细信息保存
    app.post('/api/user/saveDetail',function(req,res){
        const name =req.session.name
        const sex = req.body.sex
        const xz = req.body.xz
        db.userDetailsModel.update({name:name},{sex:sex,xz:xz,num:1},(e,d)=>{
            if(!e){
                res.json({code:100})//保存成功
            }
        })
    })
    //个人详细信息页面加载
    app.get('/api/user/loadDetail',function(req,res){
        const name = req.session.name
        db.userDetailsModel.findOne({name:name},(e,d)=>{
            if(!e){
                res.json(d)
            }
        })
    })
    //退出登录
    app.get('/api/user/exit',function(req,res){
        req.session.name = ''
        res.json({code:100})
    })
    app.get('/api/user/text',function(req,res){
        var wa =req.session.wa
        wa.push('1')
        console.log(req.session.wa)
        console.log(wa)
        res.json({code:200})
    })
    //自动登陆
    //
    //头像上传
    app.get('*', function(req, res){
        res.end('404');
    });
};