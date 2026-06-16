let flashcards = [];

let currentIndex = 0;

let showingAnswer = false;


const rawData =
localStorage.getItem(
    "flashcards"
);


if(rawData){

    const questions =
    rawData.match(
        /\*\*Q\d+\..*?\*\*/g
    );

    const answers =
    rawData.match(
        /Answer:\s*.*/g
    );

    if(
        questions &&
        answers
    ){

        for(
            let i = 0;
            i < Math.min(
                questions.length,
                answers.length
            );
            i++
        ){

            flashcards.push({

                question:
                questions[i]
                .replace(/\*\*/g,""),

                answer:
                answers[i]
                .replace(
                    "Answer:",
                    ""
                )
                .trim()

            });

        }

    }

}


function renderCard(){

    const card =
    document.getElementById(
        "flashcard"
    );

    const counter =
    document.getElementById(
        "cardCounter"
    );

    if(
        flashcards.length === 0
    ){

        card.innerHTML =
        "No Flashcards Found";

        counter.innerText =
        "Card 0 / 0";

        return;
    }

    counter.innerText =
    `Card ${currentIndex + 1} / ${flashcards.length}`;

    if(showingAnswer){

        card.innerHTML =
        `
        <h2>✅ Answer</h2>
        <br>
        ${flashcards[currentIndex].answer}
        `;

    }

    else{

        card.innerHTML =
        `
        <h2>❓ Question</h2>
        <br>
        ${flashcards[currentIndex].question}
        `;

    }

}


function flipCard(){

    const card =
    document.getElementById(
        "flashcard"
    );

    card.classList.add(
        "flip"
    );

    setTimeout(() => {

        showingAnswer =
        !showingAnswer;

        renderCard();

        card.classList.remove(
            "flip"
        );

    }, 150);

}


function nextCard(){

    if(
        currentIndex <
        flashcards.length - 1
    ){

        currentIndex++;

        showingAnswer =
        false;

        renderCard();

    }

}


function previousCard(){

    if(
        currentIndex > 0
    ){

        currentIndex--;

        showingAnswer =
        false;

        renderCard();

    }

}



renderCard();