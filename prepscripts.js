var newItemCount = 0;
var newItemId = [];
var newItemName = [];
var newItemQuantity = [];
var newItemCategory = [];

function addNumberToList(id){
	var q = document.getElementById("amount"+id).value;

	addToList(id,q);
}

function addToList(id,quantity){
	var cat = document.getElementById("selector").value;
	var name = document.getElementById(id).innerHTML;
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
	var c = document.getElementById("selector").value;
	if(c == "--Prep or Pull--"){
		document.getElementById("categoryHolder").innerHTML = "";
		return 0;
	}
	var h = new XMLHttpRequest();
	h.onreadystatechange=function(){
		if (h.readyState==4 && h.status==200){
    		document.getElementById("categoryHolder").innerHTML = h.responseText;
    	}
  	}
	h .open( "GET", "/action.php?type=" + c,true);
	h.send(null);
	document.getElementById("categoryHolder").innerHTML = "<p class=text>Loading...</p>";
}

function submitList(){
	var s = prompt("You have to know the password to add to the order list");
	if(s == "secure"){
		for (var i = 0; i < newItemCount; i++) {
			var q = "cat="+newItemCategory[i]+"&id=" + newItemId[i] + "&name=" + newItemName[i] + "&q=" + newItemQuantity[i];
			var h = new XMLHttpRequest();
			h.onreadystatechange=function(){
				if (h.readyState==4 && h.status==200){
					removeFromTmpList(i);
		    	}
		  	}
		  	h .open( "GET", "/addToPrep.php?" + q,true);
			h.send(null);

		}
		window.location = "/viewPrep.html";
	}else{
		alert("Sorry, your not allow to do that");
	}

}

function removeFromTmpList(id){
	// alert(id);
	newItemName.splice(id,1);
	newItemQuantity.splice(id,1);
	newItemId.splice(id,1);
	newItemCategory.splice(id,1);
	newItemCount--;
	outputTmpList();
}

function removeFromList(cat,id){
		var security = prompt("You gotta know the password to remove items from the list");
		if(security == "secure"){
			var h = new XMLHttpRequest();
			h.onreadystatechange=function(){
				if (h.readyState==4 && h.status==200){
					document.getElementById("currentListHolder").innerHTML = h.responseText;
		    	}
		  	}
			h .open( "GET", "/action.php?remove=true&cat="+cat+"&id="+id+"&type=prep",true);
			h.send(null);
		}else{
			alert("Sorry, you can't do that");
		}
}
function outputTmpList(){
	if(newItemCount > 0){
		var tmpList = "<p>";
		for (var i = newItemCount-1; i >= 0; i--) {
			if(i > newItemCount - 4){
				tmpList += "<p class=button onclick=removeFromTmpList("+i+")>";
				tmpList += newItemName[i] + " - ";
				if(isNaN(newItemQuantity[i]))
					tmpList += newItemQuantity[i] + "</p>";	
				else
					tmpList += "x" + newItemQuantity[i] + "</p>";
			}
		}

		tmpList += "</p>";	
		document.getElementById("banner").innerHTML = "<u>" + Number(newItemCount) + "</u> items<br><button class=addbutton onclick=submitList()>Add to the list</button>" + tmpList;
	}else{
		document.getElementById("banner").innerHTML = "No new items to add";
	}
}

function outputCurrentPrepList(){
		var h = new XMLHttpRequest();
		h .open( "GET", "/action.php?type=prep&view=currentlist",true);
		h.send(null);
		document.getElementById("currentListHolder").innerHTML = "<p class=text>Loading...</p>";
		document.getElementById("currentListHolder").innerHTML = h.responseText;
		
}