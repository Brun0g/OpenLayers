import "./style.css";
import { Map, View } from "ol";
import OSM from "ol/source/OSM";
import { Tile as TileLayer, Group as LayerGroup } from "ol/layer";
import { XYZ } from "ol/source";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import { Point } from "ol/geom";
import { Icon, Style } from "ol/style";

function init() {
  let map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    view: new View({
      center: [-5108152.4828673, -2654682.872722094],
      zoom: 12,
      maxZoom: 20,
      minZoom: 10,
      // rotation: 0.5,
    }),
  });

  const openStreetMapStandard = new TileLayer({
    source: new OSM(),
    visible: false,
    title: "OSMStandard",
  });
  const openStreetMapHumanitarian = new TileLayer({
    source: new OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "OSMHumanitarian",
  });

  const stamenTerrain = new TileLayer({
    source: new XYZ({
      url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
      attributions: "For Toner and Terrain: Map tiles by <a href='http://stamen.com'>Stamen Design</a> under CC BY 4.0. Data by OpenStreetMap, under ODbL.",
    }),
    visible: false,
    title: "StamenTerrain",
  });

  // Create a layer group for base layers
  const baseLayerGroup = new LayerGroup({
    layers: [openStreetMapStandard, openStreetMapHumanitarian, stamenTerrain],
  });

  // Add the base layer group to the map
  map.addLayer(baseLayerGroup);
  document.getElementById("openSidebar").addEventListener("click", function () {
    document.getElementById("sidebar").style.width = "250px";
  });

  // Crie uma camada vetorial para os ícones de perigo
  const dangerSource = new VectorSource();
  const dangerLayer = new VectorLayer({
    source: dangerSource,
  });
  map.addLayer(dangerLayer);

  function addDangerIcon(coordinates) {
    const iconFeature = new Feature({
      geometry: new Point(coordinates),
    });

    const iconStyle = new Style({
      image: new Icon({
        src: "danger.png",
        scale: 0.1,
      }),
    });

    iconFeature.setStyle(iconStyle);
    dangerSource.addFeature(iconFeature);
  }

  map.on("click", function (event) {
    addDangerIcon(event.coordinate);
    console.log(event.coordinate);
  });

  document.getElementById("closeSidebar").addEventListener("click", function () {
    document.getElementById("sidebar").style.width = "0"; // Oculta o sidebar
  });

  document.getElementById("openSidebar").addEventListener("click", function () {
    document.getElementById("sidebar").style.width = "250px"; // Ou a largura desejada
  });
}

init();
