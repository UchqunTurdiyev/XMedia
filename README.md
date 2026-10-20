# XMEDIA — landing sayt + Telegram bot + Meta CAPI

Next.js 15 (App Router) · Tailwind v4 · Framer Motion · Upstash Redis · Meta Pixel + Conversions API

## Qanday ishlaydi

```
Sayt formasi ──► /api/lead ──► Redis (lid saqlanadi: ism, tel, fbp, fbc, IP, UA, UTM)
                    │
                    ├──► Meta CAPI: Lead   (Pixel bilan bir xil event_id → dedup)
                    └──► Telegram guruh: lid kartasi + tugmalar
                                   │
     ✅ Sifatli lid  ──────────────┼──► Meta CAPI: QualifiedLead
     ❌ Sifatsiz     ──────────────┤    (Meta'ga hech narsa ketmaydi)
     💰 Sotildi → summa yozish ────┴──► Meta CAPI: Purchase { value, currency }
```

- Purchase va QualifiedLead lid kelgan paytdagi **fbp, fbc, IP, User-Agent, telefon (SHA-256), ism, external_id** bilan yuboriladi → Event Match Quality yuqori, reklama to'g'ri atributsiya qilinadi.
- Bitta lidga bir nechta to'lov qo'shish mumkin ("➕ Yana to'lov qo'shish") — har biri alohida Purchase (`order_id` bilan).
- Sotilgan, lekin oldin "Sifatli" bosilmagan lid uchun QualifiedLead ham avtomatik ketadi.
- Telegram qayta yuborgan update ikki marta Purchase yubormaydi (update_id bo'yicha himoya).
- Summa formatlari: `2500000`, `2 500 000`, `2.5 mln`, `500 ming`, `$300`, `300 usd`.

## Ishga tushirish

```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldiring
npm run dev
```

## Sozlash (5 qadam)

1. **Telegram bot** — @BotFather'da bot oching, tokenni `TELEGRAM_BOT_TOKEN` ga yozing. Botni lidlar guruhiga qo'shing va **admin** qiling.
2. **Upstash Redis** — upstash.com → Redis database → REST URL va TOKEN ni env'ga yozing.
3. **Meta** — Events Manager → Pixel ID va Conversions API access token. Test paytida `META_TEST_EVENT_CODE` ni to'ldiring (Test Events oynasida ko'rinadi), keyin bo'shating.
4. **Deploy** (Vercel yoki Eskiz/Node server) — barcha env'larni kiriting, `NEXT_PUBLIC_SITE_URL` = haqiqiy domen.
5. **Webhook** — brauzerda bir marta oching:
   `https://SAYTINGIZ/api/telegram/setup?key=SETUP_KEY`
   So'ng guruhda `/id` yozing → chiqqan Chat ID ni `TELEGRAM_CHAT_ID` ga yozib qayta deploy qiling.

## Meta'da optimizatsiya

- **Events Manager → Custom Conversions** → yangi: event = `QualifiedLead` → nomi "Sifatli lid". Kampaniyani shu konversiyaga optimizatsiya qilsangiz, Meta sizga sifatli lid beradigan odamlarni qidiradi.
- **Purchase** — ROAS va "Value" optimizatsiya uchun. Valyuta: `CAPI_CURRENCY=USD` (so'm `UZS_PER_USD` kurs bo'yicha dollarga aylantiriladi). Reklama kabinetingiz valyutasi boshqacha bo'lsa — shunga moslang.
- Event nomini o'zgartirish: `META_QUALIFIED_EVENT`.

## Bot buyruqlari

| Buyruq | Vazifa |
|---|---|
| `/stat` | Bugungi lidlar, sifatli, sotuv, tushum, konversiya % |
| `/id` | Chat ID va sizning Telegram ID |
| `/bekor` | Summa kiritishni bekor qilish |

> Summani bot yuborgan "💰 … summani yozing" xabariga **reply** qilib yozing — guruhda bot privacy rejimi yoqilgan bo'lsa ham ishlaydi.
> Faqat ma'lum xodimlar tugma bosa olsin desangiz: `TELEGRAM_ADMIN_IDS=111,222`.

## Tahrirlash

- Barcha matnlar, xizmatlar, raqamlar, FAQ, kontaktlar: `lib/content.js`
- Ranglar: `app/globals.css` → `@theme` (neon: `#39ff6a`)
- Logo: `components/ui.js` → `Logo` (o'z logotipingiz bilan almashtirish mumkin)
- `stats` va `cases` dagi raqam/keyslarni haqiqiy natijalaringiz bilan yangilang.

## Fayl tuzilmasi

```
app/
  page.js                 bosh sahifa
  rahmat/page.js          ariza qabul qilingach (thank-you)
  api/lead/route.js       forma → Redis + CAPI Lead + Telegram
  api/telegram/route.js   bot webhook: Sifatli / Sifatsiz / Sotildi + summa → CAPI
  api/telegram/setup      webhook o'rnatish
components/               Hero, Globe, Sections, LeadForm, LeadModal, Navbar, Footer...
lib/
  meta.js                 CAPI, hashing, summa parser
  telegram.js             bot API, tugmalar
  store.js                Redis (Upstash) + statistika
  leadMessage.js          Telegram lid kartasi matni
  content.js              sayt matnlari
```
# XMedia
