const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY ="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"


const createChatli = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent;
    if (className === "outgoing") {
        chatContent = `<p>${message}</p>`;
    } else {
        chatContent = `<span class="material-symbols-outlined">🤖</span><p>${message}</p>`;
    }
    chatLi.innerHTML = chatContent;
    return chatLi;
};
const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const requestOption = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    };
};

fetch(API_URL,requestOption).then(res=>res.json()).then(data=>{
    console.log(data);   
}).catch(()=>{
    console.log("error");
})


const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatbox.appendChild(createChatli(userMessage, "outgoing"));

    setTimeout(() => {
        chatbox.appendChild(createChatli("Thinking..", "incoming"));
        generateResponse();
    }, 600);
};


sendChatBtn.addEventListener("click", handleChat);
