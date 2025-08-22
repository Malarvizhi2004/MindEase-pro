// Get mood counts from localStorage
const moodCounts = JSON.parse(localStorage.getItem('moodCounts') || '{}');
const moodLabels = Object.keys(moodCounts);
const moodValues = Object.values(moodCounts);

// Show top mood if available
if (moodLabels.length > 0) {
  const maxCount = Math.max(...moodValues);
  const topMoodIndex = moodValues.indexOf(maxCount);
  const topMood = moodLabels[topMoodIndex];

  const moodTitle = document.createElement('h2');
  moodTitle.textContent = `Your Most Frequent Mood: ${topMood} 😌`;
  document.getElementById('topMoodDisplay').appendChild(moodTitle);
}

// Create mood chart
const moodCtx = document.getElementById('moodChart').getContext('2d');
const moodChart = new Chart(moodCtx, {
  type: 'bar',
  data: {
    labels: moodLabels,
    datasets: [{
      label: 'Mood Selections',
      data: moodValues,
      backgroundColor: [
        '#ff6384', '#ff9f40', '#ffcd56', '#4bc0c0', '#36a2eb', '#9966ff'
      ]
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: { labels: { color: 'purple' } }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: 'purple' }
      },
      x: {
        ticks: { color: 'purple' }
      }
    }
  }
});

// Reset button to clear moodCounts
document.getElementById('resetBtn').addEventListener('click', () => {
  localStorage.removeItem('moodCounts');
  alert('Mood analytics have been reset.');
  location.reload();
});
