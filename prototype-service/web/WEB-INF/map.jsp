
<%@ page contentType = "text/html;charset=UTF-8" language = "java" %>
<html>
    <head>
        <title>Allstate Office Location in Charlotte</title>
    </head>
    <body>
    <h1>Allstate MCO Location</h1>
    <div id="googleMap" style="width:100%;height:400px;"></div>
    <script type="javascript">
      function myMap() {
        var mapProp = {
          center: new google.maps.LatLng(#{locationBean.getLatitude()}, #{locationBean.getLongitude()}),
          zoom: 17,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      }
    </script>

    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzipO7imJhTdH4JVTh6F42T7AsQENXsDo&callback=myMap"
            type="javascript">

    </script>
    </body>
</html>
