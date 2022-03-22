export function camelize(str) {
  return str.indexOf("_") > 0
    ? str
        .split("_")
        .map((w, i) => (i > 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w))
        .join("")
    : str;
}

export function toRGB(hex){
    hex = hex.replace('#','')
    var aRgbHex = hex.match(/.{1,2}/g);
    var aRgb = [
        parseInt(aRgbHex[0], 16),
        parseInt(aRgbHex[1], 16),
        parseInt(aRgbHex[2], 16)
    ];
    return aRgb.join(',');
}


export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function capitalize(s){
  return s[0].toUpperCase() + s.substring(1);
}

export function pause(dur = 1000) {
  return new Promise((next) => setTimeout(next, dur));
}


export function toDate(d) {
  if (d.indexOf("T") > 0) d = d.split("T")[0];
  return new Date(`${d}T00:00:00-07:00`);
}

export function isDate(d){
  return d instanceof Date
}

export function clamp(v,min,max){
  return Math.min(Math.max(v,min),max)
}

export function getDay(d) {
  if (!isDate(d)) d = toDate(d)
  return new Intl.DateTimeFormat("en-US", { day: 'numeric' }).format(d).padStart(2,0);
}

export function getWeekDay(d,f="long") {
  if (!isDate(d)) d = toDate(d)
  return new Intl.DateTimeFormat("en-US", { weekday: f }).format(d);
}

export function getMonth(d, f = "long") {
  if (!isDate(d)) d = toDate(d)
  return new Intl.DateTimeFormat("en-US", { month: f }).format(d);
}

export function getYear(d) {
  if (!isDate(d)) d = toDate(d)
  return d.getFullYear();
}

export function getPosition(el){
  var xPos = 0;
  var yPos = 0;
  var hPos = el.offsetHeight;
  var wPos = el.offsetWidth;
  while (el) {
    xPos += el.offsetLeft;
    yPos += el.offsetTop;
    el = el.offsetParent;
  }
  return {
    top: yPos,
    bottom: yPos + hPos,
    left: xPos,
    right: xPos + wPos,
    height: hPos,
    width: wPos,
  };
}


export function formatDate(date,format = "mmm dd, yyyy") {
  if (!date) return;

  date = toDate(date)

  format = format.replace('mmmm',getMonth(date, "long"))
  format = format.replace('mmm',getMonth(date, "short"))
  format = format.replace('mm',getMonth(date, "numeric"))
  format = format.replace('dddd',getWeekDay(date,"long"))
  format = format.replace('ddd',getWeekDay(date,"short"))
  format = format.replace('dd',getDay(date,'numeric'))
  format = format.replace('yyyy',getYear(date))

  return format
}


export function getDateOffset(o = 0) {
  let d = new Date();
  d.setDate(d.getDate() + o);

  let m = "" + (d.getMonth() + 1),
    w = "" + d.getDate(),
    y = d.getFullYear();

  if (m.length < 2) m = "0" + m;
  if (w.length < 2) w = "0" + w;

  return [y, m, w].join("-");
}


export function getTemp(k) {
  return `${Math.round(((k - 273.15) * 9) / 5 + 32)}°F`;
}


export function getTime(t, o = 0) {
  return new Date(t * 1000 + o * 1000).toLocaleTimeString("en-US", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getTimeFromDate(t) {
  return new Date(t).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}


export function inViewPort(el){
  let rect = el.getBoundingClientRect()
  return rect.top < window.innerHeight && rect.bottom > 0
}

export function formatSnakeToProper(t){
  return t.split('_').map(t => `${t[0].toUpperCase()}${t.slice(1)}`).join(" ")
}

export function LightenDarkenColor(color, percent) {
  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R<255)?R:255;
  G = (G<255)?G:255;
  B = (B<255)?B:255;

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

export function randomArray(a){
  let int = parseInt(random(0,a.length - 1))
  return a[int]
}

export function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
