let ttsEnabled = false;
const speechSynthesis = window.speechSynthesis || window.webkitSpeechSynthesis;

function replaceVars(string, char, user) {
    const replacements = {
        "{{char}}": char, 
        "{{user}}": user, 
        "<char>": char, 
        "<user>": user, 
        "{{Char}}": char, 
        "{{User}}": user, 
        "<Char>": char, 
        "<User>": user
    };

    for (const [old, newStr] of Object.entries(replacements)) {
        string = string.split(old).join(newStr);
    }

    return string;
}

let inst = replaceVars(_inst, char, user);
let charinfo = replaceVars(_charinfo, char, user);
let firstmsg = replaceVars(_firstmsg, char, user);

function displayMessage(message, className) {
    const chatLog = document.getElementById("chatLog");
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = (message);
    chatLog.appendChild(messageDiv);
    chatLog.scrollTop = chatLog.scrollHeight;
}

document.addEventListener("DOMContentLoaded", function () {
    const userInput = document.getElementById("userInput");
    const sendButton = document.getElementById("sendButton");

    userInput.addEventListener("keypress", function (event) {
        if (event.which === 13) {
            sendMessage();
        }
    });
    userInput.focus();

    sendButton.addEventListener("click", sendMessage);

    function sendMessage() {
        const userInput = document.getElementById("userInput");
        const message = userInput.value.trim();

        if (message !== "") {
            displayMessage(message, "user-message");
            run(message);
            userInput.value = "";
        }
    }

    function sendFirstMessage() {
        formattedFirstMsg = firstmsg.replace(/\n/g, '<br>');
        displayMessage(formattedFirstMsg, "ai-message");
        document.title = `${char}`;
    }

    sendFirstMessage();
});
