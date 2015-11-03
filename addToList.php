<?php
if(isset($_GET['c'])){
	if(isset($_GET['id'])){
		if(isset($_GET['q'])){
			if(isset($_GET['n'])){
				$c = $_GET['c'];
				$id = $_GET['id'];
				$n = $_GET['n'];
				$q = $_GET['q'];
				echo shell_exec("bash s/addToList.sh $c:$id:$q:$n");
			}
		}
	}
}
?>