import {getCookie} from "https://jscroot.github.io/cookie/croot.js";

export let URLGeoJson = "https://asia-southeast2-daffaaudya.cloudfunctions.net/gisch3or";
export let urlPostGCF = "https://asia-southeast2-daffaaudya.cloudfunctions.net/gischp4or";
export let UrlLogin = "https://asia-southeast2-daffaaudya.cloudfunctions.net/gislogin"
export let UrlRegister = "https://asia-southeast2-daffaaudya.cloudfunctions.net/gisregister"
export let tableTag = "tr";
export let tableRowClass = "content is-small";
export let token = "daffa"
export let cookie = getCookie("Login")
export let tableTemplate = `
<td>#NAME#</td>
<td >#KORDINAT#</td>
<td>#TYPE#</td>
`
export const clickpopup = `
Long : #LONG#<br>
Lat  : #LAT#<br>
X   : #X#<br>
Y   : #Y#<br>
HDMS : #HDMS#<br>
`
