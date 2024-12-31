# Undefined Films App

## Introduction

**Undefined Films** is a movie and series search application offering access to over 280,000 titles. Users can search for their favorite movies or series and manage them in a personalized favorites panel.

👉 **[Live Demo](https://undefined-zeta.vercel.app/home)**  
*Note: The initial load may take some time as the server is in sleep mode. 😴*

---

## Functional Description

### Use Cases

#### Anonymous Users:
- Register for an account.
- Log in to the application.
- Search for movies and series.
- View detailed information about movies or series.

#### Logged-In Users:
- Perform all actions available to anonymous users.
- Add movies or series to their favorites panel for easy access.

---

### User Flow

#### Listing Videos:
1. The experience starts with the search functionality, allowing users to explore movies or series.
2. From the search results, users can view detailed information about a selected title.
3. Logged-in users can add titles to their favorites panel.
4. If an unauthenticated user attempts to add a title to favorites, they will be redirected to the signup page.

![List Videos Flow](./doc/images/flow.png)

---

### API Service

This application uses the **amazing OMDB API** ([omdbapi.com](https://www.omdbapi.com/)) to fetch movie and series data. It’s an incredible free service with a generous **1,000 daily request limit**, making it perfect for small and medium-sized projects. A huge thanks to OMDB for providing this fantastic resource!

---

## Technical Description

### Application Architecture

#### Core Blocks:
The application is divided into key blocks, providing modularity and scalability for better development and maintenance.

![Blocks](./doc/images/blocks.png)

#### Component Hierarchy:
A clear and well-defined hierarchy of React components powers the application's front end.

![Components](./doc/images/components.png)

#### Data Model:
The data model represents the relationships and structure of the application's entities, ensuring seamless data management.

![Data Model](./doc/images/data_model.png)

---

### Technologies Used

The app is built using modern web development technologies:

<div style="display: flex; flex-wrap: wrap; flex-direction:row; align-items: center">
  <img src="./doc/images/logos/react.png" alt="React" width="130px" />
  <img src="./doc/images/logos/es6.png" alt="ES6 JavaScript" width="130px" />
  <img src="./doc/images/logos/html5.png" alt="HTML5" width="130px" />
  <img src="./doc/images/logos/sass.png" alt="SASS" width="130px" />
  <img src="./doc/images/logos/bulma.png" alt="Bulma CSS" width="130px" />
  <img src="./doc/images/logos/font-awesome.png" alt="Font Awesome" width="130px" />
  <img src="./doc/images/logos/npm.png" alt="npm" width="130px" />
  <img src="./doc/images/logos/jest.png" alt="Jest Testing" width="130px" />
</div>

---

### Code Coverage

The project includes comprehensive unit testing with Jest, ensuring reliability and robustness.

![Code Coverage](./doc/images/coverage.png)

---

## Visual Overview

### Login Page
![Login Page](./doc/images/login_page.png)

### Register Page
![Register Page](./doc/images/register_page.png)

### Search Results Page
![Results Page](./doc/images/the_office_search.png)

### Favorites Page
![Favorites Page](./doc/images/favorites_page.png)

### Adding to Favorites
![Add to Favorites Page](./doc/images/add_to_favorite.png)
