let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 0;
let lastBonus = localStorage.getItem('lastBonus') ? new Date(localStorage.getItem('lastBonus')) : null;

// Обновляем баланс при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';

document.getElementById('clicker-button').addEventListener('click', function() {
    balance += 0.001;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));
});

document.getElementById('daily-bonus').addEventListener('click', function() {
    let today = new Date();
    if (!lastBonus || today.getDate() != lastBonus.getDate() ||
        today.getMonth() != lastBonus.getMonth() ||
        today.getFullYear() != lastBonus.getFullYear()) {
        balance += 1; // Добавляем ежедневный бонус
        document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
        localStorage.setItem('balance', balance.toFixed(3));
        localStorage.setItem('lastBonus', today.toString());
    }
});
