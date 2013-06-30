'use strict';

var share = {
whatToShare : "",

disabled:false,

init : function initsharing(){
if(Reader.isPost){
share.whatToShare=Reader.currentPostLink;
}
else{
share.whatToShare=info.blogURL;
}
console.log("Sharing: " + this.whatToShare);
share.handleShareButtonClick();
},

handleShareButtonClick: function toolbar_handleShareButtonClick() {

    new MozActivity({
      name: 'share',
      data: {
        type: 'url',
        url: share.whatToShare
      }
    });
}




}