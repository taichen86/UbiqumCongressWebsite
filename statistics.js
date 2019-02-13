const allMembers = data.results[0].members;

var RMembers = [];
var DMembers = [];
var IMembers = [];
var allMembersOrdered = [];



var statisticsObj = {
    Democrats : {
        numOfMembers: 0,
        avgPartyVotes: 0,
        members: []
    },
    Republicans: {
        numOfMembers: 0,
        avgPartyVotes: 0,
        members: []
    },
    Independents: {
        numOfMembers: 0,
        avgPartyVotes: 0,
        members: []
    }

};

function getNumOfMembersInEachParty( )
{ //TODO: better?
    allMembers.forEach( member => {
    //    console.log( 'put member in party ... ' + member.party)
        if( member.party == 'R' ){ RMembers.push( member ); }
        else if( member.party == 'D' ){ DMembers.push( member ); }
        else{ IMembers.push( member ); }

       /*
        if( member.party == 'R' ){ statisticsObj.Republicans.members.push( member ); }
        else if( member.party == 'D' ){ statisticsObj.Democrats.members.push( member ); }
        else{ statisticsObj.Independents.members.push( member ); }
        */
    } );

    statisticsObj.Republicans.numOfMembers = statisticsObj.Republicans.members.length;
    statisticsObj.Democrats.numOfMembers = statisticsObj.Democrats.members.length;
    statisticsObj.Independents.numOfMembers = statisticsObj.Independents.members.length;

    allMembersOrdered = allMembers.slice( 0, allMembers.length );
    allMembersOrdered.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );
}

/*
function orderMembers( ) // not needed?
{

    DMembers.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );
    DMembers.forEach( member => console.log( member.first_name + ' ' + member.last_name + ' -> ' + member.votes_with_party_pct) );
    console.log( '==== dem members length: ' + DMembers.length );

    RMembers.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );
    RMembers.forEach( member => console.log( member.first_name + ' ' + member.last_name + ' -> ' + member.votes_with_party_pct) );
    console.log( '==== rep members length: ' + RMembers.length );

    IMembers.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );
    IMembers.forEach( member => console.log( member.first_name + ' ' + member.last_name + ' -> ' + member.votes_with_party_pct) );
    console.log( '==== ind members length: ' + IMembers.length );
    

    allMembersOrdered = allMembers.slice( 0, allMembers.length );
    allMembersOrdered.sort( (a,b) => a.votes_with_party_pct - b.votes_with_party_pct );
    allMembersOrdered.forEach( member => console.log( member.first_name + ' ' + member.last_name + ' -> ' + member.votes_with_party_pct) );
    console.log( '==== all members length: ' + allMembersOrdered.length );

}
*/

function getAveragePartyVotes( ) // TODO: array of parties, array of averages
{

    let total = DMembers.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
    statisticsObj.Democrats.avgPartyVotes = ( total / DMembers.length ).toFixed( 2 );

    total = RMembers.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
    statisticsObj.Republicans.avgPartyVotes = ( total / RMembers.length ).toFixed( 2 );

    total = IMembers.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
    statisticsObj.Independents.avgPartyVotes = ( total / IMembers.length ).toFixed( 2 );

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
    summaryTable.rows[1].cells[1].append( document.createTextNode( RMembers.length ) );
    summaryTable.rows[2].cells[1].append( document.createTextNode( DMembers.length ) );
    summaryTable.rows[3].cells[1].append( document.createTextNode( IMembers.length ) );

    summaryTable.rows[1].cells[2].append( document.createTextNode( statisticsObj.Republicans.avgPartyVotes ) );
    summaryTable.rows[2].cells[2].append( document.createTextNode( statisticsObj.Democrats.avgPartyVotes ) );
    summaryTable.rows[3].cells[2].append( document.createTextNode( statisticsObj.Independents.avgPartyVotes ) );

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
// console.log( JSON.stringify(statisticsObj) );
populateTables();






