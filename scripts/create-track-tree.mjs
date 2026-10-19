import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outputPaths = [
  path.join(root, "game-source", "assets", "MSKU-Track-Tree.glb"),
  path.join(root, "public", "game", "MSKU-Track-Tree.glb"),
];

const primitives = [];

function addTriangle(target, a, b, c) {
  const ab = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ac = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
  const normal = [
    ab[1] * ac[2] - ab[2] * ac[1],
    ab[2] * ac[0] - ab[0] * ac[2],
    ab[0] * ac[1] - ab[1] * ac[0],
  ];
  const length = Math.hypot(...normal) || 1;
  const unit = normal.map((value) => value / length);
  target.positions.push(...a, ...b, ...c);
  target.normals.push(...unit, ...unit, ...unit);
}

function createCone(radius, baseY, apexY, segments, material) {
  const primitive = { positions: [], normals: [], material };
  const center = [0, baseY, 0];
  const apex = [0, apexY, 0];
  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    const nextAngle = ((index + 1) / segments) * Math.PI * 2;
    const current = [Math.cos(angle) * radius, baseY, Math.sin(angle) * radius];
    const next = [Math.cos(nextAngle) * radius, baseY, Math.sin(nextAngle) * radius];
    addTriangle(primitive, current, next, apex);
    addTriangle(primitive, next, current, center);
  }
  primitives.push(primitive);
}

function createTrunk(radius, height, segments, material) {
  const primitive = { positions: [], normals: [], material };
  const bottomCenter = [0, 0, 0];
  const topCenter = [0, height, 0];
  for (let index = 0; index < segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    const nextAngle = ((index + 1) / segments) * Math.PI * 2;
    const bottom = [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
    const bottomNext = [Math.cos(nextAngle) * radius, 0, Math.sin(nextAngle) * radius];
    const top = [bottom[0], height, bottom[2]];
    const topNext = [bottomNext[0], height, bottomNext[2]];
    addTriangle(primitive, bottom, bottomNext, topNext);
    addTriangle(primitive, bottom, topNext, top);
    addTriangle(primitive, bottomNext, bottom, bottomCenter);
    addTriangle(primitive, top, topNext, topCenter);
  }
  primitives.push(primitive);
}

createTrunk(0.24, 1.85, 8, 0);
createCone(1.35, 1.05, 3.25, 10, 1);
createCone(1.12, 1.9, 4.05, 10, 1);
createCone(0.82, 2.8, 4.75, 10, 1);

const binaryParts = [];
const bufferViews = [];
const accessors = [];
const meshPrimitives = [];
let byteOffset = 0;

function pushBuffer(data, target) {
  const source = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
  const padded = Buffer.alloc(Math.ceil(source.length / 4) * 4);
  source.copy(padded);
  const viewIndex = bufferViews.length;
  bufferViews.push({ buffer: 0, byteOffset, byteLength: source.length, target });
  binaryParts.push(padded);
  byteOffset += padded.length;
  return viewIndex;
}

for (const primitive of primitives) {
  const positions = new Float32Array(primitive.positions);
  const normals = new Float32Array(primitive.normals);
  const positionView = pushBuffer(positions, 34962);
  const normalView = pushBuffer(normals, 34962);
  const points = primitive.positions.reduce((rows, value, index) => {
    const axis = index % 3;
    rows[axis].push(value);
    return rows;
  }, [[], [], []]);
  const positionAccessor = accessors.length;
  accessors.push({
    bufferView: positionView,
    componentType: 5126,
    count: positions.length / 3,
    type: "VEC3",
    min: points.map((axis) => Math.min(...axis)),
    max: points.map((axis) => Math.max(...axis)),
  });
  const normalAccessor = accessors.length;
  accessors.push({ bufferView: normalView, componentType: 5126, count: normals.length / 3, type: "VEC3" });
  meshPrimitives.push({
    attributes: { POSITION: positionAccessor, NORMAL: normalAccessor },
    material: primitive.material,
    mode: 4,
  });
}

const document = {
  asset: { generator: "MSKU Racing track environment generator", version: "2.0" },
  scene: 0,
  scenes: [{ nodes: [0] }],
  nodes: [{ mesh: 0, name: "TrackTree" }],
  meshes: [{ name: "TrackTree", primitives: meshPrimitives }],
  materials: [
    {
      name: "Bark",
      pbrMetallicRoughness: { baseColorFactor: [0.22, 0.09, 0.035, 1], metallicFactor: 0, roughnessFactor: 1 },
    },
    {
      name: "Foliage",
      pbrMetallicRoughness: { baseColorFactor: [0.06, 0.31, 0.12, 1], metallicFactor: 0, roughnessFactor: 0.95 },
    },
  ],
  accessors,
  bufferViews,
  buffers: [{ byteLength: byteOffset }],
};

const jsonSource = Buffer.from(JSON.stringify(document), "utf8");
const json = Buffer.alloc(Math.ceil(jsonSource.length / 4) * 4, 0x20);
jsonSource.copy(json);
const binary = Buffer.concat(binaryParts);
const totalLength = 12 + 8 + json.length + 8 + binary.length;
const glb = Buffer.alloc(totalLength);
glb.writeUInt32LE(0x46546c67, 0);
glb.writeUInt32LE(2, 4);
glb.writeUInt32LE(totalLength, 8);
glb.writeUInt32LE(json.length, 12);
glb.writeUInt32LE(0x4e4f534a, 16);
json.copy(glb, 20);
const binaryHeader = 20 + json.length;
glb.writeUInt32LE(binary.length, binaryHeader);
glb.writeUInt32LE(0x004e4942, binaryHeader + 4);
binary.copy(glb, binaryHeader + 8);

for (const outputPath of outputPaths) fs.writeFileSync(outputPath, glb);
console.log(`Created ${outputPaths.length} low-poly track tree models (${glb.length} bytes each).`);
