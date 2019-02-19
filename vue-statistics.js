console.log( 'vue script' );

var stats = new Vue({
    el: '#vue-tables',
    data: {
      membersHighest: [],
      membersLowest: []
    }
  });

  var vueSummary = new Vue({
    el: '#summary-tables',
    data: {
      parties: [
        { partyName: 'Republicans',
          numOfReps: 0,
          avgVoted: 0 },
        { partyName: 'Democrats',
          numOfReps: 0,
          avgVoted: 0 },
        { partyName: 'Independents',
          numOfReps: 0,
          avgVoted: 0 }
      ]
    }

  });
  

  console.log( 'vue script END' );
