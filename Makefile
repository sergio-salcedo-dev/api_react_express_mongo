up:
	@docker-compose up -d || docker compose up -d
	@echo "- Go to: http://localhost:80"

down:
	@docker-compose down || docker compose down
