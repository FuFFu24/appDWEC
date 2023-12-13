var factorial = function fac(n) { return n < 2 ? 1 : n * fac(n - 1) };
alert(factorial(3));