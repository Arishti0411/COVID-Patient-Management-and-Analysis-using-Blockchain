# COVID-Patient-Management-and-Analysis-using-Blockchain
A smart Contract Based Decentralized Application for COVID Patient Management and Analysis 

SYSTEM REQUIREMENTS:
1. GANACHE: You can download it from https://www.trufflesuite.com/ganache and install it.
2. MetaMask Chrome extension and MetaMask Legacy Web3 Chrome extension:  Just directly go to chrome://extensions/ and search and add these two extensions on your google chrome
3. NODE.JS: Go to https://nodejs.org/en/ and download it. To check if its running in your cmd type -> node -v
4. TRUFFLE FRAMEWORK: Open cmd, go to your directory, and run-> npm install -g truffle@5.0.2

HOW TO EXECUTE THIS PROJECT ON YOUR SYSTEM:
1. Launch Ganache
2. Create a metamask account. Refer: https://docs.matic.network/docs/develop/metamask/hello/
3. Create a Custom RPC Network in metamask and connect it to ganache. Refer: https://www.youtube.com/watch?v=nUEBAS5r4Og
4. Download repo in a zip and unzip it in the folder 
5. Open cmd and go to the same directory and run -> npm install 
This will install all the node modules needed in the project directory
6. Now run the command -> truffle compile
7. After that run -> truffle migrate --reset 
NOTE: Make sure ganache is running!!!
8. Open a new cmd and go to the project directory and run the command -> npm run dev
VOILA!!! COVID PORTAL opens automatically in your default browser. If it doesn't give localhost:3000 in chrome...



