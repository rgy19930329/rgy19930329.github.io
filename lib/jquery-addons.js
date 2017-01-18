jQuery.extend({
  safeStr: function(str) {
    return String(str).replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  },
});