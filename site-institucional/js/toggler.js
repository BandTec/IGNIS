let toggler = document.getElementById('toggler');
let hiddenComponent = document.getElementById('about-financial');

toggler.addEventListener('click', () => {

    if (hiddenComponent.classList.contains('active')) {
        hiddenComponent.classList.remove('active');
        toggler.classList.remove('active');
        toggler.innerHTML = '?';
    } else {
        toggler.classList.add('active');
        toggler.innerHTML = 'X';
        hiddenComponent.classList.add('active');
    }

});
