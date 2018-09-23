//In order to use jquery + the custom scrollbar
var $ = require('jquery');
require("jquery-mousewheel")($);
require('malihu-custom-scrollbar-plugin')($);

import "./jqueryUI.js";			//to enable the draggable function
import '../css/main.scss';		//all of the styles

//This is where a bot will ask questions to user to gather the following data
// username, userAvatar
// After the gathering it will open the chat_room div, where the user will be able to chat with others
import "./mainRoom.js";



//This is where the users will be able to chat with each other
import './chat.js';	

