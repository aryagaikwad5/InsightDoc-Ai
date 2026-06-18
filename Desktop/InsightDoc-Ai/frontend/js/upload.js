const API_URL =
"http://127.0.0.1:5000/api/document/upload";

const currentUser =
JSON.parse(
    localStorage.getItem(
        "user"
    )
);

if(!currentUser){

    window.location.href =
    "index.html";
}



async function uploadPDF() {

    document.getElementById(
        "summaryCard"
    ).style.display = "none";

    document.getElementById(
        "previewCard"
    ).style.display = "none";

    document.getElementById(
        "currentSessionCard"
    ).style.display = "none";

    const fileInput =
    document.getElementById("pdfFile");

    const file =
    fileInput.files[0];

    if (!file) {

        alert("Please select a PDF");

        return;
    }

    const formData =
    new FormData();

    formData.append(
        "file",
        file
    );

    document.getElementById(
        "progressContainer"
    ).style.display =
    "block";

    document.getElementById(
        "progressFill"
    ).style.width =
    "30%";

    try {

        const response =
        await fetch(
            API_URL,
            {
                method: "POST",
                body: formData
            }
        );

        console.log(
            "STATUS:",
            response.status
        );

        const data =
        await response.json();

        console.log("FULL RESPONSE:", data);

        console.log(
            "FLASHCARDS:",
            data.flashcards
        );

        console.log(
            "QUIZ:",
            data.quiz
        );

        console.log(
            "TEXT:",
            data.text
        );

        document.getElementById(
            "progressFill"
        ).style.width =
        "100%";

        document.getElementById(
            "uploadStatus"
        ).innerText =
        "✅ Upload Successful";

        setTimeout(() => {

            document.getElementById(
                "progressContainer"
            ).style.display =
            "none";

            document.getElementById(
                "progressFill"
            ).style.width =
            "0%";

        }, 1500);

        if (data.success) {

            /* Show Summary */

            document.getElementById(
                "summaryCard"
            ).style.display =
            "block";

            document.getElementById(
                "summaryText"
            ).innerText =
            data.summary;


            /* Save Active Session */

            localStorage.setItem(
                "summary",
                data.summary
            );

            localStorage.setItem(
                "flashcards",
                data.flashcards
            );

            localStorage.setItem(
                "quiz",
                data.quiz
            );

            localStorage.setItem(
                "documentText",
                data.text
            );

            localStorage.setItem(
                "filename",
                data.filename
            );

            localStorage.setItem(
                "resumeSession",
                "true"
            );


            /* Save History */

            console.log(
                "Saving history..."
            );

            const user =
            JSON.parse(
                localStorage.getItem(
                    "user"
                )
            );

            if(!user){

                alert(
                    "Please login again."
                );

                window.location.href =
                "index.html";

                return;
            }

            console.log(
                "USER FROM STORAGE:",
                localStorage.getItem("user")
            );

            console.log(
                "PARSED USER:",
                user
            );

            if(!user){

                alert(
                    "Please login again."
                );

                window.location.href =
                "index.html";

                return;
            }

            const historyKey =
            "documentHistory_" +
            user.username;



            let history =
            JSON.parse(
                localStorage.getItem(
                    historyKey
                )
            ) || [];

            history.unshift({

                filename:
                data.filename,

                summary:
                data.summary,

                flashcards:
                data.flashcards,

                quiz:
                data.quiz,

                documentText:
                data.text,

                uploadedAt:
                new Date()
                .toLocaleString()

            });

            /* Keep only latest 10 */

            history =
            history.slice(
                0,
                10
            );

            console.log(
                history
            );

            localStorage.setItem(

                historyKey,

                JSON.stringify(
                    history
                )

            );


            /* Preview */

            document.getElementById(
                "previewCard"
            ).style.display =
            "block";

            document.getElementById(
                "previewText"
            ).innerText =
            data.text;


            /* Current Session */

            document.getElementById(
                "currentSessionCard"
            ).style.display =
            "block";

            document.getElementById(
                "currentFilename"
            ).innerText =
            data.filename;


            /* Quick Actions */

            


            document.getElementById(
                "summaryCard"
            ).scrollIntoView({

                behavior:
                "smooth"

            });

        }
        else {

            alert(
                data.message
            );
        }

    }
    catch (error) {

        console.error(
            "UPLOAD ERROR:",
            error
        );

        alert(
            "Upload Failed"
        );

    }
}


/* Restore Previous Study Session */

window.addEventListener(

    "load",

    function () {

        const resume =
        localStorage.getItem(
            "resumeSession"
        );

        if (
            resume !== "true"
        ) {

            return;
        }

        const summary =
        localStorage.getItem(
            "summary"
        );

        const documentText =
        localStorage.getItem(
            "documentText"
        );

        const filename =
        localStorage.getItem(
            "filename"
        );

        if (

            summary &&
            documentText

        ) {

            /* Summary */

            document.getElementById(
                "summaryCard"
            ).style.display =
            "block";

            document.getElementById(
                "summaryText"
            ).innerText =
            summary;


            /* Preview */

            document.getElementById(
                "previewCard"
            ).style.display =
            "block";

            document.getElementById(
                "previewText"
            ).innerText =
            documentText;


            /* Current Session */

            document.getElementById(
                "currentSessionCard"
            ).style.display =
            "block";

            document.getElementById(
                "currentFilename"
            ).innerText =
            filename ||
            "Untitled Document";


            /* Quick Actions */

            

        }

    }

);