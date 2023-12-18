// javascript projet 3 - zeldanyan

// function recupere reponse json d'une api
async function get_api(link) {
    const api_link = await fetch(api+link);
    const json = await api_link.json();
    if (link = "works") {
        window.localStorage.setItem("works", json);
    }
    return (json);
}

// function pour les projets
async function f_work(filtre) {
    const gallery = document.querySelector(".gallery");
    const work = await get_api("works");

    //maj class du filtre
    if (filtre !== null) {
        i = 0;
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


//fonction pour afficher les projet dans le module
async function f_mini_work() {
    const module = document.querySelector(".edit_content");
    const work = await get_api("works");

    // generer les travaux avec et sans les filtres
    module.innerHTML = '<a class="close"><i class="fa-solid fa-xmark"></i></a>' +
		'<h3>Galerie photo</h3>' +
		'<div class="mini_work"></div>' +
		'<button class="button_module">Ajouter une photo</button>';
    
    const gallery = document.querySelector(".mini_work");
    gallery.innerHTML = "";
    i = 0;
    while (i < work.length) {
        const figure = document.createElement("figure");
        figure.classList.add("mini_card");

        const trashLink = document.createElement("a");
        trashLink.classList.add("trash");
        trashLink.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        figure.style.backgroundImage = "url("+work[i].imageUrl+")";

        figure.appendChild(trashLink);
        gallery.appendChild(figure);

        i++;
    }

    // ajouter un element
    document.querySelector(".button_module").addEventListener("click", function() {
        f_add_work();
    });

    //fermer la fenetre modale
    document.querySelector(".close").addEventListener("click", function() {
        popup_edit.style.display = "none";
    })
}

// fonction pour ajouter un projet
async function f_add_work() {
    const module = document.querySelector(".edit_content");
    const categ = await get_api("categories");
    let html_txt = ""; // structure html du module pour l'ajout de projet

    html_txt = '<a class="back"><i class="fa-solid fa-arrow-left"></i></a>' +
    '<a class="close"><i class="fa-solid fa-xmark"></i></a>' +
    '<h3>Ajout photo</h3>' +
    '<form action="" method="post">' +
        '<div id="add_photo">' +
            '<i class="fa-regular fa-image"></i>' +
            '<label for="photo" class="btn_photo">+Ajouter photo</label>' +
            '<input type="file" name="photo" id="photo" accept=".jpg, .png">' +
            '<p>jpg, png : 4mo max</p>' +
        '</div>' +
        '<label for="titre">Titre</label>' +
        '<input type="text" name="titre" id="titre" class="input">' +
        '<label for="categorie">Catégorie</label>' +
        '<select name="categorie" id="categorie" class="input">';
        
    i = 0;
    while (i < categ.length) {
        html_txt += '<option value = '+ categ[i].name +'>'+ categ[i].name +'</option>';
        i++;
    }

    html_txt += '</select>' +
        '<hr>' +
        '<input type="submit" class="button_module" value="Valider">' +
    '</form>';

    module.innerHTML = html_txt;

    // précedent
    document.querySelector(".back").addEventListener("click", function() {
        f_mini_work();
    });

    //fermer la fenetre modale
    document.querySelector(".close").addEventListener("click", function() {
        popup_edit.style.display = "none";
    })

    // valider
    document.querySelector(".button_module").addEventListener("click", function(event) {
        event.preventDefault(); // empeche de recharger la page
    });
}

let i = 0;
//doc api = http://localhost:5678/api-docs/
const api = "http://localhost:5678/api/";
let token = window.localStorage.getItem("token");

const btn_filtre = [
    document.getElementById("menu_all"),
    document.getElementById("menu_objects"),
    document.getElementById("menu_apparts"),
    document.getElementById("menu_HR")
];
const btn_log = document.getElementById("log");
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
    f_mini_work();
});