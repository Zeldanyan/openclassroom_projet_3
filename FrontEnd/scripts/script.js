// javascript projet 3 - zeldanyan

// function recupere reponse json d'une api
async function get_api(link) {
    const api_link = await fetch(api+link);
    const json = await api_link.json();
    return (json);
}

// function pour les projets
async function works() {
    let i = 0;
    const work = await get_api("works");
    console.log(work);

    while (i < work.length) {
        console.log(work[i].title);
        i++;
    }
}

const api = "http://localhost:5678/api/";
works();