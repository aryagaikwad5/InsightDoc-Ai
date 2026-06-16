let questions = [];

let currentQuestion = 0;

let score = 0;

const rawQuiz =
localStorage.getItem("quiz");


if (rawQuiz) {

    const blocks =
    rawQuiz.match(
        /Q\d+\.[\s\S]*?(?=Q\d+\.|$)/g
    ) || [];

    blocks.forEach(block => {

        const lines =
        block.split("\n")
        .filter(
            line => line.trim()
        );

        const question =
        lines[0];

        const options =
        lines.filter(
            line =>
                line.match(/^[A-D][.)]/)
        );

        const correct =
        lines.find(
            line =>
                line.includes(
                    "Correct Answer:"
                )
        );

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

    const correctMatch =
    q.correct.match(
        /Correct Answer:\s*([A-D])/
    );

    const correctLetter =
    correctMatch
    ? correctMatch[1]
    : "";

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

        button.style.background =
        "#22c55e";

        button.style.color =
        "white";
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