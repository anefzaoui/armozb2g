var totalcount;
var backBtn = document.getElementById('mainBack');

function remove(id){
return (elem=document.getElementById(id)).parentNode.removeChild(elem);
}

function backtomain(){
remove("read");
}
function loadJSON(url){
var headID = document.getElementsByTagName("head")[0];
var newScript = document.createElement('script');
newScript.type = 'text/javascript';
newScript.src = url;
headID.appendChild(newScript);
}

function show(obj){
totalcount=obj["count_total"];
for(i=0;i<totalcount;i++){
document.getElementById('c').innerHTML+=""
+"<li>"
/*+"<aside class='"+obj["posts"][i].id+"'>"
+"<img alt='placeholder' src='http://lorempixel.com/64/64/'>"
+"</aside>" */
+"<a href='javascript:goTo("+obj["posts"][i].id+");'>"
+"<p>"+obj["posts"][i].title+"</p>"
+"<p>تاريخ النشر: "+obj["posts"][i].date+"</p>"
+"</a>"
+"</li>";
}
}

function ShowPost(obj){
var t='<section id="read" class="post" role="region">'
+'<header>'
+'<button onclick="backtomain()" id="mainBack"><span class="icon icon-back">back</span></button>'
+'<h1>'+obj["post"].title+'</h1>'
+'</header>'
+'<header>'
+'<h2>'+obj["post"]["author"].name+'</h2>'
+'</header>'
+'<div id="readInside">'+obj["post"].content+'</div>'
+'</section>';
document.getElementById("Roots").innerHTML+=t;
}

function goTo(pID){
loadJSON('http://arabicmozilla.org/?json=get_post&callback=ShowPost&id='+pID);
}

loadJSON('http://arabicmozilla.org/?json=get_posts&callback=show');
