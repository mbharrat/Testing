



    //alert('ready!');
    //template for new table row
const templateRow = '<tr class="event"draggable="true"><td></td><td></td></tr>';
    //convert to a get
let table1 = (number) =>{

	$.get("https://jsonplaceholder.typicode.com/albums?userId="+number, function(response){
    	
    }).done(function(response){
    	for(album in response){
        	 $(".connectedSortable").append(templateRow);
        	 var tRow = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U1"+album);
        	 var temp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser1"+album);
        	 var albumTemp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser1"+album);
        	 $("#idUser1"+album).html(response[album].id);
        	 $("#albumUser1"+album).html(response[album].title);
     
        }
    })
};

let table2 = (number) => {
	$.get("https://jsonplaceholder.typicode.com/albums?userId=2", function(response){
    	
    }).done(function(response){
    	for(album in response){
        	 $(".connectedSortable2").append(templateRow);
        	 var tRow = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U2"+album);
        	 var temp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser2"+album);
        	 var albumTemp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser2"+album);
        	 $("#idUser2"+album).html(response[album].id);
        	 $("#albumUser2"+album).html(response[album].title);
     
        }
    });
};




table1(1);
table2(2);

$(document).ready(function(){


    //testing drag and drop

     $('.event').on("dragstart", function (event) {
        
        var dt = event.originalEvent.dataTransfer;
        dt.setData('Text', $(this).attr('id'));
        //console.log($(this).attr('id'));
         
    });

     
    $('tbody tr').on("dragenter dragover drop", function (event) {
        event.preventDefault();
        
        if (event.type == 'drop') {
            var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
            de = $('#' + data).detach(); 
            
           
    		//console.log(event.originalEvent.target);
            if (event.originalEvent.target.tagName == "TR") {
            	//console.log(event.originalEvent.target);
            	console.log("hit");
                //de.insertBefore($(event.originalEvent.target));
            }
            else {
            	//console.log($(this));
                var txt = "<tr><td></td>test<td>test</td></tr>";
                
                $(this).after(de);
                
            }
        };

    });
    

	


   
});
