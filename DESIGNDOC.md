# *MOODY* Project Outline

-----------------

## Frontend

### Homepage

The homepage will provide basic information about the application and will provide users with a button to login.

### UserLogin

The User login screen will leverage google federated sign-in to provide a sign-in option for users. After a user las logged in and the app has obtained an *id_token* the user login screen will cache the token in local storage and redirect to the homepage.

The actual webapp has two main views once logged in- input and analysis

### Input

The input view will present the user with a series of scales on which they can rate the following qualities:

- Overall Mood
- Energy
- Sleep Hours
- Sleep Quality
- Motivation
- Medication and Dose

The individual input units are called **InputCards** (which wrap **InputComponents**). **InputComponents** can be one of 3 types: *String*, *Number*, or *Rating*

Once a user populates a given input, the input will vanish and the next will appear. This is done to encourage the user to share gut feelings and to not linger on any feeling so that they could manipulate the results.

The inputs will be stored in a database as a json object that is keyed by the date it was stored at (on a per-user basis obviously). The user will only be allowed to input once per day, (ideally towards the end of the day). - thus a day will be from 7am - 7am (so the user can fill it out at 1am and it won't count for a new day)

### Analysis

I'm not sure the best way to display analysis. There will be a dynamic system where there are multiple analyisis widgets that can be mixed and matched by the user.

### *Additional Notes*

- Although I hate it, I have to implement MobX to store the profile information on the client side bc its going to be used in multiple places at once
  - MobX store contain the profile info, and isAuthenticated boolean
- There is additional support for user-defined inputs planned for the future (this was one factor in the choice to use a nosql database schema like MongoDb

-----------------

## Backend

### Overview

When the user first opens the app, they will be prompted to login via google. Google auth token subject fields will be used as ids in a *MongoDb* database which will store the information for mood tracking.

### The Weeds

The meat of the client has 3 routes: ***/login***, ***/input***, and ***/tracker*** (excluding the ***/*** hompage route)

**/login** is handled by a Google federated sign in service. Once a user signs in the client recieves a google *id_token* which it sends to the backend server in a create requests. The backend node server then verifies the *id_token*. Once the token is verified the backend uses the token to obtain information ab the google user such as email, name, avatar, etc. If the user already exists in the MongoDb database, then the backend the labels the client's session as authenticated and it will listen to any requests they send(e.g. get/ post requests via axios). If the user doesn't yet exist, the backend creates the user in the database before establishing a connection.

The 'sub'(subject) field of the *id_token* will be used as a primary key(*_id*) for users on the database behind the backend.

The *id_token* will be stored in local storage to prevent having to login in every time. If their already exists an *id_token* that isn't expired, then the client will send this for authentication with the backend.

This socket will be used to transpher any sensative data (such as mood information) between the backend and the client.

Upon the successful creation of a secure connection with the backend server, the user will be routed to either the ***/input*** or ***/tracker*** components where they can interact with the webapp.
