<!DOCTYPE html>
<html>
  <head>
    <style>
      /* Hide all elements, except for the element with ID 'myContent' */
      :not(#myContent):fullscreen {
        display: none;
      }

      /* Make 'myContent' take up the whole screen */
      #myContent:fullscreen {
        width: 100%;
        height: 100%;
      }
    </style>
  </head>
  <body>
    <h1>Fullscreen Demo</h1>
    <button onclick="openFullscreen();">Go Fullscreen</button>

    <div id="myContent">
      <p>This is some content that will be visible in fullscreen mode.</p>
    </div>

    <script>
      function openFullscreen() {
        var elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { /* Firefox */
          elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE/Edge */
          elem.msRequestFullscreen();
        }
      }
    </script>
  </body>
</html>
