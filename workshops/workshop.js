import { checkAuth, getWorkshop, logout } from '../fetch-utils.js';
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
