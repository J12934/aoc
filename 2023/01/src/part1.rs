pub fn work(input: String) -> u32 {
    return input
        .split("\n")
        .filter(|line| !line.replace(" ", "").is_empty())
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
        assert_eq!(work(String::from("1ab2cd3ef")), 13);
    }

    #[test]
    fn test_add_multiple_lines() {
        assert_eq!(
            work(String::from(
                "1ab2
        cd3ef"
            )),
            45
        );
    }

    #[test]
    fn test_example() {
        assert_eq!(
            work(String::from(
                "1abc2
                pqr3stu8vwx
                a1b2c3d4e5f
                treb7uchet
                "
            )),
            142
        );
    }
}
