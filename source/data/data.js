enyo.kind({
    name: 'hdviet.Source',
    kind: 'enyo.JsonpSource',
    urlRoot: 'https://api-v2.hdviet.com/',
    fetch: function(rec, opts) {
    	opts.callbackName = 'jsoncallback';
		opts.params = enyo.clone(rec.params);
        this.inherited(arguments);
    }
});

enyo.kind({
	name:'hdviet.MovieModel',
	kind:'enyo.Model',
	readOnly: true,
	source: 'hdviet',
	attributes: {
		poster: function() {
			return this.get('Cover') ? this.get('Cover') : this.get('Poster100x149');
		}
	}
});

enyo.store.addSources({hdviet: 'hdviet.Source'});