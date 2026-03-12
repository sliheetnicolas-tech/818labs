// SVG Product Image Generator for 818 Labs — Realistic Vial Style
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'images', 'products');
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

// Unique colors per product for the flip-off cap and label accent
const PRODUCT_COLORS = {
  'glp3-rt':           { cap: '#1e40af', accent: '#2563eb', liquidTint: '#dbeafe' },
  'glow-70mg':         { cap: '#059669', accent: '#10b981', liquidTint: '#d1fae5' },
  'cjc-1295-ipamorelin': { cap: '#2563eb', accent: '#3b82f6', liquidTint: '#dbeafe' },
  'bpc-157':           { cap: '#7c3aed', accent: '#8b5cf6', liquidTint: '#ede9fe' },
  'cjc-1295-no-dac':   { cap: '#0369a1', accent: '#0ea5e9', liquidTint: '#e0f2fe' },
  'cjc-w-dac':         { cap: '#0e7490', accent: '#06b6d4', liquidTint: '#cffafe' },
  'klow-80mg':         { cap: '#7c3aed', accent: '#a855f7', liquidTint: '#f3e8ff' },
  'wolverine-10mg':    { cap: '#dc2626', accent: '#ef4444', liquidTint: '#fee2e2' },
  'tb500-10mg':        { cap: '#2563eb', accent: '#60a5fa', liquidTint: '#dbeafe' },
  'selank-5mg':        { cap: '#0891b2', accent: '#22d3ee', liquidTint: '#cffafe' },
  'semax':             { cap: '#0d9488', accent: '#14b8a6', liquidTint: '#ccfbf1' },
  'sermorelin-5mg':    { cap: '#4f46e5', accent: '#818cf8', liquidTint: '#e0e7ff' },
  'dsip-5mg':          { cap: '#6d28d9', accent: '#a78bfa', liquidTint: '#ede9fe' },
  'epithalon-10mg':    { cap: '#1d4ed8', accent: '#3b82f6', liquidTint: '#dbeafe' },
  'kisspeptin-10mg':   { cap: '#be123c', accent: '#f43f5e', liquidTint: '#ffe4e6' },
  'ghk-cu':            { cap: '#b45309', accent: '#f59e0b', liquidTint: '#fef3c7' },
  'ipamorelin-10mg':   { cap: '#1e40af', accent: '#3b82f6', liquidTint: '#dbeafe' },
  'mt2-10mg':          { cap: '#92400e', accent: '#d97706', liquidTint: '#fef3c7' },
  'mots-c-10mg':       { cap: '#047857', accent: '#10b981', liquidTint: '#d1fae5' },
  'nad-500mg':         { cap: '#7c2d12', accent: '#ea580c', liquidTint: '#ffedd5' },
  'aod-9604-5mg':      { cap: '#1e3a8a', accent: '#2563eb', liquidTint: '#dbeafe' },
  'cagrilintide-10mg': { cap: '#5b21b6', accent: '#8b5cf6', liquidTint: '#ede9fe' },
  'tesamorelin-10mg':  { cap: '#1e40af', accent: '#60a5fa', liquidTint: '#dbeafe' },
  'glp2-tz-10mg':      { cap: '#0f766e', accent: '#14b8a6', liquidTint: '#ccfbf1' },
  'igf1-lr3-1mg':      { cap: '#b91c1c', accent: '#dc2626', liquidTint: '#fee2e2' },
  'semaglutide-10mg':  { cap: '#1d4ed8', accent: '#3b82f6', liquidTint: '#dbeafe' },
  'retatrutide-10mg':  { cap: '#4338ca', accent: '#6366f1', liquidTint: '#e0e7ff' },
  'hgh-15iu':          { cap: '#0369a1', accent: '#0284c7', liquidTint: '#e0f2fe' },
  'enclomiphene':      { cap: '#6d28d9', accent: '#8b5cf6', liquidTint: '#ede9fe' },
  'mk-677':            { cap: '#4338ca', accent: '#6366f1', liquidTint: '#e0e7ff' },
  'rad-140':           { cap: '#b91c1c', accent: '#ef4444', liquidTint: '#fee2e2' },
  'semax-selank-spray': { cap: '#0d9488', accent: '#14b8a6', liquidTint: '#ccfbf1' },
  'bac-water':         { cap: '#2563eb', accent: '#60a5fa', liquidTint: '#eff6ff' },
};

