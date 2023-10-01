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
const replacementTemplate = require('./modules/replaceTemplate')

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);


const server = http.createServer((req,res)=>{
    // console.log(req.url)
    const {query, pathname} = url.parse(req.url, true);

    // console.log('query:', query);
    console.log('pathname',pathname);
    // pathName = req.url
    // Overview page
    if(pathname === '/' || pathname === '/overview'){
        res.writeHead(200,{'Content-type':'text/html'});
        const cardsHtml = dataObj.map(el => replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARD%}', cardsHtml);
        res.end(output);
    // Prodact page
    }else if(pathname === '/product'){
        const product = dataObj[query.id];
        console.log(product);
        const output = replaceTemplate(tempProduct,product);
        res.writeHead(200,{'Content-type':'text/html'});
        res.end(output);
    // API page
    }else if(pathname === '/api'){
        res.writeHead(200,{'Content-type':'application/json'})
        res.end(data)
        
    }
    // Page not found
    else{
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