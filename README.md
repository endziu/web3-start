* requires nodejs 18 & tmux

#### set env variables
```
 $ export devAddress=0x1234...abcd
 $ export ALCHEMY_KEY=YourAlchemyApiKey
```
#### install dependencies
```
 $ make prepare
```
####  setup dev env
```
 $ make dev
```
#### spin up local blockchain & rpc node
```
 $ make chain
```
#### deploy smart contract
```
 $ make deploy
```
#### spin up frontend
```
 $ make frontend
```
#### send 100 local eth to dev address
```
 $ make faucet
```
#### attach to tmux session
```
 $ make attach
```
#### kill tmux server
```
 $ make off
```
#### project cleanup: remove node_modules & temp files
```
 $ make clean
```
