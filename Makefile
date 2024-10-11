# COLORS
GREEN		= \033[1;32m
RED 		= \033[1;31m
ORANGE		= \033[1;33m
CYAN		= \033[1;36m
RESET		= \033[0m

# FOLDER
SRCS_DIR	= ./
DOCKER_DIR	= ${SRCS_DIR}docker-compose.yml

# COMMANDS
DOCKER		=  docker compose -f ${DOCKER_DIR} -p redtetris

%:
	@:

all: up

up:
	@echo "${GREEN}Starting containers...${RESET}"
	@${DOCKER} up -d --remove-orphans

down:
	@echo "${RED}Stopping containers...${RESET}"
	@${DOCKER} down

stop:
	@echo "${RED}Stopping containers...${RESET}"
	@${DOCKER} stop

rebuild:
	@echo "${GREEN}Rebuilding containers...${RESET}"
	@${DOCKER} up -d --remove-orphans --build

nocache:
	@echo "${GREEN}Rebuilding containers...${RESET}"
	@${DOCKER} build --no-cache
	@${DOCKER} up -d --remove-orphans

delete:
	@echo "${RED}Deleting containers...${RESET}"
	@${DOCKER} down -v --remove-orphans

node:
	@echo "${GREEN}Entering node container...${RESET}"
	@${DOCKER} exec node bash

.PHONY: all up down stop rebuild nocache delete node