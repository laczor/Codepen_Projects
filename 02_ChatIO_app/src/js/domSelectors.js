
//Selecting the messages div, to manipulate it with jquery

var dom = {
	$mainRoom: $("#mainRoom"),
	$mainChat: $("#mainRoom_chat"),
	$mainMessages: $('#mainRoom_messages'),
	$mainMessagesContent: $('#mainRoom_messages-content'),
	$mainMessageInput : $("#mainRoom_MessageInput"),
	$mainSubmit: $("#mainRoom_submit"),

// ChatRoom selectors 
	$chatRoom: $("#chatRoom"),
	$chatChat: $("#chatRoom_chat"),
	$chatUsers: $("#chatRoom_users"),
	$chatUserList: $(".user-list"),
	$chatMessages: $('#chatRoom_messages-content'),
	$chatMessageInput: $("#chatRoom_MessageInput"),
	$chatmessageSubmit: $("#chatRoom_MessageSubmit"),

//Common selectors
	$dragMe: $(".drag-me-chat"),
};


export default dom;



