# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke.spec.ts >> zoom buttons work
- Location: e2e/smoke.spec.ts:112:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: locator.click: Test timeout of 120000ms exceeded.
Call log:
  - waiting for getByRole('button', { name: 'Zoom in' }).first()
    - locator resolved to <g tabindex="0" role="button" class="tl-item" data-year-top="1939" data-year-bottom="1939" data-anchor-y="338.20000000000005" data-id="cluster:worldDot:1939.000" aria-label="2 items around 1939, zoom in" transform="translate(358.4, 338.20000000000005)">…</g>
  - attempting click action
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="min-w-0">…</div> from <div role="region" data-testid="map-panel" aria-label="Historical atlas, 1896 CE" class="panel fade-up fixed bottom-16 left-4 z-30 w-[min(94vw,560px)] overflow-hidden 2xl:w-[620px]">…</div> subtree intercepts pointer events
    - retrying click action
    - waiting 20ms
    2 × waiting for element to be visible, enabled and stable
      - element is visible, enabled and stable
      - scrolling into view if needed
      - done scrolling
      - <div class="min-w-0">…</div> from <div role="region" data-testid="map-panel" aria-label="Historical atlas, 1896 CE" class="panel fade-up fixed bottom-16 left-4 z-30 w-[min(94vw,560px)] overflow-hidden 2xl:w-[620px]">…</div> subtree intercepts pointer events
    - retrying click action
      - waiting 100ms
    227 × waiting for element to be visible, enabled and stable
        - element is visible, enabled and stable
        - scrolling into view if needed
        - done scrolling
        - <div class="min-w-0">…</div> from <div role="region" data-testid="map-panel" aria-label="Historical atlas, 1896 CE" class="panel fade-up fixed bottom-16 left-4 z-30 w-[min(94vw,560px)] overflow-hidden 2xl:w-[620px]">…</div> subtree intercepts pointer events
      - retrying click action
        - waiting 500ms

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - main [ref=e2]:
    - application "Vertical timeline of Islamic history. Today at top; scroll down to travel into the past. Use arrow keys to pan, plus and minus to zoom, Home for today." [ref=e3]:
      - img [ref=e4]:
        - generic [ref=e5]: Ottoman–Safavid–Mughal age
        - generic [ref=e7]: Reform & colonial era
        - generic [ref=e9]: Contemporary era
        - generic [ref=e11]: "1750"
        - generic [ref=e12]: "1800"
        - generic [ref=e13]: "1850"
        - generic [ref=e14]: "1900"
        - generic [ref=e15]: "1950"
        - generic [ref=e16]: "2000"
        - generic [ref=e17]: 1100 AH
        - generic [ref=e18]: 1200 AH
        - generic [ref=e19]: 1300 AH
        - generic [ref=e20]: 1400 AH
        - generic [ref=e21]: TODAY
        - generic [ref=e23]:
          - button "Muḥammad ibn al-ʿUthaymīn, 1929 – 2001 CE · 1347 – 1421 AH" [ref=e24] [cursor=pointer]
          - button "ʿAbd al-ʿAzīz ibn Bāz, 1912 – 1999 CE · 1330 – 1420 AH" [ref=e28] [cursor=pointer]
          - button "Muḥammad Nāṣir al-Dīn al-Albānī, 1914 – 1999 CE · 1333 – 1420 AH" [ref=e32] [cursor=pointer]
          - button "Hamka (Haji Abdul Malik Karim Amrullah), 1908 – 1981 CE · ≈ 1326 – 1401 AH (calc.)" [ref=e36] [cursor=pointer]
          - button "Abū al-Aʿlā Mawdūdī, 1903 – 1979 CE · ≈ 1321 – 1399 AH (calc.)" [ref=e40] [cursor=pointer]
          - button "Muḥammad al-Ṭāhir ibn ʿĀshūr, 1879 – 1973 CE · ≈ 1296 – 1393 AH (calc.)" [ref=e44] [cursor=pointer]
          - button "Muḥammad ʿAbduh, 1849 – 1905 CE · 1266 – 1323 AH" [ref=e48] [cursor=pointer]
          - button "al-Shawkānī, 1759 – 1834 CE · 1173 – 1250 AH" [ref=e52] [cursor=pointer]
          - button "ʿUthmān dan Fodio, 1754 – 1817 CE · 1168 – 1232 AH" [ref=e56] [cursor=pointer]:
            - generic: ʿUthmān dan Fodio
          - button "Aḥmad al-Tijānī, 1735 – 1815 CE · ≈ 1148 – 1230 AH (calc.)" [ref=e60] [cursor=pointer]
          - button "Muḥammad ibn ʿAbd al-Wahhāb, 1703 – 1792 CE · 1115 – 1206 AH" [ref=e64] [cursor=pointer]:
            - generic: Muḥammad ibn ʿAbd al-Wahhāb
          - button "Shāh Walīullāh al-Dihlawī, 1703 – 1762 CE · 1114 – 1176 AH" [ref=e68] [cursor=pointer]:
            - generic: Shāh Walīullāh al-Dihlawī
          - button "Isaac Newton, 1643 – 1727 CE · ≈ 1053 – 1139 AH (calc.)" [ref=e72] [cursor=pointer]
          - button "Mullā Ṣadrā, c. 1571 – c. 1640 CE · ≈ 979 – 1050 AH (calc.)" [ref=e76] [cursor=pointer]
          - button "Aḥmad Bābā al-Timbuktī, 1556 – 1627 CE · 963 – 1036 AH" [ref=e80] [cursor=pointer]
          - button "Aḥmad Sirhindī, 1564 – 1624 CE · 971 – 1034 AH" [ref=e84] [cursor=pointer]
          - button "Ḥujjat Allāh al-Bāligha, c. 1755 CE · ≈ 1168 AH (calc.)" [ref=e88] [cursor=pointer]:
            - generic: ≈
          - button "Kitāb al-Tawḥīd, c. 1740 CE · ≈ 1153 AH (calc.)" [ref=e91] [cursor=pointer]:
            - generic: ≈
          - button "al-Fatāwā al-ʿĀlamgīriyya, 1667–1675 CE · ≈ 1078 AH (calc.)" [ref=e94] [cursor=pointer]:
            - generic: ≈
          - button "Iranian Revolution, 1979 CE · 1399 AH" [ref=e97] [cursor=pointer]
          - button "Partition of India; creation of Pakistan, 1947 CE · 1366 AH" [ref=e99] [cursor=pointer]
          - button "Kingdom of Saudi Arabia proclaimed, 1932 CE · 1351 AH" [ref=e101] [cursor=pointer]
          - button "Ottoman Empire, c. 1299 – 1922 CE · ≈ 698 – 1341 AH (calc.)" [ref=e103] [cursor=pointer]:
            - generic: Ottoman Empire
          - button "Aceh Sultanate, c. 1496 – 1903 CE · ≈ 901 – 1321 AH (calc.)" [ref=e105] [cursor=pointer]:
            - generic: Aceh Sultanate
          - button "Sokoto Caliphate, 1804 – 1903 CE · ≈ 1218 – 1321 AH (calc.)" [ref=e107] [cursor=pointer]:
            - generic: Sokoto Caliphate
          - button "Mughal Empire, 1526 – 1857 CE · 932 – 1274 AH" [ref=e109] [cursor=pointer]:
            - generic: Mughal Empire
          - button "Safavid Empire, 1501 – 1736 CE · ≈ 907 – 1149 AH (calc.)" [ref=e111] [cursor=pointer]:
            - generic: Safavid Empire
          - button "1948 war & the establishment of Israel, 1948 CE · ≈ 1367 AH (calc.)" [ref=e113] [cursor=pointer]
          - button "Abolition of the Ottoman caliphate, 1924 CE · 1342 AH" [ref=e115] [cursor=pointer]:
            - generic: Abolition of the Ottoman caliphate
          - button "Indian Rebellion; end of the Mughals, 1857 – 1858 CE · 1273 – 1275 AH" [ref=e117] [cursor=pointer]:
            - generic: Indian Rebellion; end of the Mugh…
          - button "Napoleon's expedition to Egypt, 1798 – 1801 CE · 1213 – 1216 AH" [ref=e119] [cursor=pointer]:
            - generic: Napoleon's expedition to Egypt
          - button "Battle of Plassey, 1757 CE · 1170 AH" [ref=e121] [cursor=pointer]
          - button "Battle of Vienna, 1683 CE · 1094 AH" [ref=e123] [cursor=pointer]:
            - generic: Battle of Vienna
          - button "Suez Canal opens, 1869 CE · 1286 AH" [ref=e125] [cursor=pointer]
          - button "Müteferrika press in Istanbul, 1727 CE · 1139 AH" [ref=e127] [cursor=pointer]
          - button "Taj Mahal, 1632–1653 – present CE · 1041 AH – present" [ref=e129] [cursor=pointer]:
            - generic: ≈
            - generic: Taj Mahal
          - button "Berlin Conference; the Scramble for Africa, 1884 – 1885 CE · ≈ 1301 – 1302 AH (calc.)" [ref=e132] [cursor=pointer]
          - button "French Revolution, 1789 CE · ≈ 1203 AH (calc.)" [ref=e134] [cursor=pointer]
          - button "Industrial Revolution, c. 1760 – c. 1840 CE · ≈ 1173 – 1256 AH (calc.)" [ref=e136] [cursor=pointer]:
            - generic: ≈
          - button "Ḥanafī school, c. 767 – present CE · ≈ 150 AH (calc.) – present" [ref=e138] [cursor=pointer]:
            - generic: Ḥanafī school
          - button "Mālikī school, c. 795 – present CE · ≈ 179 AH (calc.) – present" [ref=e140] [cursor=pointer]:
            - generic: Mālikī school
          - button "Shāfiʿī school, c. 820 – present CE · ≈ 205 AH (calc.) – present" [ref=e142] [cursor=pointer]:
            - generic: Shāfiʿī school
          - button "Ḥanbalī school, c. 855 – present CE · ≈ 241 AH (calc.) – present" [ref=e144] [cursor=pointer]:
            - generic: Ḥanbalī school
          - button "Ashʿarī theology, c. 936 – present CE · ≈ 324 AH (calc.) – present" [ref=e146] [cursor=pointer]:
            - generic: Ashʿarī theology
          - button "Sunni Islam (Ahl al-Sunna), c. 632 – present CE · ≈ 11 AH (calc.) – present" [ref=e148] [cursor=pointer]:
            - generic: Sunni Islam (Ahl al-Sunna)
          - button "Shīʿī Islam (Shīʿat ʿAlī), c. 632 – present CE · ≈ 11 AH (calc.) – present" [ref=e150] [cursor=pointer]:
            - generic: Shīʿī Islam (Shīʿat ʿAlī)
          - button "Aurangzeb ʿĀlamgīr, 1618 – 1707 CE · ≈ 1027 – 1119 AH (calc.)" [ref=e152] [cursor=pointer]
          - button "Shah ʿAbbās I, 1571 – 1629 CE · ≈ 979 – 1038 AH (calc.)" [ref=e156] [cursor=pointer]
          - button "2 items around 1939, zoom in" [ref=e160] [cursor=pointer]:
            - generic: "2"
          - button "2 items around 1916, zoom in" [ref=e162] [cursor=pointer]:
            - generic: "2"
    - generic:
      - generic [ref=e164]:
        - heading "The Islamic Timeline" [level=1] [ref=e165]
        - paragraph [ref=e166]: الخطّ الزمني للتاريخ الإسلامي
      - navigation "Application controls" [ref=e167]:
        - button "Support this project" [ref=e168] [cursor=pointer]:
          - text: ♥
          - generic [ref=e169]: Support
        - button "Search" [ref=e170] [cursor=pointer]:
          - text: ⌕
          - generic [ref=e172]: ⌘K
        - button "Suggest a record" [ref=e173] [cursor=pointer]:
          - text: ＋
          - generic [ref=e174]: Suggest
        - button "Filters" [ref=e175] [cursor=pointer]: ⚙
        - button "Compare" [disabled] [ref=e177] [cursor=pointer]: ⇄
        - button "Atlas" [pressed] [ref=e179] [cursor=pointer]: ⌖
        - button "Legend" [ref=e181] [cursor=pointer]
        - 'button "Theme: auto. Click to change." [ref=e182] [cursor=pointer]': ◑
        - button "Keyboard shortcuts and help" [ref=e183] [cursor=pointer]: "?"
        - link "Methodology" [ref=e184] [cursor=pointer]:
          - /url: ./methodology/
    - generic:
      - generic: Today
      - generic: 18 September 2026
      - generic: ≈ 5 Rabīʿ al-Thānī 1448 AH (calc.)
    - button "↑ Return to today" [ref=e185] [cursor=pointer]
    - group "Zoom" [ref=e186]:
      - button "Zoom out" [ref=e187] [cursor=pointer]: −
      - generic [ref=e188]:
        - button "Millennium" [ref=e189]
        - button "Century" [pressed] [ref=e190]
        - button "Decade" [ref=e191]
        - button "Year" [ref=e192]
        - button "Detail" [ref=e193]
      - button "Zoom in" [ref=e194] [cursor=pointer]: +
    - slider "Era navigation rail, click to jump through history" [ref=e195] [cursor=pointer]:
      - img [ref=e196]:
        - generic "Earliest prophets عليهم السلام, undated" [ref=e197]
        - generic "Era of the prophets, traditional dating" [ref=e198]
        - generic "ʿĪsā عليه السلام & the fatra" [ref=e199]
        - generic "Prophetic era" [ref=e200]
        - generic "Rashidun era" [ref=e201]
        - generic "Umayyad era" [ref=e202]
        - generic "Abbasid era" [ref=e203]
        - generic "Mamluks & successor states" [ref=e204]
        - generic "Ottoman–Safavid–Mughal age" [ref=e205]
        - generic "Reform & colonial era" [ref=e206]
        - generic "Contemporary era" [ref=e207]
    - button "In 1887, the Ottoman Empire ruled from Istanbul while the Sokoto Caliphate held Sokoto." [ref=e263] [cursor=pointer]
    - region "Historical atlas, 1896 CE" [ref=e264]:
      - generic [ref=e265]:
        - generic [ref=e266]:
          - generic [ref=e267]: Atlas · 1896 CE · ≈1314 AH
          - generic [ref=e268]: borders c. 1900 CE, approximate
        - generic [ref=e269]:
          - button "🔗 follows timeline" [pressed] [ref=e270] [cursor=pointer]
          - button "Close atlas" [ref=e271] [cursor=pointer]: ✕
      - img [ref=e272]:
        - generic "Luxembourg, borders c. 1900 (approximate)" [ref=e275]
        - generic "Bhutan, borders c. 1900 (approximate)" [ref=e277]
        - generic "United Kingdom of Great Britain and Ireland, borders c. 1900 (approximate)" [ref=e279]
        - generic "Ceylon, borders c. 1900 (approximate)" [ref=e281]
        - generic "Iceland, borders c. 1900 (approximate)" [ref=e283]
        - generic "Belgium, borders c. 1900 (approximate)" [ref=e285]
        - generic "Spain, borders c. 1900 (approximate)" [ref=e287]
        - generic "Portugal, borders c. 1900 (approximate)" [ref=e289]
        - generic "Afghanistan, borders c. 1900 (approximate)" [ref=e291]
        - generic "Malaya, borders c. 1900 (approximate)" [ref=e293]
        - generic "Netherlands, borders c. 1900 (approximate)" [ref=e295]
        - generic "Nepal, borders c. 1900 (approximate)" [ref=e297]
        - generic "Brunei, borders c. 1900 (approximate)" [ref=e299]
        - generic "Netherlands Indies, borders c. 1900 (approximate)" [ref=e301]
        - generic "Greenland, borders c. 1900 (approximate)" [ref=e303]
        - generic "France, borders c. 1900 (approximate)" [ref=e305]
        - generic "Switzerland, borders c. 1900 (approximate)" [ref=e307]
        - generic "Morocco, borders c. 1900 (approximate)" [ref=e309]
        - generic "Portuguese East Africa, borders c. 1900 (approximate)" [ref=e311]
        - generic "Lozi, borders c. 1900 (approximate)" [ref=e313]
        - generic "Sultinate of Zanzibar, borders c. 1900 (approximate)" [ref=e315]
        - generic "Shona, borders c. 1900 (approximate)" [ref=e317]
        - generic "Barotse, borders c. 1900 (approximate)" [ref=e319]
        - generic "Bunyoro, borders c. 1900 (approximate)" [ref=e321]
        - generic "Buganda, borders c. 1900 (approximate)" [ref=e323]
        - generic "Yeke, borders c. 1900 (approximate)" [ref=e325]
        - generic "Mirambo Unyanyembe Ukimbu, borders c. 1900 (approximate)" [ref=e327]
        - generic "Burundi, borders c. 1900 (approximate)" [ref=e329]
        - generic "Nguni, borders c. 1900 (approximate)" [ref=e331]
        - generic "Rwanda, borders c. 1900 (approximate)" [ref=e333]
        - generic "Sultanate of Utetera, borders c. 1900 (approximate)" [ref=e335]
        - generic "Lunda, borders c. 1900 (approximate)" [ref=e337]
        - generic "Luba, borders c. 1900 (approximate)" [ref=e339]
        - generic "Kuba, borders c. 1900 (approximate)" [ref=e341]
        - generic "Angola, borders c. 1900 (approximate)" [ref=e343]
        - generic "Ovimbundu, borders c. 1900 (approximate)" [ref=e345]
        - generic "Mbailundu, borders c. 1900 (approximate)" [ref=e347]
        - generic "Congo, borders c. 1900 (approximate)" [ref=e349]
        - generic "Teke, borders c. 1900 (approximate)" [ref=e351]
        - generic "Yaka, borders c. 1900 (approximate)" [ref=e353]
        - generic "Oman, borders c. 1900 (approximate)" [ref=e355]
        - generic "Arabia, borders c. 1900 (approximate)" [ref=e357]
        - generic "Trucial Oman, borders c. 1900 (approximate)" [ref=e359]
        - generic "Qatar, borders c. 1900 (approximate)" [ref=e361]
        - generic "Egypt, borders c. 1900 (approximate)" [ref=e363]
        - generic "Tunisia, borders c. 1900 (approximate)" [ref=e365]
        - generic "Algeria, borders c. 1900 (approximate)" [ref=e367]
        - generic "Kanem-Bornu, borders c. 1900 (approximate)" [ref=e369] [cursor=pointer]
        - generic "Ibadan, borders c. 1900 (approximate)" [ref=e371]
        - generic "Benin, borders c. 1900 (approximate)" [ref=e373]
        - generic "Lagos, borders c. 1900 (approximate)" [ref=e375]
        - generic "Cotonou, borders c. 1900 (approximate)" [ref=e377]
        - generic "Accra, borders c. 1900 (approximate)" [ref=e379]
        - generic "Ivory Coast, borders c. 1900 (approximate)" [ref=e381]
        - generic "Asante, borders c. 1900 (approximate)" [ref=e383]
        - generic "Sierra Leone, borders c. 1900 (approximate)" [ref=e385]
        - generic "Liberia, borders c. 1900 (approximate)" [ref=e387]
        - generic "Gambia, borders c. 1900 (approximate)" [ref=e389]
        - generic "Portuguese Guinea, borders c. 1900 (approximate)" [ref=e391]
        - generic "Tukular Caliphate, borders c. 1900 (approximate)" [ref=e393]
        - generic "Senegal, borders c. 1900 (approximate)" [ref=e395]
        - generic "Futa Toro, borders c. 1900 (approximate)" [ref=e397]
        - generic "Kong, borders c. 1900 (approximate)" [ref=e399]
        - generic "Mossi States, borders c. 1900 (approximate)" [ref=e401]
        - generic "Futa Jalon, borders c. 1900 (approximate)" [ref=e403]
        - generic "Second Samori Empire, borders c. 1900 (approximate)" [ref=e405]
        - generic "Ato trading confederacy, borders c. 1900 (approximate)" [ref=e407]
        - generic "Spanish Guinea, borders c. 1900 (approximate)" [ref=e409]
        - generic "Gabon, borders c. 1900 (approximate)" [ref=e411]
        - generic "Egypt, borders c. 1900 (approximate)" [ref=e413]
        - generic "Ethiopia, borders c. 1900 (approximate)" [ref=e415]
        - generic "Harer (Egypt), borders c. 1900 (approximate)" [ref=e417]
        - generic "Persia, borders c. 1900 (approximate)" [ref=e419]
        - generic "central Asian khanates, borders c. 1900 (approximate)" [ref=e421]
        - generic "India, borders c. 1900 (approximate)" [ref=e423]
        - generic "Romania, borders c. 1900 (approximate)" [ref=e425]
        - generic "Serbia, borders c. 1900 (approximate)" [ref=e427]
        - generic "Montenegro, borders c. 1900 (approximate)" [ref=e429]
        - generic "Bosnia-Herzegovina, borders c. 1900 (approximate)" [ref=e431]
        - generic "Manchu Empire, borders c. 1900 (approximate)" [ref=e433]
        - generic "Madagascar, borders c. 1900 (approximate)" [ref=e435]
        - generic "Dahomey, borders c. 1900 (approximate)" [ref=e437]
        - generic "Sokoto Caliphate, borders c. 1900 (approximate)" [ref=e439] [cursor=pointer]
        - generic "Borgu States, borders c. 1900 (approximate)" [ref=e441]
        - generic "Oyo, borders c. 1900 (approximate)" [ref=e443]
        - generic "Calabar, borders c. 1900 (approximate)" [ref=e445]
        - generic "Opobo, borders c. 1900 (approximate)" [ref=e447]
        - generic "First Samori Empire, borders c. 1900 (approximate)" [ref=e449]
        - generic "Western Australia (UK), borders c. 1900 (approximate)" [ref=e451]
        - generic "Italy, borders c. 1900 (approximate)" [ref=e453]
        - generic "Austria Hungary, borders c. 1900 (approximate)" [ref=e455]
        - generic "Bulgaria, borders c. 1900 (approximate)" [ref=e457]
        - generic "Ottoman Empire, borders c. 1900 (approximate)" [ref=e459] [cursor=pointer]
        - generic "Greece, borders c. 1900 (approximate)" [ref=e461]
        - generic "British Raj, borders c. 1900 (approximate)" [ref=e463]
        - generic "Sweden–Norway, borders c. 1900 (approximate)" [ref=e465]
        - generic "Denmark, borders c. 1900 (approximate)" [ref=e467]
        - generic "Rattanakosin Kingdom, borders c. 1900 (approximate)" [ref=e469]
        - generic "Germany, borders c. 1900 (approximate)" [ref=e471]
        - generic "Russian Empire, borders c. 1900 (approximate)" [ref=e473]
        - generic "French Indochina, borders c. 1900 (approximate)" [ref=e475]
        - generic [ref=e476]:
          - generic "Makkah, sanctuary" [ref=e477]
          - generic: Makkah
        - generic [ref=e478]:
          - generic "Madinah, sanctuary · first capital" [ref=e479]
          - generic: Madinah
        - generic [ref=e480]:
          - generic "Jerusalem, sanctuary" [ref=e481]
          - generic: Jerusalem
        - generic [ref=e482]:
          - generic "Damascus, Umayyad capital · scholarship" [ref=e483]
          - generic: Damascus
        - generic [ref=e484]:
          - generic "Kufa, garrison city · early law" [ref=e485]
          - generic: Kufa
        - generic [ref=e486]:
          - generic "Basra, garrison city · grammar & theology" [ref=e487]
          - generic: Basra
        - generic [ref=e488]:
          - generic "Fustat / Cairo, capital of Egypt · al-Azhar" [ref=e489]
          - generic: Fustat / Cairo
        - generic [ref=e490]:
          - generic "Baghdad, Abbasid capital" [ref=e491]
          - generic: Baghdad
        - generic [ref=e492]:
          - generic "Kairouan, Maghrib's first metropolis" [ref=e493]
          - generic: Kairouan
        - generic [ref=e494]:
          - generic "Córdoba, Umayyad capital of al-Andalus" [ref=e495]
          - generic: Córdoba
        - generic [ref=e496]:
          - generic "Fez, al-Qarawiyyīn" [ref=e497]
          - generic: Fez
        - generic [ref=e498]:
          - generic "Marrakesh, Almoravid & Almohad capital" [ref=e499]
          - generic: Marrakesh
        - generic [ref=e500]:
          - generic "Tangier, Ibn Baṭṭūṭa's birthplace" [ref=e501]
          - generic: Tangier
        - generic [ref=e502]:
          - generic "Constantinople / Istanbul, Byzantine, then Ottoman capital" [ref=e503]
          - generic: Constantinople / Istanbul
        - generic [ref=e504]:
          - generic "Bursa, first Ottoman capital" [ref=e505]
          - generic: Bursa
        - generic [ref=e506]:
          - generic "Konya, Seljuk Rūm capital · Rūmī" [ref=e507]
          - generic: Konya
        - generic [ref=e508]:
          - generic "Tabriz, Ilkhanid & early Safavid capital" [ref=e509]
          - generic: Tabriz
        - generic [ref=e510]:
          - generic "Isfahan, Seljuk & Safavid capital" [ref=e511]
          - generic: Isfahan
        - generic [ref=e512]:
          - generic "Rayy (Tehran), Persian metropolis" [ref=e513]
          - generic: Rayy (Tehran)
        - generic [ref=e514]:
          - generic "Shiraz, Saʿdī & Ḥāfiẓ" [ref=e515]
          - generic: Shiraz
        - generic [ref=e516]:
          - generic "Nishapur, Khurasani learning · Ṣaḥīḥ Muslim" [ref=e517]
          - generic: Nishapur
        - generic [ref=e518]:
          - generic "Herat, Timurid renaissance" [ref=e519]
          - generic: Herat
        - generic [ref=e520]:
          - generic "Bukhara, Samanid capital · al-Bukhārī" [ref=e521]
          - generic: Bukhara
        - generic [ref=e522]:
          - generic "Samarkand, Timurid capital · paper & astronomy" [ref=e523]
          - generic: Samarkand
        - generic [ref=e524]:
          - generic "Kashgar, Qarakhanid seat · Silk Road" [ref=e525]
          - generic: Kashgar
        - generic [ref=e526]:
          - generic "Delhi, Sultanate & Mughal capital" [ref=e527]
          - generic: Delhi
        - generic [ref=e528]:
          - generic "Agra, Mughal capital · Taj Mahal" [ref=e529]
          - generic: Agra
        - generic [ref=e530]:
          - generic "Lahore, Ghaznavid & Mughal metropolis" [ref=e531]
          - generic: Lahore
        - generic [ref=e532]:
          - generic "Sanaa, Yemeni highlands" [ref=e533]
          - generic: Sanaa
        - generic [ref=e534]:
          - generic "Aden, Indian Ocean port" [ref=e535]
          - generic: Aden
        - generic [ref=e536]:
          - generic "Muscat, Omani port" [ref=e537]
          - generic: Muscat
        - generic [ref=e538]:
          - generic "Mogadishu, Swahili coast" [ref=e539]
          - generic: Mogadishu
        - generic [ref=e540]:
          - generic "Harar, Horn of Africa learning" [ref=e541]
          - generic: Harar
        - generic [ref=e542]:
          - generic "Timbuktu, Sankoré · manuscripts" [ref=e543]
          - generic: Timbuktu
        - generic [ref=e544]:
          - generic "Gao, Songhai capital" [ref=e545]
          - generic: Gao
        - generic [ref=e546]:
          - generic "Sokoto, caliphal capital" [ref=e547]
          - generic: Sokoto
        - generic [ref=e548]:
          - generic "Malacca, spice-route emporium" [ref=e549]
          - generic: Malacca
        - generic [ref=e550]:
          - generic "Aceh, the veranda of Makkah" [ref=e551]
          - generic: Aceh
        - generic [ref=e552]:
          - generic "Riyadh, Saudi capital" [ref=e553]
          - generic: Riyadh
        - generic [ref=e554]:
          - generic "Jakarta, Indonesia's capital" [ref=e555]
          - generic: Jakarta
      - generic [ref=e556]:
        - generic [ref=e557]: Muslim states, 1896
        - button "Ottoman Empire" [ref=e558] [cursor=pointer]
        - button "Aceh Sultanate" [ref=e559] [cursor=pointer]
        - button "Sokoto Caliphate" [ref=e560] [cursor=pointer]
        - button "Khanate of Bukhara" [ref=e561] [cursor=pointer]
      - generic [ref=e562]:
        - slider "Atlas year" [ref=e563]: "1896"
        - button "↥ timeline" [ref=e564] [cursor=pointer]
      - paragraph [ref=e565]:
        - text: "Borders: nearest snapshot (c. 1900 CE) from Historical Basemaps (Ourednik, GPL-3.0), world-scale approximations, not survey lines. Deep-past frontiers are especially uncertain. Colored = Muslim-ruled · grey = other powers. See"
        - link "methodology" [ref=e566] [cursor=pointer]:
          - /url: ./methodology/
        - text: .
    - button "Saved records" [ref=e568] [cursor=pointer]: ★
    - dialog "Support this project" [ref=e569]:
      - generic [ref=e570]:
        - heading "Keep this instrument free" [level=2] [ref=e571]
        - button "Dismiss support card" [ref=e572] [cursor=pointer]: ✕
      - paragraph [ref=e573]: The Islamic Timeline is free, open, and ad-free. If it benefits you, you can support Amine Hamlouchi's work, every bit helps keep it that way.
      - generic [ref=e574]:
        - link "Cash App · $IbnHamlouchi" [ref=e575] [cursor=pointer]:
          - /url: https://cash.app/$IbnHamlouchi
        - link "All links · Patreon, PayPal & more" [ref=e576] [cursor=pointer]:
          - /url: https://aminehamlouchi.com/links/
      - button "Not now, don't show this again" [ref=e577]
  - alert [ref=e578]
