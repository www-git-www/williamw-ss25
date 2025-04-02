from fastapi import FastAPI, Query
from Fibonacci import Fibonacci as fib

#Iniitialize FastAPI
app = FastAPI()

#define api path
@app.get("/api/fibonacci/{count}/")
async def get_fib(count:int,one_line:bool=Query(default=False,alias="one-line"),last_only:bool=Query(default=False,alias="last-only"),numbering:bool=Query(default=False),help:bool=Query(default=False)):
    """Get {count} numbers of the fibonacci sequence"""
    output={}

    #Get Fibonacci sequence
    sequence=fib.generate_fib(count)
    modified_sequence=sequence

    #Number sequence if required
    if(numbering):
        for i in range(len(modified_sequence)):
            modified_sequence[i]=str(i+1)+":"+str(modified_sequence[i])

    #build JSON if last-only is true
    if(last_only):
        output["last-number"]=modified_sequence[-1]
    else:
        #Create comma-separated String for JSON output if required
        if(one_line):
            output_string=""
            for item in modified_sequence:
                output_string+=str(item)+", "
            output_string=output_string.removesuffix(", ")
            output["sequence"]=output_string
        #Use unchanged sequence if nothing else is required
        else:
            output["sequence"]=modified_sequence

    #Add a help key to JSON response if requested
    if help:
        output["help"]="""Parameters
         count endpoint: /api/fibonacci/:count/ : Calculate to this many places. IE: 0,1,1,2,3,5 would be the result of /api/fibonacci/6
         
         Query Strings:
         help: bool => output this help
         one-line: bool => Format the sequence as a string. If false, sequence will be formatted as a JSON list.
         numbering: bool => Preface each number in the sequence with it's countment. IE for "-c 6 --numbering --one-line" you would get this: " 1:0, 2:1, 3:1, 4:2, 5:3, 6:5" where the first number is the count and the second is the Fibonacci sequence.
         last-only: bool => Only print the last number in the sequence

         See docs at /docs
         """
    #outputs final JSON string
    return output