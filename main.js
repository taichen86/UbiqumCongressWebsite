
var membersTable = document.getElementById( 'members-table' );
var stateFilter = document.getElementsByName( 'statefilter' )[0];

var allMembers = data.results[0].members;
var partySelected = ['R', 'D', 'I'];
var allStates = [];
var stateSelected = []; // not needed?

function initialize()
{
    // initialize states array
    allMembers.forEach( member =>
        {
            if( allStates.indexOf( member.state ) < 0 )
                allStates.push( member.state );
        } );

    allStates.forEach( state =>
        {
           let option = document.createElement( 'option' );
           option.setAttribute( 'value', state ); 
           option.append( document.createTextNode( state ) );
           stateFilter.append( option );
        } );
    
    stateSelected = allStates;
    insertTableOfMembers();
}

function filterByParty()
{
    var nodes = document.querySelectorAll( ['input[name=partyfilter]:checked'] );
    partySelected = Array.from( nodes ).map( node => node.value );
//    console.log( 'parties selected: ' + partiesSelected );
    partySelected.forEach( party => console.log( party ) );
    membersTable.innerHTML = '';
    insertTableOfMembers( partySelected, stateSelected );
}

function filterByState()
{
    console.log( 'filter by state: ' + stateFilter.value );
    membersTable.innerHTML = '';
 //   stateSelected = stateFilter.value
    stateSelected = ( stateFilter.value == 'ALL' ) ? allStates : stateFilter.value;
    insertTableOfMembers( partySelected, stateSelected );
}


function insertTableOfMembers( parties = partySelected, states = allStates ) // TODO: refactor!!!
{
    console.log( '==== ' + partySelected + ' || ' + stateSelected );
    // filter party
//    console.log( partySelected );
    let members = allMembers.filter( member => partySelected.indexOf( member.party ) > -1 );

    // filter state
//    console.log( states );
    members = members.filter( member => states.indexOf( member.state ) > -1 );
//    console.log( 'number of members: ' + members.length );

    console.log( 'number of members: ' + members.length );


    let tr = document.createElement('tr');
    let th = document.createElement('th');
    tr.append(th);
    th.append(document.createTextNode('Name'));

    th = document.createElement('th');
    th.append(document.createTextNode('Party'));
    tr.append(th);
    
    th = document.createElement('th');
    th.append(document.createTextNode('State'));
    tr.append(th);
    
    th = document.createElement('th');
    th.append(document.createTextNode('Seniority'));
    tr.append(th);
    
    th = document.createElement('th');
    th.append(document.createTextNode('Percentage'));
    tr.append(th);

    var thead = document.createElement('thead');
    thead.append(tr);
    membersTable.append(thead);
    

    let tbody = document.createElement('tbody');
    members.forEach( member => {
    
 //       console.log( member );
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        let middlename = member.middle_name? (' ' + member.middle_name + ' ') : ' ';
        let name = member.first_name + middlename + member.last_name;
        //   console.log( name );
        let link = document.createElement('a');
        link.setAttribute('href', member.url );
        link.append(document.createTextNode( name ));
        td.append(link);
        tr.append(td);
        
        td = document.createElement('td');
        td.append(document.createTextNode(member.party));
        tr.append(td);
    
        td = document.createElement('td');
        td.append(document.createTextNode(member.state));
        tr.append(td);
    
        td = document.createElement('td');
        td.append(document.createTextNode(member.seniority));
        tr.append(td);
    
        td = document.createElement('td');
        td.append(document.createTextNode(member.votes_with_party_pct + '%'));
        tr.append(td);
        
        tbody.append(tr);
    
        
    });
    
    membersTable.append(tbody);
    
    
}
