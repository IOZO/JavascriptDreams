export {buildAllDreams};
import {data} from './data';
import {addMarkerOnMap} from './map';
import {visitDreamOnMap} from './map';

const dreamsContainer = document.querySelector("#dreams-container");

function buildAllDreams(){
 while(dreamsContainer.hasChildNodes()) dreamsContainer.removeChild(dreamsContainer.lastChild);
 data.forEach(buildSingleDream);
 addDreamsListener();
}

function buildSingleDream(dream)
{
    const dreamElement = document.createElement("div");
    dreamElement.innerHTML = `<div class="card text-center" id="${dream.id}">
        <h5 class="card-header font-weight-bold">${dream.description}</h5>
        <img src="${dream.imagePath}" class="card-img-top" alt="...">

        <div class="card-body">
            <a href="#" class="button-action btn btn-${dream.done?"secondary":"danger"} btn-block font-weight-bold">${dream.done?"Je veux le refaire":"Je me lance !"}</a>
        </div>
        <div class="card-footer text-right">
            <a href="#" class="button-visit btn btn-sm btn-outline-secondary">Visiter</a> 
            <a href="${dream.link}" target="_blank" class="btn btn-sm btn-outline-dark">Plus d'info</a>
        </div>
    </div>`;

    dreamsContainer.appendChild(dreamElement);
    addMarkerOnMap(dream);
}

function addDreamsListener(){
    document.querySelectorAll(".button-visit").forEach(item => {
        item.addEventListener("click",event => {
            const id = item.parentElement.parentElement.getAttribute("id");
            visitDream(id);
        });
    });

    document.querySelectorAll(".button-action").forEach(item => {
        item.addEventListener("click",event => {
            const id = item.parentElement.parentElement.getAttribute("id");
            toggleDreamAction(id);
        });
    });
}

function visitDream(dreamId){
    let position = data.filter(item => item.id == dreamId)[0].coordinates;
    visitDreamOnMap(position);
}

function toggleDreamAction(dreamId){
    let dream = data.filter(item => item.id == dreamId)[0];
    dream.done = !dream.done;
    buildAllDreams();
}