#!make

ifeq (, $(shell which tmux))
$(error "no tmux in PATH, consider typing apt install tmux")
endif

include .env
export $(shell sed 's/=.*//' .env)

DEV_ADDRESS = ${devAddress}

prepare:
	@echo "\n---> installing frontend dependencies\n";
	@cd nextjs && npm install;
	@echo "\n---> installing backend dependencies\n";
	@cd hardhat && npm install;

dev:
	@echo "\n---> initializing dev end\n";
	
	@tmux new -s "web3-starter" -d;
	@tmux split-window -v;
	@tmux split-window -h;

	@echo "\n---> initializing local blockchain\n"

	@tmux send-keys -t web3-starter.0 "cd hardhat && npx hardhat node" ENTER;
	@sleep 3;
	@echo "done!"

	@echo "\n---> initializing frontend\n"

	@tmux send-keys -t web3-starter.1 "cd nextjs && npm run dev" ENTER;
	@sleep 1;
	@echo "done!"

deploy:
	@echo "\n---> deploying smart contract\n";
	
	@cd hardhat && npx hardhat run scripts/deploy.js --network localhost;

faucet:
	@echo "\n---> sending 100 ETH to $(DEV_ADDRESS)\n";
	@cd hardhat && npx hardhat faucet $(DEV_ADDRESS) --network localhost;

attach:
	@echo "\n---> attaching to <web3-starter>\n";
	@tmux a -t "web3-starter";

off:
	@echo "\n---> turning off hardhat and nodejs\n";
	@tmux kill-server;

clean:
	@echo "\n---> deleting temporary files and node_modules\n";
	@cd hardhat && rm -rf node_modules artifacts cache
	@cd nextjs && rm -rf node_modules .next artifacts
	@echo "done!"

.PHONY: prepare dev deploy faucet attach off clean
