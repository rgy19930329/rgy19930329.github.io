var ref = new Wilddog('https://kylin.wilddogio.com/todolist');
var ongoingRef = ref.child('ongoing'),
    finishedRef = ref.child('finished'),
    giveupRef = ref.child('giveup');

var Page = {
  run: function() {
    this._init();
  },
  _init: function() {
    this._initData();
    this._initEvent();
  },
  _initData: function() {
    this._initOnGoingList();
    this._initFinishedList();
    this._initGiveUpList();
  },
  _initEvent: function() {
    this._addItemEvent();
    this._removeItemEvent();
    this._slideListEvent();
  },
  _initOnGoingList: function() {
    var num_ongoing = 0;
    wu.each(ongoingRef, function(item, id) {
      num_ongoing++;
      item = $.safeStr(item);
      $('<li>' +
          '<input type="checkbox" class="J-checkbox" data-item=' + item + ' data-id=' + id + '>' +
          '<div class="item-content" title=' + item + '>' + item + '</div>' +
          '<span class="glyphicon glyphicon-remove icon-del J-del-btn" data-item=' + item + ' id=' + id + '></span>' +
        '</li>')
      .prependTo('#J-ongoing-ul');
      $('.J-num-ongoing').html(num_ongoing);
    });
  },
  _initFinishedList: function() {
    var num_finished = 0;
    wu.each(finishedRef, function(item, id) {
      num_finished++;
      item = $.safeStr(item);
      $('<li>' +
          '<input type="checkbox" checked="checked" disabled="disabled">'+
          '<div class="item-content" title=' + item + '>' + item + '</div>' +
        '</li>')
      .appendTo('#J-finished-ul');
      $('.J-num-finished').html(num_finished);
    });
  },
  _initGiveUpList: function() {
    var num_giveup = 0;
    wu.each(giveupRef, function(item, id) {
      num_giveup++;
      item = $.safeStr(item);
      $('<li>' +
          '<input type="checkbox" checked="checked" disabled="disabled">' +
          '<div class="item-content" title=' + item + '>' + item + '</div>' +
        '</li>')
      .appendTo('#J-giveup-ul');
      $('.J-num-giveup').html(num_giveup);
    });
  },
  _addItemEvent: function() {
    $('input[name=entry]').on('keypress', function(e) {
      if(e.keyCode == 13) {
        var item = $(this).val();
        if($.trim(item)) {
          $(this).val('');
          wu.add(ongoingRef, item);
        } 
      }
    });
  },
  _removeItemEvent: function() {
    $('#J-ongoing-ul').on('click', '.J-del-btn', function() {
      var id = $(this).attr('id'),
          item = $(this).data('item');
      wu.remove(ongoingRef, id);
      wu.add(giveupRef, item);
    });

    $('#J-ongoing-ul').on('click', '.J-checkbox', function() {
      var id = $(this).data('id'),
          item = $(this).data('item');
      wu.remove(ongoingRef, id);
      wu.add(finishedRef, item);
    });

    ongoingRef.on('child_removed',function(snap){
      var id = snap.key();
      $('#' + id).parent().remove();
      var num_ongoing = +$('.J-num-ongoing').html();
      num_ongoing--;
      $('.J-num-ongoing').html(num_ongoing);
    });
  },
  _slideListEvent: function() {
    $('.J-list-btn').on('click', function() {
      var flag = $(this).data('flag'),
          map = {
            ongoing: function() {
              $('#J-ongoing-ul').toggle('hide');
            },
            finished: function() {
              $('#J-finished-ul').toggle('hide');
            },
            giveup: function() {
              $('#J-giveup-ul').toggle('hide');
            },
          };
      map[flag]();
    });
  }
}

Page.run();
