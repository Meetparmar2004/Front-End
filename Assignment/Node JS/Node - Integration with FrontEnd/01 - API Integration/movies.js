// Task 2: use axios to get shows and print the first 5 names
// Task 5: if this fails, show a simple message instead of a raw error
// To test the error, change API_URL to something wrong like https://api.tvmaze.com/wrong-url

var API_URL = 'https://api.tvmaze.com/shows';

var movieList = document.getElementById('movieList');
var errorBox = document.getElementById('errorBox');

function showError(text) {
  errorBox.textContent = text;
}

if (typeof axios === 'undefined') {
  showError('Could not load movies. Please check your internet connection and try again.');
} else {
  axios
    .get(API_URL)
    .then(function (response) {
      var shows = response.data;
      var firstFive = shows.slice(0, 5);

      console.log('First 5 shows:');

      for (var i = 0; i < firstFive.length; i++) {
        console.log(firstFive[i].name);

        var item = document.createElement('li');
        item.textContent = firstFive[i].name;
        movieList.appendChild(item);
      }
    })
    .catch(function (error) {
      // keep the real error in the console for me, but show a normal message on the page
      console.log(error);
      showError('Could not load movies. Please check your internet connection or the API link and try again.');
    });
}
