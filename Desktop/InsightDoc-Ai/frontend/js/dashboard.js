
if(!localStorage.getItem("user")){

    window.location.replace(
        "index.html"
    );

}

const filename =
localStorage.getItem("filename");

const documentText =
localStorage.getItem("documentText");

const resumeSession =
localStorage.getItem("resumeSession");


if (
    resumeSession === "true" &&
    filename &&
    documentText
) {

    document.getElementById(
        "filename"
    ).innerText =
    "Filename: " + filename;

    const words =
    documentText
    .trim()
    .split(/\s+/)
    .length;

    document.getElementById(
        "wordCount"
    ).innerText =
    "Word Count: " + words;

}
else {

    document.getElementById(
        "filename"
    ).innerText =
    "No active study session.";

    document.getElementById(
        "wordCount"
    ).innerText =
    "Upload or continue a PDF to begin.";

}


/* Upload History */

const user =
JSON.parse(
    localStorage.getItem(
        "user"
    )
);

if (
    user &&
    user.username
) {

    document.getElementById(
        "welcomeUser"
    ).innerText =
    "Welcome back, " +
    user.username +
    " 👋";

}

const historyKey =
"documentHistory_" +
user.username;

const history =
JSON.parse(
    localStorage.getItem(
        historyKey
    )
) || [];


const historyList =
document.getElementById(
    "historyList"
);


if(history.length === 0){

    historyList.innerHTML =
    "No documents found.";

}
else{

    let html = "";

    history.forEach(
        (doc,index) => {

            html += `
            <div
            class="history-item"
            style="
                padding:10px;
                margin:10px 0;
                border:1px solid #ccc;
                border-radius:10px;
            ">

                📄 ${doc.filename}

                <br>

                <small>
                    ${doc.uploadedAt}
                </small>

                <br><br>

                <div class="history-buttons">

                    <button
                        class="continue-btn"
                        onclick="loadDocument(${index})">

                        Continue

                    </button>

                    <button
                        class="delete-btn"
                        onclick="deleteDocument(${index})">

                        Delete

                    </button>

                </div>

            </div>
            `;

        }
    );

    historyList.innerHTML =
    html;

}


function loadDocument(index){

    const doc =
    history[index];

    localStorage.setItem(
        "filename",
        doc.filename
    );

    localStorage.setItem(
        "summary",
        doc.summary
    );

    localStorage.setItem(
        "flashcards",
        doc.flashcards
    );

    localStorage.setItem(
        "quiz",
        doc.quiz
    );

    localStorage.setItem(
        "documentText",
        doc.documentText
    );

    localStorage.setItem(
        "resumeSession",
        "true"
    );

    window.location.href =
    "upload.html";

}

const actionCards =
document.querySelectorAll(
    ".tool-card"
);

if (
    resumeSession !== "true"
) {

    actionCards.forEach(card => {

        card.style.opacity =
        "0.5";

        card.style.pointerEvents =
        "none";

    });

}

function deleteDocument(index){

    if(
        !confirm(
            "Delete this study session?"
        )
    ){
        return;
    }

    const doc =
    history[index];

    history.splice(
        index,
        1
    );

    localStorage.setItem(

        historyKey,

        JSON.stringify(
            history
        )

    );

    if(

        localStorage.getItem(
            "filename"
        ) === doc.filename

    ){

        localStorage.removeItem(
            "filename"
        );

        localStorage.removeItem(
            "summary"
        );

        localStorage.removeItem(
            "flashcards"
        );

        localStorage.removeItem(
            "quiz"
        );

        localStorage.removeItem(
            "documentText"
        );

        localStorage.removeItem(
            "resumeSession"
        );

    }

    location.reload();

}

if(user){

    document.getElementById(
        "dropdownUsername"
    ).innerText =
    "👤 " + user.username;

    document.getElementById(
        "avatarInitial"
    ).innerText =
    user.username
    .charAt(0)
    .toUpperCase();

}


function toggleDropdown(){

    document.getElementById(
        "dropdownMenu"
    ).classList.toggle(
        "show"
    );

}


window.onclick = function(event){

    if(

        !event.target.closest(
            ".profile-dropdown"
        )

    ){

        const menu =
        document.getElementById(
            "dropdownMenu"
        );

        if(menu){

            menu.classList.remove(
                "show"
            );

        }

    }

}


function logout(){

    localStorage.removeItem(
        "user"
    );

    /* Clear active session */

    localStorage.removeItem(
        "filename"
    );

    localStorage.removeItem(
        "summary"
    );

    localStorage.removeItem(
        "flashcards"
    );

    localStorage.removeItem(
        "quiz"
    );

    localStorage.removeItem(
        "documentText"
    );

    localStorage.removeItem(
        "resumeSession"
    );

    window.location.replace(
        "index.html"
    );

}

