const API_URL =
"http://127.0.0.1:5000/api/auth";


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

window.location.href =
"dashboard.html";
}
else{

document.getElementById(
"message"
).innerText =
data.message;

}

});
}