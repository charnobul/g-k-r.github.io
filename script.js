let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let button = document.getElementById('clicker-button');

// Обновляем баланс при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';

button.addEventListener('mousedown', function() {
    button.style.transform = 'scale(0.95)';
});

button.addEventListener('mouseup', function() {
    button.style.transform = 'scale(1)';
});

button.addEventListener('click', function() {
    balance += 0.001;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));

    // Добавляем вибрацию
    if (window.navigator && typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(100);
    }
});
