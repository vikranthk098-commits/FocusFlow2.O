@echo off
set "PATH=C:\Program Files\nodejs;%PATH%"
cd /d "%~dp0"
echo ===================================================
echo   FocusFlow - Student Productivity Platform
echo   Launching Express Backend (Port 5000)
echo   Launching Vite Client (Port 5173)
echo ===================================================
npm.cmd run dev
