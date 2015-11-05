SAVEIFS=$IFS
IFS=$(echo -en '\n\b')
c=0
if [ $# -gt 0 ]
	then
		for item in $(cat list/$1)
		do
			c=$((c+1))
			echo "<p class=list-item><b id=i$c onclick=addToList($c,1,'$1')>$item</b> - <i id=d$c onclick=addToList($c,2,'$1')>x2</i> - <i id=t$c onclick=addToList($c,3,'$1')>x3</i></p>"
		done
else
	echo "<select id='selector' onchange=showCat()>" #I wanna see your cat
	echo "<option>- - Click Here to Add Items - -</option>"
	for cat in $(ls list)
	do
		c=$((c+1))
		echo "<option>$cat</option>"
	done
	echo "</select>"
	echo "</p>"

fi
IFS=$SAVEIFS
