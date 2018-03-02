const RequestDataProvider = class RequestDataProvider {
    constructor(url) {
        this.url = url;
        this.objects = [];
        this.onUpdate = null;
    }
};

RequestDataProvider.prototype.getData = function (url) {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.setRequestHeader('accept', 'application/json');
    request.addEventListener('load', function () {
        if (request.status !== 200) return;
        var jsonString = request.responseText;
        var returnedObjects= JSON.parse(jsonString);
        this.objects = returnedObjects;
        this.onUpdate(returnedObjects);
    }.bind(this));

    request.send();
}


//sample code for fetch
// var url = 'http://collection.sciencemuseum.org.uk/search/museum/Science%20Museum?page[number]=2';
// var opts = { headers: { Accept: 'application/json' } };
//
// fetch(url, opts)
//     .then(function (res) {
//         if (res.ok) {
//             return res.json();
//         } else {
//             return Promise.reject(new Error(res.status + ' Failed to fetch results'));
//         }
//     })
//     .then(function (json) {
//         console.log(json);
//     })
//     .catch(function (err) {
//         console.error(err);
//     });