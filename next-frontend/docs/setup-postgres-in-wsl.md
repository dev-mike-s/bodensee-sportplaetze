# 🐘 WSL + PostgreSQL + Prisma – Quick‑Fix Guide

Dieser Guide hilft dir, wenn Prisma deine PostgreSQL‑Datenbank in WSL nicht findet (P1001 / P1003).

---

## ✅ 1. Windows‑Postgres deaktivieren
Windows darf **keinen eigenen Postgres‑Server** laufen haben, sonst verbindet Prisma sich mit dem falschen.

PowerShell:

```powershell
Get-Service | Where-Object { $_.Name -like "*postgres*" }
Stop-Service -Name <Dienstname> -Force
Set-Service -Name <Dienstname> -StartupType Disabled
```

---

## ✅ 2. WSL neu starten

```powershell
wsl --shutdown
```

Dann Ubuntu neu öffnen.

---

## ✅ 3. Postgres in WSL starten

```bash
sudo service postgresql start
```

---

## ✅ 4. Postgres muss auf allen Interfaces lauschen

Check:

```bash
sudo ss -tlnp | grep 5432
```

Du willst:

```
LISTEN 0.0.0.0:5432
```

Wenn nicht → in `/etc/postgresql/*/main/postgresql.conf`:

```conf
listen_addresses = '*'
```

Restart:

```bash
sudo service postgresql restart
```

---

## ✅ 5. Prüfen, ob die Datenbank existiert

```bash
psql -U postgres -h localhost -c "\l"
```

---

## ✅ 6. Windows‑Forwarding testen

PowerShell:

```powershell
Test-NetConnection -ComputerName localhost -Port 5432
```

Du willst:

```
TcpTestSucceeded : True
```

---

## ✅ 7. Prisma immer über IPv4 verbinden

`.env`:

```env
DATABASE_URL="postgresql://postgres:<passwort>@127.0.0.1:5432/<dbname>"
```

**Nie:**
- `localhost`
- `0.0.0.0`
- WSL‑IP (nur im Notfall)

---

## ✅ 8. Prisma testen

```bash
pnpm prisma db pull
```

---

## 🔧 Troubleshooting

### **P1001 – Can't reach database**
→ Windows forwarded nicht  
→ WSL neu starten (Schritt 2)

Oder Portproxy setzen:

```powershell
netsh interface portproxy add v4tov4 listenport=5432 listenaddress=127.0.0.1 connectport=5432 connectaddress=<WSL-IP>
```

WSL‑IP:

```bash
hostname -I
```

---

### **P1003 – Database does not exist**
→ Windows‑Postgres läuft noch  
→ falscher DB‑Name  
→ Prisma verbindet sich nicht zu WSL

---

## 🧠 Kurzfassung

- Windows‑Postgres **aus**
- WSL‑Postgres **an**
- Lauschen auf `0.0.0.0`
- Prisma nutzt **127.0.0.1**
- Forwarding aktiv
- DB‑Name korrekt
- Fertig
