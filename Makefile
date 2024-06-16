# Makefile

# Define default make target
all: install prisma-init build start

# Install dependencies for both frontend and backend
install:
	cd frontend && npm install
	cd backend && npm install

# Initialize Prisma database
prisma-init:
 	cd backend/prisma && npx prisma generate
 	cd backend/prisma && npx prisma migrate dev
 	cd backend/prisma && npx ts-node seed.ts

# Build both frontend and backend
build:
	cd backend && npm run build
	cd frontend && npm run build

# Start both frontend and backend servers
start:
	cd backend && npm start &
	cd frontend && npm start &

# Stop both frontend and backend servers
stop:
	-killall npm || true

.PHONY: install build start stop

# Start Docker services
docker-up:
	docker-compose up -d

# Stop Docker services
docker-down:
	docker-compose down

