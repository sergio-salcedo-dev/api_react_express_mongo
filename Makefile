up:
	@docker-compose up -d --build || docker compose up -d --build
	@echo "Back-end (Express): http://localhost:80"
	@echo "Front-end (React): http://localhost:3000"

health-check:
	@docker ps || docker ps
	@docker logs express || docker logs express
	@docker logs react || docker logs react
	@docker logs mongodb || docker logs mongodb

soft-down:
	@docker-compose down || docker compose down

down:
	@docker-compose down || docker compose down
	@docker volume prune || docker volume prune
	@docker container prune || docker container prune
	@docker image prune -a || docker image prune -a
	@docker ps -a || docker ps -a
	@docker images || docker images

