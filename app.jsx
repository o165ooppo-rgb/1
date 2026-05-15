// Mōne — Identity Manual

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "beurre"
}/*EDITMODE-END*/;

const PALETTES = {
  beurre: {
    label: "Beurre",
    desc: "Тёплая нейтральная — взбитое масло, песчаник, чернила.",
    bg: "#F2EDE4", ink: "#0E0E0E", moka: "#7B6A56", sable: "#C6AE89", paper: "#FAF7F0",
    pms: { bg: "PMS 7527", ink: "PMS Black 6", moka: "PMS 7531", sable: "PMS 4525" },
  },
  pierre: {
    label: "Pierre",
    desc: "Парижский камень — холодный нейтрал, графит, дымка.",
    bg: "#ECE9E2", ink: "#1A1A1F", moka: "#6E6A63", sable: "#BFBAB1", paper: "#F5F2EB",
    pms: { bg: "PMS Warm Gray 1", ink: "PMS 426", moka: "PMS 405", sable: "PMS Warm Gray 4" },
  },
  bordeaux: {
    label: "Bordeaux",
    desc: "Винный акцент по тёплому крему — вечерняя терраса.",
    bg: "#F4EFE6", ink: "#1B1416", moka: "#6B1F2A", sable: "#D8B6A8", paper: "#FBF6EC",
    pms: { bg: "PMS 7527", ink: "PMS Black 6", moka: "PMS 1817", sable: "PMS 5025" },
  },
  sauge: {
    label: "Sauge",
    desc: "Шалфейная зелень, овсяный фон, чернильные акценты.",
    bg: "#F1EEE3", ink: "#14140F", moka: "#5C6B53", sable: "#D4C9B0", paper: "#F9F5EA",
    pms: { bg: "PMS 7527", ink: "PMS Black 6", moka: "PMS 5615", sable: "PMS 4685" },
  },
};
const PAL_OPTIONS = Object.keys(PALETTES);

function hexA(hex, a){
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}
function hexToCMYK(hex){
  const h = hex.replace('#','');
  let r = parseInt(h.slice(0,2),16)/255, g = parseInt(h.slice(2,4),16)/255, b = parseInt(h.slice(4,6),16)/255;
  const k = 1 - Math.max(r,g,b);
  const c = k===1 ? 0 : (1 - r - k)/(1 - k);
  const m = k===1 ? 0 : (1 - g - k)/(1 - k);
  const y = k===1 ? 0 : (1 - b - k)/(1 - k);
  return [c,m,y,k].map(v => Math.round(v*100));
}
function hexToRGB(hex){
  const h = hex.replace('#','');
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function applyPalette(key){
  const p = PALETTES[key] || PALETTES.beurre;
  const r = document.documentElement.style;
  r.setProperty('--bg', p.bg);
  r.setProperty('--ink', p.ink);
  r.setProperty('--moka', p.moka);
  r.setProperty('--sable', p.sable);
  r.setProperty('--paper', p.paper);
  r.setProperty('--hairline', hexA(p.ink, .16));
  r.setProperty('--mute', hexA(p.ink, .55));
  r.setProperty('--muteW', hexA(p.paper, .55));
}

// ── Wordmark with macron ─────────────────────────────────────────────────────
function MoneWord({style={}}){
  // Italiana wordmark with custom macron over o
  return (
    <span className="wm" style={style}>
      M
      <span style={{position:'relative', display:'inline-block'}}>
        <span style={{
          position:'absolute',
          left:'14%', right:'14%',
          top:'.10em',
          height:'.045em',
          background:'currentColor',
          borderRadius:'1px',
        }}></span>
        o
      </span>
      ne
    </span>
  );
}

function MonogramM({size=200, color='currentColor'}){
  return (
    <span style={{position:'relative', display:'inline-block', fontFamily:"'Italiana',serif", fontWeight:400, fontSize:size, lineHeight:1, color}}>
      <span style={{
        position:'absolute',
        left:'18%', right:'18%',
        top:'.05em',
        height:'.045em',
        background:'currentColor',
        borderRadius:'1px',
      }}></span>
      M
    </span>
  );
}

// Round seal — a thin-line emblem inspired by hallmark / atelier stamps
function Seal({size=240, ink='currentColor', bg='transparent', detailed=true, year="MMXVIII"}){
  const cx = size/2, cy = size/2;
  const rOuter = size*0.48;
  const rInner = size*0.42;
  const rTextOuter = size*0.39;
  const idOuter = `seal-outer-${Math.random().toString(36).slice(2,8)}`;
  const idInner = `seal-inner-${Math.random().toString(36).slice(2,8)}`;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{width:size, height:size, color:ink, overflow:'visible'}}>
      <defs>
        <path id={idOuter} d={`M ${cx - rTextOuter} ${cy} a ${rTextOuter} ${rTextOuter} 0 1 1 ${rTextOuter*2} 0`} fill="none"/>
        <path id={idInner} d={`M ${cx + rTextOuter} ${cy} a ${rTextOuter} ${rTextOuter} 0 1 1 ${-rTextOuter*2} 0`} fill="none"/>
      </defs>
      <circle cx={cx} cy={cy} r={rOuter} fill={bg} stroke={ink} strokeWidth=".6"/>
      <circle cx={cx} cy={cy} r={rInner} fill="none" stroke={ink} strokeWidth=".4" opacity=".55"/>
      {/* Wordmark center */}
      <text x={cx} y={cy + size*0.02} textAnchor="middle" fontFamily="Italiana, serif" fontSize={size*0.32} fill={ink}>Mone</text>
      {/* Macron over the 'o' */}
      <line x1={cx - size*0.04} y1={cy - size*0.13} x2={cx + size*0.045} y2={cy - size*0.13} stroke={ink} strokeWidth={size*0.014} strokeLinecap="round"/>
      {/* Center divider dots */}
      <circle cx={cx - size*0.18} cy={cy + size*0.13} r={size*0.008} fill={ink}/>
      <circle cx={cx + size*0.18} cy={cy + size*0.13} r={size*0.008} fill={ink}/>
      <line x1={cx - size*0.14} y1={cy + size*0.13} x2={cx + size*0.14} y2={cy + size*0.13} stroke={ink} strokeWidth=".6" opacity=".6"/>
      <text x={cx} y={cy + size*0.21} textAnchor="middle" fontFamily="Manrope, sans-serif" fontWeight="600" fontSize={size*0.045} letterSpacing={size*0.012} fill={ink}>CAFÉ · BOULANGERIE</text>

      {detailed && (
        <>
          {/* Top arc text */}
          <text fontFamily="Manrope, sans-serif" fontWeight="600" fontSize={size*0.038} letterSpacing={size*0.022} fill={ink}>
            <textPath href={`#${idOuter}`} startOffset="50%" textAnchor="middle">— MAISON DE CAFÉ —</textPath>
          </text>
          {/* Bottom arc text */}
          <text fontFamily="Manrope, sans-serif" fontWeight="600" fontSize={size*0.038} letterSpacing={size*0.022} fill={ink}>
            <textPath href={`#${idInner}`} startOffset="50%" textAnchor="middle">{`PARIS · ${year} · MSK`}</textPath>
          </text>
          {/* Stars / fleurons */}
          <text x={cx - rTextOuter*0.99} y={cy + size*0.015} textAnchor="middle" fontFamily="Italiana, serif" fontSize={size*0.06} fill={ink}>✦</text>
          <text x={cx + rTextOuter*0.99} y={cy + size*0.015} textAnchor="middle" fontFamily="Italiana, serif" fontSize={size*0.06} fill={ink}>✦</text>
        </>
      )}
    </svg>
  );
}

