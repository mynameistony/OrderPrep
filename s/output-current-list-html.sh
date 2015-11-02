SAVEIFS=$IFS
IFS=$(echo -en '\n\b')
for f in $(cat neworder.txt)
do
	cat=$(echo "$f" | grep "^[[:alpha:]]*" -o)
	id=$(echo "$f" | sed s/"^$cat:"//g | grep "^[0-9]*" -o)
	quantity=$(echo "$f" | sed s/^$cat:$id://g | grep "^[0-9]*" -o)
	name=$(echo "$f" | sed s/^$cat:$id:$quantity://g)
	echo "<p class=button onclick=removeFromList('$cat','$id')>$name x$quantity</p>"
done
IFS=SAVEIFS