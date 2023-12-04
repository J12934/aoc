pub fn work(input: String) -> u32 {
    return input
        .split("\n")
        .filter(|line| !line.replace(" ", "").is_empty())
        .map(|f| {
            return f
                // lol that this works 😅
                .replace("nine", "ni9ne")
                .replace("eight", "ei8ght")
                .replace("six", "si6x")
                .replace("seven", "se7ven")
                .replace("five", "fi5ve")
                .replace("four", "fo4ur")
                .replace("three", "th3ree")
                .replace("two", "tw2o")
                .replace("one", "o1ne");
        })
        .map(|line| {
            // iterate over characters in line
            // take the first char which is a digit in the line and add it to the last digit in the line
            // char is then converted into a int

            let first_digit = line
                .chars()
                .find(|letter| letter.is_digit(10))
                .map(|letter| letter.to_digit(10).unwrap())
                .unwrap();
            let last_digit = line
                .chars()
                .rfind(|c| c.is_digit(10))
                .map(|letter| letter.to_digit(10).unwrap())
                .unwrap();

            println!("{}: {}", line, first_digit * 10 + last_digit);

            return first_digit * 10 + last_digit;
        })
        .sum();
}

#[cfg(test)]
mod tests {
    // Note this useful idiom: importing names from outer (for mod tests) scope.
    use super::*;

    #[test]
    fn test_add() {
        assert_eq!(work(String::from("1ab2cdthreeef")), 13);
    }

    #[test]
    fn test_example() {
        assert_eq!(
            work(String::from(
                "two1nine
        eightwothree
        abcone2threexyz
        xtwone3four
        4nineeightseven2
        zoneight234
        7pqrstsixteen"
            )),
            281
        );
    }
}
