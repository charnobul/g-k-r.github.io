let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let farms = localStorage.getItem('farms') ? parseInt(localStorage.getItem('farms')) : 0;
let button = document.getElementById('clicker-button');
let shopButton = document.getElementById('buy-farm');
let clickSound = new Audio('sounds/2e371cbd1ce9be1.mp3'); // Замените на путь к вашему аудиофайлу

// Обновляем баланс и количество ферм при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
document.getElementById('farm-counter').textContent = farms;

button.addEventListener('touchstart', function() {
    button.style.transform = 'scale(0.95)';
});

button.addEventListener('touchend', function() {
    button.style.transform = 'scale(1)';
});

button.addEventListener('click', function() {
    balance += 0.001 * farms;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));

    // Добавляем вибрацию
    if (window.navigator && typeof window.navigator.vibrate === 'function') {
        window.navigator.vibrate(100);
    }

    // Проигрываем звук
    clickSound.play();
});

shopButton.addEventListener('click', function() {
    if (balance >= 0.100) {
        balance -= 0.100;
        farms += 1;
        document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
        document.getElementById('farm-counter').textContent = farms;
        localStorage.setItem('balance', balance.toFixed(3));
        localStorage.setItem('farms', farms);
    } else {
        alert('Недостаточно средств для покупки фермы');
    }
});

// Обновляем баланс каждую секунду
setInterval(function() {
    balance += 0.001 * farms;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));
}, 1000);
