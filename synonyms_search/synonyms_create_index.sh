#!/bin/sh
curl -XDELETE 'http://localhost:9200/synonyms/'
curl -XPOST http://localhost:9200/synonyms -d '{
	"settings":{
		"index":{
			"analysis":{
				"filter" : {
				    "synonym" : {
						"type" : "synonym",
						"ignore_case":true,
						"synonyms":["crime => criminality","good => fine"]
					 },
				    "my_synonym" : {
						"type" : "synonym",
						"synonyms":["土豆 => 马铃薯","good => fine"]
					 },
				    "your_synonym" : {
						"type" : "synonym",
						"ignore_case":true,
						"synonyms_path": "analysis/synonym.txt"
					 }
				},
				"analyzer":{
					"synonym":{
						"tokenizer" : "whitespace",
						"filter" : ["synonym"]
					},	
					"synonym_test":{
						"tokenizer" : "whitespace",
						"filter" : ["your_synonym"]
					},	
					"ik_max_word_syno":{
						"type":"custom",  
						"tokenizer" : "ik",
						"filter" : ["my_synonym"],
						"use_smart":false
					}
				}
			}
		}
	},
	"mappings" : {
		"test" : {
			"properties" : {
				"name" : { "type" : "string","store":"yes","indexAnalyzer": "ik"}
			}
		}
	}
}'

