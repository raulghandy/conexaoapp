# Instala o que falta (Node.js, Java 17 e Maven) dentro da pasta .tools deste projeto.
# Não precisa de administrador e não muda nada no resto do computador.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$tools = Join-Path $PSScriptRoot '.tools'
New-Item -ItemType Directory -Force $tools | Out-Null

# Devolve o número principal da versão de um programa (ou 0 se não existir).
function VersaoPrincipal($comando, $argumento) {
  if (-not (Get-Command $comando -ErrorAction SilentlyContinue)) { return 0 }
  $texto = cmd /c "$comando $argumento 2>&1" | Out-String
  if ($texto -match '(\d+)[\.\d]*') { return [int]$Matches[1] }
  return 0
}

function Baixar($nome, $url, $destino) {
  Write-Host "Baixando $nome (pode demorar)..."
  $zip = Join-Path $tools "$nome.zip"
  $tmp = Join-Path $tools "$nome-tmp"
  Invoke-WebRequest -Uri $url -OutFile $zip -UseBasicParsing
  if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
  Expand-Archive -Path $zip -DestinationPath $tmp -Force
  $pasta = Get-ChildItem $tmp -Directory | Select-Object -First 1
  if (Test-Path $destino) { Remove-Item -Recurse -Force $destino }
  Move-Item $pasta.FullName $destino
  Remove-Item -Recurse -Force $tmp
  Remove-Item $zip
}

try {
  # Node.js (o Expo precisa da versão 20 ou mais nova)
  $node = Join-Path $tools 'node'
  if (-not (Test-Path "$node\node.exe") -and (VersaoPrincipal 'node' '-v') -lt 20) {
    Baixar 'node' 'https://nodejs.org/dist/v22.12.0/node-v22.12.0-win-x64.zip' $node
  } else { Write-Host 'Node.js: ok' }

  # Java 17 ou mais novo
  $jdk = Join-Path $tools 'jdk'
  if (-not (Test-Path "$jdk\bin\java.exe") -and (VersaoPrincipal 'java' '-version') -lt 17) {
    Baixar 'jdk' 'https://api.adoptium.net/v3/binary/latest/17/ga/windows/x64/jdk/hotspot/normal/eclipse' $jdk
  } else { Write-Host 'Java: ok' }

  # Maven
  $maven = Join-Path $tools 'maven'
  if (-not (Test-Path "$maven\bin\mvn.cmd") -and -not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Baixar 'maven' 'https://archive.apache.org/dist/maven/maven-3/3.9.9/binaries/apache-maven-3.9.9-bin.zip' $maven
  } else { Write-Host 'Maven: ok' }
}
catch {
  Write-Host ''
  Write-Host "[ERRO] $($_.Exception.Message)"
  Write-Host 'Confira a internet e rode de novo. Se continuar, instale manualmente:'
  Write-Host '  Node.js LTS: https://nodejs.org'
  Write-Host '  JDK 17:      https://adoptium.net'
  Write-Host '  Maven:       https://maven.apache.org/download.cgi'
  exit 1
}
Write-Host 'Tudo pronto.'
