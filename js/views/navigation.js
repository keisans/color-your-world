define([
	'jQuery',
	'Underscore',
	'Backbone',
	'Handlebars',
	'collections/colors',
	'text!templates/nav.html'
], function($, _, Backbone, Handlebars, Colors, NavTemplate){

	var NavView = Backbone.View.extend({
		
		template: null,

		el: $('#util_nav'),

		events: {
			'click .prev_color' : "prev_color",
			'click .next_color' : "next_color"
		},

		routeInstance: null,

		initialize: function(){
			this.template = Handlebars.compile(NavTemplate);
		},

		render: function(route){
			this.$el.html(NavTemplate);
			this.routeInstance = route;
		},

		prev_color: function(e){
			e.preventDefault();
			e.stopPropagation();
			var current = $('#dynamic h2').data('cid');
			var prevCid = this.target('prev', current);
			var prevModel = Colors.getByCid('c' + prevCid);
			this.routeInstance.navigate('!/c/' + prevModel.get('p'), {trigger: true});
		},

		next_color: function(e){
			e.preventDefault();
			e.stopPropagation();
			var current = $('#dynamic h2').data('cid');
			var nextCid = this.target('next', current);
			var nextModel = Colors.getByCid('c' + nextCid);
			this.routeInstance.navigate('!/c/' + nextModel.get('p'), {trigger: true});
		},

		target: function(dir, current){
			var Lbound = parseInt(Colors.at(0).cid.substr(1), 10);
			var Ubound = parseInt(Colors.at(Colors.length - 1).cid.substr(1), 10);
			if (dir === 'prev'){
				if (current !== Lbound){
					return current - 1;
				} else {
					return Ubound;
				}
			} else {
				if(current !== Ubound){
					return current + 1
				} else {
					return Lbound;
				}
			}
		}
	})
	return new NavView;
});