// import the loaded image from webpack, so it will copy it to the dist/ img/folder
import '../img/user.png';
import dom from "./domSelectors.js"
import chatFn from './chatSharedFunctions.js';



// //Adding the chatRoom to the global object
$(window).on('load',function() {

    var testUser ={
      username: "margit",         //username
      avatar: 'user.png',         //selected avatar image number
      i: 0,                 //counter for fake images
      allowed: true,          //allow userinput or no
      maxNameLength: 15,
    };
  chatRoom.startChat(testUser);
  

});
var chatRoom ={


/***--CHAT VARIABLES--*/
   user:{},     //To hold the user's data
   counter: 0,  //Fake message index counter

   Fake: [      // array of fake messages
    'Hi there, I\'m Steve and you?',
    'Nice to meet you',
    'How are you?',
    'Not too bad, thanks',
    'What do you do?',
    'That\'s awesome',
    'It was a pleasure chat with you',
    'Time to code',
    'Bye',
    ':)'
  ],

  startChat: function  (chatUser){
          this.user = chatUser;
    /*****---CHAT ROOM SETUP---*****/
      //DropIn Animation + fake message initation
        setTimeout(function() {
            dom.$mainRoom.css("display","none");
            dom.$chatChat.addClass("dropIn");
            dom.$chatUsers.addClass("dropIn");
            chatRoom.fakeMessage();
        }, 500);

      //Addin scrolling to the users + messages
        dom.$chatUserList.mCustomScrollbar();
        dom.$chatMessages.mCustomScrollbar();

    /*****---EVENT LISTENERS---*****/

      //Chat input area keydow event listener
        dom.$chatMessageInput.keydown(function(e){
              chatFn.inputAreaControl(e,dom.$chatMessageInput);
        });
      //will create a new message
        dom.$chatmessageSubmit.click(function() {
          chatRoom.insertMessage();
        });

      // this will trigger a message sending function if enter has been pressed and shift is not
      // So for shift+Enter it will not react
        $(window).on('keydown', function(e) {
          if (e.which == 13 && !e.shiftKey) {
            chatRoom.insertMessage();
            return false;
          }
        });
  },

  insertMessage: function () {
    //Check if the message has any value  
      var msg = dom.$chatMessageInput.val();
    // if the message is empty, it will not do anything
      if ($.trim(msg) == '') {
        return false;
      }
    //replacing the new line characthers with the html new linetag <br>
      msg = msg.replace(/\n/, '<br>');
    //It will create a new message + timestamp
      $('<div class="message right">' + msg + ' <figure class="avatar"><img src="./img/'+this.user.avatar+'" /></figure></div>').appendTo($('.chat .mCSB_container')).addClass('new');
      chatFn.setDate(this.user.username,true);
    //clear the message textarea, "update scrollbar", generate fake message
      dom.$chatMessageInput.val(null);
      chatFn.updateScrollbar(dom.$chatMessages);
      setTimeout(function() {
        chatRoom.fakeMessage();
      }, 1000 + (Math.random() * 20) * 100);
  },

  fakeMessage:function () {
    //If the other one is typing do nothing!  
      if ($('.message-input').val() != '') {
        return false;
      }
    // will create a temporary div,with the loading message loading feature
      $('<div class="message loading new"><figure class="avatar"><img src="./img/user.png" /></figure><span></span></div>').appendTo($('.chat .mCSB_container'));
      chatFn.updateScrollbar(dom.$chatMessages);
    //remove loading plus add the indexed fake message!
      setTimeout(function() {
        $('.loading').remove();
        $('<div class="message new"><figure class="avatar"><img src="./img/user.png" /></figure>' + chatRoom.Fake[chatRoom.counter] + '</div>').appendTo($('.chat .mCSB_container')).addClass('new');
        chatFn.setDate('user',false);
        chatFn.updateScrollbar(dom.$chatMessages);
        chatRoom.counter++;
      }, 1000 + (Math.random() * 20) * 100);
  }

}



// export default chatRoom;
