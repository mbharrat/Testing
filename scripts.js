$(document).ready(function(){

	

    //alert('ready!');
    //template for new table row
    const templateRow = "<tr><td></td><td></td></tr>";
    $.ajax({url: "https://jsonplaceholder.typicode.com/albums?userId=1", success: function(result){
        //dynamic adding of special div rows
        for(album in result){
        	 $(".connectedSortable").append(templateRow);
        	 var temp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser1"+album);
        	 var albumTemp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser1"+album);
        	 $("#idUser1"+album).html(result[album].id);
        	 $("#albumUser1"+album).html(result[album].title);
     
        }

    }});
     

     $.ajax({url: "https://jsonplaceholder.typicode.com/albums?userId=2", success: function(result){
        //dynamic adding of special div rows
        for(album in result){
        	 $(".connectedSortable2").append(templateRow);
        	 var temp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser2"+album);
        	 var albumTemp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser2"+album);
        	 $("#idUser2"+album).html(result[album].id);
        	 $("#albumUser2"+album).html(result[album].title);
     
        }

    }});

  

   
});
