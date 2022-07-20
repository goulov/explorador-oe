var data_2022_dorg;
var total_2022_dorg=0;
const ctx_dorg = document.getElementById('despesa_organica');
const d_org = new Chart(ctx_dorg, {
    type: 'bar',
    data: {
        datasets: [{
            // data: data_2022_dorg, // updated by Papa.parse
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
        }],
    },
    options: {
        responsive: true,
        indexAxis: 'y',
        scales: {
            x: {
                ticks: {
                    count: 1000,
                    callback: function(value, index, ticks) {
                        return (100*value/total_2022_dorg).toFixed(0) + '%';
                    }
                },
            }
        },
        plugins: {
            legend: { display: false, },
            title: { display: true, text: 'Total: ' + total_2022_dorg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' €'},
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return context.parsed.x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' €  (' + (100*context.parsed.x/total_2022_dorg).toFixed(2) + '%)';
                    }
                }
            },
        },
    },
});

// Papa.parse('../data/2022/despesas_organica.csv', {
Papa.parse('https://raw.githubusercontent.com/goulov/explorador-oe/main/data/2022/despesas_organica.csv', {
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: function(results) {
        data_2022_dorg = results.data.sort((a, b) => parseInt(a['x']) < parseInt(b['x']));
        total_2022_dorg = data_2022_dorg.reduce((a, b) => a + parseInt(b['x']), 0);
        d_org.data.datasets[0]['data'] = data_2022_dorg;
        d_org.options['plugins']['title']['text'] = 'Total: ' + total_2022_dorg.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + ' €',
        d_org.update();
    }
});
