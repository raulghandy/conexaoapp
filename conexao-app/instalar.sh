#!/usr/bin/env bash
# Instala Node.js, Java 17 e Maven (macOS com Homebrew ou Linux com apt) e abre o app.
cd "$(dirname "$0")" || exit 1
if command -v brew >/dev/null 2>&1; then
  brew install node openjdk@17 maven
  export JAVA_HOME="$(brew --prefix openjdk@17)"
  export PATH="$JAVA_HOME/bin:$PATH"
elif command -v apt-get >/dev/null 2>&1; then
  sudo apt-get update && sudo apt-get install -y nodejs npm openjdk-17-jdk maven
else
  echo "Instale manualmente: Node.js (nodejs.org), JDK 17 e Maven."
  exit 1
fi
bash iniciar.sh
