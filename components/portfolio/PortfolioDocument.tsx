import type { CSSProperties, ReactNode } from 'react';
import Image from 'next/image';
import type { PortfolioContent } from '@/lib/portfolioData';
import '@fontsource-variable/montserrat/wght.css';
import '@fontsource-variable/montserrat/wght-italic.css';
import '@fontsource/barlow-condensed/300.css';
import './portfolio.css';

/* ------------------------------------------------------------------
   Geometry helpers. All numbers are PDF points on a 595.276 x 841.89 page,
   taken from the original brochure, so the layout matches it exactly.
------------------------------------------------------------------- */

const W = 595.276;
const H = 841.89;

const u = (n: number) => `calc(var(--u) * ${Math.round(n * 100) / 100})`;

/** Absolute box. */
const box = (x: number, y: number, w?: number, h?: number): CSSProperties => ({
    position: 'absolute',
    left: u(x),
    top: u(y),
    ...(w !== undefined ? { width: u(w) } : {}),
    ...(h !== undefined ? { height: u(h) } : {}),
});

/** Top of a line box so that Montserrat text lands where the PDF put it.
 *  `y` is the top of the first line's glyph box in the PDF. */
const lineTop = (y: number, size: number, lh: number) => y + 0.6625 * size - lh / 2;

/** Absolutely placed text block. */
const text = (x: number, y: number, size: number, lh: number, w?: number): CSSProperties => ({
    position: 'absolute',
    left: u(x),
    top: u(lineTop(y, size, lh)),
    fontSize: u(size),
    lineHeight: u(lh),
    ...(w !== undefined ? { width: u(w) } : {}),
});

const font = (size: number, lh: number): CSSProperties => ({ fontSize: u(size), lineHeight: u(lh) });

const asset = (name: string) => `/portfolio/${name}`;

/** CSS custom properties for bullets. */
const vars = (v: Record<string, string | number>) => v as CSSProperties;

/** Letter-spacing in thousandths of an em, as set in the original artwork. */
const track = (n: number): CSSProperties => ({ letterSpacing: `${n / 1000}em` });

/** Keeps hyphenated words ("medium-size") on one line, as the original does. */
function keepHyphens(value: string): ReactNode[] {
    return value.split(/(\S+-\S+)/).map((part, i) => (i % 2 ? <span key={i} className="pf-nowrap">{part}</span> : part));
}

// Row heights of the portfolio table, in points.
const TABLE_ROWS = [76.7, 74.3, 99, 108.8, 68.2, 77.4];

// Heights of the eight service icons, in points.
const SERVICE_ICON_H = [32.3, 31.3, 31, 31.3, 32.7, 31.3, 31.3, 34.7];

function Img({ src, x, y, w, h, alt = '', priority = false, fit = 'cover' }: { src: string; x: number; y: number; w: number; h: number; alt?: string; priority?: boolean; fit?: 'cover' | 'contain' }) {
    return (
        <div style={{ ...box(x, y, w, h), overflow: 'hidden' }}>
            <Image src={asset(src)} alt={alt} fill unoptimized priority={priority} sizes="(min-width: 800px) 794px, 100vw" style={{ objectFit: fit }} />
        </div>
    );
}

function Page({ n, numColor = 'rgba(255,255,255,0.55)', numTop = 17.5, strip = 5.2, label, children }: { n?: number; numColor?: string; numTop?: number; strip?: number; label: string; children: ReactNode }) {
    return (
        <section className="pf-sheet" aria-label={label}>
            <div className="pf-page">
                {children}
                {n !== undefined && (
                    <span className="pf-num" style={{ top: u(numTop - 8.1), color: numColor }} aria-hidden>
                        {String(n).padStart(2, '0')}
                    </span>
                )}
                <div className="pf-strip" style={{ height: u(strip) }} />
            </div>
        </section>
    );
}

/** Dark photo banner with a white section title. */
function Banner({ image, title, height = 157.1, x = 69.6, y = 56.3 }: { image: string; title: string; height?: number; x?: number; y?: number }) {
    return (
        <>
            <Img src={image} x={0} y={0} w={W} h={height} />
            <h2 className="pf-title pf-white" style={{ left: u(x), top: u(lineTop(y, 60, 72)) }}>{title}</h2>
        </>
    );
}

function LogoMark({ x, y, w }: { x: number; y: number; w: number }) {
    return (
        <div style={box(x, y, w, (w * 113) / 134)}>
            <Image src="/logo-mark.svg" alt="BYC" fill unoptimized />
        </div>
    );
}

