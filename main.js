// MAIN JS


// Public Key = 373a048bdd4542dc2fb2432adcb916b8
// Private Key = 813f40428b74bd23ff9927888703ca2af49248a5
// Endpoint = https://gateway.marvel.com/v1/public/comics
// Params = hash, key, timestamp

// md5sum = d5c69bc4831d7712566df3eb08d35688


var base_url = 'https://gateway.marvel.com/v1/public/characters'

function getData(searchItem, callback) {
	var query = {
		url: base_url,
		//'Cache-Control': 'max-age=0',
		headers: {
		'If-None-Match': '3045efddd7d36cf5be71d15c2e4de7954eda56ce',
		},
		data: {
			hash: 'd5c69bc4831d7712566df3eb08d35688',
			ts: '12122016',
			apikey: '373a048bdd4542dc2fb2432adcb916b8',
			nameStartsWith: searchItem,
		},
		type: 'GET',
		dataType: 'json',
		success: callback,
	};
	$.ajax(query);
};


function displayData(apiResults) {
	console.log(apiResults);
	var resultElement = '';
	if(apiResults.data.results) {
		resultElement = apiResults.data.results.map(function(item) {

			var comics = '';

			if (item.comics.items.length) {

			 item.comics.items.forEach(function(comic) {
				comics +=  + '<span class="comicTitles">' + comic.name + '<br></span>' ;
			});

			}

			else {
				comics = '<p> No comics found </p>';
			}

			 return '<p>' + '<strong class="heroName">' + item.name + '</strong>' + '<br>' + '<img class="heroImage" src="' 
			 + item.thumbnail.path + '.jpg' + '">' + '<br>' + comics + '</p>';

			});

	}

	else {
		resultElement += '<p> No results </p>';
	};

	$('.js-query-results').html(resultElement);
};


function submitSearch() {
	$('.js-form').submit(function(event) {
		event.preventDefault();
		var query = $(this).find('.js-query').val();
		getData(query, displayData);
	});

};

$(function (event) {
	submitSearch();
});
