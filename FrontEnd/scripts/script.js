// javascript projet 3 - zeldanyan

// function recupere reponse json d'une api
async function get_api(link) {
    const api_link = await fetch(api+link);
    const json = await api_link.json();
    return (json);
}

// function pour les projets
async function f_work() {
    const gallery = document.querySelector(".gallery");
    const work = await get_api("works");

    let i = 0;
    while (i < work.length) {
        gallery.innerHTML += "<figure><img src=" + work[i].imageUrl + " alt="+ work[i].title +"><figcaption>"+ work[i].title +"</figcaption></figure>";
        i++;
    }
}

//doc api = http://localhost:5678/api-docs/
const api = "http://localhost:5678/api/";
f_work();