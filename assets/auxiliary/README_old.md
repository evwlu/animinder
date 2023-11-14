# Animinder
# Group members
Evan Lu
<br>
Junxiang Zhang
<br>
Angel Arrazola
<br>
Sherry Zhang

# About

Animider is a social web app that allows users to create a personal watchlist and view the watchlists of their friends. In addition to the watchlist, Animinder uses a weighted average amongst the shows in your friends lists.
# Project

## Frontend

### Home
This is where you willl find your User Id, Watchlist and Recommendations.

### Search
The search page was mostly made posible due to the Jikan API that allowed for us to search based on a key word that we provided. Using the data we dynamically generated React elements that contained the image of the show, the title, and a button to add that particular show to the watchlist.

### Friends
Using firebase we were able to create unique user profiles upon google authentication. Since each user has a unique ID we implemented a system that allows you to add/remove friends and view their watchlist. 

### Gallery
This is a page that uses features of both the search page and the friends page that allows you to view someone's watchlist by searching for their user ID.

### Recommendation
The reccommendations are shown on the home page, but they are found using a weighted average based on the watchlist of your friends. This could be more personalized in the future.

## How to use
Once you have the project locally you can run "npm start" in the terminal and that will create the local host that allows for the pages to be rendered. Firebase is hosted online so we don't need to worry about starting that locally.

Since the project relies on storing unique user data, if you haven't logged in previously, upon starting the local host you will be dirercted to a page where you login using a google account.

### Search
To use search you type in the anime you want to search for in the search box then hit the search button. If there are any results for that search term, they will appear on the screen. For the valid results, there will be an add to watch list button that will add the show to your watchlist.

### Friends

To use the friends feature you must have your friend's user ID. On the friends page you can send them a friend request. That friend request will be displayed on the home page. 

To remove a friend there is a button below the friends profile picture.

## Firebase
Google login and other database utilities are mangaged using firebase.