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
    }),
  });

  // Configurar camadas de mapa
  const layers = [
    new TileLayer({
      source: new OSM(),
      visible: true,
      title: "OSMStandard",
    }),
    new TileLayer({
      source: new OSM({
        url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
      }),
      visible: false,
      title: "OSMHumanitarian",
    }),
    new TileLayer({
      source: new XYZ({
        url: "http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg",
        attributions: "For Terrain: Map tiles by <a href='http://stamen.com'>Stamen Design</a> under CC BY 4.0. Data by OpenStreetMap, under ODbL.",
      }),
      visible: false,
      title: "StamenTerrain",
    }),
  ];

  const baseLayerGroup = new LayerGroup({
    layers: layers,
  });

  map.addLayer(baseLayerGroup);

  const dangerSource = new VectorSource();
  const dangerLayer = new VectorLayer({
    source: dangerSource,
  });
  map.addLayer(dangerLayer);

  // Função para adicionar um ícone de perigo no mapa
  function addDangerIcon(coordinates) {
    const iconFeature = new Feature({
      geometry: new Point(coordinates),
    });

    const iconStyle = new Style({
      image: new Icon({
        src: "../images/danger.png",
        scale: 0.1,
      }),
    });

    iconFeature.setStyle(iconStyle);
    dangerSource.addFeature(iconFeature);
    map.getView().setCenter(coordinates);
  }

  // Adicionar um evento de clique no mapa para relatar uma reclamação
  map.on("click", function (event) {
    let coordernada = event.coordinate;

    let reportAlert = document.getElementById("confirmar-local");

    reportAlert.style.display = "block";
    addDangerIcon(event.coordinate);

    document.getElementById("button-check1").addEventListener("click", function (event) {
      event.preventDefault();

      let sidebar = document.getElementById("sidebar");

      reportAlert.style.display = "none";
      document.getElementById("sidebar").style.width = "512px";
      sidebar.style.display = "block";

      if (reportAlert) {
        document.getElementById("closeSidebar").addEventListener("click", function () {
          document.getElementById("sidebar").style.width = "0"; // Ocultar a barra lateral
          document.getElementById("openSidebar").style.display = "flex";
        });

        // Envia os dados como JSON para o servidor
        document.getElementById("meuFormulario").addEventListener("submit", function (event) {
          event.preventDefault();
          let mensagemSucesso = document.getElementById("mensagem-sucesso");

          let formData = {
            nome: document.getElementById("nome").value,
            cep: document.getElementById("cep").value,
            endereco: document.getElementById("endereco").value,
            estado: document.getElementById("estado").value,
            cidade: document.getElementById("cidade").value,
            bairro: document.getElementById("bairro").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            tipo: document.getElementById("tipo").value,
            mensagem: document.getElementById("mensagem").value,
            posicao: coordernada,
          };

          fetch("http://localhost:3000/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }).then((response) => {
            if (response.ok) {
              mensagemSucesso.style.display = "block";
              sidebar.style.display = "none";
              setTimeout(function () {
                mensagemSucesso.style.display = "none";
              }, 1500);
              return response.json();
            } else {
              throw new Error(`Erro ao enviar o formulário. Status do erro: ${response.status}`);
            }
          });
        });
      }
    });
  });

  // Adicionar um evento de clique para alternar entre as camadas do mapa
  const toggleLayerButton = document.getElementById("toggleLayerButton");
  let currentLayerIndex = 0;

  toggleLayerButton.addEventListener("click", function () {
    layers[currentLayerIndex].setVisible(false);

    currentLayerIndex = (currentLayerIndex + 1) % layers.length;

    layers[currentLayerIndex].setVisible(true);
  });
}

// Função chamada quando a janela é carregada
window.onload = function () {
  init();

  document.getElementById("sidebar").style.display = "flex";
  document.getElementById("logo1").style.display = "block";
  document.getElementById("home-barra-midias-sociais-not").style.display = "flex";
  document.getElementById("toggleLayerButton").style.display = "block";
};
