#!/bin/bash
# Server-side setup for admin.bismagroup.uz (run on the VPS as root)
set -euo pipefail

APP_DIR="/var/www/bisma-group"
NGINX_MAIN="/etc/nginx/sites-available/bismagroup.uz"
NGINX_ADMIN="/etc/nginx/sites-available/admin.bismagroup.uz"

echo "==> Pull latest code"
cd "$APP_DIR"
git pull origin main
npm install --legacy-peer-deps
npx prisma generate
npm run build

echo "==> Start / restart PM2 processes"
if pm2 describe bisma >/dev/null 2>&1; then
  pm2 restart bisma
else
  cd "$APP_DIR" && pm2 start "npx next start -p 3100" --name bisma --cwd "$APP_DIR"
fi

if pm2 describe bisma-admin >/dev/null 2>&1; then
  pm2 restart bisma-admin
else
  cd "$APP_DIR" && pm2 start "env ADMIN_ONLY=true NEXT_PUBLIC_ADMIN_ONLY=true npx next start -p 3101" --name bisma-admin --cwd "$APP_DIR"
fi
pm2 save

echo "==> Write nginx config for admin subdomain"
cat > "$NGINX_ADMIN" <<'NGINX'
server {
    listen 80;
    server_name admin.bismagroup.uz;

    client_max_body_size 20M;

    location / {
        proxy_pass http://127.0.0.1:3101;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 120s;
    }
}
NGINX

ln -sf "$NGINX_ADMIN" /etc/nginx/sites-enabled/admin.bismagroup.uz
nginx -t
systemctl reload nginx

echo "==> SSL for admin subdomain (if certbot available)"
if command -v certbot >/dev/null 2>&1; then
  certbot --nginx -d admin.bismagroup.uz --non-interactive --agree-tos -m tradevisionai@gmail.com --redirect || true
fi

echo "==> Done. Admin panel: https://admin.bismagroup.uz/login"
