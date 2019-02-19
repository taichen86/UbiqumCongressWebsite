console.log( 'ajax script' );
function canStore()
{
    return ( typeof(Storage) !== "undefined" ) ? true : false
}

function fetchJson( url, init ) 
{
  return fetch( url, init ).then( function( response ) 
  {
    if( response.ok ){ return response.json(); }
    throw new Error( response.statusText );
  });
}

function getData( version = '113', house = 'senate' )
{
    console.log( 'house : ' + house );
    if( canStore ) // check if data already exists
    {
        if( sessionStorage.getItem( house ) != null )
        {
        //    console.log( 'got data already.' + JSON.parse( sessionStorage.getItem( house ) ) );
            allMembers = JSON.parse( sessionStorage.getItem( house ) );
            initialize();
            return;
        }
    }

    const url = `https://api.propublica.org/congress/v1/${version}/${house}/members.json`;
    console.log( '=== GET DATA ===>' + url );
    fetchJson( url , 
    {
        method: 'GET',
        headers: { 'X-API-Key' : 'iVsThyfuOgbdt7qIxYBZhbTsMbkta3psSKD9ugKX' }
    }).then( result => {
        allMembers = result.results[0].members;
        if( canStore )
        { 
            sessionStorage.setItem( house , JSON.stringify( allMembers ) );
        //    console.log( 'store --> ' + sessionStorage.getItem( house ) );
        }
        initialize();
    });
}


const house = document.getElementsByTagName( 'house' )[0].id;
getData( '113', house );
