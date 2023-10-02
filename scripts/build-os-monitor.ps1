$distFolderPath = "dist"

function InitBuild() {
    Write-Host "`n[Build os-monitor]"
}

function EndBuild() {
    Write-Host "`n[Build successfull!]"
}

function RemoveDist() {
    Write-Host "`n[Remove dist folder]"
    if (Test-Path $distFolderPath) {
        Remove-Item -Recurse $distFolderPath
        Write-Host "$distFolderPath removed!"
    }
}

# Build script for os-monitor-connector
function BuildOsMonitorConnector() {
    try {
        Write-Host "`n[Build os-monitor-connector]"

        $destination =  "dist/os-monitor/os-monitor-connector/src"
        $envFile = ".env.production"

        Write-Host "Compiling TypeScript..."
        npx tsc
        Write-Host "TypeScript compiled successfully!"

        Write-Host "Copy $envFile to $destination"
        Copy-Item $envFile $destination
        Rename-Item "$destination\$envFile" ".env"
    } catch {
        Write-Host "Error while build os-monitor-connector: $_"
    }
}

# Main
InitBuild
RemoveDist
BuildOsMonitorConnector
EndBuild