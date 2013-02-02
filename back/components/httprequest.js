
var request = require('request'),
    jsdom = require('jsdom'),
    jquery = require('fs').readFileSync("./jquery/jquery.js").toString();


function httpRequest(url, callback) {

    console.log("Fetching: " + url);

    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            console.log("Success");
            buildDom(body);

        } else {
        
            console.log(error);

        }
    });
}


function buildDom(html) {

    jsdom.env({
        html: html,
        src: [jquery],
        done: function(errors, window) {

            if (errors) {
                console.log("DOM ERROR");
                
            } else {

                console.log('DOM ready and jquery injected');
                var $ = window.$;
                
                $('button').each(function() {

                    console.log($(this).html());

                });

            }
        }
    });
}


exports.fetch = httpRequest;