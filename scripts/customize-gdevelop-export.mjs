import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const gameDirectory = path.join(root, "public", "game");
const sourceProjectPath = path.join(root, "game-source", "game.json");
const formulaModelPaths = [
  path.join(gameDirectory, "MSKU-Formula-Student.glb"),
  path.join(root, "game-source", "assets", "MSKU-Formula-Student.glb"),
];
const environmentAssets = [
  "AsphaltTrack.png",
  "TrackGrass.png",
  "TrackBarrier.png",
  "MSKU-Track-Tree.glb",
];

const treePlacements = [
  [-1260, -110, 78], [-760, -105, 70], [-250, -100, 82], [280, -115, 74],
  [820, -105, 86], [1360, -115, 76], [1900, -100, 82], [2450, -110, 72],
  [-1260, 2940, 74], [-720, 2950, 84], [-160, 2940, 72], [430, 2950, 82],
  [980, 2940, 76], [1540, 2950, 86], [2080, 2940, 72], [2520, 2950, 80],
  [-1560, 360, 76], [-1550, 920, 84], [-1560, 1490, 72], [-1550, 2070, 82], [-1560, 2640, 76],
  [2780, 360, 82], [2790, 920, 74], [2780, 1490, 86], [2790, 2070, 76], [2780, 2640, 82],
  [-760, 1050, 70], [-760, 1810, 78], [1680, 1050, 74], [1680, 1810, 82],
  [80, 1220, 68], [560, 1740, 76], [1120, 1200, 72],
];

const colors = {
  navy: [37 / 255, 43 / 255, 135 / 255, 1],
  burgundy: [167 / 255, 12 / 255, 48 / 255, 1],
  white: [245 / 255, 244 / 255, 239 / 255, 1],
  dark: [8 / 255, 13 / 255, 26 / 255, 1],
};

function brandFormulaModel(filePath) {
  const source = fs.readFileSync(filePath);
  if (source.readUInt32LE(0) !== 0x46546c67) throw new Error(`${filePath} is not a GLB file.`);

  const chunks = [];
  let offset = 12;
  while (offset < source.length) {
    const length = source.readUInt32LE(offset);
    const type = source.readUInt32LE(offset + 4);
    chunks.push({ type, data: source.subarray(offset + 8, offset + 8 + length) });
    offset += 8 + length;
  }

  const jsonChunk = chunks.find((chunk) => chunk.type === 0x4e4f534a);
  if (!jsonChunk) throw new Error(`${filePath} has no JSON chunk.`);
  const document = JSON.parse(jsonChunk.data.toString("utf8").replace(/[\u0000\s]+$/u, ""));

  const palette = {
    paint: colors.burgundy,
    trim: colors.dark,
    white: colors.navy,
    accent: colors.white,
    glass: [17 / 255, 29 / 255, 55 / 255, 1],
  };

  for (const material of document.materials ?? []) {
    const color = palette[material.name];
    if (!color) continue;
    material.pbrMetallicRoughness ??= {};
    material.pbrMetallicRoughness.baseColorFactor = color;
  }

  const json = Buffer.from(JSON.stringify(document), "utf8");
  const paddedJson = Buffer.alloc(Math.ceil(json.length / 4) * 4, 0x20);
  json.copy(paddedJson);
  const rebuiltChunks = chunks.map((chunk) => chunk === jsonChunk ? { ...chunk, data: paddedJson } : chunk);
  const totalLength = 12 + rebuiltChunks.reduce((sum, chunk) => sum + 8 + chunk.data.length, 0);
  const output = Buffer.alloc(totalLength);
  output.writeUInt32LE(0x46546c67, 0);
  output.writeUInt32LE(source.readUInt32LE(4), 4);
  output.writeUInt32LE(totalLength, 8);

  offset = 12;
  for (const chunk of rebuiltChunks) {
    output.writeUInt32LE(chunk.data.length, offset);
    output.writeUInt32LE(chunk.type, offset + 4);
    chunk.data.copy(output, offset + 8);
    offset += 8 + chunk.data.length;
  }

  fs.writeFileSync(filePath, output);
}

function syncEnvironmentAssets() {
  const sourceDirectory = path.join(root, "game-source", "assets");
  for (const asset of environmentAssets) {
    fs.copyFileSync(path.join(sourceDirectory, asset), path.join(gameDirectory, asset));
  }
}

