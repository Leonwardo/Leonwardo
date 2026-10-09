@echo off
chcp 65001 >nul
title Leonwardo Portfolio
color 0A

echo.
echo  ============================================
echo   Leonwardo Portfolio - Setup & Start
echo  ============================================
echo.

:: Check Node
where node >nul 2>nul
if %errorlevel% neq 0 (
  echo  [ERRO] Node.js nao encontrado.
  echo  Instala a versao LTS em https://nodejs.org
  pause
  exit /b 1
)

echo  [1/4] A limpar instalacao anterior...
if exist "node_modules" rmdir /s /q node_modules 2>nul
if exist "package-lock.json" del /f /q package-lock.json 2>nul
echo  OK

echo.
echo  [2/4] A instalar dependencias...
call npm install
if %errorlevel% neq 0 (
  echo.
  echo  [ERRO] npm install falhou. Verifica a internet.
  pause
  exit /b 1
)
echo  OK

echo.
echo  [3/4] A garantir o binario do Rollup (Windows)...
call npm install @rollup/rollup-win32-x64-msvc --save-optional --force 2>nul
echo  OK

echo.
echo  [4/4] A iniciar o servidor de desenvolvimento...
echo.
echo  --------------------------------------------
echo   Abre no browser:  http://localhost:5173
echo   Para parar:       Ctrl + C
echo  --------------------------------------------
echo.

call npm run dev

if %errorlevel% neq 0 (
  echo.
  echo  ============================================
  echo   ERRO DETETADO
  echo  ============================================
  echo.
  echo  Se a mensagem falar em "rollup-win32" ou
  echo  "politica de Controlo de Aplicacoes":
  echo.
  echo  1. Confirma que a pasta NAO esta em Downloads
  echo     (recomendado: C:\dev\leonwardo-portfolio)
  echo.
  echo  2. Vai a esta pasta no Explorador:
  echo     node_modules\@rollup\rollup-win32-x64-msvc\
  echo.
  echo  3. Clica com o botao direito no ficheiro
  echo     rollup.win32-x64-msvc.node
  echo     - Propriedades
  echo     - Se aparecer "Desbloquear", marca e Aplica
  echo.
  echo  4. Corre de novo este start.bat
  echo.
  echo  Alternativa: move o projeto para C:\dev\
  echo  e tenta outra vez.
  echo.
)
pause
