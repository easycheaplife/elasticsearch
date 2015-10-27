var elasticsearch = require('elasticsearch');
var async = require('async');
 
var connectionString = 'http://localhost:9200';
var client = new elasticsearch.Client({
	host: connectionString
});
 
var index = 'synonyms';
var type = 'test';
function synonyms_index(id,name){
				// index a document
				client.index({
				index:index,
				type:type,
				id:id,
				body:{name:name}
				},
				function(err,resp){
					console.log("index  %j" , resp);
				});
}
synonyms_index(1,'西红柿蛋汤');
synonyms_index(2,'番茄炒鸡蛋');
synonyms_index(3,'马铃薯可口美味');
synonyms_index(4,'土豆好吃吗');
synonyms_index(5,'test bb');
synonyms_index(6,'text aa');
synonyms_index(7,'criminality');
synonyms_index(8,'fine');
synonyms_index(9,'foosball');
