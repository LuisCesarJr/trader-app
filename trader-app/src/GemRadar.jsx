import { useState, useEffect, useRef, useCallback } from 'react'

// Seed com dados reais — carrega instantâneo, DexScreener atualiza em background
const SEED = [{"pairAddress":"HaFUCubqNqQosJ44EChp3tYJ8ybcYe7HQDCZFMsFtSZc","chainId":"solana","baseToken":{"address":"ESNMKWzWzBCCoDYooJKuri1gSYWVoLTJC11hkXh2pump","name":"Astro Pepe","symbol":"ASTROPEPE"},"priceUsd":"0.000004985","priceChange":{"h1":0.67,"h6":-11.79,"h24":-85.98},"volume":{"h24":3251287.41,"h6":1068.37,"h1":2.25,"m5":0},"liquidity":{"usd":6255.43,"base":623503221,"quote":36.575},"txns":{"m5":{"buys":0,"sells":0},"h1":{"buys":0,"sells":4},"h6":{"buys":32,"sells":46},"h24":{"buys":12674,"sells":10835}},"marketCap":4985,"fdv":4985,"pairCreatedAt":1776752003000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/kvtNeli03IH5L0zi?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"6zZHQtPqiBzwm4qR21BHaKp5VJEYhzjccamfd6x8cjsP","chainId":"solana","baseToken":{"address":"CAjtTHvC878f8cZ4zEwdvgjkjFM7rbYN8Mb1go1cpump","name":"Dumb Money","symbol":"DUMBMONEY"},"priceUsd":"0.001861","priceChange":{"m5":-1.01,"h1":-2.47,"h6":-18.06,"h24":-32.65},"volume":{"h24":1616692.72,"h6":418118.39,"h1":44279.89,"m5":3368.14},"liquidity":{"usd":153862.44,"base":41143389,"quote":897.54},"txns":{"m5":{"buys":91,"sells":141},"h1":{"buys":1165,"sells":1224},"h6":{"buys":7358,"sells":7057},"h24":{"buys":31507,"sells":29108}},"marketCap":1848435,"fdv":1848435,"pairCreatedAt":1776122269000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/olWlBGDg8RFIuk5u?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"FrxSuwcuiswHkkPCUEuAp4XDvZmPdxeFk2AdAUWigzEv","chainId":"solana","baseToken":{"address":"WTF69x41ZbgyxCCXi6qpyLyDZdPpv5yRSLpga8JQ5cR","name":"Monkey Cat","symbol":"WTF"},"priceUsd":"0.0006452","priceChange":{"m5":-1.18,"h1":-13.78,"h6":2.37,"h24":914},"volume":{"h24":1565012.36,"h6":271611.66,"h1":13199.95,"m5":813.37},"liquidity":{"usd":66285.35,"base":51103347,"quote":386.9593},"txns":{"m5":{"buys":65,"sells":64},"h1":{"buys":806,"sells":795},"h6":{"buys":6280,"sells":5182},"h24":{"buys":25331,"sells":19724}},"marketCap":645277,"fdv":645277,"pairCreatedAt":1776727249000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/rVoaEXR_DewsCh1d?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"5CNJobBmYACAo5H96XRERhTVW8Qa3kUw45FD28aWXdHY","chainId":"solana","baseToken":{"address":"HwU6aT1X4JTAeWJzbt6BuALr9GMeCKE9iPTKwpc7pump","name":"Trump420","symbol":"Trump420"},"priceUsd":"0.000002195","priceChange":{"h1":1.69,"h6":6.43,"h24":-93.82},"volume":{"h24":1533660.56,"h6":202.36,"h1":0.84,"m5":0},"liquidity":{"usd":4115.45,"base":937157090,"quote":24.0442},"txns":{"m5":{"buys":0,"sells":0},"h1":{"buys":1,"sells":0},"h6":{"buys":15,"sells":20},"h24":{"buys":36677,"sells":23135}},"marketCap":2195,"fdv":2195,"pairCreatedAt":1776751641000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/3oLudRwT3oNYiwBL?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"HNGjLLZkWx2mNwhWdKFYcMowz8FTh2bXxdpJ1vBVkjNB","chainId":"solana","baseToken":{"address":"3TYgKwkE2Y3rxdw9osLRSpxpXmSC1C1oo19W9KHspump","name":"Bull","symbol":"BULL"},"priceUsd":"0.005558","priceChange":{"m5":2.38,"h1":10.11,"h6":4.33,"h24":16.25},"volume":{"h24":1410405.54,"h6":312403.4,"h1":61979.56,"m5":8104.83},"liquidity":{"usd":282246.71,"base":25412654,"quote":1637.907},"txns":{"m5":{"buys":72,"sells":84},"h1":{"buys":738,"sells":747},"h6":{"buys":3797,"sells":3790},"h24":{"buys":13778,"sells":13958}},"marketCap":5558207,"fdv":5558207,"pairCreatedAt":1774278163000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/mV3BYbgW_ebV6G6c?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"CJ95NGLBDS36KbzjZ35o62GR7RrEAsnJKdsChioFTyCV","chainId":"solana","baseToken":{"address":"7udhnYmvHJFgRYGBeAioQNfzd95JtGTUjrRwNe8VCoG4","name":"Federal Oil Fund","symbol":"FOF"},"priceUsd":"0.005278","priceChange":{"m5":-0.13,"h1":0.14,"h6":11.88,"h24":29.9},"volume":{"h24":1203293.43,"h6":387326.63,"h1":32666.87,"m5":1684.1},"liquidity":{"usd":185667.11,"base":17585491,"quote":92839},"txns":{"m5":{"buys":42,"sells":11},"h1":{"buys":693,"sells":165},"h6":{"buys":5511,"sells":1380},"h24":{"buys":19313,"sells":4915}},"marketCap":5278637,"fdv":5278637,"pairCreatedAt":1776276527000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/_I61KDCWQaZl07YL?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"0xd8162fD2ee09b2F7fcd4A86e81029Be02644606B","chainId":"ethereum","baseToken":{"address":"0x45547AB0100f5E8b158258b6d94D7586De69fc21","name":"Mystery","symbol":"MYSTERY"},"priceUsd":"0.000000003868","priceChange":{"m5":-3.53,"h1":-13.78,"h6":45651,"h24":45651},"volume":{"h24":968360.87,"h6":968360.87,"h1":58841.22,"m5":3292.74},"liquidity":{"usd":153516.35,"base":19843157186344,"quote":32.993},"txns":{"m5":{"buys":5,"sells":5},"h1":{"buys":79,"sells":56},"h6":{"buys":760,"sells":524},"h24":{"buys":760,"sells":524}},"marketCap":1627332,"fdv":1627332,"pairCreatedAt":1776797231000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/u4icy_uHFUb4rxpV?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"4xH46rUB6ZmSPeY24jvX1ynE7WzwNSibTyUPgZezFrfg","chainId":"solana","baseToken":{"address":"4wMWXp7okGLbTcJpcmhfoVNa3B2JLx2yuzGFD51Ppump","name":"DogeWeedWojakNoScopeDuckSnoop","symbol":"GME"},"priceUsd":"0.00001021","priceChange":{"m5":-6.1,"h1":-25.74,"h6":-85.52,"h24":-72.06},"volume":{"h24":852386.31,"h6":95763.97,"h1":4299.52,"m5":124.92},"liquidity":{"usd":8509.56,"base":414539516,"quote":49.6682},"txns":{"m5":{"buys":3,"sells":8},"h1":{"buys":315,"sells":102},"h6":{"buys":2349,"sells":1387},"h24":{"buys":12888,"sells":9380}},"marketCap":10208,"fdv":10208,"pairCreatedAt":1776726801000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/lJK7lFNlpbXmiyR7?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"4YiRHbJx1S1XN65cGtgMUJvMC4wfHCtTKfN3w6Kg5R36","chainId":"solana","baseToken":{"address":"4JBeo37fKhEsTXp6PtAYktYRnDAa8DcXZaZ4tTuPpump","name":"Tardi","symbol":"TARDI"},"priceUsd":"0.00008150","priceChange":{"m5":-0.46,"h1":-2.4,"h6":38.13,"h24":-7.25},"volume":{"h24":786413.06,"h6":669289.23,"h1":125082.86,"m5":11464.95},"liquidity":{"usd":31336.66,"base":192346064,"quote":181.9135},"txns":{"m5":{"buys":147,"sells":114},"h1":{"buys":1972,"sells":1462},"h6":{"buys":10542,"sells":7791},"h24":{"buys":12547,"sells":9271}},"marketCap":81501,"fdv":81501,"pairCreatedAt":1776614323000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/VyVAWKXyxma6wUo_?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"4BDd8MzUX48UPSixFb1jG56mUzt2w5cvCGo4if12o7TW","chainId":"solana","baseToken":{"address":"5vRKL81u2DfjEWoN5Z5hyiVtKCvijRxAGqShNKXTpump","name":"Just HOLD","symbol":"HOLD"},"priceUsd":"0.0001676","priceChange":{"m5":0.34,"h1":-29.3,"h6":36.66,"h24":-5.49},"volume":{"h24":774458.38,"h6":456751.15,"h1":85060.98,"m5":3874.15},"liquidity":{"usd":34598.32,"base":102582038,"quote":202.0949},"txns":{"m5":{"buys":43,"sells":42},"h1":{"buys":674,"sells":704},"h6":{"buys":3781,"sells":3333},"h24":{"buys":18512,"sells":6423}},"marketCap":164870,"fdv":164870,"pairCreatedAt":1776649513000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/2tElx35n5rbeWHDw?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"GCwJrZN7NKGduwgxrjBNrKfhjwLTo6hHuYVso2xxjDCY","chainId":"solana","baseToken":{"address":"CAjtTHvC878f8cZ4zEwdvgjkjFM7rbYN8Mb1go1cpump","name":"Dumb Money","symbol":"DUMBMONEY"},"priceUsd":"0.001867","priceChange":{"m5":-0.96,"h1":-4.87,"h6":-16.82,"h24":-33.36},"volume":{"h24":611966.77,"h6":249842.47,"h1":26097.09,"m5":1604.72},"liquidity":{"usd":53830.34,"base":9747059,"quote":413.8657},"txns":{"m5":{"buys":12,"sells":24},"h1":{"buys":166,"sells":296},"h6":{"buys":1293,"sells":1905},"h24":{"buys":4155,"sells":5106}},"marketCap":1867707,"fdv":1867707,"pairCreatedAt":1776380172000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/olWlBGDg8RFIuk5u?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"0xA33FE636F47885a4BF3B0b3Fc23130369a449590","chainId":"ethereum","baseToken":{"address":"0xE74200193FDb4195e8b7Fc2D263af4a8322b5A5A","name":"Rise NASA","symbol":"RISE"},"priceUsd":"0.000002480","priceChange":{"m5":-1.52,"h1":-9.69,"h6":-7.56,"h24":-6.51},"volume":{"h24":604034.9,"h6":77117.43,"h1":8535.22,"m5":378.36},"liquidity":{"usd":95642.4,"base":19281647901,"quote":20.5526},"txns":{"m5":{"buys":0,"sells":1},"h1":{"buys":23,"sells":15},"h6":{"buys":133,"sells":87},"h24":{"buys":729,"sells":511}},"marketCap":1043370,"fdv":1043370,"pairCreatedAt":1776579347000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/cIgATgT0ki78CYu1?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"2Ddr1eZNZqYLTKzoMwvosJJ86ZpQKdmimppjonTzrVqs","chainId":"solana","baseToken":{"address":"nHtKdt67T4DHX5FfcXuwAviHEhJM552nrXmHW7xpump","name":"Millions Coded","symbol":"ADHD"},"priceUsd":"0.0001452","priceChange":{"m5":-3.99,"h1":-1.1,"h6":-42.27,"h24":15.95},"volume":{"h24":494404.07,"h6":167743.03,"h1":17983.09,"m5":758.61},"liquidity":{"usd":37920.69,"base":130659889,"quote":220.1368},"txns":{"m5":{"buys":7,"sells":6},"h1":{"buys":211,"sells":129},"h6":{"buys":1597,"sells":1192},"h24":{"buys":4756,"sells":4190}},"marketCap":145226,"fdv":145226,"pairCreatedAt":1776615319000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/eY74IIO_HRWlbHPI?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"8oKFo9vs25MGnJoHZ9hSs2B5PS4oENfyMDSc5UNFkNte","chainId":"solana","baseToken":{"address":"2b9iJWg3sppbAAQMuKBXa1iuSSsuPvKwcdiA4VdNpump","name":"Make Human Great Again","symbol":"MHGA"},"priceUsd":"0.00002784","priceChange":{"m5":-4.64,"h1":45.6,"h6":116,"h24":-19.96},"volume":{"h24":433096.92,"h6":39071.26,"h1":6865.67,"m5":326.77},"liquidity":{"usd":13406.46,"base":239561174,"quote":78.2391},"txns":{"m5":{"buys":2,"sells":6},"h1":{"buys":98,"sells":68},"h6":{"buys":551,"sells":436},"h24":{"buys":6413,"sells":5159}},"marketCap":27847,"fdv":27847,"pairCreatedAt":1776775064000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/FU9kAuumusqEVI7T?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"JDb4wsXBkdTCSkRkEh7NbsMoRhtXkbCCtHdqFa48NLB1","chainId":"solana","baseToken":{"address":"EEmHzKKTcuG4XS178MuYjbp4DPF7s3xZcsGoJfCpump","name":"The Fat Chud","symbol":"Curak"},"priceUsd":"0.000008192","priceChange":{"m5":23.56,"h1":-5.27,"h6":-81.76,"h24":-76.84},"volume":{"h24":353586.68,"h6":47014.25,"h1":2353.1,"m5":459.87},"liquidity":{"usd":7216.59,"base":440087632,"quote":41.9677},"txns":{"m5":{"buys":5,"sells":2},"h1":{"buys":34,"sells":32},"h6":{"buys":610,"sells":576},"h24":{"buys":4712,"sells":3876}},"marketCap":8187,"fdv":8187,"pairCreatedAt":1776784570000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/hqr0mGtPI9pGqArM?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"0x85fE8a6d3b732f64280b5f4608167707D4E098FA","chainId":"ethereum","baseToken":{"address":"0xE67c639CCa4B610fD87A1A7eB8fF8452D06A584e","name":"Tu Xingxing","symbol":"TOSTAR"},"priceUsd":"0.0000004655","priceChange":{"h1":32.92,"h6":25.55,"h24":6777},"volume":{"h24":346740.65,"h6":122891.59,"h1":14433.02,"m5":0},"liquidity":{"usd":40088.84,"base":43058552957,"quote":8.6167},"txns":{"m5":{"buys":0,"sells":0},"h1":{"buys":57,"sells":22},"h6":{"buys":362,"sells":193},"h24":{"buys":859,"sells":504}},"marketCap":195838,"fdv":195838,"pairCreatedAt":1776784703000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/Kwxou2ylEvqKdArQ?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"0xff84c6c006F4137b35d34eD0Af79d114C6903DA3","chainId":"ethereum","baseToken":{"address":"0x3009B6833f8925b7985C2408c49160dD1aB317CA","name":"Haha Yes Hedgehog","symbol":"RIZO"},"priceUsd":"0.0000007003","priceChange":{"m5":-2.78,"h1":-12.15,"h6":-29.4,"h24":10.28},"volume":{"h24":321078.56,"h6":52141.68,"h1":2224.86,"m5":360.75},"liquidity":{"usd":49035.31,"base":35010020164,"quote":10.5308},"txns":{"m5":{"buys":0,"sells":2},"h1":{"buys":3,"sells":13},"h6":{"buys":140,"sells":103},"h24":{"buys":710,"sells":489}},"marketCap":294611,"fdv":294611,"pairCreatedAt":1776621515000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/nIF01PmrhSo7HvL9?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"DbKQVHEtNTr4zJB4QcAnfokJMHu3pQ6w9CYmHLZUhxCL","chainId":"solana","baseToken":{"address":"Hc2CZzfiuBuSjTg6mpUByHVryy5e4yu8L7L4vtppump","name":"AI Coach Rudi","symbol":"Rudi"},"priceUsd":"0.0002511","priceChange":{"m5":1.28,"h1":-13.19,"h6":-18.08,"h24":-32.61},"volume":{"h24":298343.67,"h6":55036.37,"h1":5395.24,"m5":688.63},"liquidity":{"usd":46091.9,"base":91847855,"quote":267.5188},"txns":{"m5":{"buys":10,"sells":3},"h1":{"buys":55,"sells":38},"h6":{"buys":379,"sells":306},"h24":{"buys":1980,"sells":1457}},"marketCap":207146,"fdv":207146,"pairCreatedAt":1776062323000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/RHlzhdvwUu3DtKqp?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"Fcd5sRvp7z4ehuWGa4VYUgHmTugwBELi7YnmNPY1vB7Y","chainId":"solana","baseToken":{"address":"71Ys7KutNBqoPtAkhdSALCpBZArnXaywYsxfM58tpump","name":"Mog Coin","symbol":"MOG"},"priceUsd":"0.00002122","priceChange":{"h1":-3.49,"h6":-24.44,"h24":-39.37},"volume":{"h24":278653.2,"h6":3111.83,"h1":157.5,"m5":0},"liquidity":{"usd":11569.78,"base":270882574,"quote":67.9367},"txns":{"m5":{"buys":0,"sells":0},"h1":{"buys":2,"sells":9},"h6":{"buys":3551,"sells":1249},"h24":{"buys":15472,"sells":7185}},"marketCap":21228,"fdv":21228,"pairCreatedAt":1776743388000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/hPaW5m8cV_O4iBfh?width=800&height=800&quality=95&format=auto"}},{"pairAddress":"7yY6YGvFeeX3G4np8XmRjrXcKVX6ebgynQ7kYQ9GJDjW","chainId":"solana","baseToken":{"address":"CAjtTHvC878f8cZ4zEwdvgjkjFM7rbYN8Mb1go1cpump","name":"Dumb Money","symbol":"DUMBMONEY"},"priceUsd":"0.001931","priceChange":{"h1":-1.76,"h6":-14.56,"h24":-29.55},"volume":{"h24":230530.47,"h6":92558.32,"h1":14890.16,"m5":0},"liquidity":{"usd":61856.72,"base":13035526,"quote":426.3072},"txns":{"m5":{"buys":0,"sells":0},"h1":{"buys":42,"sells":19},"h6":{"buys":156,"sells":231},"h24":{"buys":524,"sells":631}},"marketCap":1931418,"fdv":1931418,"pairCreatedAt":1776380135000,"info":{"imageUrl":"https://cdn.dexscreener.com/cms/images/olWlBGDg8RFIuk5u?width=800&height=800&quality=95&format=auto"}}];

const S = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600;700&display=swap');
  :root{--bg:#020408;--card:#080f1a;--border:#0f1f33;--border2:#172840;--cyan:#00f5ff;--cyan-dim:#00f5ff10;--magenta:#ff006e;--magenta-dim:#ff006e14;--yellow:#ffe600;--yellow-dim:#ffe60014;--green:#00ff88;--green-dim:#00ff8814;--red:#ff2d55;--purple:#bf5fff;--purple-dim:#bf5fff14;--orange:#ff6b00;--muted:#1a3050;--text:#a8c4d8;--bright:#dff0ff;--dim:#3a5570}
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:var(--bg);color:var(--text);font-family:'Rajdhani',sans-serif;min-height:100vh}
  body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;background-image:linear-gradient(rgba(0,245,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,.02) 1px,transparent 1px);background-size:36px 36px}
  .wrap{max-width:900px;margin:0 auto;padding:20px 14px 90px;position:relative;z-index:1}
  .hdr{margin-bottom:20px}
  .htop{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px}
  .eyebrow{font-family:'Orbitron',monospace;font-size:9px;letter-spacing:4px;color:var(--cyan);text-transform:uppercase;margin-bottom:6px;display:flex;align-items:center;gap:8px}
  .eyebrow::before{content:'';width:20px;height:1px;background:var(--cyan)}
  .htitle{font-family:'Orbitron',monospace;font-size:22px;font-weight:900;color:var(--bright);letter-spacing:-1px}
  .htitle span{color:var(--cyan)}
  .hsub{font-size:12px;color:var(--dim);margin-top:4px}
  .scluster{display:flex;flex-direction:column;align-items:flex-end;gap:6px}
  .lpill{display:flex;align-items:center;gap:6px;border:1px solid var(--cyan);background:var(--cyan-dim);padding:5px 12px;border-radius:4px;font-family:'Orbitron',monospace;font-size:9px;color:var(--cyan);letter-spacing:2px}
  .ldot{width:6px;height:6px;border-radius:50%;background:var(--cyan);animation:bk 1s infinite}
  @keyframes bk{0%,100%{opacity:1;box-shadow:0 0 6px var(--cyan)}50%{opacity:.1;box-shadow:none}}
  .srow{display:flex;gap:16px}
  .sv{font-family:'Orbitron',monospace;font-size:15px;font-weight:700;color:var(--bright)}
  .sl{font-size:9px;color:var(--dim);letter-spacing:1px;text-transform:uppercase}
  .filters{display:flex;gap:6px;flex-wrap:wrap;background:#060c14;border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:14px;align-items:center}
  .fb{padding:5px 12px;border-radius:4px;border:1px solid var(--border2);background:transparent;color:var(--dim);cursor:pointer;font-family:'Rajdhani',sans-serif;font-size:12px;font-weight:600;letter-spacing:.5px;transition:all .15s}
  .fb:hover{color:var(--text);border-color:var(--dim)}
  .fb.on{background:var(--cyan-dim);border-color:var(--cyan);color:var(--cyan)}
  .fsep{width:1px;height:22px;background:var(--border)}
  .prog{height:1px;background:var(--border);margin-bottom:14px;overflow:hidden}
  .pfill{height:100%;background:linear-gradient(90deg,var(--cyan),var(--magenta));animation:sw 1.6s ease-in-out infinite}
  @keyframes sw{0%{width:0%;margin-left:0}50%{width:50%;margin-left:25%}100%{width:0%;margin-left:100%}}
  .banner{background:var(--magenta-dim);border:1px solid var(--magenta);border-radius:6px;padding:9px 12px;margin-bottom:10px;display:flex;align-items:center;gap:10px;font-size:13px;color:var(--magenta);font-weight:600;animation:af 2s infinite}
  @keyframes af{0%,100%{opacity:1}50%{opacity:.65}}
  .bclose{margin-left:auto;background:none;border:none;color:inherit;cursor:pointer;font-size:15px}
  .cards{display:flex;flex-direction:column;gap:10px}
  .gc{background:var(--card);border:1px solid var(--border);border-radius:10px;overflow:hidden;transition:border-color .2s}
  .gc.hot{border-color:#ff006e55;box-shadow:0 0 24px #ff006e09}
  .gc.warm{border-color:#ffe60040}
  .gc.fresh{border-color:#00ff8840}
  .gst{height:2px;width:100%}
  .st-hot{background:linear-gradient(90deg,var(--magenta),var(--purple),var(--cyan))}
  .st-new{background:linear-gradient(90deg,var(--green),var(--cyan))}
  .st-warm{background:linear-gradient(90deg,var(--yellow),var(--orange))}
  .st-norm{background:var(--muted)}
  .gb{padding:14px 16px}
  .gtop{display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:11px}
  .gleft{display:flex;align-items:center;gap:11px}
  .gico{width:40px;height:40px;border-radius:8px;flex-shrink:0;background:var(--muted);border:1px solid var(--border2);display:flex;align-items:center;justify-content:center;font-size:19px;overflow:hidden}
  .gico img{width:100%;height:100%;object-fit:cover;border-radius:7px}
  .gsym{font-family:'Orbitron',monospace;font-size:15px;font-weight:700;color:var(--bright);letter-spacing:-.5px}
  .gname{font-size:11px;color:var(--dim);margin-top:1px;max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
  .gchain{display:inline-flex;align-items:center;gap:3px;font-size:9px;padding:2px 7px;border-radius:3px;font-family:'Orbitron',monospace;letter-spacing:1px;margin-top:3px}
  .csol{background:#9945ff22;border:1px solid #9945ff55;color:#b06fff}
  .ceth{background:#627eea22;border:1px solid #627eea55;color:#8fa8ff}
  .cbsc{background:#f0b90b22;border:1px solid #f0b90b55;color:#f5c842}
  .cbase{background:#0052ff22;border:1px solid #0052ff55;color:#4d82ff}
  .carb{background:#28a0f022;border:1px solid #28a0f055;color:#5bbcff}
  .coth{background:var(--muted);border:1px solid var(--border2);color:var(--dim)}
  .gpb{text-align:right}
  .gprice{font-family:'Orbitron',monospace;font-size:13px;font-weight:700;color:var(--bright)}
  .gchg{font-family:'Orbitron',monospace;font-size:11px;margin-top:2px}
  .pos{color:var(--green)}.neg{color:var(--red)}
  .pills{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:11px}
  .pill{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:3px;border:1px solid;font-size:9px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-family:'Orbitron',monospace}
  .ph{background:var(--magenta-dim);border-color:var(--magenta);color:var(--magenta);animation:pg1 2s infinite}
  .pv{background:var(--cyan-dim);border-color:var(--cyan);color:var(--cyan)}
  .pp{background:var(--yellow-dim);border-color:var(--yellow);color:var(--yellow)}
  .pn{background:var(--green-dim);border-color:var(--green);color:var(--green);animation:pg2 1.8s infinite}
  .pb{background:var(--purple-dim);border-color:var(--purple);color:var(--purple)}
  @keyframes pg1{0%,100%{box-shadow:0 0 4px #ff006e30}50%{box-shadow:0 0 12px #ff006e60}}
  @keyframes pg2{0%,100%{box-shadow:0 0 4px #00ff8830}50%{box-shadow:0 0 12px #00ff8860}}
  .mets{display:grid;grid-template-columns:repeat(auto-fill,minmax(125px,1fr));gap:5px;margin-bottom:9px}
  .met{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px}
  .ml{font-size:9px;color:var(--dim);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:2px;font-family:'Orbitron',monospace}
  .mv{font-family:'Orbitron',monospace;font-size:12px;font-weight:700;color:var(--bright)}
  .ms{font-size:10px;color:var(--dim);margin-top:2px}
  .cwrap{background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:9px;margin-bottom:9px}
  .clbl{font-size:9px;color:var(--dim);letter-spacing:1.5px;text-transform:uppercase;margin-bottom:7px;font-family:'Orbitron',monospace}
  .csvg{width:100%;height:52px;display:block;overflow:visible}
  .gfoot{display:flex;align-items:center;justify-content:space-between;padding-top:5px;flex-wrap:wrap;gap:6px}
  .xbtn{background:none;border:none;color:var(--dim);font-size:11px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:600;letter-spacing:.5px;padding:0;transition:color .15s}
  .xbtn:hover{color:var(--cyan)}
  .dxlink{font-size:10px;color:var(--cyan);text-decoration:none;font-family:'Orbitron',monospace;letter-spacing:1px;border:1px solid var(--cyan-dim);padding:4px 10px;border-radius:4px;transition:all .15s}
  .dxlink:hover{background:var(--cyan-dim)}
  .rrow{display:flex;justify-content:space-between;align-items:center;margin-bottom:11px;flex-wrap:wrap;gap:5px}
  .rtxt{font-family:'Orbitron',monospace;font-size:9px;color:var(--dim);letter-spacing:1px}
`

const f$=n=>{if(!n&&n!==0)return'—';if(n>=1e9)return`$${(n/1e9).toFixed(2)}B`;if(n>=1e6)return`$${(n/1e6).toFixed(2)}M`;if(n>=1e3)return`$${(n/1e3).toFixed(1)}K`;return`$${n.toFixed(2)}`}
const fp=n=>{if(!n)return'—';if(n<0.000001)return`$${n.toExponential(2)}`;if(n<0.001)return`$${n.toFixed(8)}`;if(n<1)return`$${n.toFixed(6)}`;return`$${n.toFixed(4)}`}
const fa=ms=>{if(!ms)return'—';const m=(Date.now()-ms)/60000;if(m<60)return`${Math.floor(m)}m`;if(m<1440)return`${Math.floor(m/60)}h`;return`${Math.floor(m/1440)}d`}
const cc=c=>({solana:'csol',ethereum:'ceth',bsc:'cbsc',binance:'cbsc',base:'cbase',arbitrum:'carb'})[c?.toLowerCase()]||'coth'
const cl=c=>({solana:'◎ SOL',ethereum:'⬡ ETH',bsc:'⬡ BSC',binance:'⬡ BSC',base:'⬡ BASE',arbitrum:'⬡ ARB'})[c?.toLowerCase()]||(c?.toUpperCase()||'—')

function alerts(p){
  const a=[],v24=p.volume?.h24||0,v1=p.volume?.h1||0,v6=p.volume?.h6||0
  const c1=p.priceChange?.h1||0,c24=p.priceChange?.h24||0
  const b=p.txns?.h1?.buys||0,s=p.txns?.h1?.sells||0
  const age=(Date.now()-(p.pairCreatedAt||0))/60000
  const br=s>0?b/s:(b>0?99:1)
  const vr=v1>0&&v6>0?v1/(v6/6):0
  if(vr>1.5)          a.push({t:'vol',  l:`VOL +${((vr-1)*100).toFixed(0)}% 1H`,c:'pv'})
  if(c1>20)           a.push({t:'price',l:`+${c1.toFixed(0)}% 1H 🚀`,           c:'pp'})
  if(c24>50)          a.push({t:'price',l:`+${c24.toFixed(0)}% 24H`,             c:'pp'})
  if(age<360&&v24>=10000) a.push({t:'new',l:`NOVO ${age<60?Math.floor(age)+'MIN':Math.floor(age/60)+'H'}`,c:'pn'})
  if(br>2&&b>10)      a.push({t:'buy',  l:`BUY ${br.toFixed(1)}×`,              c:'pb'})
  if(c1>20&&vr>1.5)   a.push({t:'hot',  l:'🔥 GEM QUENTE',                       c:'ph'})
  return a
}
const score=p=>{const a=alerts(p);return a.filter(x=>x.t==='hot').length*5+a.filter(x=>x.t==='price').length*3+a.filter(x=>x.t==='vol').length*2+a.filter(x=>x.t==='new').length*2+a.filter(x=>x.t==='buy').length}
const gcls=p=>{const a=alerts(p);if(a.some(x=>x.t==='hot'))return'gc hot';if(a.some(x=>x.t==='new'))return'gc fresh';if(a.some(x=>x.t==='vol'||x.t==='price'))return'gc warm';return'gc'}
const stcls=p=>{const a=alerts(p);if(a.some(x=>x.t==='hot'))return'gst st-hot';if(a.some(x=>x.t==='new'))return'gst st-new';if(a.some(x=>x.t==='vol'||x.t==='price'))return'gst st-warm';return'gst st-norm'}

// Fetch direto ao DexScreener — funciona perfeitamente fora do sandbox Claude
async function fetchDex() {
  // 1. Pega token addresses dos endpoints de trending
  const tokenMap = {}
  for (const url of [
    'https://api.dexscreener.com/token-boosts/top/v1',
    'https://api.dexscreener.com/token-boosts/latest/v1',
    'https://api.dexscreener.com/token-profiles/latest/v1',
  ]) {
    try {
      const r = await fetch(url)
      const j = await r.json()
      const list = Array.isArray(j) ? j : (j.data || [])
      for (const item of list) {
        if (item.tokenAddress && item.chainId) tokenMap[item.tokenAddress] = item.chainId
      }
    } catch(e) {}
  }

  const addrs = Object.keys(tokenMap)
  if (!addrs.length) throw new Error('Sem tokens trending')

  // 2. Busca pares em batches de 10
  const pairs = [], seen = new Set()
  for (let i = 0; i < Math.min(addrs.length, 60); i += 10) {
    const batch = addrs.slice(i, i + 10).join(',')
    try {
      const r = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${batch}`)
      const j = await r.json()
      for (const p of (j.pairs || [])) {
        if (!p?.pairAddress || seen.has(p.pairAddress)) continue
        seen.add(p.pairAddress)
        if ((p.volume?.h24 || 0) >= 10000 && p.priceUsd && (p.liquidity?.usd || 0) >= 500)
          pairs.push(p)
      }
    } catch(e) {}
    await new Promise(r => setTimeout(r, 100))
  }

  return pairs.sort((a, b) => score(b) - score(a)).slice(0, 40)
}

function Spark({d}){
  if(!d||d.length<2)return null
  const mn=Math.min(...d),mx=Math.max(...d),rng=mx-mn||1,W=300,H=46
  const pts=d.map((v,i)=>`${(i/(d.length-1))*W},${H-((v-mn)/rng)*H}`).join(' ')
  const up=d.at(-1)>=d[0],col=up?'#00ff88':'#ff2d55'
  const id=`s${Math.random().toString(36).slice(2,6)}`
  return(
    <svg className="csvg" viewBox={`0 0 ${W} ${H+2}`} preserveAspectRatio="none">
      <defs><linearGradient id={id} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={col} stopOpacity=".35"/><stop offset="100%" stopColor={col} stopOpacity="0"/></linearGradient></defs>
      <polygon points={`0,${H+2} ${pts} ${W},${H+2}`} fill={`url(#${id})`}/>
      <polyline points={pts} fill="none" stroke={col} strokeWidth="1.5" strokeLinejoin="round"/>
      <circle cx={W} cy={H-((d.at(-1)-mn)/rng)*H} r="3" fill={col}/>
    </svg>
  )
}

function Card({p}){
  const [exp,setExp]=useState(false)
  const al=alerts(p)
  const c1=p.priceChange?.h1||0,c24=p.priceChange?.h24||0
  const b=p.txns?.h1?.buys||0,s=p.txns?.h1?.sells||0
  const sp=(()=>{
    const base=parseFloat(p.priceUsd)||0
    if(!base)return[]
    const pts=[base*(1-c24/100),base*(1-(c24/100))*(1+(p.priceChange?.h6||0)/200),base*(1-c1/100),base]
    return Array.from({length:16},(_,i)=>{const t=i/15,sg=Math.floor(t*3),lt=t*3-sg,a=pts[Math.min(sg,3)],bv=pts[Math.min(sg+1,3)];return a+(bv-a)*lt+(Math.random()-.5)*base*.015})
  })()
  return(
    <div className={gcls(p)}>
      <div className={stcls(p)}/>
      <div className="gb">
        <div className="gtop">
          <div className="gleft">
            <div className="gico">{p.info?.imageUrl?<img src={p.info.imageUrl} alt="" onError={e=>e.target.style.display='none'}/>:'💎'}</div>
            <div>
              <div className="gsym">{p.baseToken?.symbol||'—'}</div>
              <div className="gname">{p.baseToken?.name||''}</div>
              <div className={`gchain ${cc(p.chainId)}`}>{cl(p.chainId)} · {fa(p.pairCreatedAt)}</div>
            </div>
          </div>
          <div className="gpb">
            <div className="gprice">{fp(parseFloat(p.priceUsd))}</div>
            <div className={`gchg ${c1>=0?'pos':'neg'}`}>{c1>=0?'+':''}{c1.toFixed(1)}% 1H</div>
            <div className={`gchg ${c24>=0?'pos':'neg'}`} style={{fontSize:10}}>{c24>=0?'+':''}{c24.toFixed(1)}% 24H</div>
          </div>
        </div>
        {al.length>0&&<div className="pills">{al.map((a,i)=><span key={i} className={`pill ${a.c}`}>{a.l}</span>)}</div>}
        <div className="mets">
          {[
            {l:'Vol 24H',v:f$(p.volume?.h24),s:`1H: ${f$(p.volume?.h1)}`},
            {l:'Mkt Cap',v:f$(p.marketCap||p.fdv),s:`FDV: ${f$(p.fdv)}`},
            {l:'Liquidez',v:f$(p.liquidity?.usd),s:`Base: ${f$(p.liquidity?.base)}`},
            {l:'Txns 1H',v:b+s,s:<><span className="pos">B:{b}</span>{' / '}<span className="neg">S:{s}</span></>},
            {l:'Vol 6H',v:f$(p.volume?.h6),s:`5M: ${f$(p.volume?.m5)}`},
            {l:'Chg 6H',v:<span className={(p.priceChange?.h6||0)>=0?'pos':'neg'}>{(p.priceChange?.h6||0)>=0?'+':''}{(p.priceChange?.h6||0).toFixed(1)}%</span>,s:`5M: ${(p.priceChange?.m5||0).toFixed(1)}%`},
          ].map((m,i)=><div key={i} className="met"><div className="ml">{m.l}</div><div className="mv">{m.v}</div><div className="ms">{m.s}</div></div>)}
        </div>
        {exp&&sp.length>0&&<div className="cwrap"><div className="clbl">Estimativa 24H</div><Spark d={sp}/></div>}
        <div className="gfoot">
          <button className="xbtn" onClick={()=>setExp(e=>!e)}>{exp?'▲ Ocultar':'▼ Gráfico'}</button>
          <a className="dxlink" href={`https://dexscreener.com/${p.chainId}/${p.pairAddress}`} target="_blank" rel="noopener noreferrer">↗ DEXSCREENER</a>
        </div>
      </div>
    </div>
  )
}

const TABS=['Todos','🔥 Hot','🆕 Novos','📈 Vol','🚀 +20%']

export default function GemRadar(){
  const [gems,setGems]=useState(()=>SEED.sort((a,b)=>score(b)-score(a)))
  const [busy,setBusy]=useState(false)
  const [tab,setTab]=useState('Todos')
  const [lastUp,setLastUp]=useState(new Date('2026-04-22T00:03:00'))
  const [cd,setCd]=useState(60)
  const [banners,setBanners]=useState([])
  const prev=useRef(SEED)
  const timer=useRef(null)

  const scan=useCallback(async()=>{
    setBusy(true)
    try{
      const fresh=await fetchDex()
      if(fresh.length){
        const ps=new Set(prev.current.map(g=>g.pairAddress))
        const newOnes=fresh.filter(g=>!ps.has(g.pairAddress))
        if(newOnes.length&&prev.current.length)
          setBanners(b=>[...newOnes.slice(0,3).map(g=>({id:g.pairAddress,msg:`⚡ Nova: ${g.baseToken?.symbol} (${cl(g.chainId)}) — Vol ${f$(g.volume?.h24)}`})),...b].slice(0,5))
        prev.current=fresh
        setGems(fresh)
        setLastUp(new Date())
        setCd(60)
      }
    }catch(e){console.warn(e)}
    setBusy(false)
  },[])

  useEffect(()=>{scan()},[])
  useEffect(()=>{
    timer.current=setInterval(()=>setCd(c=>{if(c<=1){scan();return 60}return c-1}),1000)
    return()=>clearInterval(timer.current)
  },[scan])

  const list=gems.filter(p=>{
    const a=alerts(p)
    if(tab==='🔥 Hot')   return a.some(x=>x.t==='hot')
    if(tab==='🆕 Novos') return a.some(x=>x.t==='new')
    if(tab==='📈 Vol')   return a.some(x=>x.t==='vol')
    if(tab==='🚀 +20%')  return a.some(x=>x.t==='price')
    return true
  })

  const hot=gems.filter(g=>alerts(g).some(a=>a.t==='hot')).length
  const novo=gems.filter(g=>alerts(g).some(a=>a.t==='new')).length

  return(
    <><style>{S}</style>
    <div className="wrap">
      <div className="hdr">
        <div className="htop">
          <div>
            <div className="eyebrow">DexScreener · All Chains</div>
            <div className="htitle">GEM<span>RADAR</span></div>
            <div className="hsub">Volume &gt; $10K · Atualiza 60s</div>
          </div>
          <div className="scluster">
            <div className="lpill"><span className="ldot"/>{busy?'BUSCANDO':'LIVE'}</div>
            <div className="srow">
              <div><div className="sv">{gems.length}</div><div className="sl">Gemas</div></div>
              <div><div className="sv" style={{color:'var(--magenta)'}}>{hot}</div><div className="sl">Hot</div></div>
              <div><div className="sv" style={{color:'var(--green)'}}>{novo}</div><div className="sl">Novas</div></div>
            </div>
          </div>
        </div>
      </div>

      {banners.map(b=>(
        <div key={b.id} className="banner">
          <span>{b.msg}</span>
          <button className="bclose" onClick={()=>setBanners(bb=>bb.filter(x=>x.id!==b.id))}>✕</button>
        </div>
      ))}

      <div className="filters">
        {TABS.map(t=><button key={t} className={`fb ${tab===t?'on':''}`} onClick={()=>setTab(t)}>{t}</button>)}
        <div className="fsep"/>
        <button className="fb" onClick={scan} disabled={busy}>{busy?'⟳...':'⟳'}</button>
      </div>

      {busy&&<div className="prog"><div className="pfill"/></div>}

      <div className="rrow">
        <div className="rtxt">Atualizado: {lastUp?.toLocaleTimeString('pt-BR')} · {cd}s</div>
        <div className="rtxt">{list.length} exibidas</div>
      </div>

      <div className="cards">{list.map(p=><Card key={p.pairAddress} p={p}/>)}</div>
    </div></>
  )
}
