//console.log('fs.readFileSync:', fs.readFileSync('./txt/input.txt'));
// const hello = 'Hello World!'
// console.log('hello:', hello);

// Blocking synchronous way

// const textIn = fs.readFileSync('./txt/input.txt','utf-8');
// console.log(textIn);
// const textOut = `Thes is what we know about avocado:\n${textIn}\nCreated on Date ${Date.now()}!!!`;
// console.log('*******************************')
// //console.log(textOut);
// fs.writeFileSync('./txt/output.txt',textOut);
// console.log('File was written!')

// Non-blocking asynchronous way

// fs.readFile('./txt/start.txt','utf-8',(err,data1) => {
//     console.log('data1',data1);
//     fs.readFile(`./txt/${data1}.txt`,'utf-8',(err,data2)=>{
//         console.log('data1-1',data1);
//         console.log('data2',data2);
//         fs.readFile('./txt/append.txt','utf-8',(err,data3)=>{
//             console.log('data3:', data3);
//             fs.writeFile('./txt/final.txt',`${data2}\n${data3}\n${data2}`,'utf-8',err =>{
//                 console.log('Your file has been written!;)');
//             })
//         })
//     })
// })

// console.log('Will read file:');

//Server

const fs = require("fs");
const http = require("http");
const url = require("url");

const server = http.createServer((req,res)=>{
    //console.log(req.url)
    pathName = req.url
    
    if(pathName === '/' || pathName === '/overview'){
        res.end('This is an OVERVEW page!')
    }else if(pathName === '/product'){
        res.end('This is a PRODUCT page!')
    }else{
        res.writeHead(404,{
            'Content-type':'text/html',
            'my-own-header':'hello-world'
        })
        res.end('<h1>This page cannot be found!</h1>')
    }

});

server.listen(8000,'127.0.0.1',()=>{
    console.log('Listeiing to requests on port 8000:');
});