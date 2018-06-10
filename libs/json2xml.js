// because we dont have real arrays
function shouldBeArray(o) {
  return typeof(o) == "object" && _.every(_.map(_.keys(o), function(k, i) {
    return Number(k) === i
  }))
}

function json2xml(o, tab) {
  var toXml = function(v, name, ind) {
      var xml = "";
      if (shouldBeArray(v)) {
        for (var i = 0, n = _.keys(v).length; i < n; i++)
          xml += toXml(v[i], name, ind + "\t");
      } else if (typeof(v) == "object") {
        var hasChild = false;
        xml += ind + "<" + name;
        for (var m in v) {
          if (m.charAt(0) == "@")
            xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
          else
            hasChild = true;
        }
        xml += hasChild ? ">\n" : "/>\n";
        if (hasChild) {
          for (var m in v) {
            if (m == "#text")
              xml += v[m];
            else if (m == "#cdata")
              xml += "<![CDATA[" + v[m] + "]]>";
            else if (m.charAt(0) != "@")
              xml += toXml(v[m], m, ind + "\t");
          }
          xml += (xml.charAt(xml.length - 1) == "\n" ? ind : "") + "</" + name + ">\n";
        }
      } else {
        xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">\n";
      }
      return xml;
    },
    xml = "";
  for (var m in o)
    xml += toXml(o[m], m, '');
  return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
}