function ensureResource(project, { name, file, kind }) {
  const resources = project.resources.resources;
  let resource = resources.find((candidate) => candidate.name === name || path.basename(candidate.file.replaceAll("\\", "/")) === path.basename(file));
  if (!resource) {
    resource = { file, kind, metadata: "", name, userAdded: true };
    resources.push(resource);
  }
  resource.name = name;
  resource.file = file;
  resource.kind = kind;
  if (kind === "image") resource.smoothed = true;
  return resource;
}

function setCubeTexture(object, resourceName) {
  for (const face of ["front", "back", "left", "right", "top", "bottom"]) {
    object.content[`${face}FaceResourceName`] = resourceName;
    object.content[`${face}FaceResourceRepeat`] = true;
  }
}

function ensureTrackTrees(layout, treeResourceName) {
  let treeObject = layout.objects.find((object) => object.name === "TrackTree");
  if (!treeObject) {
    const trafficCone = layout.objects.find((object) => object.name === "TrafficCone");
    if (!trafficCone) throw new Error("TrafficCone template object was not found.");
    treeObject = structuredClone(trafficCone);
    treeObject.assetStoreId = "";
    treeObject.name = "TrackTree";
    treeObject.persistentUuid = "a826b9de-60df-4b03-ae8c-8f3f74ec6641";
    treeObject.content = {
      ...treeObject.content,
      width: 72,
      height: 72,
      depth: 126,
      modelResourceName: treeResourceName,
      rotationX: 90,
      rotationY: 0,
      rotationZ: 0,
      crossfadeDuration: 0,
      isCastingShadow: true,
      isReceivingShadow: true,
    };
    layout.objects.push(treeObject);
  } else {
    treeObject.content.modelResourceName = treeResourceName;
  }
  treeObject.behaviors = treeObject.behaviors.filter((behavior) => behavior.name !== "Physics3D");

  if (!layout.instances.some((instance) => instance.name === "TrackTree")) {
    treePlacements.forEach(([x, y, size], index) => {
      layout.instances.push({
        angle: (index * 37) % 360,
        customSize: true,
        depth: Math.round(size * 1.75),
        height: size,
        keepRatio: true,
        layer: "",
        locked: true,
        name: "TrackTree",
        persistentUuid: `aa51b5cc-18e7-43a1-9a${String(index).padStart(2, "0")}-b8955e6d${String(index).padStart(4, "0")}`,
        width: size,
        x,
        y,
        zOrder: 6,
        numberProperties: [],
        stringProperties: [],
        initialVariables: [],
      });
    });
  }
}

