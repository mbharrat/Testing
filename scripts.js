$(document).ready(function(){

	

    //alert('ready!');
    //template for new table row
    const templateRow = "<div class='table__row drag' draggable='true'><div class='table__cell table__cell--short'>{{ID}}</div><div class='table__cell table__cell'>{{TITLE}}</div></div>";
    $.ajax({url: "https://jsonplaceholder.typicode.com/albums?userId=1", success: function(result){
        //dynamic adding of special div rows
        for(album in result){
        	 $("#table1").append(templateRow);
        	 var temp = $('#table1 > div:eq('+(parseInt(album, 10)+1)+') > div:eq(0)').attr("id","idUser1"+album);
        	 var albumTemp = $('#table1 > div:eq('+(parseInt(album, 10)+1)+') > div:eq(1)').attr("id","albumUser1"+album);
        	 $("#idUser1"+album).html(result[album].id);
        	 $("#albumUser1"+album).html(result[album].title);
        }
    }});
     
    $.ajax({url: "https://jsonplaceholder.typicode.com/albums?userId=2", success: function(result){
        //dynamic adding of special div rows
        for(album in result){
        	 $("#table2").append(templateRow);
        	 var temp = $('#table2 > div:eq('+(parseInt(album, 10)+1)+') > div:eq(0)').attr("id","idUser2"+album);
        	 var albumTemp = $('#table2 > div:eq('+(parseInt(album, 10)+1)+') > div:eq(1)').attr("id","albumUser2"+album);
        	 $("#idUser2"+album).html(result[album].id);
        	 $("#albumUser2"+album).html(result[album].title);
        	 console.log(album);
        }
       
        	
      
            
    }});

   var $tabs = $('#t_draggable2')
  $("tbody.t_sortable").sortable({
    connectWith: ".t_sortable",
    items: "> tr:not(:first)",
    appendTo: $tabs,
    helper:"clone",
    zIndex: 999990
  }).disableSelection();
  
  var $tab_items = $(".nav-tabs > li", $tabs).droppable({
    accept: ".t_sortable tr",
    hoverClass: "ui-state-hover",
    drop: function( event, ui ) { return false; }
  });

   
});
