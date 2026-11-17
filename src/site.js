// Statický generátor webu OŠK Podolie: data/ + src/ -> dist/   (node build.js; TODAY=2026-11-17 prepíše dnešný dátum)
// Zostavuje ho kluby-siet/engine/assemble.py zo spoločného jadra v2 a tohto súboru (vzhľad, úvod, stránka Klub).
// Kostra „Pásy“: úvod je rad vodorovných pásov oddelených linkami, vľavo vždy krátky názov pásu (na počítači sa drží
// pri posúvaní), vpravo obsah: najbližší zápas, zápasy, tabuľka, nábor do mládeže a rok 2025 v klube. Biela a
// svetlá modrá, tmavomodrá z erbu a zlatá len v linkách. Písmo Marcellus (názvy) a Vollkorn (text).
const SKIN = {
  nav: 'bar', theme: '#1e3e78', brand: 'OŠK Podolie', brandSub: 'Obecný športový klub',
  fonts: ['marcellus-400.woff', 'vollkorn-400.woff', 'vollkorn-600.woff'],
  sources: 'Správy z klubu podľa Podolských novín, obec podľa webu obce.',
  adminHero: 'Futbal v Podolí',
  adminFacts: club.rok2025.body,
  links: [[club.noviny, 'Podolské noviny']],
};
const NAV = [['zapasy/', 'Zápasy'], ['tabulky/', 'Tabuľky'], ['timy/', 'Tímy'], ['klub/', 'Klub'], ['kontakt/', 'Kontakt']];
const DESC = `${club.nazov} – zápasy, výsledky, tabuľky a súpisky áčka (${A.leagueName}) a mládeže. Nábor detí od 5 rokov zadarmo, jedenásť ročníkov v V. lige.`;
const band = (label, id, body, cls = '') => `<section class="band${cls ? ` ${cls}` : ''}" aria-labelledby="${id}"><div class="wrap band-in"><h2 class="band-l" id="${id}">${label}</h2><div class="band-r">${body}</div></div></section>`;

add('', {
  title: 'futbal v Podolí', active: '', bodyClass: 'home',
  body: (R) => {
    const n = nextA;
    const wl = winterLine();
    return `<section class="intro"><div class="wrap intro-in">
  <img src="${R}img/erb-240.webp" alt="${esc(club.erbAlt)}" width="${Math.round(112 * CREST_R)}" height="112">
  <div>
    <h1 class="h1">OŠK Podolie</h1>
    <p class="intro-p">${esc(A.leagueName)}${A.pos ? `, ${A.pos}. miesto ${zo(A.of)}` : ''}. V klube ${teams.length >= 2 && teams.length <= 4 ? 'hrajú' : 'hrá'} ${plural(teams.length, 'tím', 'tímy', 'tímov')}, od prípravky po áčko.</p>
  </div>
</div></section>
${n ? band('Najbližší zápas', 'nx-h', `<p class="big">${n.home ? `Podolie – ${esc(n.opponent)}` : `${esc(n.opponent)} – Podolie`}</p>
  <p class="meta"><time datetime="${n.date}">${dLong(n.date)}</time>, ${esc(n.time || '')} · ${n.home ? esc(ST.nazov) : 'vonku'}${wl ? '' : ` · <span class="cd" data-kickoff="${isoLocal(n.date, n.time)}" hidden></span>`}</p>
  ${wl ? `<p class="meta">${wl}</p>` : ''}
  <p class="btns"><a class="btn" href="${R}kalendar/zapas-${n.id}.ics" download>${I.cal}Do kalendára</a><a class="btn btn--line" href="${R}${n.url}">Detail</a></p>`, 'band--first') : ''}
${band('Zápasy', 'z-h', `<div class="cols2"><div><h3 class="h3">Výsledky</h3>${fxList(results.filter((x) => x.score).slice(0, 5), R)}</div><div><h3 class="h3">Program</h3>${upcoming.length ? fxList(upcoming.slice(0, 5), R) : '<p>Ďalšie zápasy zatiaľ nie sú vyžrebované.</p>'}</div></div>${more(`${R}zapasy/`, 'Všetky zápasy')}`)}
${A.table ? band('Tabuľka', 't-h', `<p class="meta">${esc(A.leagueName)}</p>${tableHtml(A.table, R)}${more(`${R}tabulky/`, 'Tabuľky všetkých tímov')}`) : ''}
${band('Nábor', 'nb-h', `<p class="big big--s">Futbal od 5 rokov, zadarmo.</p><p>${esc(club.nabor)}</p><p class="btns"><a class="btn" href="mailto:${club.kontakt.email}?subject=${encodeURIComponent('Nábor do mládeže')}">${I.mail}Napísať trénerom</a></p>`, 'band--tint')}
${band('Rok 2025', 'y-h', `${facts(club.rok2025.body)}${more(`${R}klub/`, 'Klub a obec')}`)}`;
  },
});

add('klub/', {
  title: 'Klub', active: 'klub/', desc: `${club.nazov}: ročníky áčka od 2013/14, rok 2025 v klube, štadión a obec Podolie so svätým Jurajom v erbe.`,
  body: (R) => `${pageHead({ title: 'Klub', sub: `${esc(club.pravnyNazov)}. Farby ${esc(club.farby)}.`, R, crumbs: [[null, 'Klub']] })}
${band('História', 'h-h', `<ol class="hist">${club.historia.map((h) => `<li><b>${esc(h.rok)}</b> ${esc(h.text)}</li>`).join('')}</ol>`, 'band--first')}
${band('Ročníky', 'r-h', seasonsTable(club.rocniky.zoznam))}
${band('Úspechy', 'u-h', `<ul class="hist">${club.uspechy.map((u) => `<li><b>${esc(u.rok)}</b> ${esc(u.text)}</li>`).join('')}</ul>`)}
${band('Štadión', 's-h', `<p class="meta">${esc(ST.nazov)}, ${esc(ST.ulica)}</p>${facts(ST.fakty)}`, 'band--tint')}
${band('Podolie', 'o-h', `${facts(club.obec.fakty)}<p class="note">Zdroje: Podolské noviny 12/2025, web obce Podolie, Sportnet.</p>`)}`,
});
