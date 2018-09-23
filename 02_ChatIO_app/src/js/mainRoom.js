// import the loaded image from webpack, so it will copy it to the dist/ img/folder
import '../img/user.png';
import '../img/user1.png';
import '../img/user2.png';
import '../img/user3.png';
import '../img/user4.png';

import dom from './domSelectors.js';            //Contains the seleceted dom elements with jQuery
import chatFn from './chatSharedFunctions.js';  //Shared Functions for chat
import chatRoom from './chat.js';



/*----PAGE SETUP---*/

  $(window).on('load',function() {

    /*----GLOBAL SETUP---*/

        //Will determine wether the divs are draggable or not
          chatFn.checkWidht($(document).width());

    /*----MAIN ROOM SETUP---*/

        //Addin scrolling to the Messages
          dom.$mainMessagesContent.mCustomScrollbar();
        //DropIn Animation + fake message initation
          setTimeout(function() {
              // dom.$mainChat.addClass("dropIn");
              mainRoom.fakeMessage(mainRoom.Fake[0]);
          }, 500); 

  });
  

/***------EVENT LISTENERS-----***/    

      //Assigning event listener to the messageInput, to run the resizing function everytime a key is pressed
        dom.$mainMessageInput.keydown(function(e){
          chatFn.inputAreaControl(e,dom.$mainMessageInput);
        });  

      //will check if a new messages can be created when the "Send" button is clicked
        dom.$mainSubmit.click(function(e) {
          mainRoom.checkUserInput(e);
        });  

      //global keydown event listener, to check if the user can send message or not
        $(window).on('keydown', function(e) {
          //continue only if the input is not empty
            if( dom.$mainMessageInput.val() == ""){
              return;
            }
          mainRoom.checkUserInput(e);

        });

/***------MainRoom----*/  

/*

Properties:
  - user                --> To store the user related information
  - Fake                --> Array of fake chatBot messages
  - avatarImages        --> Array of available avatar images on the server

functions:
  - fakeMessages        --> Will create fake messages div elements based from the Fake array and the actual counter variable
  - saveUser            --> Will save the username at the given counter step
  - insertUserMessage   --> Will insert div elements with the userinput
  - checkUserInput      --> Will check if the user is allowed to send messages in the current round with the chatbot
  - avatarChoiceMessage --> Will show the possible choices for avatar images
  - saveAvatar          --> Will save the avatar image of the user.

*/

