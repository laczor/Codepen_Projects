// import the loaded image from webpack, so it will copy it to the dist/ img/folder
import '../img/user.png';
//Selecting the messages div, to manipulate it with jquery
var $messages = $('.messages-content'),
    $messageInput = $(".message-input"),
    $chat = $(".chat"),
    $users = $(".users"),
    $userList = $(".user-list"),
    $dragMe = $(".drag-me-chat"),
    d,      //dates
    h,      //hours extracted from date
    m,      //minutes
    i = 0;    //counter index for fake message array

//Default input text size
var messageInputData = {
          height : 20,
};

//Will append the mCustomScrollbar plugin to the messages div
$(window).on('load',function() {
//Will determine wether the divs are draggable or not
checkWidht($(document).width());

  $messageInput.keydown(function(e){
        inputAreaControl(e);
  });
  $userList.mCustomScrollbar();
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);


});
//Controls, heigth of the message-input
function inputAreaControl(e){
//ctrl + Enter, increase the inputheight        
      if(e.keyCode == 13 && e.shiftKey==true){
        $messageInput.val($messageInput.val()+'\n');
          // $messageInput.css("height",$messageInput["0"].clientHeight +17);
          $messageInput.css("height",$messageInput["0"].clientHeight+17);
      }
//Enter, original size      
      else if(e.which == 13){
          $messageInput.css("height",messageInputData.height);
          // $messageInput.css("height",17);
//calculating the height of the box
      }else{
//check the carachters        
        var size = Math.ceil($messageInput['0'].textLength / 40);
//looking for new lines        
        var newlines = (($messageInput.val().match(/\n/g) || []).length);
// newlines due to the multiplication can't be 0
        if( newlines/2==0){ newlines = 1;   }        
        $messageInput.css("height",size * newlines*messageInputData.height);
      }
}
//Will check if the chat + users are draggable or not, if the screen is too small, they are not
function checkWidht(value){
  if(value>800){
//jquery-ui, plugin, let's you drag the chat div.
      $chat.draggable(
        {
           addClasses: false,
           distance: 10,
           opacity:0.7,
        }
      );
      $users.draggable(
        {
           addClasses: false,
           distance: 10,
           opacity:0.7,
        }
      );
  }else{
      $dragMe.hide();
  }
}

// This is not working!
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

//will append the timestamp to the last message
function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
//Check if the message has any value  
  var msg = $messageInput.val();
//replacing the new line characthers with the html new linetag <br>
  msg = msg.replace(/\n/, '<br>');

// if the message is empty, it will not do anything
  if ($.trim(msg) == '') {
    return false;
  }
//It will create a new message + timestamp
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.chat .mCSB_container')).addClass('new');
  setDate();
//clear the message textare, "update scrollbar", generate fake message
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

//will create a new message
$('.message-submit').click(function() {
  insertMessage();
});

// this will trigger a message sending function if enter has been pressed and shift is not
// So for shift+Enter it will not react
$(window).on('keydown', function(e) {
  if (e.which == 13 && !e.shiftKey) {
    insertMessage();
    return false;
  }
});

// array of fake messages
var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function fakeMessage() {
//If the other one is typing do nothing!  
  if ($('.message-input').val() != '') {
    return false;
  }
 // will create a temporary div,with the loading message loading feature
  $('<div class="message loading new"><figure class="avatar"><img src="./img/user.png" /></figure><span></span></div>').appendTo($('.chat .mCSB_container'));
  updateScrollbar();
//remove loading plus add the indexed fake message!
  setTimeout(function() {
    $('.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="./img/user.png" /></figure>' + Fake[i] + '</div>').appendTo($('.chat .mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}