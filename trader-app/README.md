# Trader Tools — Deploy no Vercel

Projeto com duas ferramentas:
- **GemRadar** — Scanner de criptos com volume > $10k (DexScreener)
- **Scanner Góes** — Método Fernando Góes para opções na B3

---

## Deploy em 5 minutos

### 1. Suba para o GitHub

```bash
# No terminal do seu computador:
cd trader-app
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/trader-app.git
git push -u origin main
```

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e faça login com o GitHub
2. Clique em **"Add New Project"**
3. Selecione o repositório `trader-app`
4. Deixe todas as configurações no padrão (Vite é detectado automaticamente)
5. Clique em **"Deploy"**
6. Em ~1 minuto você recebe uma URL como `trader-app.vercel.app`

### 3. Instalar como app no celular

**Android (Chrome):**
1. Abra a URL no Chrome
2. Menu (⋮) → "Adicionar à tela inicial"
3. Confirme — aparece como app nativo

**iPhone (Safari):**
1. Abra a URL no Safari
2. Botão de compartilhar → "Adicionar à tela de início"

---

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acessa em `http://localhost:5173`
