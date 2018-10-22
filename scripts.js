//
//-----------------------------------------------------------------
//  dynamic tr template
//-----------------------------------------------------------------

const templateRow = '<tr class="event"draggable="true"><td></td><td class="album"></td><td style="display:none"></td></tr>';

//-----------------------------------------------------------------



//-----------------------------------------------------------------
//          created a variable for the double get (reload table with specific users)
//-----------------------------------------------------------------

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
             $("#labelTable1").html("User "+response[album].userId);
     
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
                 $("#labelTable2").html("User "+response[album].userId);
     
            }
            drag()    
    });
        
    })
    

};

//-----------------------------------------------------------------


//-----------------------------------------------------------------
//              anonymous function stored in var to send out a get
//-----------------------------------------------------------------


let postAlbum = (element,uId,t) => {
    $.post("https://jsonplaceholder.typicode.com/posts", { "userId": uId.toString(), "title": t.toString() })
    .done(function(response){
       // console.log(response);
        element.after(templateRow);
        var tRow = $('#'+element[0].id +'+ tr').attr("id","U"+response.userId+''+response.title[0]);
        var temp = $('#'+element[0].id+' +tr > td').attr("id","idUser"+response.userId+''+response.title[0]);
        var albumTemp = $('#'+element[0].id+'+tr > td:eq(1)').attr("id","albumUser"+response.userId+''+response.title[0]);
        var userIdTemp = $('#'+element[0].id+'+tr > td:eq(2)').attr("id",response.userId);
        
        //console.log("#idUser"+response.userId+''+response.title[0]);
        $("#idUser"+response.userId+''+response.title[0]).html(response.id);
        $("#albumUser"+response.userId+''+response.title[0]).html(response.title);
        $('#mainItem').css('display','');
        $('.loader').css('display','none');

        //reset handler
        drag();
        
    });
};
//-----------------------------------------------------------------


//-----------------------------------------------------------------
//set up my dragging handlers
//-----------------------------------------------------------------

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
            
         
        });

     
        $('tbody tr').on("dragenter dragover drop", function (event) {
            event.preventDefault();
                
            if (event.type == 'drop') {
                var data = event.originalEvent.dataTransfer.getData('Text', $(this).attr('id'));
                var selectedRow = $('.selectedRow');
                de = $('#' + data).detach(); 
                
               console.log(event.originalEvent.target.tagName);
                
                
                if (event.originalEvent.target.tagName == "TH") {
                    console.log($(this));
                    var item = $(this)[0];


        



                }else {
                    console.log("no no");
                    var item = $('#'+$(this)[0].id);
                }  
                    $('#mainItem').css('display','none');
                    $('.loader').css('display','');
                    var userId = item[0].childNodes[2].id
                   
                    if(de[0] !== undefined){
                        var title = de[0].childNodes[1].innerHTML
                        postAlbum(item,userId, title);      //@AJAX
                    }
                    
                    console.log(de[0].childNodes[1].innerHTML);
                    if(selectedRow !=undefined){
                        for(i=0;i<selectedRow.length;i++){
                            
                            title = selectedRow[i].childNodes[1].innerHTML

                            if(de[0].childNodes[1].innerHTML == title){
                                continue;
                            }
                            postAlbum(item,userId,title);     //@AJAX
                            selectedRow[i].remove();

                        }
                    }
                    
                    var unAnimate= $(this).parent().parent()[0].id;
                    $('#'+unAnimate).removeClass('shake');
                    
                
            };

        });
};
//-----------------------------------------------------------------





//-----------------------------------------------------------------
//              search functions for the input boxes
//-----------------------------------------------------------------

