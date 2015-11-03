cat=$(echo "$@" | awk -F: '{print $1}')
id=$(echo "$@" | awk -F: '{print $2}')
quant=$(echo "$@" | awk -F: '{print $3}')
name=$(echo "$@" | awk -F: '{print $4}')
check=$(cat prep.txt | grep "$name" | wc -l)

if [ "$check" == "0" ]
then
	echo "$@" >> prep.txt
else
	cat prep.txt | sed "s/^.*$name.*$//g" > prep.tmp
	echo "$@" >> prep.tmp
	cat prep.tmp | grep "^.*$" > prep.txt
fi
