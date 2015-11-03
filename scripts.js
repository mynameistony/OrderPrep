var newItemId = [];
var newItemName = [];
var newItemQuantity = [];
var newItemCategory = [];

function addNumberToList(id,cat){
	var q = document.getElementById("amount"+id).value;
	addToList(id,q,cat);
}


function addToList(id,q,c){
	var p = newItemName.length;
	
	var n = document.getElementById("i"+id).innerHTML;
	if(p < 0){
		newItemCategory[0] = c;
		newItemId[0] = id;
		newItemQuantity[0] = q;
		newItemName[0] = n;
	}
	else{
		for(var i = 0; i < p; i++){
			cc = newItemCategory[i];
			ci = newItemId[i];

			if(cc == c){
				if(ci == id){
					if(newItemQuantity[i] == q){
						return 0;	
					}
					else{
						newItemQuantity[i] = q;
						outputTmpList();
						return 0;
					}
				}
			}
		}
		newItemCategory[p] = c;
		newItemId[p] = id;
		newItemQuantity[p] = q;
		newItemName[p] = n;		
	}
	outputTmpList();
}

function showCat(){
	var c = document.getElementById("selector").value;
	if(c[0] == '-'){
		document.getElementById("currentListHolder").innerHTML = "";
		return 0;
	}
	var h = new XMLHttpRequest();
	h.onreadystatechange=function(){
		if (h.readyState==4 && h.status==200){
    		document.getElementById("currentListHolder").innerHTML = h.responseText;
    	}
  	}  		
	h .open( "GET", "/action.php?c=" + c,true);
	h.send(null);
	document.getElementById("currentListHolder").innerHTML = "<p class=text>Loading...</p>";
}

function submitList(){
	// var s = prompt("You have to know the password to add to the prep list");
	// if(s == "secure"){
		var p = newItemName.length-1;

		for (var r = 0; r < newItemName.length; r++) {
			var q = "c=" + newItemCategory[r] + "&id=" + newItemId[r] + "&q=" + newItemQuantity[r] + "&n=" + newItemName[r];
			var h = new XMLHttpRequest();
		  	h .open( "GET", "/addToList.php?" + q,false);
			h.send(null);
			//removeFromTmpList(r);
		}
		c=newItemCategory[p];

		if(c == "Prep" || c == "Pull")
			outputCurrentList("Prep");
			//window.location = "/viewPrep.html";
		else
			outputCurrentList("Order");
			// window.location = "/viewOrder.html";
	// }else{
	// 	alert("Sorry, your not allow to do that");
	// }

}

function removeFromTmpList(id){
	newItemName.splice(id,1);
	newItemQuantity.splice(id,1);
	newItemId.splice(id,1);
	newItemCategory.splice(id,1);
	outputTmpList();
}

function removeFromList(c,id){
	// var security = prompt("You gotta know the password to remove items from the list");
	// if(security == "secure"){
		var h = new XMLHttpRequest();
		h .open( "GET", "/action.php?remove=t&c="+c+"&id="+id,false);
		h.send(null);

		var l = "";
		if(c == "Prep" || c == "Pull")
			l="Prep";
		else
			l="Order";


		outputCurrentList(l);
	// }else{
	// 	alert("Sorry, you can't do that");
	// }
}

function outputTmpList(){
	var p = newItemName.length-1;
	var l = "";

	if(p < 0){
		document.getElementById("banner").innerHTML = "Nothing to add";
	}
	else{
		for (var i = p; i >= 0; i--) {
			if(i > p-3){
				l += "<p class=tmpbutton onclick=removeFromTmpList("+i+")>";
				l += newItemName[i];
				l += " " + newItemQuantity[i] + "</p>";
			}
		}
		document.getElementById("banner").innerHTML = "<u>" + Number(p+1) + "</u> items<br><button class=addbutton onclick=submitList()>Add to the list</button>" + l;
	}
}

function outputCurrentList(list){
		var h = new XMLHttpRequest();
		h.onreadystatechange=function(){
			if (h.readyState==4 && h.status==200){
				document.getElementById("currentListHolder").innerHTML = h.responseText;
	    	}
	  	}
	  	if(list=="Prep")
	  		h .open( "GET", "/action.php?view=preplist",true);	
	  	else
			h .open( "GET", "/action.php?view=orderlist",true);

		h.send(null);
		document.getElementById("currentListHolder").innerHTML = "<p class=text>Loading...</p>";
}

function outputOrderCatSelect(){
	var h = new XMLHttpRequest();
	h.onreadystatechange=function(){
		if (h.readyState==4 && h.status==200){
			document.getElementById("categoryHolder").innerHTML = h.responseText;
    	}
  	}
  	h .open( "GET", "/action.php?view=categoryselect",true);
	h.send(null);
}