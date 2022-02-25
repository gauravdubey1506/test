const https = require("https");
const http = require("http");
const url = require("url");

//assuming this assignment wants to take city name from command line argument
let cityName = "delhi";
process.argv.forEach(function (val, index) {
    if(index == 2 && val != ""){
        cityName = val;
        getWeather(cityName);
    }
});
//assuming this assignment wants to take city name from server url as querystring
var server = http.createServer(async function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    let response = "Please enter cityName as query string or param in url\n"
        +"for ex: http://localhost:8080/?cityName=delhi or http://localhost:8080/delhi";
    var q = url.parse(req.url, true);
    var requestPath = q.path.substr(1);
    if(q.query && q.query.cityName && q.query.cityName != ""){
        response = await getWeather(q.query.cityName);
        res.write(response);
        res.end();
    } else if(requestPath && requestPath && requestPath != "" && requestPath != "favicon.ico"){
        response = await getWeather(requestPath);
        res.write(response);
        res.end();
    } else {
        res.write(response);
        res.end();
    }
});
server.listen(8080);


async function getWeather(cityName){
    return new Promise((resolve) => {
        https.get('https://api.openweathermap.org/data/2.5/weather?q='+cityName+'&appid=2b421cd305b88e39d4182ac89b85e186', (res) => {
            const { statusCode } = res;
            if (statusCode === 404) {
                // console.error(`city name not found`);
                res.resume();
                resolve("city name not found");
            } else if(statusCode !== 200){
                // console.error(`Request Failed Status Code: ${statusCode}`);
                res.resume();
                resolve(`Request Failed Status Code: ${statusCode}`);
            } else {
                let rawData = '';
                res.on('data', (chunk) => { rawData += chunk; });
                res.on('end', () => {
                    console.log(rawData);
                    resolve(rawData);
                });
            }
        }).on('error', (e) => {
            // console.error(`Got error: ${e.message}`);
            resolve(`Got error: ${e.message}`);
        });
    });
}