function generateRealisticVial(product) {
  const c = PRODUCT_COLORS[product.id] || { cap: '#1e40af', accent: '#2563eb', liquidTint: '#dbeafe' };
  const id = product.id.replace(/[^a-z0-9]/g, '');
  
  const name = product.name;
  const subtitle = product.subtitle || '';
  const dosage = product.specs?.quantity || (product.variants ? product.variants.map(v => v.label).join(' / ') : '');
  const purity = product.specs?.purity || '>99%';
  
  // Split name for label
  const nameLines = [];
  if (name.length > 14) {
    const mid = Math.ceil(name.length / 2);
    const spaceIdx = name.lastIndexOf(' ', mid);
    if (spaceIdx > 3) {
      nameLines.push(name.substring(0, spaceIdx));
      nameLines.push(name.substring(spaceIdx + 1));
    } else {
      nameLines.push(name);
    }
  } else {
    nameLines.push(name);
  }

  const isCapsule = product.category === 'capsules';
  const isSpray = product.id === 'semax-selank-spray';
  const isWater = product.id === 'bac-water';
  
  if (isCapsule) return generateRealisticBottle(product, c, id, nameLines, dosage, purity);
  if (isSpray) return generateRealisticSpray(product, c, id);
  
  // Vial dimensions
  const vW = 68, vH = 180;
  const vX = 150 - vW/2, vY = 115;
  const capH = 22, crimpH = 6;
  const capY = vY - capH - crimpH;
  const labelY = vY + 30, labelH = 105, labelW = vW - 4;
  const liquidY = vY + vH * 0.35, liquidH = vH * 0.63;
  const nameSize = nameLines.length > 1 ? 11 : (name.length > 12 ? 11 : 14);

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
<defs>
  <!-- Background -->
  <radialGradient id="rbg${id}" cx="50%" cy="45%" r="65%">
    <stop offset="0%" stop-color="#141e30"/>
    <stop offset="100%" stop-color="#0a0f1a"/>
  </radialGradient>
  
  <!-- Glass body gradient -->
  <linearGradient id="glass${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#b8c5d4" stop-opacity="0.35"/>
    <stop offset="15%" stop-color="#e8edf2" stop-opacity="0.12"/>
    <stop offset="35%" stop-color="#f8fafc" stop-opacity="0.06"/>
    <stop offset="50%" stop-color="#f8fafc" stop-opacity="0.04"/>
    <stop offset="65%" stop-color="#f8fafc" stop-opacity="0.06"/>
    <stop offset="85%" stop-color="#e8edf2" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="#b8c5d4" stop-opacity="0.3"/>
  </linearGradient>
  
  <!-- Glass inner shine -->
  <linearGradient id="shine${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="white" stop-opacity="0"/>
    <stop offset="18%" stop-color="white" stop-opacity="0.25"/>
    <stop offset="22%" stop-color="white" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="white" stop-opacity="0"/>
  </linearGradient>

  <!-- Liquid -->
  <linearGradient id="liq${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${c.liquidTint}" stop-opacity="0.2"/>
    <stop offset="40%" stop-color="${c.accent}" stop-opacity="0.12"/>
    <stop offset="100%" stop-color="${c.accent}" stop-opacity="0.25"/>
  </linearGradient>
  
  <!-- Flip-off cap -->
  <linearGradient id="cap${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${c.cap}" stop-opacity="0.95"/>
    <stop offset="40%" stop-color="${c.cap}"/>
    <stop offset="100%" stop-color="${c.cap}" stop-opacity="0.8"/>
  </linearGradient>
  <linearGradient id="caphi${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="white" stop-opacity="0"/>
    <stop offset="25%" stop-color="white" stop-opacity="0.25"/>
    <stop offset="50%" stop-color="white" stop-opacity="0.08"/>
    <stop offset="100%" stop-color="white" stop-opacity="0"/>
  </linearGradient>
  
  <!-- Aluminum crimp -->
  <linearGradient id="crimp${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#a0a8b0"/>
    <stop offset="20%" stop-color="#d4dae0"/>
    <stop offset="40%" stop-color="#c8cfd6"/>
    <stop offset="60%" stop-color="#d8dee4"/>
    <stop offset="80%" stop-color="#c0c8d0"/>
    <stop offset="100%" stop-color="#a0a8b0"/>
  </linearGradient>

  <!-- Label -->
  <linearGradient id="lbl${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fcfcfc"/>
    <stop offset="100%" stop-color="#f2f2f2"/>
  </linearGradient>
  
  <!-- Shadows & filters -->
  <filter id="vshadow${id}">
    <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
    <feOffset dy="8"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="ishadow${id}">
    <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
    <feOffset dy="1"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>

  <clipPath id="vclip${id}">
    <rect x="${vX}" y="${vY}" width="${vW}" height="${vH}" rx="4"/>
  </clipPath>
</defs>

<!-- Background -->
<rect width="300" height="400" fill="url(#rbg${id})"/>

<!-- Subtle floor reflection -->
<ellipse cx="150" cy="340" rx="60" ry="12" fill="white" opacity="0.02"/>
<ellipse cx="150" cy="338" rx="45" ry="6" fill="${c.accent}" opacity="0.04"/>

<!-- Main vial group -->
<g filter="url(#vshadow${id})">
  
  <!-- === FLIP-OFF CAP === -->
  <rect x="${150 - 16}" y="${capY}" width="32" height="${capH}" rx="4" fill="url(#cap${id})"/>
  <rect x="${150 - 16}" y="${capY}" width="32" height="${capH}" rx="4" fill="url(#caphi${id})"/>
  <!-- Cap top highlight -->
  <rect x="${150 - 14}" y="${capY + 2}" width="28" height="3" rx="1.5" fill="white" opacity="0.2"/>
  <!-- Cap ridge lines -->
  <line x1="${150 - 14}" y1="${capY + capH - 3}" x2="${150 + 14}" y2="${capY + capH - 3}" stroke="black" stroke-opacity="0.15" stroke-width="0.5"/>

  <!-- === ALUMINUM CRIMP === -->
  <rect x="${vX - 1}" y="${vY - crimpH}" width="${vW + 2}" height="${crimpH + 4}" rx="2" fill="url(#crimp${id})"/>
  <!-- Crimp texture lines -->
  ${Array.from({length: 8}, (_, i) => {
    const x = vX + 4 + i * ((vW - 4) / 8);
    return `<line x1="${x}" y1="${vY - crimpH + 1}" x2="${x}" y2="${vY - 1}" stroke="white" stroke-opacity="0.15" stroke-width="0.4"/>`;
  }).join('\n  ')}
  <!-- Crimp bottom edge -->
  <rect x="${vX}" y="${vY - 1}" width="${vW}" height="2" rx="1" fill="#b0b8c0"/>

  <!-- === GLASS BODY === -->
  <rect x="${vX}" y="${vY}" width="${vW}" height="${vH}" rx="4" fill="url(#glass${id})" stroke="white" stroke-opacity="0.08" stroke-width="0.5"/>
  
  <!-- Liquid fill (clipped to vial) -->
  <g clip-path="url(#vclip${id})">
    <rect x="${vX}" y="${liquidY}" width="${vW}" height="${liquidH + 5}" fill="url(#liq${id})"/>
    <!-- Liquid surface meniscus -->
    <ellipse cx="150" cy="${liquidY}" rx="${vW/2 - 2}" ry="3" fill="${c.accent}" opacity="0.08"/>
  </g>
  
  <!-- Glass shine (left edge) -->
  <rect x="${vX}" y="${vY}" width="${vW}" height="${vH}" rx="4" fill="url(#shine${id})"/>
  
  <!-- Secondary reflection (right) -->
  <rect x="${vX + vW - 12}" y="${vY + 5}" width="4" height="${vH - 15}" rx="2" fill="white" opacity="0.06"/>
  
  <!-- Edge highlight left -->
  <rect x="${vX + 2}" y="${vY + 8}" width="1.5" height="${vH - 20}" rx="0.75" fill="white" opacity="0.12"/>

  <!-- === LABEL === -->
  <g filter="url(#ishadow${id})">
    <rect x="${vX + 2}" y="${labelY}" width="${labelW}" height="${labelH}" rx="2" fill="url(#lbl${id})"/>
    
    <!-- Label border accent -->
    <rect x="${vX + 2}" y="${labelY}" width="${labelW}" height="3" rx="1" fill="${c.accent}"/>
    
    <!-- 818 LABS brand -->
    <text x="150" y="${labelY + 20}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="8.5" font-weight="900" fill="#111" letter-spacing="3">818 LABS</text>
    
    <!-- Thin divider -->
    <line x1="${vX + 12}" y1="${labelY + 26}" x2="${vX + labelW - 10}" y2="${labelY + 26}" stroke="${c.accent}" stroke-width="0.8" stroke-opacity="0.6"/>
    
    <!-- Product name -->
    ${nameLines.map((line, i) => 
      `<text x="150" y="${labelY + 42 + i * 15}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="${nameSize}" font-weight="800" fill="${c.cap}">${escapeXml(line)}</text>`
    ).join('\n    ')}
    
    <!-- Subtitle / blend info -->
    ${subtitle ? `<text x="150" y="${labelY + 42 + nameLines.length * 15 + 2}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="5.5" font-weight="500" fill="#777">${escapeXml(subtitle)}</text>` : ''}
    
    <!-- Dosage -->
    <text x="150" y="${labelY + 42 + nameLines.length * 15 + (subtitle ? 14 : 4)}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="8" font-weight="700" fill="#444">${escapeXml(dosage)}</text>
    
    <!-- Purity badge -->
    <rect x="${150 - 22}" y="${labelY + labelH - 20}" width="44" height="13" rx="6.5" fill="${c.cap}"/>
    <text x="150" y="${labelY + labelH - 11}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" font-weight="700" fill="white" letter-spacing="0.5">${purity} PURE</text>
    
    <!-- Research use text -->
    <text x="150" y="${labelY + labelH - 3}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="4" font-weight="500" fill="#999" letter-spacing="0.8">FOR RESEARCH USE ONLY</text>
  </g>

  <!-- Glass rim at bottom -->
  <rect x="${vX}" y="${vY + vH - 2}" width="${vW}" height="2" rx="1" fill="white" opacity="0.06"/>
</g>
</svg>`;
}

function generateRealisticBottle(product, c, id, nameLines, dosage, purity) {
  const nameSize = nameLines.length > 1 ? 11 : (product.name.length > 12 ? 11 : 13);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
<defs>
  <radialGradient id="rbg${id}" cx="50%" cy="45%" r="65%">
    <stop offset="0%" stop-color="#141e30"/>
    <stop offset="100%" stop-color="#0a0f1a"/>
  </radialGradient>
  <linearGradient id="bot${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#1a1a1a"/>
    <stop offset="20%" stop-color="#333"/>
    <stop offset="40%" stop-color="#3a3a3a"/>
    <stop offset="60%" stop-color="#333"/>
    <stop offset="80%" stop-color="#2a2a2a"/>
    <stop offset="100%" stop-color="#1a1a1a"/>
  </linearGradient>
  <linearGradient id="bcap${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#444"/>
    <stop offset="40%" stop-color="#2a2a2a"/>
    <stop offset="100%" stop-color="#1a1a1a"/>
  </linearGradient>
  <linearGradient id="blbl${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#fcfcfc"/>
    <stop offset="100%" stop-color="#f0f0f0"/>
  </linearGradient>
  <linearGradient id="bshine${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="white" stop-opacity="0"/>
    <stop offset="15%" stop-color="white" stop-opacity="0.12"/>
    <stop offset="25%" stop-color="white" stop-opacity="0.04"/>
    <stop offset="100%" stop-color="white" stop-opacity="0"/>
  </linearGradient>
  <filter id="bshadow${id}">
    <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
    <feOffset dy="8"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.4"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
  <filter id="bishadow${id}">
    <feGaussianBlur in="SourceAlpha" stdDeviation="1.5"/>
    <feOffset dy="1"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.15"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>
<rect width="300" height="400" fill="url(#rbg${id})"/>
<ellipse cx="150" cy="340" rx="55" ry="8" fill="${c.accent}" opacity="0.04"/>

<g filter="url(#bshadow${id})">
  <!-- Cap -->
  <rect x="127" y="82" width="46" height="28" rx="6" fill="url(#bcap${id})"/>
  <rect x="130" y="78" width="40" height="8" rx="4" fill="#333"/>
  <!-- Cap ridges -->
  ${Array.from({length: 12}, (_, i) => {
    const x = 129 + i * 3.5;
    return `<line x1="${x}" y1="84" x2="${x}" y2="108" stroke="white" stroke-opacity="0.06" stroke-width="0.4"/>`;
  }).join('\n  ')}
  <rect x="130" y="78" width="40" height="3" rx="1.5" fill="white" opacity="0.08"/>
  
  <!-- Neck -->
  <rect x="132" y="108" width="36" height="10" rx="2" fill="#2a2a2a" stroke="#333" stroke-width="0.5"/>
  
  <!-- Bottle body -->
  <rect x="112" y="116" width="76" height="185" rx="8" fill="url(#bot${id})" stroke="#444" stroke-width="0.5"/>
  <rect x="112" y="116" width="76" height="185" rx="8" fill="url(#bshine${id})"/>
  
  <!-- Label -->
  <g filter="url(#bishadow${id})">
    <rect x="116" y="148" width="68" height="115" rx="3" fill="url(#blbl${id})"/>
    <rect x="116" y="148" width="68" height="3" rx="1" fill="${c.accent}"/>
    
    <text x="150" y="170" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="8.5" font-weight="900" fill="#111" letter-spacing="3">818 LABS</text>
    <line x1="126" y1="176" x2="174" y2="176" stroke="${c.cap}" stroke-width="0.8" stroke-opacity="0.6"/>
    
    ${nameLines.map((line, i) => 
      `<text x="150" y="${192 + i * 15}" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="${nameSize}" font-weight="800" fill="${c.cap}">${escapeXml(line)}</text>`
    ).join('\n    ')}
    
    <text x="150" y="225" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="7" font-weight="600" fill="#666">CAPSULES</text>
    
    <rect x="130" y="236" width="40" height="12" rx="6" fill="${c.cap}"/>
    <text x="150" y="244.5" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" font-weight="700" fill="white">${purity} PURE</text>
    
    <text x="150" y="259" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="4" font-weight="500" fill="#999" letter-spacing="0.8">FOR RESEARCH USE ONLY</text>
  </g>
  
  <!-- Edge highlight -->
  <rect x="114" y="120" width="2" height="175" rx="1" fill="white" opacity="0.06"/>
</g>
</svg>`;
}

