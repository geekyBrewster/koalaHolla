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
    clearInputs();
  }); //end addButton on click

  // add delete button click
  $('#viewKoalas').on('click', '.deleteBtn', function(){
    console.log("Delete button clicked with id: ", $(this).data('id'));
    $.ajax({
      type: 'DELETE',
      url: '/koalas/' + $(this).data('id'),
      success: function(response){
        console.log("Koala removed.");
        getKoalas();
      }
    });
  }); // end of delete button

$('#viewKoalas').on('click', '.transferBtn', function(req, res){
  console.log("clicked transfer button with id: " + $(this).data('id'));
  $.ajax({
    type: "PUT",
    url: "/koalas/" + $(this).data('id'),
    success: function(response){
      console.log("Koala ready for transfer");
      getKoalas();
    }
  });
});

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
        if(koala.ready_for_transfer == "N"){
          $tr.append('<td><button data-id="' + koala.id +'" class="transferBtn">Ready for Trasfer</button></td>');
        }
        else{
          $tr.append('<td></td>');
        }
        $tr.append('<td><button data-id="' + koala.id +'" class="deleteBtn">Delete</button></td>');
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
function clearInputs(){
  $('#nameIn').val("");
  $('#ageIn').val("");
  $('#genderIn').val("");
  $('#readyForTransferIn').val("");
  $('#notesIn').val("");
}
