$(function() {
	var patternPhoneMask = IMask(document.getElementById('phoneNumber'), {
		mask: '+{7}(000)000-00-00',
		lazy: false,  // make placeholder always visible
		placeholderChar: '_'     // defaults to '_'
	}).on('accept', function() {
	
	}).on('complete', function() {

	});
});

// Set blurry overlay background
setTimeout(function () {
	$('.backdrop-image').css('display', 'none')
	$('.backdrop-overlay').css('display', 'none')
}, 5000);

// Set blurry overlay background
$('.backdrop-overlay').click(function () {
	$('.backdrop-image').css('display', 'none')
	$('.backdrop-overlay').css('display', 'none')
});

$('.country-list').children().click(function(){
	$(this).siblings().removeClass('active')  	
	$(this).addClass('active')
});


// Changing value of price
$('.tarif').change(function(){
	$('.big-price').html($(this).val() * 276)
});

$('.toggle-active').click(function(){
	$('.instruction').toggle()
});

$('#number_of_periods_select').on("change", function(){
	var index = $(this).val();
	$('.period_val').html(index * 30);
	$('.period_index').html(index);

	$('#actual_price').html(index * 276);
	$('#sale_price').html(Math.round(index * 276 * 0.8));
});


// Search block
$('#search-btn').click(function(){
	$('.search-block').css("left", "0")
})

$('.search-close').click(function(){
	$('.search-block').css("left", "100vw")
	console.log('left: 0')
})


// 
var degree = 180;

$('#table-toggler').click(function(){
	$('#dashboard-table').slideToggle("slow");
	$('.arrow').css("transform", "rotate(" + degree +"deg)")
	degree += 180;
});


$('.map-country-list').children('li').click(function(){
	$('#chosen_country').val($(this).text())
	$('.map-country-list').children('li').removeClass('active')
	$(this).addClass('active')
});


// Validate the form
var isFormValid = false;

$('.form-check').on("change", function () {
	var form = $(this);
	var field = [];
	form.find('input[data-validate]').each(function () {
		field.push('input[data-validate]');
		var value = $(this).val(),
			line = $(this).closest('.some-form__line');

		for (var i = 0; i < field.length; i++) {
			if (!value) {
				isFormValid = false;
			} else {
				isFormValid = true;
			}
		}

		if (isFormValid) {
			$('.img-filter').css('filter', 'grayscale(0)');
			$('.img-filter').css('opacity', '1');
		}
		else {
			$('.img-filter').css('filter', 'grayscale(1)');
			$('.img-filter').css('opacity', '0.5');
		}
	})
});


// Read a page's GET URL variables and return them as an associative array.
function getUrlParams()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

// If query parameter has been provided, display overlay pop-up
var query = getUrlParams()["display"];

if (query == 'thankyou') {
	$(".backdrop-image").prependTo("body");
	$(".backdrop-overlay").prependTo("body");
}