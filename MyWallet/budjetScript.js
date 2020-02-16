$(document).ready(function(){
	      
	   	  $("#description")
		  .autocomplete({
              source: "search.php",
		      minLength: 1,
			  select: function (e, ui) {
              CopyToClipboard(ui.item.label);
            }
          });
          
		  
		  $("#submit").click(function(){
			   	var description = $('#description').val(); 
	           if(description === "")
               {
	             alert("cant submit empty Description");
			     return;
               }
			   
			   var varData = 'data=' + description;
			   $.ajax({
	              type: "POST",
		          url: "checkDuplicate.php",
		          data: varData,
		          success: function(data){
				     var phpResponse = data;	
				     CheckDuplicate(phpResponse);
		          }
	           });
           }); 
		   
		   $("#check").click(function(){
			   $('#password').focus();
		      var type = $('#password').attr("type");
			  if(type === "password")
		       {$('#password').attr('type','text');}
			  else
			   {$('#password').attr('type','password');}
		   });
		   
		   $(".close").click(function(){
		       $('#myModal').css('display','none');
			   $('#description').focus();
		   });			   
		   
		   $('#ok').click(function(){
		       var password = $('#password').val();
		       var varData = 'password=' + password;
			   $.ajax({
	              type: "POST",
		          url: "VerifyPassword.php",
		          data: varData,
		          success: function(data){
		              VerifyPassword(data);
		          }
	           });
		   });
		   
		   $('#description').keypress(function(e){
		        var key = e.which;
				if(key == 13){
					$("#submit").click();
				}
		   });
		   
		   $('#password').keypress(function(e){
		        var key = e.which;
				if(key == 13){
					$("#ok").click();
				}
		   });
		   
		   document.getElementById("clearDescription").onclick = function() {
	            clearDescription();
           };
	
           document.getElementById("clearPassword").onclick = function() {
	            document.getElementById("password").value="";
	            document.getElementById("password").focus();
           };


		   
	 });	 
	 
	 function clearDescription(){    
	     document.getElementById("description").value="";
	     document.getElementById("description").focus();
    }
    
    function CheckDuplicate(phpResponse){
        if(phpResponse === "1")
			   {
				   alert("this description is already exits.Cant submit duplicate");
				   return;
			   }
			   else{
			       $('#myModal').css('display','block');
				   $('#password').val('');
                   $('#password').focus();
			   }
    }
    
    function VerifyPassword(data){
        var phpResponse = data;
        if(phpResponse === "0")
        {
	            alert("invalid password");
			    $('#password').focus();
        } 
		else
		{
		    PasswordVerified();
		}
    }

     function PasswordVerified(){
	      var description = $('#description').val();
	      var varData = 'data=' + description;
	      
		  $.ajax({
	         type: "POST",
		     url: "submit.php",
		     data: varData,
		     success: function(){
				CopyToClipboard(description);
				$('#myModal').css('display','none');				
		        setTimeout(function(){alert("Description submitted successfully..");},1000);
				clearDescription();   
		     }
	      });	
	 }
	 
	 function CopyToClipboard(description){
	      var tempElement = $('<input>').val(description).appendTo('body').select();
		  document.execCommand('copy');
		  tempElement.remove();
	 }