let flashcards = [];

let currentIndex = 0;

let showingAnswer = false;


const rawData =
localStorage.getItem(
    "flashcards"
);

if(rawData){

    const blocks =
    rawData.match(
        /Q\d+\.[\s\S]*?(?=Q\d+\.|$)/g
    ) || [];

    blocks.forEach(block => {

        const questionMatch =
        block.match(
            /(Q\d+\..*)/
        );

        const answerMatch =
        block.match(
            /Answer:\s*([\s\S]*)/
        );

        if(
            questionMatch &&
            answerMatch
        ){

            flashcards.push({

                question:
                questionMatch[1]
                .trim(),

                answer:
                answerMatch[1]
                .trim()

            });

        }

    });

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

if(!localStorage.getItem("user")){

    window.location.replace(
        "index.html"
    );

}