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
	var fields = ['businessNAME', 'firstName', 'lastName', 'role', 'phone', 'street', 'city', 'state', 'zipcode', 'sicDescription', 'sicCode']
	var fieldNames = ['Business', 'First Name', 'Last Name', 'Role', 'Phone', 'Street', 'City', 'State', 'Zip Code', 'SIC Description', 'SIC Code']
	

	$ = cheerio.load(text)	
	var tbody =	$('tbody').get(2)

	$('tr', tbody).each(function(i, element){
		var className = element.attribs.class
		if(className != null){

			var businessTD = element.children[0]
			var businessDIV = businessTD.children[0]
			var businessANCHOR = businessDIV.children[0]
			if(businessANCHOR.children[0] != null){
				var businessNAME = businessANCHOR.children[0].data
				console.log(businessNAME)
			} else {
				businessNAME = ''
				console.log(businessNAME)
			}
			
			var personTD = element.children[1]
			var personDIV = personTD.children[0]
			if(personDIV.children[0] != null){
				var person = personDIV.children[0].data
				var firstName = person.split(" ")[0]
	  		var lastName = person.split(" ")[1]
				console.log(person)
			} else {
				person = ''
				console.log(person)
			}

			var roleTD = element.children[2]
			if(roleTD.children[0] != null){
				var role = roleTD.children[0].data
				console.log(role)
			} else {
				role = ''
			}

			var phoneTD = element.children[3]
			var phoneDIV = phoneTD.children[0]
			var phoneSPAN = phoneDIV.children[0]
			if(phoneSPAN.children[0] != null){
				var phone = phoneSPAN.children[0].data
				console.log(phone)
			} else {
				phone = ''
			}

			var streetTD = element.children[4]
			if(streetTD.children[0] != null){
				var street = streetTD.children[0].data
				console.log(street)
			} else {
				street = ''
			}

			var cityTD = element.children[5]
			if(cityTD.children[0] != null){
				var city = cityTD.children[0].data
				console.log(city)
			} else {
				city = ''
			}

			var stateTD = element.children[6]
			if(stateTD.children[0] != null){
				var state = stateTD.children[0].data
				console.log(state)
			} else {
				state = ''
			}

			var zipcodeTD = element.children[7]
			if(zipcodeTD.children[0] != null){
				var zipcode = zipcodeTD.children[0].data
				console.log(zipcode)
			} else {
				zipcode = ''
			}

			var sicDescriptionTD = element.children[9]
			if(sicDescriptionTD.children[0] != null){
				var sicDescription = sicDescriptionTD.children[0].data
				console.log(sicDescription)
			} else {
				sicDescription = ''
			}

			var sicCodeTD = element.children[10]
			if(sicCodeTD.children[0] != null){
				var sicCode = sicCodeTD.children[0].data
				console.log(sicCode)
			} else {
				sicCode = ''
			}

			let info = {
				"businessNAME" : businessNAME,
				"firstName" : firstName,
				"lastName" : lastName,
				"role" : role, 
				"phone" : phone, 
				"street" : street, 
				"city" : city, 
				"state" : state, 
				"zipcode" : zipcode,
				"sicDescription" : sicDescription,
				"sicCode" : sicCode
			}
			//console.log(info)
			list.push(info)
		}
	})

	//console.log(list)
	var csv = json2csv({data: list, fields: fields, fieldNames: fieldNames, quotes: ''})

	res.setHeader('Content-disposition', 'attachment; filename=conversion.csv')
	res.setHeader('Content-type', 'text/plain')
	res.charset = 'UTF-8'
	res.write(csv)
	res.end()
	return
	res.json({message: 'thanks'})
})

module.exports = router;
