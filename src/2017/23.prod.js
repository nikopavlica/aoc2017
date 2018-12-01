module.exports = `
set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 3 
set f 0
jnz 1 5
sub e -1
set g e
sub g b
jnz g -9
sub d -1
set g d
sub g b
jnz g -14
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -24
`;
//
// b = 67;
// c = b;
// b *= 100
// b -= -100000
// c = b;
// c -= -17000
// START: 
// doCountH = false;
// d = 2
// BBB: 
// e = 2
// AAA:
// if ((d * e) - b === 0) doCountH = true
// e++;
// e - b !== 0 => goto AAA
// d++;
// if (d - b !== 0) goto BBB
// if (doCountH) h++
// if (b - c === 0) finish;
// goto start
/*
module.exports = `
set b 67
set c b
jnz a 2
jnz 1 5
mul b 100
sub b -100000
set c b
sub c -17000
set f 1
set d 2
set e 2
set g d
mul g e
sub g b
jnz g 2
set f 0
sub e -1
set g e
sub g b
jnz g -8
sub d -1
set g d
sub g b
jnz g -13
jnz f 2
sub h -1
set g b
sub g c
jnz g 2
jnz 1 3
sub b -17
jnz 1 -23
`;
*/