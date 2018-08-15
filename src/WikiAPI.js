
function getMarkerInfo(m) {
  // Using fetch
  return fetch(m.url, {
      method: 'POST',
      headers: new Headers( {
          'Api-User-Agent': 'MonumentsApp/1.0'
      } )
      // Other init settings such as 'credentials'
  } ).then( function( response ) {
      if ( response.ok ) {
          return response.json()
      }
      throw new Error( 'Network response was not ok: ' + response.statusText );
  } )
  .then(function(data) {
      return {text: Object.values(data.query.pages)[0].extract}
  })
  .catch(function() {
    return {error: true};
  })
}

export default {getMarkerInfo}
