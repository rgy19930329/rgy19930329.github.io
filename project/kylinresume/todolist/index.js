var ref = new Wilddog('https://kylin.wilddogio.com/todolist');
var ongoingRef = ref.child('ongoing'),
    finishedRef = ref.child('finished'),
    giveupRef = ref.child('giveup');

wu.each(ongoingRef, function(item, id) {
  $('<li>' +
      '<label><input type="checkbox" class="J-checkbox" data-item=' + item + ' data-id=' + id + '>' + item + '</label>' +
      '<span class="glyphicon glyphicon-remove icon-del J-del-btn" id=' + id + '></span>' +
    '</li>')
  .appendTo('#J-ongoing-ul');
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