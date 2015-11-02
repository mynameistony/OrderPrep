SAVEIFS=$IFS
IFS=$(echo -en '\n\b')
c=0
if [ $# -gt 0 ]
	then
		for item in $(cat list/$1)
		do
			c=$((c+1))
			echo "<p class=list-item><i id=i$c onclick=addToList($c,1)>$item</i> <b id=d$c onclick=addToList($c,2)>x2</b> <b id=t$c onclick=addToList($c,3)>x3</b></p>"
		done	
else
	echo "<select id=catSelect onchange=showCat()>" #I wanna see your cat
	echo "<option>--Pick A Category--</option>"
	for cat in $(ls list)
	do
		c=$((c+1))
		echo "<option>$cat</option>"
	done
	echo "</select>"
	echo "</p>"

fi
IFS=SAVEIFS