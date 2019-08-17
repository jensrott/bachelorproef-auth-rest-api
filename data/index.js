const express = require("express");
const router = express.Router();

let data = [
  {
    id: 1,
    title: "Raspberry Pi met Home Assistant",
    description:
      "Het brein van de demonstrator is een Raspberry Pi mini-computer met open-source Home Assistant software geïnstalleerd. Deze software laat toe om de ganse installatie te configureren en levert meteen ook een centrale gebruiksvriendelijke bedieningsmogelijkheid via het dashboard (na configuratie).",
    landing_image: "https://i.imgur.com/eLLHLUS.jpg",
    images: [
      {
        url: "https://i.imgur.com/AYFecLS.jpg",
        text: "Raspberry Pi met Z-wave dongle en relay board"
      }
    ],
    link: "https://www.home-assistant.io/hassio/"
  },
  {
    id: 2,
    title: "Niko demonstrator bord",
    description:
      "Het Niko demonstrator bord laat toe om de verschillende aspecten van lichtcontrole te demonstreren. Het bevat naast een plexi plattegrond de mogelijkheid om verschillende lichtpunten te bedraden met een relay board, de Raspberry Pi en een voeding. In dit bord zijn een aantal geschakelde lichten en Hue lampen gemonteerd. ",
    landing_image: "https://i.imgur.com/lzN17mf.jpg",
    images: [
      { url: "https://i.imgur.com/Yh1tx5J.jpg", text: "Zijkant" },
      { url: "https://i.imgur.com/9nXjVIX.jpg", text: "Achterkant" },
      { url: "https://i.imgur.com/F9FblwQ.jpg", text: "met LEDs" }
    ]
  },
  {
    id: 3,
    title: "8-relays board",
    description:
      "Het 8-relays board zorgt voor het schakelen van de lichtpunten. De relays worden aangestuurd door de GPIO's van de Raspberry Pi.",
    landing_image: "https://i.imgur.com/95FVM38.jpg",
    images: [{ url: "https://i.imgur.com/RkjVCuX.jpg", text: "8-Relay board" }],
    link:
      "https://www.amazon.com/SainSmart-101-70-103-16-Channel-Relay-Module/dp/B0057OC66U"
  },
  {
    id: 4,
    title: "Hue lichtcontrole",
    description:
      "Philips Hue lichtcontrole is één van de commercieel beschikbare slimme lamp systemen die je in een woning kan gebruiken. Philips Hue maakt gebruik van het draadloze Zigbee protocol",
    landing_image: "https://i.imgur.com/CBa1jcD.jpg",
    images: [
      { url: "https://i.imgur.com/cgR7wuj.jpg", text: "Hue lampen" },
      { url: "https://i.imgur.com/0tWmfdb.jpg", text: "Hue dimmer" },
      { url: "https://i.imgur.com/TY1Oe8R.jpg", text: "Hue bewegingsdetector" }
    ],
    link:
      "https://www.amazon.com/stores/PhilipsHue/PhilipsHue/page/EF2AA00C-FB75-49B9-9E42-34192D1A8227"
  },
  {
    id: 5,
    title: "Hikvision IP-camera",
    description:
      "De IP-camera is gericht naar het demonstrator bord. Bij controle acties kan men op die manier het effect live observeren.",
    landing_image: "https://i.imgur.com/jaLThqi.jpg",
    images: [
      { url: "https://i.imgur.com/FbKS4UT.jpg", text: "" },
      { url: "https://i.imgur.com/nVRr93e.jpg", text: "" },
      { url: "https://i.imgur.com/jaLThqi.jpg", text: "" }
    ],
    link:
      "https://www.hikvision.com/it/Prodotti/TelecamereIP/EasyIP1-0-plus/Turret/2MP/DS-2CD1323G0-I"
  },
  {
    id: 6,
    title: "Smart Phone Controle Apps",
    description:
      "De demonstrator kan men eenvoudig besturen via een smart phone app. Een voorbeeld is Ariela, een controle app voor Android. Voor Apple apparaten is dit Home Assistant Companion. Daarnaast is ook een integratie voorzien met de Google Assistant app (spraakcontrole).",
    landing_image: "https://i.imgur.com/zwcX4yA.jpg",
    images: [
      {
        url: "https://i.imgur.com/O4TvIlc.jpg",
        text: "Google Assistant Android"
      },
      { url: "https://i.imgur.com/4PbFXQc.jpg", text: "Controle dashboard" },
      { url: "https://i.imgur.com/VtLkvag.jpg", text: "Google Assistant iOS" }
    ],
    link: "http://ariela.surodev.com/"
  },
  {
    id: 7,
    title: "HA controle dashboard",
    description:
      "Het Home Assistant controle dashboard biedt een gebruiksvriendelijke, personalizeerbare interface aan voor de eindgebruiker. Dit dashboard kan zowel lokaal als op afstand opgeroepen worden via de web browser.",
    landing_image: "https://i.imgur.com/489GGt0.jpg",
    /* For the dashboard we use movies to demonstrate */
    movies: [
      {
        url: "https://www.youtube.com/watch?v=g5bNMZog82c&feature=youtu.be",
        text: "Lichtcontrole"
      },
      {
        url: "https://www.youtube.com/watch?v=ICBa4EuNLEc&feature=youtu.be",
        text: "Sensor Monitoring"
      },
      {
        url: "https://www.youtube.com/watch?v=voGlutpmacs&feature=youtu.be",
        text: "Systeem Services"
      }
    ],
    link: "https://www.home-assistant.io/"
  },
  {
    id: 8,
    title: "Z-wave Netwerk",
    description:
      "Via het Z-wave draadloos netwerk kan men op zeer flexibele wijze slimme apparaten van verschillende leveranciers toevoegen aan een installatie. Voorbeelden zijn sensoren, lichten, controle knoppen",
    landing_image: "https://i.imgur.com/RF8MJjy.jpg",
    images: [
      { url: "https://i.imgur.com/YAH4GBj.jpg", text: "Multi Sensor" },
      { url: "https://i.imgur.com/1aBg6zx.jpg", text: "Deur Sensor" },
      { url: "https://i.imgur.com/v2lUw8h.jpg", text: "Water Sensor" }
    ],
    link:
      "https://www.amazon.com/Aeotec-Multisensor-temperature-humidity-vibration/dp/B0151Z8ZQY"
  },
  {
    id: 9,
    title: "Sonos/Bose",
    description:
      "Met de Sonos/Bose slimme luidsprekers kan je via het WiFi netwerk naar muziek luisteren.",
    landing_image: "https://i.imgur.com/lJgyeGI.jpg",
    images: [
      { url: "https://i.imgur.com/Nx62gT2.jpg", text: "Sonos luidspeker" },
      { url: "https://i.imgur.com/2rKydSL.jpg", text: "Bose luidspreker" },
      { url: "https://i.imgur.com/hhBWIom.jpg", text: "Bose luidspeker" }
    ],
    link:
      "https://www.coolblue.be/nl/product/386826/sonos-play-1-zwart.html?cmt=c_a,cp_2070842088,a_76054454106,t_aud-766811849418:pla-593399754360,n_g,d_c&gclid=Cj0KCQjwy97qBRDoARIsAITONTJYuNmPrm_WlLgvDEnfIKBXMObFJeMDmM8Qiymc0X2KSa-u_oxdg-MaAhhnEALw_wcB"
  }
];

// @route: GET http://localhost:3000/data
// @desc: Get the components of the demonstrator
// @access: Private
router.get("/", (req, res) => {
  res.json(data);
});

// @route: GET http://localhost:3000/data/id
// @desc: Get a single components of the demonstrator
// @access: Private
router.get("/:id", (req, res) => {
  const id = req.params.id;
  res.json(data[id - 1]);
});

module.exports = router;
