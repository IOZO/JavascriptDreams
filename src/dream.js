export {buildAllDreams};
import {data} from './data';
import {addMarkerOnMap} from './map';

const dreamsContainer = document.querySelector("#dreams-container");

function buildAllDreams(){
 while(dreamsContainer.hasChildNodes()) dreamsContainer.removeChild(dreamsContainer.lastChild);
 data.forEach(buildSingleDream)
}

function buildSingleDream(dream)
{
    const dreamElement = document.createElement("div");
    dreamElement.innerHTML = `<div class="card text-center">
        <h5 class="card-header font-weight-bold">${dream.description}</h5>
        <img src="${dream.imagePath}" class="card-img-top" alt="...">

        <div class="card-body">
            <a href="${dream.link}" class="btn btn-${dream.done?"secondary":"danger"} btn-block font-weight-bold">${dream.done?"Je veux le refaire":"Je me lance !"}</a>
        </div>
        <div class="card-footer text-right">
            <a href="#" class="btn btn-sm btn-outline-secondary">Visiter</a> 
            <a href="#" class="btn btn-sm btn-outline-dark">Plus d'info</a>
        </div>
    </div>`;

    dreamsContainer.appendChild(dreamElement);
    addMarkerOnMap(dream);
}