```

# Test source

```ts
  14  |   page.on("console", (m) => {
  15  |     if (m.type() === "error") log.push(m.text());
  16  |   });
  17  |   page.on("pageerror", (e) => log.push(`pageerror: ${e.message}`));
  18  |   await page.goto("./", { waitUntil: "load" });
  19  |   await page.waitForSelector("[data-testid=timeline-canvas]");
  20  |   await page.waitForTimeout(400);
  21  |   // first-visit introduction, dismissed the way a visitor dismisses it
  22  |   const intro = page.getByTestId("onboarding");
  23  |   if (await intro.isVisible().catch(() => false))
  24  |     await intro.getByRole("button", { name: "Skip" }).click();
  25  | });
  26  | 
  27  | test.afterEach(async ({ page }) => {
  28  |   const log = errors.get(page) ?? [];
  29  |   expect(log, `console errors: ${log.join(" | ")}`).toHaveLength(0);
  30  | });
  31  | 
  32  | const canvas = "[data-testid=timeline-canvas]";
  33  | const isPhone = (name: string) => name.includes("phone");
  34  | 
  35  | /** Current year at the top of the view, read from the canvas scale. */
  36  | async function centerYear(page: Page): Promise<number> {
  37  |   return page.evaluate(() => {
  38  |     const el = document.querySelector("[data-testid=timeline-canvas]")!;
  39  |     const ppy = Number(el.getAttribute("data-ppy"));
  40  |     const off = Number(el.getAttribute("data-offset-y"));
  41  |     const now = Number(el.getAttribute("data-now-year"));
  42  |     return now - (off + window.innerHeight / 2) / ppy;
  43  |   });
  44  | }
  45  | async function ppyOf(page: Page): Promise<number> {
  46  |   return page.evaluate(() =>
  47  |     Number(
  48  |       document
  49  |         .querySelector("[data-testid=timeline-canvas]")!
  50  |         .getAttribute("data-ppy"),
  51  |     ),
  52  |   );
  53  | }
  54  | 
  55  | test("scroll and drag travel through time", async ({ page }, info) => {
  56  |   const before = await centerYear(page);
  57  |   if (isPhone(info.project.name)) {
  58  |     await page.locator(canvas).hover({ position: { x: 100, y: 300 } }).catch(() => {});
  59  |     await page.mouse.move(100, 400);
  60  |     await page.mouse.down();
  61  |     await page.mouse.move(100, 200, { steps: 8 });
  62  |     await page.mouse.up();
  63  |   } else {
  64  |     await page.mouse.move(700, 450);
  65  |     await page.mouse.wheel(0, 900);
  66  |   }
  67  |   await page.waitForTimeout(300);
  68  |   expect(Math.abs((await centerYear(page)) - before)).toBeGreaterThan(5);
  69  | });
  70  | 
  71  | test("arrow keys pan and Home returns to today", async ({ page }) => {
  72  |   const start = await centerYear(page);
  73  |   await page.keyboard.press("ArrowDown");
  74  |   await page.keyboard.press("ArrowDown");
  75  |   await page.waitForTimeout(250);
  76  |   expect(await centerYear(page)).toBeLessThan(start);
  77  |   await page.keyboard.press("Home");
  78  |   await page.waitForTimeout(900);
  79  |   expect(Math.abs((await centerYear(page)) - start)).toBeLessThan(6);
  80  | });
  81  | 
  82  | test("keyboard, wheel and double-click zoom", async ({ page }) => {
  83  |   const z0 = await ppyOf(page);
  84  |   await page.keyboard.press("+");
  85  |   await page.waitForTimeout(200);
  86  |   const z1 = await ppyOf(page);
  87  |   expect(z1).toBeGreaterThan(z0);
  88  |   await page.keyboard.press("-");
  89  |   await page.waitForTimeout(200);
  90  |   expect(await ppyOf(page)).toBeLessThan(z1);
  91  | 
  92  |   await page.evaluate(() => {
  93  |     document.querySelector("[data-testid=timeline-canvas]")!.dispatchEvent(
  94  |       new WheelEvent("wheel", {
  95  |         deltaY: -300,
  96  |         clientY: 400,
  97  |         ctrlKey: true,
  98  |         bubbles: true,
  99  |         cancelable: true,
  100 |       }),
  101 |     );
  102 |   });
  103 |   await page.waitForTimeout(200);
  104 |   expect(await ppyOf(page)).toBeGreaterThan(z0);
  105 | 
  106 |   const z2 = await ppyOf(page);
  107 |   await page.locator(canvas).dblclick({ position: { x: 60, y: 300 } });
  108 |   await page.waitForTimeout(250);
  109 |   expect(await ppyOf(page)).toBeGreaterThan(z2);
  110 | });
  111 | 
  112 | test("zoom buttons work", async ({ page }) => {
  113 |   const z0 = await ppyOf(page);
> 114 |   await page.getByRole("button", { name: "Zoom in" }).first().click();
      |                                                               ^ Error: locator.click: Test timeout of 120000ms exceeded.
  115 |   await page.waitForTimeout(700);
  116 |   expect(await ppyOf(page)).toBeGreaterThan(z0);
  117 |   const z1 = await ppyOf(page);
  118 |   await page.getByRole("button", { name: "Zoom out" }).first().click();
  119 |   await page.waitForTimeout(700);
  120 |   expect(await ppyOf(page)).toBeLessThan(z1);
  121 | });
  122 | 
  123 | test("clicking a marker opens the focused record view", async ({ page }) => {
  124 |   const marker = page.locator("[data-id]:not([data-id^=cluster])").first();
  125 |   await marker.click({ force: true });
  126 |   await expect(page.getByTestId("detail-panel")).toBeVisible();
  127 |   await page.getByRole("button", { name: "Close details" }).click();
  128 |   await expect(page.getByTestId("detail-panel")).toBeHidden();
  129 | });
  130 | 
  131 | test("search finds records by name, Arabic and date", async ({ page }) => {
  132 |   for (const [query, expected] of [
  133 |     ["Bukhari", /bukh/i],
  134 |     ["الغزالي", /./],
  135 |     ["1258", /./],
  136 |     ["656 AH", /./],
  137 |   ] as const) {
  138 |     await page.keyboard.press("/");
  139 |     await expect(page.getByTestId("search-palette")).toBeVisible();
  140 |     const box = page.getByRole("combobox");
  141 |     await box.fill(query);
  142 |     await page.waitForTimeout(350);
  143 |     const options = page.getByRole("option");
  144 |     await expect(options.first()).toBeVisible();
  145 |     expect(await options.first().innerText()).toMatch(expected);
  146 |     await page.keyboard.press("Escape");
  147 |     await expect(page.getByTestId("search-palette")).toBeHidden();
  148 |   }
  149 | });
  150 | 
  151 | test("atlas, legend, filters and help open and close", async ({ page }) => {
  152 |   for (const [key, testId] of [
  153 |     ["m", "map-panel"],
  154 |     ["l", "legend"],
  155 |     ["f", "filters-panel"],
  156 |   ] as const) {
  157 |     // the atlas is already open on wide screens, so toggle to a known state
  158 |     const panel = page.getByTestId(testId);
  159 |     if (await panel.isVisible()) await page.keyboard.press(key);
  160 |     await expect(panel).toBeHidden();
  161 |     await page.keyboard.press(key);
  162 |     await expect(panel).toBeVisible();
  163 |     await page.keyboard.press("Escape");
  164 |     await expect(panel).toBeHidden();
  165 |   }
  166 |   await page.keyboard.press("?");
  167 |   await expect(page.getByRole("dialog", { name: "Help" })).toBeVisible();
  168 |   await page.keyboard.press("Escape");
  169 | });
  170 | 
  171 | test("compare tray fills from the record view and opens", async ({ page }) => {
  172 |   const markers = page.locator("[data-id]:not([data-id^=cluster])");
  173 |   for (let i = 0; i < 2; i++) {
  174 |     await markers.nth(i).click({ force: true });
  175 |     await expect(page.getByTestId("detail-panel")).toBeVisible();
  176 |     await page.getByTestId("detail-panel").getByRole("button", { name: /compare/i }).click();
  177 |     await page.keyboard.press("Escape");
  178 |   }
  179 |   await expect(page.getByTestId("compare-tray")).toBeVisible();
  180 |   await page.keyboard.press("c");
  181 |   await expect(page.getByTestId("compare-view")).toBeVisible();
  182 |   await page.keyboard.press("Escape");
  183 | });
  184 | 
  185 | test("bookmarks persist and list in the library", async ({ page }) => {
  186 |   await page.locator("[data-id]:not([data-id^=cluster])").first().click({ force: true });
  187 |   const detail = page.getByTestId("detail-panel");
  188 |   await detail.getByRole("button", { name: /save/i }).click();
  189 |   await expect(detail.getByRole("button", { name: /saved/i })).toBeVisible();
  190 |   await page.keyboard.press("Escape");
  191 |   await page.getByRole("button", { name: "Saved records" }).click();
  192 |   await expect(page.getByTestId("library")).toBeVisible();
  193 |   expect(
  194 |     await page.evaluate(() =>
  195 |       JSON.parse(localStorage.getItem("itl-bookmarks") ?? "[]"),
  196 |     ),
  197 |   ).toHaveLength(1);
  198 | });
  199 | 
  200 | test("the view is a shareable URL that reopens the same view", async ({ page }) => {
  201 |   await page.keyboard.press("+");
  202 |   await page.mouse.move(600, 300);
  203 |   await page.mouse.wheel(0, 700);
  204 |   await page.waitForTimeout(800);
  205 |   const url = page.url();
  206 |   expect(url).toMatch(/[?&]y=/);
  207 |   const year = await centerYear(page);
  208 |   const ppy = await ppyOf(page);
  209 |   await page.goto(url, { waitUntil: "load" });
  210 |   await page.waitForTimeout(700);
  211 |   expect(Math.abs((await centerYear(page)) - year)).toBeLessThan(0.01);
  212 |   expect(Math.abs((await ppyOf(page)) - ppy)).toBeLessThan(1e-6);
  213 | });
  214 | 
```