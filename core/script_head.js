window.onload = function() {
  document.querySelector('.console-input-field').focus();
  var consoleHeader = document.getElementById("console-header");
  var console = document.getElementById("console");
  var offsetX = 0;
  var offsetY = 0;
  var isDragging = false;
  var isFullscreen = false;

  consoleHeader.addEventListener("mousedown", function(e) {
    offsetX = e.clientX - console.offsetLeft;
    offsetY = e.clientY - console.offsetTop;
    isDragging = true;
  });

  document.addEventListener("mousemove", function(e) {
    if (isDragging) {
      console.style.left = (e.clientX - offsetX) + "px";
      console.style.top = (e.clientY - offsetY) + "px";
    }
  });

  document.addEventListener("mouseup", function(e) {
    isDragging = false;
  });

  var consoleMaximize = document.querySelector('.console-maximize');
  consoleMaximize.addEventListener('click', function() {
    if (!isFullscreen) {
      if (console.requestFullscreen) {
        console.requestFullscreen();
      } else if (console.webkitRequestFullscreen) { /* Safari */
        console.webkitRequestFullscreen();
      } else if (console.msRequestFullscreen) { /* IE11 */
        console.msRequestFullscreen();
      }
      isFullscreen = true;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
      }
      isFullscreen = false;
    }
  });

  document.addEventListener('fullscreenchange', function(e) {
    if (!document.fullscreenElement) {
      console.style.left = "";
      console.style.top = "";
      isFullscreen = false;
    }
  });
}
