$(document).ready()
{
	var webSocket = new WebSocket("ws://localhost:8080/WebSocketChat/ChatServer");
	var messagesTextArea = document.getElementById("messagesTextArea");

	webSocket.onopen = function(message) {
		processOpen(message);
	};

	webSocket.onmessage = function(message) {
		processMessage(message);
	};

	webSocket.onclose = function(message) {
		processClose(message);
	};

	webSocket.onerror = function(message) {
		processError(message);
	};
}

function processOpen(message) {
	messagesTextArea.value += "Server Connect..." + "\n";
}

function processMessage(message) {
	messagesTextArea.value += "Receive From Server ==> " + message.data + "\n";
}

function sendMessage() {
	if (textMessage.value != "close") {
		webSocket.send(textMessage.value);
		messagesTextArea.value += "Send to Server ==> " + textMessage.value + "\n";
		textMessage.value = "";
	} else {
		webSocket.close();
	}
}

function processClose(message) {
	webSocket.send("client disconnected...");
	messagesTextArea.value += "Server Disconnect..." + "\n";
}

function processError(message) {
	messagesTextArea.value += "error... \n";
}