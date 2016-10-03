'use strict';

//variables
var express = require('express');
var path = require('path');
var moment = require('moment');
var app = express();

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.resolve(__dirname, 'client')));

app.get('/:timestamp', function(req, res){
	var time = moment(req.params.timestamp, 'MMMM DD, YYYY', true);
	if(!time.isValid()) {
		time = moment.unix(req.params.timestamp);
	}

	if(!time.isValid()){
		res.json({
			'human': null,
			'unix':null
		});
	}

	res.json({
		'human': time.format('MMMM DD, YYYY'),
		'unix': time.format('X')
	});
});

app.listen(app.get('port'), () => {
	console.log(`App listening on port ${app.get('port')}!`);
});
