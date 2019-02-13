const allMembers = data.results[0].members;
var allMembersOrdered = [];

var statisticsObj = [
    { 
        party: 'R',
        numOfMembers: 0,
        avgPartyVotes: 0,
        members: []
    },
    { 
        party: 'D',
        numOfMembers: 0,
        avgPartyVotes: 0,
        members: []
    },
    {
        party: 'I',
        numOfMembers: 0,
        avgPartyVotes: 0,
        members: []
    }
];

let partyLetters = [ 'R', 'D', 'I'];
function getNumOfMembersInEachParty( )
{ 
    allMembers.forEach( member => {
    //    console.log( 'put member in party ... ' + member.party)
    statisticsObj[ partyLetters.indexOf( member.party ) ].members.push( member );
        
    } );

    allMembersOrdered = allMembers.slice( 0, allMembers.length );
    allMembersOrdered.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );
}


function getAveragePartyVotes( ) // TODO: array of parties, array of averages
{
    for( var i=0; i<3; i++ )
    {
        console.log( '-----------------------');
        statisticsObj[i].numOfMembers = statisticsObj[i].members.length;
        let total = statisticsObj[i].members.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
        statisticsObj[i].avgPartyVotes = ( total / statisticsObj[i].numOfMembers ).toFixed( 2 );
    }

}

function getHighestLowest( members )
{
    console.log( 'get highest lowest: ' + members.length );
    let result = [];
    let limit = Math.round( members.length/10 );
    console.log( 'num of elements to get : ' + limit );
    result.push( members[0] ); // TODO: make this better!
    for( var i=1; i<members.length; i++ )
    {
     //   console.log( i + 'doing ... ' + members[i].votes_with_party_pct );
        if( members[i].votes_with_party_pct == members[i-1].votes_with_party_pct ) // same as previous
        {
            console.log( 'DUPLICATE: ' + members[i].votes_with_party_pct )
            result.push( members[i] );
            continue;
        }

        if( i >= limit ) break; // reached 10%
        result.push( members[i] );

    }

    console.log( 'results///' + result.length );
    result.forEach( r => console.log( r ) );
    return result;
}

function populateTables( )
{
    const summaryTable = document.getElementById( "summaryTable" );
    for( var i=0; i<3; i++ )
    {
        summaryTable.rows[i+1].cells[1].append( document.createTextNode( statisticsObj[i].members.length ) );
        summaryTable.rows[i+1].cells[2].append( document.createTextNode( statisticsObj[i].avgPartyVotes ) );
    }

    createTable( 'leastLoyal', getHighestLowest( allMembersOrdered ) );
    createTable( 'mostLoyal', getHighestLowest( allMembersOrdered.reverse() ) );
}

function createTable( tableID, members )
{
    const table = document.getElementById( tableID );
    console.log( 'table ' + table );
    tbody = table.getElementsByTagName( "tbody" )[0];
    
    members.forEach( member => {

        let tr = document.createElement( 'tr' );
        let td = document.createElement( 'td' );
        td.append( document.createTextNode( member.first_name + ' ' + member.last_name ) );
        tr.append( td );
        td = document.createElement( 'td' );
        td.append( document.createTextNode( member.total_votes ) );
        tr.append( td );

        td = document.createElement( 'td' );
        td.append( document.createTextNode( member.votes_with_party_pct ) );
        tr.append( td );
        
        tbody.append( tr );
    } );
}

getNumOfMembersInEachParty( );
getAveragePartyVotes( );
console.log( JSON.stringify(statisticsObj) );

populateTables();







