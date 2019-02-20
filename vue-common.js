// Vue.component( 'vue-head' , {
//     template: '<meta charset="utf-8">' +
//         '<meta name="viewport" content="width=device-width, initial-scale=1">' +
//         '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">' +
//         '<link rel="stylesheet" href="main.css">' +
//         '<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>' +
//         '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>' +
//         '<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>'
// } );

Vue.component( 'vue-footer', {
    template: '<div class="row">' +
        '<div class="col-md-1"></div>' +
        '<div class="col-md-10 well"><p>@2018 TGIF | All Rights Reserved</p></div>' +
        '<div class="col-md-1"></div></div>'
} );

Vue.component( 'vue-logo-bar', {
    template: '<div class="row">' +
    '<div class="col-md-1"></div>' + 
    '<div class="col-md-3"><img src="logo-sm.jpg" alt="TGIF logo"></div>' +
    '<div class="col-md-6"></div>' +
    '<div class="col-md-1"><a href="mailto: info@tgif.net">info@TGIF.net </a></div>' +
    '<div class="col-md-1"></div></div>'
} );

Vue.component( 'vue-navbar', {
    template: '<div class="row">' +
    '<div class="col-md-1"></div>' +
        '<div class="col-md-10">' +
            '<nav class="navbar navbar-default">' +
                '<div class="container-fluid">' +
                    '<div class="navbar-header">' +
                        '<a class="navbar-brand" href="#">TGIF</a>' +
                    '</div>' +
                    '<ul class="nav navbar-nav">' +
                        '<li><a href="index.html">Home</a></li>' +
                        '<li>' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Congress 113</a>' +
                            '<ul class="dropdown-menu">' +
                                '<li><a href="senate.html">Senate</a></li>' +
                                '<li><a href="house.html">House</a></li>' +
                            '</ul>' +
                        '</li>' +
                        '<li>' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Attendance</a>' +
                            '<ul class="dropdown-menu">' +
                                '<li><a href="attendance-senate.html">Senate</a></li>' +
                                '<li><a href="attendance-house.html">House</a></li>' +
                            '</ul>' +
                        '</li>' +
                       '<li>' +
                            '<a href="#" class="dropdown-toggle" data-toggle="dropdown">Loyalty</a>' +
                            '<ul class="dropdown-menu">' +
                                '<li><a href="loyalty-senate.html">Senate</a></li>' +
                                '<li><a href="loyalty-house.html">House</a></li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
            '</nav>'  +
        '</div>' +
    '<div class="col-md-1"></div>' +
    '</div>'
} );