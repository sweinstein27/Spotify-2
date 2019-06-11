const API_URL = process.env.REACT_APP_API_URL;


  function fetchSearches() {
        return fetch(`${API_URL}/searches`)
            .then(response => response.json())
            .then(response => console.log(response))
   }


export default fetchSearches