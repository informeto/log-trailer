#!/bin/bash
for i in {1..20}
do
   sleep 1
   for var in "$@"
   do
    echo " $i  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the 1500s $var " >> logs/"$var"
   done
done