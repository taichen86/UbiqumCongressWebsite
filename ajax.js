
function fetchJson( url, init ) 
{
  return fetch( url, init ).then( function( response ) 
  {
    if( response.ok ){ return response.json(); }
    throw new Error( response.statusText );
  });
}

function getData( )
{
    console.log( '===GET DATA===');
    fetchJson( 'https://api.propublica.org/congress/v1/113/senate/members.json', 
    {
        method: 'GET',
        headers: { 'X-API-Key' : 'iVsThyfuOgbdt7qIxYBZhbTsMbkta3psSKD9ugKX' }
    }).then( result => {
        allMembers = result.results[0].members;
        initialize();
    });
}

getData();
