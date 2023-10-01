@echo off


REM reads the setup.properties as variables
SET CONFIG_FILE=setup.properties
for /F "tokens=1,2 delims==" %%a in (%CONFIG_FILE%) do (
    if not "%%a"=="" (
        set "%%a=%%b"
    )
)

SET NODE_INSTALLER_URL="https://nodejs.org/dist/%NODE_VERSION%/node-%NODE_VERSION%-x64.msi"
SET NODE_INSTALLER_PATH=%TEMP%\node-installer.msi

echo Downloading Node.js (%NODE_VERSION%) Installer...
powershell -Command "(New-Object Net.WebClient).DownloadFile('%NODE_INSTALLER_URL%', '%NODE_INSTALLER_PATH%')"

echo Installing Node.js from %NODE_INSTALLER_URL%
start /wait msiexec /i "%NODE_INSTALLER_PATH%" /qn

echo Cleaning up...
del "%NODE_INSTALLER_PATH%"

echo Checking Node.js and npm versions:
node -v
npm -v
pause
