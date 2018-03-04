const listPage = function () {
    const ul = document.getElementById('comp-list');
    const showButton = document.getElementById('button-show-stored');
    const deleteButton = document.getElementById('button-delete-all-stored');
    const messages = document.getElementById('message-container');
    const storeObjectsToDb = document.getElementById('store-objects');
    const dataProvider = new RequestDataProvider();
    const objectList = new ObjectList('http://localhost:3000/objectList');
    const baseURL = 'http://collection.sciencemuseum.org.uk/objects/';

    /*The first three could make an early collection - computing prehistory to 1950*/
    const earlyCollectionObjects = ['co60127', 'co62748'];
    const laterNineteenthCentury = ['co60390', 'co62245', 'co60113'];
    const firstHalfTwentiethCentury = ['co8408693', 'co64128', 'co62427', 'co62556', 'co62349']

    /*1951-1970*/


    const objectIdsForFixedList = ['co62748', 'co64128', 'co62427',
        'co8359400', 'co503422', 'co8401352', 'co8035886',
        'co8430789', 'co8184137', 'co8361071'];

    let objectIDsForURL = [];

    // objectIDsForURL = earlyCollectionObjects;
    objectIDsForURL = laterNineteenthCentury;

    storeObjectsToDb.addEventListener('click', function () {
        objectIDsForURL.forEach(function (id) {
            let paramURL = baseURL + id;
            dataProvider.getData(paramURL);
        })
    })


    dataProvider.onUpdate = function (object) {
        //computingObject could be made here from the result of the data provider
        objectList.persistObject(object);

    }

    objectList.onUpdate = function (objects) {
        console.log('In objectList on update**');
        //call display objects here rather than in showButton click
    }

    const displayDetails = function (object) {
        console.log('object in display details function', object);
        const summaryTitle = object.data.attributes.summary_title;
        const imageLink = object.data.attributes.multimedia[0].processed.large_thumbnail.location;
        const img = document.createElement('img');
        img.src = imageLink;
        const li = document.createElement('li');
        li.innerText = summaryTitle;
        ul.appendChild(li);
        ul.appendChild(img);
    }

    showButton.addEventListener('click', function () {
        messages.innerText = '';
        messages.classList.remove('delete-success');
        ul.innerHTML = '';
        console.log('Show stored button click');
        objectList.getFromDb();
        objectList.objects.forEach(function (object) {
            displayDetails(object);
        })
    });

    const deleteButtonClicked = function () {
        objectList.deleteAllInDb(deleteRequestComplete);
    }

    const deleteRequestComplete = function () { // NEW
        messages.innerText = 'All objects deleted from DB.'
        messages.classList.add('delete-success');
        ul.innerHTML = '';
        objectList.objects = [];
    }

    deleteButton.addEventListener('click', deleteButtonClicked);
}


document.addEventListener('DOMContentLoaded', listPage);