function brandProject(project, exported) {
  project.properties.name = "MSKU Racing: Garajdan Piste";
  project.properties.packageName = "com.mskuracing.garajdanpiste";
  project.properties.description = "MSKU Racing Formula Student lap challenge";
  project.properties.author = "MSKU Racing";
  project.properties.loadingScreen.backgroundColor = Number.parseInt("080D1A", 16);
  project.properties.loadingScreen.progressBarColor = Number.parseInt("A70C30", 16);
  project.properties.loadingScreen.showGDevelopSplash = false;
  project.properties.loadingScreen.showProgressBar = false;
  project.properties.loadingScreen.minDuration = 0.2;
  project.properties.watermark = {
    ...(project.properties.watermark ?? {}),
    showWatermark: false,
  };

  const oldResourceName = "assets\\Orange - Sedan Sports.glb";
  const newResourceName = "assets\\MSKU-Formula-Student.glb";
  const asphaltResourceName = "AsphaltTrack.png";
  const grassResourceName = "TrackGrass.png";
  const barrierResourceName = "TrackBarrier.png";
  const treeResourceName = "MSKU-Track-Tree.glb";
  const modelResource = project.resources.resources.find((resource) => resource.name === oldResourceName || resource.name === newResourceName);
  if (!modelResource) throw new Error("Player car resource was not found.");
  modelResource.name = newResourceName;
  modelResource.file = exported ? "MSKU-Formula-Student.glb" : "assets/MSKU-Formula-Student.glb";
  modelResource.origin = {
    identifier: "https://cdn.3dassets.dev/assets/15252/v1/model.glb",
    name: "Current car high-downforce wing — CC0 1.0",
  };
  ensureResource(project, { name: asphaltResourceName, file: exported ? "AsphaltTrack.png" : "assets/AsphaltTrack.png", kind: "image" });
  ensureResource(project, { name: grassResourceName, file: exported ? "TrackGrass.png" : "assets/TrackGrass.png", kind: "image" });
  ensureResource(project, { name: barrierResourceName, file: exported ? "TrackBarrier.png" : "assets/TrackBarrier.png", kind: "image" });
  ensureResource(project, { name: treeResourceName, file: exported ? "MSKU-Track-Tree.glb" : "assets/MSKU-Track-Tree.glb", kind: "model3D" });

  for (const layout of project.layouts ?? []) {
    layout.r = 8;
    layout.g = 13;
    layout.b = 26;
    ensureTrackTrees(layout, treeResourceName);

    for (const object of layout.objects ?? []) {
      if (object.name === "PlayerCar") {
        object.content.modelResourceName = newResourceName;
        object.content.rotationZ = 90;

        const physics = object.behaviors.find((behavior) => behavior.name === "Physics3D");
        if (physics) {
          physics.shapeDimensionC = 18;
          physics.shapeOffsetZ = 3;
          physics.friction = 6;
          physics.linearDamping = 0.12;
          physics.angularDamping = 0.65;
        }

        const carPhysics = object.behaviors.find((behavior) => behavior.name === "PhysicsCar3D");
        if (carPhysics) {
          carPhysics.wheelOffsetZ = -3;
          carPhysics.steerAngleMax = 30;
          carPhysics.beginningSteerSpeed = 58;
          carPhysics.endSteerSpeed = 14;
          carPhysics.engineTorqueMax = 4800;
          carPhysics.engineSpeedMax = 5600;
          carPhysics.pitchRollAngleMax = 38;
        }
      }
      if (object.name === "LapText") {
        object.string = "SÜRE: 0.0\nTUR: 0";
        object.color = { r: 245, g: 244, b: 239 };
        object.content.text = "SÜRE: 0.0\nTUR: 0";
        object.content.color = "245;244;239";
        object.content.outlineColor = "8;13;26";
      }
      if (object.name === "Road_3D") {
        setCubeTexture(object, asphaltResourceName);
        object.content.tint = "225;225;225";
        object.content.isCastingShadow = false;
      }
      if (object.name === "Grass_3D") {
        setCubeTexture(object, grassResourceName);
        object.content.tint = "205;220;195";
      }
      if (object.name === "Walls_3D") {
        setCubeTexture(object, barrierResourceName);
        object.content.tint = "245;244;239";
      }
      if (object.name === "FinishLine_3D") object.content.tint = "245;244;239";
    }

    if (Array.isArray(layout.usedResources)) {
      for (const resource of layout.usedResources) {
        if (resource.name === oldResourceName) resource.name = newResourceName;
      }
      for (const name of [asphaltResourceName, grassResourceName, barrierResourceName, treeResourceName]) {
        if (!layout.usedResources.some((resource) => resource.name === name)) layout.usedResources.push({ name });
      }
    }
  }

  return project;
}

function updateSourceProject() {
  const project = JSON.parse(fs.readFileSync(sourceProjectPath, "utf8"));
  fs.writeFileSync(sourceProjectPath, `${JSON.stringify(brandProject(project, false), null, 2)}\n`);
}

function updateExportedProject() {
  const dataPath = path.join(gameDirectory, "data.js");
  const source = fs.readFileSync(dataPath, "utf8");
  const prefix = "gdjs.projectData = ";
  const optionsMarker = ";\ngdjs.runtimeGameOptions = ";
  const optionsIndex = source.indexOf(optionsMarker);
  if (!source.startsWith(prefix) || optionsIndex < 0) throw new Error("Unexpected GDevelop data.js format.");

  const project = JSON.parse(source.slice(prefix.length, optionsIndex));
  const brandedProject = brandProject(project, true);
  fs.writeFileSync(dataPath, `${prefix}${JSON.stringify(brandedProject)}${source.slice(optionsIndex)}`);
}

