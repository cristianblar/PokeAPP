<p align="left">
  <img height="150" src="./pokemon.png" />
</p>

# **Full Stack Project - PokéAPP** (monorepo)

**PokéAPP Community Edition**, open to all Pokémon Lovers!

Look for your favorite Pokémons, catch them and create new ones; share your love with all the PokéFans around the world.

## **Frontend**

[**Access the Frontend (deployed with Vercel) here!**](https://pokeapp-cristianblar.vercel.app/)

### **Tech stack**

- JavaScript
- React
- React router
- Redux
- SASS Modules for component styles
- PropTypes
- SweetAlert 2.0

**Framework:** Create-React-App.

### **Scripts**

- `npm install` for dependencies
- `npm start` for development environment
- `npm test` for JEST unit testing
- `npm run build` to create production build

### **Features**

- Landing page to access the app
- Main pokémons' screen with the 40 most representative pokémons (their names, picture and types)
  - **Search bar** to search a pokémon by name or ID
  - **Filter options:** to filter the pokémon list by pokémon type, community created pokémon or genuine pokémon
  - **Sort options:** to sort the pokémon list by ID, Name (A-Z or Z-A), Attack or Experience (low-high or high-low)
  - **Pagination:** to show maximum 12 pokémons per page
- Pokémon detail screen with all the details for each pokémon (ID, picture, stats, type(s) and physical information) and the possibility to catch/uncatch pokémon
- Form fully opened to the community for creating new pokémon!
- 100% responsive design

## **Backend**

[**Access the Backend (deployed with Heroku) here!**](https://pokemon-app-back.herokuapp.com/) (using one of the endpoints described below)

### **Tech stack**

- JavaScript
- NodeJS
- Express

### **Scripts**

- `npm install` for dependencies
- `npm start` for development environment with nodemon
- `npm test` for MOCHA & CHAI unit testing

### **Features**

- API implemented with **REST** architecture
- API tested and documented with Postman
- Routes layer and Services layer implemented (only the services are able to interact with the DB controllers)

### **Endpoints**

[**Access to the API documentation (made with Postman) here!**](https://documenter.getpostman.com/view/13809185/TzJvdwbN)

- Type:
  - `/types` GET all the pokémon types
  - `/types/:typeName` GET all the pokémon per type
- Pokémon:
  - `/pokemons` GET the most representative pokémon, POST a new pokémon or DELETE created pokémon (one or all)
  - `/pokemons?name=xxxx` GET the pokémon detail by name
  - `/pokemons/:id` GET the pokémon detail by ID
- Caught Pokémon:
  - `/caught` GET all the caught pokémon, POST a new caught pokémon, PATCH to liberate (or re-catch) a created pokémon or DELETE to liberate a genuine pokémon

## **Database**

### **Tech stack**

- PostgreSQL
- Sequelize

### **Features**

- 2 Models implemented -> Pokémon & Type
- Relation between the models -> N:M
- Controllers layer implemented (only the controllers are able to interact directly with the PostgreSQL DB & Sequelize)
- Database hosted online with Heroku Data

## **Testing**

### **Tech stack**

- JEST + Enzyme
- Mocha + Chai
- Supertest

## **License**
MIT.

*The app uses the free and public [**PokéAPI**](https://pokeapi.co/) to fetch genuine pokémon information.*
