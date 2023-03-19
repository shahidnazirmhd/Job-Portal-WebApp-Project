const removeSavedJobButtonElements = document.querySelectorAll('.job-actions button.remove');
const saveBadgeElement = document.querySelector('.nav-items .badge');

async function removeSavedJob(event) {
    const buttonElement = event.target;
    const jobId = buttonElement.dataset.jobid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch('/save/docs/' + jobId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }
    buttonElement.parentElement.parentElement.parentElement.remove();
    const responseData = await response.json();
    const totalSaves = responseData.newTotalSaves;
    saveBadgeElement.textContent = totalSaves;
}

for (const removeSavedJobButtonElement of removeSavedJobButtonElements) {
    removeSavedJobButtonElement.addEventListener('click', removeSavedJob);
    
}