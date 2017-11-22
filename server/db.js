const mongoose = require('mongoose')
const Schema = mongoose.Schema


//===================================================================================================
//数据按年分月记录,每年清空每月记录
//1月数据
const JanSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//2月数据
const FebSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//3月数据
const MarSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//4月数据
const AprSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//5月数据
const MaySchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//6月数据
const JunSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//7月数据
const JulySchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//8月数据
const AugSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//9月数据
const SepSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//10月数据
const OctSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//11月数据
const NovSchema = new Schema({
  name:{type:String},
  mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//12月数据
const DecSchema = new Schema({
  name:{type:String},
  tittle:{type:String},
  mes:{type:String},
  mood:{type:String},
  time:{type:Date}
})
//=========================================================================================================//




// 用户信息的数据结构模型
const userSchema = new Schema({
  name: {type: String},
  pwd: {type: String},
  nickname:{type:String},
  point:{type:Number},
  time: {type: Date, default:Date.now}
})
// 用户详细信息数据结构模型
const userDetailsSchema = new Schema({
  name:{type:String},
  sex:{type:String},
  xz:{type:String},
  num:{type:Number}
})
// 用户发送信息的数据结构模型
const mesSchema = new Schema({
	name:{type:String},
	mes:{type:String},
  tittle:{type:String},
  mood:{type:String},
  thxtime:{type:Number},
  replay:[{
    replaymes:{type:String},
    replayer:{type:String},
    replaythx:{type:String},
    time:{type:Date,default:Date.now}
  }],
	time:{type:Date,default:Date.now}
})
// 用户使用次数数据结构模型
const limSchema = new Schema({
  name:{type:String},
	sendnum:{type:String},
  getnum:{type:String},
  thxnum:{type:String},
  time:{type:Date,default:Date.now}
})
// 被点赞
const backnewSchema = new Schema({
  name:{type:String},
  num:{type:Number},
  date:{type:Date,default:Date.now}
})
// 留言反馈数据确认结构模型
const confirmbackSchema = new Schema({
  name:{type:String},
  num:{type:Number},
  date:{type:Date,default:Date.now}
})
//留言点赞状态数据结构模型
const mesTypeSchema = new Schema({
  mes:{type:String},
  mesType:{type:String},
  time:{type:Date,default:Date.now}
})
mongoose.Promise = global.Promise;
const database = mongoose.connect('mongodb://127.0.0.1:27017/mydb')
database.connection.on('error', function(error){
  console.log('数据库db连接失败：' + error)
  return
})
database.connection.once('open', function(){
  console.log('数据库db连接成功')
})

const db = {
  userModel: database.model('userModel', userSchema),
  mesModel:database.model('mesModel',mesSchema),
  limModel:database.model('limModel',limSchema),
  mesTypeModel:database.model('mesTypeModel',mesTypeSchema),
  backnewModel:database.model('backnewModel',backnewSchema),
  confirmbackModel:database.model('confirmbackModel',confirmbackSchema),
  JanModel:database.model('JanModel',JanSchema),
  FebModel:database.model('FebModel',FebSchema),
  MarModel:database.model('MarModel',MarSchema),
  AprModel:database.model('AprModel',AprSchema),
  MayModel:database.model('MayModel',MaySchema),
  JunModel:database.model('JunModel',JunSchema),
  JulyModel:database.model('JulyModel',JulySchema),
  AugModel:database.model('AugModel',AugSchema),
  SepModel:database.model('SepModel',SepSchema),
  OctModel:database.model('OctModel',OctSchema),
  NovModel:database.model('NovModel',NovSchema),
  DecModel:database.model('DecModel',DecSchema),
  userDetailsModel:database.model('userDetailsModel',userDetailsSchema)
}
module.exports = db