cat neworder.txt | sed "s/^$1:$2.*$//g" > order.tmp
cat order.tmp | grep "^.*$" > neworder.txt