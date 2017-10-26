# MEAN-stack Google Map

Application utilizing the MEAN stack (MongoDB, Express, Angular, NodeJS).

Users may submit their location on the google map (or auto-locate) and provide their details. This is information is stored, allowing others to search user locations based on a set of criteria.

This is a conversion of the ScotchIO project from AngularJS(v1) to Angular(v2+). The original project can be found [here](https://scotch.io/tutorials/making-mean-apps-with-google-maps-part-i)


## Tools

* [MongoDB](https://www.mongodb.com/)
* [Express](https://expressjs.com/)
* [Angular(2+)](https://angular.io/) & [Angular-CLI](https://cli.angular.io/)
* [NodeJS](https://nodejs.org/en/)
* [Typescript](https://www.typescriptlang.org/)

## Getting Started

**Install Homebrew** 
I recommend using this package manager. It simplifies the process of installing/uninstalling packages. Learn more here [Homebrew](https://brew.sh/)
```
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```


**Install NodeJS**
```
brew install node
```


**Install MongoDB**
```
brew install mongodb
mkdir -p /data/db   // this is where MongoDB data files are stored
sudo chown -R `id -un` /data/db
```


**Run MongoDB before running the application**
```
mongod
```

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. 

This will run the Angular server (client-side) and Express server (server-side) of the application. Any changes made to the files will reload their respective servers.


## Background Info

The Angular server is located at `http://localhost:4200` and the Express server at `http://localhost:3000`. There's no need to navigate to the Express server. Calls made to port 4200 intended for the server-side are redirected to port 3000.


### Join Team Screenshot

![Join Team](https://raw.githubusercontent.com/michaelmills/mean-google-map/master/src/assets/join-team.png)

### Find Team Members Screenshot

![Find Team Members](https://raw.githubusercontent.com/michaelmills/mean-google-map/master/src/assets/find-team.png)
