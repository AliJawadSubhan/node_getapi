
const path = require("path");
const dirPath = path.join(__dirname, "users");
const userPath = dirPath + "/users.txt";
const filesystem = require("fs");
const http = require('http');


console.log("Start execution..");
let a = 10;
let b = 0;


// console.log(a + b);
let waitingData = new Promise((resolved, reject) => {
    setTimeout(() => {

        b = 20;

        resolved(b);
    }, 1000);

});

waitingData.then((data) => {
    console.log(a + data);
});


let datsa = new Promise((res, rej) => {

    fetch('https://jsonplaceholder.typicode.com/users/').then((response) => {
        response.json().then((data) => {
            res(data);
            // console.log(data);
        });
    });
});
let users;
// datsa.then((data) => {
//     users = data;
//     let usersString = JSON.stringify(users, null, 2); // The null and 2 arguments format the JSON with indentation for readability
//     filesystem.writeFileSync(userPath, usersString);
// });




getUsers();
function getUsers() {
    let users;
    filesystem.readFile(userPath, 'utf8', (err, data) => {
        console.log(data);
        users = JSON.parse(data);
        // users = decode;
    });
    // this wowrks
    http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({
            data: users,
        }));
        res.end();
    }).listen(8000);
}