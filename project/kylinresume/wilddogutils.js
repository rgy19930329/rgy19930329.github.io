(function() {

  window.wu = {
    version: '0.0.0'
  };

  // 遍历数据
  wu.each = function(ref, fn) {
    ref.on('child_added', function(snap){
      var item = snap.val();
      var id = snap.key();
      fn && fn(item, id);
    });
  };

  // 移除数据
  wu.remove = function(ref, id, opts) {
    ref.child(id).remove()
    // .then(function() {
    //   pts && opts.success && opts.success();
    // })
    // .catch(function(error) {
    //   opts && opts.error && opts.error(err);
    // });
  };

  // 添加数据
  wu.add = function(ref, item, opts) {
    ref.push(item)
    // .then(function() {
    //   opts && opts.success && opts.success();
    // })
    // .catch(function(err) {
    //   opts && opts.error && opts.error(err);
    // });
  };

})(window);