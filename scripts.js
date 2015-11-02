var newItemCount = 0;
var newItemId = [];
var newItemName = [];
var newItemQuantity = [];
var newItemCategory = [];
function addToList(id,quantity){
	var cat = document.getElementById("catSelect").value;
	var name = document.getElementById("i"+id).innerHTML;
	var isDupe = false;
	var dupePos = 0;
	if(newItemCount > 0){
		for (var i = 0; i < newItemName.length; i++) {
			if(newItemName[i] == name){
				isDupe = true;
				dupePos = i;
			}
		}
	}

	if(isDupe){
		newItemQuantity[dupePos] = quantity;	
	}else{
		newItemCategory[newItemCount] = cat;
		newItemId[newItemCount] = id;
		newItemQuantity[newItemCount] = quantity;
		newItemName[newItemCount] = name;
		newItemCount++;
	}

	outputTmpList();
}

function showCat(){
	var c = document.getElementById("catSelect").value;
	if(c == "--Pick A Category--"){
		document.getElementById("categoryHolder").innerHTML = "";
		return 0;
	}
	var h = new XMLHttpRequest();
	h.onreadystatechange=function(){
		if (h.readyState==4 && h.status==200){
    		document.getElementById("categoryHolder").innerHTML = h.responseText;
    	}
  	}
  		
	h .open( "GET", "/action.php?cat=" + c,true);
	h.send(null);
	document.getElementById("categoryHolder").innerHTML = "<p class=text>Loading...</p>";
}

function submitList(){
	for (var i = 0; i < newItemCount; i++) {
		var q = "cat="+newItemCategory[i]+"&id=" + newItemId[i] + "&name=" + newItemName[i] + "&q=" + newItemQuantity[i];
		var h = new XMLHttpRequest();
		// h.onreadystatechange=function(){
		// 	if (h.readyState==4 && h.status==200){
		// 		removeFromTmpList(i);
	 //    	}
	 //  	}	  		
		h .open( "GET", "/addToOrder.php?" + q,true);
		h.send(null);

	}
	window.location = "/viewOrder.php";

}

function removeFromTmpList(id){
	if(newItemCount > 0){
		newItemName[id] = newItemName[newItemCount-1];
		newItemQuantity[id] = newItemQuantity[newItemCount-1];
		newItemCategory[id] = newItemCategory[newItemCount-1];
		newItemId[id] = newItemId[newItemCount-1];

		newItemName.length = newItemCount-1;
		newItemQuantity[newItemCount] = null;
		newItemCategory[newItemCount] = null;
		newItemId[newItemCount] = null;
		newItemCount--;
	}
	else{
		newItemName[id] = "";
		newItemQuantity[id] = "";
		newItemCategory[id] = "";
		newItemId[id] = "";
		newItemCount = 0;
	}
	outputTmpList();
}

function removeFromList(cat,id){
		var h = new XMLHttpRequest();
		h.onreadystatechange=function(){
			if (h.readyState==4 && h.status==200){
				document.getElementById("currentListHolder").innerHTML = h.responseText;
	    	}
	  	}
		h .open( "GET", "/action.php?remove=true&cat="+cat+"&id="+id,true);
		h.send(null);


}

function outputTmpList(){
	if(newItemCount > 0){
		var tmpList = "<p>";
		for (var i = newItemCount-1; i >= 0; i--) {
			if(i > newItemCount - 5){
				tmpList += "<p class=button onclick=removeFromTmpList("+i+")>";
				tmpList += newItemName[i];
				tmpList += " x" + newItemQuantity[i] + "</p>";
			}
		}

		tmpList += "</p>";	
		document.getElementById("banner").innerHTML = "<u>" + Number(newItemCount) + "</u> items<br><button class=button onclick=submitList()>Add to the list</button>" + tmpList;
	}else{
		document.getElementById("banner").innerHTML = "No new items to add";
	}
}

function outputCurrentList(){
		var h = new XMLHttpRequest();
		h.onreadystatechange=function(){
			if (h.readyState==4 && h.status==200){
				document.getElementById("currentListHolder").innerHTML = h.responseText;
	    	}
	  	}
		h .open( "GET", "/action.php?view=currentlist",true);
		h.send(null);

		document.getElementById("currentListHolder").innerHTML = "<p class=text>Loading...</p>";
}