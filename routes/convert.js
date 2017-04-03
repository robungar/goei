var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var circular = require('circular-json');
var json2csv = require('json2csv');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.post('/', function(req, res, next){
	var text = req.body.text
	
	var list = []
	var fields = ['businessNAME', 'person', 'phone', 'street', 'city', 'state', 'zipcode']
	var fieldNames = ['Business', 'Person', 'Phone', 'Street', 'City', 'State', 'Zip Code']
	var csv = json2csv({data: list, fields: fields, fieldNames: fieldNames, quotes: ''})

	$ = cheerio.load(text)
	$('tr').each(function(i, element){
		var className = element.attribs.class
		if(className != null){
			
			var businessTD = element.children[4]
			var businessDIV = businessTD.children[0]
			var businessANCHOR = businessDIV.children[0]
			var businessNAME = businessANCHOR.children[0]

			var personTD = element.children[5]
			var personDIV = personTD.children[0]
			var person = personDIV.children[0]

			var roleTD = element.children[6]
			//console.log('roleTD: '+roleTD.children.length)
			// if (roleTD.children != null){
			// 	var role = roleTD.children[0] //FIX!!!!!!!!!!!!!
			// 	console.log('role: '+role.data)
			// }

			var phoneTD = element.children[7]
			var phoneDIV = phoneTD.children[0]
			var phoneSPAN = phoneDIV.children[0]
			var phone = phoneSPAN.children[0]

			var streetTD = element.children[8]
			var street = streetTD.children[0]

			var cityTD = element.children[9]
			var city = cityTD.children[0]

			var stateTD = element.children[10]
			var state = stateTD.children[0]

			var zipcodeTD = element.children[11]
			var zipcode = zipcodeTD.children[0]

			let info = {
				"businessNAME" : businessNAME, 
				"person" : person, 
				"phone" : phone, 
				"street" : street, 
				"city" : city, 
				"state" : state, 
				"zipcode" : zipcode
			}
			
			//console.log(info)
			if(Object.keys(info).length == 7){
				list.push(info)
				info = {}
				console.log(list)
			}
		}
	})

	res.setHeader('Content-disposition', 'attachment; filename=conversion.csv')
	res.setHeader('Content-type', 'text/plain')
	res.charset = 'UTF-8'
	res.write(csv)
	res.end()
	return
	res.json({message: 'thanks'})
})
  

		



module.exports = router;
