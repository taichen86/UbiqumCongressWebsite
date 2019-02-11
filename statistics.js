const allMembers = data.results[0].members;

var RMembers = [];
var DMembers = [];
var IMembers = [];

var statisticsObj = {
    Democrats : {
        numOfMembers: 0,
        avgPartyVotes: 0
    },
    Republicans: {
        numOfMembers: 0,
        avgPartyVotes: 0
    },
    Independents: {
        numOfMembers: 0,
        avgPartyVotes: 0
    }

};

function getNumOfMembersInEachParty( )
{
    allMembers.forEach( member => {
        if( member.party == 'R' ){ RMembers.push( member ); }
        else if( member.party = 'D' ){ DMembers.push( member ); }
        else{ IMembers.push( member ); }
    } );

    statisticsObj.Democrats.numOfMembers = DMembers.length;
    statisticsObj.Republicans.numOfMembers = RMembers.length;
    statisticsObj.Independents.numOfMembers = IMembers.length;
}


function orderMembers( )
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

}

function getAveragePartyVotes( )
{
    let total = DMembers.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
    statisticsObj.Democrats.avgPartyVotes = total / DMembers.length;

    total = RMembers.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
    statisticsObj.Republicans.avgPartyVotes = total / RMembers.length;

    total = IMembers.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
    statisticsObj.Independents.avgPartyVotes = total / IMembers.length;

}




getNumOfMembersInEachParty( );
getAveragePartyVotes( );
orderMembers( );
console.log( JSON.stringify(statisticsObj) );