function generateRealisticSpray(product, c, id) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 400" width="300" height="400">
<defs>
  <radialGradient id="rbg${id}" cx="50%" cy="45%" r="65%">
    <stop offset="0%" stop-color="#141e30"/>
    <stop offset="100%" stop-color="#0a0f1a"/>
  </radialGradient>
  <linearGradient id="sbody${id}" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="#d0d0d0"/>
    <stop offset="15%" stop-color="#f0f0f0"/>
    <stop offset="30%" stop-color="#fafafa"/>
    <stop offset="50%" stop-color="#ffffff"/>
    <stop offset="70%" stop-color="#fafafa"/>
    <stop offset="85%" stop-color="#f0f0f0"/>
    <stop offset="100%" stop-color="#d0d0d0"/>
  </linearGradient>
  <linearGradient id="sact${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="#e8e8e8"/>
    <stop offset="100%" stop-color="#ccc"/>
  </linearGradient>
  <filter id="sshadow${id}">
    <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
    <feOffset dy="8"/>
    <feComponentTransfer><feFuncA type="linear" slope="0.35"/></feComponentTransfer>
    <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
  </filter>
</defs>
<rect width="300" height="400" fill="url(#rbg${id})"/>
<ellipse cx="150" cy="340" rx="50" ry="8" fill="${c.accent}" opacity="0.04"/>

