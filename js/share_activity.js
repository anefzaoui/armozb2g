'use strict';

var share = {
whatToShare : "",
whatToShareN : "",
tweetAction : "https://twitter.com/intent/tweet/?text=",
facebookAction : "https://www.facebook.com/sharer/sharer.php?u=",
disabled:false,
shareID : null,

init : function initsharing(){
if(Reader.isPost){
share.whatToShare=Reader.currentPostLink;
share.whatToShareN=Reader.currentPostName;
}
else{
share.whatToShare=info.blogURL;
share.whatToShareN=info.blogName;
}
console.log("Sharing: " + this.whatToShare);
share.handleShareButtonClick();
},

handleShareButtonClick: function toolbar_handleShareButtonClick() {
	if(Reader.isPost) share.shareID="sharePost";
	else share.shareID="share";
    var SharToolbar = document.getElementById(share.shareID);
	SharToolbar.innerHTML='<li><button onclick="share.back()" class="pack-icon-previous">back to main options</button></li>'
	+'<li><button onclick="share.twitter()" class="pack-icon-share-twitter">Share on Twitter</button></li>'
	+'<li><button onclick="share.facebook()" class="pack-icon-share-facebook">Share on Facebook</button></li>'; 
},

twitter: function shareOnTwitter(){
Reader.openLink(share.tweetAction+share.whatToShareN+" : "+share.whatToShare);
},
facebook: function shareOnFacebook(){
Reader.openLink(share.facebookAction+share.whatToShare);
},

back : function back_(){
var SharToolbar = document.getElementById(share.shareID);
if(Reader.isPost){
SharToolbar.innerHTML='<li><button onclick="Reader.goHome()" class="pack-icon-home">Home</button></li>'
+'<li><button onclick="share.init()" class="pack-icon-share">Share</button></li>';
}
else{
SharToolbar.innerHTML='<li><button onclick="Reader.home()" class="pack-icon-home">Home</button></li>'
+'<li><button onclick="share.init()" class="pack-icon-share">Share</button></li>';
}
}

}