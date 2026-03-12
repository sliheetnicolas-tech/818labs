// ============================================
// 818 LABS - Product Data
// ============================================

const PRODUCTS = [
  // --- PEPTIDES (Onyxresearch category) ---
  {
    id: "glp3-rt",
    name: "GLP-3 RT",
    category: "peptides",
    description: "Retatrutide research peptide",
    specs: { form: "Lyophilized Powder", purity: ">99%", formula: "C316H481F3N94O101", mw: "6758.22 g/mol" },
    variants: [
      { label: "10mg", price: 89.00 },
      { label: "20mg", price: 140.00 },
      { label: "30mg", price: 200.00 },
      { label: "60mg", price: 280.00 }
    ],
    badge: "best-seller",
    onSale: true
  },
  {
    id: "glow-70mg",
    name: "GLOW 70mg",
    subtitle: "GHK-Cu / BPC-157 / TB-500",
    category: "peptides",
    description: "Multi-peptide research blend",
    specs: { quantity: "70mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 110.00,
    originalPrice: 125.00,
    badge: "sale",
    onSale: true
  },
  {
    id: "cjc-1295-ipamorelin",
    name: "CJC-1295 no DAC + Ipamorelin",
    subtitle: "5mg / 5mg",
    category: "peptides",
    description: "Growth hormone secretagogue blend",
    specs: { quantity: "5mg/5mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 85.00,
    originalPrice: 89.00,
    onSale: true
  },
  {
    id: "bpc-157",
    name: "BPC-157",
    category: "peptides",
    description: "Body Protection Compound",
    specs: { form: "Lyophilized Powder", purity: ">99%", sequence: "GEPPPGKPADDAGLV" },
    variants: [
      { label: "5mg", price: 45.00 },
      { label: "10mg", price: 64.00 }
    ]
  },
  {
    id: "cjc-1295-no-dac",
    name: "CJC-1295 no DAC",
    subtitle: "5mg",
    category: "peptides",
    description: "Modified GRF (1-29)",
    specs: { quantity: "5mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 45.00
  },
  {
    id: "cjc-w-dac",
    name: "CJC-1295 w/ DAC",
    subtitle: "5mg",
    category: "peptides",
    description: "Drug Affinity Complex variant",
    specs: { quantity: "5mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 66.00,
    originalPrice: 80.00,
    onSale: true
  },
  {
    id: "klow-80mg",
    name: "KLOW 80mg",
    subtitle: "KPV / GHK-Cu / BPC-157 / TB-500",
    category: "peptides",
    description: "Premium multi-peptide research blend",
    specs: { quantity: "80mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 117.50,
    originalPrice: 120.00,
    onSale: true
  },
  {
    id: "wolverine-10mg",
    name: "WOLVERINE 10mg",
    subtitle: "BPC-157 / TB-500",
    category: "peptides",
    description: "Recovery research blend",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 80.00,
    originalPrice: 85.00,
    onSale: true
  },
  {
    id: "tb500-10mg",
    name: "TB-500 10mg",
    category: "peptides",
    description: "Thymosin Beta-4 fragment",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 70.00
  },
  {
    id: "selank-5mg",
    name: "Selank 5mg",
    category: "peptides",
    description: "Anxiolytic research peptide",
    specs: { quantity: "5mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 39.00,
    originalPrice: 40.00,
    onSale: true
  },
  {
    id: "semax",
    name: "Semax",
    category: "peptides",
    description: "Nootropic research peptide",
    specs: { form: "Lyophilized Powder", purity: ">99%" },
    variants: [
      { label: "5mg", price: 42.50 },
      { label: "10mg", price: 65.00 }
    ]
  },
  {
    id: "sermorelin-5mg",
    name: "Sermorelin 5mg",
    category: "peptides",
    description: "Growth hormone releasing peptide",
    specs: { quantity: "5mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 35.00,
    originalPrice: 40.00,
    onSale: true
  },
  {
    id: "dsip-5mg",
    name: "DSIP 5mg",
    category: "peptides",
    description: "Delta Sleep Inducing Peptide",
    specs: { quantity: "5mg", form: "Lyophilized Powder", purity: ">99%", sequence: "Trp-Ala-Gly-Gly-Asp-Ala-Ser-Gly-Glu", mw: "849.88 g/mol" },
    price: 39.00,
    originalPrice: 40.00,
    onSale: true
  },
  {
    id: "epithalon-10mg",
    name: "Epithalon 10mg",
    category: "peptides",
    description: "Telomerase activator peptide",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 55.00
  },
  {
    id: "kisspeptin-10mg",
    name: "Kisspeptin 10mg",
    category: "peptides",
    description: "GnRH stimulating peptide",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 55.00
  },
  {
    id: "ghk-cu",
    name: "GHK-Cu",
    category: "peptides",
    description: "Copper peptide complex",
    specs: { form: "Lyophilized Powder", purity: ">99%" },
    variants: [
      { label: "50mg", price: 42.50 },
      { label: "100mg", price: 57.50 }
    ]
  },
  {
    id: "ipamorelin-10mg",
    name: "Ipamorelin 10mg",
    category: "peptides",
    description: "Selective GH secretagogue",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 79.00,
    originalPrice: 90.00,
    onSale: true
  },
  {
    id: "mt2-10mg",
    name: "Melanotan II 10mg",
    category: "peptides",
    description: "Melanocortin receptor agonist",
    specs: { form: "Lyophilized Powder", purity: ">99%" },
    variants: [
      { label: "10mg", price: 43.00 },
      { label: "20mg", price: 70.00 },
      { label: "30mg", price: 95.00 }
    ],
    onSale: true
  },
  {
    id: "mots-c-10mg",
    name: "MOTS-c 10mg",
    category: "peptides",
    description: "Mitochondrial-derived peptide",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 69.00,
    originalPrice: 75.00,
    onSale: true
  },
  {
    id: "nad-500mg",
    name: "NAD+ 500mg",
    category: "peptides",
    description: "Nicotinamide adenine dinucleotide",
    specs: { quantity: "500mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 75.00,
    originalPrice: 85.00,
    onSale: true
  },
  {
    id: "aod-9604-5mg",
    name: "AOD 9604 5mg",
    category: "peptides",
    description: "Anti-obesity drug fragment",
    specs: { quantity: "5mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 45.00
  },
  {
    id: "cagrilintide-10mg",
    name: "Cagrilintide 10mg",
    category: "peptides",
    description: "Long-acting amylin analog",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 95.00,
    originalPrice: 110.00,
    onSale: true
  },
  {
    id: "tesamorelin-10mg",
    name: "Tesamorelin 10mg",
    category: "peptides",
    description: "GHRH analog peptide",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 85.00,
    originalPrice: 95.00,
    onSale: true
  },
  {
    id: "glp2-tz-10mg",
    name: "GLP2-TZ 10mg",
    subtitle: "Tirzepatide",
    category: "peptides",
    description: "Dual GIP/GLP-1 receptor agonist",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 85.00,
    originalPrice: 90.00,
    onSale: true
  },
  {
    id: "igf1-lr3-1mg",
    name: "IGF1-LR3 1mg",
    category: "peptides",
    description: "Long R3 Insulin-like Growth Factor",
    specs: { quantity: "1mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 95.00,
    originalPrice: 105.00,
    onSale: true
  },
  {
    id: "semaglutide-10mg",
    name: "Semaglutide 10mg",
    category: "peptides",
    description: "GLP-1 receptor agonist",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 89.00
  },
  {
    id: "retatrutide-10mg",
    name: "Retatrutide 10mg",
    category: "peptides",
    description: "Triple hormone receptor agonist",
    specs: { quantity: "10mg", form: "Lyophilized Powder", purity: ">99%" },
    price: 89.00
  },
  {
    id: "hgh-15iu",
    name: "HGH 15IU",
    category: "peptides",
    description: "Human Growth Hormone",
    specs: { quantity: "15IU", form: "Lyophilized Powder", purity: ">99%" },
    price: 95.00
  },

  // --- CAPSULES ---
  {
    id: "enclomiphene",
    name: "Enclomiphene",
    category: "capsules",
    description: "Selective estrogen receptor modulator",
    specs: { form: "Capsules", purity: ">99%" },
    price: 89.00,
    originalPrice: 115.00,
    badge: "sale",
    onSale: true
  },
  {
    id: "mk-677",
    name: "MK-677",
    category: "capsules",
    description: "Growth hormone secretagogue (oral)",
    specs: { form: "Capsules", purity: ">99%" },
    price: 89.00,
    originalPrice: 115.00,
    badge: "sale",
    onSale: true
  },
  {
    id: "rad-140",
    name: "RAD-140",
    category: "capsules",
    description: "Selective androgen receptor modulator",
    specs: { form: "Capsules", purity: ">99%" },
    variants: [
      { label: "30ct", price: 79.00 }
    ],
    originalPrice: 89.00,
    onSale: true
  },

  // --- NASAL SPRAYS ---
  {
    id: "semax-selank-spray",
    name: "Semax/Selank Nasal Spray",
    category: "nasal-sprays",
    description: "Nootropic nasal spray blend",
    specs: { form: "Nasal Spray" },
    price: 85.00
  },

  // --- ACCESSORIES ---
  {
    id: "bac-water",
    name: "Bacteriostatic Water",
    category: "accessories",
    description: "Sterile reconstitution water",
    specs: { form: "Sterile Solution" },
    variants: [
      { label: "3ml", price: 14.50 },
      { label: "10ml", price: 29.50 }
    ],
    badge: "best-seller"
  }
];

// Export for use
if (typeof module !== 'undefined') module.exports = PRODUCTS;
