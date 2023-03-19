const saveButtonElement = document.querySelector('#job-description .save');
const saveBadgeElement = document.querySelector('.nav-items .badge');
const toggleIcon = document.querySelector('#job-description .save i');

async function addToSaves() {
    const jobId = saveButtonElement.dataset.jobid;
    const csrfToken = saveButtonElement.dataset.csrf;
    let response;
    try {
        response = await fetch('/save/docs', {
            method: 'post',
            body: JSON.stringify({ jobId: jobId, _csrf: csrfToken }),
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        alert('Sorry! Something went wrong.');
        return;
    }
    

    if (!response.ok) {
        alert('Sorry! Something went wrong');
        return;
    }

    const responseData = await response.json();
    const totalSaves = responseData.newTotalSaves;
    saveBadgeElement.textContent = totalSaves;
    toggleIcon.classList.toggle('fa-solid');
}
if (saveButtonElement) {
    saveButtonElement.addEventListener('click', addToSaves);
}