new Vue({

    el: '#vue-congress',

    data: {

      house: 'senate',
      allStates: [],
      stateSelected: [],
      partiesSelected: ['R', 'D', 'I'],
      allMembers: [],
      membersToShow: [],

    },

    created: function( )
    {
        this.house = this.getHouseName();
        this.getData( );
    },

    mounted: function()
    {
        this.hideSpinners();
    },

    methods: {

      getHouseName: function()
      {
          return ( document.getElementById( 'house' ) == null ) ? 'senate' : 'house';
      },

      getStateFilterValue: function()
      {
            return ( document.getElementById( 'statefilter' ).value );
      },

      canStore: function ()
      {
          return ( typeof(Storage) !== "undefined" ) ? true : false;
      },

      fetchJSON: function ( url, init ) 
      {
        // this is different - WHY??
        // return fetch( url, init ).then( function( response ) 
        // {
        //   console.log( 'this' + this );
        //   if( response.ok ){ return response.json(); }
        //   throw new Error( response.statusText );
        // }); 
        return fetch( url, init ).then( response =>
        {
            console.log( 'this' + this );
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
      
          console.log( 'house name ---' + this.house );
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

      initialize : function ( )
      {
          console.log( 'initialize.... ' + this.allMembers.length );
          // initialize states array
          this.allMembers.forEach( member =>
              {
                  if( this.allStates.indexOf( member.state ) < 0 )
                  {
                    this.allStates.push( member.state );
                  }
              } );
        //   console.log( 'allStates: ' + this.allStates );
          
          this.stateSelected = this.allStates;
          this.membersToShow = this.allMembers;
          this.insertTableOfMembers();
      },

      filterByParty: function ()
      {
          var nodes = document.querySelectorAll( ['input[name=partyfilter]:checked'] );
          this.partiesSelected = Array.from( nodes ).map( node => node.value );
          this.insertTableOfMembers( );
      },

      filterByState: function ()
      {
          console.log( 'stateFilter' + this.getStateFilterValue() );
            this.stateSelected = ( this.getStateFilterValue() == 'ALL' ) ? 
                this.allStates : this.getStateFilterValue();
            this.insertTableOfMembers( );
      },

      insertTableOfMembers: function ( )
      {
          console.log( '==== ' + this.partiesSelected + ' || ' + this.stateSelected );

          this.membersToShow = this.allMembers.filter( member => 
            this.partiesSelected.indexOf( member.party ) > -1 );

          this.membersToShow = this.membersToShow.filter( member => 
            this.stateSelected.indexOf( member.state ) > -1 );

        //    this.membersToShow = [];
          console.log( 'number of members: ' + this.membersToShow.length );

        },

        hideSpinners: function()
        {
            Array.from( document.getElementsByClassName( 'spinner' ) ).forEach( spinner => 
                spinner.style.display = 'none' );
        },

        }
  })