//This function returns border, fill colors, and opacity for Polygon layers
function getPolygonColors (eventName)
{
    switch(eventName) {
    case "Flood Advisory" : return {color: "#0000FF",fillColor: "#27F5EE"}; break;
    case "Flood Watch" : return {color: "#0000FF",fillColor: "#27A3F5"}; break;
    case "Flood Warning" : return {color: "#0000FF",fillColor: "#0000FF", fillOpacity: 0.65}; break;
    case "Flash Flood Advisory" : return {color: "#0000FF",fillColor: "#FFC4FA"}; break;
    case "Flash Flood Watch" : return {color: "#0000FF",fillColor: "#FF91F5"}; break;
    case "Flash Flood Warning" : return {color: "#0000FF",fillColor: "#FF2EEE", fillOpacity: 0.65}; break;
    case "Special Marine Warning" : return {color: "#F57627",fillColor: "#F5E427"}; break;
    case "Severe Thunderstorm Warning" : return {color: "#F57627",fillColor: "#F57627"}; break;
    case "Special Weather Statement" : return {color: "#FF00FF",fillColor: "#FF00FF"}; break;
    case "Marine Weather Statement" : return {color: "#FF00FF",fillColor: "#F5E427"}; break;
    case "Dust Advisory" : return {color: "#6E5937",fillColor: "#6E5937"}; break;
    case "Local Area Emergency" : return {color: "#FF0000",fillColor: "#0000FF", fillOpacity: 0.65}; break;
    default: return {color: "#000000",fillColor: "#000000"};

    }
}

//Returns list of current legend items
function getLegendItems()
{
    var legend = document.getElementsByClassName("legend")[0];
    var itemList = [];

    for(let item in legend.childNodes)
    {
        if(legend.childNodes[item].nodeName == "SPAN")
            {
                itemList.push(legend.childNodes[item].id);
            }
    }

    return itemList;
}

//Adds a layer to the map legend
function addToLegend(event)
{
    var legend = document.getElementsByClassName("legend")[0];

    var colors = getPolygonColors(event);

    //Convert Hex to decimal for RGBA function
    var r = parseInt(colors.fillColor.substring(1,3), 16);
    var g = parseInt(colors.fillColor.substring(3,5), 16);
    var b = parseInt(colors.fillColor.substring(5,7), 16);

    var background = r.toString() + "," + g.toString() + "," + b.toString();

    r = parseInt(colors.color.substring(1,3), 16);
    g = parseInt(colors.color.substring(3,5), 16);
    b = parseInt(colors.color.substring(5,7), 16);

    var border = r.toString() + "," + g.toString() + "," + b.toString();

    legend.innerHTML += '<span id="' + event.replaceAll(" ","") +'"><span class="symbol square" style="background: rgba(' + background + ',0.5); border-color: rgba(' + border +',1.0)"></span><span>' + event + '</span></span><br>';
}

//Functions to create Popup texts for Alert types
//On Each Feature function for fire layer
function onEachFeatureFire(feature, layer)
{
    var date = new Date(feature.properties.attr_FireDiscoveryDateTime);
    var updated = new Date(feature.properties.poly_DateCurrent);
    var popupText = "Incident Name: " + feature.properties.poly_IncidentName + "<br>";
    popupText += "Discovery Date: " + date.toLocaleString()  + "<br>";
    popupText += "Last Updated: " + updated.toLocaleString() + "<br>";
    popupText += "Origin: " + feature.properties.attr_InitialLatitude + ", " + feature.properties.attr_InitialLongitude + "<br>";
    popupText += "Estimated Size: " + (Math.round(feature.properties.poly_Acres_AutoCalc * 100) / 100) + "<br>";
    popupText += "Containment: " + feature.properties.attr_PercentContained + "%";
    layer.bindPopup(popupText);
}

//On Each Feature function for Earthquake layer
function onEachFeatureEQ(feature, layer)
{
    var date = new Date(feature.properties.time);
    var popupText = "Incident Name: " + feature.properties.title + "<br>";
    popupText += "Date: " + date.toLocaleString()  + "<br>";
    popupText += "Origin: " + feature.geometry.coordinates[1] + ", " + feature.geometry.coordinates[0] + "<br>";
    popupText += "Depth: " + feature.geometry.coordinates[2] + "km<br>";
    popupText += "Size: M" + feature.properties.mag;
    layer.bindPopup(popupText);
}

//On Each Feature function for NWS alert layers
function onEachFeatureNWS(feature, layer)
{
    var starts = new Date(feature.properties.effective);
    var expires = new Date(feature.properties.expires);
    var popupText = "Alert: " + feature.properties.event + "<br>";
    popupText += "Starts: " + starts.toLocaleString()  + "<br>";
    popupText += "Expires: " + expires.toLocaleString()  + "<br>";
    popupText += "Issuer: " + feature.properties.senderName + "<br>";
    popupText += "Description: " + feature.properties.description + "<br><br>";
    popupText += "Instructions: " + feature.properties.instruction;
    layer.bindPopup(popupText);

    //If alert does not exist in the legend, add it to the Legend
    if(!(getLegendItems().includes(feature.properties.event.replaceAll(" ",""))))
    {
        //console.log(feature.properties.event);
        addToLegend(feature.properties.event);
    }
}