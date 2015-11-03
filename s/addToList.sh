c=$(echo "$@" | awk -F: '{print $1}')
id=$(echo "$@" | awk -F: '{print $2}')
q=$(echo "$@" | awk -F: '{print $3}')
n=$(echo "$@" | awk -F: '{print $4}')

if [ "$c" == "Prep" ] || [ "$c" == "Pull" ]
	then 
	f=prep.txt
	t=prep.tmp
else
	f=order.txt
	t=order.tmp
fi

cat "$f" | grep "$n"
if [ "$?" == "1" ]
	then
	echo "$c:$id:$q:$n" >> "$f"
else
	cat "$f" | grep "$n" -v > "$t"
	echo "$c:$id:$q:$n" >> "$t"
	cat "$t" | grep "^.*$" -o > "$f"
fi
