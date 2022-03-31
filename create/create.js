import { createMember, getWorkshop } from '../fetch-utils.js';

const formEl = document.querySelector('form');
const workshopDropdown = document.querySelector('select');

formEl.addEventListener('submit', async (e) =>{
    e.preventDefault();

    const data = new FormData(formEl);
    const firstName = data.get('first-name');
    const lastName = data.get('last-name');
    const workshopID = data.get('dropdown');

    const member = {
        first_name: firstName,
        last_name: lastName,
        workshop_id: workshopID
    };
    console.log(workshopID);

    await createMember(member);
    formEl.reset();
});

window.addEventListener('load', async () =>{
    const workshops = await getWorkshop();

    for (let workshop of workshops){
        const option = document.createElement('option');

        option.textContent = workshop.topic;
        option.value = workshop.id;

        workshopDropdown.append(option);
    }
});