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
  wu.remove = function(ref, id) {
    ref.child(id).remove();
  };

  // 添加数据
  wu.add = function(ref, item) {
    ref.push(item);
  };

  // 设置数据
  wu.set = function(ref, item) {
    ref.set(item);
  };

})(window);