var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


http.listen(8080);

io.on('connection', function(socket) {
	var mock=[{
    	user: 'Atul',
    	type: 'document',
    	subtype:'casestudy',
    	title: 'Lead Generation',
    	date: 1426790085966
    },{
    	user: 'Ruchi',
    	type:'Organic',
    	title: 'Marketing Generation',
    	date: 1426788260568
    },{
    	user: 'Stan',
    	type:'Paid',
    	title: 'Social Reach',
    	date:1426784711726

    },{
    	user: 'Yingyi',
    	type:'video',
    	subtype:'webinar',
    	title: 'Team Big Time Real',
    	date: 1426781133136
    }]
    socket.emit('notification', mock);

    socket.on('NEW_CONTENT', function(data) {
        socket.emit('NEW_NOTIFICATION', data);
    });
});

// http.listen(3000, function(){
//   console.log('listening on *:3000');
// });

module.exports = app;