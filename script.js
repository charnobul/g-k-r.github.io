let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0;
let lastBonusDate = localStorage.getItem('lastBonusDate');

// Обновляем баланс при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';

document.getElementById('clicker-button').addEventListener('click', function() {
    balance += 0.001;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));
});

document.getElementById('daily-bonus').addEventListener('click', function() {
    let today = new Date().toDateString(); // Получаем текущую дату без времени
    if (today !== lastBonusDate) {
        balance += 1; // Добавляем ежедневный бонус
        document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
        localStorage.setItem('balance', balance.toFixed(3));
        localStorage.setItem('lastBonusDate', today);
    }
});
