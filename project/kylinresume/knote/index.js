var ref = new Wilddog('https://kylin.wilddogio.com/knote');

function debounce(fn, delay) {
  var timer = null;

  return function() {
    clearTimeout(timer);
    var _this = this,
      args = arguments;
    timer = setTimeout(function() {
      fn.apply(_this, args);
    }, delay);
  }
}

var Page = {
  run: function() {
    this._init();
  },
  _init: function() {
    this._initSelector();
    this._initDatePicker();
    this._initData();
    this._initEvent();
  },
  _initSelector: function() {
    this.$selectDate = $('#J-select-date');
    this.$noteContent = $('#J-note-content');
    this.$effectBox = $('#J-effect-box');
  },
  _initDatePicker: function() {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = { preset: 'date' };
    opt.datetime = { preset: 'datetime' };
    opt.time = { preset: 'time' };
    opt.default = {
      theme: 'android-ics light', //皮肤样式
      display: 'modal', //显示方式 
      mode: 'scroller', //日期选择模式
      dateFormat: 'yyyy-mm-dd',
      lang: 'zh',
      showNow: true,
      nowText: "今天",
      startYear: currYear - 50, //开始年份
      endYear: currYear + 10 //结束年份
    };

    this.$selectDate.mobiscroll($.extend(opt['date'], opt['default']));

    var date = new Date().format('yyyy-MM-dd');
    this.$selectDate.val(date);
    this._showNote(date);
  },
  _initData: function() {
    var _this = this;
    this.$selectDate.on('change', function() {
      var date = $(this).val();
      _this._showNote(date);
    });
  },
  _initEvent: function() {
    var _this = this;
    this.$noteContent.on('input', debounce(function() {
      var note = $.safeStr($(this).html()),
          date = _this.$selectDate.val();
      if(note) {
        _this._saveNote(date, note);
      }else{
        _this._deleteNote(date);
      }

      _this.$effectBox.toggleClass('status-save');
      setTimeout(function() {
        _this.$effectBox.toggleClass('status-save');
      }, 600);
    }, 1000));
  },
  _saveNote: function(date, note) {
    ref.child(date).set(note);
  },
  _deleteNote: function(date) {
    ref.child(date).remove();
  },
  _showNote: function(date) {
    var _this = this;
    ref.child(date).on('value', function(snap) {
      var text = snap.val() ? snap.val() : '';
      text = $.escape2Html(text);
      _this.$noteContent.html(text); 
    });
  }
};

Page.run();
