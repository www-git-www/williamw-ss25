class Fibonacci:
    def generate_fib(place:int) -> list:
        """Generates {place} digits of the fibonacci sequence and returns the sequence as a list object."""
        sequence=[]
        current_num=0
        next_num=1

        for i in range(place):
            sequence.append(current_num)
            temp=next_num
            next_num+=current_num
            current_num=temp

        return sequence