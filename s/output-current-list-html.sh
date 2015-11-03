SAVEIFS=$IFS
IFS=$(echo -en '\n\b')
if [ "$1" == "prep" ]
	then 
	f=prep.txt
	t=prep.tmp
else
	f=order.txt
	t=order.tmp
fi

for p in $(cat $f)
do

	c=$(echo "$p" | awk -F: '{print $1}')
	id=$(echo "$p" | awk -F: '{print $2}')
	q=$(echo "$p" | awk -F: '{print $3}')
	n=$(echo "$p" | awk -F: '{print $4}')

	if [ "$1" == "prep" ]
		then
		echo "<p class=button onclick=removeFromList('$c','$id')>$c - $n - $q</p>"
	else
		echo "<p class=button onclick=removeFromList('$c','$id')>$n x$q</p>"
	fi
done
IFS=SAVEIFS