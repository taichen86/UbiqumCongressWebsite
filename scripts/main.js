
var membersTable = document.getElementById( 'members-table' );
var stateFilter = document.getElementsByName( 'statefilter' )[0];
let allMembers = []

var membersToShow = [];
var allStates = [];
var partiesSelected = ['R', 'D', 'I'];
var stateSelected = []; 

function initialize()
{
    console.log( 'initialize....' );
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
    membersToShow = allMembers;
    insertTableOfMembers();
}

function filterByParty()
{
    var nodes = document.querySelectorAll( ['input[name=partyfilter]:checked'] );
    partiesSelected = Array.from( nodes ).map( node => node.value );
    insertTableOfMembers( );
}

function filterByState()
{
    console.log( `filter by state: ${stateFilter.value}` );
    stateSelected = ( stateFilter.value == 'ALL' ) ? allStates : stateFilter.value;
    insertTableOfMembers( );
}


function insertTableOfMembers( )
{
    console.log( '==== ' + partiesSelected + ' || ' + stateSelected );

    membersToShow = allMembers.filter( member => partiesSelected.indexOf( member.party ) > -1 );
    membersToShow = membersToShow.filter( member => stateSelected.indexOf( member.state ) > -1 );
    console.log( 'number of members: ' + membersToShow.length );

    stats.congressMembers = membersToShow;

    /*

    membersToShow.forEach( member => console.log( member ) );
    membersTable.innerHTML = '';

    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.append(document.createTextNode('Name'));
    tr.append(th);
   
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
    membersToShow.forEach( member => {
    
        console.log( member );
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
    */
    
    
    
}
