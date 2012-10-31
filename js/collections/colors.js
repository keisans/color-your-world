define([
	'jQuery',
	'Underscore',
	'Backbone',
	'json!pantone.json'
], function($, _, Backbone, pantone){
	var Colors = Backbone.Collection.extend({
		initialize: function(){
			_.each(pantone, function(swatch, index){
				this.add(swatch);
			}, this);
		}
	});

	return new Colors;
});