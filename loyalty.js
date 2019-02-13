const key = 'votes_with_party_pct';

function populateLoyaltyTables( )
{
    createHiLowTable( 'least', getHighestLowest( membersByLoyalty, key ), key );
    createHiLowTable( 'most', getHighestLowest( membersByLoyalty.reverse(), key ), key );
    
}

populateLoyaltyTables();
