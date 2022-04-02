import { checkAuth, getWorkshop, logout, updateDraggedMember } from '../fetch-utils.js';
import { renderWorkshop } from '../render-utils.js';

const workshopEl = document.querySelector('#workshop-display');
const searchBar = document.querySelector('#search-bar');

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
        document.addEventListener('drop', drop);
    }
}

searchBar.addEventListener('input', async () => {
    const userInput = searchBar.value;
    const workshops = await getWorkshop(userInput);

    workshopEl.textContent = '';

    for (let workshop of workshops){
        const workshopList = renderWorkshop(workshop);
        workshopEl.append(workshopList);

    }
});

window.addEventListener('load', async () =>{
    await getWorkshop();

    fetchAndDisplayWorkshops();
});

//drag and drop names into dropzones
//eslint-disable-next-line
let dragged;

document.addEventListener('drag', (e) => {  
    e.preventDefault();
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
        e.target.style.background = 'lightgray';
    }
}, false);

document.addEventListener('dragleave', (e) => {
    if (e.target.className === 'dropzone') {
        e.target.style.background = '';
    }
}, false);

document.addEventListener('drop', async (e) => {
    e.preventDefault();
    if (e.target.className === 'dropzone'){
        e.target.style.background = 'transparent';
    }
}, false);

async function drop(e){
    const memberID = e.dataTransfer.getData('text');
    const memberElement = document.getElementById(memberID);
    const elementPlace = e.path.length - 8;
    e.path[elementPlace].childNodes[1].append(memberElement);
    const workshopID = e.path[elementPlace].id;

    await updateDraggedMember(memberID, workshopID);
    fetchAndDisplayWorkshops();
}