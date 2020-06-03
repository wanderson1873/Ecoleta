
function populateUfs() {
    const ufselect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos")
    .then( res => res.json() )
    .then( states => {

        for( const state of states ) {
            ufselect.innerHTML += `<option value="${state.id}">${state.nome}</option`;
        }

            
    } )
}

populateUfs()



document
    .querySelector("select[name=uf]")
    .addEventListener("change", () => {
        console.log("mudei")
    } )