



    //alert('ready!');
    //template for new table row
const templateRow = '<tr class="event"draggable="true"><td></td><td></td></tr>';
    //convert to a get
let table1 = (number, number2) =>{

	$.get("https://jsonplaceholder.typicode.com/albums?userId="+number, function(response){
    	$('#mainItem').css('display','none');
        $('.loader').css('display','');
    
    }).done(function(response){
        for(album in response){
        	 $(".connectedSortable").append(templateRow);
        	 var tRow = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U1"+album);
        	 var temp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser1"+album);
        	 var albumTemp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser1"+album);
        	 $("#idUser1"+album).html(response[album].id);
        	 $("#albumUser1"+album).html(response[album].title);
     
        }



        $.get("https://jsonplaceholder.typicode.com/albums?userId="+number2, function(response){
        
        }).done(function(response){
                $('#mainItem').css('display','');
                $('.loader').css('display','none');
            for(album in response){
                 $(".connectedSortable2").append(templateRow);
                 var tRow = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U2"+album);
                 var temp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser2"+album);
                 var albumTemp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser2"+album);
                 $("#idUser2"+album).html(response[album].id);
                 $("#albumUser2"+album).html(response[album].title);
     
            }
        
        $('.event').on("dragstart", function (event) {
        
            var dt = event.originalEvent.dataTransfer;
            dt.setData('Text', $(this).attr('id'));
            var animate = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
            animate = $('#'+animate);
            animate = animate.parent().parent()[0].id;
            if(animate == "table1"){
                animate= "table2"
            }else{
                animate="table1";
            }
            $('#'+animate).addClass('shake');
            //animate.addClass('shake');
            //console.log(animate);
         
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
                }else {
                    //console.log($(this));
                    //var txt = "<tr><td></td>test<td>test</td></tr>";
                    
                    var unAnimate= $(this).parent().parent()[0].id;
                    $('#'+unAnimate).removeClass('shake');
                    $(this).after(de);
                    
                }
            };

        });
    //add css
    
    
    });

        
    })
    

};



  table1(1,2);



$(document).ready(function(){
    

  

     


   
});
