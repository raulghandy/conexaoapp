@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Conexao App

rem Usa as ferramentas instaladas pelo instalar.bat, se existirem.
if exist "%~dp0.tools\node\node.exe" set "PATH=%~dp0.tools\node;%PATH%"
if exist "%~dp0.tools\jdk\bin\java.exe" set "JAVA_HOME=%~dp0.tools\jdk"
if exist "%~dp0.tools\jdk\bin\java.exe" set "PATH=%~dp0.tools\jdk\bin;%PATH%"
if exist "%~dp0.tools\maven\bin\mvn.cmd" set "PATH=%~dp0.tools\maven\bin;%PATH%"

where node >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Node.js nao encontrado. Rode o instalar.bat primeiro.
  pause
  exit /b 1
)
where java >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Java nao encontrado. Rode o instalar.bat primeiro.
  pause
  exit /b 1
)
where mvn >nul 2>nul
if errorlevel 1 (
  echo [ERRO] Maven nao encontrado. Rode o instalar.bat primeiro.
  pause
  exit /b 1
)

if not exist node_modules (
  echo Instalando as dependencias do app, so na primeira vez...
  call npm install
)

echo Iniciando a API em uma nova janela...
start "API do professor" cmd /k "cd /d %~dp0api && mvn spring-boot:run"

echo Aguardando a API ficar pronta, a primeira vez pode demorar alguns minutos...
:espera
powershell -NoProfile -Command "try { Invoke-WebRequest -UseBasicParsing http://localhost:8080/api/v1/health | Out-Null; exit 0 } catch { exit 1 }"
if errorlevel 1 (
  timeout /t 3 /nobreak >nul
  goto espera
)

echo API pronta. Abrindo o app no navegador...
call npx expo start --web
