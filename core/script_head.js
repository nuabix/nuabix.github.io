    window.onload = function() {
      var consoleHeader = document.getElementById("console-header");
      var console = document.getElementById("console");
      var offsetX = 0;
      var offsetY = 0;
      var isDragging = false;

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
    }
