var element = document.getElementById('goback');
element.setAttribute('href', document.referrer);

function goBack() {
    history.back();
    return false;
}
element.addEventListener('click', goBack);