import sys
import csv

assert len(sys.argv) == 2, "USAGE: $ python csv2array.py in.csv"

with open(sys.argv[1], 'r') as f:
    csvreader = csv.reader(f)
    header = next(csvreader)
    labels = []
    values = []
    for line in csvreader:
        labels.append(line[0])
        values.append(line[1])

print(header[0] + "=" + str(labels) + ";")
print(header[1] + "=" + str(list(map(int,values))) + ";")

