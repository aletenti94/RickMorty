var app = angular.module('app', ['ngRoute', 'ui.bootstrap']);

app
.factory('Page', function() {
	let title = 'Rick & Morty';
	let h1 = 'Rick & Morty';
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
		.when('/characters', {
			controller: 'CharactersCtrl',
			templateUrl: 'html/views/characters.html'
		})
		.otherwise({ redirectTo: '/' });
	
	$locationProvider.html5Mode(true);
})
.controller('MainCtrl', function($rootScope, $scope, $location, Page) {
	$scope.Page = Page;

	$location.path('/characters')
})
.controller('CharactersCtrl', function($rootScope, $scope, $http, $routeParams, $timeout, Page, Resource) {
	Page.seth1('Characters')
	$scope.Page = Page;

	$scope.currentPage = 1;
	$scope.maxSize = 10;

	const getResourceIDFromURL = (resourceType, url) => {
		let splitted = url.split(resourceType+'/');
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

		let locationsIds = '';
		$scope.Characters.forEach((char) => {
			if (char.location.url != "") {
				locationsIds += getResourceIDFromURL('location', char.location.url)+",";
			}

			let episodesIds = '';
			char.episode.forEach((episode) => {
				episodesIds += getResourceIDFromURL('episode', episode)+",";
			})
			episodesIds = episodesIds.slice(0, -1);

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

		Resource.getMultiple('/location/getMultiple', locationsIds, function(locations) {
			$scope.Locations = locations;
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
			})
		})
	}

	$scope.pageChanged = function(page) {
		Resource.getPage('/character/getPage', page, function(objOut) {
			setCharacters(objOut)
		});
	}
	
	const init = () => {
		Resource.getAll('/character/getAll', function(characters) {
			setCharacters(characters);
		});
	}

	init();
})
