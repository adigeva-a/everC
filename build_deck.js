const PptxGenJS = require('pptxgenjs');
const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_WIDE';
pptx.title = 'Merchant Risk Co-Pilot — G2RS / EverC';
pptx.author = 'PM Case Interview';

// ─── Design tokens — matched to v12 ───
const C = {
  BG:           'F7F7FB',
  BG_CARD:      'FFFFFF',
  PURPLE_DARK:  '1A1A2E',
  PURPLE:       '7C3AED',
  PURPLE_LIGHT: 'EBE8F0',
  INDIGO:       '4F46E5',
  TEAL:         '0D9488',
  TEAL_LIGHT:   'E6F5F0',
  GREEN:        '10B981',
  RED:          'DC2626',
  RED_LIGHT:    'FDE8E8',
  AMBER:        'D97706',
  AMBER_LIGHT:  'FEF3C7',
  BLUE:         '3B82F6',
  BLUE_LIGHT:   'EFF6FF',
  GRAY_TEXT:    '666666',
  GRAY_DIM:     'AAAAAA',
  GRAY_LIGHT:   'FAF9FD',
  GRAY_BORDER:  'EBE8F0',
  WHITE:        'FFFFFF',
  MUTED_LAV:    'C4B5FD',
  CLOSING_BG:   '1A1A2E',
};

const FONT = 'Poppins';
const MARGIN = 0.55;
const CONTENT_W = 12.23; // 13.33 - 2*0.55

// ─── Helpers ───
function addSectionLabel(slide, text) {
  slide.addText(text, {
    x: MARGIN, y: 0.38, w: 6, h: 0.22,
    fontSize: 9, fontFace: FONT, color: C.PURPLE,
    bold: true, charSpacing: 2, valign: 'top',
  });
}

function addHeadline(slide, parts, opts = {}) {
  const y = opts.y || 0.62;
  const sz = opts.fontSize || 38;
  const w = opts.w || CONTENT_W;
  const textParts = parts.map(p => ({
    text: p.text,
    options: {
      fontSize: sz, fontFace: FONT, color: p.color || C.PURPLE_DARK,
      bold: true,
    }
  }));
  slide.addText(textParts, {
    x: opts.x || MARGIN, y, w, h: opts.h || 0.7,
    valign: 'top', paraSpaceAfter: 0,
  });
}

function addCard(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h,
    fill: { color: opts.fill || C.WHITE },
    line: { color: opts.borderColor || C.GRAY_BORDER, width: opts.borderWidth || 0.5 },
    rectRadius: 0.08,
  });
}

function addIconCircle(slide, x, y, d, fillColor) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x, y, w: d, h: d,
    fill: { color: fillColor },
  });
}

function addStatCallout(slide, x, y, w, number, label, numColor, bgColor) {
  addCard(slide, x, y, w, 1.15, { fill: bgColor || C.WHITE });
  slide.addText(number, {
    x, y: y + 0.08, w, h: 0.7,
    fontSize: 52, fontFace: FONT, color: numColor,
    bold: true, align: 'center', valign: 'middle',
  });
  slide.addText(label, {
    x, y: y + 0.78, w, h: 0.3,
    fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
    align: 'center', valign: 'top',
  });
}

function addLeftBorder(slide, x, y, w, h, color) {
  slide.addShape(pptx.ShapeType.rect, {
    x, y, w: w || 0.07, h,
    fill: { color },
  });
}

function drawShieldIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.28;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.45, y: my - s * 0.6, w: s * 0.9, h: s * 1.2,
    fill: { color: C.WHITE },
    rectRadius: 0.02,
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx - s * 0.45, y: my + s * 0.55, w: s * 0.9, h: s * 0.45,
    fill: { color: C.WHITE }, rotate: 180,
  });
}

function drawCheckmark(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.18;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.8, y: my - s * 0.2, w: s * 1.5, h: s * 0.4,
    fill: { color: C.WHITE }, rotate: -40,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.1, y: my - s * 0.9, w: s * 0.4, h: s * 1.8,
    fill: { color: C.WHITE }, rotate: 20,
  });
}

function drawXIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.22;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.15, y: my - s, w: s * 0.3, h: s * 2,
    fill: { color: C.WHITE }, rotate: 45,
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.15, y: my - s, w: s * 0.3, h: s * 2,
    fill: { color: C.WHITE }, rotate: -45,
  });
}

function drawPlusIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.22;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.15, y: my - s * 0.8, w: s * 0.3, h: s * 1.6,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.8, y: my - s * 0.15, w: s * 1.6, h: s * 0.3,
    fill: { color: C.WHITE },
  });
}

function drawPersonIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.13;
  slide.addShape(pptx.ShapeType.ellipse, {
    x: mx - s, y: my - s * 2, w: s * 2, h: s * 2,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: mx - s * 1.6, y: my + s * 0.3, w: s * 3.2, h: s * 2,
    fill: { color: C.WHITE },
  });
}

function drawClockIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const r = d * 0.2;
  slide.addShape(pptx.ShapeType.ellipse, {
    x: mx - r, y: my - r, w: r * 2, h: r * 2,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - 0.015, y: my - r * 0.8, w: 0.03, h: r * 0.85,
    fill: { color: fillColor },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx, y: my - 0.015, w: r * 0.6, h: 0.03,
    fill: { color: fillColor },
  });
}

function drawDocIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.2;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.7, y: my - s, w: s * 1.4, h: s * 2,
    fill: { color: C.WHITE },
    rectRadius: 0.01,
  });
}

function drawGroupingIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.13;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 2.2, y: my - s * 1.5, w: s * 1.5, h: s * 0.3,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 2.2, y: my - s * 0.15, w: s * 1.5, h: s * 0.3,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 2.2, y: my + s * 1.2, w: s * 1.5, h: s * 0.3,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.rect, {
    x: mx + s * 0.7, y: my - s * 0.15, w: s * 1.5, h: s * 0.3,
    fill: { color: C.WHITE },
  });
}

function drawStackedLayers(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.16;
  for (let i = 0; i < 3; i++) {
    const off = (i - 1) * s * 0.5;
    slide.addShape(pptx.ShapeType.rect, {
      x: mx - s + off * 0.3, y: my - s * 0.8 + off,
      w: s * 1.8, h: s * 0.5,
      fill: { color: C.WHITE },
      rectRadius: 0.01,
    });
  }
}

function drawChecklistIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.15;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 1.2, y: my - s * 1.5, w: s * 2.4, h: s * 3,
    fill: { color: C.WHITE },
    rectRadius: 0.01,
  });
  for (let i = 0; i < 3; i++) {
    slide.addShape(pptx.ShapeType.rect, {
      x: mx - s * 0.6, y: my - s * 1 + i * s * 0.9, w: s * 1.2, h: s * 0.2,
      fill: { color: fillColor },
    });
  }
}

function drawChatBoltIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.2;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: mx - s, y: my - s * 0.8, w: s * 2, h: s * 1.4,
    fill: { color: C.WHITE },
    rectRadius: 0.02,
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx - s * 0.3, y: my + s * 0.55, w: s * 0.5, h: s * 0.35,
    fill: { color: C.WHITE }, rotate: 180,
  });
}

function drawTrendIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.22;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s, y: my - s * 0.6, w: s * 2, h: s * 0.2,
    fill: { color: C.WHITE }, rotate: -25,
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx + s * 0.5, y: my - s * 1.2, w: s * 0.5, h: s * 0.6,
    fill: { color: C.WHITE },
  });
}

function drawAlertTriangle(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.22;
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx - s, y: my - s * 0.8, w: s * 2, h: s * 1.7,
    fill: { color: C.WHITE },
  });
}

function drawHouseIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.18;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.8, y: my - s * 0.1, w: s * 1.6, h: s * 1.2,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx - s, y: my - s * 1.2, w: s * 2, h: s * 1.1,
    fill: { color: C.WHITE },
  });
}

function drawDownArrow(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.18;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.35, y: my - s * 1, w: s * 0.7, h: s * 1.5,
    fill: { color: C.WHITE },
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx - s, y: my + s * 0.3, w: s * 2, h: s * 0.9,
    fill: { color: C.WHITE }, rotate: 180,
  });
}

function drawQuestionIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  slide.addText('?', {
    x: cx, y: cy, w: d, h: d,
    fontSize: d * 28, fontFace: FONT, color: C.WHITE,
    bold: true, align: 'center', valign: 'middle',
  });
}

function drawGridIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.1;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      slide.addShape(pptx.ShapeType.rect, {
        x: mx - s * 1.8 + c * s * 1.3, y: my - s * 1.8 + r * s * 1.3,
        w: s, h: s,
        fill: { color: C.WHITE },
      });
    }
  }
}

function drawShieldClockIcon(slide, cx, cy, d, fillColor) {
  addIconCircle(slide, cx, cy, d, fillColor);
  const mx = cx + d / 2;
  const my = cy + d / 2;
  const s = d * 0.15;
  slide.addShape(pptx.ShapeType.rect, {
    x: mx - s * 0.8, y: my - s * 1.2, w: s * 1.6, h: s * 1.6,
    fill: { color: C.WHITE }, rectRadius: 0.01,
  });
  slide.addShape(pptx.ShapeType.triangle, {
    x: mx - s * 0.8, y: my + s * 0.35, w: s * 1.6, h: s * 0.8,
    fill: { color: C.WHITE }, rotate: 180,
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: mx + s * 0.3, y: my + s * 0.1, w: s * 1.2, h: s * 1.2,
    fill: { color: fillColor },
  });
  slide.addShape(pptx.ShapeType.ellipse, {
    x: mx + s * 0.45, y: my + s * 0.25, w: s * 0.9, h: s * 0.9,
    fill: { color: C.WHITE },
  });
}

function addBadge(slide, x, y, text, bgColor, textColor, w) {
  const bw = w || (text.length * 0.065 + 0.2);
  slide.addShape(pptx.ShapeType.roundRect, {
    x, y, w: bw, h: 0.22,
    fill: { color: bgColor },
    rectRadius: 0.05,
  });
  slide.addText(text, {
    x, y, w: bw, h: 0.22,
    fontSize: 8, fontFace: FONT, color: textColor,
    bold: true, align: 'center', valign: 'middle',
  });
}