function updateLapBridge() {
  const codePath = path.join(gameDirectory, "code0.js");
  let source = fs.readFileSync(codePath, "utf8")
    .replaceAll('"Time: "', '"SÜRE: "')
    .replaceAll('"\\nLap: "', '"\\nTUR: "');

  if (!source.includes("msku-racing:lap-complete")) {
    const timerReset = `{for(var i = 0, len = gdjs.Game_32SceneCode.GDPlayerCarObjects1.length ;i < len;++i) {\n    gdjs.Game_32SceneCode.GDPlayerCarObjects1[i].resetTimer("LapTimer");`;
    const bridge = `if (gdjs.Game_32SceneCode.GDPlayerCarObjects1.length > 0) {\n  const completedLapTime = gdjs.Game_32SceneCode.GDPlayerCarObjects1[0].getTimerElapsedTimeInSeconds("LapTimer");\n  if (completedLapTime > 0.5) {\n    window.parent.postMessage({ type: "msku-racing:lap-complete", time: completedLapTime }, window.location.origin);\n  }\n}\n${timerReset}`;
    if (!source.includes(timerReset)) throw new Error("Lap timer reset block was not found in code0.js.");
    source = source.replace(timerReset, bridge);
  }

  if (!source.includes("msku-racing:desktop-controls")) {
    const sceneStart = `if (isConditionTrue_0) {\ngdjs.copyArray(runtimeScene.getObjects("CheckpointArrow"), gdjs.Game_32SceneCode.GDCheckpointArrowObjects1);`;
    const desktopControls = `if (isConditionTrue_0) {\n// msku-racing:desktop-controls\nif (!gdjs.evtTools.common.isMobile()) {\n  gdjs.evtTools.camera.hideLayer(runtimeScene, "MobileControls");\n}\ngdjs.copyArray(runtimeScene.getObjects("CheckpointArrow"), gdjs.Game_32SceneCode.GDCheckpointArrowObjects1);`;
    if (!source.includes(sceneStart)) throw new Error("Scene start block was not found in code0.js.");
    source = source.replace(sceneStart, desktopControls);
  }

  if (!source.includes("msku-racing:livery-selection")) {
    const playerObjectsCopy = `gdjs.copyArray(runtimeScene.getObjects("PlayerCar"), gdjs.Game_32SceneCode.GDPlayerCarObjects1);`;
    const liveryBridge = `${playerObjectsCopy}\n// msku-racing:livery-selection\nconst selectedLivery = new URLSearchParams(window.location.search).get("livery") || "burgundy";\nconst liveryPalettes = {\n  burgundy: { paint: "#A70C30", trim: "#080D1A", white: "#252B87", accent: "#F5F4EF" },\n  navy: { paint: "#252B87", trim: "#080D1A", white: "#A70C30", accent: "#F5F4EF" },\n  white: { paint: "#F5F4EF", trim: "#080D1A", white: "#A70C30", accent: "#252B87" },\n};\nconst activeLivery = liveryPalettes[selectedLivery] || liveryPalettes.burgundy;\nfor (const playerCar of gdjs.Game_32SceneCode.GDPlayerCarObjects1) {\n  const modelRoot = playerCar.getRenderer?.().get3DRendererObject?.();\n  modelRoot?.traverse((node) => {\n    const materials = Array.isArray(node.material) ? node.material : node.material ? [node.material] : [];\n    for (const material of materials) {\n      const materialColor = activeLivery[material.name];\n      if (materialColor && material.color) {\n        material.color.set(materialColor);\n        material.needsUpdate = true;\n      }\n    }\n  });\n}`;
    if (!source.includes(playerObjectsCopy)) throw new Error("Player car scene-start block was not found in code0.js.");
    source = source.replace(playerObjectsCopy, liveryBridge);
  }

  if (!source.includes("msku-racing:game-ready")) {
    const desktopControlsMarker = `// msku-racing:desktop-controls\n`;
    const gameReadyBridge = `// msku-racing:desktop-controls\n// msku-racing:game-ready\nconst mskuLoadingScreen = document.getElementById("msku-game-loading");\nif (mskuLoadingScreen) {\n  mskuLoadingScreen.classList.add("is-ready");\n  window.setTimeout(() => mskuLoadingScreen.remove(), 650);\n}\nwindow.parent.postMessage({ type: "msku-racing:game-ready" }, window.location.origin);\n`;
    if (!source.includes(desktopControlsMarker)) throw new Error("Desktop controls marker was not found in code0.js.");
    source = source.replace(desktopControlsMarker, gameReadyBridge);
  }

  fs.writeFileSync(codePath, source);
}

