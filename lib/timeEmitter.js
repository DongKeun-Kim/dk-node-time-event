'use strict';
var util = require('util'),
	EventEmitter = require('events').EventEmitter;

function eventCall() {
	var data = [];
	console.log("interval : " + new Date());
	for (let key in this.items) {
		if (this.items[key].enabled) {
			let item = {"key" : key,  "data" : this.items[key].args};
			data.push( item );
			this.emit("item", item);
		}
	}
	this.emit("time", data);
	console.log("@@@@@@@@@ interval Count : " + data.length);
}

function TimeEmitter(startSeconds, cycleSeconds) {
	this.time = (startSeconds - 1) * 1000;		// 1초 빨리 돌게
	this.cycle = cycleSeconds * 1000;
	this.starter = null;
	this.interval = null;
	this.items = {};
}

util.inherits(TimeEmitter, EventEmitter);

TimeEmitter.prototype.getAllItems = function() {
	var data = [];
	
	for (let key in this.items) {
		data.push( {"key" : key,  "data" : this.items[key].args, "enabled" : this.items[key].enabled});
	}
	
	return data;
};

TimeEmitter.prototype.getEnableItems = function() {
	var data = [];
	
	for (let key in this.items) {
		if (items[key].enabled) {
			data.push( {"key" : key,  "data" : this.items[key].args});
		}
	}
	
	return data;
};

TimeEmitter.prototype.addItem = function(key, data, enabled) {
	enabled = enabled || true;
	
	if (data.enabled === false) {
		enabled = false;
	}
	
	delete data.enabled;
	
	if (this.items[key]) {
		throw new Error("Exist Item Key");
	}
	else {
		this.items[key] = {
				"args" : data,
				"enabled" : enabled, 
		};
	}
};

TimeEmitter.prototype.updateItem = function() {
	var key = null,
		data = null,
		enabled = null,
		args = Array.prototype.slice.call(arguments);
		
	key = args.shift();
	enabled = typeof args[0] === 'boolean' ? args.shift() : null;
	data = typeof args[0] === 'object' ? args.pop() : null;

	if (this.items[key]) {
		if (data) {
			this.items[key].args = data;
		}
		if (enabled !== null) {
			this.items[key].enabled = enabled;
		}
	}
	else {
		throw new Error("Invalid Item Key");
	}
};

TimeEmitter.prototype.deleteItem = function(key) {
	delete this.items[key];
};

TimeEmitter.prototype.start = function() {
	var self = this;
	
	if (this.stater) {
		throw new Error("already started");
	}
	
	this.starter = setTimeout(function() {
		console.log(">> Emitter Start -> : " + self.time);
		delete self.starter;
		
		eventCall.call(self);
		self.interval = setInterval(function() {
			eventCall.call(self);
		}, self.cycle);
	}, self.time);
};

TimeEmitter.prototype.destroy = function() {
	if (this.starter) {
		clearTimeout(this.starter);
		delete this.starter;
	}
	else {
		clearInterval(this.interval);
		delete this.interval;
	}
};

module.exports = TimeEmitter;