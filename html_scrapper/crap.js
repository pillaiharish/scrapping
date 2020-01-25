var fs = require('fs');
const cheerio=require('cheerio');
const jsonframe=require('jsonframe-cheerio');
let json_data=[];
// cheerio.load(fs.readFileSync('./example.html'));
fs.readFile('result.html', 'utf8', function(err, data) {

    if (err) throw err;

    var $ = cheerio.load(data);
    // jsonframe($);
    var frame={
    	"name":".header [itemprop=name]",
    	"description": ".header [rel=description]"
    }
    // var title=$('title').each(function(index){
    // 	// $(this).scrape(frame,{string:true});
    // 	$(this).text();
    // 	});
    // let title=$('body');
    // let h=title.children().first();
    // let h=title.children();
    // let i=title.children().last();
    // console.log(title.text());
    // console.log(h.get(0).tagName);
    // console.log(i.get(0).tagName);
    let suite_name=[];
    let body_text=[];
    let title=[];
    let total_tests=[];
    
    let failures=[];
    let errors=[];
    let temp=[];
    let object_2;
    $('.suite').each(function(i,e){

    	body_text[i]=$(this).text();
    	// console.log($(this).text());
    	var s1=$('.suite__name').text();
    	title=s1.split('chrome.');
		var s2=$('span:nth-child(4)').text().split('tests: ');
		total_tests=s2;
		var s3=$('span:nth-child(5)').text().split('failures: ');
		failures=s3;
		var s4=$('span:nth-child(6)').text().split('errors: ');
		errors=s4;
		var s6=$('.test .test__message').text().split('\n');;
		temp.push(s6);
		temp=temp.filter(function(str){
			return /\S/.test(str);
		});

		js_object={
			"index":0,
			"title":title[i],
			"total":total_tests[i],
			"failed":failures[i],
			"errors":errors[i],
			"message":temp[i]
			
		};
			// $('.test').each(function(j,f){
			// 	var s5=$('test__message').text();
			// 	temp=s5;
			// });
		
		
		json_data.push(js_object);
		js_object["index"]=i+1;
    });
    // suite_name.push(r);
    // console.log(title);
    // console.log(total_tests);

    console.log(json_data);
    console.log(temp);
    // console.log(temp);
    let data1 = JSON.stringify(json_data);
fs.writeFileSync('extracted_result.json', data1);
    });


// fs.writeJson('./extracted_result.json', json_data, err => {
//   			if (err) return console.error(err)

//   				console.log('success extracted data to json!')
// 			})

