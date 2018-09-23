// chatFunctions object contains the below functions
/*
      -inputAreaControl -> it is controlling the the size of the chat typing area to see every character
      -checkWidht       -> will check the width of the screen and will decide wether the chat box-es should be draggable or not
      -setDate          -> Will check the date and insert a timestamp to the last message,
*/

import dom from './domSelectors.js';      //Selected Dom elements with Jquery



var chatFunctions = {

  //For message Timestamp
    d:null,      //dates
    h:null,      //hours extracted from date
    m:null,      //minutes

  //Controls, heigth of the message-input
  // e        -> the element which triggered the function (pressed key)
  // inputDom -> the DOM element where this event happened (it can be mainRoom, or chatRoom)
   inputAreaControl: function(e,inputDom){

        //Default input text size, for messageInput
        var messageInputData = {
                  height : 30,
        };

        //ctrl + Enter, increase the inputheight        
          if(e.keyCode == 13 && e.shiftKey==true){
              inputDom.css("height",inputDom["0"].clientHeight+messageInputData.height);
          }
        //Enter, resize the chat messageInput to original 
          else if(e.which == 13){
              inputDom.css("height",messageInputData.height);
        //calculating the height of the box
          }else{
        //check the carachters, size can'T be zero due to the multiplication        
            var size = Math.ceil(inputDom['0'].textLength / 40);
            if( size<1){ size = 1;   }        
        //looking for new line characthers "\n", the arr.length will be twice as the occurence of "\n"       
            var newlines = ((inputDom.val().match(/\n/g) || []).length);
        // newlines due to the multiplication can't be 0
            if( newlines/2==0){ newlines = 1;   }        
            inputDom.css("height",size * newlines*messageInputData.height);
          }
  },

//Will check if the chat + users are draggable or not, if the screen is too small, they are not
  checkWidht: function(value){
    if(value>800){
  //jquery-ui, plugin, let's you drag the chat div.
        dom.$chatChat.draggable(
          {
             addClasses: false,
             distance: 10,
             opacity:0.7,
          }
        );
        dom.$chatUsers.draggable(
          {
             addClasses: false,
             distance: 10,
             opacity:0.7,
          }
        );
        dom.$mainChat.draggable(
          {
             addClasses: false,
             distance: 10,
             opacity:0.7,
          }
        );
    }else{
      //will hide the elements
        dom.$dragMe.hide();
    }
  },

  updateScrollbar: function (domEl) {
      domEl.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
        scrollInertia: 10,
        timeout: 0
      });
  },

//will append the timestamp to the last message
  setDate: function (userName,timeStamp){
      this.d = new Date();
    // if (m != d.getMinutes()) {
      this.h = this.d.getHours()
      this.m = this.d.getMinutes();
    //Add 0 to conver 1 minute to 01
      if(this.m<10){ this.m = '0' + this.m;}
      if(this.h<10){ this.h = '0' + this.h;}
    //Add only userstamp
    if(timeStamp){
      $('<div class="userstamp">'+userName+'</div><div class="timestamp">'+ this.h + ':' + this.m + '</div>').appendTo($('.message:last'));
    }else{
      $('<div class="userstamp">'+userName+'</div>').appendTo($('.message:last'));
    } 
    // }
  }

};

export default  chatFunctions;

