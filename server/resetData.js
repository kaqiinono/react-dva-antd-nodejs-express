//定时刷新
const db = require('./db');
var schedule = require("node-schedule");
ResetDb=()=>{
	db.limModel.update({name:'santu'},{getnum:0},function(err,doc){
		console.log('成功')
		console.log(err)
	})
		db.limModel.update({name:'santu'},{sendnum:0},function(err,doc){
		console.log('成功')
		console.log(err)
	})
}
function setDateRestart(){
	schedule.scheduleJob('1 * * * * * ', function(){  
  		ResetDb();  
	});  
}
module.exports = setDateRestart