// const FetchDataProvider = class FetchDataProvider {
//     constructor(url) {
//         this.url = url;
//         this.objects = [];
//         this.onUpdate = null;
//     }
// };
//
// FetchDataProvider.prototype.getData = function () {
//     const opts = { headers: { Accept: 'application/json' } };
//
//     fetch(url, opts)
//         .then(function (res) {
//             if (res.ok) {
//                 return res.json();
//             } else {
//                 return Promise.reject(new Error(res.status + ' Failed to fetch results'));
//             }
//         })
//         .then(function (json) {
//             console.log(json);
//         })
//         .catch(function (err) {
//             console.error(err);
//         });
// };
//
//
// var url = 'http://collection.sciencemuseum.org.uk/search/museum/Science%20Museum?page[number]=2';
//
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