var TimeItem = require('../lib/timeEmitter');

var item = new TimeItem(2, 5);
item.addItem("111", "hehe");
item.addItem("222", "hothot");

item.on("time", function(items) {
	console.log("** " + new Date() + "Time Event Called **");
	console.log("Count : " + items.length);
	console.log("---------------");
	for (var item of items) {
		console.log("key : " + item.key + ", data : " + item.data);
	}
});


item.start();

setTimeout(function() {
	item.addItem("333", "234j5l2k3j5kl23j5");
}, 6000);

setTimeout(function() {
	item.updateItem("222", false);
}, 12000);
setTimeout(function() {
	item.addItem("444", "436524362757");
	item.updateItem("333", "sdfkljdslkj");
}, 19000);
setTimeout(function() {
	item.destroy();
}, 55000);