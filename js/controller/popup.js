import {toLonLat} from 'https://cdn.skypack.dev/ol/proj.js';
import {toStringHDMS} from 'https://cdn.skypack.dev/ol/coordinate.js';
import {overlay,map,popupinfo,idmarker} from '../config/configpeta.js';
import {_urlGeoJson, clickpopup, urlPostGCF} from '../template/template.js';
import {insertMarker,deleteMarker} from './marker.js';
import {setInner,textBlur,onClick, getValue,setValue} from 'https://jscroot.github.io/element/croot.js';
import { postWithToken } from "https://jscroot.github.io/api/croot.js";
import { setCookieWithExpireHour, getCookie } from 'https://jscroot.github.io/cookie/croot.js';

let userToken;


// Function to get the token from cookies with a specific parameter
export function getTokenFromCookies(cookieName) {
    const token = getCookie(cookieName);
    return token;
  }
  
  // Function to get the token from API and store it in cookies
  export function getTokenFromAPI() {
    const tokenUrl = "https://asia-southeast2-fahad-402509.cloudfunctions.net/gis5logindaps";
    fetch(tokenUrl)
      .then(response => response.json())
      .then(tokenData => {
        if (tokenData.token) {
          userToken = tokenData.token;
          console.log('Token dari API:', userToken);
          setCookieWithExpireHour('user_token', userToken, 2); // Set the token in cookies
        }
      })
      .catch(error => console.error('Gagal mengambil token:', error));
  }
  
  // Retrieve the token from cookies
  userToken = getTokenFromCookies('user_token');
  
  export function onClosePopupClick() {
    overlay.setPosition(undefined);
    textBlur('popup-closer');
  }
  
  export function onDeleteMarkerClick() {
    let idmarker = getValue('idmarker');
    popupinfo.setPosition(undefined);
    deleteMarker(idmarker);
  }
  
  export function onSubmitMarkerClick() {
    let long = getValue('long');
    let lat = getValue('lat');
    let name = getValue('name');
    let volume = getValue('volume');
    let type = getValue('type');
  
    let data = {
      "type": type,
      "name": name,
      "volume": volume,
      "coordinates": [parseFloat(long), parseFloat(lat)]
    };
  
    postWithToken(urlPostGCF, "Login", userToken, data, afterSubmitCOG);
    overlay.setPosition(undefined);
    textBlur('popup-closer');
    insertMarker(name, long, lat, volume);
    idmarker.id = idmarker.id + 1;
    console.log(name);
  }
  
  function afterSubmitCOG(result) {
    console.log(result);
  }
  
  function popupInputMarker(evt) {
    let tile = evt.coordinate;
    let coordinate = toLonLat(tile);
    let msg = clickpopup.replace("#LONG#", coordinate[0]).replace("#LAT#", coordinate[1]).replace('#X#', tile[0]).replace('#Y#', tile[1]).replace('#HDMS#', toStringHDMS(coordinate));
    msg = 'ID: ' + idmarker.id + '<br>' + msg + "Pixel: " + evt.pixel + "<br>"
    setInner('popup-content', msg);
    setValue('long', coordinate[0]);
    setValue('lat', coordinate[1]);
    overlay.setPosition(tile);
  }
  
  function popupGetMarker(evt, features) {
    let title = features.get('name');
    setInner('popupinfo-title', title);
    setValue('idmarker', features.get('id'));
    let ctnt = "type: " + features.getGeometry().getType() + "<br>XY: " + toLonLat(evt.coordinate);
    setInner('popupinfo-content', ctnt);
    popupinfo.setPosition(evt.coordinate);
  }
  
  export function onMapPointerMove(evt) {
    const pixel = map.getEventPixel(evt.originalEvent);
    const hit = map.hasFeatureAtPixel(pixel);
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
  }
  
  let popover;
  
  export function disposePopover() {
    if (overlay || popupinfo) {
      overlay.setPosition(undefined);
      popupinfo.setPosition(undefined);
    }
  }
  
  export function onMapClick(evt) {
    const typeSelect = document.getElementById('type');
    let val = typeSelect.value
    let feature = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      return feature;
    });
    overlay.setPosition(undefined);
    popupinfo.setPosition(undefined);
    if (!feature) {
      popupInputMarker(evt);
      return;
    } else if (val == "Polygon" || val == "LineString" || val == "Circle" || val == "Point") {
      popupInputMarker(evt)
    } else {
      popupGetMarker(evt, feature);
    }
  }
  
  export function GetLonLat(evt) {
    var point = map.getCoordinateFromPixel(evt.pixel);
    var lonLat = ol.proj.toLonLat(point);
    console.log(lonLat);  // note the ordering of the numbers
  }
  