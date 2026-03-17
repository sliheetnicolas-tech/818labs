/**
 * 818 Labs — Product Image Generator
 * Generates SVG product images matching the reference photo:
 * Clear glass vial, silver crimp cap, gold flip-off cap, dark background,
 * gold/beige label with 818 LABS branding
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, '..', 'images', 'products');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Product data - id, name, subtitle/dosage, category
const PRODUCTS = [
  { id: "glp3-rt", name: "GLP-3 RT", dose: "10mg-60mg", cat: "peptides" },
  { id: "glow-70mg", name: "GLOW", dose: "70mg", cat: "peptides" },
  { id: "cjc-1295-ipamorelin", name: "CJC-1295 +\nIPAMORELIN", dose: "5MG/5MG", cat: "peptides" },
  { id: "bpc-157", name: "BPC-157", dose: "5mg-10mg", cat: "peptides" },
  { id: "cjc-1295-no-dac", name: "CJC-1295\nno DAC", dose: "5MG", cat: "peptides" },
  { id: "cjc-w-dac", name: "CJC-1295\nw/ DAC", dose: "5MG", cat: "peptides" },
  { id: "klow-80mg", name: "KLOW", dose: "80MG", cat: "peptides" },
  { id: "wolverine-10mg", name: "WOLVERINE", dose: "10MG", cat: "peptides" },
  { id: "tb500-10mg", name: "TB-500", dose: "10MG", cat: "peptides" },
  { id: "selank-5mg", name: "SELANK", dose: "5MG", cat: "peptides" },
  { id: "semax", name: "SEMAX", dose: "5mg-10mg", cat: "peptides" },
  { id: "sermorelin-5mg", name: "SERMORELIN", dose: "5MG", cat: "peptides" },
  { id: "dsip-5mg", name: "DSIP", dose: "5MG", cat: "peptides" },
  { id: "epithalon-10mg", name: "EPITHALON", dose: "10MG", cat: "peptides" },
  { id: "kisspeptin-10mg", name: "KISSPEPTIN", dose: "10MG", cat: "peptides" },
  { id: "ghk-cu", name: "GHK-Cu", dose: "50mg-100mg", cat: "peptides" },
  { id: "ipamorelin-10mg", name: "IPAMORELIN", dose: "10MG", cat: "peptides" },
  { id: "mt2-10mg", name: "MELANOTAN II", dose: "10MG", cat: "peptides" },
  { id: "mots-c-10mg", name: "MOTS-c", dose: "10MG", cat: "peptides" },
  { id: "nad-500mg", name: "NAD+", dose: "500MG", cat: "peptides" },
  { id: "aod-9604-5mg", name: "AOD 9604", dose: "5MG", cat: "peptides" },
  { id: "cagrilintide-10mg", name: "CAGRILINTIDE", dose: "10MG", cat: "peptides" },
  { id: "tesamorelin-10mg", name: "TESAMORELIN", dose: "10MG", cat: "peptides" },
  { id: "glp2-tz-10mg", name: "GLP2-TZ\nTIRZEPATIDE", dose: "10MG", cat: "peptides" },
  { id: "igf1-lr3-1mg", name: "IGF1-LR3", dose: "1MG", cat: "peptides" },
  { id: "semaglutide-10mg", name: "SEMAGLUTIDE", dose: "10MG", cat: "peptides" },
  { id: "retatrutide-10mg", name: "RETATRUTIDE", dose: "10MG", cat: "peptides" },
  { id: "hgh-15iu", name: "HGH", dose: "15IU", cat: "peptides" },
  { id: "enclomiphene", name: "ENCLOMIPHENE", dose: "Capsules", cat: "capsules" },
  { id: "mk-677", name: "MK-677", dose: "Capsules", cat: "capsules" },
  { id: "rad-140", name: "RAD-140", dose: "30ct Capsules", cat: "capsules" },
  { id: "semax-selank-spray", name: "SEMAX/SELANK\nNASAL SPRAY", dose: "Nasal Spray", cat: "nasal-sprays" },
  { id: "bac-water", name: "BACTERIOSTATIC\nWATER", dose: "Sterile Solution", cat: "accessories" },
];

function generateVialSVG(product) {
  const { name, dose } = product;
  const lines = name.split('\n');
  const nameSize = lines[0].length > 10 ? 28 : (lines.length > 1 ? 30 : 36);
  
  // Build name text elements
  let nameText = '';
  if (lines.length === 1) {
    nameText = `<text x="200" y="342" font-family="Arial Black, Arial, sans-serif" font-size="${nameSize}" font-weight="900" fill="#1a1a1a" text-anchor="middle">${lines[0]}</text>`;
  } else {
    nameText = `<text x="200" y="328" font-family="Arial Black, Arial, sans-serif" font-size="${nameSize}" font-weight="900" fill="#1a1a1a" text-anchor="middle">${lines[0]}</text>
    <text x="200" y="${328 + nameSize + 4}" font-family="Arial Black, Arial, sans-serif" font-size="${nameSize}" font-weight="900" fill="#1a1a1a" text-anchor="middle">${lines[1]}</text>`;
  }

  const doseY = lines.length > 1 ? 328 + nameSize * 2 + 10 : 375;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <!-- Dark background gradient -->
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0f0f12"/>
      <stop offset="100%" stop-color="#050507"/>
    </radialGradient>
    <!-- Glass body gradient -->
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(180,200,210,0.15)"/>
      <stop offset="15%" stop-color="rgba(220,235,240,0.08)"/>
      <stop offset="40%" stop-color="rgba(200,215,225,0.05)"/>
      <stop offset="60%" stop-color="rgba(200,215,225,0.05)"/>
      <stop offset="85%" stop-color="rgba(220,235,240,0.08)"/>
      <stop offset="100%" stop-color="rgba(180,200,210,0.15)"/>
    </linearGradient>
    <!-- Glass highlight left -->
    <linearGradient id="glassHL" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0.25)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </linearGradient>
    <!-- Glass highlight right -->
    <linearGradient id="glassHR" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(255,255,255,0)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0.12)"/>
    </linearGradient>
    <!-- Silver cap gradient -->
    <linearGradient id="silver" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#e8e8e8"/>
      <stop offset="20%" stop-color="#c0c0c0"/>
      <stop offset="50%" stop-color="#d8d8d8"/>
      <stop offset="80%" stop-color="#a8a8a8"/>
      <stop offset="100%" stop-color="#b8b8b8"/>
    </linearGradient>
    <!-- Gold cap gradient -->
    <linearGradient id="goldCap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#d4b07a"/>
      <stop offset="50%" stop-color="#c4a060"/>
      <stop offset="100%" stop-color="#b89050"/>
    </linearGradient>
    <!-- Label gradient -->
    <linearGradient id="label" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4b882"/>
      <stop offset="50%" stop-color="#c8a870"/>
      <stop offset="100%" stop-color="#bfa068"/>
    </linearGradient>
    <!-- Reflection gradient -->
    <linearGradient id="reflect" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(180,200,210,0.08)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0)"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="400" height="500" fill="url(#bg)"/>
  
  <!-- Subtle floor reflection line -->
  <ellipse cx="200" cy="460" rx="120" ry="8" fill="rgba(255,255,255,0.03)"/>

  <!-- Vial reflection (flipped, faded) -->
  <g opacity="0.08" transform="translate(0,920) scale(1,-1)">
    <rect x="145" y="200" width="110" height="240" rx="8" fill="rgba(160,180,190,0.3)"/>
  </g>

  <!-- VIAL BODY -->
  <!-- Main glass body -->
  <rect x="145" y="200" width="110" height="240" rx="8" fill="url(#glass)" stroke="rgba(180,200,210,0.12)" stroke-width="1"/>
  
  <!-- Glass left highlight -->
  <rect x="147" y="202" width="15" height="236" rx="6" fill="url(#glassHL)"/>
  
  <!-- Glass right highlight -->
  <rect x="238" y="202" width="15" height="236" rx="6" fill="url(#glassHR)"/>
  
  <!-- Glass bottom curve -->
  <ellipse cx="200" cy="438" rx="55" ry="6" fill="rgba(180,200,210,0.08)"/>

  <!-- Neck taper -->
  <path d="M155,200 L155,185 Q155,175 165,170 L235,170 Q245,175 245,185 L245,200" fill="url(#glass)" stroke="rgba(180,200,210,0.1)" stroke-width="0.5"/>

  <!-- CRIMP CAP (silver aluminum) -->
  <rect x="155" y="155" width="90" height="20" rx="3" fill="url(#silver)"/>
  <!-- Crimp cap ridges -->
  <line x1="160" y1="170" x2="160" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="170" y1="170" x2="170" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="180" y1="170" x2="180" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="190" y1="170" x2="190" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="200" y1="170" x2="200" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="210" y1="170" x2="210" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="220" y1="170" x2="220" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="230" y1="170" x2="230" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <line x1="240" y1="170" x2="240" y2="175" stroke="rgba(150,150,150,0.4)" stroke-width="0.5"/>
  <!-- Cap highlight -->
  <rect x="155" y="155" width="90" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>

  <!-- FLIP-OFF CAP (gold/beige) -->
  <rect x="168" y="140" width="64" height="18" rx="6" fill="url(#goldCap)"/>
  <rect x="168" y="140" width="64" height="4" rx="3" fill="rgba(255,255,255,0.15)"/>

  <!-- LABEL -->
  <rect x="150" y="265" width="100" height="160" rx="2" fill="url(#label)"/>
  
  <!-- Label text: 818 LABS -->
  <text x="200" y="292" font-family="Arial Black, Arial, sans-serif" font-size="18" font-weight="900" fill="#1a1a1a" text-anchor="middle" letter-spacing="2">818 LABS</text>
  
  <!-- Separator line -->
  <line x1="165" y1="300" x2="235" y2="300" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
  
  <!-- Product name -->
  ${nameText}
  
  <!-- Dose -->
  <text x="200" y="${doseY}" font-family="Arial, sans-serif" font-size="14" fill="#3a3a3a" text-anchor="middle">${dose}</text>
  
  <!-- Purity -->
  <text x="200" y="${doseY + 18}" font-family="Arial, sans-serif" font-size="12" fill="#3a3a3a" text-anchor="middle">99% Purity</text>
  
  <!-- Research use only -->
  <text x="200" y="${doseY + 34}" font-family="Arial, sans-serif" font-size="10" fill="#555555" text-anchor="middle">For Research Use Only</text>
</svg>`;
}

function generateCapsuleSVG(product) {
  const { name, dose } = product;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0f0f12"/>
      <stop offset="100%" stop-color="#050507"/>
    </radialGradient>
    <linearGradient id="bottle" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#1a1a1a"/>
      <stop offset="15%" stop-color="#2a2a2a"/>
      <stop offset="50%" stop-color="#333333"/>
      <stop offset="85%" stop-color="#2a2a2a"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
    <linearGradient id="label" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4b882"/>
      <stop offset="50%" stop-color="#c8a870"/>
      <stop offset="100%" stop-color="#bfa068"/>
    </linearGradient>
    <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2a2a2a"/>
      <stop offset="50%" stop-color="#1a1a1a"/>
      <stop offset="100%" stop-color="#111111"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bg)"/>
  <ellipse cx="200" cy="458" rx="100" ry="6" fill="rgba(255,255,255,0.03)"/>
  
  <!-- Bottle body -->
  <rect x="140" y="190" width="120" height="260" rx="10" fill="url(#bottle)" stroke="rgba(60,60,60,0.5)" stroke-width="1"/>
  <!-- Highlight -->
  <rect x="142" y="192" width="12" height="256" rx="8" fill="rgba(255,255,255,0.06)"/>
  <rect x="246" y="192" width="8" height="256" rx="6" fill="rgba(255,255,255,0.03)"/>
  
  <!-- Bottle neck -->
  <rect x="170" y="170" width="60" height="25" rx="4" fill="url(#bottle)" stroke="rgba(60,60,60,0.3)" stroke-width="0.5"/>
  
  <!-- Cap -->
  <rect x="165" y="140" width="70" height="35" rx="6" fill="url(#cap)"/>
  <rect x="165" y="140" width="70" height="5" rx="3" fill="rgba(255,255,255,0.08)"/>
  <!-- Cap ridges -->
  <g opacity="0.15">
    ${Array.from({length: 12}, (_, i) => `<line x1="${170 + i*5}" y1="145" x2="${170 + i*5}" y2="172" stroke="rgba(255,255,255,0.3)" stroke-width="0.5"/>`).join('\n    ')}
  </g>
  
  <!-- Label -->
  <rect x="148" y="260" width="104" height="160" rx="2" fill="url(#label)"/>
  <text x="200" y="290" font-family="Arial Black, Arial, sans-serif" font-size="18" font-weight="900" fill="#1a1a1a" text-anchor="middle" letter-spacing="2">818 LABS</text>
  <line x1="163" y1="298" x2="237" y2="298" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
  <text x="200" y="335" font-family="Arial Black, Arial, sans-serif" font-size="${name.length > 10 ? 24 : 30}" font-weight="900" fill="#1a1a1a" text-anchor="middle">${name}</text>
  <text x="200" y="365" font-family="Arial, sans-serif" font-size="14" fill="#3a3a3a" text-anchor="middle">${dose}</text>
  <text x="200" y="383" font-family="Arial, sans-serif" font-size="12" fill="#3a3a3a" text-anchor="middle">99% Purity</text>
  <text x="200" y="400" font-family="Arial, sans-serif" font-size="10" fill="#555555" text-anchor="middle">For Research Use Only</text>
</svg>`;
}

function generateSpraySVG(product) {
  const { name, dose } = product;
  const lines = name.split('\n');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="400" height="500">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#0f0f12"/>
      <stop offset="100%" stop-color="#050507"/>
    </radialGradient>
    <linearGradient id="sprayBody" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgba(220,230,235,0.85)"/>
      <stop offset="20%" stop-color="rgba(240,245,248,0.9)"/>
      <stop offset="80%" stop-color="rgba(240,245,248,0.9)"/>
      <stop offset="100%" stop-color="rgba(210,220,225,0.85)"/>
    </linearGradient>
    <linearGradient id="label" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#d4b882"/>
      <stop offset="50%" stop-color="#c8a870"/>
      <stop offset="100%" stop-color="#bfa068"/>
    </linearGradient>
  </defs>
  <rect width="400" height="500" fill="url(#bg)"/>
  <ellipse cx="200" cy="458" rx="80" ry="5" fill="rgba(255,255,255,0.03)"/>
  
  <!-- Spray body -->
  <rect x="160" y="200" width="80" height="250" rx="8" fill="url(#sprayBody)" stroke="rgba(200,210,215,0.3)" stroke-width="1"/>
  <rect x="162" y="202" width="8" height="246" rx="6" fill="rgba(255,255,255,0.15)"/>
  
  <!-- Nozzle base -->
  <rect x="175" y="175" width="50" height="30" rx="4" fill="rgba(230,235,238,0.9)"/>
  
  <!-- Nozzle tip -->
  <rect x="210" y="155" width="30" height="12" rx="3" fill="rgba(200,205,210,0.9)"/>
  <rect x="235" y="158" width="15" height="6" rx="3" fill="rgba(180,185,190,0.9)"/>
  
  <!-- Actuator button -->
  <rect x="185" y="165" width="30" height="15" rx="4" fill="rgba(200,205,210,0.95)"/>
  
  <!-- Label -->
  <rect x="166" y="270" width="68" height="150" rx="2" fill="url(#label)"/>
  <text x="200" y="295" font-family="Arial Black, Arial, sans-serif" font-size="14" font-weight="900" fill="#1a1a1a" text-anchor="middle" letter-spacing="1">818 LABS</text>
  <line x1="175" y1="302" x2="225" y2="302" stroke="#1a1a1a" stroke-width="0.5" opacity="0.3"/>
  <text x="200" y="325" font-family="Arial Black, Arial, sans-serif" font-size="13" font-weight="900" fill="#1a1a1a" text-anchor="middle">${lines[0]}</text>
  ${lines[1] ? `<text x="200" y="342" font-family="Arial Black, Arial, sans-serif" font-size="13" font-weight="900" fill="#1a1a1a" text-anchor="middle">${lines[1]}</text>` : ''}
  <text x="200" y="${lines[1] ? 362 : 350}" font-family="Arial, sans-serif" font-size="11" fill="#3a3a3a" text-anchor="middle">${dose}</text>
  <text x="200" y="${lines[1] ? 378 : 366}" font-family="Arial, sans-serif" font-size="9" fill="#555555" text-anchor="middle">For Research Use Only</text>
</svg>`;
}

// Generate all images
let count = 0;
for (const product of PRODUCTS) {
  let svg;
  if (product.cat === 'capsules') {
    svg = generateCapsuleSVG(product);
  } else if (product.cat === 'nasal-sprays') {
    svg = generateSpraySVG(product);
  } else {
    svg = generateVialSVG(product);
  }

  const filePath = path.join(OUTPUT_DIR, `${product.id}.svg`);
  fs.writeFileSync(filePath, svg);
  count++;
  console.log(`  ✅ ${product.id}.svg`);
}

console.log(`\nGenerated ${count} product images in ${OUTPUT_DIR}`);
