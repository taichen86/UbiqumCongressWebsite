const allMembers = data.results[0].members;
let allMembersByLoyalty = [];
let allMembersByAttendance = [];

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

const partyLetters = [ 'R', 'D', 'I'];
function getNumOfMembersInEachParty( )
{ 
    allMembers.forEach( member => {
    //    console.log( 'put member in party ... ' + member.party)
        statisticsObj[ partyLetters.indexOf( member.party ) ].members.push( member );
    } );

    membersByAttendance = allMembers.slice( 0, allMembers.length );
    membersByAttendance.sort( (a,b) => a.missed_votes_pct - b.missed_votes_pct );

    membersByLoyalty = allMembers.slice( 0, allMembers.length );
    membersByLoyalty.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );

}


function getAveragePartyVotes( )
{
    for( var i=0; i<3; i++ )
    {
        console.log( '-----------------------');
        statisticsObj[i].numOfMembers = statisticsObj[i].members.length;
        let total = statisticsObj[i].members.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
        statisticsObj[i].avgPartyVotes = ( total / statisticsObj[i].numOfMembers ).toFixed( 2 );
    }

}

function getHighestLowest( members, key )
{
    let result = [];
    let limit = Math.round( members.length/10 );

    result.push( members[0] ); // TODO: make this better!
    for( var i=1; i<members.length; i++ )
    {
    //    if( members[i].votes_with_party_pct == members[i-1].votes_with_party_pct )
        if( members[i][key] == members[i-1][key] )
        {
        //    console.log( 'DUPLICATE: ' + members[i].votes_with_party_pct )
            result.push( members[i] );
            continue;
        }
        if( i >= limit ) break; // reached 10%
        result.push( members[i] );
    }
    return result;
}

function createHiLowTable( tableID, members, key )
{
    
    const table = document.getElementById( tableID );
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
    //    td.append( document.createTextNode( member.votes_with_party_pct ) );
        td.append( document.createTextNode( member[key] ) );
        tr.append( td );
        tbody.append( tr );
    } );
}

function populateCommonTable( )
{
    const table = document.getElementById( "summaryTable" );
    for( var i=0; i<3; i++ )
    {
        table.rows[i+1].cells[1].append( document.createTextNode( statisticsObj[i].members.length ) );
        table.rows[i+1].cells[2].append( document.createTextNode( statisticsObj[i].avgPartyVotes ) );
    }

}


getNumOfMembersInEachParty( );
getAveragePartyVotes( );
populateCommonTable();








