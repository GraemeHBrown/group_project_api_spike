let selectedRegion;

const app = function () {
    //get data
    const listButton = document.getElementById('button-list-page');


    listButton.addEventListener('click', function () {
        window.location.href = 'list_page.html';
    });

}




document.addEventListener('DOMContentLoaded', app);

