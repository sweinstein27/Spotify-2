function getHashParams() {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
  q = window.location.href.substring(40);
  hashParams = q.split("&")[0]
  debugger
  return hashParams;
}

export function addToken() {
    const params = getHashParams();
    var token = params;
    debugger
     return function action(dispatch) {
       dispatch({ type: "ADD_TOKEN", payload: token})
       return {token}
     }
  };

 