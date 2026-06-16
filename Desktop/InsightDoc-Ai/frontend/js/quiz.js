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
        /\*\*Question\s+\d+\*\*[\s\S]*?(?=\n\*\*Question\s+\d+\*\*|$)/g
    ) || [];

    blocks.forEach(block => {

        const questionMatch =
        block.match(
            /\*\*Question\s+\d+\*\*\s*([\s\S]*?)(?=\n\s*Option A:)/
        );

        const options = [];

        const optionMatches =
        block.match(
            /^\s*Option [A-D]:.*$/gm
        ) || [];

        optionMatches.forEach(option => {

            if(
                !option.includes(
                    "Correct Answer"
                )
            ){

                options.push(
                    option.trim()
                );

            }

        });

        const correctMatch =
        block.match(
            /Correct Answer:\s*Option\s*([A-D])/i
        );

        questions.push({

            question:
            questionMatch
            ? questionMatch[1].trim()
            : "Question",

            options,

            correct:
            correctMatch
            ? correctMatch[1]
            : ""

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
    answer.match(
        /Option\s([A-D])/i
    )?.[1] || "";

    const correctLetter =
    q.correct;

    optionButtons.forEach(btn => {

        const btnLetter =
        btn.innerText.match(
            /Option\s([A-D])/i
        )?.[1] || "";

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