# croix-rouge-storage-manager
React app to manage a warehouse for La Croix Rouge of Le Perreux-Sur-Marne

School project : ESGI Paris Master 2 Software Architect

## Installation and Setup Instructions

#### You will need `node` and `yarn` installed globally on your machine.  

1 - Clone this repository.

2 - Create .env file with the following variables:  

```env
REACT_APP_API_URL=https://api.example.com
API_KEY=1234567890abcdef
```

3 - Installation:  

````sh 
yarn
```` 

4 - Test:

```sh 
yarn test
```  

You can either use Vite or Netlify to run the app in local.

### Vite

Start Server:

```sh 
yarn dev
```  
App URL:

[http://localhost:5173/](http://localhost:5173/)

### Netlify

#### You will need `netlify-cli` installed globally on your machine.

1 - Import env :
    
```sh
netlify env:import .env
```
2 - Start Server:

```sh 
yarn start
```  
App URL:

[http://localhost:8888/](http://localhost:8888/)



