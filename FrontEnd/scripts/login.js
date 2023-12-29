async function f_login () {
    const user_login = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("password").value
    }
    const user_login_json = JSON.stringify(user_login);

     const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: user_login_json
    });
    const reponse_json = await reponse.json();

    if (reponse.ok === true) {
        window.localStorage.setItem("token", reponse_json.token); //stocker le token
        window.location.href="index.html";
    } else {
        console.log(reponse_json.message);
        document.getElementById("email").style.border ="2px solid red";
        document.getElementById("password").style.border ="2px solid red";
        document.getElementById("code_fail").innerHTML ="Erreur<br>dans l’identifiant ou le mot de passe"; //message erreur
        
    }
}

const login = document.getElementById("connect");

login.addEventListener("click", (event) => {
    event.preventDefault();
    f_login();
});