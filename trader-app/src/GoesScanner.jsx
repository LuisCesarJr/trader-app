import { useState, useEffect, useCallback, useRef } from "react";

// ─── Estilos ───────────────────────────────────────────────────────────────
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;700&family=Barlow:wght@400;500;600;800;900&display=swap');

  :root {
    --bg: #04070d;
    --surface: #080e18;
    --card: #0b1220;
    --border: #162030;
    --border2: #1e2f45;
    --green: #05f07a;
    --green2: #00c45a;
    --green-dim: #05f07a12;
    --green-glow: #05f07a30;
    --yellow: #f5c518;
    --yellow-dim: #f5c51812;
    --red: #ff3d5a;
    --red-dim: #ff3d5a12;
    --blue: #1a8fff;
    --blue-dim: #1a8fff15;
    --orange: #ff7b2e;
    --orange-dim: #ff7b2e12;
    --muted: #2d4460;
    --text: #ccd8e8;
    --text-dim: #5a7a99;
    --text-bright: #e8f2ff;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: 'Barlow', sans-serif; min-height: 100vh; }
  .mono { font-family: 'IBM Plex Mono', monospace; }

  /* Scanlines texture */
  body::before {
    content: '';
    position: fixed; inset: 0; pointer-events: none; z-index: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.04) 2px, rgba(0,0,0,.04) 4px);
  }

  .app { max-width: 1080px; margin: 0 auto; padding: 28px 16px 80px; position: relative; z-index: 1; }

  /* ── Header ── */
  .hdr { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 28px; flex-wrap: wrap; gap: 14px; }
  .hdr-left {}
  .hdr-eyebrow { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--green); letter-spacing: 3px; text-transform: uppercase; margin-bottom: 4px; }
  .hdr-title { font-size: 28px; font-weight: 900; color: var(--text-bright); letter-spacing: -0.5px; line-height: 1; }
  .hdr-sub { font-size: 13px; color: var(--text-dim); margin-top: 5px; font-weight: 400; }

  .live-badge {
    display: flex; align-items: center; gap: 8px;
    border: 1px solid var(--green); background: var(--green-dim);
    padding: 6px 14px; border-radius: 6px;
    font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--green);
    letter-spacing: 1.5px;
  }
  .live-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--green); animation: blink 1.2s infinite; }
  @keyframes blink { 0%,100%{opacity:1;box-shadow:0 0 6px var(--green)} 50%{opacity:.2;box-shadow:none} }

  /* ── Config ── */
  .cfg { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 18px; margin-bottom: 20px; }
  .cfg-label { font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: var(--text-dim); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 10px; }
  .cfg-row { display: flex; gap: 10px; flex-wrap: wrap; }
  .cfg-input {
    flex: 1; min-width: 220px; background: var(--bg); border: 1px solid var(--border2);
    color: var(--text-bright); padding: 10px 14px; border-radius: 6px;
    font-family: 'IBM Plex Mono', monospace; font-size: 12px; outline: none; transition: border-color .2s;
  }
  .cfg-input:focus { border-color: var(--blue); }
  .btn { padding: 10px 22px; border: none; border-radius: 6px; cursor: pointer; font-family: 'Barlow', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: .5px; transition: all .15s; }
  .btn-scan { background: var(--green); color: #000; }
  .btn-scan:hover { background: var(--green2); }
  .btn-scan:disabled { opacity: .35; cursor: not-allowed; }

  /* ── Timer bar ── */
  .timer-row { display: flex; justify-content: flex-end; margin-bottom: 18px; }
  .timer-txt { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--text-dim); }

  /* ── Loading ── */
  .prog { height: 2px; background: var(--border); border-radius: 2px; overflow: hidden; margin-bottom: 20px; }
  .prog-fill { height: 100%; background: linear-gradient(90deg, var(--blue), var(--green)); border-radius: 2px; animation: sweep 1.4s ease-in-out infinite; }
  @keyframes sweep { 0%{width:0%;margin-left:0} 50%{width:55%;margin-left:25%} 100%{width:0%;margin-left:100%} }

  /* ── Error ── */
  .err { background: var(--red-dim); border: 1px solid var(--red); border-radius: 8px; padding: 10px 14px; color: var(--red); font-size: 12px; margin-bottom: 16px; font-family: 'IBM Plex Mono', monospace; }

  /* ── Cards ── */
  .cards { display: flex; flex-direction: column; gap: 16px; }

  .card {
    background: var(--card); border: 1px solid var(--border);
    border-radius: 12px; overflow: hidden; transition: border-color .3s, box-shadow .3s;
    position: relative;
  }
  .card-accent { width: 100%; height: 3px; }
  .card.lvl3 { border-color: #05f07a55; box-shadow: 0 0 32px #05f07a0e; }
  .card.lvl3 .card-accent { background: linear-gradient(90deg, var(--green), var(--blue)); }
  .card.lvl2 { border-color: #f5c51840; }
  .card.lvl2 .card-accent { background: linear-gradient(90deg, var(--yellow), var(--orange)); }
  .card.lvl1 .card-accent { background: var(--muted); }

  .card-body { padding: 20px; }

  /* ── Card top ── */
  .ctop { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 18px; }
  .ctop-left { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
  .ticker { font-size: 26px; font-weight: 900; color: var(--text-bright); letter-spacing: -1px; }
  .price-block {}
  .price { font-family: 'IBM Plex Mono', monospace; font-size: 16px; color: var(--text-bright); }
  .chg { font-family: 'IBM Plex Mono', monospace; font-size: 11px; margin-left: 6px; }
  .pos { color: var(--green); } .neg { color: var(--red); }

  /* KaiuKomprou pill */
  .kaiu {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--green-dim); border: 1px solid var(--green);
    color: var(--green); padding: 5px 13px; border-radius: 5px;
    font-family: 'IBM Plex Mono', monospace; font-size: 10px;
    text-transform: uppercase; letter-spacing: 2px; font-weight: 700;
    animation: kaiu-pulse 2.5s infinite;
  }
  @keyframes kaiu-pulse { 0%,100%{box-shadow:0 0 8px var(--green-glow)} 50%{box-shadow:0 0 20px var(--green-glow)} }

  .exit-warn {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--red-dim); border: 1px solid var(--red);
    color: var(--red); padding: 5px 13px; border-radius: 5px;
    font-family: 'IBM Plex Mono', monospace; font-size: 10px;
    text-transform: uppercase; letter-spacing: 2px; font-weight: 700;
    animation: exit-pulse 1.5s infinite;
  }
  @keyframes exit-pulse { 0%,100%{opacity:1} 50%{opacity:.6} }

  /* Score ring */
  .score-wrap { display: flex; align-items: center; gap: 10px; }
  .score-ring {
    width: 50px; height: 50px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 700;
    border: 2px solid; flex-shrink: 0;
  }
  .score-ring.s3 { border-color: var(--green); color: var(--green); background: var(--green-dim); }
  .score-ring.s2 { border-color: var(--yellow); color: var(--yellow); background: var(--yellow-dim); }
  .score-ring.s1 { border-color: var(--muted); color: var(--muted); }
  .score-meta { font-size: 11px; color: var(--text-dim); line-height: 1.5; }
  .score-meta strong { display: block; font-size: 13px; color: var(--text-bright); font-weight: 700; }

  /* ── Tabs ── */
  .tabs { display: flex; gap: 2px; margin-bottom: 16px; border-bottom: 1px solid var(--border); }
  .tab {
    padding: 7px 16px; font-size: 12px; font-weight: 600; cursor: pointer;
    color: var(--text-dim); border: none; background: none;
    border-bottom: 2px solid transparent; transition: all .15s; margin-bottom: -1px;
    font-family: 'Barlow', sans-serif; letter-spacing: .3px;
  }
  .tab.active { color: var(--text-bright); border-bottom-color: var(--green); }
  .tab:hover:not(.active) { color: var(--text); }

  /* ── Indicators grid ── */
  .ind-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(175px, 1fr)); gap: 8px; }
  .ind {
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 7px; padding: 10px 12px;
  }
  .ind-lbl { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 4px; }
  .ind-val { font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 700; }
  .ind-detail { font-size: 10px; margin-top: 3px; line-height: 1.3; }
  .ok { color: var(--green); } .warn { color: var(--yellow); } .bad { color: var(--red); } .neutral { color: var(--text-dim); } .info { color: var(--blue); }

  /* ── Operação (call/trava) ── */
  .op-panel { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  @media(max-width:520px) { .op-panel { grid-template-columns: 1fr; } }

  .op-box {
    background: var(--bg); border: 1px solid var(--border2);
    border-radius: 8px; padding: 14px;
  }
  .op-box-title { font-family: 'IBM Plex Mono', monospace; font-size: 9px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 10px; }
  .op-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
  .op-key { font-size: 12px; color: var(--text-dim); }
  .op-val { font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 700; color: var(--text-bright); }
  .op-val.green { color: var(--green); }
  .op-val.red { color: var(--red); }
  .op-val.yellow { color: var(--yellow); }
  .op-val.blue { color: var(--blue); }

  .op-divider { border: none; border-top: 1px solid var(--border); margin: 8px 0; }

  .ratio-bar { height: 6px; background: var(--border); border-radius: 3px; overflow: hidden; margin-top: 8px; }
  .ratio-fill { height: 100%; border-radius: 3px; background: linear-gradient(90deg, var(--green), var(--blue)); }

  /* ── Sinais de Saída ── */
  .exit-grid { display: flex; flex-direction: column; gap: 8px; }
  .exit-item {
    display: flex; align-items: flex-start; gap: 12px;
    background: var(--bg); border: 1px solid var(--border);
    border-radius: 7px; padding: 12px 14px;
  }
  .exit-icon { font-size: 18px; flex-shrink: 0; margin-top: 1px; }
  .exit-text {}
  .exit-title { font-size: 13px; font-weight: 700; color: var(--text-bright); margin-bottom: 3px; }
  .exit-desc { font-size: 11px; color: var(--text-dim); line-height: 1.5; }
  .exit-item.triggered { border-color: var(--red); background: var(--red-dim); }
  .exit-item.triggered .exit-title { color: var(--red); }
  .exit-item.gain { border-color: var(--green); background: var(--green-dim); }
  .exit-item.gain .exit-title { color: var(--green); }

  /* ── Empty ── */
  .empty { text-align: center; padding: 70px 20px; color: var(--text-dim); }
  .empty-ico { font-size: 48px; margin-bottom: 14px; filter: grayscale(1) opacity(.4); }
`;

// ─── Defaults ──────────────────────────────────────────────────────────────
const DEFAULT_TICKERS = ["PETR4","VALE3","ITUB4","BBAS3","BBDC4","GGBR4","CSNA3","USIM5","EQTL3","B3SA3"];

// ─── Cálculos ──────────────────────────────────────────────────────────────
function sma(arr, n) {
  if (arr.length < n) return null;
  return arr.slice(-n).reduce((a,b)=>a+b,0)/n;
}
function ema(arr, n) {
  if (arr.length < n) return null;
  const k = 2/(n+1);
  let e = arr.slice(0,n).reduce((a,b)=>a+b,0)/n;
  for (let i=n;i<arr.length;i++) e = arr[i]*k + e*(1-k);
  return e;
}
function bollinger(arr, n=20, m=2) {
  if (arr.length < n) return null;
  const sl = arr.slice(-n);
  const mean = sl.reduce((a,b)=>a+b,0)/n;
  const std = Math.sqrt(sl.reduce((a,b)=>a+Math.pow(b-mean,2),0)/n);
  return { upper: mean+m*std, middle: mean, lower: mean-m*std, std };
}
function stochastic(H,L,C,k=14,d=3) {
  if (C.length < k) return null;
  const ks=[];
  for (let i=k-1;i<C.length;i++){
    const h=Math.max(...H.slice(i-k+1,i+1)), l=Math.min(...L.slice(i-k+1,i+1));
    ks.push(h===l?50:((C[i]-l)/(h-l))*100);
  }
  const dv = ks.slice(-d).reduce((a,b)=>a+b,0)/d;
  return { k: ks[ks.length-1], d: dv };
}
function rsi(arr, n=14) {
  if (arr.length < n+1) return null;
  let g=0,l=0;
  for (let i=1;i<=n;i++){const d=arr[i]-arr[i-1]; d>0?g+=d:l-=d;}
  let ag=g/n, al=l/n;
  for (let i=n+1;i<arr.length;i++){
    const d=arr[i]-arr[i-1];
    ag=(ag*(n-1)+Math.max(d,0))/n;
    al=(al*(n-1)+Math.max(-d,0))/n;
  }
  if(al===0) return 100;
  return 100-100/(1+ag/al);
}
function trend(closes) {
  if (closes.length < 40) return "indefinida";
  const r=closes.slice(-20), p=closes.slice(-40,-20);
  if(p.length<10) return "indefinida";
  const rH=Math.max(...r),rL=Math.min(...r),pH=Math.max(...p),pL=Math.min(...p);
  if(rH>pH && rL>pL) return "alta";
  if(rH<pH && rL<pL) return "baixa";
  return "lateral";
}

// ─── Próximo vencimento B3 (3ª segunda-feira) ────────────────────────────
function nextExpiry() {
  const now = new Date();
  // Vencimentos B3: terceira segunda-feira de cada mês
  function thirdMonday(year, month) {
    const d = new Date(year, month, 1);
    const dow = d.getDay(); // 0=dom
    const first = dow===1?1:(8-dow)%7+1; // primeiro seg
    return new Date(year, month, first+14);
  }
  const m = now.getMonth(), y = now.getFullYear();
  let exp = thirdMonday(y, m);
  if (exp <= now) exp = thirdMonday(y, m+1 > 11 ? 0 : m+1, m+1>11?y+1:y);
  // Se estamos na última semana antes do vencimento (< 7 dias), pula para o próximo
  const daysLeft = Math.ceil((exp - now)/(1000*60*60*24));
  if (daysLeft < 7) {
    const nm = (m+1)%12, ny = m+1>11?y+1:y;
    exp = thirdMonday(ny, nm);
  }
  return { date: exp, daysLeft: Math.ceil((exp-now)/(1000*60*60*24)) };
}

// ─── Sugestão de operação ─────────────────────────────────────────────────
function buildOperation(price, score, kaiuKomprou) {
  if (score < 3) return null;

  const exp = nextExpiry();

  // Strike ATM (arredonda para múltiplo de 0.50 ou 1.00 dependendo do preço)
  const step = price > 50 ? 1 : 0.5;
  const strikeATM = Math.round(price / step) * step;
  // Strike da venda (OTM ~5%)
  const strikeOTM = Math.round((price * 1.05) / step) * step;

  // Estimativa grosseira de prêmio ATM via Black-Scholes simplificado
  // Usa vol implícita aproximada de 40% anual (típico B3)
  const vol = 0.40;
  const T = exp.daysLeft / 252;
  const atmPremio = price * vol * Math.sqrt(T) * 0.4; // simplificado
  const otmPremio = atmPremio * 0.35;
  const custotrava = Math.max(atmPremio - otmPremio, 0.01);
  const gainMax = strikeOTM - strikeATM - custotrava;
  const ratio = gainMax / custotrava;

  // Stop: perde 100% do prêmio pago (característica de opção comprada)
  // Gain alvo: 3x (método Góes)
  const alvo3x = custotrava * 3;
  const precoAcaoAlvo = price + (gainMax > 0 ? gainMax * 0.9 : price * 0.04);

  return {
    tipo: "Trava de Alta (Bull Spread)",
    vencimento: exp.date.toLocaleDateString("pt-BR"),
    diasVencimento: exp.daysLeft,
    strikeCompra: strikeATM,
    strikeVenda: strikeOTM,
    custoTrava: custotrava,
    gainMaximo: gainMax,
    ratio: ratio,
    alvo3x: alvo3x,
    precoAcaoAlvo: precoAcaoAlvo,
    stopAcao: price * 0.97, // stop na ação: -3% (abaixo da linha verde)
  };
}

// ─── Sinais de saída ──────────────────────────────────────────────────────
function buildExitSignals(price, bb, stoch, rsiVal, ma21, recuo, trend_, closes) {
  const signals = [];

  // 1. Gain: santo acima da banda superior (sobrecomprado)
  const acimaVenda = bb && price > bb.upper;
  signals.push({
    tipo: "gain",
    icon: "🎯",
    title: "Realizar Gain — Santo acima da Banda",
    desc: `Preço ultrapassa banda superior de Bollinger (R$ ${bb?.upper.toFixed(2) || "—"}). Góes sai quando o santo sobe demais — sinal de sobrecompra.`,
    triggered: acimaVenda,
  });

  // 2. Gain: estocástico acima de 80
  const stochOverbought = stoch && stoch.k > 80 && stoch.d > 80;
  signals.push({
    tipo: "gain",
    icon: "📈",
    title: "Realizar Gain — Estocástico Sobrecomprado",
    desc: `K=${stoch?.k.toFixed(0)||"—"} / D=${stoch?.d.toFixed(0)||"—"}. Quando ambos passam de 80, o papel esgotou força compradora no curto prazo.`,
    triggered: stochOverbought,
  });

  // 3. RSI sobrecomprado
  const rsiOver = rsiVal && rsiVal > 70;
  signals.push({
    tipo: "gain",
    icon: "⚡",
    title: "Realizar Gain — RSI Sobrecomprado",
    desc: `RSI ${rsiVal?.toFixed(1)||"—"}. Acima de 70 indica exaustão compradora. Momento de embolsar o lucro antes da realização.`,
    triggered: rsiOver,
  });

  // 4. Stop: preço perde a MA21 (linha verde)
  const perdeMa21 = ma21 && price < ma21 * 0.97;
  signals.push({
    tipo: "stop",
    icon: "🛑",
    title: "STOP — Preço abaixo da Linha Verde",
    desc: `Preço (R$ ${price.toFixed(2)}) caiu abaixo da MA21 (R$ ${ma21?.toFixed(2)||"—"}) com folga. A tendência de alta está comprometida. Sair da operação.`,
    triggered: perdeMa21,
  });

  // 5. Stop: tendência virou
  const tendBaixa = trend_ === "baixa";
  signals.push({
    tipo: "stop",
    icon: "📉",
    title: "STOP — Tendência Reverteu",
    desc: "Topos e fundos passaram a ser descendentes. Estrutura de alta quebrada — zerar posição imediatamente.",
    triggered: tendBaixa,
  });

  // 6. Stop: queda > 5% em 2 dias (ruptura)
  const ultimos = closes.slice(-3);
  const quedaRapida = ultimos.length === 3 && ((ultimos[2] - ultimos[0])/ultimos[0]) < -0.05;
  signals.push({
    tipo: "stop",
    icon: "⚠️",
    title: "STOP — Queda Abrupta (-5% em 2 dias)",
    desc: `Movimento brusco de queda detectado. Pode indicar notícia negativa ou rompimento de suporte importante.`,
    triggered: quedaRapida,
  });

  return signals;
}

// ─── Análise principal ────────────────────────────────────────────────────
function analyze(data) {
  const closes = (data.historicalDataPrice||[]).map(d=>d.close).filter(Boolean);
  const highs   = (data.historicalDataPrice||[]).map(d=>d.high||d.close).filter(Boolean);
  const lows    = (data.historicalDataPrice||[]).map(d=>d.low||d.close).filter(Boolean);
  if (closes.length < 20) return null;

  const price  = data.regularMarketPrice || closes.at(-1);
  const change = data.regularMarketChangePercent || 0;

  const ma21   = sma(closes, 21);
  const ma9    = sma(closes, 9);
  const bb     = bollinger(closes, 20);
  const stoch  = stochastic(highs, lows, closes, 14, 3);
  const rsiVal = rsi(closes);
  const tnd    = trend(closes);

  const distMa21 = ma21 ? ((price - ma21)/ma21)*100 : null;
  const touchMa21 = distMa21 !== null && distMa21 >= -3 && distMa21 <= 3;
  const santoPos = bb ? price > bb.upper ? "acima" : price < bb.lower ? "abaixo" : "dentro" : null;
  const recentHigh = Math.max(...closes.slice(-20));
  const recuo = ((recentHigh - price)/recentHigh)*100;
  const recuoOk = recuo >= 3 && recuo <= 20;
  const stochOk = stoch ? stoch.k < 55 && stoch.d < 55 : null;
  const rsiOk = rsiVal ? rsiVal < 65 : null;

  let score = 0;
  const checks = [];

  if (tnd==="alta")          { score++; checks.push({label:"Tendência",      value:"ALTA",                      status:"ok",   detail:"Topos e fundos ascendentes confirmados"}); }
  else                                   checks.push({label:"Tendência",      value:tnd.toUpperCase(),           status:"bad",  detail:"Góes só opera em tendência de alta"});

  if (touchMa21 && ma21)     { score++; checks.push({label:"Linha Verde MA21",value:`${distMa21?.toFixed(1)}%`, status:"ok",   detail:"Preço na zona de compra da linha verde"}); }
  else if (ma21)                         checks.push({label:"Linha Verde MA21",value:`${distMa21?.toFixed(1)}%`, status: distMa21>5?"warn":"neutral", detail: distMa21>5?"Longe da linha verde — não é hora":"Abaixo da suporte"});

  if (santoPos==="dentro"||santoPos==="abaixo") { score++; checks.push({label:"Santo/Banda",  value:santoPos.toUpperCase(),    status:"ok",   detail:"Santo dentro/abaixo da banda — espaço para subir"}); }
  else if (santoPos==="acima")                                checks.push({label:"Santo/Banda",  value:"ACIMA",                   status:"bad",  detail:"Sobrecomprado — aguardar realização"});

  if (stochOk)               { score++; checks.push({label:"Estocástico K/D", value:`${stoch.k.toFixed(0)}/${stoch.d.toFixed(0)}`, status:"ok", detail:"Não sobrecomprado — momentum favorável"}); }
  else if (stoch)                        checks.push({label:"Estocástico K/D", value:`${stoch.k.toFixed(0)}/${stoch.d.toFixed(0)}`, status:"warn",detail:"Sobrecomprado — aguardar recuo"});

  if (rsiOk)                 { score++; checks.push({label:"RSI 14",          value:rsiVal?.toFixed(1),          status:"ok",   detail:"Espaço para subida sem exaustão"}); }
  else if (rsiVal)                       checks.push({label:"RSI 14",          value:rsiVal?.toFixed(1),          status:"warn", detail:"RSI elevado — risco de topo próximo"});

  if (recuoOk)               { score++; checks.push({label:"Recuo KaiuKomprou",value:`-${recuo.toFixed(1)}%`,   status:"ok",   detail:"Pullback saudável em tendência — setup ativo"}); }
  else if (recuo<3)                      checks.push({label:"Recuo KaiuKomprou",value:`-${recuo.toFixed(1)}%`,   status:"neutral",detail:"Sem recuo — aguardar pullback para comprar"});
  else                                   checks.push({label:"Recuo KaiuKomprou",value:`-${recuo.toFixed(1)}%`,   status:"bad",  detail:"Queda excessiva — verificar tendência"});

  const kaiuKomprou = tnd==="alta" && touchMa21 && santoPos!=="acima" && recuoOk;

  const exitSignals = buildExitSignals(price, bb, stoch, rsiVal, ma21, recuo, tnd, closes);
  const hasExitAlert = exitSignals.some(s => s.triggered && s.tipo==="stop");
  const hasGainAlert = exitSignals.some(s => s.triggered && s.tipo==="gain");

  const operation = buildOperation(price, score, kaiuKomprou);

  return {
    ticker: data.symbol, price, change,
    tnd, ma21, bb, stoch, rsiVal, recuo, score, maxScore:6,
    checks, kaiuKomprou, exitSignals, hasExitAlert, hasGainAlert, operation,
  };
}

// ─── Fetch ────────────────────────────────────────────────────────────────
async function fetchTicker(t) {
  const r = await fetch(`https://brapi.dev/api/quote/${t}?range=3mo&interval=1d&fundamental=false`);
  if (!r.ok) throw new Error(`HTTP ${r.status}`);
  const j = await r.json();
  const res = j.results?.[0];
  if (!res) throw new Error("sem dados");
  return res;
}

