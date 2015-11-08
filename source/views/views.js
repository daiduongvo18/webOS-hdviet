enyo.kind({
	name: 'hdviet.MainView',	
	classes: 'moon enyo-fit main-view',	
    handlers: {
    },
	components: [		
        {kind: 'moon.Panels', classes: 'enyo-fit', pattern: 'activity', popOnBack:true, components: [
            {kind: 'hdviet.HomePanel'}
        ]}
	],
    create: function() {
        this.inherited(arguments);
        this.set('homeCollection', new hdviet.Home.MovieList.Collection());
        this.$.homePanel.set('collection', this.homeCollection);       
    }
});

enyo.kind({
    name:'hdviet.HomePanel',
    kind:'moon.Panel',
    title: 'Home',    
    published: {
        collection: null
    },
    headerComponents: [
        {kind: 'moon.Spinner', content: 'Loading', name: 'spinner'}        
    ], 
    bindings: [
        {from: '.collection', to: '.$.gridList.collection'},
        {from: '.collection.status', to:'.$.spinner.showing', transform: function (value, direction, binding) {            
            
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
                    {kind: 'moon.SelectableItem', content: 'New', categoryType: 'NW'},
                    
                ],
                onActivate: 'changeList'
            },
            {kind: 'moon.DataGridList', name: 'gridList', fit: true, minWidth: 200, minHeight: 300, components: [
                {kind: 'hdviet.GridListImageItem', imageSizing: 'cover', centered: false}
            ]}
        ]}
    ],
    changeList: function (inSender, inEvent) {
        if (inEvent.originator.getActive()) {
            var category = this.$.category.active.get('categoryType');
            this.collection.set('category', category);
        }
    }
});

enyo.kind({
    name:"hdviet.GridListImageItem",
    kind:"moon.GridListImageItem",
    bindings: [
        {from: '.model.KnownAs', to: '.caption'},
        {from: '.model.MovieName', to: '.subCaption'},
        {from: '.model.poster', to: '.source'}
    ]
});