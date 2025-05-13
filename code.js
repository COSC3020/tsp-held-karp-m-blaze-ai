function tsp_hk(distance_matrix) {
    const n = distance_matrix.length;
    if(n <= 1)
        return 0;

    let minTourLength = Infinity;

    for (let start = 0; start < n; start++) {
        let memo = new Map();

        function heldKarp(subset, last) {
            const key = `${subset}-${last}`;
            if (memo.has(key))
                return memo.get(key);

            if (subset === (1 << last)) {
                return distance_matrix[start][last];
        }

        let minCost = Infinity;
        const subsetWithoutLast = subset ^ (1 << last);

        for (let k = 0; k < n; k++) {
            if (k !== last && (subset & (1 << k))) {
                const cost = heldKarp(subsetWithoutLast, k) + distance_matrix[k][last];
                if (cost < minCost)
                    minCost = cost;
            }
        }

        memo.set(key, minCost);
        return minCost;
    }
    
    const fullSet = (1 << n) - 1;
    for (let end = 0; end < n; end++) {
        if (end === start)
            continue;
        const tourLength = heldKarp(fullSet, end);
        if (tourLength < minTourLength)
            minTourLength = tourLength;
        }
    }
        
    return minTourLength;
}
