



    //alert('ready!');
    //template for new table row
    const templateRow = '<tr class="event"draggable="true"><td></td><td></td></tr>';
    $.ajax({url: "https://jsonplaceholder.typicode.com/albums?userId=1", success: function(result){
        //dynamic adding of special div rows
        for(album in result){
        	 $(".connectedSortable").append(templateRow);
        	 var tRow = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U1:"+album);
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

     $(document).ready(function(){
    //testing drag and drop

     $('.event').on("dragstart", function (event) {
        
        var dt = event.originalEvent.dataTransfer;
        dt.setData('Text', $(this).attr('id'));
        //console.log($(this).attr('id'));
         
    });

     
    $('tbody tr').on("dragenter dragover drop", function (event) {
        event.preventDefault();
        
        if (event.type === 'drop') {
            var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
            
            var de = $('#' + data).detach();
           
    		//console.log(event.originalEvent.target);
            if (event.originalEvent.target.tagName == "TR") {
            	//console.log(event.originalEvent.target);
            	console.log("hit");
                de.insertBefore($(event.originalEvent.target));
            }
            else {
            	console.log($(this));
                var txt = "<p>test</p>";
                $(this).after(txt);
            }
        };

    });
    

	

	

  

   
});
