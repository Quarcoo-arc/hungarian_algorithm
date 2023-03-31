import numpy as np

cost_matrix = np.array([
    [10, 15, 16, 18],
    [14, 13, 16, 10],
    [11, 9, 8, 18],
    [13, 13, 11, 9]
])

# Row reduction
cost_matrix -= np.min(cost_matrix, axis=1)[:, np.newaxis]
print(cost_matrix)

# Column reduction
cost_matrix -= np.min(cost_matrix, axis=0)
print(cost_matrix)

rows, cols = cost_matrix.shape

stars = np.zeros_like(cost_matrix)

primes = np.zeros(cols, dtype=int) - 1
print(primes)

stars[:, 0] = (cost_matrix == 0).any(axis=1)
print(stars)

while not np.all(stars):
    row, col = np.where(stars == 0)
    print(row, col)
    row = row[0]
    stars[row, col[0]] = 1
    col = np.where(cost_matrix[row] == 0)[0]
    primes[col[0]] = row
    print(primes)
    while primes[col[0]] >= 0:
        print(primes[col[0]])
        row = primes[col[0]]
        stars[row, col[0]] = 1
        col = np.where(cost_matrix[row] == 0)[0]
        primes[col[0]] = row
    