# gets called with 3 args: filename, line, column
filename=$1
line=$2
column=$3

# call your editor with whatever args it expects
windsurf -l $line -c $column -f "$filename"