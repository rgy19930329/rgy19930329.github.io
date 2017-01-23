jQuery.extend({
  safeStr: function(str) {
    return String(str).replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  },
  strToLink: function(str) {
    var reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    return str.replace(reg, '<a href="$1$2" target="_blank">$1$2</a>');
  },
  html2Escape: function(str) {
    return str.replace(/[<>&"]/g, function(c) {
      return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; 
    });
  }
});