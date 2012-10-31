require.config({
	paths: {
		loader: 'libs/loader',
		jQuery: 'libs/jquery/jquery',
		Underscore: 'libs/underscore/underscore',
		Backbone: 'libs/backbone/backbone',
		Handlebars: 'libs/handlebars/handlebars'
	}
});

require([
	'app'
], function(App){
	App.initialize();
});