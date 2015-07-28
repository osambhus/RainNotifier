'use strict';
var YQL = require('yql');
var nodemailer = require('nodemailer');

var query = new YQL('select * from weather.forecast where (location = 02134)');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'omkar469@gmail.com',
        pass: 'mypassword'
    }
});

query.exec(function(err, data) {
    // var location = data.query.results.channel.location;
    // var condition = data.query.results.channel.item.condition;
    var forecast = data.query.results.channel.item.description.split('<BR />')[3].split('<br />')[0];
    console.log(forecast);
    //console.log('The current weather in ' + location.city + ', ' + location.region + ' is ' + condition.temp + ' degrees.');

    var mailOptions = {
        from: 'Omkar', // sender address
        to: '6174706836@txt.att.net', // list of receivers
        subject: 'Weather Today', // Subject line
        text: forecast, // plaintext body
        html: forecast // html body
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: ' + info.response);
        }
    });


});