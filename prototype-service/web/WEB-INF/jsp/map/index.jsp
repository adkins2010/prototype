<%@ page contentType = "text/html;charset=UTF-8" language = "java" %>
<%
    Double lat = null;
    Double lng = null;
    if(request.getParameter("lat") != null) {
    	lat = Double.parseDouble(request.getParameter("lat"));
    }
    if(request.getParameter("lng") != null) {
        lng = Double.parseDouble(request.getParameter("lng"));
    }
%>
<!DOCTYPE html>
<html lang = "en">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#000000">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
        <style>
            html,
            body,
            #map {
                height: 100%;
                width: 100%;
                margin: 0px;
                padding: 0px
            }

        </style>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDZHZHHITCFz-Xyi0XRIFH1BoAOH7YinPY"></script>
        <title>Map</title>
    </head>
    <body>
        <script>
            var mapDiv = document.getElementById("map");

            function initMap() {
                var myLatLng = {
                    lat: 43.6222102,
                    lng: -79.6694881
                };

                var map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 15,
                    center: myLatLng
                });

                var marker = new google.maps.Marker({
                    position: myLatLng,
                    map: map,
                });
            }
            google.maps.event.addDomListener(window, 'load', initMap);
        </script>
        <div id="map"></div>
    </body>
</html>

