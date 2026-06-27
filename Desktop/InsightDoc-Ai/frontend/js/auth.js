const API_URL =
"https://insightdoc-ai-tn28.onrender.com/api/auth";


// REGISTER

const registerForm =
document.getElementById("registerForm");

if(registerForm){

registerForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const username =
document.getElementById(
"regUsername"
).value;

const password =
document.getElementById(
"regPassword"
).value;

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#])[A-Za-z\d@$!%*?&^#]{8,}$/;

if(!passwordRegex.test(password)){

    document.getElementById("message").innerText =
    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.";

    return;
}

const res = await fetch(
`${API_URL}/register`,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
username,
password
})
}
);

const data =
await res.json();

document.getElementById(
"message"
).innerText =
data.message;

});
}


// LOGIN

const loginForm =
document.getElementById(
"loginForm"
);

if(loginForm){

loginForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const username =
document.getElementById(
"username"
).value;

const password =
document.getElementById(
"password"
).value;

const res = await fetch(
`${API_URL}/login`,
{
method:"POST",

headers:{
"Content-Type":
"application/json"
},

body:JSON.stringify({
username,
password
})
}
);

const data =
await res.json();

if(data.success){

localStorage.setItem(
    "user",
    JSON.stringify(data.user)
);

/* Clear previous active session */

localStorage.removeItem(
    "filename"
);

localStorage.removeItem(
    "summary"
);

localStorage.removeItem(
    "flashcards"
);

localStorage.removeItem(
    "quiz"
);

localStorage.removeItem(
    "documentText"
);

localStorage.removeItem(
    "resumeSession"
);

window.location.href =
"intro.html";
}
else{

document.getElementById(
"message"
).innerText =
data.message;

}

});
}

function togglePassword(inputId, button){

    const input =
    document.getElementById(inputId);

    if(input.type === "password"){

        input.type = "text";
        button.innerText = "Hide";

    }

    else{

        input.type = "password";
        button.innerText = "Show";

    }

}