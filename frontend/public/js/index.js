document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const headerBox = document.getElementById('headerBox');

    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        headerBox.classList.toggle('is-active');
    })
});