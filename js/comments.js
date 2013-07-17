'use strict';

var comments = {
commenter : null,
commenterEmail : null,
commentContent : null,
_success : "تم إرسال العليق بنجاح",
_failed : "",
load : function _json_comment_load(url){
console.log("===== Loading Main Json");
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = url;
newScript.id = "scriptComment"+Reader.Lid;
headID.appendChild(newScript);
console.log("===== Main Json Successfullly Loaded");
},

openInterface : function openint(){
Reader.load(info.blogURL+"?json=get_post&callback=comments.addCommentLayer&id="+Reader.pID);
},
addCommentLayer : function _addCommentLayer(obj){
var comment_t='<section id="readComment" class="addComment OpenPostAnim" role="region">'
+'<header>'
+'<button onclick="comments.back()" id="mainBack"><span class="icon icon-close">back</span></button>'
+'<h1>أضف تعليق</h1>'
+'</header>'
+'<header>'
+'<h2>'+obj["post"].title+'</h2>'
+'</header>'
+'<div id="readInside">'
+'<form>'
+'  <p>'
+'    <input id="f1" type="text" placeholder="الإسم" required="">'
+'    <button type="reset">Clear</button>'
+'  </p>'
+'  <p>'
+'    <input id="f2" type="text" placeholder="البريد الإلكتروني" required="">'
+'    <button type="reset">Clear</button>'
+'  </p>'
+'  <p>'
+'    <textarea id="f3" placeholder="النص" required=""></textarea>'
+'  </p>'
+'</form>'
+'<a class="recommend" role="button" href="javascript:comments.act();">'
+'أرسل تعليقك'
+'</a>'
+'<div id="comment_success">تم إرسال التعليق بنجاح</div>'
+'<div id="comment_failed">خطأ أثناء إرسال التعليق. تفقد محتوى جميع الخانات. أو ربما يكون البريد الإلكتروني الذي أدخلته غير صالح.</div>'
+'</div>'
+'</section>';

document.getElementById("Roots").innerHTML+=comment_t;
if ((window.scrollX !== 0) || (window.scrollY !== 0)) {
window.scrollTo(0, 0);
}
Reader.setHeight("readComment");
},
submitComment : function submitC(name,email,content){

},
back : function _back(){

document.getElementById('readComment').classList.remove("OpenPostAnim");
document.getElementById('readComment').classList.add("ClosePostAnim");
setTimeout(function() { Reader.remove('readComment'); }, 1000);
Reader.remove('scriptComment'+Reader.PostID);
},

result : function _res(obj){

if(obj.error){
    document.getElementById('comment_failed').style.visibility='visible';
    document.getElementById('comment_failed').style.display='block';
    document.getElementById('comment_success').style.visibility='hidden';
    document.getElementById('comment_success').style.display='none';
} else if(obj.status)
{
    document.getElementById('comment_success').style.visibility='visible';
    document.getElementById('comment_success').style.display='block';
    document.getElementById('comment_failed').style.visibility='hidden';
    document.getElementById('comment_failed').style.display='none';
}
},

act : function _addcomment(){
comments.commenter = document.getElementById("f1").value;
comments.commenterEmail = encodeURIComponent(document.getElementById("f2").value);
comments.commentContent = document.getElementById("f3").value;

comments.load(info.blogURL+"?json=respond/submit_comment&post_id="
+Reader.PostID
+"&name="
+comments.commenter
+"&email="
+comments.commenterEmail
+"&content="
+comments.commentContent
+"&callback=comments.result");

},

init : function initialize(){

}



}