var stats = new Vue({
    el: '#vue-tables',
    data: {
      house: document.getElementsByTagName( 'house' )[0].id,
      stateFilter: document.getElementById( 'statefilter' ),
      allStates: [],
      stateSelected: [],
      partiesSelected: ['R', 'D', 'I'],
      allMembers: [],
      membersToShow: []

    },

    created : function( )
    {
      console.log("console from vue", this.congressMembers);
      this.test();
      this.getData( '113', this.house );
    },

    methods: {

      test: function()
      {
        console.log( "===this is a test function ====");
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

      getData: function ( version = '113', house = 'senate' )
      {
          console.log( 'house : ' + house );
          if( this.canStore ) // check if data already exists
          {
              if( sessionStorage.getItem( house ) != null )
              {
              //    console.log( 'got data already.' + JSON.parse( sessionStorage.getItem( house ) ) );
                  this.allMembers = JSON.parse( sessionStorage.getItem( house ) );
                  this.initialize();
                  return;
              }
          }
      
          const url = `https://api.propublica.org/congress/v1/${version}/${house}/members.json`;
          console.log( '=== GET DATA ===>' + url );
          this.fetchJSON( url , 
          {
              method: 'GET',
              headers: { 'X-API-Key' : 'iVsThyfuOgbdt7qIxYBZhbTsMbkta3psSKD9ugKX' }
          }).then( result => {
              this.allMembers = result.results[0].members;
              if( this.canStore )
              { 
                  sessionStorage.setItem( house , JSON.stringify( this.allMembers ) );
              //    console.log( 'store --> ' + sessionStorage.getItem( house ) );
              }
              this.initialize();
          });
      },

      initialize : function ( )
      {
          console.log( 'initialize....' );
          // initialize states array
          this.allMembers.forEach( member =>
              {
                  if( this.allStates.indexOf( member.state ) < 0 )
                      this.allStates.push( member.state );
              } );
      
          this.allStates.forEach( state =>
              {
                 let option = document.createElement( 'option' );
                 option.setAttribute( 'value', state ); 
                 option.append( document.createTextNode( state ) );
                 this.stateFilter.append( option );
              } );
          
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
        /* WHY????????
          console.log( `filter by state: ${this.stateFilter.value}` );
          this.stateSelected = ( this.stateFilter.value == 'ALL' ) ? this.allStates : this.stateFilter.value;
          */
         console.log( `filter by state: ${document.getElementById( 'statefilter' ).value}` );
         this.stateSelected = ( document.getElementById( 'statefilter' ).value == 'ALL' ) ? this.allStates : document.getElementById( 'statefilter' ).value;
         
          this.insertTableOfMembers( );
      },

      insertTableOfMembers: function ( )
      {
          console.log( '==== ' + this.partiesSelected + ' || ' + this.stateSelected );

          this.membersToShow = this.allMembers.filter( member => this.partiesSelected.indexOf( member.party ) > -1 );
          this.membersToShow = this.membersToShow.filter( member => this.stateSelected.indexOf( member.state ) > -1 );
          console.log( 'number of members: ' + this.membersToShow.length );

        }
      
      




      


    }
  })