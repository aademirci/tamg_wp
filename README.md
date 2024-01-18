# About *Türkiye'de Ağır Müziğin Geçmişi*

Türkiye'de Ağır Müziğin Geçmişi (History of Heavy Music in Turkey) is my music archive project that is in the form of a book and a website, having Twitter, Instagram, YouTube and podcast activity as well. It documents the history of heavy metal music in Turkey from 1981 with photos, videos, newspaper/magazine articles, concert posters/tickets.

## About the website

[https://turkiyedeagirmuzigingecmisi.com](https://turkiyedeagirmuzigingecmisi.com) is a Turkish website based on WordPress. Each post is an event with a certain date from the history. These events are laid out horizontally so that they form a horizontal timeline. So, the main navigation is based on swiping or dragging the screen to the left or right. Taxonomies are the type of the event, the location and the city, the bands and the people. Each event has a description and a gallery of relevant visual material. Visual materials can have title and description as well.

## About this repository

turkiyedeagirmuzigingecmisi_wp is a project that helps me apply what I have learned in React. It actually mimics the user interface of the original website as a React-based alternative. I used Axios to access the REST API of the WordPress website at [https://turkiyedeagirmuzigingecmisi.com/olay](https://turkiyedeagirmuzigingecmisi.com/olay) and used Redux Toolkit to manage the states. I wrote the code in TypeScript. There is also routing. If you click on the title of an event, you go to the event's page listing the comments for that event and the URL includes the original slug in the WordPress version of the website. In the original website, I could not implement navigating an event's visual materials with a "next" or "previous" button. But I managed to do that in React, in addition to the ability to use left-right keys. 

If you ever download and run the project, open [http://localhost:5173/olay](http://localhost:5173/olay) to skip the intro page (which is currently empty) and view the project in the browser.

## English version?

As the project is completely in Turkish, it might not be useful for you to try. I can implement a Turkish/English switchable user interface in the future, however, the data source will still be in Turkish. I sometimes check the potential of the internationalisation of the project by creating subtitles in the [YouTube channel](https://youtu.be/BEg-LPCyzCM), or writing separate articles on [Medium](https://medium.com/@aademirci/history-of-heavy-music-in-turkey-live-at-moda-theatre-215a0ddb401b). But the numbers say it is not the time for a complete translation to English yet.
