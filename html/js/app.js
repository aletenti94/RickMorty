var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app
.factory('Page', function() {
	var title = 'Rick & Morty';
	var h1 = 'Rick & Morty';
	return {
		title: function() { return title; },
		setTitle: function(newTitle) { title = newTitle },
		h1: function() { return h1; },
		seth1: function(newh1) { h1 = newh1 }
	};
})
.factory('Resource', function($http){
	return {
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
		findItemByID: function(array, id, cb) {
			const result = array.filter(obj => {
				return obj.id == id;
			})
			cb(result);
		}
	}
})
.directive('onFinishRender', function ($timeout) {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			if (scope.$last === true) {
				$timeout(function () {
					scope.$emit('ngRepeatFinished');
				});
			}
		}
	}
})
.config( function ($routeProvider, $locationProvider) {
	$routeProvider
		.when('/character', {
			controller: 'CharactersCtrl',
			templateUrl: 'html/views/characters.html'
		})
		.otherwise({ redirectTo: '/' });
	
	$locationProvider.html5Mode(true);
})
.controller('MainCtrl', function($rootScope, $scope, $location, Page) {
	$scope.Page = Page;
	
	$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
		feather.replace();
	});

	var links = [];
	links.push({title : 'Characters', url: '/character', logo : 'user', urlApi: '/character/getAll' });
	$scope.navs = links;

	$location.path('/character')
})
.controller('CharactersCtrl', function($rootScope, $scope, $http, $routeParams, $timeout, Page, Resource) {
	Page.seth1('Characters')
	$scope.Page = Page;
	$scope.Characters = [];
	$scope.Locations = [];
	$scope.Episodes = [];

	$scope.currentPage = 1;
	$scope.maxSize = 10;

	const getResourceIDFromURL = (resourceType, url) => {
		const splitted = url.split(resourceType+'/');
		if (splitted.length > 0) {
			return splitted[1];
		}
		return 0;
	}

	$scope.toggleEpisodes = function(char) {
		char.episodesToggled = !char.episodesToggled;
	}

	const setCharacters = (chars) => {
		$scope.Characters = chars.results;
		$scope.CharInfo = chars.info;
		$scope.numPerPage = chars.results.length;

		$scope.Characters.forEach((char, i) => {
			if (char.location.url != "") {
				Resource.findItemByID($scope.Locations, getResourceIDFromURL('location', char.location.url), function(item) {
					$scope.Characters[i].location.info = item[0];
					if ($scope.Characters[i].location.info) {
						$scope.Characters[i].location.info.resNum = $scope.Characters[i].location.info.residents.length;
					} else {
						$scope.Characters[i].location.info.resNum = 0;
					}
				})
			} 
			if (char.episode.length > 0) {
				char.episodeInfo = [];
				char.episode.forEach((episode, i) => {
					Resource.findItemByID($scope.Episodes, getResourceIDFromURL('episode', episode), function(item) {
						char.episodeInfo.push(item[0]);
					})
				})
			}
		})

		console.log("Characters:",$scope.Characters)
	}

	$scope.pageChanged = function(page) {
		Resource.getPage('/character/getPage', page, function(objOut) {
			setCharacters(objOut)
		});
	}

	const populateArray = (array, objIn, cb) => {
		objIn.forEach((item) => {
			array.push(item);
		})
		if (cb) cb();
	}

	/* function loadAllPages(numPages, urlApi, array){
		if (numPages > 1) {
			for (var i = 2; i <= numPages; i++) {
				Resource.getPage(urlApi, i, function(objOut) {
					populateArray(array, objOut.results, function() {
						
					});
				})
			}
		}
	} */

	function loadAllPages(numPages, urlApi, array, page, cb){
		if (numPages > 1) {
			Resource.getPage(urlApi, page, function(objOut) {
				populateArray(array, objOut.results, function() {
					if (page < numPages) {
						loadAllPages(numPages, urlApi, array, ++page, cb);
					} else {
						if(cb) cb();
					}
				});
			})
		}
	}
	
	const init = () => {
		Resource.getAll('location/getAll', function(locations) {
			const numPages = locations.info.pages;
			populateArray($scope.Locations, locations.results);
			loadAllPages(numPages, 'location/getPage', $scope.Locations, 2, function() {
				Resource.getAll('episode/getAll', function(episodes) {
					const numPages = episodes.info.pages;
					populateArray($scope.Episodes, episodes.results);
					loadAllPages(numPages, 'episode/getPage', $scope.Episodes, 2, function() {
						Resource.getAll('/character/getAll', function(characters) {
							setCharacters(characters)
						});
					});
				})
			});
		})
	}

	init();
})







