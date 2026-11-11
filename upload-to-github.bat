@echo off
title Push WIN-J Building Solution to GitHub
color 0b
echo ===================================================
echo     WIN-J BUILDING SOLUTION - GITHUB UPLOADER
echo ===================================================
echo.
echo Author: oliviaparke (jeevanrajm2020@gmail.com)
echo.

set "GIT_CMD=C:\Program Files\Git\cmd\git.exe"
if not exist "%GIT_CMD%" (
    set "GIT_CMD=git"
)

echo [1/3] Checking Git Status...
cd /d "%~dp0"

"%GIT_CMD%" status >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo Initializing Git repository...
    "%GIT_CMD%" init -b main
    "%GIT_CMD%" add .
    "%GIT_CMD%" commit -m "Initial commit: WIN-J Building Solution website"
)

echo.
echo ---------------------------------------------------
echo Before proceeding, make sure you created a new repo on GitHub:
echo 1. Open: https://github.com/new
echo 2. Repository name: win-j-building-solution
echo 3. Click 'Create repository'
echo ---------------------------------------------------
echo.

set /p REPO_URL="Paste your GitHub repository URL here (e.g. https://github.com/oliviaparke/win-j-building-solution.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] No URL entered. Exiting...
    pause
    exit /b
)

echo.
echo [2/3] Connecting to %REPO_URL%...
"%GIT_CMD%" remote remove origin >nul 2>&1
"%GIT_CMD%" remote add origin %REPO_URL%
"%GIT_CMD%" branch -M main

echo.
echo [3/3] Uploading to GitHub...
echo A browser window may open asking you to "Sign in with your browser".
echo Please click "Authorize" when prompted.
echo.

"%GIT_CMD%" push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ===================================================
    echo    SUCCESS! Your website is now live on GitHub!
    echo ===================================================
) else (
    echo.
    echo [NOTE] If you saw an authentication prompt, make sure you signed in
    echo with your GitHub account: oliviaparke
)

echo.
pause
