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

j=$(cat $f)

if [ "$j" == "" ]
	then
	echo "<p class=button>Looks like the list is empty</p>"
else

	for p in $(cat $f)
	do

		c=$(echo "$p" | awk -F: '{print $1}')
		id=$(echo "$p" | awk -F: '{print $2}')
		q=$(echo "$p" | awk -F: '{print $3}')
		n=$(echo "$p" | awk -F: '{print $4}')

		if [ "$1" == "prep" ]
			then
			echo "<p id=$id class='prep button' onclick=removeFromList('$c','$id')>$n($q)</p>"
		else
			echo "<p id=$id class='order button' onclick=removeFromList('$c','$id')>$n($q)</p>"
		fi
	done
fi
IFS=$SAVEIFS