function addRightArrow(slide, x, y, w, h, color) {
  slide.addShape(pptx.ShapeType.rightArrow, {
    x, y, w, h,
    fill: { color },
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 1 — Title
// ═══════════════════════════════════════════════════════════════
function buildSlide1() {
  const slide = pptx.addSlide();
  slide.background = { color: C.PURPLE_DARK };

  drawShieldIcon(slide, 6.17, 1.4, 0.9, C.PURPLE);

  slide.addText('SENIOR PM CASE INTERVIEW  ·  G2RS / EVERC  ·  MARCH 2026', {
    x: 2, y: 2.5, w: 9.33, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.PURPLE,
    bold: true, align: 'center', charSpacing: 2,
  });

  slide.addText('Merchant Risk', {
    x: 2, y: 2.95, w: 9.33, h: 0.8,
    fontSize: 52, fontFace: FONT, color: C.WHITE,
    bold: true, align: 'center',
  });

  slide.addText('Co-Pilot', {
    x: 2, y: 3.7, w: 9.33, h: 0.8,
    fontSize: 52, fontFace: FONT, color: C.PURPLE,
    bold: true, align: 'center',
  });

  slide.addText('G2RS detects violations at scale. This is the missing layer that lets customers act on them.', {
    x: 2.67, y: 4.7, w: 8, h: 0.6,
    fontSize: 16, fontFace: FONT, color: C.MUTED_LAV,
    align: 'center', valign: 'top',
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 2 — The Problem
// ═══════════════════════════════════════════════════════════════
function buildSlide2() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'THE PROBLEM');
  addHeadline(slide, [
    { text: '47 alerts. ', color: C.PURPLE },
    { text: 'Monday morning.', color: C.PURPLE_DARK },
  ]);

  const leftX = MARGIN;
  const leftW = 5.8;
  const rightX = MARGIN + 6.15;
  const rightW = 5.8;
  const topY = 1.45;

  slide.addText('A risk analyst opens their queue. 47 violations across different merchants. No grouping. No order. Just a list.', {
    x: leftX, y: topY, w: leftW, h: 0.6,
    fontSize: 13, fontFace: FONT, color: C.GRAY_TEXT,
  });

  const alerts = [
    { sev: 'CRITICAL', color: C.RED, domain: 'betwin365.com', cat: 'Gambling' },
    { sev: 'CRITICAL', color: C.RED, domain: 'pharmadir.com', cat: 'Prescription' },
    { sev: 'HIGH', color: C.AMBER, domain: 'luxreplica.co', cat: 'Counterfeit' },
    { sev: 'HIGH', color: C.AMBER, domain: 'jackpotstore.io', cat: 'Gambling' },
    { sev: 'MEDIUM', color: C.BLUE, domain: 'cleanmeds.co', cat: 'Prescription' },
    { sev: 'HIGH', color: C.AMBER, domain: 'sportzgear.com', cat: 'Counterfeit' },
  ];

  let cardY = topY + 0.7;
  alerts.forEach(a => {
    addCard(slide, leftX, cardY, leftW, 0.52);
    addLeftBorder(slide, leftX, cardY, 0.07, 0.52, a.color);
    const badgeBg = a.color === C.RED ? C.RED_LIGHT : a.color === C.AMBER ? C.AMBER_LIGHT : C.BLUE_LIGHT;
    addBadge(slide, leftX + 0.18, cardY + 0.15, a.sev, badgeBg, a.color);
    slide.addText(a.domain, {
      x: leftX + 1.15, y: cardY + 0.06, w: 2.2, h: 0.22,
      fontSize: 12, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
    });
    slide.addText(a.cat, {
      x: leftX + 1.15, y: cardY + 0.27, w: 2, h: 0.2,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
    });
    cardY += 0.56;
  });

  const callY = cardY + 0.08;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: leftX, y: callY, w: leftW, h: 0.45,
    fill: { color: C.RED_LIGHT },
    rectRadius: 0.04,
  });
  addLeftBorder(slide, leftX, callY, 0.06, 0.45, C.RED);
  slide.addText('No grouping. No context. Every alert opens cold.', {
    x: leftX + 0.18, y: callY, w: leftW - 0.3, h: 0.45,
    fontSize: 11, fontFace: FONT, color: C.RED, bold: true, italic: true,
    valign: 'middle',
  });

  // Right column stats
  const stats = [
    { num: '47', label: 'unreviewed alerts', color: C.RED, bg: C.WHITE },
    { num: '40–60 min', label: 'per investigation', color: C.AMBER, bg: C.WHITE, sz: 42 },
    { num: '~35 hrs', label: 'to clear this queue', color: C.PURPLE, bg: C.WHITE, sz: 42 },
  ];

  let statY = topY;
  stats.forEach(s => {
    addCard(slide, rightX, statY, rightW, 1.15);
    slide.addText(s.num, {
      x: rightX, y: statY + 0.08, w: rightW, h: 0.65,
      fontSize: s.sz || 60, fontFace: FONT, color: s.color,
      bold: true, align: 'center', valign: 'middle',
    });
    slide.addText(s.label, {
      x: rightX, y: statY + 0.78, w: rightW, h: 0.3,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
      align: 'center',
    });
    statY += 1.25;
  });

  addCard(slide, rightX, statY, rightW, 0.5, { fill: C.PURPLE_LIGHT });
  slide.addText('1 analyst. Fixed capacity.', {
    x: rightX, y: statY, w: rightW, h: 0.5,
    fontSize: 13, fontFace: FONT, color: C.PURPLE_DARK,
    bold: true, align: 'center', valign: 'middle',
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 3 — The Scalability Gap
// ═══════════════════════════════════════════════════════════════
function buildSlide3() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'THE SCALABILITY GAP');
  addHeadline(slide, [
    { text: 'Detection scales. Investigation ', color: C.PURPLE_DARK },
    { text: "doesn't.", color: C.RED },
  ]);

  const flowY = 1.5;
  const boxW = 2.6;
  const boxH = 1.1;
  const gap = 0.2;
  const totalFlowW = boxW * 4 + gap * 3;
  const startX = MARGIN + (CONTENT_W - totalFlowW) / 2;

  const flowBoxes = [
    { icon: 'house', iconColor: C.PURPLE, label: 'Portfolio ↑', labelColor: C.PURPLE_DARK, bg: C.WHITE, border: C.GRAY_BORDER },
    { icon: 'alert', iconColor: C.AMBER, label: 'Alerts ↑', labelColor: C.AMBER, bg: C.WHITE, border: C.GRAY_BORDER },
    { icon: 'doc', iconColor: C.PURPLE, label: 'Investigation ×', labelColor: C.PURPLE_DARK, bg: C.WHITE, border: C.GRAY_BORDER },
    { icon: 'person', iconColor: C.RED, label: 'Capacity FIXED', labelColor: C.RED, bg: C.RED_LIGHT, border: C.RED },
  ];

  flowBoxes.forEach((b, i) => {
    const bx = startX + i * (boxW + gap);
    addCard(slide, bx, flowY, boxW, boxH, { fill: b.bg, borderColor: b.border });

    const iconD = 0.5;
    const iconX = bx + boxW / 2 - iconD / 2;
    const iconY = flowY + 0.12;

    if (b.icon === 'house') drawHouseIcon(slide, iconX, iconY, iconD, b.iconColor);
    else if (b.icon === 'alert') drawAlertTriangle(slide, iconX, iconY, iconD, b.iconColor);
    else if (b.icon === 'doc') drawDocIcon(slide, iconX, iconY, iconD, b.iconColor);
    else if (b.icon === 'person') drawPersonIcon(slide, iconX, iconY, iconD, b.iconColor);

    slide.addText(b.label, {
      x: bx, y: flowY + 0.68, w: boxW, h: 0.35,
      fontSize: 16, fontFace: FONT, color: b.labelColor,
      bold: b.icon === 'person', align: 'center', valign: 'middle',
    });

    if (i < 3) {
      addRightArrow(slide, bx + boxW + 0.02, flowY + boxH / 2 - 0.08, gap - 0.04, 0.16, C.GRAY_TEXT);
    }
  });

  // Callout below flow
  const callY = flowY + boxH + 0.25;
  addCard(slide, MARGIN, callY, CONTENT_W, 0.75, { fill: C.WHITE });
  addLeftBorder(slide, MARGIN, callY, 0.07, 0.75, C.PURPLE);
  slide.addText([
    { text: 'Every true positive becomes a unit of work the customer ', options: { fontSize: 13, fontFace: FONT, color: C.GRAY_TEXT } },
    { text: 'cannot absorb at scale', options: { fontSize: 13, fontFace: FONT, color: C.PURPLE, bold: true } },
    { text: '. The better G2RS works, the worse the problem gets.', options: { fontSize: 13, fontFace: FONT, color: C.GRAY_TEXT } },
  ], {
    x: MARGIN + 0.2, y: callY, w: CONTENT_W - 0.4, h: 0.75,
    valign: 'middle',
  });

  // Two sub-cards
  const subY = callY + 0.9;
  const subW = (CONTENT_W - 0.25) / 2;

  addCard(slide, MARGIN, subY, subW, 1.2, { fill: C.RED_LIGHT });
  drawAlertTriangle(slide, MARGIN + 0.2, subY + 0.15, 0.5, C.RED);
  slide.addText('SLA breach risk', {
    x: MARGIN + 0.8, y: subY + 0.15, w: subW - 1, h: 0.25,
    fontSize: 13, fontFace: FONT, color: C.RED, bold: true,
  });
  slide.addText('Existing customers breach 24–48h response SLAs as alert queues overflow', {
    x: MARGIN + 0.8, y: subY + 0.45, w: subW - 1, h: 0.65,
    fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
  });

  const rightSubX = MARGIN + subW + 0.25;
  addCard(slide, rightSubX, subY, subW, 1.2, { fill: C.AMBER_LIGHT });
  drawDownArrow(slide, rightSubX + 0.2, subY + 0.15, 0.5, C.AMBER);
  slide.addText('Demand suppression', {
    x: rightSubX + 0.8, y: subY + 0.15, w: subW - 1, h: 0.25,
    fontSize: 13, fontFace: FONT, color: C.AMBER, bold: true,
  });
  slide.addText("Customers proactively cap their own portfolio size — they won't onboard more merchants if they can't investigate the alerts", {
    x: rightSubX + 0.8, y: subY + 0.45, w: subW - 1, h: 0.65,
    fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 4 — The Analyst's Day
// ═══════════════════════════════════════════════════════════════
function buildSlide4() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, "THE ANALYST'S DAY");
  addHeadline(slide, [
    { text: 'One alert. ', color: C.PURPLE_DARK },
    { text: '8 steps. ', color: C.PURPLE },
    { text: '40–60 min.', color: C.RED },
  ]);

  const steps = [
    { label: 'Open', sub: 'No context' },
    { label: 'Lookup', sub: '3+ tools' },
    { label: 'ID type', sub: 'Read finding' },
    { label: 'Policy', sub: 'Open AUP' },
    { label: 'Check', sub: 'Guessing' },
    { label: 'Investigate', sub: 'Logs' },
    { label: 'Write', sub: 'Blank page' },
    { label: 'Close', sub: 'Done' },
  ];

  const circD = 0.55;
  const stepGap = (CONTENT_W - steps.length * circD) / (steps.length - 1);
  const stepY = 1.55;

  steps.forEach((s, i) => {
    const cx = MARGIN + i * (circD + stepGap);
    slide.addShape(pptx.ShapeType.ellipse, {
      x: cx, y: stepY, w: circD, h: circD,
      fill: { color: C.PURPLE_LIGHT },
      line: { color: C.PURPLE, width: 1 },
    });
    slide.addText(String(i + 1), {
      x: cx, y: stepY, w: circD, h: circD,
      fontSize: 13, fontFace: FONT, color: C.PURPLE,
      bold: true, align: 'center', valign: 'middle',
    });
    slide.addText(s.label, {
      x: cx - 0.15, y: stepY + circD + 0.05, w: circD + 0.3, h: 0.22,
      fontSize: 10, fontFace: FONT, color: C.PURPLE_DARK,
      bold: true, align: 'center',
    });
    slide.addText(s.sub, {
      x: cx - 0.2, y: stepY + circD + 0.25, w: circD + 0.4, h: 0.2,
      fontSize: 9, fontFace: FONT, color: C.GRAY_TEXT,
      italic: true, align: 'center',
    });

    if (i < steps.length - 1) {
      const lineX1 = cx + circD + 0.02;
      const lineX2 = cx + circD + stepGap - 0.02;
      slide.addShape(pptx.ShapeType.line, {
        x: lineX1, y: stepY + circD / 2,
        w: lineX2 - lineX1, h: 0,
        line: { color: C.GRAY_BORDER, width: 0.5 },
      });
    }
  });

  // 3 stat callout cards
  const statY = 3.0;
  const statW = (CONTENT_W - 0.4) / 3;

  const statCards = [
    { num: '40–60', label: 'minutes per alert', color: C.RED },
    { num: '×47', label: 'alerts waiting', color: C.PURPLE },
    { num: '∞', label: 'queue never empties', color: C.GRAY_TEXT },
  ];

  statCards.forEach((s, i) => {
    const sx = MARGIN + i * (statW + 0.2);
    addCard(slide, sx, statY, statW, 1.3);
    slide.addText(s.num, {
      x: sx, y: statY + 0.1, w: statW, h: 0.75,
      fontSize: 60, fontFace: FONT, color: s.color,
      bold: true, align: 'center', valign: 'middle',
    });
    slide.addText(s.label, {
      x: sx, y: statY + 0.9, w: statW, h: 0.3,
      fontSize: 12, fontFace: FONT, color: C.GRAY_TEXT,
      align: 'center',
    });
  });

  // SLA callout bar
  const barY = 4.5;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: MARGIN, y: barY, w: CONTENT_W, h: 0.55,
    fill: { color: C.RED_LIGHT },
    rectRadius: 0.04,
  });
  addLeftBorder(slide, MARGIN, barY, 0.07, 0.55, C.RED);
  slide.addText('Critical & High must close within 24–48h.  47 alerts × 50 min = 39 hours.  One analyst cannot meet SLA. Two cannot either.', {
    x: MARGIN + 0.2, y: barY, w: CONTENT_W - 0.4, h: 0.55,
    fontSize: 12, fontFace: FONT, color: C.RED,
    bold: true, valign: 'middle',
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 5 — Root Cause
// ═══════════════════════════════════════════════════════════════
function buildSlide5() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };

  slide.addText('Alerts arrive ungrouped. Investigation is violation-type-specific.', {
    x: MARGIN, y: 0.7, w: CONTENT_W, h: 0.7,
    fontSize: 32, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
  });

  slide.addText('That mismatch is the bottleneck.', {
    x: MARGIN, y: 1.4, w: CONTENT_W, h: 0.5,
    fontSize: 24, fontFace: FONT, color: C.PURPLE, bold: true,
  });

  const cardW = (CONTENT_W - 0.4) / 3;
  const cardY = 2.2;
  const cardH = 3.0;

  const cards = [
    {
      icon: 'x', iconColor: C.RED,
      title: 'No grouping',
      body: 'Context switches after every case. Gambling → pharma → counterfeit → gambling again. Mental context rebuilt from zero each time.',
    },
    {
      icon: 'checklist', iconColor: C.AMBER,
      title: 'No checklist',
      body: 'Investigation logic rebuilt from scratch every time. The analyst must recall the right policy clause and figure out what to check internally.',
    },
    {
      icon: 'doc', iconColor: C.PURPLE,
      title: 'No context',
      body: 'Merchant history pulled manually from 3+ tools every single case. Nothing is pre-assembled.',
    },
  ];

  cards.forEach((c, i) => {
    const cx = MARGIN + i * (cardW + 0.2);
    addCard(slide, cx, cardY, cardW, cardH);

    const iconD = 0.55;
    const iconX = cx + cardW / 2 - iconD / 2;

    if (c.icon === 'x') drawXIcon(slide, iconX, cardY + 0.25, iconD, c.iconColor);
    else if (c.icon === 'checklist') drawChecklistIcon(slide, iconX, cardY + 0.25, iconD, c.iconColor);
    else if (c.icon === 'doc') drawDocIcon(slide, iconX, cardY + 0.25, iconD, c.iconColor);

    slide.addText(c.title, {
      x: cx + 0.2, y: cardY + 1.0, w: cardW - 0.4, h: 0.3,
      fontSize: 13, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
      align: 'center',
    });

    slide.addText(c.body, {
      x: cx + 0.2, y: cardY + 1.4, w: cardW - 0.4, h: 1.5,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
      lineSpacingMultiple: 1.5, valign: 'top',
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 6 — Before / After Grouping
// ═══════════════════════════════════════════════════════════════
function buildSlide6() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };

  addHeadline(slide, [
    { text: 'Group by type. Load context once. ', color: C.PURPLE_DARK },
    { text: 'Work the batch.', color: C.TEAL },
  ], { y: 0.55 });

  const colW = 5.4;
  const leftX = MARGIN;
  const rightX = MARGIN + colW + 1.43;
  const topY = 1.5;

  // Before badge
  addBadge(slide, leftX, topY - 0.3, 'BEFORE', C.RED_LIGHT, C.RED, 0.8);

  // Before card
  addCard(slide, leftX, topY, colW, 3.4);
  addLeftBorder(slide, leftX, topY, 0.06, 3.4, C.RED);

  const domains = ['betwin365.com', 'pharmadir.com', 'luxreplica.co', 'jackpotstore.io', 'cleanmeds.co', 'sportzgear.com'];
  domains.forEach((d, i) => {
    slide.addText(d, {
      x: leftX + 0.25, y: topY + 0.2 + i * 0.4, w: colW - 0.5, h: 0.3,
      fontSize: 12, fontFace: FONT, color: C.GRAY_TEXT,
    });
  });

  slide.addText('random list, no structure', {
    x: leftX + 0.25, y: topY + 2.8, w: colW - 0.5, h: 0.3,
    fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT, italic: true,
  });

  // Center arrow
  const arrowX = leftX + colW + 0.35;
  addRightArrow(slide, arrowX, topY + 1.5, 0.6, 0.3, C.TEAL);

  // After badge
  addBadge(slide, rightX, topY - 0.3, 'AFTER', C.TEAL_LIGHT, C.TEAL, 0.7);

  // After card
  addCard(slide, rightX, topY, colW, 3.4);
  addLeftBorder(slide, rightX, topY, 0.06, 3.4, C.TEAL);

  const groups = [
    { pill: 'Gambling (2)', pillBg: C.AMBER_LIGHT, pillColor: C.AMBER, desc: 'same checklist' },
    { pill: 'Prescription (2)', pillBg: C.PURPLE_LIGHT, pillColor: C.PURPLE, desc: 'context once' },
    { pill: 'Counterfeit (2)', pillBg: C.TEAL_LIGHT, pillColor: C.TEAL, desc: 'context once' },
  ];

  groups.forEach((g, i) => {
    const gy = topY + 0.3 + i * 0.75;
    addBadge(slide, rightX + 0.25, gy, g.pill, g.pillBg, g.pillColor, 1.4);
    slide.addText(g.desc, {
      x: rightX + 1.8, y: gy, w: colW - 2.2, h: 0.22,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT, valign: 'middle',
    });
  });

  // Teal callout
  const callY = topY + 3.6;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: rightX, y: callY, w: colW, h: 0.65,
    fill: { color: C.TEAL_LIGHT },
    rectRadius: 0.04,
  });
  slide.addText('The analyst becomes a violation-type expert for the session — instead of starting cold on every alert.', {
    x: rightX + 0.15, y: callY, w: colW - 0.3, h: 0.65,
    fontSize: 11, fontFace: FONT, color: C.TEAL,
    bold: true, italic: true, valign: 'middle',
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 7 — Alternatives Considered
// ═══════════════════════════════════════════════════════════════
function buildSlide7() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'ALTERNATIVES CONSIDERED');
  addHeadline(slide, [
    { text: 'Three paths. ', color: C.PURPLE_DARK },
    { text: 'One recommendation.', color: C.PURPLE },
  ]);

  const cardW = 11.8;
  const stripW = 0.6;
  const rowH = 1.45;
  let rowY = 1.45;

  const alts = [
    {
      status: 'REJECTED', statusColor: C.RED, statusBg: C.RED_LIGHT,
      iconDraw: 'x', iconColor: C.RED, contentBg: C.WHITE,
      title: 'Automate Investigation',
      lines: [
        '× Security boundary: banks will not allow third-party access to internal transaction data — full stop.',
        '× Legal liability: customer is legally liable for decisions made about their merchants. Automation removes required human sign-off.',
        '× Wrong problem: removes humans from the loop instead of making human review faster and better.',
      ],
    },
    {
      status: 'COMPLEMENTARY', statusColor: C.AMBER, statusBg: C.AMBER_LIGHT,
      iconDraw: 'plus', iconColor: C.AMBER, contentBg: C.WHITE,
      title: 'Risk-Based Monitoring Tiers',
      lines: [
        '+ Reduces alert volume at source — fewer alerts enter the system',
        '– Reduces count, not per-case effort: each alert still takes 40–60 min regardless',
        '→ Deploy as second layer once Co-Pilot proves workflow efficiency. Sequence matters.',
      ],
    },
    {
      status: 'CHOSEN ✓', statusColor: C.TEAL, statusBg: C.TEAL_LIGHT,
      iconDraw: 'check', iconColor: C.TEAL, contentBg: C.TEAL_LIGHT,
      title: 'Merchant Risk Co-Pilot',
      lines: [
        '✓ Attacks root cause: structural mismatch and blank-slate context',
        '✓ Scales as software — no headcount required on G2RS or customer side',
        '✓ Respects the data boundary entirely — guides analysts, never accesses internal data',
      ],
    },
  ];

  alts.forEach(a => {
    addCard(slide, MARGIN, rowY, cardW, rowH, { fill: a.contentBg });
    // Left color strip
    slide.addShape(pptx.ShapeType.rect, {
      x: MARGIN, y: rowY, w: stripW, h: rowH,
      fill: { color: a.iconColor },
      rectRadius: 0,
    });

    // Icon in strip
    const iconD = 0.4;
    const iconCx = MARGIN + stripW / 2 - iconD / 2;
    const iconCy = rowY + rowH / 2 - iconD / 2;
    if (a.iconDraw === 'x') drawXIcon(slide, iconCx, iconCy, iconD, a.iconColor);
    else if (a.iconDraw === 'plus') drawPlusIcon(slide, iconCx, iconCy, iconD, a.iconColor);
    else if (a.iconDraw === 'check') drawCheckmark(slide, iconCx, iconCy, iconD, a.iconColor);

    // Title
    slide.addText(a.title, {
      x: MARGIN + stripW + 0.2, y: rowY + 0.1, w: 5, h: 0.28,
      fontSize: 13, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
    });

    // Body lines
    a.lines.forEach((line, li) => {
      slide.addText(line, {
        x: MARGIN + stripW + 0.2, y: rowY + 0.4 + li * 0.3, w: cardW - stripW - 2.0, h: 0.3,
        fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT,
      });
    });

    // Status badge
    addBadge(slide, MARGIN + cardW - 1.7, rowY + 0.1, a.status, a.statusBg, a.statusColor, 1.5);

    rowY += rowH + 0.12;
  });

  // 4th row — hire more analysts
  addCard(slide, MARGIN, rowY, cardW, 0.65, { fill: C.GRAY_LIGHT });
  slide.addText("Why not just hire more analysts? Headcount scales linearly with alert volume. It treats the symptom, not the cause. Adding analysts does not make each investigation faster, more accurate, or SLA-compliant.", {
    x: MARGIN + 0.2, y: rowY, w: cardW - 2.2, h: 0.65,
    fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT, italic: true,
    valign: 'middle',
  });
  addBadge(slide, MARGIN + cardW - 1.7, rowY + 0.22, 'ALSO REJECTED', C.GRAY_BORDER, C.GRAY_TEXT, 1.5);
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 8 — The Solution
// ═══════════════════════════════════════════════════════════════
function buildSlide8() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'THE SOLUTION');
  addHeadline(slide, [
    { text: 'Four layers. ', color: C.PURPLE_DARK },
    { text: 'Each one ', color: C.PURPLE_DARK },
    { text: 'compounds.', color: C.TEAL },
  ]);

  const cardW = (CONTENT_W - 0.6) / 4;
  const cardY = 1.55;
  const cardH = 3.6;

  const layers = [
    {
      num: '1', icon: 'grouping', iconColor: C.PURPLE,
      title: 'Violation-type grouping',
      desc: 'Groups 47 random alerts into batches by violation type',
      mech: 'Eliminates context switching entirely',
    },
    {
      num: '2', icon: 'stacked', iconColor: C.TEAL,
      title: 'Evidence pack',
      desc: 'Pre-assembles Compass Score, EverC signals, merchant history',
      mech: 'G2RS + EverC unified toolbox in action',
    },
    {
      num: '3', icon: 'checklist', iconColor: C.AMBER,
      title: 'Verification checklist',
      desc: 'Tells analyst exactly what internal data to check for this violation type',
      mech: 'Respects data boundary — guides, never accesses',
    },
    {
      num: '4', icon: 'chatbolt', iconColor: C.PURPLE,
      title: 'AI case summary',
      desc: 'Plain language: who, what pattern. 20 seconds. Analyst edits and signs off.',
      mech: 'AI is advisory only — analyst always verifies',
    },
  ];

  layers.forEach((l, i) => {
    const cx = MARGIN + i * (cardW + 0.2);
    addCard(slide, cx, cardY, cardW, cardH);

    slide.addText(l.num, {
      x: cx, y: cardY + 0.12, w: cardW, h: 0.2,
      fontSize: 9, fontFace: FONT, color: C.GRAY_TEXT, align: 'center',
    });

    const iconD = 0.6;
    const iconX = cx + cardW / 2 - iconD / 2;
    if (l.icon === 'grouping') drawGroupingIcon(slide, iconX, cardY + 0.38, iconD, l.iconColor);
    else if (l.icon === 'stacked') drawStackedLayers(slide, iconX, cardY + 0.38, iconD, l.iconColor);
    else if (l.icon === 'checklist') drawChecklistIcon(slide, iconX, cardY + 0.38, iconD, l.iconColor);
    else if (l.icon === 'chatbolt') drawChatBoltIcon(slide, iconX, cardY + 0.38, iconD, l.iconColor);

    slide.addText(l.title, {
      x: cx + 0.15, y: cardY + 1.1, w: cardW - 0.3, h: 0.45,
      fontSize: 14, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
      align: 'center', valign: 'top',
    });

    slide.addText(l.desc, {
      x: cx + 0.15, y: cardY + 1.6, w: cardW - 0.3, h: 0.8,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
      lineSpacingMultiple: 1.5, align: 'center',
    });

    slide.addText(l.mech, {
      x: cx + 0.15, y: cardY + 2.6, w: cardW - 0.3, h: 0.7,
      fontSize: 10, fontFace: FONT, color: C.PURPLE,
      bold: true, italic: true, align: 'center', valign: 'top',
    });
  });

  // Teal callout bar
  const barY = cardY + cardH + 0.2;
  slide.addShape(pptx.ShapeType.roundRect, {
    x: MARGIN, y: barY, w: CONTENT_W, h: 0.55,
    fill: { color: C.TEAL_LIGHT },
    rectRadius: 0.04,
  });
  slide.addText('The analyst becomes a violation-type expert for the batch — instead of starting cold on every alert.', {
    x: MARGIN + 0.2, y: barY, w: CONTENT_W - 0.4, h: 0.55,
    fontSize: 13, fontFace: FONT, color: C.TEAL,
    bold: true, align: 'center', valign: 'middle',
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 9 — The Transformation
// ═══════════════════════════════════════════════════════════════
function buildSlide9() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'THE TRANSFORMATION');
  addHeadline(slide, [
    { text: 'Same analyst. Same Monday. ', color: C.PURPLE_DARK },
    { text: 'Different outcome.', color: C.TEAL },
  ]);

  const colW = 5.0;
  const leftX = MARGIN;
  const arrowColX = MARGIN + colW + 0.1;
  const rightX = MARGIN + colW + 0.8;
  const topY = 1.65;
  const rowH = 0.52;

  // Without header
  addBadge(slide, leftX, topY - 0.35, 'WITHOUT CO-PILOT', C.RED_LIGHT, C.RED, 1.8);

  const withoutItems = [
    '47 unstructured alerts',
    'Opens cold — no context',
    'Figures out what to check',
    '40–60 min per case',
    'Queue never empties',
  ];

  withoutItems.forEach((item, i) => {
    const iy = topY + i * rowH;
    // X mark
    slide.addText('✕', {
      x: leftX, y: iy, w: 0.3, h: rowH,
      fontSize: 14, fontFace: FONT, color: C.RED,
      bold: true, valign: 'middle', align: 'center',
    });
    slide.addText(item, {
      x: leftX + 0.35, y: iy, w: colW - 0.35, h: rowH,
      fontSize: 12, fontFace: FONT, color: C.GRAY_TEXT, valign: 'middle',
    });

    // Arrow
    addRightArrow(slide, arrowColX, iy + rowH / 2 - 0.06, 0.5, 0.12, C.GRAY_BORDER);
  });

  // With header
  addBadge(slide, rightX, topY - 0.35, 'WITH CO-PILOT', C.TEAL_LIGHT, C.TEAL, 1.5);

  const withItems = [
    '3 batches by violation type',
    'Evidence pack pre-assembled',
    'Checklist: 3 things to verify',
    '8–12 min per case',
    'Queue empty by noon',
  ];

  withItems.forEach((item, i) => {
    const iy = topY + i * rowH;
    slide.addText('✓', {
      x: rightX, y: iy, w: 0.3, h: rowH,
      fontSize: 14, fontFace: FONT, color: C.TEAL,
      bold: true, valign: 'middle', align: 'center',
    });
    slide.addText(item, {
      x: rightX + 0.35, y: iy, w: colW - 0.35, h: rowH,
      fontSize: 12, fontFace: FONT, color: C.PURPLE_DARK, valign: 'middle',
    });
  });

  // Bottom stats
  const statY = 4.6;
  const statW = (CONTENT_W - 0.4) / 3;

  const bottomStats = [
    { num: '3×', label: 'throughput', color: C.PURPLE, bg: C.PURPLE_LIGHT },
    { num: '75%', label: 'time reduction', color: C.TEAL, bg: C.TEAL_LIGHT },
    { num: '0', label: 'new hires needed', color: C.PURPLE_DARK, bg: C.GRAY_LIGHT },
  ];

  bottomStats.forEach((s, i) => {
    const sx = MARGIN + i * (statW + 0.2);
    addCard(slide, sx, statY, statW, 1.3, { fill: s.bg });
    slide.addText(s.num, {
      x: sx, y: statY + 0.1, w: statW, h: 0.7,
      fontSize: 52, fontFace: FONT, color: s.color,
      bold: true, align: 'center', valign: 'middle',
    });
    slide.addText(s.label, {
      x: sx, y: statY + 0.85, w: statW, h: 0.3,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT, align: 'center',
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 10 — MVP
// ═══════════════════════════════════════════════════════════════
function buildSlide10() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'MVP');
  addHeadline(slide, [
    { text: 'Five features. ', color: C.PURPLE_DARK },
    { text: 'Sequenced by ', color: C.PURPLE_DARK },
    { text: 'dependency.', color: C.PURPLE },
  ]);

  const rowW = 11.8;
  const rowH = 0.9;
  let rowY = 1.55;

  const features = [
    {
      numBg: C.PURPLE, icon: 'grouping', iconColor: C.PURPLE,
      title: 'Violation-Type Grouping', badge: 'FOUNDATION', badgeBg: C.TEAL_LIGHT, badgeColor: C.TEAL,
      desc: 'Without this, nothing else delivers full value. Grouping is what makes the evidence pack and checklist meaningful.',
    },
    {
      numBg: C.GRAY_LIGHT, numColor: C.GRAY_TEXT, icon: 'stacked', iconColor: C.TEAL,
      title: 'Evidence Pack', badge: null,
      desc: 'Pre-loads all G2RS + EverC intelligence automatically. Eliminates 3-tool manual lookup.',
    },
    {
      numBg: C.GRAY_LIGHT, numColor: C.GRAY_TEXT, icon: 'chatbolt', iconColor: C.AMBER,
      title: 'AI Case Summary', badge: null,
      desc: 'Plain language, on-demand, 20 seconds. Analyst edits and signs off. AI is advisory only.',
    },
    {
      numBg: C.GRAY_LIGHT, numColor: C.GRAY_TEXT, icon: 'checklist', iconColor: C.PURPLE,
      title: 'Verification Checklist', badge: null,
      desc: 'What internal data to check for this violation type. Respects data boundary — guides, never accesses.',
    },
    {
      numBg: C.GRAY_LIGHT, numColor: C.GRAY_TEXT, icon: 'shieldclock', iconColor: C.RED,
      title: 'Risk-Tier Routing + Decision', badge: null,
      desc: 'Critical/High first. SLA timer visible to analyst. Decision buttons with full audit trail.',
    },
  ];

  features.forEach((f, i) => {
    // Row background
    slide.addShape(pptx.ShapeType.rect, {
      x: MARGIN, y: rowY, w: rowW, h: rowH,
      fill: { color: C.WHITE },
    });
    // Bottom border
    slide.addShape(pptx.ShapeType.line, {
      x: MARGIN, y: rowY + rowH, w: rowW, h: 0,
      line: { color: C.GRAY_BORDER, width: 0.5 },
    });

    // Number circle
    const numD = 0.4;
    slide.addShape(pptx.ShapeType.ellipse, {
      x: MARGIN + 0.15, y: rowY + rowH / 2 - numD / 2,
      w: numD, h: numD,
      fill: { color: f.numBg },
    });
    slide.addText(String(i + 1), {
      x: MARGIN + 0.15, y: rowY + rowH / 2 - numD / 2,
      w: numD, h: numD,
      fontSize: 14, fontFace: FONT, color: i === 0 ? C.WHITE : (f.numColor || C.GRAY_TEXT),
      bold: true, align: 'center', valign: 'middle',
    });

    // Icon circle
    const iconD = 0.4;
    const iconX = MARGIN + 0.7;
    const iconCy = rowY + rowH / 2 - iconD / 2;
    if (f.icon === 'grouping') drawGroupingIcon(slide, iconX, iconCy, iconD, f.iconColor);
    else if (f.icon === 'stacked') drawStackedLayers(slide, iconX, iconCy, iconD, f.iconColor);
    else if (f.icon === 'chatbolt') drawChatBoltIcon(slide, iconX, iconCy, iconD, f.iconColor);
    else if (f.icon === 'checklist') drawChecklistIcon(slide, iconX, iconCy, iconD, f.iconColor);
    else if (f.icon === 'shieldclock') drawShieldClockIcon(slide, iconX, iconCy, iconD, f.iconColor);

    // Title
    slide.addText(f.title, {
      x: MARGIN + 1.25, y: rowY + 0.08, w: 3.5, h: 0.3,
      fontSize: 14, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
    });

    // Badge
    if (f.badge) {
      addBadge(slide, MARGIN + 4.85, rowY + 0.12, f.badge, f.badgeBg, f.badgeColor, 1.2);
    }

    // Description
    slide.addText(f.desc, {
      x: MARGIN + 1.25, y: rowY + 0.4, w: rowW - 1.7, h: 0.45,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
    });

    rowY += rowH + 0.05;
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 11 — Customer Segments
// ═══════════════════════════════════════════════════════════════
function buildSlide11() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'CUSTOMER SEGMENTS');
  addHeadline(slide, [
    { text: 'Same platform. ', color: C.PURPLE_DARK },
    { text: 'Different ', color: C.PURPLE_DARK },
    { text: 'lever.', color: C.AMBER },
  ]);

  const cardW = (CONTENT_W - 0.6) / 4;
  const cardY = 1.55;
  const cardH = 4.0;

  const segments = [
    {
      icon: 'trend', iconColor: C.PURPLE,
      name: 'Growing PayFac', nameColor: C.PURPLE,
      pain: 'Alert volume overwhelming',
      lever: 'Grouping',
      phase: 'MVP', phaseBg: C.TEAL_LIGHT, phaseColor: C.TEAL,
    },
    {
      icon: 'shield', iconColor: C.TEAL,
      name: 'Established Acquirer', nameColor: C.TEAL,
      pain: 'SLA breach risk',
      lever: 'Evidence pack + SLA timer',
      phase: 'MVP', phaseBg: C.TEAL_LIGHT, phaseColor: C.TEAL,
    },
    {
      icon: 'question', iconColor: C.AMBER,
      name: 'Risk-Averse Prospect', nameColor: C.AMBER,
      pain: 'Fear of adoption',
      lever: 'Structured workflow reduces uncertainty',
      phase: 'PHASE 2', phaseBg: C.AMBER_LIGHT, phaseColor: C.AMBER,
    },
    {
      icon: 'grid', iconColor: C.PURPLE,
      name: 'Marketplace', nameColor: C.PURPLE,
      pain: 'Millions of sellers',
      lever: 'Full automation layer',
      phase: 'PHASE 3', phaseBg: C.PURPLE_LIGHT, phaseColor: C.PURPLE,
    },
  ];

  segments.forEach((s, i) => {
    const cx = MARGIN + i * (cardW + 0.2);
    addCard(slide, cx, cardY, cardW, cardH);

    const iconD = 0.55;
    const iconX = cx + cardW / 2 - iconD / 2;
    if (s.icon === 'trend') drawTrendIcon(slide, iconX, cardY + 0.25, iconD, s.iconColor);
    else if (s.icon === 'shield') drawShieldIcon(slide, iconX, cardY + 0.25, iconD, s.iconColor);
    else if (s.icon === 'question') drawQuestionIcon(slide, iconX, cardY + 0.25, iconD, s.iconColor);
    else if (s.icon === 'grid') drawGridIcon(slide, iconX, cardY + 0.25, iconD, s.iconColor);

    slide.addText(s.name, {
      x: cx + 0.15, y: cardY + 1.0, w: cardW - 0.3, h: 0.3,
      fontSize: 14, fontFace: FONT, color: s.nameColor, bold: true,
      align: 'center',
    });

    slide.addText(s.pain, {
      x: cx + 0.15, y: cardY + 1.4, w: cardW - 0.3, h: 0.4,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT, align: 'center',
    });

    slide.addText([
      { text: 'Lever: ', options: { fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT } },
      { text: s.lever, options: { fontSize: 11, fontFace: FONT, color: C.PURPLE_DARK, bold: true } },
    ], {
      x: cx + 0.15, y: cardY + 1.9, w: cardW - 0.3, h: 0.6,
      align: 'center',
    });

    // Phase badge at bottom
    addBadge(slide, cx + cardW / 2 - 0.5, cardY + cardH - 0.45, s.phase, s.phaseBg, s.phaseColor, 1.0);
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 12 — Execution Phases
// ═══════════════════════════════════════════════════════════════
function buildSlide12() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'EXECUTION');
  addHeadline(slide, [
    { text: 'Four phases. ', color: C.PURPLE_DARK },
    { text: 'Gated by signal', color: C.PURPLE_DARK },
    { text: ' — not date.', color: C.PURPLE },
  ]);

  const cardW = (CONTENT_W - 0.6) / 4;
  const cardY = 1.55;
  const cardH = 4.5;

  const phases = [
    {
      strip: C.GRAY_BORDER, label: 'PHASE 0', name: 'Discover', duration: '4–6 weeks',
      goal: 'Shadow analysts, capture baseline metrics, confirm investigation time per violation type, commit 2–3 design partners',
      gate: 'Partners committed + baselines captured',
    },
    {
      strip: C.PURPLE_LIGHT, label: 'PHASE 1', name: 'MVP', duration: '3–4 months',
      goal: '5 core features, design partners only. Prove grouping reduces investigation time.',
      gate: 'Measurable time reduction confirmed',
    },
    {
      strip: C.TEAL_LIGHT, label: 'PHASE 2', name: 'Deepen', duration: '4–6 months',
      goal: 'AI insights, remediation workflow, feedback loop, broader rollout',
      gate: 'Screening requests rising per customer',
    },
    {
      strip: C.TEAL, label: 'PHASE 3', name: 'Scale', duration: 'Ongoing',
      goal: 'Full rollout, distinct pricing tier, compounding feedback loop',
      gate: 'Portfolio expansion confirmed',
    },
  ];

  phases.forEach((p, i) => {
    const cx = MARGIN + i * (cardW + 0.2);
    addCard(slide, cx, cardY, cardW, cardH);

    // Top colored strip
    slide.addShape(pptx.ShapeType.rect, {
      x: cx, y: cardY, w: cardW, h: 0.15,
      fill: { color: p.strip },
    });

    slide.addText(p.label, {
      x: cx + 0.15, y: cardY + 0.3, w: cardW - 0.3, h: 0.2,
      fontSize: 9, fontFace: FONT, color: C.GRAY_TEXT, bold: true,
    });

    slide.addText(p.name, {
      x: cx + 0.15, y: cardY + 0.55, w: cardW - 0.3, h: 0.35,
      fontSize: 16, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
    });

    slide.addText(p.duration, {
      x: cx + 0.15, y: cardY + 0.9, w: cardW - 0.3, h: 0.22,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
    });

    slide.addText(p.goal, {
      x: cx + 0.15, y: cardY + 1.2, w: cardW - 0.3, h: 1.6,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
      lineSpacingMultiple: 1.5, valign: 'top',
    });

    // Gate strip
    const gateY = cardY + cardH - 0.85;
    slide.addShape(pptx.ShapeType.rect, {
      x: cx + 0.01, y: gateY, w: cardW - 0.02, h: 0.75,
      fill: { color: C.GRAY_LIGHT },
    });
    slide.addText([
      { text: 'Gate: ', options: { fontSize: 10, fontFace: FONT, color: C.PURPLE, bold: true } },
      { text: p.gate, options: { fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT, italic: true } },
    ], {
      x: cx + 0.15, y: gateY + 0.05, w: cardW - 0.3, h: 0.65,
      valign: 'top',
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 13 — Resources & Effort
// ═══════════════════════════════════════════════════════════════
function buildSlide13() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'RESOURCES & EFFORT');
  addHeadline(slide, [
    { text: 'What the build requires. ', color: C.PURPLE_DARK },
    { text: 'Phased, lean, right-sized.', color: C.TEAL },
  ]);

  const headerRow = [
    { text: 'Role', options: { fontSize: 10, fontFace: FONT, color: C.WHITE, bold: true, fill: { color: C.PURPLE_DARK }, align: 'left', valign: 'middle' } },
    { text: 'Phase 0\n(4–6 wk)', options: { fontSize: 10, fontFace: FONT, color: C.WHITE, bold: true, fill: { color: C.PURPLE_DARK }, align: 'center', valign: 'middle' } },
    { text: 'Phase 1 MVP\n(3–4 mo)', options: { fontSize: 10, fontFace: FONT, color: C.WHITE, bold: true, fill: { color: C.PURPLE_DARK }, align: 'center', valign: 'middle' } },
    { text: 'Phase 2 Deepen\n(4–6 mo)', options: { fontSize: 10, fontFace: FONT, color: C.WHITE, bold: true, fill: { color: C.PURPLE_DARK }, align: 'center', valign: 'middle' } },
    { text: 'Phase 3 Scale\n(ongoing)', options: { fontSize: 10, fontFace: FONT, color: C.WHITE, bold: true, fill: { color: C.PURPLE_DARK }, align: 'center', valign: 'middle' } },
  ];

  const dataRows = [
    ['Product Manager', '1 (full)', '1 (full)', '1 (full)', '1 (full)'],
    ['UX Designer', '0.5', '0.5', '1 (full)', '0.5'],
    ['Backend Engineers', '—', '4–5', '5–6', '4–5'],
    ['Frontend Engineers', '—', '2', '2–3', '2'],
    ['Data / ML Engineer', '—', '1–2', '2', '1–2'],
    ['QA Engineer', '—', '1', '1', '1'],
    ['Solutions Engineer', '0.5 (shared)', '0.5 (shared)', '0.5 (shared)', '0.5 (shared)'],
  ];

  const rows = [headerRow];
  dataRows.forEach((dr, ri) => {
    const row = dr.map((cell, ci) => ({
      text: cell,
      options: {
        fontSize: 11, fontFace: FONT,
        color: C.PURPLE_DARK,
        fill: { color: ri % 2 === 0 ? C.GRAY_LIGHT : C.WHITE },
        align: ci === 0 ? 'left' : 'center',
        valign: 'middle',
      },
    }));
    rows.push(row);
  });

  slide.addTable(rows, {
    x: MARGIN, y: 1.5, w: 11.8,
    colW: [2.8, 2.0, 2.0, 2.5, 2.5],
    border: { type: 'solid', color: C.GRAY_BORDER, pt: 0.5 },
    rowH: [0.42, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36, 0.36],
    autoPage: false,
  });

  // Summary cards
  const summY = 4.7;
  const summW = (CONTENT_W - 0.6) / 4;

  const summaries = [
    { num: '~0.5 FTE', label: 'Phase 0 · discovery only', numColor: C.GRAY_TEXT, bg: C.GRAY_LIGHT },
    { num: '~8–9 FTE', label: 'Phase 1 · design partners', numColor: C.PURPLE, bg: C.PURPLE_LIGHT },
    { num: '~10–11 FTE', label: 'Phase 2 · GA prep', numColor: C.TEAL, bg: C.TEAL_LIGHT },
    { num: '~8–9 FTE', label: 'Phase 3 · steady state', numColor: C.GRAY_TEXT, bg: C.GRAY_LIGHT },
  ];

  summaries.forEach((s, i) => {
    const sx = MARGIN + i * (summW + 0.2);
    addCard(slide, sx, summY, summW, 0.85, { fill: s.bg });
    slide.addText(s.num, {
      x: sx, y: summY + 0.05, w: summW, h: 0.45,
      fontSize: 28, fontFace: FONT, color: s.numColor,
      bold: true, align: 'center', valign: 'middle',
    });
    slide.addText(s.label, {
      x: sx, y: summY + 0.5, w: summW, h: 0.28,
      fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT,
      align: 'center',
    });
  });

  // Footnote
  slide.addText('FTE estimates include fractional shared roles. Team scales down in Scale phase as automation and tooling mature.', {
    x: MARGIN, y: summY + 1.0, w: CONTENT_W, h: 0.25,
    fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT, italic: true,
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 14 — Metrics
// ═══════════════════════════════════════════════════════════════
function buildSlide14() {
  const slide = pptx.addSlide();
  slide.background = { color: C.BG };
  addSectionLabel(slide, 'METRICS');
  addHeadline(slide, [
    { text: 'One north star. One guardrail. ', color: C.PURPLE_DARK },
    { text: 'One growth signal.', color: C.TEAL },
  ]);

  const cardW = (CONTENT_W - 0.4) / 3;
  const cardY = 1.55;
  const cardH = 4.8;

  const metrics = [
    {
      icon: 'clock', iconColor: C.PURPLE,
      cat: 'NORTH STAR', catColor: C.PURPLE,
      name: 'Alerts per analyst / week',
      desc: "Direct expression of 'more with less.' If this moves, the Co-Pilot is working.",
      how: 'Case open → decision timestamp, tracked per analyst in G2RS',
      baseline: '~15–20 alerts/week (Phase 0)',
      target: '>40 alerts/week (Phase 1 exit)',
      accent: C.PURPLE,
    },
    {
      icon: 'shield', iconColor: C.AMBER,
      cat: 'GUARDRAIL', catColor: C.AMBER,
      name: 'Decision time by tier',
      desc: 'Speed gains must not come at the cost of SLA discipline or decision quality.',
      how: 'Both timestamps owned by G2RS — no dependency on customer systems',
      baseline: 'Critical <24h, High <48h (Ishai confirmed)',
      target: 'SLA breach rate <5%',
      accent: C.AMBER,
    },
    {
      icon: 'trend', iconColor: C.TEAL,
      cat: 'GROWTH SIGNAL', catColor: C.TEAL,
      name: 'Screening requests ↑',
      desc: 'If customers self-limited before, this rises as Co-Pilot gives them confidence.',
      how: 'G2RS API call volume, baseline established in Phase 0',
      baseline: 'Current rate per customer (Phase 0)',
      target: '30–50% increase within 12 months of Phase 1 launch',
      accent: C.TEAL,
    },
  ];

  metrics.forEach((m, i) => {
    const cx = MARGIN + i * (cardW + 0.2);
    addCard(slide, cx, cardY, cardW, cardH);

    const iconD = 0.55;
    const iconX = cx + cardW / 2 - iconD / 2;
    if (m.icon === 'clock') drawClockIcon(slide, iconX, cardY + 0.2, iconD, m.iconColor);
    else if (m.icon === 'shield') drawShieldIcon(slide, iconX, cardY + 0.2, iconD, m.iconColor);
    else if (m.icon === 'trend') drawTrendIcon(slide, iconX, cardY + 0.2, iconD, m.iconColor);

    slide.addText(m.cat, {
      x: cx + 0.2, y: cardY + 0.9, w: cardW - 0.4, h: 0.2,
      fontSize: 9, fontFace: FONT, color: m.catColor,
      bold: true, align: 'center',
    });

    slide.addText(m.name, {
      x: cx + 0.2, y: cardY + 1.15, w: cardW - 0.4, h: 0.35,
      fontSize: 16, fontFace: FONT, color: C.PURPLE_DARK, bold: true,
      align: 'center',
    });

    slide.addText(m.desc, {
      x: cx + 0.2, y: cardY + 1.55, w: cardW - 0.4, h: 0.7,
      fontSize: 11, fontFace: FONT, color: C.GRAY_TEXT,
      lineSpacingMultiple: 1.5, align: 'center',
    });

    // Divider
    slide.addShape(pptx.ShapeType.line, {
      x: cx + 0.3, y: cardY + 2.35, w: cardW - 0.6, h: 0,
      line: { color: C.GRAY_BORDER, width: 0.5 },
    });

    // How measured
    slide.addText([
      { text: 'How measured: ', options: { fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT, bold: true } },
      { text: m.how, options: { fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT } },
    ], {
      x: cx + 0.2, y: cardY + 2.45, w: cardW - 0.4, h: 0.6,
      valign: 'top',
    });

    // Baseline
    slide.addText([
      { text: 'Baseline: ', options: { fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT } },
      { text: m.baseline, options: { fontSize: 10, fontFace: FONT, color: C.PURPLE_DARK } },
    ], {
      x: cx + 0.2, y: cardY + 3.15, w: cardW - 0.4, h: 0.35,
      valign: 'top',
    });

    // Target
    slide.addText([
      { text: 'Target: ', options: { fontSize: 10, fontFace: FONT, color: C.GRAY_TEXT } },
      { text: m.target, options: { fontSize: 10, fontFace: FONT, color: C.TEAL, bold: true } },
    ], {
      x: cx + 0.2, y: cardY + 3.5, w: cardW - 0.4, h: 0.35,
      valign: 'top',
    });

    // Bottom accent bar
    slide.addShape(pptx.ShapeType.rect, {
      x: cx, y: cardY + cardH - 0.06, w: cardW, h: 0.06,
      fill: { color: m.accent },
    });
  });
}

// ═══════════════════════════════════════════════════════════════
// SLIDE 15 — Closing
// ═══════════════════════════════════════════════════════════════
function buildSlide15() {
  const slide = pptx.addSlide();
  slide.background = { color: C.PURPLE_DARK };

  const centerW = 10;
  const cx = (13.33 - centerW) / 2;

  slide.addText("Without the Co-Pilot, G2RS growth is capped by", {
    x: cx, y: 1.5, w: centerW, h: 0.4,
    fontSize: 22, fontFace: FONT, color: C.MUTED_LAV,
    align: 'center',
  });

  slide.addText("its customers' analyst capacity.", {
    x: cx, y: 1.9, w: centerW, h: 0.4,
    fontSize: 22, fontFace: FONT, color: C.WHITE,
    align: 'center',
  });

  slide.addText('With it, a customer with 100,000 merchants', {
    x: cx, y: 2.65, w: centerW, h: 0.4,
    fontSize: 22, fontFace: FONT, color: C.MUTED_LAV,
    align: 'center',
  });

  slide.addText('can monitor all of them — and ask G2RS to send more.', {
    x: cx, y: 3.05, w: centerW, h: 0.4,
    fontSize: 22, fontFace: FONT, color: C.WHITE,
    align: 'center',
  });

  // Divider line
  slide.addShape(pptx.ShapeType.line, {
    x: (13.33 - 2) / 2, y: 3.8, w: 2, h: 0,
    line: { color: C.PURPLE, width: 1 },
  });

  slide.addText("That's what scalability means.", {
    x: cx, y: 4.1, w: centerW, h: 0.6,
    fontSize: 36, fontFace: FONT, color: C.PURPLE,
    bold: true, align: 'center', valign: 'middle',
  });

  slide.addText('MERCHANT RISK CO-PILOT  ·  G2RS / EVERC  ·  MARCH 2026', {
    x: cx, y: 5.3, w: centerW, h: 0.3,
    fontSize: 9, fontFace: FONT, color: C.MUTED_PURPLE,
    align: 'center', charSpacing: 2,
  });
}

// ═══════════════════════════════════════════════════════════════
// BUILD ALL
// ═══════════════════════════════════════════════════════════════
buildSlide1();
buildSlide2();
buildSlide3();
buildSlide4();
buildSlide5();
buildSlide6();
buildSlide7();
buildSlide8();
buildSlide9();
buildSlide10();
buildSlide11();
buildSlide12();
buildSlide13();
buildSlide14();
buildSlide15();

pptx.writeFile({ fileName: 'G2RS_CoPilot_Deck_v13.pptx' })
  .then(() => console.log('✅ G2RS_CoPilot_Deck_v13.pptx created successfully'))
  .catch(err => console.error('Error:', err));
