// Mōne Brand Board — React app

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "beurre"
}/*EDITMODE-END*/;

const PALETTES = {
  beurre: {
    label: "Beurre",
    desc: "Тёплая нейтральная — масло, песчаник, тёмный шоколад.",
    bg: "#F2EDE4", ink: "#0E0E0E", moka: "#7B6A56", sable: "#C6AE89",
    paper: "#FAF7F0",
  },
  pierre: {
    label: "Pierre",
    desc: "Парижский камень — холодный нейтрал, графит, дымка.",
    bg: "#ECE9E2", ink: "#1A1A1F", moka: "#6E6A63", sable: "#BFBAB1",
    paper: "#F5F2EB",
  },
  bordeaux: {
    label: "Bordeaux",
    desc: "Винный акцент по тёплому крему — вечерняя терраса.",
    bg: "#F4EFE6", ink: "#1B1416", moka: "#6B1F2A", sable: "#D8B6A8",
    paper: "#FBF6EC",
  },
  sauge: {
    label: "Sauge",
    desc: "Шалфейная зелень, овсяный фон, чернильные акценты.",
    bg: "#F1EEE3", ink: "#14140F", moka: "#5C6B53", sable: "#D4C9B0",
    paper: "#F9F5EA",
  },
};

const PAL_OPTIONS = Object.keys(PALETTES);

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
}
function hexA(hex, a){
  const h = hex.replace('#','');
  const r = parseInt(h.slice(0,2),16), g = parseInt(h.slice(2,4),16), b = parseInt(h.slice(4,6),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── Sections ────────────────────────────────────────────────────────────────

function Top(){
  return (
    <div className="top">
      <div className="left">
        <span>Mōne</span>
        <span>Brand Identity</span>
      </div>
      <div className="right">
        <span>Rebrand · 2026</span>
        <span>Document 01 / 01</span>
      </div>
    </div>
  );
}

function Hero(){
  return (
    <section className="frame hero" data-screen-label="01 Hero">
      <div className="hero-tag">
        <span className="l">Maison de café & boulangerie</span>
        <span className="meta">Identity Refresh — 2026</span>
      </div>
      <div className="hero-mark" style={{whiteSpace:'nowrap'}}>
        <MoneWord/>
      </div>
      <div className="hero-sub">
        <div className="col">
          <h3>Современная maison de café, рождённая из парижской неспешности.</h3>
        </div>
        <div className="col">
          <p>Ребрендинг отказывается от триколорной кисти в пользу уверенной типографики и тёплых нейтральных тонов. Фирменный знак — макрон над «o», единственный графический жест, который остаётся подписью бренда.</p>
        </div>
        <div className="col">
          <p style={{fontFamily:"'JetBrains Mono', monospace", textTransform:'uppercase', letterSpacing:'.1em', fontSize:'11px'}}>
            01 — Logo<br/>
            02 — Colour<br/>
            03 — Typography<br/>
            04 — Motif<br/>
            05 — Applications<br/>
            06 — Voice
          </p>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({num, title, desc}){
  return (
    <div className="sec-h">
      <div className="num">{num} — Section</div>
      <h2>{title}</h2>
      <p>{desc}</p>
    </div>
  );
}

// ── 01 Logo lockups ─────────────────────────────────────────────────────────

function MoneWord({className='', style={}}){
  return (
    <span className={className} style={{whiteSpace:'nowrap', display:'inline-block', ...style}}>
      M<span style={{position:'relative', display:'inline-block'}}>
        <span style={{position:'absolute', left:'10%', right:'18%', top:'.04em', height:'.04em', background:'currentColor', borderRadius:'1px'}}></span>
        o
      </span>ne
    </span>
  );
}

function MonogramM({size=200}){
  // Large stylized M with a macron above it. The macron spans the M's optical width.
  return (
    <span style={{position:'relative', display:'inline-block', fontFamily:"'Cormorant Garamond',serif", fontWeight:300, fontSize:size, lineHeight:1, letterSpacing:'-.05em'}}>
      <span style={{position:'absolute', left:'14%', right:'14%', top:'-.04em', height:'.045em', background:'currentColor', borderRadius:'1px'}}></span>
      M
    </span>
  );
}

function LogoSection(){
  return (
    <section className="frame section" data-screen-label="02 Logo">
      <SectionHeader num="01" title="Logo" desc="Один знак — слово, набранное Cormorant Garamond Light. Макрон над «o» — единственный графический акцент: тонкая горизонталь, отсылающая к крыше парижского павильона." />
      <div className="lockups">
        <div className="card">
          <div className="tag">A · Primary wordmark</div>
          <div className="tag r">120 — 480 px</div>
          <div className="card-center">
            <div className="lockup-primary">
              <MoneWord/>
              <span className="sub">CAFÉ · BOULANGERIE</span>
            </div>
          </div>
        </div>

        <div className="card dark">
          <div className="tag">B · Horizontal</div>
          <div className="card-center">
            <div className="lockup-horiz">
              <span className="name"><MoneWord/></span>
              <span className="div"></span>
              <span className="info">EST.<br/>MMXVIII<br/>PARIS · MSK</span>
            </div>
          </div>
        </div>

        <div className="card sable">
          <div className="tag">C · Monogram</div>
          <div className="card-center">
            <MonogramM size={200}/>
          </div>
        </div>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:0,marginTop:24,border:'.5px solid var(--hairline)'}}>
        {[
          {l:'Clear space', v:'1× cap-height'},
          {l:'Min size', v:'24 px / 8 mm'},
          {l:'Stroke', v:'Light, 300 weight'},
          {l:'Optical kerning', v:'−18 to −24'},
        ].map((x,i)=>(
          <div key={i} style={{padding:'24px',borderRight: i<3 ? '.5px solid var(--hairline)' : '0',background:'var(--paper)'}}>
            <div className="meta">{x.l}</div>
            <div style={{fontFamily:"'Cormorant Garamond',serif",fontWeight:300,fontSize:32,lineHeight:1,marginTop:10}}>{x.v}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 02 Palette ──────────────────────────────────────────────────────────────

function PaletteSection({palKey}){
  const p = PALETTES[palKey];
  const swatches = [
    {name:'Crème', cls:'s-cream', bg:p.bg,    code:p.bg,    role:'Background · 60%'},
    {name:'Noir',  cls:'s-ink',   bg:p.ink,   code:p.ink,   role:'Type · 25%'},
    {name:'Moka',  cls:'s-moka',  bg:p.moka,  code:p.moka,  role:'Accent · 10%'},
    {name:'Sable', cls:'s-sable', bg:p.sable, code:p.sable, role:'Détail · 5%'},
  ];
  return (
    <section className="frame section" data-screen-label="03 Colour">
      <SectionHeader num="02" title="Colour" desc={`Палитра «${p.label}». ${p.desc} Четыре тона, никаких градиентов; иерархия 60-25-10-5.`} />
      <div className="palette">
        {swatches.map((s,i)=>(
          <div key={i} className={`swatch ${s.cls}`} style={{background:s.bg}}>
            <span className="num">0{i+1}</span>
            <span className="name">{s.name}</span>
            <div className="meta-row">
              <span>{s.code.toUpperCase()}</span>
              <span style={{opacity:.7}}>{s.role}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 03 Typography ───────────────────────────────────────────────────────────

function TypographySection(){
  return (
    <section className="frame section" data-screen-label="04 Typography">
      <SectionHeader num="03" title="Typography" desc="Двухголосая система: Cormorant Garamond — для заглавий и витрин; Manrope — для навигации, цен и подписей. JetBrains Mono — служебный мета-голос." />
      <div className="type-grid">
        <div className="type-block">
          <div className="head">
            <span className="label">Display · Cormorant Garamond Light Italic</span>
            <span className="label">Aa Bb Cc</span>
          </div>
          <p className="type-sample it">À la maison<br/>tout est doux</p>
          <div className="type-spec">
            <span>120 / 92</span><span>tracking −2.5%</span><span>weight 300</span>
          </div>
        </div>
        <div className="type-block">
          <div className="head">
            <span className="label">Utility · Manrope Medium</span>
            <span className="label">0123 456</span>
          </div>
          <p className="type-sample sans">Croissant<br/>au beurre — 4€</p>
          <div className="type-spec">
            <span>64 / 56</span><span>tracking −1.5%</span><span>weight 500</span>
          </div>
        </div>
      </div>

      <div className="scale">
        {[
          {v:'Aa', s:96, l:'Display 96 / 1.0'},
          {v:'Aa', s:64, l:'Heading 64 / 1.05'},
          {v:'Aa', s:32, l:'Title 32 / 1.15'},
          {v:'Aa', s:18, l:'Body 18 / 1.55', sans:true},
          {v:'Aa', s:11, l:'Caption 11 / 1.4', mono:true},
        ].map((x,i)=>(
          <div key={i} className="step">
            <span className="v" style={{
              fontSize:x.s,
              fontFamily: x.mono ? "'JetBrains Mono',monospace" : (x.sans ? "'Manrope',sans-serif" : "'Cormorant Garamond',serif"),
            }}>{x.v}</span>
            <span className="l">{x.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 04 Motif ────────────────────────────────────────────────────────────────

function MotifSection(){
  return (
    <section className="frame section" data-screen-label="05 Motif">
      <SectionHeader num="04" title="Motif" desc="Графический язык построен на одном элементе — макроне. Тонкая горизонтальная черта используется как разделитель, подчёркивание, табличный рулёр и фоновый ритм." />
      <div className="motif-grid">
        <div className="motif-card">
          <div className="pad"><span className="meta">Macron · primary</span><span className="meta">A</span></div>
          <div className="motif-art">
            <svg viewBox="0 0 600 240" style={{width:'78%'}}>
              <line x1="40" y1="120" x2="560" y2="120" stroke="currentColor" strokeWidth="1.2" />
              <line x1="240" y1="80" x2="360" y2="80" stroke="currentColor" strokeWidth="6" />
              <text x="300" y="200" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" letterSpacing="2" fill="currentColor" opacity=".55">— THE MARK —</text>
            </svg>
          </div>
          <div className="pad"><span className="meta">Stroke 6pt · 60% of x-height</span><span className="meta">↔</span></div>
        </div>
        <div className="motif-card pat-card">
          <div className="pad"><span className="meta" style={{color:'rgba(250,247,240,.6)'}}>Repeat · secondary</span><span className="meta" style={{color:'rgba(250,247,240,.6)'}}>B</span></div>
          <div className="pattern">
            {Array.from({length:48}).map((_,i)=>(
              <span key={i} className={i===17 || i===30 ? 'bright' : ''}>
                {i%2===0 ? <MoneWord/> : <span style={{transform:'rotate(180deg)',display:'inline-block'}}><MoneWord/></span>}
              </span>
            ))}
          </div>
          <div className="pad"><span className="meta" style={{color:'rgba(250,247,240,.6)'}}>For lining papers, bags interior</span><span className="meta" style={{color:'rgba(250,247,240,.6)'}}>×∞</span></div>
        </div>
      </div>
    </section>
  );
}

// ── 05 Applications ─────────────────────────────────────────────────────────

function ApplicationsSection(){
  return (
    <section className="frame section" data-screen-label="06 Applications">
      <SectionHeader num="05" title="Applications" desc="Айдентика на носителях. Бумага, картон, керамика, фасад. Минимум печати — максимум воздуха." />

      <div className="mock-grid">
        {/* Business cards row */}
        <div className="mock" style={{gridColumn:'span 6',minHeight:380}}>
          <span className="tag">Business card · 85 × 50 mm</span>
          <div className="body" style={{gap:18}}>
            <div className="bcard">
              <div className="mark"><MoneWord/></div>
              <div className="info">
                <div className="col">
                  <span>Léa Renaud</span>
                  <span style={{color:'var(--moka)'}}>Chef pâtissière</span>
                </div>
                <div className="col" style={{textAlign:'right'}}>
                  <span>+33 1 84 21 09 77</span>
                  <span>14 rue de Sèze, 75009</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock" style={{gridColumn:'span 6',minHeight:380}}>
          <span className="tag">Card · verso</span>
          <div className="body">
            <div className="bcard back">
              <div className="mono-mark"><MoneWord/></div>
            </div>
          </div>
        </div>

        {/* Cup, bag, menu, stamp, facade */}
        <div className="mock" style={{gridColumn:'span 3', minHeight:460}}>
          <span className="tag">Take-away cup</span>
          <div className="body">
            <div className="cup">
              <div className="lid"></div>
              <div className="band">
                <div className="nm"><MoneWord/></div>
                <div className="sb">CAFÉ</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock" style={{gridColumn:'span 3', minHeight:460}}>
          <span className="tag">Pastry bag</span>
          <div className="body">
            <div className="bag">
              <div className="label">
                <div className="nm"><MoneWord/></div>
                <div className="div"></div>
                <div className="sb">BOULANGERIE</div>
                <div className="ad">PARIS · DEPUIS 2018</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mock" style={{gridColumn:'span 3', minHeight:460}}>
          <span className="tag">Menu cover · A5</span>
          <div className="body">
            <div className="menu">
              <div className="top"><span>La Carte</span><span>Hiver — 26</span></div>
              <div className="mid">
                <div className="nm"><MoneWord/></div>
                <div className="sb">CAFÉ · BOULANGERIE</div>
                <div className="it">«à la maison, tout est doux»</div>
              </div>
              <div className="bot">14 rue de Sèze · Paris 9</div>
            </div>
          </div>
        </div>

        <div className="mock" style={{gridColumn:'span 3', minHeight:460,background:'var(--ink)',color:'var(--paper)'}}>
          <span className="tag" style={{color:'rgba(250,247,240,.55)'}}>Wax seal</span>
          <div className="body">
            <div className="stamp" style={{background:'var(--paper)',color:'var(--ink)'}}>
              <div className="ring"></div>
              <div className="top-arc">— ÉTABLI 2018 —</div>
              <div className="nm"><MoneWord/></div>
              <div className="sb">CAFÉ · BOULANGERIE</div>
              <div className="yr">№ 014</div>
            </div>
          </div>
        </div>

        <div className="mock" style={{gridColumn:'span 12', minHeight:420}}>
          <span className="tag">Facade · awning</span>
          <div className="body">
            <div className="facade">
              <div className="awning">
                <div className="nm"><MoneWord/></div>
              </div>
              <div className="window"></div>
              <div className="door"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 06 Voice ────────────────────────────────────────────────────────────────

function VoiceSection(){
  return (
    <section className="frame section" data-screen-label="07 Voice">
      <SectionHeader num="06" title="Voice" desc="Тихий, уверенный, ничего лишнего. Французский — для названий, русский и английский — для разговора с гостем." />
      <div className="voice-grid">
        <div className="voice-card">
          <div className="head"><span className="ti">Tagline</span><span className="nu">01</span></div>
          <p className="ph">À la maison —<br/><em>tout est doux.</em></p>
          <span className="meta">Primary — visible across all touchpoints</span>
        </div>
        <div className="voice-card">
          <div className="head"><span className="ti">Greeting</span><span className="nu">02</span></div>
          <p className="ph">Доброе утро.<br/>Что подать <em>сегодня?</em></p>
          <span className="meta">Service voice — calm, never performative</span>
        </div>
        <div className="voice-card">
          <div className="head"><span className="ti">Closing</span><span className="nu">03</span></div>
          <p className="ph">Merci, et<br/><em>à demain.</em></p>
          <span className="meta">Sign-off · receipts, bags, social</span>
        </div>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────────────

function Foot(){
  return (
    <footer>
      <span>© Mōne 2026 — Rebrand by atelier</span>
      <span>v1.0 — Document set complete</span>
    </footer>
  );
}

// ── Tweaks ──────────────────────────────────────────────────────────────────

function PaletteTweak({palKey, onChange}){
  return (
    <TweakSection label="Palette" />
  );
}

// ── App ─────────────────────────────────────────────────────────────────────

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  React.useEffect(()=>{ applyPalette(t.palette); }, [t.palette]);
  return (
    <div>
      <Top/>
      <Hero/>
      <LogoSection/>
      <PaletteSection palKey={t.palette}/>
      <TypographySection/>
      <MotifSection/>
      <ApplicationsSection/>
      <VoiceSection/>
      <Foot/>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Palette" />
        <TweakRadio
          label="Direction"
          value={t.palette}
          options={PAL_OPTIONS}
          labels={PAL_OPTIONS.map(k => PALETTES[k].label)}
          onChange={(v)=>setTweak('palette', v)}
        />
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:6,marginTop:6}}>
          {PAL_OPTIONS.map(k => {
            const p = PALETTES[k];
            const active = t.palette === k;
            return (
              <button key={k} onClick={()=>setTweak('palette', k)}
                style={{
                  border: active ? '1px solid #29261b' : '.5px solid rgba(41,38,27,.2)',
                  background:'transparent', padding:6, borderRadius:4, cursor:'pointer',
                  display:'flex',flexDirection:'column',gap:6,alignItems:'stretch'
                }}>
                <div style={{display:'flex',height:28,borderRadius:2,overflow:'hidden'}}>
                  <div style={{flex:1,background:p.bg}}></div>
                  <div style={{flex:1,background:p.ink}}></div>
                  <div style={{flex:1,background:p.moka}}></div>
                  <div style={{flex:1,background:p.sable}}></div>
                </div>
                <span style={{fontSize:10,letterSpacing:'.08em',textTransform:'uppercase',color:'rgba(41,38,27,.7)'}}>{p.label}</span>
              </button>
            );
          })}
        </div>
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
