$( "a" ).hover(
  function() {
    $( this ).append( $( "<span> PISKA </span>" ) );
  }, function() {
    $( this ).find( "span" ).last().remove();
  }
);
