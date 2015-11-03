<?php
if(isset($_GET['cat'])){
	if(isset($_GET['id'])){
		if(isset($_GET['name'])){
			if(isset($_GET['q'])){
				$cat = $_GET['cat'];
				$id = $_GET['id'];
				$name = $_GET['name'];
				$q = $_GET['q'];
				echo shell_exec("bash s/addToPrep.sh $cat:$id:$q:$name");
			}
		}
	}
}
?>
