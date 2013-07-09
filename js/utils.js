'use strict';
function _(elmnt){
document.write(elmnt);
}

var Reader = {

PostID : null,

Lid : null,

RefreshRate : 0,

PostClickRate : 0,

CurrentPost : null,

CurrentPage : 1,

TotalPages : null,

Posts : {},

isLoading : false,

MainJson : "http://arabicmozilla.org/?json=get_posts&page=1",

DefaultJson : "http://arabicmozilla.org/?json=get_posts",

PageAction : "&page=",

CallbackAction : "&callback=",

MainCallback : "Reader.show",

cI : "",

isPost:false,

currentPostLink : "",

mainPageHeight : null,

postHeight : null,

windowHeight : null,

setHeight : function getheightwindow(){
document.getElementById('postToolbar').style.position = 'fixed';
Reader.mainPageHeight = document.getElementById('main').scrollHeight;
Reader.postHeight = document.getElementById('read').scrollHeight;
Reader.windowHeight = window.innerHeight;
document.getElementById('postToolbar').style.top = (Reader.windowHeight - 40)  + 'px';

if(Reader.mainPageHeight>Reader.postHeight){
document.getElementById('read').style.height = Reader.mainPageHeight + 40 + "px";
}
},

/* ========== Remove Object By Id ========== */
remove : function remove(id){
var elem;
return (elem=document.getElementById(id)).parentNode.removeChild(elem);
},

loading: function _loading(){
document.getElementById('c').innerHTML='<center>'
+'<p id="loading">'
+'برجاء الإنتظار.<br/>يتم جمع المعلومات.</p>'
+'<br/><progress></progress>'
+'</center>';
Reader.isLoading=true;
},

/* ========== Back to main ========== */
back : function backtomain(){
Reader.isPost = false;
Reader.PostClickRate=0;
document.getElementById('read').classList.remove("OpenPostAnim");
document.getElementById('read').classList.add("ClosePostAnim");
setTimeout(function() { Reader.remove('read'); }, 1000);
Reader.remove('script'+Reader.PostID);
},

/* ========== Load ========== */
load : function loadJSON(url){
if(!Reader.isPost)
Reader.Lid = Reader.CurrentPage;
else{
Reader.Lid = Reader.PostID;
}
console.log("===== Loading Main Json");
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = url;
newScript.id = "script"+Reader.Lid;
headID.appendChild(newScript);
console.log("===== Main Json Successfullly Loaded");
},

/* ========== Thumbnails ========== */
getThumb : function _getThumb(str){
if(str.length==0){
return "images/default.png";
console.log("===== Thumb Loaded from Post");
}
else{
return str[0].images["thumbnail"].url;
console.log("===== Can't find thunm in post, loading default");
}
},

/* ========== Show ========== */
show : function _show(obj){
Reader.cI="";
var totalcount=obj["count"];
for(var i=0;i<totalcount;i++){
Reader.cI+="<li>"
+"<aside class='pack-end'>"
+"<img alt='placeholder' src='"+Reader.getThumb(obj["posts"][i].attachments)+"'>"
+"</aside>"
+"<a href='javascript:Reader.go("+obj["posts"][i].id+");'>"
+"<p>"+obj["posts"][i].title+"</p>"
+"<p>تاريخ النشر: "+obj.posts[i].date+"</p>"
+"</a>"
+"</li>";
console.log("===== Showing Post"+(i+1));
Reader.TotalPages=obj.pages;
}
document.getElementById('c').innerHTML=Reader.cI;
console.log("===== All "+i+" posts have been shown successfully.");
Reader.RefreshRate=0;
Reader.isLoading=false;
},

/* ========== Show Post ========== */
ShowPost : function _ShowPost(obj){
//Reader.isPost=true;
Reader.PostClickRate=1;
Reader.currentPostLink=obj["post"].url;
console.log("===== Trying to show a single post...");
var t='<section id="read" class="post OpenPostAnim" role="region">'
+'<header>'
+'<button onclick="Reader.back()" id="mainBack"><span class="icon icon-back">back</span></button>'
+'<h1>'+obj["post"].title+'</h1>'
+'</header>'
+'<header>'
+'<h2>'+obj["post"]["author"].name+'</h2>'
+'</header>'
+'<div id="readInside">'+obj["post"].content
+'</div>'
+'<div class="addCommentButtonSection">'
+'<a class="recommend" role="button" href="javascript:comments.openInterface();">'
+'أضف تعليق'
+'</a></div>'
+'<div id="space"></div>'
/*+'<div role="toolbar" id="postToolbar">'
+'	<ul>'
+'    <li><button onclick="Reader.goHome()" class="pack-icon-home">Home</button></li>'
+'	  <li><button onclick="share.init()" class="pack-icon-share">Share</button></li>'
+'  </ul>'
+'<ul></ul>'
+'</div>' */
+'</section>';

document.getElementById("Roots").innerHTML+=t;
if ((window.scrollX !== 0) || (window.scrollY !== 0)) {
window.scrollTo(0, 0);
}
Reader.setHeight();
console.log("===== Post successfully Loaded");
},

/* ========== GO Home ========== */

goHome : function goToHome(){
Reader.back();
Reader.home();

},

/* ========== GO ========== */
go : function goTo(pID){
if(Reader.PostClickRate>0){
console.log("==[[[[[ A post is already to load itself");
return;
}
else{
Reader.isPost = true;
Reader.PostID = pID;
Reader.load('http://arabicmozilla.org/?json=get_post&callback=Reader.ShowPost&id='+pID);
Reader.PostClickRate=1;

}
},

/* ========== Refresh ========== */
refresh : function ReaderRefresh(){

if(Reader.RefreshRate>0){
console.log("Please Wait");
return;
}

else{
Reader.RefreshRate=1;
Reader.loading();
Reader.remove("script"+Reader.CurrentPage);
Reader.load(Reader.DefaultJson+Reader.PageAction+Reader.CurrentPage+Reader.CallbackAction+Reader.MainCallback);
}

},

/* ========== Next ========== */
next : function _next(){
if(Reader.CurrentPage<Reader.TotalPages){
Reader.remove("script"+Reader.CurrentPage);
Reader.loading();
Reader.CurrentPage+=1;
Reader.load(Reader.DefaultJson+Reader.PageAction+Reader.CurrentPage+Reader.CallbackAction+Reader.MainCallback);
}
},
prev : function _prev(){
if(Reader.CurrentPage>1){
Reader.remove("script"+Reader.CurrentPage);
Reader.loading();
Reader.CurrentPage-=1;
Reader.load(Reader.DefaultJson+Reader.PageAction+Reader.CurrentPage+Reader.CallbackAction+Reader.MainCallback);
}
},

home : function _home(){
if(Reader.isLoading){
return;
}
else{
Reader.remove("script"+Reader.CurrentPage);
Reader.loading();
Reader.load(Reader.DefaultJson+Reader.PageAction+"1"+Reader.CallbackAction+Reader.MainCallback);
}
},

/* ========== Init ========== */
init : function ReaderInit(){
Reader.load(Reader.DefaultJson+Reader.PageAction+Reader.CurrentPage+Reader.CallbackAction+Reader.MainCallback);
}


}



window.addEventListener('load', function readerOnLoad(evt) {
  window.removeEventListener('load', readerOnLoad);
  Reader.init();
});