/** "Name of body (ABBR)" → ["Name of body", "(ABBR)"] */
function splitAbbr(value: string): [string, string] {
    const match = value.match(/^([\s\S]*?)\s*(\([^()]+\))\s*$/);
    return match ? [match[1], match[2]] : [value, ''];
}

const abbrOf = (value: string) => splitAbbr(value)[1];

/* ------------------------------------------------------------------ */

export default function PortfolioDocument({ content }: { content: PortfolioContent }) {
    const c = content;

    // Accreditations already named in a green note are not repeated in the grid.
    const noteAbbrs = c.accreditationNotes.map(abbrOf).filter(Boolean);
    const gridBodies = c.accreditations.filter((a) => !noteAbbrs.includes(abbrOf(a)));

    const nameParts = c.partnerName.trim().split(' ');
    const partnerLast = nameParts.length > 1 ? nameParts.pop() : '';
    const partnerFirst = nameParts.join(' ');

    return (
        <div className="pf-stack">
            {/* ---------- Cover ---------- */}
            <Page label="Cover">
                <LogoMark x={98.4} y={65.5} w={99.8} />
                <div style={{ ...box(296.9, 38.3, 0.75, 146.3), background: '#0ca859' }} />
                <h1 className="pf-extrabold" style={{ ...text(374.4, 66.1, 24, 28.8, 172), ...track(-22) }}>{c.subtitle}</h1>
                <p style={{ ...text(373.2, 126.5, 12, 14.4, 180), color: '#105e30' }}>{c.tagline}</p>

                <Img src="cover.webp" x={0} y={243.4} w={W} h={408.9} priority />
                <p className="pf-pre pf-white" style={text(44.6, 278.1, 46.3, 55.5)}>{c.coverTitle}</p>

                <div style={{ ...box(0, 652.3, W, 184.4), background: '#f5f5f5' }} />
                <p className="pf-extrabold pf-center" style={{ ...text(0, 713, 24, 28.8, W), color: '#374ca0', ...track(-23) }}>{c.website}</p>
            </Page>

            {/* ---------- 01 Who we are ---------- */}
            <Page n={1} strip={2.2} numColor="rgba(255,255,255,0.8)" label="Who we are">
                <Img src="sky.webp" x={0} y={0} w={W} h={114} />
                <Img src="building.webp" x={0} y={445.5} w={W} h={394.2} />
                <h2 className="pf-black pf-italic pf-nowrap" style={{ ...text(89, 274.5, 60, 72), color: '#4b4f4e' }}>WHO WE ARE</h2>
            </Page>

            {/* ---------- 02 Portfolio ---------- */}
            <Page n={2} label="Portfolio">
                <Banner image="head-portfolio.webp" title="Portfolio" />
                <div style={{ ...box(68.1, 209.7, 445.5, 85.4), background: '#1f160c' }} />
                <p className="pf-white" style={text(91.4, 223.2, 22, 26.4, 405)}>
                    <b className="pf-bold">{c.subtitle},</b> {c.firmDescriptor}
                </p>
                <dl className="pf-table" style={box(68.4, 295.1, 444.9, 504.4)}>
                    {c.stats.map((row, i) => {
                        const lines = Math.max(Math.ceil(row.label.length / 20), Math.ceil(row.value.length / 19));
                        const weight = TABLE_ROWS[i] ?? [68, 68, 76, 104, 125][Math.min(lines, 4)];
                        const labelY = [13.6, 10.4, 16.7, 9.6, 16.4, 12.3][i] ?? 13;
                        const valueY = [14.5, 5.4, 19.2, 11.8, 15.4, 12.2][i] ?? 13;
                        const valueX = [257.1, 257.1, 243, 242.7, 238.9, 238.9][i] ?? 243;
                        const paren = row.value.indexOf('(');
                        const isPerson = paren > 0 && /partner/i.test(row.label);
                        return (
                            <div key={row.label} className="pf-row" style={{ flex: `${weight} 1 0`, background: i === 5 ? '#f4f5f6' : i % 2 ? '#f9f9f9' : '#ffffff' }}>
                                <dt className={i >= 4 ? 'pf-extrabold' : 'pf-bold'} style={{ left: u(19), top: u(lineTop(labelY, 17, 20.4)), width: u(196), textWrap: 'balance', ...font(17, 20.4) }}>{row.label}</dt>
                                <dd style={{ left: u(valueX), top: u(lineTop(valueY, 18, 21.6)), width: u(444.9 - valueX + 2), ...font(18, 21.6) }}>
                                    {isPerson ? (
                                        <>
                                            <b className="pf-bold" style={track(-24)}>{row.value.slice(0, paren).trim()}</b> {row.value.slice(paren)}
                                        </>
                                    ) : row.value}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
            </Page>

            {/* ---------- 03 We believe ---------- */}
            <Page n={3} label="We believe">
                <Banner image="head-believe.webp" title="We Believe" height={158.9} x={69.2} y={58.1} />
                <div style={box(39.9, 203.2, 521.3)}>
                    {c.beliefs.map((item, i) => {
                        const second = i === 1; // set slightly differently in the original
                        const headGap = [30.1, 31.3, 35, 31][i] ?? 31;
                        const after = [11.7, 16.3, 9.6][i] ?? 12;
                        return (
                            <div key={item.title} style={{ marginBottom: u(after) }}>
                                <h3 className="pf-bold" style={{ ...font(second ? 20 : 21, 27.8), paddingBottom: u(headGap - 27.8), marginLeft: second ? u(-3.5) : undefined, ...(second ? track(4.7) : {}) }}>{item.title}</h3>
                                <div style={{ position: 'relative', background: '#f9f9f9', padding: second ? `${u(7.7)} ${u(73)} ${u(36.9)} ${u(17.8)}` : `${u(11)} ${u(i === 3 ? 53 : 20.5)} ${u([13.1, 0, 14.5, 11.9][i] ?? 13.1)} ${u(18.3)}` }}>
                                    {second && <div style={{ ...box(17.8, 10.9, 448, 59.1), background: '#f4f5f6' }} />}
                                    <p className={second ? 'pf-regular' : 'pf-light'} style={{ position: 'relative', ...(second ? font(15, 18) : font(16, 19.2)) }}>{item.body}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Page>

            {/* ---------- 04 The firm ---------- */}
            <Page n={4} label="The firm">
                <Banner image="head-firm.webp" title="The Firm" height={158} />
                <div style={{ ...box(43.2, 208.4, 533), ...font(18, 24) }}>
                    <p className="pf-pre">{c.firmProfile}</p>
                    <ul className="pf-bullets" style={{ marginTop: u(18.7), paddingLeft: u(21), lineHeight: u(32) }}>
                        {c.services.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                </div>
            </Page>

            {/* ---------- 05 Accreditations ---------- */}
            <Page n={5} label="Accreditations">
                <Banner image="head-accreditations.webp" title="Accreditations" x={46.6} y={34.2} />
                <p className="pf-extrabold pf-italic pf-center" style={{ ...text(0, 178.8, 18, 21.6, W - 10), color: '#109246' }}>WE ARE A MEMBER OF</p>
                <div className="pf-grid9" style={box(52.9, 216.3, 481.4, 480.6)}>
                    {gridBodies.map((item) => {
                        const [name, abbr] = splitAbbr(item);
                        return (
                            <div key={item}>
                                <span>{name}</span>
                                {abbr && <b className="pf-bold">{abbr}</b>}
                            </div>
                        );
                    })}
                </div>
                {c.accreditationNotes.slice(0, 2).map((note, i) => {
                    const [body, abbr] = splitAbbr(note);
                    return (
                        <div key={note} className="pf-note" style={box(i ? 294.8 : 52.7, 711.6, i ? 240.2 : 240, 101.4)}>
                            <span>{body}</span>
                            {abbr && <b>{abbr}</b>}
                        </div>
                    );
                })}
            </Page>

            {/* ---------- 06 Our message ---------- */}
            <Page n={6} label="Our message">
                <Banner image="head-message.webp" title="Our Message" x={44.5} />
                <Img src="values-bg.webp" x={0} y={441.8} w={W} h={394.9} />

                <div style={box(44.5, 212.3, 507.2)}>
                    <div style={{ position: 'relative', height: u(46.6), background: '#f5f6fa', borderLeft: `${u(2.4)} solid #364ca0` }}>
                        <h3 className="pf-bold" style={{ ...text(18.8 - 2.4, 5.9, 24, 28.8), color: '#364ba0' }}>Our Vision</h3>
                    </div>
                    <div style={{ background: '#f9fafa', padding: `${u(17.2)} ${u(22)} ${u(17.9)} ${u(18.8)}` }}>
                        <p style={{ ...font(16, 19.2), ...track(-24.5) }}>{c.vision}</p>
                    </div>
                    <div style={{ position: 'relative', height: u(44.5), marginTop: u(9.8), background: '#fdf5f5', borderLeft: `${u(2.4)} solid #e01f26` }}>
                        <h3 className="pf-bold" style={{ ...text(14.7 - 2.4, 5.9, 24, 28.8), color: '#df1f26' }}>Our Mission</h3>
                    </div>
                    <div style={{ background: '#f9fafa', marginTop: u(0.6), padding: `${u(18.4)} ${u(10)} ${u(8.4)} ${u(14.7)}` }}>
                        <p style={{ ...font(16, 19.2), ...track(-24.5) }}>{c.mission}</p>
                    </div>
                </div>

                <div style={{ ...box(44.5, 567.7, 2.4, 46.3), background: '#1fa84d' }} />
                <h3 className="pf-bold" style={{ ...text(63.3, 573.6, 24, 28.8), color: '#2b783b' }}>Our Values</h3>
                <ul className="pf-bullets pf-semibold" style={{ ...box(59.3, 636.4, 500), display: 'grid', gridTemplateColumns: `${u(265.5)} 1fr`, ...font(16, 32), ...track(-23), ...vars({ '--pf-bullet-size': 4.4, '--pf-bullet-x': -17, '--pf-bullet-y': 17.3 }) }}>
                    {c.values.map((v, i) => (
                        <li key={v} style={i % 2 ? vars({ '--pf-bullet-x': -12.9 }) : undefined}>{v}</li>
                    ))}
                </ul>
            </Page>

            {/* ---------- 07 What we do ---------- */}
            <Page n={7} numColor="#c8a581" numTop={7.5} label="What we do">
                <Img src="what-we-do.webp" x={0} y={438.8} w={W} h={397.9} />
                <h2 className="pf-black pf-italic pf-nowrap" style={{ ...text(74.7, 275.9, 60, 72), color: '#8c887d' }}>WHAT WE DO</h2>
            </Page>

            {/* ---------- 08 Our services ---------- */}
            <Page n={8} numColor="rgba(255,255,255,0.9)" label="Our services">
                <div style={{ ...box(0, 221, W, H - 221), background: '#373f3f' }} />
                <Img src="head-services.webp" x={0} y={0} w={W} h={221} />
                <h2 className="pf-title" style={{ left: u(74.9), top: u(lineTop(41.2, 60, 72)), ...track(-22) }}>{'Our\nServices'}</h2>
                <div className="pf-cards" style={box(36.9, 247.2, 519.2, 564.1)}>
                    {c.serviceCards.map((label, i) => (
                        <div key={label} className={`pf-card${label.length > 45 ? ' is-long' : label.length > 34 ? ' is-tight' : ''}`}>
                            <span className="pf-card-icon">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={asset(`service-${(i % 8) + 1}.png`)} alt="" style={{ height: u(SERVICE_ICON_H[i % 8]) }} />
                            </span>
                            <span>{label}</span>
                        </div>
                    ))}
                </div>
            </Page>

            {/* ---------- 09 Our strategy ---------- */}
            <Page n={9} numColor="#858687" numTop={13} label="Our strategy">
                <div style={{ ...box(0, 268.1, W, H - 268.1), background: '#373f3f' }} />
                <Img src="head-strategy.webp" x={0} y={0} w={W} h={268.1} />
                <h2 className="pf-title" style={{ left: u(57.2), top: u(lineTop(60.6, 60, 72)), ...track(-22) }}>{'Our\nStrategy'}</h2>
                {c.strategy.slice(0, 4).map((item, i) => {
                    const x = i % 2 ? 334.9 : 57.2;
                    const y = i < 2 ? 338 : 564.3;
                    const titleY = i < 2 ? 31.4 : 32.9;
                    const bodyY = i < 2 ? 63 : 67.2;
                    return (
                        <div key={item.title} className="pf-white" style={box(x, y, 238)}>
                            <span style={{ ...text(0, 0, 21, 25.2), color: '#f7d781' }}>{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="pf-extrabold" style={{ ...text(0, titleY, 26, 31.2), textTransform: 'uppercase' }}>{item.title}</h3>
                            <p style={{ ...text(0, bodyY, 15, i === 0 ? 17 : 18, i % 2 ? 238 : i === 0 ? 220 : 224), ...(i === 0 ? track(-24.5) : {}) }}>{item.body}</p>
                        </div>
                    );
                })}
            </Page>

            {/* ---------- 10 Clientele base ---------- */}
            <Page n={10} label="Clientele base">
                <Banner image="head-clientele.webp" title="Clientele Base" x={46.6} y={34.2} />
                <div style={{ ...box(56.8, 200.9, 484), ...font(18, 21.6) }}>
                    <p className="pf-pre">{keepHyphens(c.clientBase)}</p>
                    <ul className="pf-bullets" style={{ paddingLeft: u(17.5), lineHeight: u(28), ...vars({ '--pf-bullet': '#5bba47', '--pf-bullet-size': 8, '--pf-bullet-x': -17, '--pf-bullet-y': 21.6 }) }}>
                        {c.sectors.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                </div>
            </Page>

            {/* ---------- 11 The managing partner ---------- */}
            <Page n={11} numColor="#c5e3bd" label="The managing partner">
                <div style={{ ...box(525.6, -14.7, 81.9, 81.9), borderRadius: '50%', background: '#f3f9f1' }} />
                <h2 className="pf-center pf-nowrap" style={{ ...text(0, 46.4, 36, 43.2, W + 4.7), color: '#ed2924' }}>The Managing Partner</h2>
                <div style={{ ...box(0, 107.3, W, 0.25), background: '#231f20' }} />
                <Img src="partner.webp" x={88.67} y={107.5} w={420} h={390} alt={c.partnerName} />
                <div style={{ ...box(0, 497.5, W, 88.8), background: '#222924' }} />
                <p className="pf-extrabold pf-center pf-white pf-nowrap" style={text(0, 511, 31.4, 38, W - 2)}>
                    {partnerFirst} <span style={{ color: '#d1e8cb' }}>{partnerLast}</span>
                </p>
                <p className="pf-medium pf-italic pf-center" style={{ ...text(0, 550.2, 14.6, 18, W - 2), color: '#56b947' }}>{c.partnerCredentials}</p>
                <div style={{ ...box(260.8, 598.6, 76.2, 1), background: '#e91d25' }} />
                <p className="pf-pre pf-center" style={text(46, 607.7, 17, 20.4, 506)}>{c.partnerBio}</p>
            </Page>

            {/* ---------- 12 Our symbol ---------- */}
            <Page n={12} numTop={13.5} label="Our symbol">
                <Banner image="head-symbol.webp" title="Our Symbol" x={46.6} y={34.2} />
                <span className="pf-black" style={{ ...text(456.4, 51.2, 13.7, 16.4), whiteSpace: 'pre' }}>{'B  Y  C'}</span>

                <div style={{ ...box(-1, 217.6, 295.3, 113.6), border: `${u(0.25)} solid #231f20` }} />
                <p style={{ ...text(49.7, 237.9, 15.1, 18.1, 222), color: '#6d6a6b' }}>{c.symbolIntro}</p>

                <svg style={box(0, 0, W, H)} viewBox={`0 0 ${W} ${H}`} aria-hidden>
                    <path d="M67.6 402.2 C293.4 396.6 453.5 337 522.9 202.8" fill="none" stroke="#231f20" strokeWidth="4.644" />
                    <path d="M534.6 177.4 C533.5 191.4 534.1 209.8 537.9 222.7 L521.2 206.1 L497.8 204.1 C510.1 198.6 524.6 187.3 534.6 177.4 Z" fill="#231f20" />
                </svg>

                {[
                    { x: 69.5, y: 433.1, h: 109.8, color: '#1daa59', icon: 'symbol-fast.png', ix: 78.1, iy: 462.6, iw: 79.7, ih: 50.8, cx: 124.4, ly: 560.3 },
                    { x: 236.6, y: 389.8, h: 153.7, color: '#50b952', icon: 'symbol-accurate.png', ix: 264.7, iy: 461.2, iw: 53.7, ih: 53.7, cx: 291.6, ly: 560.7 },
                    { x: 407.7, y: 340.2, h: 203.1, color: '#a7cf46', icon: 'symbol-affordable.png', ix: 437.9, iy: 462.2, iw: 48.5, ih: 51.5, cx: 462.7, ly: 560.4 },
                ].map((bar, i) => (
                    <div key={bar.icon}>
                        <div style={{ ...box(bar.x, bar.y, 109.8, bar.h), background: bar.color }} />
                        <Img src={bar.icon} x={bar.ix} y={bar.iy} w={bar.iw} h={bar.ih} fit="contain" />
                        <p className="pf-extrabold pf-center pf-nowrap" style={text(bar.cx - 100, bar.ly, 19.5, 23.4, 200)}>{c.symbolWords[i]}</p>
                    </div>
                ))}
                <span className="pf-extrabold" style={text(197.5, 463.8, 33.4, 40)}>+</span>
                <span className="pf-extrabold" style={text(369.7, 463.8, 33.4, 40)}>+</span>

                <div style={{ ...box(0, 605.7, W, 0.25), background: '#231f20' }} />
                <LogoMark x={258.8} y={623.7} w={90.6} />
                <p className="pf-black pf-center pf-nowrap" style={text(0, 713.4, 34.7, 41.6, 607.8)}>{c.subtitle}</p>
                <p className="pf-center pf-nowrap" style={text(0, 760.6, 14, 16.8, 618)}>{c.tagline}</p>
            </Page>

            {/* ---------- 13 Contact us ---------- */}
            <Page n={13} numTop={13.5} label="Contact us">
                <Img src="phone.webp" x={0} y={489} w={W} h={347.7} />
                <Banner image="head-contact.webp" title="Contact Us" height={158} x={46.6} y={35.1} />

                {/* Visit */}
                <div style={{ ...box(42.4, 199.5, 236.7, 39.1), background: '#2c3c97' }} />
                <div style={{ ...box(42.4, 238.6, 236.7, 240), background: '#eeeff7' }} />
                <Img src="icon-pin.png" x={60} y={203} w={22} h={31} />
                <p className="pf-white pf-nowrap" style={{ ...text(84.7, 209.2, 16.3, 19.6), ...track(12) }}>PAY US A VISIT</p>
                <div style={box(59.3, 265.5, 212)}>
                    {c.offices.map((office, i) => (
                        <div key={office.title} style={{ marginTop: i ? u(11.9) : 0 }}>
                            <p className="pf-black" style={{ ...font(12, 14.5), color: '#2a3492', textTransform: 'uppercase' }}>{office.title}</p>
                            <p className="pf-medium pf-pre" style={{ ...font(17.4, 20.4), ...track(12) }}>{office.body}</p>
                        </div>
                    ))}
                </div>

                {/* Mail */}
                <div style={{ ...box(311.9, 199.5, 236.8, 39.1), background: '#ee3424' }} />
                <div style={{ ...box(311.9, 238.6, 236.8, 79.6), background: '#feefee' }} />
                <Img src="icon-mail.png" x={342.6} y={209.8} w={29.8} h={18.4} fit="contain" />
                <p className="pf-white pf-nowrap" style={text(386.1, 207.4, 16, 19.2)}>SEND US A MAIL</p>
                <p className="pf-medium pf-center pf-nowrap" style={{ ...text(311.9, 259, 17.4, 20.9, 236.8), ...track(12) }}>{c.contactEmail}</p>

                {/* Call */}
                <div style={{ ...box(311.9, 349.4, 236.8, 39.1), background: '#10728f' }} />
                <div style={{ ...box(311.9, 388.5, 236.8, 92.3), background: '#ecf4f7' }} />
                <Img src="icon-phone.png" x={346} y={354} w={26} h={30} />
                <p className="pf-white pf-nowrap" style={text(376, 358.4, 16, 19.2)}>GIVE US A CALL</p>
                <p className="pf-medium pf-center pf-nowrap" style={{ ...text(311.9, 423.5, 17.4, 20.9, 236.8), ...track(12) }}>{c.contactPhone}</p>

                {/* Website */}
                <div style={{ ...box(42.8, 503.2, 236.8, 39.1), background: '#0c8f45' }} />
                <div style={{ ...box(42.8, 542.3, 236.8, 92.3), background: 'rgba(12, 110, 40, 0.085)' }} />
                <Img src="icon-web.png" x={66.6} y={510.5} w={24.7} h={26.4} fit="contain" />
                <p className="pf-white pf-nowrap" style={text(98, 512.4, 16, 19.2)}>VISIT OUR WEBSITE</p>
                <p className="pf-medium pf-center pf-nowrap" style={{ ...text(42.8, 577.3, 17.4, 20.9, 236.8), ...track(12) }}>{c.website.replace(/^www\./, '')}</p>
            </Page>
        </div>
    );
}
