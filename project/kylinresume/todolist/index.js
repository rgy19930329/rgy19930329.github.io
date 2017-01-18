var ref = new Wilddog('https://kylin.wilddogio.com/todolist');
var ongoingRef = ref.child('ongoing'),
    finishedRef = ref.child('finished'),
    giveupRef = ref.child('giveup');

var num_ongoing = 0;
wu.each(ongoingRef, function(item, id) {
  num_ongoing++;
  $('<li>' +
      '<input type="checkbox" class="J-checkbox" data-item=' + item + ' data-id=' + id + '>' +
       item +
      '<span class="glyphicon glyphicon-remove icon-del J-del-btn" id=' + id + '></span>' +
    '</li>')
  .appendTo('#J-ongoing-ul');
  $('.J-num-ongoing').html(num_ongoing);
});

var num_finished = 0;
wu.each(finishedRef, function(item, id) {
  num_finished++;
  $('<li>' +
      '<input type="checkbox" class="J-checkbox" data-item=' + item + ' data-id=' + id + '>' +
       item +
      '<span class="glyphicon glyphicon-remove icon-del J-del-btn" id=' + id + '></span>' +
    '</li>')
  .appendTo('#J-finished-ul');
  $('.J-num-finished').html(num_finished);
});

var num_giveup = 0;
wu.each(giveupRef, function(item, id) {
  num_giveup++;
  $('<li>' +
      '<input type="checkbox" class="J-checkbox" data-item=' + item + ' data-id=' + id + '>' +
       item +
      '<span class="glyphicon glyphicon-remove icon-del J-del-btn" id=' + id + '></span>' +
    '</li>')
  .appendTo('#J-giveup-ul');
  $('.J-num-giveup').html(num_giveup);
});

$('input[name=entry]').on('keypress', function(e) {
  if(e.keyCode == 13) {
    var item = $(this).val();
    if($.trim(item)) {
      $(this).val('');
      wu.add(ongoingRef, item);
    } 
  }
});

$('#J-ongoing-ul').on('click', '.J-del-btn', function() {
  var id = $(this).attr('id');
  wu.remove(ongoingRef, id);
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
});

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