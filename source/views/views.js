enyo.kind({
	name: 'hdviet.MainView',	
	classes: 'moon enyo-fit main-view',	
    handlers: {
        onRequestPushPanel: 'pushPanel'
    },
	components: [		
        {kind: 'hdviet.Panels', classes: 'enyo-fit', pattern: 'activity', popOnBack:true, components: [
            {kind: 'hdviet.HomePanel'}
        ]}
	],
    create: function() {
        this.inherited(arguments);
        this.set('homeMovies', new hdviet.Home.MovieList.Collection());
        this.$.homePanel.set('movies', this.homeMovies);
    },
    pushPanel: function(inSender, inEvent) {
        this.$.panels.pushPanel(inEvent.panel);
    }
});

enyo.kind({
    name: 'hdviet.Panels',
    kind: 'moon.Panels',
    handlers: {
        onTransitionFinish: 'transitionFinish'
    },
    transitionFinish: function(inSender, inEvent) {
        var toIndex = inEvent.toIndex,
            fromIndex = inEvent.fromIndex,
            popFrom;

        if (this.popOnBack && (toIndex < fromIndex)) {
            popFrom = toIndex + 1;
            this.popPanels(popFrom);
        }
    }
});

enyo.kind({
    name:'hdviet.HomePanel',
    kind:'moon.Panel',
    title: 'Home',
    published: {
        collection: null
    },
    events: {
        onRequestPushPanel: ''
    },
    headerComponents: [
        {kind: 'moon.Spinner', content: 'Loading', name: 'spinner'},
        {kind: 'moon.Button', name:'searchButton', content: 'Search', ontap: 'openSearchPanel'}
    ], 
    bindings: [
        {from: '.movies', to: '.$.bannerGridList.collection'},
        {from: '.movies', to: '.$.gridList.collection'},
        {from: '.movies.status', to:'.$.spinner.showing', transform: function (value) {
            return value == 'start';
        }},
        {from: '.movies.category', to:'.$.bannerGridList.showing', transform: function (value) {
            return value == 'BR';
        }},
        {from: '.movies.category', to:'.$.gridList.showing', transform: function (value) {
            return value != 'BR';
        }}
    ],
    components: [
        {kind: 'FittableColumns', fit: true, components: [
            {
                name: 'category',
                kind: 'enyo.Group',
                classes: 'moon-4h',
                components: [
                    {kind: 'moon.SelectableItem', content: 'Banner', selected: true, categoryType: 'BR'},
                    {kind: 'moon.SelectableItem', content: 'Recommended', categoryType: 'RD'},
                    {kind: 'moon.SelectableItem', content: 'Hot', categoryType: 'HT'},
                    {kind: 'moon.SelectableItem', content: 'New', categoryType: 'NW'}
                    
                ],
                onActivate: 'changeList'
            },
            {kind: 'moon.DataGridList', name: 'bannerGridList', fit: true, spacing: 20, minWidth: 280, minHeight: 250, ontap: 'itemSelected', components: [
                {kind: 'hdviet.GridListImageItem'}
            ]},
            {kind: 'moon.DataGridList', name: 'gridList', fit: true, spacing: 20, minWidth: 200, minHeight: 370, components: [
                {kind: 'hdviet.GridListImageItem'}
            ]}
        ]}
    ],
    changeList: function (inSender, inEvent) {
        if (inEvent.originator.getActive()) {
            var category = this.$.category.active.get('categoryType');
            this.movies.set('category', category);
        }
    },
    itemSelected: function(inSender, inEvent) {
        this.movies.set('selected', inEvent.model);
        this.doRequestPushPanel({panel: {kind: 'hdviet.DetailPanel', model: inEvent.model}});
    },
    openSearchPanel: function(inSender, inEvent) {

    }
});

enyo.kind({
    name: 'hdviet.DetailPanel',
    kind: 'moon.Panel',
    title: 'Movie Detail',
    events: {
        onRequestPushPanel: ''
    },
    headerComponents: [
        {kind: 'moon.Button', content: 'Watch Now', ontap: 'requestVideoPlayer'}
    ],
    components: [
        {kind: 'enyo.Image', fit: true},
        {kind: 'enyo.FittableColumns', components: [
            {content: 'aa'},
            {content: 'bb'}
        ]}
    ],
    bindings: [
        {from: '.model.poster', to: '.$.image.source'}
    ],
    requestVideoPlayer: function() {
        this.doRequestPushPanel({panel: {kind: 'hdviet.VideoPlayerPanel', model: this.model}});
    }
});

enyo.kind({
    name: 'hdviet.VideoPlayerPanel',
    kind: 'moon.Panel',
    components: [
        {kind: 'moon.VideoPlayer', autoplay: true, fit: true, src: 'http://plist.vn-hd.com/mp4v3/da1f6e1f3f01c5e3cd738626d61612a9/16f5bf1caf3d4cfb90828aea19c79d06/00000000000000000000000000000000/11029_e1_320_480_iviettel.smil/playlist.m3u8'}
    ]
});

enyo.kind({
    name:'hdviet.GridListImageItem',
    kind:'moon.GridListImageItem',
    bindings: [
        {from: '.model.KnownAs', to: '.caption'},
        {from: '.model.MovieName', to: '.subCaption'},
        {from: '.model.poster', to: '.source'}
    ]
});