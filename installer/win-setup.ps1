$configuration = @{}

# initialize the installation
function InitializeInstallation {
    Write-Host "_____ _____ _____         _ _"
    Write-Host "|     |   __|     |___ ___|_| |_ ___ ___"
    Write-Host "|  |  |__   | | | | . |   | |  _| . |  _|"
    Write-Host "|_____|_____|_|_|_|___|_|_|_|_| |___|_|"
}

# reads the config from setup.properties. Config variables are global and starts with the "CONFIG_"-prefix.
function LoadConfiguration {
    $configurationFile = "setup.properties"
    $keyValuePairPattern = "(.+)=(.+)"

    try {
        $configurationFileContent = Get-Content $configurationFile
        Write-Host "`n[Load configuration from setup.properties]"
         $configurationFileContent | ForEach-Object {
            if ([string]$_ -match $keyValuePairPattern) {
                $variableName = [string]$matches[1]
                $variableValue = [string]$matches[2]
                $configuration[$variableName] = $variableValue;
            }
        }

        # validate, if every necessary variable is inside the configuration file
        if (-not ($configuration.ContainsKey('NODE_VERSION'))) {
            Write-Host "The variable 'NODE_VERSION' does not exist on your config. Please check the 'setup.properties'-File."
            AbortInstallation
        }
        if (-not ($configuration.ContainsKey('NGINX_VERSION'))) {
            Write-Host "The variable 'NGINX_VERSION' does not exist on your config. Please check the 'setup.properties'-File."
            AbortInstallation
        }
        if (-not ($configuration.ContainsKey('NGINX_INSTALLATION_PATH'))) {
            Write-Host "The variable 'NGINX_INSTALLATION_PATH' does not exist on your config. Please check the 'setup.properties'-File."
            AbortInstallation
        }

        Write-Host "The configuration was successfully loaded:"
        Write-Host "* NODE_VERSION=$($configuration.NODE_VERSION)"
        Write-Host "* NGINX_VERSION=$($configuration.NGINX_VERSION)"
        Write-Host "* NGINX_INSTALLATION_PATH=$($configuration.NGINX_INSTALLATION_PATH)"

    } catch {
        Write-Host "Error while reading configuration file: $_"
        AbortInstallation
    }

}

# installation of node from node-installer.msi packages
function InstallNode {
    $nodeInstallerUrl = "https://nodejs.org/dist/$($configuration.NODE_VERSION)/node-$($configuration.NODE_VERSION)-x64.msi"
    $nodeInstallerPath = "$env:TEMP\node-installer.msi"
    $nodeInstalled = $true

    Write-Host "`n[Install Node.js]"
    Write-Host "Check if Node.js is already installed..."

    try {
        $installedVersion = node -v
    } catch {
        $nodeInstalled = $false
    }

    if ($nodeInstalled) {
        Write-Host "Node.js $installedVersion is already installed. Skipping installation of Node.js."
        return
    }

    try {
        Write-Host "Node.js is not installed."
        Write-Host "Downloading Node.js ($($configuration.NODE_VERSION)) Installer from $nodeInstallerUrl..."
        Invoke-WebRequest -Uri $nodeInstallerUrl -OutFile $nodeInstallerPath
        Write-Host "Installing Node.js from $nodeInstallerUrl"
        Start-Process -Wait -FilePath "msiexec.exe" -ArgumentList "/i $nodeInstallerPath /qn"
    } catch {
        Write-Host "Error while installing Node.js: $_"
    } finally {
        Write-Host "Cleaning up..."
        if (Test-Path $nodeInstallerPath) {
            Remove-Item $nodeInstallerPath
        }
    }

}

# installation of nginx as zip
function InstallNginx {
    $nginxFolder = "nginx-$($configuration.NGINX_VERSION)"
    $nginxZip = "nginx-$($configuration.NGINX_VERSION).zip"
    $nginxDownloadUrl = "https://nginx.org/download/nginx-$($configuration.NGINX_VERSION).zip"
    $tempInstallationPath = "$env:TEMP\$nginxZip"
    $nginxTargetInstallationPath = "$($configuration.NGINX_INSTALLATION_PATH)\$nginxZip"
    $nginxTargetInstallationFolderPath = "$($configuration.NGINX_INSTALLATION_PATH)\$nginxFolder"

    Write-Host "`n[Install nginx]"

    try {
        if (-not (Test-Path $configuration.NGINX_INSTALLATION_PATH)) {
            Write-Host "Create folder $($configuration.NGINX_INSTALLATION_PATH) .."
            New-Item -ItemType Directory -Path $configuration['NGINX_INSTALLATION_PATH']
        }

        Write-Host "Downloading nginx ($nginxZip) from $nginxDownloadUrl into $tempInstallationPath..."
        Invoke-WebRequest -Uri $nginxDownloadUrl -OutFile $tempInstallationPath

        Copy-Item $tempInstallationPath $configuration['NGINX_INSTALLATION_PATH']
        Write-Host "Copied nginx from $tempInstallationPath to $($configuration['NGINX_INSTALLATION_PATH'])"

        if (-not (Test-Path $nginxTargetInstallationFolderPath)) {
            Write-Host "Extract nginx ($nginxZip) Installer..."
            Expand-Archive -Path $nginxTargetInstallationPath -DestinationPath $configuration['NGINX_INSTALLATION_PATH']

            Write-Host "Start nginx on $nginxTargetInstallationFolderPath"
            Set-Location $nginxTargetInstallationFolderPath
            Start-Process "nginx.exe"
        }
    } catch {
        Write-Host "Error while installing nginx: $_"
    } finally {
        Write-Host "Cleaning up..."
        if (Test-Path $nginxTargetInstallationPath) {
            Remove-Item $nginxTargetInstallationPath
        }

        if (Test-Path $tempInstallationPath) {
            Remove-Item $tempInstallationPath
        }
    }
}

# ivalidate, if the installation was successfull
function ValidateInstallation {
    Write-Host "`n[Validate installation]"

    try {
        $installedVersion = node -v
        Write-Host "Node.js $installedVersion is installed."
    } catch {
        Write-Host "Node.js is not installed."
    }

    $nginxRunning = Get-Process | Where-Object {$_.Name -eq "nginx"} | Measure-Object
    if ($nginxRunning.Count -eq 0) {
        Write-Host "nginx is not running."
    } else {
        Write-Host "nginx is installed and running."
    }
}

# end the installation
function EndInstallation() {
    Write-Host "`n[Installation complete!]"
}

# abort the installation, used if something is failing
function AbortInstallation() {
    Write-Host "`n[Installation failed!]"
    Pause
    exit
}

# Main
InitializeInstallation
LoadConfiguration
InstallNode
InstallNginx
ValidateInstallation
EndInstallation
Pause