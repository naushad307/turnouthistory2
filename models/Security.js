import mongoose from 'mongoose';
const securitySchema=new mongoose.Schema({
 key:{type:String,unique:true,index:true},
 codeHash:{type:String,required:true},
 recoveryHash:{type:String,required:true},
 createdAt:{type:Date,default:Date.now},updatedAt:{type:Date,default:Date.now}
});
export default mongoose.model('Security',securitySchema);
