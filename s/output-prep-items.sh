SAVEIFS=$IFS
IFS=$(echo -en '\n\b')
c=0
for i in $(cat preplist/$1)
do
	c=$((c+1))
	name=$(echo "$i" | awk -F: '{print $1}')
	q1=$(echo "$i" | awk -F: '{print $2}')
	q2=$(echo "$i" | awk -F: '{print $3}')
	q3=$(echo "$i" | awk -F: '{print $4}')	
	echo "<p class=list-item id=$1$c>"
	check=$(echo -n "$q1" | grep "^[[:digit:]]*$" | wc -l)
	if [ "$check" == "1" ]
		then
			# echo "Multiple"
			echo "<i id=i$c onclick=addToList($c,1,'$1')>$name</i>"
			# echo "$q1:$q2:$q3"
			if [ "$q1" != "" ]
				then
				echo " - <b onclick=addToList($c,'$q1','$1')>x$q1</b>"
			fi

			if [ "$q2" != "" ]
				then
				echo " - <b onclick=addToList($c,'$q2','$1')>x$q2</b>"
			fi

			if [ "$q3" != "" ]
				then
				echo " - <b onclick=addToList($c,'$q3','$1')>x$q3</b>"
			fi	
	else
		if [ "$q1" == "Number" ]
			then
				# echo "Number"
				echo "<i id=i$c>$name</i>"
				echo "<input id=amount$c type=number onchange=addNumberToList($c,'$1')>"
			else
				# echo "Batch"
				echo "<i id=i$c onclick=addToList($c,1,'$1')>$name</i>"			
				if [ "$q1" != "" ]
					then
					echo " - <b onclick=addToList($c,'$q1','$1')>$q1</b>"
				fi
			fi

			if [ "$q2" != "" ]
				then
				echo " - <b onclick=addToList($c,'$q2','$1')>$q2</b>"
			fi

			if [ "$q3" != "" ]
				then
				echo " - <b onclick=addToList($c,'$q3','$1')>$q3</b>"
			fi	
	fi			
	echo "</p>"
done

IFS=SAVEIFS