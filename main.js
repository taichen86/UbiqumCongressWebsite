
var membersTable = document.getElementById( 'members-table' );
var allMembers = data.results[0].members;
var partiesSelected = ['R', 'D', 'I'];


function initialize()
{
    insertTableOfMembers();
}

// filter by party
function filter()
{
    var nodes = document.querySelectorAll( ['input[name=partyfilter]:checked'] );
    partiesSelected = Array.from( nodes ).map( node => node.value );
//    console.log( 'parties selected: ' + partiesSelected );
    partiesSelected.forEach( party => console.log( party ) );
    membersTable.innerHTML = '';
    insertTableOfMembers( partiesSelected );
}


function insertTableOfMembers( parties = partiesSelected ) // TODO: refactor!!!
{
    /*
    console.log( data.results[0].members[0] );
    var numOfMembers = data.results[0].members.length;
    */
    console.log( partiesSelected );
    let members = allMembers.filter( member => partiesSelected.indexOf( member.party ) > -1 );
    console.log( 'number of members: ' + members.length );


    let th = document.createElement('th');
    let tr = document.createElement('tr');
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
    
        //   console.log( member );
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

function createTHead()
{

    let th = document.createElement('th');
    let tr = document.createElement('tr');
    let tx = document.createTextNode('Name');
    th.append(tx);
    tr.append(th);
    
    th = document.createElement('th');
    tx = document.createTextNode('Party');
    th.append(tx);
    tr.append(th);
    
    th = document.createElement('th');
    tx = document.createTextNode('State');
    th.append(tx);
    tr.append(th);
    
    th = document.createElement('th');
    tx = document.createTextNode('Seniority');
    th.append(tx);
    tr.append(th);
    
    th = document.createElement('th');
    tx = document.createTextNode('Percentage');
    th.append(tx);
    tr.append(th);
    
    var thead = document.createElement('thead');
    thead.append(tr);
    membersTable.append(thead);

}
