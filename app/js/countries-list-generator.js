//
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
//