// ─── App ──────────────────────────────────────────────────────────────────
export default function GoesScanner() {
  const [tickers, setTickers]   = useState(DEFAULT_TICKERS);
  const [inputVal, setInputVal] = useState(DEFAULT_TICKERS.join(", "));
  const [results, setResults]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [errors, setErrors]     = useState([]);
  const [lastUp, setLastUp]     = useState(null);
  const [countdown, setCountdown] = useState(300);
  const [openTab, setOpenTab]   = useState({}); // {ticker: 'indicadores'|'operacao'|'saida'}
  const timerRef = useRef(null);

  const runScan = useCallback(async (list) => {
    setLoading(true); setErrors([]);
    const res=[], errs=[];
    for (const t of list) {
      try { const d = await fetchTicker(t.trim().toUpperCase()); const a=analyze(d); if(a) res.push(a); }
      catch(e) { errs.push(`${t}: ${e.message}`); }
    }
    res.sort((a,b) => (b.kaiuKomprou?10:0)+b.score - ((a.kaiuKomprou?10:0)+a.score));
    setResults(res); setErrors(errs);
    setLastUp(new Date()); setCountdown(300); setLoading(false);
  }, []);

  useEffect(() => { runScan(tickers); }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCountdown(c => { if(c<=1){ runScan(tickers); return 300; } return c-1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [tickers, runScan]);

  function handleScan() {
    const list = inputVal.split(/[,\s]+/).filter(Boolean);
    setTickers(list); runScan(list);
    clearInterval(timerRef.current);
  }

  function getTab(ticker) { return openTab[ticker] || "indicadores"; }
  function setTab(ticker, tab) { setOpenTab(p=>({...p,[ticker]:tab})); }

  function cardClass(r) {
    if (r.hasExitAlert) return "card lvl1"; // stop prevalece visualmente
    if (r.kaiuKomprou || r.score>=5) return "card lvl3";
    if (r.score>=3) return "card lvl2";
    return "card lvl1";
  }

  function scoreRingClass(s) { return s>=5?"s3":s>=3?"s2":"s1"; }

  function starLabel(r) {
    if (r.score>=5) return "★★★ Entrada Forte";
    if (r.score>=3) return "★★ Acompanhar";
    return "★ Aguardar";
  }

  function ratioColor(ratio) {
    if (ratio >= 3) return "green";
    if (ratio >= 2) return "yellow";
    return "red";
  }

  return (
    <>
      <style>{STYLE}</style>
      <div className="app">

        {/* Header */}
        <div className="hdr">
          <div className="hdr-left">
            <div className="hdr-eyebrow">⬡ Método Fernando Góes</div>
            <div className="hdr-title">KaiuKomprou Scanner</div>
            <div className="hdr-sub">Tendência · Linha Verde · Santo · Trava 3×1 · Sinais de Saída</div>
          </div>
          <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:8}}>
            <div className="live-badge"><span className="live-dot"/>LIVE B3</div>
            {lastUp && <div className="timer-txt mono">{lastUp.toLocaleTimeString("pt-BR")} · {countdown}s</div>}
          </div>
        </div>

        {/* Config */}
        <div className="cfg">
          <div className="cfg-label">Tickers — separe por vírgula ou espaço</div>
          <div className="cfg-row">
            <input className="cfg-input" value={inputVal} onChange={e=>setInputVal(e.target.value)}
              placeholder="PETR4, VALE3, ITUB4..." onKeyDown={e=>e.key==="Enter"&&handleScan()} />
            <button className="btn btn-scan" onClick={handleScan} disabled={loading}>
              {loading?"Analisando...":"▶ Escanear"}
            </button>
          </div>
        </div>

        {loading && <div className="prog"><div className="prog-fill"/></div>}
        {errors.length>0 && <div className="err">{errors.map((e,i)=><div key={i}>⚠ {e}</div>)}</div>}

        {results.length===0 && !loading ? (
          <div className="empty"><div className="empty-ico">📡</div><div>Aguardando scan...</div></div>
        ) : (
          <div className="cards">
            {results.map(r => (
              <div key={r.ticker} className={cardClass(r)}>
                <div className="card-accent"/>
                <div className="card-body">

                  {/* Topo */}
                  <div className="ctop">
                    <div className="ctop-left">
                      <div className="ticker">{r.ticker}</div>
                      <div className="price-block">
                        <span className="price mono">R$ {r.price?.toFixed(2)}</span>
                        <span className={`chg mono ${r.change>=0?"pos":"neg"}`}>
                          {r.change>=0?"+":""}{r.change?.toFixed(2)}%
                        </span>
                      </div>
                      {r.kaiuKomprou && <div className="kaiu">⚡ KaiuKomprou</div>}
                      {r.hasExitAlert && <div className="exit-warn">🛑 STOP</div>}
                      {r.hasGainAlert && !r.hasExitAlert && <div className="kaiu" style={{background:"var(--green-dim)",borderColor:"var(--green)"}}>🎯 Realizar</div>}
                    </div>
                    <div className="score-wrap">
                      <div className={`score-ring ${scoreRingClass(r.score)}`}>{r.score}/{r.maxScore}</div>
                      <div className="score-meta"><strong>{starLabel(r)}</strong>critérios convergindo</div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="tabs">
                    {["indicadores","operação","saída"].map(t=>(
                      <button key={t} className={`tab ${getTab(r.ticker)===t?"active":""}`}
                        onClick={()=>setTab(r.ticker,t)}>
                        {t==="indicadores"?"📊 Indicadores":t==="operação"?"💼 Operação":"🚪 Saída"}
                      </button>
                    ))}
                  </div>

                  {/* Tab: Indicadores */}
                  {getTab(r.ticker)==="indicadores" && (
                    <div className="ind-grid">
                      {r.checks.map((c,i)=>(
                        <div className="ind" key={i}>
                          <div className="ind-lbl">{c.label}</div>
                          <div className={`ind-val ${c.status}`}>{c.value}</div>
                          <div className={`ind-detail ${c.status}`}>{c.detail}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tab: Operação */}
                  {getTab(r.ticker)==="operação" && (
                    r.operation ? (
                      <div className="op-panel">
                        {/* Box 1: Estrutura */}
                        <div className="op-box">
                          <div className="op-box-title">📋 Estrutura da Operação</div>
                          <div className="op-row"><span className="op-key">Tipo</span><span className="op-val blue">{r.operation.tipo}</span></div>
                          <div className="op-row"><span className="op-key">Vencimento</span><span className="op-val">{r.operation.vencimento}</span></div>
                          <div className="op-row"><span className="op-key">Dias p/ vencer</span><span className="op-val">{r.operation.diasVencimento}d</span></div>
                          <hr className="op-divider"/>
                          <div className="op-row"><span className="op-key">✅ COMPRAR call</span><span className="op-val green">Strike R$ {r.operation.strikeCompra.toFixed(2)}</span></div>
                          <div className="op-row"><span className="op-key">❌ VENDER call</span><span className="op-val red">Strike R$ {r.operation.strikeVenda.toFixed(2)}</span></div>
                          <hr className="op-divider"/>
                          <div className="op-row"><span className="op-key">Custo da trava</span><span className="op-val yellow">~R$ {r.operation.custoTrava.toFixed(2)}</span></div>
                          <div className="op-row"><span className="op-key">Gain máximo</span><span className="op-val green">~R$ {r.operation.gainMaximo.toFixed(2)}</span></div>
                        </div>

                        {/* Box 2: Gestão */}
                        <div className="op-box">
                          <div className="op-box-title">📐 Gestão de Risco · 3×1</div>
                          <div className="op-row"><span className="op-key">Risco máximo</span><span className="op-val red">R$ {r.operation.custoTrava.toFixed(2)} (100% prêmio)</span></div>
                          <div className="op-row"><span className="op-key">Alvo 3×1 (gain)</span><span className="op-val green">R$ {r.operation.alvo3x.toFixed(2)}</span></div>
                          <div className="op-row"><span className="op-key">Ação alvo</span><span className="op-val green">≥ R$ {r.operation.precoAcaoAlvo.toFixed(2)}</span></div>
                          <div className="op-row"><span className="op-key">Stop ação</span><span className="op-val red">≤ R$ {r.operation.stopAcao.toFixed(2)}</span></div>
                          <hr className="op-divider"/>
                          <div className="op-row">
                            <span className="op-key">Ratio G/R</span>
                            <span className={`op-val ${ratioColor(r.operation.ratio)}`}>{r.operation.ratio.toFixed(1)}×</span>
                          </div>
                          <div className="ratio-bar">
                            <div className="ratio-fill" style={{width:`${Math.min(r.operation.ratio/4*100,100)}%`}}/>
                          </div>
                          <div style={{fontSize:10,color:"var(--text-dim)",marginTop:8,lineHeight:1.5}}>
                            ⚠ Prêmios são estimativas. Consulte o homebroker para preços reais antes de operar.
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div style={{padding:"24px",textAlign:"center",color:"var(--text-dim)",fontSize:13}}>
                        Score insuficiente para sugerir operação. Aguarde mais critérios convergirem.
                      </div>
                    )
                  )}

                  {/* Tab: Saída */}
                  {getTab(r.ticker)==="saída" && (
                    <div className="exit-grid">
                      {r.exitSignals.map((s,i)=>(
                        <div key={i} className={`exit-item ${s.triggered?(s.tipo==="stop"?"triggered":"gain"):""}`}>
                          <div className="exit-icon">{s.icon}</div>
                          <div className="exit-text">
                            <div className="exit-title">{s.title}</div>
                            <div className="exit-desc">{s.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