var mainRoom = {

    /****-----VARIABLES-----*/
    //To store the userData
    user:{
      username: "",         //username
      avatar: null,         //selected avatar image number
      i: 0,                 //counter for fake images
      allowed: true,          //allow userinput or no
      maxNameLength: 15,
    },

    // array of fake messages
    Fake: [
      'Hi there, almost ready to Chat ! :)',
      'Please type in a Username',
      'Thank you',
      'Please select an avatar by typing it\'s number',
      'Everything is ready, Let\'s chat! :)',
    ],
    //avatar images
    avatarImages: [
      'user.png',
      'user1.png',
      'user2.png',
      'user3.png',
      'user4.png',
    ],

//insert fake messages from the Fake arr with some logic
    fakeMessage: function (message) {
       //will create a temporary div,with the loading message loading feature
       //mCSB_container is the div created by "mCustomScrollbar"
          $('<div class="message loading new"><figure class="avatar"><img src="./img/me.png" /></figure><span></span></div>').appendTo(dom.$mainMessages.find('.mCSB_container'));

          setTimeout(function() {
           //Remove the loading div, and insert the message passed as a parameter
              $('.loading').remove();
              $('<div class="message new"><figure class="avatar"><img src="./img/me.png" /></figure>' + message + '</div>').appendTo(dom.$mainMessages.find('.mCSB_container').addClass('new'));
           //Increment the counter, to determine which message from the Fake array should be displayed   
              mainRoom.user.i++;
           // Fake user
              chatFn.setDate('Steve',false);
              switch (mainRoom.user.i) {
              //"Thank you (username)"
                case 2:
                  break;
              //Send choices for avatar
                case 4:  
                    mainRoom.avatarChoiceMessage(mainRoom.avatarImages);
                  break;
              //User data gathered, initate chatRoom
                case 5:
                    chatRoom.startChat(mainRoom.user);
                  break;
              //Continue with the next fake message   
                default:
                    setTimeout(function(){
                        mainRoom.fakeMessage(mainRoom.Fake[mainRoom.user.i]);
                        mainRoom.user.allowed = true;
                    },500);
                  break;
              }
          }, 1000 + (Math.random() * 20) * 100);
    },

//save the user input at counter step 2, append it to the screen, initate new fakeMessages
    saveUser: function (e){
        mainRoom.user.allowed = false;
        mainRoom.user.username = dom.$mainMessageInput.val();
        mainRoom.insertUserMessage();
        mainRoom.Fake[mainRoom.user.i] = mainRoom.Fake[mainRoom.user.i] +" " + mainRoom.user.username+ " !" ;
        mainRoom.fakeMessage(mainRoom.Fake[mainRoom.user.i]);
    },

//save the user input at counter step 2, append it to the screen, initate new fakeMessages
    saveAvatar: function (index){
        mainRoom.user.allowed = false;
        // +index, will convert string number to integer number
        if(mainRoom.avatarImages[+index] == undefined){
            mainRoom.user.avatar = mainRoom.avatarImages[0];    //defailt userImage
        }else{
            mainRoom.user.avatar = mainRoom.avatarImages[+index];
        }
        mainRoom.fakeMessage(mainRoom.Fake[mainRoom.user.i]);
    },
//insert the message from the user to the chatbox
    insertUserMessage: function () {
      var userImage = this.user.avatar?this.user.avatar: this.avatarImages[1];
      var msg = dom.$mainMessageInput.val();
      // if the message is empty, it will not do anything
        if ($.trim(msg) == '') {
          return false;
        }
      //replacing the new line characthers with the html new linetag <br>
        msg = msg.replace(/\n/, '<br>');
      //It will create a new message + timestamp
      //It will create a new message + timestamp
        $('<div class="message right">' + msg + ' <figure class="avatar"><img src="./img/'+userImage+'" /></figure></div>').appendTo(dom.$mainMessages.find('.mCSB_container').addClass('new'));
        chatFn.setDate(this.user.username,true);
      //clear the message textare, "update scrollbar", generate fake message
        dom.$mainMessageInput.val(null);
    },

//check the userinput and make actions based on some rules 
    checkUserInput: function (e){
      // 13 - Enter, 1 - mouseClick event,
      // Shitf + enter will insert new line
        if (e.which == 13 || e.which == 1 && !e.shiftKey) {
            //If the counter is below 2, do not accept anything
            if(mainRoom.user.i<2){
              dom.$mainMessageInput.val(null);
              return;
            }
            switch (mainRoom.user.i) {
            // UserName input
              case 2:
                  var msg = dom.$mainMessageInput.val();
                  if(mainRoom.user.allowed && msg.length<mainRoom.user.maxNameLength){
                    mainRoom.saveUser(e); 
                  }else{
                    alert('The username should be less than ' + mainRoom.user.maxNameLength + ' characters.');
                  }
                  break;
            //Avatar select
              case 4:
                  var msg = dom.$mainMessageInput.val();
                  if(typeof +msg =="number" && +msg<mainRoom.avatarImages.length ){
                      mainRoom.saveAvatar(msg);
                  }else{
                      var limit = mainRoom.avatarImages.length-1;
                      alert('Please select from 0 to ' + limit );
                  }
                  dom.$mainMessageInput.val(null);
                  break; 
            //clear simply the inputarea
              default:
                  dom.$mainMessageInput.val(null); 
                break;
            }
        return;
        }
    },

//Show the possible  avatars in the chat
    avatarChoiceMessage: function (array){
      var images = "";
      for(let i = 0; i<array.length;i++){
        images +=  '<span>'+ i+ ' </span><figure class="avatar inline"><img src="./img/' + array[i] +'"/></figure>';
      }
      $('<div class="message new avatars">' + images + '</div>').appendTo(dom.$mainMessages.find('.mCSB_container').addClass('new'));

    }


}





