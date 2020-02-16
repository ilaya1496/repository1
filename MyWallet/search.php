<?php 
include("connector.php");
error_reporting(0);
 
// Get search term 
$searchTerm = $_GET['term']; 


// Fetch matched data from the database 
$query = $db->query("SELECT description FROM budjetentry WHERE description LIKE '%".$searchTerm."%' ORDER BY description ASC"); 

// Generate array with skills data 
$skillData = array(); 
if($query->num_rows > 0){ 
    while($row = $query->fetch_assoc()){ 
        $data['value'] = $row['description']; 
        array_push($skillData, $data); 
    } 
} 
 
// Return results as json encoded array 
echo json_encode($skillData); 

?>