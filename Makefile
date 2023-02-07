up:
	@docker-compose up -d || docker compose up -d
	@echo "- Go to: http://localhost:80"
	@docker logs express || docker logs express

down:
	@docker-compose down || docker compose down
	@docker volume prune || docker volume prune
	@docker container prune || docker container prune
	@docker image prune -a || docker image prune -a
	@docker ps -a || docker ps -a
	@docker images || docker images
