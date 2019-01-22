const url = 'http://jsonplaceholder.typicode.com/';
let uri = url + 'users';

let formdata = new FormData();
formdata.append("id", 3);
formdata.append('name', 'This is my title');
formdata.append('username', 'This is the body text of the post');
formdata.append('email', 'This is the body text of the post');

let options = {
    method: 'POST',
    mode: 'cors',
    body: formdata
}
let req = new Request(uri, options);

fetch(req)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Dosen\'t Work Try Again!')
        }
    })
    .then((j) => {
        console.log(j);
    })
    .catch((err) => {
        console.log('ERROR:', err.message);
    });

// Commented code hier onder = gewoon een paar tests
// Yes it will be removed before a PR will be made!

//--------------------------------------------------

// function createUser(element) {
//   return document.createElement(element);
// }

// function append(parent, element) {
//   return document.appendChild(element);
// }

// fetch('https://randomuser.me/api/?result=6')
// .then((resp) => resp.json())
// .then(function (data) {
//   let users = data.results;
//   return users.map(functuion(user) {
//       li = createUser('li'),
//       img = createUser('img'),
//       p = createUser('p'),
//     img.src = user.picture.line-coverage;
//     p.innerHtml = '${user.name.first', '${user.name.last'}
//     append(li, img);
//     append(li, p);
//     append(document.getElementById('users'), )
//   })
// })

//---------------------------------------------------

// $.ajax({
//     url: 'https://randomuser.me/api/3',
//     dataType: 'json',
//     success: function(data) {
//       console.log(data);
//     }
//   });
