const key = 'missed_votes_pct';

function populateAttendanceTables( )
{
    createHiLowTable( 'least', getHighestLowest( membersByAttendance, key ), key );
    createHiLowTable( 'most', getHighestLowest( membersByAttendance.reverse(), key ), key );
    
}

populateAttendanceTables();