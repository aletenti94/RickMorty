/**
 * AngularJS module inizialization
 */
var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app
// factory for page main info management
.factory('Page', function() {
	/**
	 * configure page main info
	 */
	let title = 'Rick & Morty';
	let h1 = 'Rick & Morty';
	return {
		title: function() { return title; },
		setTitle: function(newTitle) { title = newTitle },
		h1: function() { return h1; },
		seth1: function(newh1) { h1 = newh1 }
	};
})

// factory to easy call API for resources
.factory('Resource', function($http){
	return {
		/**
		 * Get all resources
		 * @param {string} urlApi - API URL
		 * @param {function} cb - callback function
		 */
		getAll: function(urlApi, cb) {
			$http({
				url: urlApi, 
				method: "GET",
				params: {}  
			}).then(function(response) {
				cb(response.data);
			}, function(error) {
	
			});
		},
		/**
		 * Get single page
		 * @param {string} urlApi - API URL
		 * @param {int} page - page number
		 * @param {function} cb - callback function
		 */
		getPage: function(urlApi, page, cb) {
			$http({
				url: urlApi, 
				method: "GET",
				params: {
					page: page
				}  
			}).then(function(response) {
				cb(response.data);
			}, function(error) {
	
			});
		},
		/**
		 * Get single resource
		 * @param {string} urlApi - API URL
		 * @param {int} id - resource id
		 * @param {function} cb - callback function
		 */
		getSingle: function(urlApi, id, cb) {
			$http({
				url: urlApi, 
				method: "GET",
				params: {
					id: id
				}  
			}).then(function(response) {
				cb(response.data);
			}, function(error) {
	
			});
		},
		/**
		 * Get multiple resources
		 * @param {string} urlApi - API URL
		 * @param {string} list - list of ids
		 * @param {function} cb - callback function
		 */
		getMultiple: function(urlApi, list, cb) {
			$http({
				url: urlApi, 
				method: "GET",
				params: {
					list: list
				}  
			}).then(function(response) {
				cb(response.data);
			}, function(error) {
	
			});
		},
		/**
		 * Find a resource by id
		 * @param {array} array - resource array
		 * @param {int} id - resource id
		 * @param {function} cb - callback function 
		 */
		findItemByID: function(array, id, cb) {
			const result = array.filter(obj => {
				return obj.id == id;
			})
			cb(result);
		}
	}
})

.config(function ($routeProvider, $locationProvider) {
	// routing configuration
	$routeProvider
		.when('/characters', {
			controller: 'CharactersCtrl',
			templateUrl: 'html/views/characters.html'
		})
		.otherwise({ redirectTo: '/' });
	
	// enable deep linking
	$locationProvider.html5Mode(true);
})

// main controller
.controller('MainCtrl', function($rootScope, $scope, $location, Page) {
	$scope.Page = Page;

	// redirect to characters page
	$location.path('/characters')
})

// characters controller
.controller('CharactersCtrl', function($scope, Page, Resource) {
	Page.seth1('Characters')
	$scope.Page = Page;

	/**
	 * set pagination init parameters
	 */
	$scope.currentPage = 1;
	$scope.maxSize = 10;

	/**
	 * return resource ID splitting the URL
	 * @param {string} resourceType - resource type (character/location/episode) 
	 * @param {*} url - resource URL
	 * @returns the id from splitted string
	 */
	const getResourceIDFromURL = (resourceType, url) => {
		let splitted = url.split(resourceType+'/');
		if (splitted.length > 0) {
			return splitted[1];
		}
		return 0;
	}

	/**
	 * toggle boolean value for episodes visualization (+/-)
	 * @param {object} char - selected character
	 */
	$scope.toggleEpisodes = function(char) {
		char.episodesToggled = !char.episodesToggled;
	}

	/**
	 * resources inizialization
	 * @param {array} chars - list of characters
	 */
	const setCharacters = (chars) => {
		$scope.Characters = chars.results;
		$scope.CharInfo = chars.info;
		$scope.numPerPage = chars.results.length;

		let locationsIds = '';

		// for each character
		$scope.Characters.forEach((char) => {
			// .. get locationId and concat to locationIds string
			if (char.location.url != "") {
				locationsIds += getResourceIDFromURL('location', char.location.url)+",";
			}

			let episodesIds = '';
			// .. get episodes id and concat to episodesIds string
			char.episode.forEach((episode) => {
				episodesIds += getResourceIDFromURL('episode', episode)+",";
			})
			episodesIds = episodesIds.slice(0, -1);

			// .. get multiple episodes info and create a new array with episodesInfo 
			Resource.getMultiple('/episode/getMultiple', episodesIds, function(episodes) {
				if (episodes.length !== undefined) {
					char.episodesInfo = episodes;
				} else {
					char.episodesInfo = [];
					char.episodesInfo.push(episodes)
				}
			});
		});
		locationsIds = locationsIds.slice(0, -1);

		// .. get multiple locations info and assign to this characters
		Resource.getMultiple('/location/getMultiple', locationsIds, function(locations) {
			$scope.Locations = locations;
			$scope.Characters.forEach((char, i) => {
				if (char.location.url != "") {
					Resource.findItemByID($scope.Locations, getResourceIDFromURL('location', char.location.url), function(item) {
						$scope.Characters[i].location.info = item[0];

						// .. calculate amount of residents
						if ($scope.Characters[i].location.info) {
							$scope.Characters[i].location.info.resNum = $scope.Characters[i].location.info.residents.length;
						} else {
							$scope.Characters[i].location.info.resNum = 0;
						}
					})
				}
			})
		})
	}

	/**
	 * fired when a new page is selected
	 * @param {int} page - page number 
	 */
	$scope.pageChanged = function(page) {
		Resource.getPage('/character/getPage', page, function(objOut) {
			setCharacters(objOut)
		});
	}
	
	/**
	 * init function - get characters list
	 */
	const init = () => {
		Resource.getAll('/character/getAll', function(characters) {
			setCharacters(characters);
		});
	}

	init();
})
