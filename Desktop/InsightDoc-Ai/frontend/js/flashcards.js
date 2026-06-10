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
        /- Answer: .*/g
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
                    "- Answer: ",
                    ""
                )

            });

        }

    }

}


function renderCard(){

    const card =
    document.getElementById(
        "flashcard"
    );

    if(
        flashcards.length === 0
    ){

        card.innerHTML =
        "No Flashcards Found";

        return;
    }

    if(showingAnswer){

        card.innerHTML =
        flashcards[
            currentIndex
        ].answer;

    }

    else{

        card.innerHTML =
        flashcards[
            currentIndex
        ].question;

    }

}


function flipCard(){

    showingAnswer =
    !showingAnswer;

    renderCard();

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