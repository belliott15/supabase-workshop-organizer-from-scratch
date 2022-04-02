{/* <div class="workshop">
    <h2>Workshop Name</h2>
    <img src="/assets/welding.png" />
    <p>Members First Name</p>
</div> */}
export function renderWorkshop(workshop){
    const workshopDiv = document.createElement('div');
    const workshopName = document.createElement('h2');
    const workshopImg = document.createElement('img');
    const members = document.createElement('div');

    workshopName.textContent = workshop.topic;
    workshopImg.src = workshop.img;
    workshopImg.setAttribute('draggable', false);


    for (let member of workshop.workshop_members) {
        const memberName = document.createElement('a');

        memberName.textContent = `- ${member.first_name}`;
        memberName.href = `../edit/?id=${member.id}`;
        memberName.classList.add('member');
        memberName.id = member.id,
        memberName.setAttribute('draggable', true);
        memberName.setAttribute('ondragstart', "event.dataTransfer.setData('text/plain', null)");

        members.append(memberName);
    }
    members.classList.add('dropzone');
    workshopDiv.append(workshopName, workshopImg, members);
    workshopDiv.classList.add('workshop');
    workshopDiv.id = workshop.id;
    
    return workshopDiv;
}