// ── Layout primitives ───────────────────────────────────────────────────────
function SectionHeader({num, title, desc}){
  return (
    <div className="sec-h">
      <div className="num">§ {num}</div>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

function Folio({n, label}){
  return <div className="folio">{n}<span className="pl">{label}</span></div>;
}

// ── Image bank ─────────────────────────────────────────────────────────────
const IMG = {
  croissants:  "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1800&q=80&auto=format&fit=crop",
  coffeeDark:  "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=1800&q=80&auto=format&fit=crop",
  pour:        "https://images.unsplash.com/photo-1497515114629-f71d768fd07c?w=1800&q=80&auto=format&fit=crop",
  bakery:      "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=1800&q=80&auto=format&fit=crop",
  cupOverhead: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1800&q=80&auto=format&fit=crop",
  bread:       "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1800&q=80&auto=format&fit=crop",
  interior:    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1800&q=80&auto=format&fit=crop",
  marble:      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1800&q=80&auto=format&fit=crop",
  shelves:     "https://images.unsplash.com/photo-1453825012366-d7ce63c5cd80?w=1800&q=80&auto=format&fit=crop",
  hands:       "https://images.unsplash.com/photo-1565299543923-37dd37887442?w=1800&q=80&auto=format&fit=crop",
};

// ── Manifesto ──────────────────────────────────────────────────────────────
function Manifesto(){
  return (
    <section className="manifesto" data-screen-label="02 Manifesto">
      <span className="rule-l"></span>
      <span className="rule-r"></span>
      <div className="meta">— Manifesto · 01 —</div>
      <p className="quote">
        Мы продаём не круассан.<br/>
        Мы продаём <em>тишину</em> между двумя глотками кофе — и звук, с которым<br/>
        ломается слоёное тесто <em>в семь утра.</em>
      </p>
      <div className="attr">Mōne · maison de café & boulangerie · Paris MMXVIII</div>
    </section>
  );
}

// ── Photo essay ────────────────────────────────────────────────────────────
function PhotoEssay(){
  return (
    <section className="frame photo-essay" data-screen-label="03 Photo Essay">
      <Folio n="PL" label="Plate I"/>
      <div className="head">
        <div className="num">Pl. I</div>
        <h2>Photographie</h2>
        <p>Фотография — часть айдентики, не иллюстрация к ней. Никаких пресетов, тёплый натуральный свет, помещение в кадре всегда узнаваемо: латунь, мрамор, кафель.</p>
      </div>
      <div className="pe-grid">
        <div className="pe-photo" style={{gridColumn:'span 8', gridRow:'span 2', minHeight:560}}>
          <img src={IMG.croissants} alt="Croissants au beurre" loading="lazy"/>
          <div className="cap">
            <span>Pl. I-01 · Vitrine matinale</span>
            <span className="r">— Léa Renaud · 06:14</span>
          </div>
        </div>
        <div className="pe-photo" style={{gridColumn:'span 4', minHeight:268}}>
          <img src={IMG.pour} alt="Espresso pour" loading="lazy"/>
          <div className="cap"><span>Pl. I-02 · Espresso</span><span className="r">28 sec</span></div>
        </div>
        <div className="pe-photo" style={{gridColumn:'span 4', minHeight:268}}>
          <img src={IMG.hands} alt="Hands kneading dough" loading="lazy"/>
          <div className="cap"><span>Pl. I-03 · Brioche feuilletée</span><span className="r">05:42</span></div>
        </div>

        <div className="pe-text" style={{gridColumn:'span 4'}}>
          <div>
            <h3>«À six heures, on commence.»</h3>
            <p>Каждое утро на улице Сез, 14 — одна и та же последовательность: фурнило, мельница, опара, кофе. Шесть часов пятнадцать минут до первого гостя. Этот ритм — голос бренда.</p>
          </div>
          <div className="ft"><span>Atelier note</span><span>06:00 · open</span></div>
        </div>
        <div className="pe-photo" style={{gridColumn:'span 4', minHeight:340}}>
          <img src={IMG.cupOverhead} alt="Coffee cup overhead" loading="lazy"/>
          <div className="cap"><span>Pl. I-04 · Latte</span><span className="r">— 240 ml</span></div>
        </div>
        <div className="pe-photo" style={{gridColumn:'span 4', minHeight:340}}>
          <img src={IMG.shelves} alt="Bakery shelves" loading="lazy"/>
          <div className="cap"><span>Pl. I-05 · La vitrine</span><span className="r">11:02</span></div>
        </div>
      </div>
    </section>
  );
}

// ── Big mark spread ────────────────────────────────────────────────────────
function BigMark(){
  return (
    <section className="big-mark grain" data-screen-label="05 Mark Spread">
      <div className="corner-tr">
        Plate II · The Mark
        <span className="vv">at scale 1:1</span>
      </div>
      <div className="topline">
        <span>— LE MOT —</span>
        <span>Italiana · 580pt</span>
        <span>Crème on noir option overleaf</span>
      </div>
      <div style={{lineHeight:.78, textAlign:'left'}}><MoneWord style={{fontSize:'clamp(280px, 38vw, 560px)'}}/></div>
      <div className="footrow">
        <div className="l">«À la maison —<br/>tout est doux.»</div>
        <p>Знак выставлен на максимальном размере — для печатной обложки, плаката формата 70 × 100, витражной плёнки. На крупном кегле макрон работает как фирменное «дыхание» в композиции.</p>
        <p style={{textAlign:'right'}}>Ref. M-01a · v2.0<br/>Approved 12 / 01 / 26<br/>Atelier graphique</p>
      </div>
    </section>
  );
}

// ── Closing ────────────────────────────────────────────────────────────────
function Closing(){
  return (
    <section className="closing" data-screen-label="11 Merci">
      <div className="meta" style={{color:'var(--muteW)',marginBottom:48,letterSpacing:'.2em'}}>— Fin du livre · MMXXVI —</div>
      <p className="mer">Merci.</p>
      <p className="sub">à demain, à six heures.</p>
      <div className="foot" style={{maxWidth:1100,margin:'80px auto 0'}}>
        <span>Mōne · identity manual · v2.0</span>
        <span>14 rue de Sèze · 75009 Paris</span>
        <span>Atelier graphique · MMXXVI</span>
      </div>
    </section>
  );
}

// ── Top ────────────────────────────────────────────────────────────────────
function Top(){
  return (
    <div className="top">
      <div className="left">
        <span>Mōne</span>
        <span>Identity Manual</span>
        <span>Edition 02 · 2026</span>
      </div>
      <div className="right">
        <span>Confidential</span>
        <span>Document 01 / 01</span>
      </div>
    </div>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero(){
  return (
    <section className="frame hero" data-screen-label="01 Cover">
      <Folio n="00" label="Cover"/>
      <div className="hero-tag">
        <span className="l">Maison de café & boulangerie</span>
        <span className="meta">Identity Refresh · Edition 02 · MMXXVI</span>
      </div>
      <div className="hero-row">
        <div className="hero-mark"><MoneWord/></div>
        <Seal size={210} ink="var(--ink)"/>
      </div>
      <div className="hero-sub">
        <div>
          <h3>«La douceur d’une matinée parisienne, servie à la cuillère.»</h3>
          <p>Айдентика отказывается от триколорной кисти. Вместо национального символа — единственный графический акцент: тонкий макрон над «o». Жест, делающий имя узнаваемым на любом носителе — от витрины до восковой печати.</p>
        </div>
        <div>
          <p style={{marginTop:0}}>Документ описывает фирменный знак, конструкцию, систему цвета, типографики и применений. Все спецификации подготовлены к печати: офсет, тиснение фольгой, дебоссинг, гравировка по латуни. Действителен с января 2026.</p>
          <p style={{marginTop:14}}>Дизайн-бюро · atelier graphique · Paris.</p>
        </div>
        <div className="idx">
          <span className="n">§ 01</span> Logo<br/>
          <span className="n">§ 02</span> Construction<br/>
          <span className="n">§ 03</span> Symbol<br/>
          <span className="n">§ 04</span> Colour<br/>
          <span className="n">§ 05</span> Typography<br/>
          <span className="n">§ 06</span> Misuse<br/>
          <span className="n">§ 07</span> Motif<br/>
          <span className="n">§ 08</span> Applications<br/>
          <span className="n">§ 09</span> Voice
        </div>
      </div>
    </section>
  );
}

// ── §01 Logo ───────────────────────────────────────────────────────────────
function LogoSection(){
  return (
    <section className="frame section" data-screen-label="02 Logo">
      <Folio n="01" label="Logo"/>
      <SectionHeader num="01" title="Logo" desc="Один знак, шесть локапов. Каждый — для своей среды: от витрины до фавикона. Никакого нового рисунка — только переписывание иерархии." />
      <div className="lockups">
        <div className="card lockup-card wide grain">
          <span className="corner tl">A · Primary lockup</span>
          <span className="corner tr">Pos. on paper</span>
          <span className="corner br">M-01a · v2.0</span>
          <div className="card-center">
            <div className="lockup-stack">
              <MoneWord style={{fontSize:144}}/>
              <span className="div"></span>
              <span className="sub">Café · Boulangerie</span>
              <span className="sub" style={{opacity:.55,fontSize:9}}>Paris · depuis 2018</span>
            </div>
          </div>
        </div>

        <div className="card lockup-card dark grain">
          <span className="corner tl">B · Reversed</span>
          <span className="corner br">M-01b</span>
          <div className="card-center">
            <div className="lockup-stack">
              <MoneWord style={{fontSize:96, color:'var(--paper)'}}/>
              <span className="div" style={{background:'var(--paper)'}}></span>
              <span className="sub" style={{color:'var(--paper)'}}>Café · Boulangerie</span>
            </div>
          </div>
        </div>

        <div className="card lockup-card wide grain">
          <span className="corner tl">C · Horizontal</span>
          <span className="corner br">M-02</span>
          <div className="card-center">
            <div className="lockup-horiz">
              <MoneWord style={{fontSize:84}}/>
              <span className="div"></span>
              <span className="info">EST.<br/>MMXVIII<br/>PARIS · MSK</span>
            </div>
          </div>
        </div>

        <div className="card lockup-card sable grain">
          <span className="corner tl">D · Monogram</span>
          <span className="corner br">M-03</span>
          <div className="card-center">
            <MonogramM size={200}/>
          </div>
        </div>

        <div className="card lockup-card grain">
          <span className="corner tl">E · Seal</span>
          <span className="corner br">M-04</span>
          <div className="card-center">
            <Seal size={220} ink="var(--ink)" bg="transparent"/>
          </div>
        </div>

        <div className="card lockup-card dark grain">
          <span className="corner tl">F · Avatar</span>
          <span className="corner br">M-05 · 1:1</span>
          <div className="card-center">
            <div style={{width:200,height:200,borderRadius:'50%',background:'var(--paper)',display:'flex',alignItems:'center',justifyContent:'center'}}>
              <MonogramM size={120} color="var(--ink)"/>
            </div>
          </div>
        </div>

        <div className="card lockup-card moka grain">
          <span className="corner tl">G · Wordmark only</span>
          <span className="corner br">M-06</span>
          <div className="card-center">
            <MoneWord style={{fontSize:120, color:'var(--paper)'}}/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── §02 Construction ───────────────────────────────────────────────────────
function ConstructionSection(){
  return (
    <section className="frame section" data-screen-label="03 Construction">
      <Folio n="02" label="Construction"/>
      <SectionHeader num="02" title="Construction" desc="Знак построен на модульной сетке высотой 8 единиц. Макрон — ровно одна единица, расположенная над оптической осью «o». Кернинг M↔o и o↔n намеренно ослаблен для воздушности." />
      <div className="construct">
        <div className="construct-card grain">
          <div className="grid"></div>
          <div className="center">
            <svg viewBox="0 0 720 380" style={{width:'92%', height:'auto'}}>
              {/* Outline guides */}
              <rect x="40" y="60" width="640" height="260" fill="none" stroke="rgba(123,106,86,.5)" strokeWidth="1" strokeDasharray="4 4"/>
              <line x1="40" y1="190" x2="680" y2="190" stroke="rgba(123,106,86,.5)" strokeWidth="1" strokeDasharray="2 4"/>
              {/* Wordmark */}
              <text x="360" y="280" textAnchor="middle" fontFamily="Italiana, serif" fontSize="240" fill="var(--ink)" letterSpacing="2">Mone</text>
              {/* Macron */}
              <line x1="316" y1="110" x2="380" y2="110" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round"/>
              {/* Measurement marks */}
              <line x1="316" y1="100" x2="316" y2="120" stroke="var(--moka)" strokeWidth="1"/>
              <line x1="380" y1="100" x2="380" y2="120" stroke="var(--moka)" strokeWidth="1"/>
              <text x="348" y="92" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="var(--moka)" letterSpacing="1">1u</text>
              {/* H-height marker */}
              <line x1="22" y1="60" x2="22" y2="320" stroke="var(--moka)" strokeWidth="1"/>
              <line x1="16" y1="60" x2="28" y2="60" stroke="var(--moka)" strokeWidth="1"/>
              <line x1="16" y1="320" x2="28" y2="320" stroke="var(--moka)" strokeWidth="1"/>
              <text x="14" y="200" textAnchor="end" fontFamily="JetBrains Mono" fontSize="10" fill="var(--moka)" letterSpacing="1">8u</text>
              {/* Macron offset marker */}
              <line x1="430" y1="110" x2="430" y2="190" stroke="var(--moka)" strokeWidth="1" strokeDasharray="2 3"/>
              <text x="438" y="155" fontFamily="JetBrains Mono" fontSize="10" fill="var(--moka)" letterSpacing="1">offset · 1.4u</text>
              {/* Stem callouts */}
              <text x="170" y="350" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--moka)" letterSpacing="1">— M stem · 0.06u —</text>
              <text x="580" y="350" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" fill="var(--moka)" letterSpacing="1">— terminal · roman —</text>
            </svg>
          </div>
          <span className="annot" style={{top:18,left:24}}>FIG. 01 — Geometry</span>
          <span className="annot" style={{top:18,right:24}}>1u = ⅛ cap-height</span>
          <span className="annot" style={{bottom:18,right:24}}>Reference: M-01a</span>
        </div>

        <div className="construct-spec">
          <div className="row"><span className="k">Typeface</span><span className="v">Italiana 400</span></div>
          <div className="row"><span className="k">Cap-height</span><span className="v">8u</span></div>
          <div className="row"><span className="k">Macron length</span><span className="v">1.05u</span></div>
          <div className="row"><span className="k">Macron offset</span><span className="v">1.4u above x</span></div>
          <div className="row"><span className="k">Tracking</span><span className="v">+12 / 1000</span></div>
          <div className="row"><span className="k">M ↔ o</span><span className="v">−24</span></div>
          <div className="row"><span className="k">o ↔ n</span><span className="v">−18</span></div>
          <div className="row"><span className="k">n ↔ e</span><span className="v">−14</span></div>
          <div className="row"><span className="k">Min. legible</span><span className="v">9 mm</span></div>
          <div className="row"><span className="k">Clear space</span><span className="v">2u all sides</span></div>
        </div>
      </div>
    </section>
  );
}

// ── §03 Symbol (the seal) ──────────────────────────────────────────────────
function SymbolSection(){
  return (
    <section className="frame section" data-screen-label="04 Symbol">
      <Folio n="03" label="Symbol"/>
      <SectionHeader num="03" title="Symbol" desc="Печать — вторичный знак для случаев, где нужен «вес»: упаковка, документ, восковая капля на конверте. Тонколинейная гравюра, четыре вариации." />
      <div className="seals">
        <div className="seal-card grain">
          <span className="corner tl">S-01 · Primary</span>
          <span className="corner bl">Ink · 100%</span>
          <Seal size={220} ink="var(--ink)" bg="transparent"/>
        </div>
        <div className="seal-card dark grain">
          <span className="corner tl" style={{color:'var(--muteW)'}}>S-02 · Reversed</span>
          <span className="corner bl" style={{color:'var(--muteW)'}}>Cream · on noir</span>
          <Seal size={220} ink="var(--paper)" bg="transparent"/>
        </div>
        <div className="seal-card moka grain">
          <span className="corner tl" style={{color:'var(--muteW)'}}>S-03 · Foil</span>
          <span className="corner bl" style={{color:'var(--muteW)'}}>Hot-foil · gold</span>
          <Seal size={220} ink="var(--sable)" bg="transparent"/>
        </div>
        <div className="seal-card sable grain">
          <span className="corner tl">S-04 · Wax</span>
          <span className="corner bl">Production · bordeaux</span>
          <div className="wax">
            <MonogramM size={86} color="#3a0e16"/>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── §04 Colour ─────────────────────────────────────────────────────────────
function PaletteSection({palKey}){
  const p = PALETTES[palKey];
  const swatches = [
    {name:'Crème', cls:'s-cream', bg:p.bg,    code:p.bg,    role:'01 · Background', pms: p.pms.bg,    pct:'60%'},
    {name:'Noir',  cls:'s-ink',   bg:p.ink,   code:p.ink,   role:'02 · Type',       pms: p.pms.ink,   pct:'25%'},
    {name:'Moka',  cls:'s-moka',  bg:p.moka,  code:p.moka,  role:'03 · Accent',     pms: p.pms.moka,  pct:'10%'},
    {name:'Sable', cls:'s-sable', bg:p.sable, code:p.sable, role:'04 · Détail',     pms: p.pms.sable, pct:'5%'},
  ];
  return (
    <section className="frame section" data-screen-label="05 Colour">
      <Folio n="04" label="Colour"/>
      <SectionHeader num="04" title="Colour" desc={`Палитра «${p.label}». ${p.desc} Четыре тона, никаких градиентов. Иерархия 60 · 25 · 10 · 5 — фон, тип, акцент, деталь.`} />
      <div className="palette">
        {swatches.map((s,i)=>{
          const cmyk = hexToCMYK(s.bg);
          const rgb  = hexToRGB(s.bg);
          return (
            <div key={i} className={`swatch ${s.cls}`} style={{background:s.bg}}>
              <span className="role">{s.role} · {s.pct}</span>
              <span className="num">№ 0{i+1}</span>
              <span className="name">{s.name}</span>
              <div className="specs">
                <div className="row"><span>HEX</span><span>{s.code.toUpperCase()}</span></div>
                <div className="row"><span>RGB</span><span>{rgb.join(' · ')}</span></div>
                <div className="row"><span>CMYK</span><span>{cmyk.join(' · ')}</span></div>
                <div className="row"><span>PMS</span><span>{s.pms}</span></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Substrate / production notes */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:24,border:'.5px solid var(--hairline)',borderTop:0}}>
        {[
          {l:'Paper · primary', v:'Munken Pure 120 gsm'},
          {l:'Paper · luxury',  v:'Colorplan Vellum 270'},
          {l:'Foil',            v:'Kurz Luxor 220 Gold'},
          {l:'Facade · RAL',    v:'RAL 9005 Tiefschwarz'},
        ].map((x,i)=>(
          <div key={i} style={{padding:'24px',borderRight: i<3 ? '.5px solid var(--hairline)' : '0',background:'var(--paper)'}}>
            <div className="meta">{x.l}</div>
            <div style={{fontFamily:"'Italiana',serif",fontSize:28,lineHeight:1,marginTop:10}}>{x.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── §05 Typography ─────────────────────────────────────────────────────────
function TypographySection(){
  return (
    <section className="frame section" data-screen-label="06 Typography">
      <Folio n="05" label="Typography"/>
      <SectionHeader num="05" title="Typography" desc="Italiana — для имён и заглавий, единственный голос на витрине. Cormorant Garamond Italic — для подписей и пулл-цитат. Manrope — служебный. JetBrains Mono — метаданные." />
      <div className="type-grid">
        <div className="type-block grain">
          <div className="head">
            <span className="label">T-01 · Display · Italiana 400</span>
            <span className="label">Aa · Mm · 8</span>
          </div>
          <p className="type-sample">À&nbsp;la maison</p>
          <div className="type-spec">
            <span>128 / 122</span><span>tracking +0.2%</span><span>weight 400</span><span>case mixed</span>
          </div>
        </div>
        <div className="type-block grain">
          <div className="head">
            <span className="label">T-02 · Accent · Cormorant Garamond Light Italic</span>
            <span className="label">ff · ct · ß</span>
          </div>
          <p className="type-sample it">tout est doux</p>
          <div className="type-spec">
            <span>108 / 102</span><span>tracking −0.5%</span><span>weight 300</span><span>italic</span>
          </div>
        </div>
      </div>

      <div className="scale">
        {[
          {v:'Aa', s:96, l:'Display · 96 / 1.0', f:"'Italiana',serif"},
          {v:'Aa', s:56, l:'Heading · 56 / 1.05', f:"'Italiana',serif"},
          {v:'Aa', s:28, l:'Subhead · 28 / 1.2',  f:"'Cormorant Garamond',serif", weight:300, italic:true},
          {v:'Aa', s:16, l:'Body · 16 / 1.55',    f:"'Manrope',sans-serif", weight:400},
          {v:'Aa', s:11, l:'Caption · 11 / 1.4',  f:"'JetBrains Mono',monospace"},
        ].map((x,i)=>(
          <div key={i} className="step">
            <span className="v" style={{
              fontSize:x.s,
              fontFamily:x.f,
              fontWeight:x.weight ?? 400,
              fontStyle:x.italic ? 'italic' : 'normal',
            }}>{x.v}</span>
            <span className="l">{x.l}</span>
          </div>
        ))}
      </div>

      <div className="specimen">
        <div className="specimen-card grain">
          <h4>Le matin se boit lentement.</h4>
          <p>Сорта арабики из микро-партий — Эфиопия, Колумбия, Кения. Помол под способ заваривания: V60, эспрессо, шантуш. Каждое утро — новая ферма. Прочесть на витрине, прочесть на этикетке, прочесть в чашке.</p>
          <div className="meta">
            <span>Specimen · ru/fr · 17pt</span><span>Cormorant Garamond</span>
          </div>
        </div>
        <div className="specimen-card grain">
          <h4>The pastry case is read like a menu.</h4>
          <p>Croissant nature. Croissant aux amandes. Pain au chocolat. Kouign-amann. Cannelé bordelais. Tarte du jour. Numbered. Dated. Sold out by noon. Tomorrow at five — we begin again.</p>
          <div className="meta">
            <span>Specimen · en · 17pt</span><span>Cormorant Garamond</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── §06 Do / Don't ─────────────────────────────────────────────────────────
function MisuseSection(){
  const Demo = ({children, no=true}) => (
    <div className="demo">
      {children}
      {no && <span className="strike"></span>}
    </div>
  );
  return (
    <section className="frame section" data-screen-label="07 Misuse">
      <Folio n="06" label="Misuse"/>
      <SectionHeader num="06" title="Misuse" desc="Шесть запретов и одно исключение. Знак не нужно украшать — он уже закончен." />
      <div className="rules">
        <div className="rule grain">
          <span className="marker no">Don't · No 01</span>
          <Demo><MoneWord style={{fontSize:48, fontStyle:'italic'}}/></Demo>
          <span className="cap">Не наклонять. Только roman.</span>
        </div>
        <div className="rule grain">
          <span className="marker no">Don't · No 02</span>
          <Demo><MoneWord style={{fontSize:48, transform:'scaleX(0.7)', display:'inline-block'}}/></Demo>
          <span className="cap">Не сжимать пропорции.</span>
        </div>
        <div className="rule grain">
          <span className="marker no">Don't · No 03</span>
          <Demo>
            <span style={{position:'relative',display:'inline-block'}}>
              <MoneWord style={{fontSize:48}}/>
              <span style={{position:'absolute',inset:0,boxShadow:'0 6px 18px rgba(0,0,0,.45)',pointerEvents:'none'}}></span>
            </span>
          </Demo>
          <span className="cap">Без теней и обводок.</span>
        </div>
        <div className="rule grain">
          <span className="marker no">Don't · No 04</span>
          <Demo>
            <span style={{fontFamily:"'Manrope',sans-serif",fontWeight:700,fontSize:36,letterSpacing:'-.02em'}}>Mōne</span>
          </Demo>
          <span className="cap">Не подменять шрифт. Italiana или ничего.</span>
        </div>
        <div className="rule grain">
          <span className="marker no">Don't · No 05</span>
          <Demo>
            <span style={{display:'inline-block', background:'linear-gradient(90deg,#3a1eff,#fff,#e0244b)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text'}}>
              <MoneWord style={{fontSize:48}}/>
            </span>
          </Demo>
          <span className="cap">Никаких флагов и градиентов.</span>
        </div>
        <div className="rule grain" style={{background:'var(--ink)',color:'var(--paper)'}}>
          <span className="marker yes" style={{color:'var(--sable)'}}>Do · Yes</span>
          <Demo no={false}>
            <MoneWord style={{fontSize:56, color:'var(--paper)'}}/>
          </Demo>
          <span className="cap" style={{color:'var(--muteW)'}}>Reversed, on paper-cream noir. Always with breath.</span>
        </div>
      </div>
    </section>
  );
}

// ── §07 Motif ──────────────────────────────────────────────────────────────
function MotifSection(){
  return (
    <section className="frame section" data-screen-label="08 Motif">
      <Folio n="07" label="Motif"/>
      <SectionHeader num="07" title="Motif" desc="Графический язык построен на одном элементе — макроне. Тонкая горизонтальная черта используется как разделитель, подчёркивание, табличный рулёр и фоновый ритм." />
      <div className="motif-grid">
        <div className="motif-card grain">
          <div className="pad"><span className="meta">P-01 · Macron, primary</span><span className="meta">A</span></div>
          <div className="motif-art">
            <svg viewBox="0 0 600 240" style={{width:'78%'}}>
              <line x1="40" y1="120" x2="560" y2="120" stroke="currentColor" strokeWidth="1.2" />
              <line x1="240" y1="80" x2="360" y2="80" stroke="currentColor" strokeWidth="6" strokeLinecap="round"/>
              <text x="300" y="200" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" letterSpacing="2.5" fill="currentColor" opacity=".55">— THE MARK —</text>
              <text x="80" y="116" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="currentColor" opacity=".4">stroke 1.2</text>
              <text x="400" y="76" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1.5" fill="currentColor" opacity=".4">stroke 6</text>
            </svg>
          </div>
          <div className="pad"><span className="meta">Hairline 1pt · macron 6pt · ratio 1:5</span><span className="meta">↔</span></div>
        </div>
        <div className="motif-card pat-card grain-strong">
          <div className="pad"><span className="meta" style={{color:'var(--muteW)'}}>P-02 · Repeat</span><span className="meta" style={{color:'var(--muteW)'}}>B · ×∞</span></div>
          <div className="pattern">
            {Array.from({length:48}).map((_,i)=>(
              <span key={i} className={i===17 || i===30 ? 'bright' : ''}>
                {i%2===0 ? <MoneWord/> : <span style={{transform:'rotate(180deg)',display:'inline-block'}}><MoneWord/></span>}
              </span>
            ))}
          </div>
          <div className="pad"><span className="meta" style={{color:'var(--muteW)'}}>For lining papers · bag interior</span><span className="meta" style={{color:'var(--muteW)'}}>250 dpi</span></div>
        </div>
      </div>
    </section>
  );
}

// ── §08 Applications ───────────────────────────────────────────────────────
function ApplicationsSection(){
  return (
    <section className="frame section" data-screen-label="09 Applications">
      <Folio n="08" label="Applications"/>
      <SectionHeader num="08" title="Applications" desc="Айдентика на носителях. Каждый предмет — отдельная задача оптики, материала и тиража. Никакого декора, только продакшен-спецификации." />

      {/* In-situ opener */}
      <div className="mock-grid" style={{marginBottom:24}}>
        <div className="insitu" style={{gridColumn:'span 8',minHeight:480}}>
          <img src={IMG.interior} alt="Café interior"/>
          <div className="overlay"></div>
          <div className="label">
            <div className="ti">In situ · 14 rue de Sèze</div>
            <div className="meta">A-00 · interior · 11:18<br/>natural light · 35mm</div>
          </div>
        </div>
        <div className="insitu" style={{gridColumn:'span 4',minHeight:480}}>
          <img src={IMG.marble} alt="Marble counter"/>
          <div className="overlay"></div>
          <div className="label">
            <div className="ti">Marble</div>
            <div className="meta">A-00b<br/>Calacatta · counter</div>
          </div>
        </div>
      </div>

      {/* Stationery row: letterhead + envelope */}
      <div className="mock-grid" style={{marginBottom:24}}>
        <div className="mock grain" style={{gridColumn:'span 7',minHeight:520}}>
          <span className="corner tl">A-01 · Letterhead · A4</span>
          <span className="corner tr">Munken Pure 120 gsm</span>
          <span className="corner br">Offset · 1/0 ink</span>
          <div className="body">
            <div className="letterhead">
              <div>
                <div className="top-row">
                  <MoneWord style={{fontSize:54}}/>
                  <span className="ref">Réf. M-2026/014 · 12 jan</span>
                </div>
                <div style={{marginTop:18,fontFamily:"'JetBrains Mono',monospace",fontSize:8.5,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--mute)'}}>
                  À l’attention de · M. Laurent Bouchard<br/>Quai du Louvre 14, 75001 Paris
                </div>
              </div>
              <div className="body-c">
                <p style={{margin:0}}>Cher Monsieur Bouchard,</p>
                <p>Nous avons le plaisir de vous remettre, en main propre, le devis pour la fourniture quotidienne en viennoiseries — croissants au beurre, pains au chocolat, brioches feuilletées — à compter du premier février prochain.</p>
                <p>Les livraisons s’effectuent à six heures, du mardi au dimanche, dans des cagettes en kraft scellées d’une cire au monogramme.</p>
                <p className="sig">— Léa Renaud, chef pâtissière.</p>
              </div>
              <div className="foot">
                <span>14 rue de Sèze · 75009 Paris</span>
                <span>+33 1 84 21 09 77</span>
                <span>mone.cafe</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 5',minHeight:520}}>
          <span className="corner tl">A-02 · Envelope · DL</span>
          <span className="corner br">Kraft · debossed</span>
          <div className="body">
            <div className="envelope">
              <div className="stamp-pos">
                <MoneWord style={{fontSize:24}}/>
                <span className="ad">14 RUE DE SÈZE · PARIS 9</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliments slip + business cards */}
      <div className="mock-grid" style={{marginBottom:24}}>
        <div className="mock grain" style={{gridColumn:'span 6',minHeight:300}}>
          <span className="corner tl">A-03 · Compliments slip · ⅓ A4</span>
          <span className="corner br">Letterpress · debossed</span>
          <div className="body">
            <div className="comp">
              <div className="l">avec nos<br/><span style={{color:'var(--moka)'}}>compliments,</span></div>
              <div className="r">
                <MoneWord style={{fontSize:36}}/>
                <span className="sb">CAFÉ · BOULANGERIE</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 3', minHeight:300}}>
          <span className="corner tl">A-04 · Card · recto</span>
          <span className="corner br">85 × 50 mm</span>
          <div className="body">
            <div className="bcard">
              <div className="top-r"><span>Mōne</span><span>№ 014</span></div>
              <div className="mark"><MoneWord style={{fontSize:46}}/></div>
              <div className="info">
                <div className="col">
                  <span>Léa Renaud</span>
                  <span style={{color:'var(--moka)'}}>Chef pâtissière</span>
                </div>
                <div className="col r">
                  <span>+33 1 84 21 09 77</span>
                  <span>14 rue de Sèze</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 3', minHeight:300}}>
          <span className="corner tl" style={{color:'var(--muteW)'}}>A-05 · Card · verso</span>
          <span className="corner br" style={{color:'var(--muteW)'}}>Foil · gold</span>
          <div className="body" style={{background:'var(--ink)'}}>
            <div className="bcard back">
              <div className="mark-big" style={{color:'var(--sable)'}}><MoneWord/></div>
            </div>
          </div>
        </div>
      </div>

      {/* Products row 1 */}
      <div className="mock-grid" style={{marginBottom:24}}>
        <div className="mock grain" style={{gridColumn:'span 3', minHeight:480}}>
          <span className="corner tl">A-06 · Cup · 8oz</span>
          <span className="corner br">Single-wall · ink 1c</span>
          <div className="body">
            <div className="cup">
              <div className="lid"></div>
              <div className="sleeve">
                <div className="nm"><MoneWord/></div>
                <div className="sb">Café · Boulangerie</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 3', minHeight:480}}>
          <span className="corner tl">A-07 · Pastry bag</span>
          <span className="corner br">Kraft · sticker label</span>
          <div className="body">
            <div className="bag">
              <div className="crease"></div>
              <div className="label">
                <div className="nm"><MoneWord/></div>
                <div className="div"></div>
                <div className="sb">Boulangerie</div>
                <div className="ad">Paris · depuis 2018</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 3', minHeight:480}}>
          <span className="corner tl">A-08 · Coffee tin · 250g</span>
          <span className="corner br">Tinplate · 1/0</span>
          <div className="body">
            <div className="tin">
              <div className="lbl">
                <div>
                  <div className="nm"><MoneWord/></div>
                </div>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
                  <div className="sb">Single Origin</div>
                  <div className="sub">— Yirgacheffe —</div>
                </div>
                <div className="wt">Net · 250g · 2026</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 3', minHeight:480}}>
          <span className="corner tl">A-09 · Menu · A5</span>
          <span className="corner br">Hiver · 26</span>
          <div className="body">
            <div className="menu">
              <div className="top"><span>La Carte</span><span>Hiver · 26</span></div>
              <div className="mid">
                <div className="nm"><MoneWord/></div>
                <div className="sb">Café · Boulangerie</div>
                <div className="div"></div>
                <div className="it">à la maison, tout est doux</div>
              </div>
              <div className="bot">14 rue de Sèze · Paris 9</div>
            </div>
          </div>
        </div>
      </div>

      {/* Products row 2 */}
      <div className="mock-grid" style={{marginBottom:24}}>
        <div className="mock grain" style={{gridColumn:'span 4', minHeight:440}}>
          <span className="corner tl">A-10 · Macaron box · 12</span>
          <span className="corner br">Sable · foil monogram</span>
          <div className="body">
            <div className="mbox">
              <div className="seal-line"></div>
              <div className="label">
                <MoneWord style={{fontSize:38}}/>
                <span className="sb">— Boîte de 12 —</span>
                <span className="it">macarons de Paris</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mock grain" style={{gridColumn:'span 4', minHeight:440}}>
          <span className="corner tl">A-11 · Brass plate</span>
          <span className="corner br">100 × 200 mm · engraved</span>
          <div className="body">
            <div className="plate">
              <span className="screw tl"></span><span className="screw tr"></span>
              <span className="screw bl"></span><span className="screw br"></span>
              <MoneWord style={{fontSize:40, color:'#3A2C12', textShadow:'-1px -1px 0 rgba(255,255,255,.3), 1px 1px 0 rgba(0,0,0,.3)'}}/>
              <span className="sb">Café · Boulangerie · Depuis 2018</span>
            </div>
          </div>
        </div>

        <div className="mock grain dark" style={{gridColumn:'span 4', minHeight:440}}>
          <span className="corner tl" style={{color:'var(--muteW)'}}>A-12 · Avatar · 1024px</span>
          <span className="corner br" style={{color:'var(--muteW)'}}>Social profile</span>
          <div className="body">
            <div className="avatar">
              <MoneWord style={{color:'var(--paper)'}}/>
            </div>
          </div>
        </div>
      </div>

      {/* Facade row */}
      <div className="mock-grid">
        <div className="mock grain" style={{gridColumn:'span 12', minHeight:520}}>
          <span className="corner tl">A-13 · Facade · 14 rue de Sèze</span>
          <span className="corner tr">RAL 9005 · neon halo · 24h</span>
          <span className="corner br">v2.0 · approved 02/26</span>
          <div className="body">
            <div className="facade">
              <div className="header">
                <span className="corner-l"></span>
                <span className="corner-r"></span>
                <MoneWord style={{fontSize:62, color:'var(--paper)'}}/>
                <span className="sb">Café · Boulangerie</span>
              </div>
              <div className="awning-band"></div>
              <div className="windows">
                <div></div>
                <div className="door"></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── §09 Voice ──────────────────────────────────────────────────────────────
function VoiceSection(){
  return (
    <section className="frame section" data-screen-label="10 Voice">
      <Folio n="09" label="Voice"/>
      <SectionHeader num="09" title="Voice" desc="Тихий, уверенный, ничего лишнего. Французский — для названий и подписи. Русский и английский — для разговора с гостем." />
      <div className="voice-grid">
        <div className="voice-card">
          <div className="head"><span className="ti">Tagline</span><span className="nu">V-01</span></div>
          <p className="ph">À la maison<br/><em>— tout est doux.</em></p>
          <span className="meta">Primary · all touchpoints</span>
        </div>
        <div className="voice-card">
          <div className="head"><span className="ti">Greeting</span><span className="nu">V-02</span></div>
          <p className="ph">Доброе утро.<br/><em>Что подать сегодня?</em></p>
          <span className="meta">Service · never performative</span>
        </div>
        <div className="voice-card">
          <div className="head"><span className="ti">Closing</span><span className="nu">V-03</span></div>
          <p className="ph">Merci,<br/><em>et à demain.</em></p>
          <span className="meta">Receipts · bags · social</span>
        </div>
      </div>
    </section>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Foot(){
  return (
    <footer>
      <div>
        <span className="ti">Manual · v2.0</span>
        <span className="vv">Mōne</span>
      </div>
      <div>
        <span className="ti">Edition</span>
        02 · Janvier 2026
      </div>
      <div>
        <span className="ti">Atelier</span>
        Studio graphique<br/>Paris · MSK
      </div>
      <div>
        <span className="ti">Production</span>
        Munken Pure 120 gsm<br/>Print · Lecaux, Paris<br/>Foil · Kurz Luxor 220
      </div>
    </footer>
  );
}

// ── App ────────────────────────────────────────────────────────────────────
function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(()=>{ applyPalette(t.palette); }, [t.palette]);
  return (
    <div>
      <Top/>
      <Hero/>
      <Manifesto/>
      <PhotoEssay/>
      <LogoSection/>
      <ConstructionSection/>
      <BigMark/>
      <SymbolSection/>
      <PaletteSection palKey={t.palette}/>
      <TypographySection/>
      <MisuseSection/>
      <MotifSection/>
      <ApplicationsSection/>
      <VoiceSection/>
      <Closing/>
      <Foot/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Direction" />
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:8,marginTop:4}}>
          {PAL_OPTIONS.map(k => {
            const p = PALETTES[k];
            const active = t.palette === k;
            return (
              <button key={k} onClick={()=>setTweak('palette', k)}
                style={{
                  border: active ? '1px solid #29261b' : '.5px solid rgba(41,38,27,.2)',
                  background:'transparent', padding:8, borderRadius:4, cursor:'pointer',
                  display:'flex',flexDirection:'column',gap:8,alignItems:'stretch'
                }}>
                <div style={{display:'flex',height:36,borderRadius:2,overflow:'hidden'}}>
                  <div style={{flex:1,background:p.bg}}></div>
                  <div style={{flex:1,background:p.ink}}></div>
                  <div style={{flex:1,background:p.moka}}></div>
                  <div style={{flex:1,background:p.sable}}></div>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
                  <span style={{fontFamily:"'Italiana',serif",fontSize:18,color:'#29261b'}}>{p.label}</span>
                  <span style={{fontSize:8.5,letterSpacing:'.1em',textTransform:'uppercase',color:'rgba(41,38,27,.55)'}}>04 colours</span>
                </div>
              </button>
            );
          })}
        </div>
        <TweakSection label="Notes" />
        <div style={{fontSize:10.5,lineHeight:1.55,color:'rgba(41,38,27,.62)',padding:'4px 2px'}}>
          Палитра меняется во всех мокапах синхронно: фасад, упаковка, печать, обложка меню. Wax-печать остаётся бордовой как материал.
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
