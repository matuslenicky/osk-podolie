# OŠK Podolie – návrh webu

Návrh nového webu futbalového klubu OŠK Podolie (Obecný športový klub Podolie). **Nie je to oficiálna stránka klubu.** Ukážka má v hlavičke pás s týmto upozornením a vyhľadávače ju neindexujú (`noindex`).

Ukážka: https://matuslenicky.github.io/osk-podolie/ · administrácia (ukážka bez ukladania): https://matuslenicky.github.io/osk-podolie/admin/

## Vzhľad

**„Pásy“ (dizajn v2, 17. 11. 2026).** Biela a svetlá modrá, tmavomodrá z erbu, zlatá len v linkách. Písmo Marcellus (názvy) a Vollkorn (text).

- úvod je rad vodorovných pásov oddelených linkami, vľavo krátky názov pásu (na počítači sa pri posúvaní drží), vpravo obsah: najbližší zápas, zápasy, tabuľka, nábor detí od 5 rokov zadarmo a rok 2025 v klube,
- stránka Klub v rovnakých pásoch: história, ročníky áčka, úspechy, štadión a obec,
- menu na telefóne je tmavomodrá plocha cez celú obrazovku.

Web sa skladá zo spoločného jadra v2 (`kluby-siet/engine`: `python assemble.py <web>`), vlastný je `src/site.js` (úvod, Klub, nastavenia) a `src/css/skin.css`.

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
