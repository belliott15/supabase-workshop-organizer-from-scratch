import { deleteMember, getMember, getWorkshop, logout, updateMember } from '../fetch-utils.js';

const formEl = document.querySelector('form');
const workshopDropdown = document.querySelector('select');
const logoutButton = document.getElementById('logout');
const deleteButton = document.querySelector('.delete-button');
const firstNameInput = document.querySelector('#first-name-input');
const lastNameInput = document.querySelector('#last-name-input');

const params = new URLSearchParams(window.location.search);

logoutButton.addEventListener('click', () => {
    logout();
});

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

    await updateMember(params.get('id'), member);
    formEl.reset();
    window.location.replace('../workshops');
});

window.addEventListener('load', async () =>{
    const workshops = await getWorkshop();

    const member = await getMember(params.get('id'));
    firstNameInput.value = member.first_name;
    lastNameInput.value = member.last_name;

    for (let workshop of workshops){
        const option = document.createElement('option');

        option.textContent = workshop.topic;
        option.value = workshop.id;

        workshopDropdown.append(option);
    }
});

deleteButton.addEventListener('click', async () =>{
    await deleteMember(params.get('id'));
    window.location.replace('../workshops');
});

