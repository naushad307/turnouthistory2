import mongoose from 'mongoose';

const columnSchema = new mongoose.Schema({
  k:{type:String,required:true}, l:{type:String,required:true}, t:{type:String,required:true},
  o:{type:[String],default:[]}, core:{type:Boolean,default:false}
},{_id:false});
const recordSchema = new mongoose.Schema({
  id:{type:Number,required:true}, pt:String, sec:String, mk:String, dr:String, ty:String,
  lay:String, rep:String, gmt:String, rs:String, gr:String, gd:String, man:String,
  hd:String, prev:{type:Number,default:0}, rc:{type:[{d:String,n:String}],default:[]}
},{_id:false});
const tabSchema = new mongoose.Schema({r:{type:[recordSchema],default:[]},cols:{type:[columnSchema],default:[]}}, {_id:false});
const stateSchema = new mongoose.Schema({
  key:{type:String,unique:true,index:true},
  t:{c:tabSchema,s:tabSchema,cr:tabSchema,sr:tabSchema},
  g:{type:[{s:String,fy:Number,g:Number}],default:[]},
  o:{type:[{s:String,d:String}],default:[]},
  n:{type:Number,default:1}
},{timestamps:true});
export default mongoose.model('AppState',stateSchema);
