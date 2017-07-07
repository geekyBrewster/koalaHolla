console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // load existing koalas on page load
  getKoalas();

  // add koala button click
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    var objectToSend = {
      name: $('#nameIn').val(),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    // call saveKoala with the new obejct
    saveKoala( objectToSend );
  }); //end addButton on click
}); // end doc ready

function getKoalas(){
  console.log( 'in getKoalas' );
  $('#viewKoalas').empty();
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'GET',
    success: function( response ){
      console.log( 'got some koalas: ', response );
      var koalas = response.koalas;
      for(var i = 0; i < koalas.length; i++){
        var koala = koalas[i];
        var $tr = $('<tr></tr>');
        $tr.append('<td>' + koala.name + '</td>');
        $tr.append('<td>' + koala.age + '</td>');
        $tr.append('<td>' + koala.gender + '</td>');
        $tr.append('<td>' + koala.ready_for_transfer + '</td>');
        $tr.append('<td>' + koala.notes + '</td>');
        $('#viewKoalas').append($tr);
      }
    } // end success
  }); //end ajax
  // display on DOM with buttons that allow edit of each
} // end getKoalas

function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    url: '/koalas',
    type: 'POST',
    data: newKoala,
    success: function( data ){
      console.log( 'got some koalas: ', data );
      getKoalas();
    } // end success
  }); //end ajax
}
