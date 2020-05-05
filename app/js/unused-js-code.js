// COUNTRY LIST GENERATOR
console.log(countries.length);

var index = 1;
var arr = [];
$.each(countries, function(key, val) {
    arr.push("<li>" + val.toUpperCase() + "</li>");

    if (index > 0 && index % 42 == 0) {
        console.log('Length: ', arr.length);
        console.log(arr.join("\n"));

        arr = [];
    }

    index++;
});

console.log('Length: ', arr.length);
console.log(arr.join("\n"));
// END OF GENERATOR


// UNUSED VALIDATION:
var formFields = [
	{
		selector: '#email',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
	{
		selector: '#first_name',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
	{
		selector: '#last_name',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
	{
		selector: '#password',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
	{
		selector: '#repeat_password',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
	{
		selector: '#city',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
	{
		selector: '#country',
		rule: 'required',
		message: 'This field is required.',
		isValid: false
	},
];

for (var index = 0; index < formFields.length; index++) {
	var element = formFields[index];

	bootstrapValidate(element.selector, `${element.rule}:${element.message}`, function(isValid) {
		element.isValid = isValid;
	});
}