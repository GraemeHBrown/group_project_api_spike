const ObjectList = function (url) {
    this.objects = [];
    this.url = url;
    this.onUpdate = null;
};

ObjectList.prototype.addToList = function (object) {
    this.objects.push(object);
}

ObjectList.prototype.getFromDb = function () {
    const request = new XMLHttpRequest();
    request.open("GET", this.url);
    request.onload = function () {
        if (request.status === 200) {
            const jsonString = request.responseText;
            const returnedObjects = JSON.parse(jsonString);
            this.objects = returnedObjects;
            this.onUpdate(returnedObjects);
        }
    }.bind(this);
    request.send();//null removed
}

ObjectList.prototype.persistObject = function (object) {
    this.addToList(object);
    console.log('Object in persist object: ', object);
    //persist
    const request = new XMLHttpRequest();
    request.open("POST", this.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
        if (request.status === 200) {
            console.log('Response text:', request.responseText);
        }
    };
    request.send(JSON.stringify({computing_object: object}));
}

ObjectList.prototype.deleteAllInDb = function (callback) {
    const request = new XMLHttpRequest();
    request.open('DELETE', this.url);
    request.addEventListener('load', function () {
        if (this.status !== 204) {
            return;
        }
        callback();
        this.objects = [];
    });
    request.send();
}
