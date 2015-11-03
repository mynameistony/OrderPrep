<?php

	if(isset($_GET['view'])){
		$view = $_GET['view'];
		switch($view){
			case "orderlist":
				echo shell_exec("bash s/output-current-list-html.sh order");
			break;

			case "preplist":
				echo shell_exec("bash s/output-current-list-html.sh prep");
			break;

			case "categoryselect":
					echo shell_exec("bash ./s/output-order-items.sh");
			break;



		}
	}else{

		if(isset($_GET['remove'])){
			if(isset($_GET['c'])){
				if(isset($_GET['id'])){
					$c = $_GET['c'];
					$id = $_GET['id'];
					echo shell_exec("bash s/remove-item.sh $c $id");
				}
			}
		}
		else{

			if(isset($_GET["c"])){
				$c = $_GET["c"];
				if("$c" == "Prep" || "$c" == "Pull")
					echo shell_exec("bash s/output-prep-items.sh $c");
				else
					echo shell_exec("bash s/output-order-items.sh $c");
			}
		}
	}
?>