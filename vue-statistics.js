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
          numOfReps: 'num of reps R',
          avgVoted: 'avg R'  },
        { partyName: 'Democrats',
          numOfReps: 'num of reps',
          avgVoted: 'avg D'  },
        { partyName: 'Independents',
          numOfReps: 'num of reps I',
          avgVoted: 'avg I'  }
      ]
    }

  });
  

  console.log( 'vue script END' );
