var ref = new Wilddog('https://kylin.wilddogio.com/textshare');

var Page = {
	run: function() {
		this._init();
	},
	_init: function() {
		this._initData();
		this._updateData();
	},
	_initData: function() {
		var _this = this;
		ref.on('value', function(snap) {
			var text = $.escape2Html( snap.val() );
			_this._updateTpl(text);
		});
	},
	_updateData: function() {
		$('#J-share-btn').on('click', function() {
			var text = $('#J-entry-input').val();
			if($.trim(text) == '') {
				$('#J-alert-box').show();
				setTimeout(function() {
					$('#J-alert-box').hide();
				}, 2000);
				return;
			}
			text = $.html2Escape($.strToLink(text));
			wu.set(ref, text);
			$('#J-entry-input').val('');
		});
	},
	_updateTpl: function(text) {
		$('#J-show-area').html(text);
	}
};

Page.run();