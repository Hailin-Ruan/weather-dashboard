const APIKey = "bf18cdbcb62244f196c3b93693db628b";
const queryUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
let city;

fetch(queryUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log('Fetch Response \n-------------');
    console.log(data);
  });