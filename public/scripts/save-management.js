const saveButtonElement = document.querySelector('#job-description .save');
const saveBadgeElements = document.querySelectorAll('.nav-items .badge');
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
    
    for (const saveBadgeElement of saveBadgeElements) {
        saveBadgeElement.textContent = totalSaves;
    }
    if (toggleIcon.className == "fa-solid fa-bookmark") {
        toggleIcon.className = "fa-regular fa-bookmark";
      } else {
        toggleIcon.className = "fa-solid fa-bookmark";
      }
}
if (saveButtonElement) {
    saveButtonElement.addEventListener('click', addToSaves);
}