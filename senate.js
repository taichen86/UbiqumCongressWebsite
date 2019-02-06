//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);

console.log( data.results[0].members[0] );
var numOfMembers = data.results[0].members.length;
console.log( 'number of members: ' + numOfMembers );

var members = data.results[0].members;

/*
var table = document.createElement('table');
document.getElementById('senate-data').append(table);
*/

var table = document.getElementById('senate-data-table');

let tr = document.createElement('tr');
let th = document.createElement('th');
let tx = document.createTextNode('Senator');
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

table.append(tr);

members.forEach( member => {

    console.log( member );
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    let middlename = member.middle_name? (' ' + member.middle_name + ' ') : ' ';
    let name = member.first_name + middlename + member.last_name;
    console.log( name );
    let link = document.createElement('a');
    link.setAttribute('href', member.url );
    let nameText = document.createTextNode( name );
    link.append(nameText);
    td.append(link);
    tr.append(td);
    
    td = document.createElement('td');
    tx = document.createTextNode(member.party);
    td.append(tx);
    tr.append(td);

    td = document.createElement('td');
    tx = document.createTextNode(member.state);
    td.append(tx);
    tr.append(td);

    td = document.createElement('td');
    tx = document.createTextNode(member.seniority);
    td.append(tx);
    tr.append(td);

    td = document.createElement('td');
    tx = document.createTextNode(member.votes_with_party_pct + '%');
    td.append(tx);
    tr.append(td);
    
    table.append(tr);

    
});

