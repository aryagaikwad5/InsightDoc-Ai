const filename =
localStorage.getItem(
    "filename"
);

const documentText =
localStorage.getItem(
    "documentText"
);


if(filename){

    document.getElementById(
        "filename"
    ).innerText =
    "Filename: " + filename;

}


if(documentText){

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


/* Upload History */

const history =
JSON.parse(
    localStorage.getItem(
        "documentHistory"
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
            onclick="loadDocument(${index})"
            style="
                cursor:pointer;
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

    alert(
        "Loaded: " +
        doc.filename
    );

    location.reload();

}