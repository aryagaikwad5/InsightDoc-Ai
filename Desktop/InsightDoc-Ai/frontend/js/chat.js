const API_URL =
"http://127.0.0.1:5000/api/document/chat";


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
        Thinking...
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