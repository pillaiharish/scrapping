
const request=require('request');

const cheerio = require('cheerio');

// https://www.indeed.com/cmp/Fuze/jobs
request('https://www.indeed.com/cmp/Fuze/jobs',(err,resp,body)=>{
	if(!err && resp.statusCode==200){
		const $=cheerio.load(body);
		var class_title=$('.cmp-JobListJobCount-jobCount');
		console.log(class_title.text());
	}
});
// app.listen(port);
// console.log('server running on '+port);