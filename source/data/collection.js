enyo.kind({
	name:'hdviet.MovieList.Collection',
	kind: 'enyo.Collection',
    model: 'hdviet.MovieModel',
    defaultSource: 'hdviet',
    options: {
		parse: true
	},
	fetch: function(opts) {
        this.set('status', 'start');
        this.inherited(arguments);
    },
    didFetch: function() {
        this.inherited(arguments);
        this.set('status', 'stop');
    },
    didFail: function() {
        this.inherited(arguments);
        this.set('status', 'stop');
    }
});

enyo.kind({
	name:'hdviet.Home.MovieList.Collection',
	kind: 'hdviet.MovieList.Collection',
	url: 'movie/homepage',
	categoryIds: {
    	NW: -1,
    	RD: 74,
    	HT: 37
    },
	published: {
		category: null
	},
	categoryChanged: function(oldValue, newValue) {
		this.loadMovies(newValue);
	},
	loadMovies: function(categoryType) {
		this.destroyAll();
		this.fetch();
	},
	parse: function(data) {
		var movies = [], i;

		switch (this.category) {
			case 'NW':
			case 'RD':
			case 'HT':
				var categories = data && data.r && data.r.MoviesByCates,
					currentCategory;
				for (var i = 0; i < categories.length; i++) {
					currentCategory = categories[i];
					if (currentCategory.CategoryID == this.categoryIds[this.category]) {
						movies = currentCategory.Movies;
						break;
					}
				}
				break;
			default:
				var adsMovies = data && data.r && data.r.Movies_Banners;
				for (i = 0; i < adsMovies.length; i++) {
					if (adsMovies[i].MovieID != '-1') {
						movies.push(adsMovies[i]);
					}
				}
				break;
		}
		return movies;
	}
});

enyo.kind({
    name: 'hdviet.SearchCollection',
    kind: 'hdviet.Collection',
    published: {
        searchText: null
    },
    searchTextChanged: function() {
        this.destroyAll();
        this.fetch();
    },
    fetch: function(opts) {        
        return this.inherited(arguments);
    }
});