if [ "$1" == "Prep" ] || [ "$1" == "Pull" ]
	then
	f=prep.txt
	t=prep.tmp
else
	f=order.txt
	t=order.tmp
fi
cat "$f" | grep "^$1:$2" -v > "$t"
cat "$t" | grep "^.*$" > "$f"