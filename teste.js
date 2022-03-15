const fs = require("fs")

fs.readFile('./public/images/vermeblend-thumb-full.jpg', 'utf-8', function (err, data) {
    if(err) throw err;
    console.log(data);
})