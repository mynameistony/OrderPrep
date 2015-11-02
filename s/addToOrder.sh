tmp="$@"
cat=$(echo "$tmp" | grep "^[[:alpha:]]*" -o)
id=$(echo "$tmp" | sed "s/^$cat //g" | grep "^[0-9]*" -o)
quant=$(echo "$tmp" | sed "s/^$cat $id //g" | grep "^[0-9]*" -o)
name=$(echo "$tmp" | sed "s/^$cat $id $quant //g" | grep "[[:print:]]*$" -o)
echo "$cat:$id:$quant:$name"

check=$(cat neworder.txt | grep "$name" | wc -l)
if [ "$check" == "0" ]
then
	echo "$cat:$id:$quant:$name" >> neworder.txt
else
	cat neworder.txt | sed "s/^.*$name.*$//g" > order.tmp
	echo "$cat:$id:$quant:$name" >> order.tmp
	cat order.tmp | grep "^.*$" > neworder.txt
fi
