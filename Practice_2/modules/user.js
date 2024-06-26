/* ───────────────────────── import required modules ──────────────────────── */
const prompt = require('prompt-sync')();

/* ──────────────────────────────── constants ─────────────────────────────── */
export const user = {
    username: "username",
    password: "password"
}


/* ──────────────────────────────── functions ─────────────────────────────── */
function login(){
    user.username = prompt("Enter your username: ");
    user.password = prompt.hide("Enter your password: ");
    return user;
}

/* ──────────────────────────────── exports ───────────────────────────────── */
module.exports = {
    login: login
}
