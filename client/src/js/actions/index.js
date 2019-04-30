function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  e = r.exec(q)
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

export function addToken() {
    const params = getHashParams();
    var token = params.access_token;
     return function action(dispatch) {
       dispatch({ type: "ADD_TOKEN", payload: token})
       return {token}
     }
  };

 