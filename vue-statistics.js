
new Vue({

    el: '#vue-statistics',
    data: 
    {
        house: 'senate',
      partyLetters: [ 'R', 'D', 'I' ],
      parties: [
        { partyName: 'Republicans',
          members: [],
          numOfReps: 0,
          avgVoted: 0 },
        { partyName: 'Democrats',
          members: [],
          numOfReps: 0,
          avgVoted: 0 },
        { partyName: 'Independents',
          members: [],
          numOfReps: 0,
          avgVoted: 0 }
      ],
      allMembers: [],
      membersHighest: [],
      membersLowest: []
    },

    created: function()
    {
        this.house = this.getHouseName();
        this.getData( );
    },

    mounted: function()
    {
        this.hideSpinners();
    },

    methods: 
    {

        getHouseName: function ()
        { 
            return ( document.getElementById( 'house' ) == null ) ? 'senate' : 'house'
        },

      canStore: function ()
      {
          return ( typeof(Storage) !== "undefined" ) ? true : false
      },

      fetchJSON: function ( url, init ) 
      {
        return fetch( url, init ).then( function( response ) 
        {
          if( response.ok ){ return response.json(); }
          throw new Error( response.statusText );
        });
      },

      getData: function ( )
      {
          if( this.canStore ) // check if data already exists
          {
              if( sessionStorage.getItem( this.house ) != null )
              {
              //    console.log( 'got data already.' + JSON.parse( sessionStorage.getItem( house ) ) );
                  this.allMembers = JSON.parse( sessionStorage.getItem( this.house ) );
                  this.initialize();
                  return;
              }
          }
      
          const url = `https://api.propublica.org/congress/v1/113/${this.house}/members.json`;
          console.log( '=== GET DATA ===>' + url );
          this.fetchJSON( url , 
          {
              method: 'GET',
              headers: { 'X-API-Key' : 'iVsThyfuOgbdt7qIxYBZhbTsMbkta3psSKD9ugKX' }
          }).then( result => {
              this.allMembers = result.results[0].members;
              if( this.canStore )
              { 
                  sessionStorage.setItem( this.house , JSON.stringify( this.allMembers ) );
              //    console.log( 'store --> ' + sessionStorage.getItem( house ) );
              }
              this.initialize();
          });
      },

      initialize: function ()
      {
          console.log( 'initialize-----------' );
          this.getNumOfMembersInEachParty();
          this.getAveragePartyVotes();
          this.getHiLowMemberArrays();
      },

      getNumOfMembersInEachParty: function ( )
      {     
          this.allMembers.forEach( member => {
          //   console.log( member );
              this.parties[ this.partyLetters.indexOf( member.party ) ].members.push( member );
          } );
      },

      getAveragePartyVotes: function ( )
      {
          for( var i=0; i<3; i++ )
          {
              this.parties[i].numOfReps = this.parties[i].members.length;
              let total = this.parties[i].members.reduce( (accum, value) => accum + value.votes_with_party_pct, 0 );
              this.parties[i].avgVoted = ( total / this.parties[i].numOfReps ).toFixed( 2 );
          }
      },

      getHiLowMemberArrays: function ( )
      {
          let key = document.getElementsByTagName( 'body' )[0].id;
          this.allMembers.sort( (a,b) => a[key] - b[key] );
          this.membersLowest = this.getHighestLowest( this.allMembers, key );
          this.membersHighest = this.getHighestLowest( this.allMembers.reverse(), key );
      },

      getHighestLowest: function ( members, key )
      {
          let result = [];
          let limit = Math.round( members.length/10 );
      
          result.push( members[0] );
          for( var i=1; i<members.length; i++ )
          {
              if( members[i][key] == members[i-1][key] )
              {
                  result.push( members[i] );
                  continue;
              }
              if( i >= limit ) break; // reached 10%
              result.push( members[i] );
          }
          return result;
      },

      hideSpinners: function()
        {
            Array.from( document.getElementsByClassName( 'spinner' ) ).forEach( spinner => spinner.style.display = 'none' );
        }

    }
  });

  

