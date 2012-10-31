define([
	'jQuery',
	'Underscore',
	'Backbone',
	'views/home',
	'views/user',
	'views/navigation'
	
], function($, _, Backbone, homeView, userView, navView){
	var router = {};

	var AppRouter = Backbone.Router.extend({
		routes: {
			"!/c/:color" : "color",
			"!/random" : "random",
			"*action" : "defaultAction"
		},

		color: function(color){
			homeView.render(color);
		},

		defaultAction: function(){
			homeView.render();
		},

		random: function(){
			homeView.render();
			this.navigate('random', {trigger: true});
			
		}
	});

	var initialize = function(){
		var app_router = new AppRouter;
		Backbone.history.start();
		navView.render(app_router);
	}

	return {
		initialize: initialize
	};
});