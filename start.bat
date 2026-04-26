@echo off
setlocal
cd /d "%~dp0"

echo ===========================================
echo  Homophone Quiz - single-window launcher
echo ===========================================
echo.

where npm >nul 2>nul
if errorlevel 1 (
  echo [ERROR] npm was not found on PATH.
  echo Install Node.js from https://nodejs.org/ and try again.
  goto :end
)

if not exist node_modules (
  echo Installing root dependencies...
  call npm install
  if errorlevel 1 ( echo [ERROR] root npm install failed. & goto :end )
)
if not exist server\node_modules (
  echo Installing server dependencies...
  call npm install --prefix server
  if errorlevel 1 ( echo [ERROR] server npm install failed. & goto :end )
)
if not exist client\node_modules (
  echo Installing client dependencies...
  call npm install --prefix client
  if errorlevel 1 ( echo [ERROR] client npm install failed. & goto :end )
)

echo.
echo Freeing ports 3000 and 5050 (killing any process listening there)...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":5050 " ^| findstr LISTENING') do taskkill /F /PID %%P >nul 2>nul
for /f "tokens=5" %%P in ('netstat -ano ^| findstr ":3000 " ^| findstr LISTENING') do taskkill /F /PID %%P >nul 2>nul

echo.
echo Starting backend + frontend in this window.
echo  Frontend : http://localhost:3000
echo  Backend  : http://localhost:5050
echo.
echo Close this window (or press Ctrl+C) to stop both.
echo.

call npm start

echo.
echo Servers stopped (exit code %errorlevel%).

:end
echo.
echo Press any key to close this window...
pause >nul
endlocal
