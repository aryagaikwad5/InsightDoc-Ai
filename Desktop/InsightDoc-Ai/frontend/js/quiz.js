let questions = [];

let currentQuestion = 0;

let score = 0;

const rawQuiz =
localStorage.getItem("quiz");


if (rawQuiz) {

    const blocks =
    rawQuiz.split("**Q");

    blocks.forEach(block => {

        if (!block.trim()) return;

        const lines =
        block.split("\n")
        .filter(line => line.trim());

        const question =
        lines[0];

        const options =
        lines.filter(
            line =>
            line.startsWith("A)") ||
            line.startsWith("B)") ||
            line.startsWith("C)") ||
            line.startsWith("D)")
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
        onclick="selectAnswer(
        '${option.replace(/'/g,"")}')">

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


function selectAnswer(answer) {

    const q =
    questions[currentQuestion];

    if (
        q.correct &&
        q.correct.includes(
            answer.charAt(0)
        )
    ) {

        score++;

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