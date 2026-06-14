
const API_URL =
"http://127.0.0.1:5000/api/document/upload";

async function uploadPDF() {

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

        const data =
        await response.json();

        console.log(
            "FULL RESPONSE:",
            data
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

            document.getElementById(
                "summaryCard"
            ).style.display =
            "block";

            document.getElementById(
                "summaryText"
            ).innerText =
            data.summary;

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

            console.log("Saving history...");

            let history = JSON.parse(
                localStorage.getItem(
                    "documentHistory"
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

            console.log(history);

            localStorage.setItem(

                "documentHistory",

                JSON.stringify(
                    history
                )

            );


            document.getElementById(
                "previewCard"
            ).style.display =
            "block";

            document.getElementById(
                "previewText"
            ).innerText =
            data.text;

            document.getElementById(
                "summaryCard"
            ).scrollIntoView({
                behavior: "smooth"
            });

        }else {

            alert(
                data.message
            );
        }

    } catch (error) {

        console.error(error);

        alert(
            "Upload Failed"
        );
    }
}