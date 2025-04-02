import typer
from typing_extensions import Annotated

def generate_fib(count:int) -> list:
    """Generates {count} digits of the fibonacci sequence and returns the sequence as a list object."""
    sequence=[]
    current_num=0
    next_num=1

    for i in range(count):
        sequence.append(current_num)
        temp=next_num
        next_num+=current_num
        current_num=temp

    return sequence

def print_sequence(sequence:list,one_line:bool, last_only:bool, numbering:bool) -> None:
    """Prints sequence based on cli options"""
    output=sequence
    if(numbering):
        for i in range(len(output)):
            output[i]=str(i+1)+":"+str(output[i])


    if(last_only):
        temp=output[-1]
        output.clear()
        output.append(temp)


    if(one_line):
        output_string=""
        for item in output:
            output_string+=str(item)+", "
        
        output_string=output_string.removesuffix(", ")
        print(output_string)
    else:
        for item in output:
            print(item)

count_help="Calculate to this many counts. IE: 0,1,1,2,3,5 would be the result of -c 6"
one_line_help="Print all the numbers on one line, separated by commas. Without this option, each number in the sequence will be printed on a new line."
numbering_help="Preface each number in the sequence with it's countment. IE for \"-c 6 --numbering --one-line\" you would get this: \" 1:0, 2:1, 3:1, 4:2, 5:3, 6:5\" where the first number is the count and the second is the Fibonacci sequence."
last_only_help="Only print the last number in the sequence"

def main(count:Annotated[int,typer.Option("--count","-c",help=count_help)],one_line:Annotated[bool,typer.Option("--one-line",help=one_line_help)]=False,numbering:Annotated[bool,typer.Option("--numbering",help=numbering_help)]=False,last_only:Annotated[bool,typer.Option("--last-only",help=last_only_help)]=False):
    sequence=generate_fib(count)
    print_sequence(sequence,one_line,last_only,numbering)
    

if __name__ == "__main__":
    typer.run(main)