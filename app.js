var app = require('express')();
var io = require('socket.io')(8080);
var nasps = ['captora.com', 'dnb.com', 'hoovers.com'];
var cpSocket;
var onConnection = function(socket) {
    var isCp;
    if (socket.nsp.name === '/captora.com') {
        isCp = true;
        cpSocket = socket;
    }
    var mock = [{
        user: 'Dnb',
        type: 'document',
        subtype: 'casestudy',
        title: 'Lead Generation',
        date: 1426790085966
    }, {
        user: 'Hoover',
        type: 'Organic',
        title: 'Marketing Generation',
        date: 1426788260568
    }, {
        user: 'Stan',
        type: 'Paid',
        title: 'Social Reach',
        date: 1426784711726
    }, {
        user: 'Yingyi',
        type: 'video',
        subtype: 'webinar',
        title: `Team Big Time Real`,
        date: 1426781133136
    }]
    socket.emit('notification', mock);
    socket.on('NEW_CONTENT', function(data) {
        socket.broadcast.emit('NEW_NOTIFICATION', data);
        if (!isCp) {
            cpSocket.broadcast.emit('NEW_NOTIFICATION', data);
        }
    });
};
nasps.forEach(function(nasp) {
        nasp = io.of(`/${nasp}`);
    nasp.on('connection',onConnection);
});

module.exports = app;