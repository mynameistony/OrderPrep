<?php
	if(isset($_GET['view'])){
		$view = $_GET['view'];

		if("$view" == "currentlist"){
			echo shell_exec("bash s/output-current-list-html.sh");
		}
	}
	if(isset($_GET['remove'])){
		if(isset($_GET['cat'])){
			if(isset($_GET['id'])){
				$cat = $_GET['cat'];
				$id = $_GET['id'];
				echo shell_exec("bash s/remove-item.sh $cat $id");
			}
		}
	}
	else{
		if(isset($_GET['cat'])){
			$c = $_GET["cat"];
			echo shell_exec("bash s/output-order-items.sh $c");
		}
	}
?>