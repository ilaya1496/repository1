<?PHP
	include("connector.php");
	error_reporting(0);
	
	$description = $_POST['data'];
    $sql = "INSERT INTO `budjetentry`(`description`) VALUES ('$description');";
	if(mysqli_query($db,$sql)){
			////alert("Description submitted successfully..");
	}
	else{
		alert("something went wrong");
	}		
    mysqli_close($con);

	function alert($msg) {
    echo "<script type='text/javascript'>alert('$msg');</script>";
    }
		
?>