function searchFunc(table, input, clearFilter, search) {
    var input, filter, tab,td;
    input = document.getElementById(input);
    filter = input.value.toUpperCase();

    tab = document.getElementById(table);
    tr = tab.getElementsByClassName('event');
    td = tab.getElementsByClassName("album");
   
    
    for (i = 0; i < td.length; i++) {
        
        if (td[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
            tr[i].style.display = "";
        } else {

            tr[i].style.display = "none";
            $('.'+search).css('display','none'); 
            $('.'+clearFilter).css('display','');
        }
        
    }

}
//-----------------------------------------------------------------



//-----------------------------------------------------------------
//          manual candy stripe for hidden rows when filter is active (it's hacky but works for now)
//-----------------------------------------------------------------

function reStripe(tr){
    
    var k =0;
    for(i=0;i<tr.length;i++){
        
        if(tr[i].style.display==""){
            k++;
            
            var deepNest = tr[i].children;
            if(k%2==1){
                deepNest[0].style.backgroundColor="#D2B4DE"
                deepNest[1].style.backgroundColor="#D2B4DE"
                deepNest[2].style.backgroundColor="#D2B4DE"
            }else{
                deepNest[0].style.backgroundColor="#f6f6f6"
                deepNest[1].style.backgroundColor="#f6f6f6"
                deepNest[2].style.backgroundColor="#f6f6f6"
            }
                        
           
        }

    }
   
}
//-----------------------------------------------------------------





//-----------------------------------------------------------------
//              take off filtering so put styling back to how css wants it
//-----------------------------------------------------------------

function cleanStripe(tr){
    for(i=0;i<tr.length;i++){

            var deepNest = tr[i].children;
            
                deepNest[0].style.backgroundColor=""
                deepNest[1].style.backgroundColor=""
                deepNest[2].style.backgroundColor=""
            
           
            
        }
}
//-----------------------------------------------------------------


//-----------------------------------------------------------------
//              clear out the filter (when clear button is hit)
//-----------------------------------------------------------------

function clearSearch(id, table, clearFilter, search){
    $('.'+id).val('');
    var tab = document.getElementById(table);
    var tr = tab.getElementsByClassName('event');
    for(i=0;i<tr.length;i++){
        tr[i].style.display = "";
    }
    $('.'+clearFilter).css('display','none'); 
    $('.'+search).css('display','');
    cleanStripe($('.event'));
}
//-----------------------------------------------------------------

//-----------------------------------------------------------------
//          hacky way to go back home from modal
function hackClose(table1,table2){
    
    var one = $(".connectedSortable")[0].children;
    const lengthOne = one.length;
    var two = $(".connectedSortable2")[0].children;
    const twoLength = two.length;
    //console.log(one.length);
    for(i=1;i<lengthOne;i++){
        one[1].remove();
        
    }
    
    for(i=1;i<twoLength;i++){
        two[1].remove();
    }
    
   table(table1,table2);       //@AJAX
   window.location=document.getElementsByClassName('popup__close')[0].href;

}

//-----------------------------------------------------------------

  

 



$(document).ready(function(){
    
//-----------------------------------------------------------------
//         THESE LOAD AFTER PAGE LOADS TO PREVENT WEIRD BEHAVIORS
//-----------------------------------------------------------------


//-----------------------------------------------------------------
//      let's initiliaze the table to start
//-----------------------------------------------------------------

table(3,2);     //@AJAX

//-----------------------------------------------------------------




//-----------------------------------------------------------------
//      set up search for functionality
//-----------------------------------------------------------------

  $('a[href="#search"]').on('click', function(event) {                    
        $('#search').addClass('open');
        $('#search > form > input[type="search"]').focus();
    });


    $('a[href="#search2"]').on('click', function(event) {                    
        $('#search2').addClass('open');
        $('#search2 > form > input[type="search"]').focus();
    });             
    $('#search, #search button.close, #search2, #search2 button.close').on('click keyup', function(event) {
        if (event.target == this || event.target.className == 'close' || event.keyCode == 27) {
            $(this).removeClass('open');
            reStripe($('.event'));

        }
    }); 
//-----------------------------------------------------------------




//-----------------------------------------------------------------
//              set up click handler for selecting Row
//-----------------------------------------------------------------
    $(document).on("click", ".event", function () {
            //console.log($(this)[0])
            $(this).toggleClass("selectedRow");
    });   
//-----------------------------------------------------------------




       
});
