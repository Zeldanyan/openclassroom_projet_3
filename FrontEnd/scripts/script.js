// javascript projet 3 - zeldanyan

// function recupere reponse json d'une api
async function get_api(link) {
    try {
        const api_link = await fetch(api+link);

        if (api_link.ok) {
            const json = await api_link.json();
            if (link === "works") {
                window.localStorage.setItem("works", JSON.stringify(json));
            }
            return (json);
        }
    } catch (error) {
        if (link === "works") {
            const local_work = window.localStorage.getItem("works");
            //const local_work_json = JSON.parse(local_work);
            console.log("test");
            //console.log(local_work_json);
            return JSON.parse(local_work);
        }
    }
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
        } else if (filtre.value === 1 && work[i].categoryId === 1) { // category, id 1 = "Objets"
            gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        } else if (filtre.value === 2 && work[i].categoryId === 2) { // category, id 2 = "Appartements"
            gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        } else if (filtre.value === 3 && work[i].categoryId === 3) { // category, id 3 = "Hotels & restaurants"
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

        // supprimer projet
        trashLink.addEventListener("click", f_delete_work(work[i].id, work[i].title));

        i++;
    }

    // ajouter un element
    document.querySelector(".button_module").addEventListener("click", function() {
        f_add_work();
    });

    //fermer la fenetre modale
    document.querySelector(".close").addEventListener("click", function() {
        popup_edit.style.display = "none";
    });

    
}

// fonction de suppression de projet
function f_delete_work(suppr_id, suppr_title) {
    return async function() {
        const delete_response = await fetch(api + "works/" + suppr_id,{
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + token,
            },
        })
        if (delete_response.ok) {
            f_mini_work();
            f_work(null);
        } else {

        }
    }
}

// fonction pour ajouter un projet
async function f_add_work() {
    const module = document.querySelector(".edit_content");
    const categ = await get_api("categories");
    let new_img;
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
        '<select name="categorie" id="categorie" class="input">' +
        '<option value = ""></option>';
        
    i = 0;
    while (i < categ.length) {
        html_txt += '<option value = '+ categ[i].id +'>'+ categ[i].name +'</option>';
        i++;
    }

    html_txt += '</select>' +
        '<hr>' +
        '<input type="submit" class="button_module" value="Valider">' +
    '</form>';

    module.innerHTML = html_txt;

    document.querySelector(".button_module").style.backgroundColor = "#A7A7A7";
    document.querySelector(".button_module").style.cursor = "no-drop";

    // précedent
    document.querySelector(".back").addEventListener("click", function() {
        f_mini_work();
    });

    //fermer la fenetre modale
    document.querySelector(".close").addEventListener("click", function() {
        popup_edit.style.display = "none";
    });

    // ajout photo
    document.getElementById("photo").addEventListener("change", function() {
        new_img = document.getElementById("photo").files[0];
        const new_img_link = URL.createObjectURL(new_img);

        if (new_img.size > 4*(1024 ** 2)) {
            console.log("!!! max: 4mo !!!");
            document.querySelector("#add_photo p").textContent = "erreur, fichier trop volumineux : 4mo max"
            document.querySelector("#add_photo p").style.color = "red";
            document.getElementById("add_photo").style.border = "2px solid red";
        } else {
            document.getElementById("add_photo").style.backgroundImage = "url(" + new_img_link + ")";
            document.getElementById("add_photo").innerHTML = "";
            document.querySelector(".button_module").style.backgroundColor = "#1D6154";
            document.querySelector(".button_module").style.cursor = "pointer";
            document.getElementById("add_photo").style.border = "none";
        }
    });

    // valider
    document.querySelector(".button_module").addEventListener("click", async function(event) {
        event.preventDefault(); // empeche de recharger la page
        const create_img = new_img;
        const create_title = document.getElementById("titre").value;
        const create_categ = document.getElementById("categorie").value;

        document.getElementById("titre").style.border = "none";
        document.getElementById("categorie").style.border = "none";
        document.getElementById("add_photo").style.border = "none";

        //verifier que tout est correctement completer
        if (document.querySelector(".button_module").style.cursor == "pointer" && create_title !== "" && create_categ !== "") {
            let data = new FormData();

            data.append("image", create_img);
            data.append("title", create_title);
            data.append("category", create_categ);

            const data_response = await fetch(api + "works", { //envoie des donnée a l'api
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + token,
                },
                body: data,
            });

            if (data_response.ok) { // envoie reussi
                popup_edit.style.display = "none";
                f_work(null);
            } else { // error
                console.log("error:");
                console.log(data_response);
            }
        } else {

            if (document.querySelector(".button_module").style.cursor != "pointer") {
                document.getElementById("add_photo").style.border = "2px solid red";
            }
            if (create_title == "") {
                document.getElementById("titre").style.border = "2px solid red";
            }
            if (create_categ == "") {
                document.getElementById("categorie").style.border = "2px solid red";
            }
        }
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