SAVEIFS=$IFS
IFS=$(echo -en '\n\b')
for f in $(cat prep.txt)
do
	cat=$(echo "$f" | awk -F: '{print $1}')
	id=$(echo "$f" | awk -F: '{print $2}')
	quantity=$(echo "$f" | awk -F: '{print $3}')
	name=$(echo "$f" | awk -F: '{print $4}')
	echo "<p class=button onclick=removeFromList('$cat','$id')>$cat - $name - $quantity</p>"
done
IFS=SAVEIFS