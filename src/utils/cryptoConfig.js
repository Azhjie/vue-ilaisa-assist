// import md5 from 'js-md5'
import md5 from 'js-md5'
import base64 from 'js-base64'
console.log('base64', base64)

const g = function (t) {
  var e = void 0
    , n = []
    , o = {};
  for (e in t)
    n.push(e);
  for (n.sort(),
    e = 0; e < n.length; e++)
    o[n[e]] = t[n[e]];
  return o
}

export default function () {
    var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}
    , e = ""
    , n = []
    , o = ""
    , i = g(t);

  for (var a in i){
    e = a + "=" + i[a]
    n.push(e);
  }
  o = n.join("&")
  return md5((base64.Base64.encode(o))).toLowerCase()
}