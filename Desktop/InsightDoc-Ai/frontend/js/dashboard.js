const user =
JSON.parse(
localStorage.getItem("user")
);

if(!user){

window.location.href =
"index.html";

}

document.getElementById(
"username"
).innerText =
user.username;

document.getElementById(
"avatar"
).innerText =
user.username.charAt(0).toUpperCase();

function logout(){

localStorage.removeItem(
"user"
);

window.location.href =
"index.html";

}