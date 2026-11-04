#!/usr/bin/env bash
# Abre a API do professor e o app no navegador. Uso: bash iniciar.sh
cd "$(dirname "$0")" || exit 1

for cmd in node java mvn; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "[ERRO] '$cmd' nao encontrado. Instale Node.js, Java 17 e Maven e rode de novo."
    exit 1
  fi
done

[ -d node_modules ] || { echo "Instalando as dependencias do app..."; npm install; }

echo "Iniciando a API..."
(cd api && mvn spring-boot:run > ../api.log 2>&1) &
API_PID=$!
trap 'kill $API_PID 2>/dev/null; pkill -P $API_PID 2>/dev/null' EXIT

echo "Aguardando a API ficar pronta (a primeira vez pode demorar alguns minutos)..."
until curl -s -o /dev/null http://localhost:8080/api/v1/health; do
  kill -0 $API_PID 2>/dev/null || { echo "[ERRO] A API parou. Veja api.log"; exit 1; }
  sleep 3
done

echo "API pronta. Abrindo o app no navegador..."
npx expo start --web
