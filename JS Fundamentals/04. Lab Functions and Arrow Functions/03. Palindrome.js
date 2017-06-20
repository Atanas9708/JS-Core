function palindrome(input) {

    for (let i = 0; i <= input.length / 2; i++) {

        if (input[i] == input[input.length - i - 1]) {

            return true;
        }

        return false;
    }
}

console.log(palindrome('racecar'))