@echo off
title Push WIN-J Building Solution LLP to GitHub
color 0b
echo ===================================================
echo   WIN-J BUILDING SOLUTION LLP - GITHUB UPLOADER
echo ===================================================
echo.
echo Author: oliviaparke (jeevanrajm2020@gmail.com)
echo.

set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
if not exist "%GIT_CMD%" (
    set "GIT_CMD=git"
)

echo [1/3] Staging and committing latest changes...
cd /d "%~dp0"

"%GIT_CMD%" add .
"%GIT_CMD%" commit -m "Update WIN-J Building Solution LLP: add LLP, video walkthrough, ongoing status, and Kannur address" >nul 2>&1

echo.
echo ---------------------------------------------------
echo Repository target: https://github.com/Oliviaparke/winjbuilding
echo ---------------------------------------------------
echo.

set "DEFAULT_URL=https://github.com/Oliviaparke/winjbuilding.git"
set /p REPO_URL="Press ENTER to use (%DEFAULT_URL%) or paste a new URL: "

if "%REPO_URL%"=="" (
    set "REPO_URL=%DEFAULT_URL%"
)

echo.
echo [2/3] Connecting to %REPO_URL%...
"%GIT_CMD%" remote remove origin >nul 2>&1
"%GIT_CMD%" remote add origin %REPO_URL%
"%GIT_CMD%" branch -M main

echo.
echo [3/3] Uploading all files, video, and assets to GitHub...
"%GIT_CMD%" push -u origin main --force

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo    SUCCESS! Latest files and video are on GitHub!
    echo    Vercel will update your live site in ~20 seconds.
    echo ===================================================
) else (
    echo.
    echo [ERROR] Push failed. Please check the message above.
)

echo.
pause
