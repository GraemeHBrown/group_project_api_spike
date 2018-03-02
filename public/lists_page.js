const listPage = function () {
    const ul = document.getElementById('comp-list');
    const dataProvider = new RequestDataProvider();
    const aPIRequestURL = 'http://collection.sciencemuseum.org.uk/search?filter%5Bcategories%5D=Computing%20%26%20Data%20Processing&page[size]=100';
    dataProvider.getData(aPIRequestURL);

    dataProvider.onUpdate = function (objects) {
        console.log(objects)
        objects.data.forEach(function (object, index) {
            const imageLink = object.attributes.multimedia[0].processed.large_thumbnail.location;
            const summaryTitle = object.attributes.summary_title;

            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = imageLink;
            li.innerText = summaryTitle;
            ul.appendChild(li);
            ul.appendChild(img);

        })
    }
}


document.addEventListener('DOMContentLoaded', listPage);


