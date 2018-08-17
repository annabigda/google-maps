# Maps Project

This projects shows a map with a custom lists of locations.

The locations are based on some popular monuments present in Warsaw, Poland.

https://en.wikipedia.org/wiki/Nicolaus_Copernicus_Monument,_Warsaw

https://en.wikipedia.org/wiki/Adam_Mickiewicz_Monument,_Warsaw

https://en.wikipedia.org/wiki/Monument_to_the_Ghetto_Heroes

https://en.wikipedia.org/wiki/Monument_to_the_Fallen_and_Murdered_in_the_East

https://en.wikipedia.org/wiki/Chopin_Statue,_Warsaw

All the data is fetched by the wikimedia API: https://www.mediawiki.org/wiki/API:Main_page

## Files

All the files are in `src`.

They have been separated in the React classes: `Sidebar.js`, `Header.js`, `App.js` and `WIKIApi.js`

## Starting

To start the project you need to run:

`npm install`

followed by

`npm start`

You can then open your browser at `http://localhost:3000`

If you make any changes the page will refresh

## Production

To run in production use:

```
npm run build
serve -s build
```

and then navigate to `http://localhost:5000/`

