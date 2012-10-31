define([
	'jQuery',
	'Underscore',
	'Backbone',
	'models/user'
], function($, _, Backbone, uColor){
	var userColors = Backbone.Collection.extend({

		localStorage: new Store("colors"),

	});

	return new userColors;
});