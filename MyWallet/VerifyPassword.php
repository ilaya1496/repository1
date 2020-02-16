<?php 
include("connector.php");
error_reporting(0);
 
$password = $_POST['password']; 

if($password == "pyren"){
	 $flag = 1;
}
else{
	 $flag = 0;
} 

// Return results as json encoded array 
echo json_encode($flag); 
?>