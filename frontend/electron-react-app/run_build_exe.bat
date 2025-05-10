@echo off
setlocal enabledelayedexpansion

echo Cleaning previous builds...
if exist dist rmdir /s /q dist
if exist build rmdir /s /q build

echo Installing dependencies...
call npm install --legacy-peer-deps

echo Building React application...
call npm run build
if errorlevel 1 (
    echo Build failed. Check console for errors.
    pause
    exit /b 1
)

echo Packaging Windows executable...
call npm run package:win
if errorlevel 1 (
    echo Packaging failed. Check console for errors.
    pause
    exit /b 1
)

echo Build complete. Executable can be found in the 'dist' folder.
pause
