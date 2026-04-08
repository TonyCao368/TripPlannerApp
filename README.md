# TripPlannerApp

TripPlannerApp is a mobile trip planning application built with React Native, Expo Router, TypeScript, and Firebase. The app allows users to create an account, explore destinations, save places to trips, write reviews, manage their profile, and customize settings.

## Features

### Authentication
- User registration with:
  - Email
  - Password
  - Display Name
  - Current Location
- User login with email and password
- Persistent login so returning users can go directly into the app
- Logout functionality

### Navigation
- Bottom tab navigation with:
  - Home
  - Trips
  - Profile
  - Settings

### Home
- View a list of destinations
- Each destination includes:
  - Image
  - Title
  - Rating
  - Location
  - Tags
- Search destinations by name or location
- Filter destinations by tags
- Sort destinations by:
  - Name
  - Number of favorites
  - Rating
- Sort results in ascending or descending order

### Destination Details
- View full destination information:
  - Name
  - Description
  - Location
  - Photos
  - Number of likes
  - Average cost for one person
- View suggested things to do at the destination
- Read destination reviews
- Review summary includes:
  - Average star rating
  - Number of reviews by star level
- Users can write one review per destination
- Users can save a destination to an existing trip

### Trips
- Create a trip with:
  - Name
  - Number of people
  - Public or private setting
- View all trips
- Toggle trip privacy
- Delete trips
- View destinations inside a trip
- Remove destinations from a trip
- Prevent duplicate destinations in the same trip
- Calculate total trip cost when destinations are added

### Profile
- View user profile information
- Upload a profile image
- Edit display name
- Manage personal reviews
- Edit or delete personal reviews
- Delete account

### Settings
- Change preferred currency
- Default currency is USD
- Additional currency options supported
- Submit app feedback with:
  - Rating
  - Optional text comment
- Logout from the current session

## Tech Stack

- React Native
- Expo Router
- TypeScript
- Firebase Authentication
- Cloud Firestore
- Firebase Storage
- AsyncStorage

## Project Structure

```text
src/
  app/
    _layout.tsx
    index.tsx
    login.tsx
    register.tsx
    destination/
      [id].tsx
    trip/
      [id].tsx
    (tabs)/
      _layout.tsx
      index.tsx
      trips.tsx
      profile.tsx
      settings.tsx

  components/
  context/
  data/
  services/
  types/