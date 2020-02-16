<?php 
include("connector.php");
error_reporting(0);
 
// Get search term 
$searchTerm = $_POST['data']; 
 
// Fetch matched data from the database 
$query = $db->query("SELECT * FROM budjetentry WHERE description = '".$searchTerm."' "); 
if($query->num_rows > 0){
	 $flag = 1;
}
else{
	 $flag = 0;
} 

// Return results as json encoded array 
echo json_encode($flag); 
?>