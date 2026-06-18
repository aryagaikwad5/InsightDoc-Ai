let questions = [];

let currentQuestion = 0;

let score = 0;

const rawQuiz =
localStorage.getItem(
    "quiz"
);

if(rawQuiz){

    const blocks =
    rawQuiz.match(
        /Q\d+\.[\s\S]*?(?=Q\d+\.|$)/g
    ) || [];

    blocks.forEach(block => {

        const lines =
        block
        .split("\n")
        .map(line => line.trim())
        .filter(line => line);

        const question =
        lines[0];

        const options =
        lines.filter(
            line =>
            /^[A-D]\./.test(line)
        );

        const correctLine =
        lines.find(
            line =>
            line.startsWith(
                "Correct Answer:"
            )
        );

        const correct =
        correctLine
        ?
        correctLine
        .replace(
            "Correct Answer:",
            ""
        )
        .trim()
        :
        "";

        questions.push({

            question,

            options,

            correct

        });

    });


}


function renderQuestion() {

    if (
        currentQuestion >=
        questions.length
    ) {

        document.getElementById(
            "questionCard"
        ).innerHTML =
        `Quiz Finished 🎉 <br><br>
        Final Score: ${score}/${questions.length}`;

        document.getElementById(
            "optionsContainer"
        ).innerHTML = "";

        return;
    }

    const q =
    questions[currentQuestion];

    document.getElementById(
        "questionCard"
    ).innerHTML =
    q.question;

    let html = "";

    q.options.forEach(option => {

        html += `
        <button
            class="option-btn"
            onclick="selectAnswer(this,'${option.replace(/'/g,"")}')">

            ${option}

        </button>

        <br><br>
        `;

    });

    document.getElementById(
        "optionsContainer"
    ).innerHTML =
    html;

}


function selectAnswer(button, answer) {

    const q =
    questions[currentQuestion];

    const optionButtons =
    document.querySelectorAll(".option-btn");

    optionButtons.forEach(btn => {

        btn.disabled = true;

    });

    const selected =
    answer.charAt(0);

    const correctLetter =
    q.correct.charAt(0);

    optionButtons.forEach(btn => {

        const btnLetter =
        btn.innerText.trim().charAt(0);

        if(btnLetter === correctLetter){

            btn.style.background =
            "#22c55e";

            btn.style.color =
            "white";
        }

    });

    if(selected === correctLetter){

        score++;

    }

    else{

        button.style.background =
        "#ef4444";

        button.style.color =
        "white";
    }

        document.getElementById(
            "scoreText"
        ).innerText =
        "Score: " + score;
    }


function nextQuestion() {

    currentQuestion++;

    renderQuestion();

}

renderQuestion();

if(!localStorage.getItem("user")){

    window.location.replace(
        "index.html"
    );

}