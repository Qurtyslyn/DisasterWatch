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
    default: return {color: "#000000",fillColor: "#000000"};

    }
}

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

function addToLegend(event)
{
    //'<span id="Fire"><span class="symbol fire"></span><span>Wildfire</span></span><br>';
    var legend = document.getElementsByClassName("legend")[0];

    var colors = getPolygonColors(event);

    var r = parseInt(colors.fillColor.substring(1,3));
    var g = parseInt(colors.fillColor.substring(3,5));
    var b = parseInt(colors.fillColor.substring(5,7));

    var background = r.toString() + "," + g.toString() + "," + b.toString();

    r = parseInt(colors.color.substring(1,3));
    g = parseInt(colors.color.substring(3,5));
    b = parseInt(colors.color.substring(5,7));

    var border = r.toString() + "," + g.toString() + "," + b.toString();

    legend.innerHTML += '<span id="' + event.replaceAll(" ","") +'"><span class="symbol square" style="background: rgba(' + background + ',0.5); border-color: rgba(' + border +',1.0)"></span><span>' + event + '</span></span><br>';
}