<g filter="url(#sshadow${id})">
  <!-- Bottle body -->
  <rect x="122" y="142" width="56" height="160" rx="5" fill="url(#sbody${id})" stroke="#bbb" stroke-width="0.5"/>
  
  <!-- Actuator/pump mechanism -->
  <rect x="134" y="108" width="32" height="38" rx="4" fill="url(#sact${id})" stroke="#bbb" stroke-width="0.5"/>
  
  <!-- Nozzle arm -->
  <rect x="156" y="112" width="28" height="10" rx="3" fill="#ddd" stroke="#bbb" stroke-width="0.5"/>
  <circle cx="184" cy="117" r="4" fill="#ccc" stroke="#aaa" stroke-width="0.5"/>
  <circle cx="184" cy="117" r="1.5" fill="#999"/>
  
  <!-- Actuator top -->
  <rect x="138" y="104" width="24" height="8" rx="4" fill="#ddd"/>
  <rect x="140" y="104" width="20" height="3" rx="1.5" fill="white" opacity="0.3"/>
  
  <!-- Label on body -->
  <rect x="126" y="172" width="48" height="85" rx="2" fill="${c.cap}" opacity="0.9"/>
  <rect x="126" y="172" width="48" height="2.5" rx="1" fill="white" opacity="0.3"/>
  
  <text x="150" y="190" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="6.5" font-weight="900" fill="white" letter-spacing="2">818 LABS</text>
  <line x1="133" y1="195" x2="167" y2="195" stroke="white" stroke-opacity="0.4" stroke-width="0.5"/>
  
  <text x="150" y="210" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="8" font-weight="800" fill="white">Semax/Selank</text>
  <text x="150" y="222" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="7" font-weight="600" fill="white" opacity="0.85">Nasal Spray</text>
  
  <text x="150" y="248" text-anchor="middle" font-family="'Helvetica Neue',Arial,sans-serif" font-size="4" font-weight="500" fill="white" opacity="0.5" letter-spacing="0.8">RESEARCH USE ONLY</text>
  
  <!-- Body reflection -->
  <rect x="125" y="144" width="5" height="155" rx="2.5" fill="white" opacity="0.12"/>
  <rect x="133" y="144" width="2" height="140" rx="1" fill="white" opacity="0.05"/>
</g>
</svg>`;
}

// Load & generate
const PRODUCTS = require('./products.js');
let count = 0;
for (const product of PRODUCTS) {
  const svg = generateRealisticVial(product);
  fs.writeFileSync(path.join(imgDir, `${product.id}.svg`), svg);
  count++;
  console.log(`✓ ${product.id}.svg`);
}
console.log(`\nGenerated ${count} realistic product images`);
