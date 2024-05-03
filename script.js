let balance = localStorage.getItem('balance') ? parseFloat(localStorage.getItem('balance')) : 1;
let button = document.getElementById('clicker-button');
let clickSound = new Audio('sounds/click.mp3'); // Замените на путь к вашему аудиофайлу

clickSound.volume = 0.5; // Устанавливаем громкость на 50%
clickSound.muted = true; // Включаем режим "без звука"
clickSound.play(); // Проигрываем звук

// Обновляем баланс при загрузке страницы
document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';

button.addEventListener('touchstart', function() {
    button.style.transform = 'scale(0.95)';
});

button.addEventListener('touchend', function() {
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

    // Проигрываем звук
    clickSound.muted = false; // Выключаем режим "без звука"
    clickSound.play();
});
