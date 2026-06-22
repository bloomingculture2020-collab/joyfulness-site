# Joyfulness website — setup, proces & to-do

Dit document beschrijft hoe Menno en Johan samen aan deze site werken vanuit Claude (Cowork), met GitHub als opslag van de code en Vercel als hosting.

## Architectuur (gekozen opzet)

- **Code & versiebeheer:** GitHub-repo `bloomingculture2020-collab/joyfulness-site` (bestaat al, beide kunnen erbij).
- **Framework:** Astro — statische site, makkelijk uit te breiden met nieuwe pagina's.
- **Hosting:** Vercel, **nieuw apart account** voor Joyfulness (los van iemands privéaccount), **Hobby-plan (gratis)**.
- **Domein:** eerst draaien op een tijdelijk `*.vercel.app`-adres; pas als alles getest is wordt `joyfulness.company` overgezet van WordPress naar Vercel.

## Hoe Menno en Johan samenwerken via Claude

Beiden hebben een eigen Claude-account en werken op dezelfde GitHub-repo. Praktisch werkt dat zo:

1. Wie aan de site werkt, vraagt Claude (in Cowork) om de map met het project te openen of wijzigingen te maken.
2. Wijzigingen worden gecommit en gepusht naar de `main`-branch van de repo (of een feature-branch als je liever eerst los werkt en samenvoegt).
3. Vercel is gekoppeld aan de GitHub-repo: **elke push naar `main` triggert automatisch een nieuwe live deploy**, en elke andere branch/PR krijgt een eigen preview-link om rustig te bekijken voordat het live gaat.
4. Zo hoeven jullie nooit handmatig bestanden te kopiëren of te deployen — dat doet Vercel automatisch zodra er gepusht wordt.

Praktische afspraak om botsingen te voorkomen: spreek af wie wanneer aan de site werkt, of werk in apart branches per wijziging.

## Status nu

- [x] Astro-project opgezet (1 pagina: intro Joyfulness + boekaankondiging)
- [x] Lokale build getest (`npm run build` werkt)
- [x] Logo en huisstijlkleuren verwerkt
- [ ] Project gepusht naar GitHub
- [ ] Vercel-account aangemaakt en gekoppeld
- [ ] Live op tijdelijk vercel.app-adres
- [ ] Inhoud gecontroleerd door Johan
- [ ] Domein joyfulness.company verhuisd van WordPress naar Vercel
- [ ] WordPress-site offline gezet

## To-do — stap voor stap

### 1. Code naar GitHub pushen (eenmalig, door Menno of Johan)
Claude heeft geen schrijftoegang tot GitHub, dus dit zet je zelf even via de terminal:

```bash
cd joyfulness-site
git init
git remote add origin https://github.com/bloomingculture2020-collab/joyfulness-site.git
git add .
git commit -m "Eerste versie: homepage met intro en boekaankondiging"
git branch -M main
git push -u origin main
```

Heeft Johan dit liever? Dan kan hij de map ontvangen en dezelfde stappen volgen — hij heeft toegang tot dezelfde repo.

### 2. Nieuw Vercel-account aanmaken
- Ga naar vercel.com → Sign Up → kies "Continue with GitHub" (handigst, koppelt meteen) of met het Gmail-adres van de coöperatie.
- Belangrijk: gebruik **niet** een bestaand persoonlijk Vercel-account — maak een nieuw account specifiek voor Joyfulness.

### 3. Project importeren in Vercel
- Vercel-dashboard → "Add New" → "Project" → selecteer de repo `bloomingculture2020-collab/joyfulness-site`.
- Framework wordt automatisch herkend als Astro. Klik "Deploy".
- Je krijgt een gratis `joyfulness-site-xxxx.vercel.app` adres terug — dit is de testomgeving.

### 4. Johan toegang geven in Vercel
- Op het Hobby-plan kan er maar 1 account-eigenaar zijn. Johan kan wel:
  - Meekijken via de GitHub-repo (waar hij al bij kan).
  - Preview-links openen die Vercel automatisch maakt per commit/branch.
- Willen jullie dat Johan ook volwaardig in Vercel zelf kan werken (eigen rol, geen wachtwoorden delen)? Dan is een upgrade naar het Pro/Team-plan (~$20/maand) nodig. Dat kunnen jullie altijd later nog doen.

### 5. Inhoud controleren
- Klopt de tekst over Joyfulness?
- Klopt de verwachte verschijningsmaand van het boek (nu: september/oktober 2026)?
- Ontbreekt er contactinformatie (e-mailadres, social links)? Die zijn nu bewust nog niet toegevoegd — graag aanleveren zodra bekend.

### 6. Domein verhuizen (pas als alles getest en akkoord is)
- In Vercel: project → Settings → Domains → voeg `joyfulness.company` (en `www.joyfulness.company`) toe.
- Vercel geeft de DNS-instellingen (meestal een A-record of CNAME) die je bij de huidige domeinregistrar van joyfulness.company instelt.
- Zet dit pas om als de WordPress-site echt offline mag — dan is er geen downtime-risico.

### 7. WordPress offline zetten
- Pas nadat de domeinmigratie is bevestigd en de nieuwe site goed bereikbaar is.

## Later uit te bouwen

- Meer pagina's (bijv. over Joyfulness, het boek zelf met aanmeldformulier, contact).
- E-mail-aanmelding voor boekupdates (bijv. via een los formulier-/nieuwsbriefdienst).
- Eventueel: Vercel Pro/Team-plan voor volledige gedeelde toegang tussen Menno en Johan.
