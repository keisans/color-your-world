define(['order!libs/jquery/jquery-min', 'order!libs/underscore/underscore-min', 'order!libs/backbone/backbone-min', 'order!libs/backbone/backbone-localstorage', 'libs/handlebars/handlebars-max'], function() {
	return {
		Backbone: Backbone.noConflict(),
		_: _,
		$: $.noConflict(),
		Handlebars: Handlebars
	};
});
