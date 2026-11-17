# OŠK Podolie – návrh webu

Návrh nového webu futbalového klubu OŠK Podolie (Obecný športový klub Podolie). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/osk-podolie/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/osk-podolie/admin/

## Vzhľad

**„Rytier a drak“.** Klub nosí erb obce: v modrom štíte strieborný rytier na koni prebodáva zlatou kopijou zeleného draka. Erb vychádza zo svätojurskej pečate obce z roku 1743.

- modrá hlavička ako heraldický štít so zlatým lemom, pergamenové plochy, jemné dračie šupiny na modrých plochách,
- úvod so **zástavou (gonfalónom) na zlatej kopiji**, v nej erb, nadpisy s **iniciálou v poli ako v iluminovanom rukopise**,
- šnúry **trojuholníkových zástaviek** (hody, rytiersky turnaj) pod úvodom, pod hlavičkami podstránok a nad pätou,
- program ako **zápisy v rukopise so striedavo modrou a červenou iniciálou** (deň v mesiaci),
- výsledky ako **zástavky na šnúre**: výhra modrá so zlatým okrajom, remíza biela, prehra zelená ako drak (so šupinami), forma ako rad malých zástaviek,
- **kronika ročníkov** áčka od 2013/14 ako kopije (dĺžka = umiestnenie, zlatá = V. liga, strieborná = VI. liga), bilancia ako **súboj rytiera s drakom**,
- menu na telefóne ako **zástava s lastovičím chvostom**, ktorá sa spustí z hlavičky,
- písmo **Grenze Gotisch** (nadpisy) a **Alegreya Sans** (rovné číslice sú zapečené do písma v `scripts/fonts.py`).

## Obsah a zdroje

- Zápasy, výsledky, strelci, karty, počty divákov, zostavy dospelých, tabuľky a súpisky áčka, U15 a U13 zo Sportnetu (Futbalnet), verejné API súťaží (`scripts/sportnet.mjs` → `data/sportnet.json`). Vek hráčov sa neukladá, zostavy len pri dospelých.
- Ročníky áčka 2013/14 – 2025/26 (súťaž, miesto, skóre, body) z konečných tabuliek na Sportnete, zapísané v `data/klub.json`.
- Rok v klube z Podolských novín 12/2025 (rubrika „Rok v obecnom športovom klube Podolie“, hodnotia tréneri a prezident klubu): áčko po jeseni 2025, odchovanci v áčku, prípravka U11, hodový zápas v Očkove, nábor detí od 5 rokov zadarmo, trávnik a nové školské športovisko.
- Obec z webu obce Podolie (Základné informácie, Obecná symbolika, Pamiatky v obci, Najstaršie osídlenie), Park miniatúr podľa Podolských novín 12/2025.
- Rok založenia klubu sme v zdrojoch nenašli. E-mail a adresa zo Sportnetu, telefóny klub verejne neuvádza. Vlastný web ani sociálne siete klubu sme nenašli (17. 11. 2026).
- Erb a erby súperov zo Sportnetu (`scripts/logos.py`). Patria príslušným klubom a obci.
- Písmo Grenze Gotisch a Alegreya Sans, licencia SIL Open Font License 1.1 (`scripts/fonts.py`).

## Zostavenie

Statický generátor bez závislostí (Node 20+, Python 3 s Pillow na erby a fontTools na písmo):

```
node scripts/sportnet.mjs        # zápasy, tabuľky a súpisky (FULL=1 stiahne znova aj detaily zápasov)
python -I scripts/logos.py       # erby súperov a náš erb do src/img (FORCE=1 stiahne znova)
node build.js                    # data/ + src/ -> dist/ (TODAY=2026-11-17 prepíše dnešný dátum)
node scripts/serve.mjs dist 5380 # náhľad na http://127.0.0.1:5380/ (?nolr = bez obnovovania, s CSP)
node scripts/deploy.mjs          # nasadenie dist/ na vetvu gh-pages (GitHub Pages)
```

Výsledky sa po zápasoch aktualizujú samé cez GitHub Actions (`.github/workflows/sportnet.yml`). Ročníky v `data/klub.json` treba po skončení sezóny doplniť ručne (posledná kopija je rozohraný ročník zo Sportnetu).
