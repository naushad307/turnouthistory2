import express from 'express';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import AppState from '../models/AppState.js';
import Security from '../models/Security.js';
import {defaultState} from '../utils/defaults.js';

const router=express.Router();
const KEY='main';
const sign=()=>jwt.sign({scope:'edit'},process.env.JWT_SECRET,{expiresIn:'8h'});
const auth=async(req,res,next)=>{try{const h=req.headers.authorization||'';if(!h.startsWith('Bearer '))return res.status(401).json({error:'Edit session required'});jwt.verify(h.slice(7),process.env.JWT_SECRET);next()}catch(e){res.status(401).json({error:'Session expired'})}};

router.get('/health',async(req,res)=>res.json({ok:true,database:'mongodb'}));
router.get('/state',async(req,res)=>{let s=await AppState.findOne({key:KEY}).lean();if(!s){s=defaultState();await AppState.create(s);}res.json(s);});
router.post('/auth/unlock',async(req,res)=>{const {code}=req.body||{};if(!code)return res.status(400).json({error:'Security code required'});let sec=await Security.findOne({key:KEY});if(!sec){return res.status(409).json({needsSetup:true,error:'Security code is not configured in MongoDB'})}if(!(await bcrypt.compare(String(code),sec.codeHash)))return res.status(401).json({error:'Galat code'});res.json({token:sign()});});
router.post('/auth/setup',async(req,res)=>{const {code}=req.body||{};if(!code||String(code).length<4)return res.status(400).json({error:'Code must be at least 4 characters'});let sec=await Security.findOne({key:KEY});if(sec)return res.status(409).json({error:'Security code already exists'});const recovery=cryptoRandom();await Security.create({key:KEY,codeHash:await bcrypt.hash(String(code),12),recoveryHash:await bcrypt.hash(recovery,12)});res.json({ok:true,recoveryKey:recovery,token:sign()});});
router.post('/auth/change',auth,async(req,res)=>{const {code}=req.body||{};if(!code||String(code).length<4)return res.status(400).json({error:'Code must be at least 4 characters'});const recovery=cryptoRandom();await Security.updateOne({key:KEY},{$set:{codeHash:await bcrypt.hash(String(code),12),recoveryHash:await bcrypt.hash(recovery,12),updatedAt:new Date()}});res.json({ok:true,recoveryKey:recovery});});
router.post('/auth/reset',async(req,res)=>{const {recoveryKey,newCode}=req.body||{};const sec=await Security.findOne({key:KEY});if(!sec)return res.status(404).json({error:'No security code configured'});if(!(await bcrypt.compare(String(recoveryKey||''),sec.recoveryHash)))return res.status(401).json({error:'Galat recovery key'});if(!newCode||String(newCode).length<4)return res.status(400).json({error:'New code must be at least 4 characters'});const recovery=cryptoRandom();await Security.updateOne({key:KEY},{$set:{codeHash:await bcrypt.hash(String(newCode),12),recoveryHash:await bcrypt.hash(recovery,12),updatedAt:new Date()}});res.json({ok:true,recoveryKey:recovery,token:sign()});});
router.put('/state',auth,async(req,res)=>{const body=req.body;if(!body?.t)return res.status(400).json({error:'Invalid state'});const s=await AppState.findOneAndUpdate({key:KEY},{$set:{t:body.t,g:body.g||[],o:body.o||[],n:body.n||1}},{new:true,upsert:true,setDefaultsOnInsert:true}).lean();res.json(s);});
function cryptoRandom(){const a='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';let k='';const b=crypto.randomBytes(10);for(let i=0;i<10;i++)k+=a[b[i]%a.length];return k.slice(0,5)+'-'+k.slice(5);}
export default router;
