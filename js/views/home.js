define(['jQuery', 'Underscore', 'Backbone', 'Handlebars', 'collections/colors', 'collections/userColors', 'text!templates/home.html', ], 
	function($, _, Backbone, Handlebars, Colors, userColors, homeTemplate) {

	var Homeview = Backbone.View.extend({

		template: null,

		el: $('#dynamic'),

		initialize: function() {

			this.template = Handlebars.compile(homeTemplate);
			userColors.on('remove', function(model) {
				var cid = 'c' + $('#dynamic h2').data('cid');
				var currentColor = JSON.parse(JSON.stringify(Colors.getByCid(cid)));
				if (currentColor.p === model.get('p')) {
					this.render(currentColor.p);
				}
			}, this);
		},

		render: function(color) {
			var bgColor = Colors.where({
				'p': color
			});
			var wColor;
			if (bgColor.length > 0) {
				wColor = bgColor[0];
			} else {
				wColor = Colors.at(Math.floor(Math.random() * 800));
			}
			
			var t = this.template({
				color: wColor.get('p'),
				cid: wColor.cid.substr(1)
			});
			
			$('#swatch').css('backgroundColor', wColor.get('h'));
			this.$el.html(t);

			var neoModel = JSON.parse(JSON.stringify(wColor));
			var str = '';
			var temp;
			if ((temp = userColors.where({
				'p': neoModel.p
			})).length === 0) {
				str = '<a href="#" id="current_color_save">Save this</a>';
			} else {
				str = '<a href="#" class="unsaver" data-pantone="' + temp[0].id + '">Unsave this</a>';
			}
			this.$el.append(str);
		},

		events: {
			'click #current_color_save': 'save_color',
			'click .unsaver': 'remove_color'
		},

		save_color: function(e) {
			e.preventDefault();
			e.stopPropagation();
			var cid = 'c' + $(e.target).siblings('h2').data('cid');
			var model = JSON.parse(JSON.stringify(Colors.getByCid(cid)));
			userColors.create(model);
			this.render(model.p);

		},

		remove_color: function(e) {
			e.preventDefault();
			e.stopPropagation();
			var id = $(e.target).attr('data-pantone');
			var target = userColors.get(id);
			target.destroy();

		}

	});
	return new Homeview;
});