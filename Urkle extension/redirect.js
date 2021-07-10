document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('button').addEventListener('click', function() {
    var w = 440;
    var h = 440;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2); 

    chrome.windows.create({'url': '/speech.html', 'type': 'popup', 'width': w, 'height': h, 'left': left, 'top': top} , function(window) {
    });
  });
});