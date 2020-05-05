$(function() {
	// Enable tooltips everywhere
	$('[data-toggle="tooltip"]').tooltip()

	// iMask for phone fields
	IMask(document.getElementById('phone_number'), {
		mask: '+{7} (000) 000-00-00',
		lazy: false,  // make placeholder always visible
		placeholderChar: '_'     // defaults to '_'
	});

	// Required & Optional Fields
	var requiredFields = ['#email', '#first_name', '#last_name', '#password', '#repeat_password', '#city', '#country'];
	var optionalFields = ['#address', '#address_detail', '#post_code', '#phone_number'];

	bootstrapValidate(requiredFields, 'required:This field is required.');
	bootstrapValidate('#email', 'email:Please enter a valid email.');
	bootstrapValidate('#repeat_password', 'matches:#password:Password confirmation does not match.');


	// Validate the form
	$('#buy-form').on("change", function () {
		var isFormValid = true;

		for (var i = 0; i < requiredFields.length; i++) {
			const selector = requiredFields[i];

			if (!$(selector).val()) { // if empty
				isFormValid = false;
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
	});
});


/**
 * Adding an automatic offset to the scroll position from URL hash
 */
var hash = window.location.hash;

if (hash && hash != '#' && hash.length > 3) {	
	var target = $(hash);

	if (target.length) {
		$('html, body').stop().animate({
			scrollTop: target.offset().top - 100
		}, 500, 'swing');
	}
}


/**
 * When link clicked, navigate to element smoothly
 */
$("a[href^='#']:not([href='#'])").click(function(e) {
	e.preventDefault();
	var target = this.hash;

	if (target) { 
		$('html, body').animate({
			scrollTop: $(target).offset().top - 100
		}, 500, 'swing');
	}
});


// scroll to top on press footer logo
$('.footer-logo').click(function() {
	$("html, body").animate({ scrollTop: 0 }, "slow");
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

/**
 * Get countries of selected continent
 */
var loadCountryList = function (selectedContinent) {
	// get data
	$.getJSON("../data/countries.json", function (data) {
		var countries = data.find(function (element) {
			return element.continent == selectedContinent;
		}).countries;

		// Sort countries in alphabetical order
		countries.sort();

		var options = [];
		$.each(countries, function(key, val) {
			options.push("<option value='" + key + "'>" + val + "</option>");
		});

		$("#countries-list")
			.empty()
			.append(options.join(""));
	});
}

// Load first continent when page loads
loadCountryList('All');

$('#continent-list').children().click(function(){
	var selectedContinent = $(this).text();
	// console.log('Selected continent: ', selectedContinent);

	$(this).siblings().removeClass('active');	
	$(this).addClass('active');

	loadCountryList(selectedContinent);
});


var priceList = {
	1: 25, // 1 Gb => $25
	2: 50, 
	3: 70, 
	4: 80, 
	5: 85
};

var changeTarifPrice = function(val, obj) {
	val = val.replace(/[^0-9]/g, ''); // remove all chars except numbers

	var price = 0;

	if (val > 0 && val <= 5) {
		price = priceList[val];
	}
	else if(val > 5 && val <= 100) {
		price = 85 + 17 * (val - 5);
	}

	obj.closest('.ptw').find('.big-price').html(price);

	if (price) {
		obj.closest('.ptw').find('.buy-link').removeClass('disabled');
	} 
	else {
		obj.closest('.ptw').find('.buy-link').addClass('disabled');
	}
}

// Changing value of price
$('.tarif').keyup(function() {
	var $this = $(this);
	changeTarifPrice($this.val(), $this); // value in GB
});

// Search box autocomplete
$('.tarif').autoComplete({
	minLength: 1,
    resolverSettings: {
        url: '../data/tarif-amount.json'
    }
}).on('autocomplete.select', function (evt, item) {
	changeTarifPrice(item, $(this)); // value in GB
});

$(".tarif").blur(function() {
	var this$ = $(this);

	setTimeout(function () {
		if (this$.val() && !this$.val().includes('GB')) {
			this$.val(this$.val() + ' GB');
		}
    }, 100);
});

$('.toggle-ios').click(function(){
	$(this).toggleClass('active');
	$('.toggle-android').removeClass('active');

	$('#instruction-ios').toggle();
	$('#instruction-android').hide();
});

$('.toggle-android').click(function(){
	$(this).toggleClass('active');
	$('.toggle-ios').removeClass('active');

	$('#instruction-android').toggle();
	$('#instruction-ios').hide();
});

$('.close-instructions').click(function(e) {
	e.preventDefault();

	$('.toggle-android').removeClass('active');
	$('.toggle-ios').removeClass('active');

	$('#instruction-android').hide();
	$('#instruction-ios').hide();
});


$('#no_periods_select').on("change", function(){
	var index = $(this).val();
	var price = index * 30;

	$('.period_val').html(index * 30);
	$('.period_index').html(index);

	$('#actual_price').html(price);
	$('#sale_price').html(Math.round(price * 0.83));
});


// Search block
$('.search-btn').click(function(){
	$('.search-block').css("left", "0");
	$('#search-input').focus();
})

$('.search-close').click(function(){
	$('.search-block').css("left", "100%")
})


// 
var degree = 180;

$('#table-toggler').click(function(){
	$('#dashboard-table').slideToggle("slow");
	$('.arrow').css("transform", "rotate(" + degree +"deg)")
	degree += 180;
});

$('#edit-button').click(function() {
	$('#contact-information').slideToggle();
	$('#dashboard-container').toggleClass('filter-gray');

	$('#dashboard-table').hide(); // this is optional
});

$('#submit-button').click(function(e) {
	e.preventDefault();

	// scroll to top
	$('html, body').animate({ scrollTop: 0 }, 400, 'swing');

	$('#contact-information').slideUp();
	$('#dashboard-container').removeClass('filter-gray');
});


$('.map-country-list').children('li').click(function(){
	$('#chosen_country').val($(this).text())
	$('.map-country-list').children('li').removeClass('active')
	$(this).addClass('active')
});


// Update progress bar
$('#progress-bar').css('width', function() {
    return $(this).data('value') + "%";
});

// Reference link on press question mark in form input
$('.input-inline-icon').click(function() {
	var url = $(this).data("url");
	window.open(url, '_blank');
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