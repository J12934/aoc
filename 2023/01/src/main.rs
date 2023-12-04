use std::fs::File;
use std::io::prelude::*;

mod part1;
mod part2;

fn main() -> std::io::Result<()> {
    let mut file = File::open("input.txt")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;

    let sum = part2::work(contents);

    println!("result: {}", sum);

    Ok(())
}
