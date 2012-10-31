define([
	'jQuery',
	'Underscore',
	'Backbone',
	'Handlebars',
	'collections/userColors',
	'text!templates/user.html',
	'text!templates/noSaves.html'
], function($, _, Backbone, Handlebars, uColors, colorTemplate, noSave){

	var UserView = Backbone.View.extend({
		
		collection: uColors,
		
		template: null,

		el: $('#user'),

		initialize: function(){
			uColors.fetch();
			console.log(this.collection);
			this.template = Handlebars.compile(colorTemplate);
			this.collection.on('change', function(eventname){
				this.render();
			}, this);
			this.collection.on('remove', function(eventname){
				this.render();
			}, this);
			this.render();
		},

		events: {
			'click .unsaver': 'unsave',
		},

		unsave: function(e){
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.target).attr('data-pantone');
			var target = this.collection.get(id);
			target.destroy();
		},

		render: function(){
			uColors.fetch();
			if(uColors.length > 0){
				var i = {colors: JSON.parse(JSON.stringify(this.collection))};
				var t = this.template(i);
				this.$el.html(t);
			} else {
				this.$el.html(noSave);
			}
		}
	});
	return new UserView;
});