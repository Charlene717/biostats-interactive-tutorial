/*
 * JavaScript utilities for the biostatistics interactive tutorial.
 * This file defines helper functions and event listeners for
 * computing descriptive statistics, drawing probability distributions
 * and running simple simulations.  Chart.js (v4+) is used for
 * visualisations.  The functions are modular so you can call them
 * from multiple pages.
 */

// Compute common descriptive statistics from an array of numbers.
function descriptiveStats(values) {
  const n = values.length;
  if (n === 0) return null;
  const sorted = values.slice().sort((a, b) => a - b);
  const mean = values.reduce((sum, v) => sum + v, 0) / n;
  const median = n % 2 === 1 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
  const deviations = values.map(v => v - mean);
  const variance = deviations.reduce((sum, d) => sum + d * d, 0) / (n - 1);
  const sd = Math.sqrt(variance);
  // Range and interquartile range
  const range = sorted[n - 1] - sorted[0];
  const q1 = quartile(sorted, 0.25);
  const q3 = quartile(sorted, 0.75);
  const iqr = q3 - q1;
  return { n, mean, median, variance, sd, range, q1, q3, iqr, sorted };
}

// Helper to compute arbitrary percentile (0<q<1) from sorted array.
function quartile(arr, q) {
  const pos = (arr.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (arr[base + 1] !== undefined) {
    return arr[base] + rest * (arr[base + 1] - arr[base]);
  } else {
    return arr[base];
  }
}

// Generate points for a normal distribution with given mean and sd.
function normalPdf(mean, sd, points = 100) {
  const xs = [];
  const ys = [];
  const minX = mean - 4 * sd;
  const maxX = mean + 4 * sd;
  const step = (maxX - minX) / (points - 1);
  const coeff = 1 / (sd * Math.sqrt(2 * Math.PI));
  for (let i = 0; i < points; i++) {
    const x = minX + i * step;
    const y = coeff * Math.exp(-0.5 * Math.pow((x - mean) / sd, 2));
    xs.push(x);
    ys.push(y);
  }
  return { xs, ys };
}

// Generate pmf for a binomial distribution with parameters n and p.
function binomialPmf(n, p) {
  const xs = [];
  const ys = [];
  for (let k = 0; k <= n; k++) {
    xs.push(k);
    ys.push(binomialProb(n, k, p));
  }
  return { xs, ys };
}

// Binomial probability mass function (n choose k) * p^k * (1-p)^(n-k)
function binomialProb(n, k, p) {
  return comb(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
}

// Compute binomial coefficient using multiplicative formula
function comb(n, k) {
  if (k < 0 || k > n) return 0;
  if (k === 0 || k === n) return 1;
  k = Math.min(k, n - k);
  let c = 1;
  for (let i = 1; i <= k; i++) {
    c = (c * (n - (k - i))) / i;
  }
  return c;
}

// Draw a histogram given an array of values and a Chart.js context.
function drawHistogram(ctx, values, bins = 10) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const width = (max - min) / bins;
  const counts = new Array(bins).fill(0);
  values.forEach(v => {
    const index = Math.min(Math.floor((v - min) / width), bins - 1);
    counts[index]++;
  });
  const labels = counts.map((_, i) => (min + i * width).toFixed(2));
  return new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Frequency',
        data: counts,
        backgroundColor: 'rgba(26,107,90,0.6)',
        borderColor: 'rgba(26,107,90,1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          title: { display: true, text: 'Value' }
        },
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Count' }
        }
      },
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

// Draw a line chart from x/y arrays using Chart.js.
function drawLineChart(ctx, xs, ys, label = '', colour = 'rgba(212,160,60,1)') {
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: xs,
      datasets: [{
        label,
        data: ys,
        fill: false,
        borderColor: colour,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: { title: { display: true, text: '' } },
        y: { beginAtZero: true }
      },
      responsive: true,
      plugins: { legend: { display: false } }
    }
  });
}

/*
 * Inverse cumulative distribution function (quantile function) for the
 * standard normal distribution.  This algorithm implements the
 * approximation developed by Peter John Acklam and is accurate to
 * around 1e-4 in the tails.  It is used for computing critical
 * values for confidence intervals and power calculations.
 * See: https://web.archive.org/web/20150811010742/http://home.online.no/~pjacklam/notes/invnorm/
 */
function normInv(p) {
  // Coefficients for lower and upper regions
  const a1 = -3.969683028665376e+01;
  const a2 =  2.209460984245205e+02;
  const a3 = -2.759285104469687e+02;
  const a4 =  1.383577518672690e+02;
  const a5 = -3.066479806614716e+01;
  const a6 =  2.506628277459239e+00;

  const b1 = -5.447609879822406e+01;
  const b2 =  1.615858368580409e+02;
  const b3 = -1.556989798598866e+02;
  const b4 =  6.680131188771972e+01;
  const b5 = -1.328068155288572e+01;

  const c1 = -7.784894002430293e-03;
  const c2 = -3.223964580411365e-01;
  const c3 = -2.400758277161838e+00;
  const c4 = -2.549732539343734e+00;
  const c5 =  4.374664141464968e+00;
  const c6 =  2.938163982698783e+00;

  const d1 =  7.784695709041462e-03;
  const d2 =  3.224671290700398e-01;
  const d3 =  2.445134137142996e+00;
  const d4 =  3.754408661907416e+00;

  const pLow  = 0.02425;
  const pHigh = 1 - pLow;

  if (p <= 0 || p >= 1) {
    throw new Error('Probability must be in (0,1)');
  }
  if (p < pLow) {
    // Rational approximation for lower region
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
           ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  if (p > pHigh) {
    // Rational approximation for upper region
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) /
            ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
  }
  // Central region
  const q = p - 0.5;
  const r = q * q;
  return (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q /
         (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
}

// Expose functions on the window object so they can be used from
// pages that load this script without modules.  Attaching here
// ensures that interactive pages can call these helpers directly.
window.descriptiveStats = descriptiveStats;
window.normalPdf = normalPdf;
window.binomialPmf = binomialPmf;
window.drawHistogram = drawHistogram;
window.drawLineChart = drawLineChart;
window.normInv = normInv;