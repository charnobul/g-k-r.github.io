document.getElementById('clicker-button').addEventListener('click', function() {
    balance += 0.001;
    document.getElementById('balance').textContent = 'Баланс: ' + balance.toFixed(3) + ' гривен';
    localStorage.setItem('balance', balance.toFixed(3));

    // Добавляем вибрацию
    if (navigator.vibrate) { // Проверяем, поддерживает ли браузер Vibration API
        navigator.vibrate(100); // Вибрация длительностью 100 миллисекунд
    }
});
