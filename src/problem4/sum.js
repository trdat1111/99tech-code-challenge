// Iterative way
// O(n) time: The loop iterate n times
// O(1) space: Use only a fixed amount of memory
function sum_to_n_a(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Recursive way
// O(n) time: The function makes n time recursive call
// O(n) space: Every time the function is called, it add more to call stack
function sum_to_n_b(n) {
    if (n <= 0) return 0;
    return n + sum_to_n_b(n - 1);
}

// Mathematical way
// O(1) time and space: compute is done with direct math formula
function sum_to_n_c(n) {
    return (n * (n + 1)) / 2;
}

// Test cases
console.log(sum_to_n_a(5)); // 15
console.log(sum_to_n_b(5)); // 15
console.log(sum_to_n_c(5)); // 15
