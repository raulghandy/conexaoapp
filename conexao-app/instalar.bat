@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Instalando o Conexao App
echo Verificando o que precisa ser instalado...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0instalar.ps1"
if errorlevel 1 (
  pause
  exit /b 1
)
call "%~dp0iniciar.bat"
