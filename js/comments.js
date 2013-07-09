'use strict';

var comments = {

openInterface : function openint(){
Reader.load("http://arabicmozilla.org/?json=get_post&callback=comments.addCommentLayer&id="+Reader.pID);
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
+'    <input type="text" placeholder="الإسم" required="">'
+'    <button type="reset">Clear</button>'
+'  </p>'
+'  <p>'
+'    <input type="text" placeholder="البريد الإلكتروني" required="">'
+'    <button type="reset">Clear</button>'
+'  </p>'
+'  <p>'
+'    <textarea placeholder="النص" required=""></textarea>'
+'  </p>'
+'</form>'
+'<a class="recommend" role="button" href="#">'
+'أرسل تعليقك'
+'</a>'
+'</div>'

+'</section>';

document.getElementById("Roots").innerHTML+=comment_t;
if ((window.scrollX !== 0) || (window.scrollY !== 0)) {
window.scrollTo(0, 0);
}

},
submitComment : function submitC(name,email,content){

},
back : function _back(){
document.getElementById('readComment').classList.remove("OpenPostAnim");
document.getElementById('readComment').classList.add("ClosePostAnim");
setTimeout(function() { Reader.remove('readComment'); }, 1000);

},

init : function initialize(){

}



}