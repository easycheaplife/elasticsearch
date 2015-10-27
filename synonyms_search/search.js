var elasticsearch = require('elasticsearch');
var connectionString = 'http://localhost:9200';
var client = new elasticsearch.Client({
	host: connectionString
});

var index = 'synonyms';
var type = 'test';
var options = process.argv;

if(options.length <= 2){
	console.error("please input keyword, for example: node app XXX");
	process.exit();
}
keyword = options[2];
console.log("keyword: %s",keyword);

function search(){
	client.search({
		index: index,
		type: type,
			body: {
				"query":{
						"query_string" : {
							"text": {
								"query":keyword,
								"analyzer":"synonym_test"
							}
						}
				}
			}
		}).then(function (resp) {
				 console.log("search  %j",resp);
			}, function (err) {
				console.log(err.message);

			}
		)
}

search();
