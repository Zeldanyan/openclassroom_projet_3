// javascript projet 3 - zeldanyan

// function recupere reponse json d'une api
async function get_api(link) {
    const api_link = await fetch(api+link);
    const json = await api_link.json();
    return (json);
}

// function pour les projets
async function f_work(filtre) {
    const gallery = document.querySelector(".gallery");
    const work = await get_api("works");

    //maj class du filtre
    i = 0;
    if (filtre !== null) {
        while (i < btn_filtre.length) {
            btn_filtre[i].classList.remove("select");
            i++;
        }
        filtre.classList.add("select");
    }

    // generer les travaux avec et sans les filtres
    gallery.innerHTML = ""
    i = 0;
    while (i < work.length) { 
        if (filtre === null || filtre.value === 0) { // category, tout les projets
            gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        } else if (filtre.value === 1 && work[i].category.id === 1) { // category, id 1 = "Objets"
            gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        } else if (filtre.value === 2 && work[i].category.id === 2) { // category, id 2 = "Appartements"
            gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        } else if (filtre.value === 3 && work[i].category.id === 3) { // category, id 3 = "Hotels & restaurants"
            gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        }
        i++;
    }
}

let i = 0;
//doc api = http://localhost:5678/api-docs/
const api = "http://localhost:5678/api/";
const btn_filtre = [
    document.getElementById("menu_all"),
    document.getElementById("menu_objects"),
    document.getElementById("menu_apparts"),
    document.getElementById("menu_HR")
];
const btn_log = document.getElementById("log");
let token = window.localStorage.getItem("token");
const btn_edit = document.getElementById("edit");
const popup_edit = document.getElementById("window_edit");
token = "test";

f_work(null);
btn_filtre[0].addEventListener("click", function() {f_work(btn_filtre[0]);});
btn_filtre[1].addEventListener("click", function() {f_work(btn_filtre[1]);});
btn_filtre[2].addEventListener("click", function() {f_work(btn_filtre[2]);});
btn_filtre[3].addEventListener("click", function() {f_work(btn_filtre[3]);});

if (token !== null) {
    btn_log.textContent = "logout";
    btn_log.href = "#";
    btn_edit.style.display = "flex";
}

// log out
btn_log.addEventListener("click", function() {
    if (token !== null) {
        window.localStorage.removeItem("token");
        window.location.reload();
    }
});

// ouvrir la fenetre modal
btn_edit.addEventListener("click", function() {
    popup_edit.style.display = "flex";
});

//fermer la fenetre modale
document.querySelector(".close").addEventListener("click", function() {
    popup_edit.style.display = "none";
})