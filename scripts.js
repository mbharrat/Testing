



    //alert('ready!');
    //template for new table row
const templateRow = '<tr class="event"draggable="true"><td></td><td></td><td style="display:none"></td></tr>';
    //convert to a get
let table = (number, number2) =>{

	$.get("https://jsonplaceholder.typicode.com/albums?userId="+number, function(response){
    	$('#mainItem').css('display','none');
        $('.loader').css('display','');
    
    }).done(function(response){
        for(album in response){
        	 $(".connectedSortable").append(templateRow);
        	 var tRow = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U"+number+''+album);
        	 var temp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser"+number+''+album);
        	 var albumTemp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser"+number+''+album);
            var userIdTemp = $('.connectedSortable > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(2)').attr("id",response[album].userId);
        	 $("#idUser"+number+''+album).html(response[album].id);
        	 $("#albumUser"+number+''+album).html(response[album].title);
     
        }



        $.get("https://jsonplaceholder.typicode.com/albums?userId="+number2, function(response){
        
        }).done(function(response){
                $('#mainItem').css('display','');
                $('.loader').css('display','none');
            for(album in response){
                 $(".connectedSortable2").append(templateRow);
                 var tRow = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+')').attr("id","U"+number2+''+album);
                 var temp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td').attr("id","idUser"+number2+''+album);
                 var albumTemp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(1)').attr("id","albumUser"+number2+''+album);
                 var userIdTemp = $('.connectedSortable2 > tr:eq('+(parseInt(album, 10)+1)+') > td:eq(2)').attr("id",response[album].userId);
                 $("#idUser"+number2+''+album).html(response[album].id);
                 $("#albumUser"+number2+''+album).html(response[album].title);
     
            }
            drag()
    
    //add css
    
    
    });

        
    })
    

};

//post function

let postAlbum = (element,uId,t) => {
    $.post("https://jsonplaceholder.typicode.com/posts", { "userId": uId.toString(), "title": t.toString() })
    .done(function(response){
        console.log(response);
        element.after(templateRow);
        var tRow = $('#'+element[0].id +'+ tr').attr("id","U"+response.userId+''+response.id);
        var temp = $('#'+element[0].id+' +tr > td').attr("id","idUser"+response.userId+''+response.id);
        var albumTemp = $('#'+element[0].id+'+tr > td:eq(1)').attr("id","albumUser"+response.userId+''+response.id);
        var userIdTemp = $('#'+element[0].id+'+tr > td:eq(2)').attr("id",response.userId);
        

        $("#idUser"+response.userId+''+response.id).html(response.id);
        $("#albumUser"+response.userId+''+response.id).html(response.title);
        $('#mainItem').css('display','');
        $('.loader').css('display','none');

        //reset handler?
        drag();
    
        
        
    });
};

//set up my dragging handlers
const drag = () => {

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
                    
                    var item = $('#'+$(this)[0].id);
                    console.log(data);
                    $('#mainItem').css('display','none');
                    $('.loader').css('display','');
                    var userId = item[0].childNodes[2].id
                    var title = de[0].childNodes[1].innerHTML
                    postAlbum(item,userId, title);
                    var unAnimate= $(this).parent().parent()[0].id;
                    $('#'+unAnimate).removeClass('shake');
                   // $(this).after(de);

                    
                }
            };

        });
};



  table(3,2);
 



$(document).ready(function(){
    

  

     


   
});
