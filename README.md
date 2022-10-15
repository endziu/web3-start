#### set env variable with your eth dev address
```
 $ export devAddress=0x1234...abcd
```
#### install dependencies
```
 $ make prepare
```
#### spin up local blockchain, rpc node & web dev server
```
 $ make dev
```
#### deploy default smart contract
```
 $ make deploy
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
#### project cleanup: node_modules & temp files
```
 $ make clean
```
