import { get } from "https://jscroot.github.io/api/croot.js";
import { _urlGeoJson } from "./template/template.js";
import { _MakeGeojsonFromAPI, responseData, AddLayerToMAP } from "./controller/controller.js";
import {map} from './config/configpeta.js';
import {onClosePopupClick,onDeleteMarkerClick,onSubmitMarkerClick,onMapClick,onMapPointerMove,disposePopover} from './controller/popup.js';
import {onClick} from 'https://jscroot.github.io/element/croot.js';
import {getAllCoordinates} from './controller/cog.js';


onClick('popup-closer',onClosePopupClick);
onClick('insertmarkerbutton',onSubmitMarkerClick);
onClick('hapusbutton',onDeleteMarkerClick);
onClick('hitungcogbutton',getAllCoordinates);

map.on('click', onMapClick);
map.on('pointermove', onMapPointerMove);
map.on('movestart', disposePopover);
    
get(_urlGeoJson,data => {
    responseData(data)
    let link = _MakeGeojsonFromAPI(data)
    // console.log(link)
    console.log(_urlGeoJson)
    AddLayerToMAP(link)
}); 
