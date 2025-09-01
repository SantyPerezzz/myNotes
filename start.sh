#!/bin/bash

echo "🚀 Iniciando Notes Project..."

# Función para limpiar al salir
cleanup() {
  echo ""
  echo "🛑 Deteniendo servicios..."
  kill $BACKEND_PID 2>/dev/null
  kill $FRONTEND_PID 2>/dev/null
  docker stop notes-db >/dev/null 2>&1
  echo "✅ Todo detenido!"
  exit 0
}

# Capturar Ctrl+C (SIGINT)
trap cleanup SIGINT

# 1. Levantar la base de datos con Docker
echo "🐘 Levantando base de datos..."
docker start notes-db 2>/dev/null || docker run --name notes-db \
  -e POSTGRES_USER=notes_user \
  -e POSTGRES_PASSWORD=notes_pass \
  -e POSTGRES_DB=notesdb \
  -p 5432:5432 -d postgres:15

# 2. Levantar backend (Spring Boot)
echo "☕ Levantando backend..."
cd backend || exit
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

# 3. Levantar frontend (React)
echo "🌐 Levantando frontend..."
cd frontend
npm install
npm run dev &
FRONTEND_PID=$!
cd ..

# 4. Mostrar información
echo "✅ Todo levantado!"
echo "   Backend:   http://localhost:8080"
echo "   Frontend:  http://localhost:3000"

# Esperar a que el usuario cancele con Ctrl+C
wait $BACKEND_PID $FRONTEND_PID
