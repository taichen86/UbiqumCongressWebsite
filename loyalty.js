//const allMembers = data.results[0].members;



function getLoyaltyHighest( party )
{
    let highest = [];
    const firstPos = party.length - Math.round( party.length/10 ); // TODO: make sure not negative
    console.log( 'firstPos ' + firstPos );
    for( var i=party.length-1; i>firstPos-1; i-- )
    { 
        highest.push( party[i] ); 
    }

    // check duplicates, correct???
    let first = party[firstPos].votes_with_party_pct;
    var j = firstPos-1;
    while( party[j].votes_with_party_pct == first && j >= 0 )
    {
        console( 'FOUND duplicate ' + party[j].votes_with_party_pct );
        highest.push( party[j] );
        j--;
    }
    highest.forEach( member => console.log( member.first_name + ' ' + member.last_name + ' -> ' + member.votes_with_party_pct) );
    return highest;
}

