let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;

// Обновляем баланс при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';

document.getElementById('clicker-button').addEventListener('click', function() {
    balance += 0.001;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));

    // Добавляем вибрацию
    if (window.navigator && typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(100);
    }
});
