const fs = require("fs");

fs.readFile("./rs_db.json", function(err, data) {
	var rsdb = JSON.parse(data);
	var newrsdb = {}
	for (var i = 0; i < rsdb.length; i++) {
		newrsdb[rsdb[i].name.toLowerCase()] = rsdb[i].id;
	}
	var newrsdbstr = JSON.stringify(newrsdb);
	fs.writeFileSync("rs_db_good.json", newrsdbstr);
});
