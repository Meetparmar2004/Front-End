# 01 - API Integration

This folder is my work for the API integration tasks.

## How to run

Open two terminals in this folder.

Terminal 1:

```
node frontend-server.js
```

Terminal 2 (needed for the login / CORS task):

```
node server.js
```

Then open http://localhost:3000

## What each file does

- `playlist.html` — Task 1 and Task 4. Form uses `fetch()` to POST JSON, then shows success or error using `response.ok`.
- `movies.html` and `movies.js` — Task 2 and Task 5. Axios (CDN) loads shows from TVMaze and prints the first 5 names in the console. If the request fails, the page shows an error message.
- `login.html` — Task 3. Login form POSTs to `http://localhost:5000/login`.
- `server.js` — login API on port 5000. It does not allow CORS.
- `task3-cors-error.txt` — the CORS error from the browser console.
- `.gitignore` — ignores `node_modules` and local files.

For Task 2 I used the axios CDN instead of npm, because the hint says CDN or npm is fine.
