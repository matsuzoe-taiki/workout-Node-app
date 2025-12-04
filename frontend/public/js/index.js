document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById('menuButton');
    const menu = document.getElementById('menu');
    const headerBox = document.getElementById('headerBox');
    const signout = document.getElementById('signout');


    menuButton.addEventListener('click', () => {
        menuButton.classList.toggle('is-active');
        menu.classList.toggle('is-active');
        headerBox.classList.toggle('is-active');
    })

    signout.addEventListener("click", async () => {
        const response = await fetch("/signout", {
            method: "GET",
            credentials: "include"
        });
        window.location.href = "/signin";
    });

});