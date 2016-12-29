// MAIN JS


// Public Key = 373a048bdd4542dc2fb2432adcb916b8
// Private Key = 813f40428b74bd23ff9927888703ca2af49248a5
// Endpoint = https://gateway.marvel.com/v1/public/comics
// Params = hash, key, timestamp

// md5sum = d5c69bc4831d7712566df3eb08d35688

// State

var state = { currentOffset: 0 }


// Api Function

var base_url = 'https://gateway.marvel.com/v1/public/characters'

function getData(searchItem, callback, offset) {
	var query = {
		url: base_url,
		headers: {
		'If-None-Match': '3045efddd7d36cf5be71d15c2e4de7954eda56ce',
		},
		data: {
			hash: 'd5c69bc4831d7712566df3eb08d35688',
			ts: '12122016',
			apikey: '373a048bdd4542dc2fb2432adcb916b8',
			nameStartsWith: searchItem,
			limit: 5,
			offset: offset,
		},
		type: 'GET',
		dataType: 'json',
		success: callback,
	};
	$.ajax(query);
};


// Dusplayng the Info From Api

function displayData(apiResults) {
	console.log(apiResults);
	var resultElement = '';
	if(apiResults.data.results) {
		resultElement = apiResults.data.results.map(function(item) {

			var comics = '';

			if (item.comics.items.length) {

			 item.comics.items.forEach(function(comic) {
				comics += '<span class="comicTitles">' + comic.name + '<br></span>' ;
			});

			}

			else {
				comics = '<p> No comics found </p>';
			}
			var description = item.description
			description = description.replace(/<[^>]*>/, '');


			 return  '<strong class="heroName">' + item.name + '</strong>' + '<br>' 
			 + '<p class="heroWords">' + description + '</p>' 
			 + '<br>' + '<img class="heroImage" src="' 
			 + item.thumbnail.path + '.jpg' + '">' + '<br>' + comics;

			});

	}

	else {
		resultElement += '<p> No results </p>';
	};

	$('.js-query-results').html(resultElement);
};


// Pagination Functions

function nextPage(state) {
		state.currentOffset += 5;
		console.log(state.currentOffset);
		var query = $('.js-query').val();
		getData(query, displayData, state.currentOffset);
	}

function prevPage(state) {
		if (state.currentOffset >= 5) {
		state.currentOffset -= 5;
		var query = $('.js-query').val();
		getData(query, displayData, state.currentOffset);
	}
}

// Event Handlers

function forwardPage() {
	$('.next').click(function(event) {
		event.preventDefault();
		nextPage(state);
	});
}

function backPage() {
	$('.prev').click(function(event) {
		event.preventDefault();
		prevPage(state);
	});
}


function submitSearch() {
	$('.js-form').submit(function(event) {
		event.preventDefault();
		$('.pageButtons').removeClass('invisible');
		var query = $('.js-query').val();
		getData(query, displayData, 0);

	});

};


$(function (event) {
	submitSearch();
	forwardPage();
	backPage();
});