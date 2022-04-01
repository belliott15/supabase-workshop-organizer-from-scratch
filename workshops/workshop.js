import { checkAuth, getWorkshop, logout, updateMember } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

const workshopEl = document.querySelector('#workshop-display');

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function fetchAndDisplayWorkshops(){
    workshopEl.textContent = '';

    const workshops = await getWorkshop();

    for (let workshop of workshops){
        
        const workshopList = await renderWorkshop(workshop);
        workshopEl.append(workshopList);
    }
}

window.addEventListener('load', async () =>{
    await getWorkshop();

    fetchAndDisplayWorkshops();
});

//drag and drop names into dropzones
var dragged;

document.addEventListener('drag', (e) => {

}, false);

document.addEventListener('dragstart', (e) => {
    dragged = e.target;
    e.dataTransfer.setData('text', e.target.id);
}, false);

document.addEventListener('dragend', (e) => {
    e.target.style.opacity = '';
}, false);

document.addEventListener('dragover', (e) =>{
    e.preventDefault();
}, false);

document.addEventListener('dragenter', (e) => {
    if (e.target.className === 'dropzone'){
        event.target.style.background = 'lightgray';
    }
}, false);

document.addEventListener('dragleave', (e) => {
    if(e.target.className === 'dropzone') {
        e.target.style.background = '';
    }
}, false);

document.addEventListener('drop', async (e) => {
    e.preventDefault();
    if (e.target.className === 'dropzone') {
        e.target.style.background = '';
        dragged.parentNode.removeChild(dragged);
        e.target.appendChild(dragged);
    }
    const elementPlace = e.path.length -7;
    const memberId = e.dataTransfer.getData('text');
    const workshopID = e.path[elementPlace].id;

    await updateMember(workshopID, memberId);
}, false);