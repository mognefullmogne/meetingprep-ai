# 🚀 Deploy MeetingPrep AI - Guida Rapida

## Opzione 1: Deploy con Vercel (CONSIGLIATO - 5 minuti)

### Passo 1: Crea Repository GitHub
1. Vai su https://github.com/new
2. Nome repository: `meetingprep-ai`
3. Lascia tutto di default (Public va bene)
4. **NON** selezionare "Initialize with README"
5. Clicca "Create repository"

### Passo 2: Push del Codice
Copia e incolla questi comandi nel terminale (nella cartella del progetto):

```bash
git remote add origin https://github.com/TUO-USERNAME/meetingprep-ai.git
git branch -M main
git push -u origin main
```

(Sostituisci `TUO-USERNAME` con il tuo username GitHub)

### Passo 3: Deploy su Vercel
1. Vai su https://vercel.com/new
2. Accedi con GitHub
3. Clicca "Import" sul repository `meetingprep-ai`
4. **NON CAMBIARE NULLA** nelle impostazioni
5. Clicca "Deploy"

⏳ Aspetta 2-3 minuti...

### Passo 4: Aggiungi le Environment Variables
1. Nella dashboard Vercel, vai su "Settings" → "Environment Variables"
2. Aggiungi queste variabili UNA PER UNA:

```
DATABASE_URL = <your-neon-database-url>

NEXTAUTH_SECRET = <your-nextauth-secret>

GOOGLE_CLIENT_ID = <your-google-client-id>

GOOGLE_CLIENT_SECRET = <your-google-client-secret>

MOONSHOT_API_KEY = <your-moonshot-api-key>
```

**IMPORTANT:** Usa i valori dal tuo file `.env.local` locale!

3. Per `NEXTAUTH_URL`: aspetta che Vercel finisca il deploy, poi usa l'URL che ti dà (es: `https://meetingprep-ai-xxx.vercel.app`)

### Passo 5: Aggiorna Google OAuth
1. Vai su https://console.cloud.google.com/apis/credentials
2. Clicca sul tuo OAuth Client ID
3. In "Authorized redirect URIs", aggiungi:
   ```
   https://TUO-DOMINIO-VERCEL.vercel.app/api/auth/callback/google
   ```
   (Usa il dominio che Vercel ti ha dato)
4. Salva

### Passo 6: Redeploy
1. Torna su Vercel
2. Vai su "Deployments"
3. Clicca sui 3 puntini dell'ultimo deploy → "Redeploy"

## ✅ FATTO!

Il tuo sito sarà live su: `https://tuo-nome.vercel.app`

Chiunque potrà:
- Creare un account con Google
- Generare briefs per meeting
- Salvare e visualizzare i propri briefs

---

## 🆘 Problemi Comuni

### "Failed to create brief"
- Controlla che la `MOONSHOT_API_KEY` sia corretta su Vercel
- Fai un redeploy dopo aver aggiunto le variabili

### "OAuth error"
- Verifica che l'URL di redirect su Google Console sia esatto
- Deve finire con `/api/auth/callback/google`

### "Database error"
- Verifica che `DATABASE_URL` sia copiato correttamente
- Assicurati che il database Neon sia attivo

---

## 💰 Costi

**TUTTO GRATIS:**
- Vercel: Free tier (100GB bandwidth/mese)
- Neon Database: Free tier (0.5GB)
- Moonshot AI: Free tier (1M tokens/mese)
- Google OAuth: Gratis

---

## 🔐 Sicurezza

✅ Le password non sono mai salvate (solo Google OAuth)
✅ Il file `.env.local` NON viene pubblicato (è in .gitignore)
✅ Ogni utente vede solo i propri briefs
