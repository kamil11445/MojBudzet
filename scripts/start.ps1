$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)
$localNode = Join-Path $PWD '.tools/node-v22.16.0-win-x64'
if (Test-Path $localNode) { $env:Path = $localNode + [IO.Path]::PathSeparator + $env:Path }
& npm.cmd run dev
