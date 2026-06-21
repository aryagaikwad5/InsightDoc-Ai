const API_URL =
"https://insightdoc-ai-tn28.onrender.com/api/document/chat";

const filename =
localStorage.getItem(
    "filename"
);

if(filename){

    document.addEventListener(
        "DOMContentLoaded",
        () => {

            document.getElementById(
                "documentName"
            ).innerText =
            filename;

        }
    );
}

async function sendMessage(){

    const input =
    document.getElementById(
        "userInput"
    );

    const question =
    input.value.trim();

    if(!question){

        return;
    }

    const chatBox =
    document.getElementById(
        "chatBox"
    );

    chatBox.innerHTML +=
    `
    <div class="user-message">
        ${question}
    </div>
    `;

    chatBox.innerHTML +=
    `
    <div class="bot-message" id="thinking">
        🤖 InsightDoc is thinking...
    </div>
    `;

    chatBox.scrollTop =
    chatBox.scrollHeight;

    const documentText =
    localStorage.getItem(
        "documentText"
    );

    try{

        const response =
        await fetch(
            API_URL,
            {
                method:"POST",

                headers:{
                    "Content-Type":
                    "application/json"
                },

                body:JSON.stringify({

                    question:
                    question,

                    document_text:
                    documentText

                })
            }
        );

        const data =
        await response.json();

        document.getElementById(
            "thinking"
        ).remove();

        chatBox.innerHTML +=
        `
        <div class="bot-message">
            ${data.answer}
        </div>
        `;

    }

    catch(error){

        document.getElementById(
            "thinking"
        ).remove();

        chatBox.innerHTML +=
        `
        <div class="bot-message">
            Error contacting AI
        </div>
        `;
    }

    input.value = "";

    chatBox.scrollTop =
    chatBox.scrollHeight;

}

function clearChat(){

    document.getElementById(
        "chatBox"
    ).innerHTML =
    `
    <div class="bot-message">
        Hello! Ask me anything about your uploaded document.
    </div>
    `;
}


function usePrompt(prompt){

    document.getElementById(
        "userInput"
    ).value =
    prompt;
}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        document.getElementById(
            "userInput"
        ).addEventListener(
            "keypress",
            function(e){

                if(e.key === "Enter"){

                    sendMessage();

                }

            }
        );

    }
);

if(!localStorage.getItem("user")){

    window.location.replace(
        "index.html"
    );

}