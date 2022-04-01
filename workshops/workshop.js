import { checkAuth, getWorkshop, logout, updateMember } from '../fetch-utils.js';
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
var dragged;

document.addEventListener('drag', (e) => {  
    e.preventDefault();
}, false);

document.addEventListener('dragstart', (e) => {
    console.log(e);
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
    if (e.target.className === 'dropzone') {
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
    const elementPlace = e.path.length - 8;
    const memberId = e.dataTransfer.getData('text');
    const workshopID = e.path[elementPlace].id;
    console.log(elementPlace);
    const member = {
        workshop_id: workshopID
    };

    await updateMember(memberId, member);
}, false);