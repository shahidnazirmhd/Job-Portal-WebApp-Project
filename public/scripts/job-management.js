const deleteJobButtonElements = document.querySelectorAll('.job-item button');

async function deleteJob(event) {
    const buttonElement = event.target;
    const jobId = buttonElement.dataset.jobid;
    const csrfToken = buttonElement.dataset.csrf;

    const response = await fetch('/admin/jobs/' + jobId + '?_csrf=' + csrfToken, {
        method: 'DELETE'
    });
    if (!response.ok) {
        alert('Something went wrong!');
        return;
    }
    buttonElement.parentElement.parentElement.parentElement.remove();
}

for (const deleteJobButtonElement of deleteJobButtonElements) {
    deleteJobButtonElement.addEventListener('click', deleteJob);
    
}