function updateShell() {
  const indexPath = path.join(gameDirectory, "index.html");
  const loadingStyle = `    <style id="msku-game-loading-style">
      #msku-game-loading { position: fixed; inset: 0; z-index: 999999; display: grid; place-items: center; overflow: hidden; color: #f5f4ef; background: radial-gradient(circle at 50% 24%, rgba(37,43,135,.48), transparent 34%), linear-gradient(145deg, #080d1a, #03060d 72%); font-family: Arial, sans-serif; transition: opacity .55s ease, visibility .55s ease; }
      #msku-game-loading::before { content: ""; position: absolute; inset: 0; opacity: .13; background-image: linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px); background-size: 42px 42px; mask-image: linear-gradient(to bottom, black, transparent 76%); }
      #msku-game-loading::after { content: ""; position: absolute; width: min(68vw, 760px); aspect-ratio: 1; border: 1px solid rgba(160,0,38,.22); border-radius: 50%; box-shadow: 0 0 0 72px rgba(37,43,135,.05), 0 0 0 144px rgba(37,43,135,.025); animation: msku-orbit 3.6s ease-in-out infinite; }
      #msku-game-loading.is-ready { opacity: 0; visibility: hidden; }
      .msku-game-loading-inner { position: relative; z-index: 1; width: min(82vw, 430px); text-align: center; }
      .msku-game-loading-logo { display: block; width: min(34vw, 148px); height: auto; margin: 0 auto 28px; filter: drop-shadow(0 18px 36px rgba(0,0,0,.38)); }
      .msku-game-loading-kicker { margin: 0 0 12px; color: rgba(245,244,239,.42); font-size: 9px; font-weight: 700; letter-spacing: .28em; text-transform: uppercase; }
      .msku-game-loading-title { margin: 0; font-size: clamp(28px, 6vw, 52px); font-weight: 800; line-height: .9; letter-spacing: -.045em; text-transform: uppercase; }
      .msku-game-loading-track { position: relative; height: 3px; margin-top: 30px; overflow: hidden; background: rgba(245,244,239,.12); }
      .msku-game-loading-track span { position: absolute; inset-block: 0; left: -42%; width: 42%; background: #a00026; box-shadow: 0 0 22px rgba(160,0,38,.82); animation: msku-load 1.35s cubic-bezier(.7,0,.3,1) infinite; }
      @keyframes msku-load { to { left: 100%; } }
      @keyframes msku-orbit { 50% { transform: scale(1.04); opacity: .72; } }
      @media (prefers-reduced-motion: reduce) { #msku-game-loading::after, .msku-game-loading-track span { animation-duration: 4s; } }
    </style>`;
  const loadingMarkup = `    <!-- msku-racing:loading-screen -->
    <div id="msku-game-loading" role="status" aria-live="polite">
      <div class="msku-game-loading-inner">
        <img class="msku-game-loading-logo" src="/images/msku-racing-logo-v2.png" alt="MSKU Racing" />
        <p class="msku-game-loading-kicker">Yarış oturumu hazırlanıyor</p>
        <h1 class="msku-game-loading-title">Garajdan piste</h1>
        <div class="msku-game-loading-track" aria-hidden="true"><span></span></div>
      </div>
    </div>
    <!-- /msku-racing:loading-screen -->`;
  let html = fs.readFileSync(indexPath, "utf8")
    .replace(/\s*<style id="msku-game-loading-style">[\s\S]*?<\/style>/u, "")
    .replace(/\s*<!-- msku-racing:loading-screen -->[\s\S]*?<!-- \/msku-racing:loading-screen -->/u, "")
    .replace(/<html(?:\s+lang="[^"]*")?>/u, '<html lang="tr">')
    .replace(/\s*<title>[^<]*<\/title>/gu, "")
    .replace(/\s*<base\s+href="\/game\/"\s*\/?>/gu, "")
    .replace("<head>", '<head>\n    <base href="/game/">\n    <title>MSKU Racing — Garajdan Piste</title>')
    .replace(/\s*<\/head>/u, `\n${loadingStyle}\n  </head>`)
    .replace(/<meta name="theme-color" content="[^"]*" \/>/u, '<meta name="theme-color" content="#080D1A" />')
    .replace("background-color: #000000;", "background: radial-gradient(circle at 50% 20%, #252b87 0%, #080d1a 42%, #03060d 100%);")
    .replace("<body>", `<body>\n${loadingMarkup}`);
  fs.writeFileSync(indexPath, html);

  const manifestPath = path.join(gameDirectory, "manifest.webmanifest");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  manifest.name = "MSKU Racing — Garajdan Piste";
  manifest.short_name = "MSKU Racing";
  manifest.background_color = "#080D1A";
  manifest.theme_color = "#A70C30";
  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
}

syncEnvironmentAssets();
for (const modelPath of formulaModelPaths) brandFormulaModel(modelPath);
updateSourceProject();
updateExportedProject();
updateLapBridge();
updateShell();

console.log("MSKU Racing GDevelop customization complete.");
