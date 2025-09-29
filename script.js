// Modern calendar & form submission script
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder="What Should We Call You?"]');
    const ddInput = document.querySelector('input[placeholder="Date"]');
    const mmInput = document.querySelector('input[placeholder="Month"]');
    const yyInput = document.querySelector('input[placeholder="Year"]');
    const phoneInput = document.querySelector('input[placeholder="Mobile Number (For Launch Updates)"]');
    const emailInput = document.querySelector('input[placeholder="Email Id (Where we’ll send you invite)"]');
    const calendarBtn = document.querySelector('.calendar-btn');
    const submitBtn = document.querySelector('.submit-btn');

    // --------- Modern calendar ---------
    function createModernCalendar() {
        const calendarOverlay = document.createElement('div');
        calendarOverlay.className = 'calendar-overlay';
        calendarOverlay.style.cssText = `
            position: fixed;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background: rgba(0,0,0,0.5);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        `;

        const calendarContainer = document.createElement('div');
        calendarContainer.className = 'calendar-container';
        calendarContainer.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            max-width: 350px;
            width: 90%;
        `;

        const calendarHeader = document.createElement('div');
        calendarHeader.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        `;

        const monthYear = document.createElement('h3');
        monthYear.style.cssText = `
            margin: 0;
            font-size: 18px;
            color: #333;
        `;

        const prevBtn = document.createElement('button');
        prevBtn.type = 'button';
        prevBtn.innerHTML = '←';
        prevBtn.style.cssText = `
            background: #f0f0f0;
            border: none;
            width: 40px; height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
        `;

        const nextBtn = document.createElement('button');
        nextBtn.type = 'button';
        nextBtn.innerHTML = '→';
        nextBtn.style.cssText = prevBtn.style.cssText;

        const calendarGrid = document.createElement('div');
        calendarGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-bottom: 20px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.textContent = 'Close';
        closeBtn.style.cssText = `
            width: 100%;
            padding: 10px;
            background: #533338;
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
        `;

        calendarHeader.appendChild(prevBtn);
        calendarHeader.appendChild(monthYear);
        calendarHeader.appendChild(nextBtn);
        calendarContainer.appendChild(calendarHeader);
        calendarContainer.appendChild(calendarGrid);
        calendarContainer.appendChild(closeBtn);
        calendarOverlay.appendChild(calendarContainer);
        document.body.appendChild(calendarOverlay);

        let currentDate = new Date();

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            monthYear.textContent = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
            calendarGrid.innerHTML = '';

            // Day headers
            const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.textContent = day;
                dayHeader.style.cssText = `text-align: center; font-weight: bold; padding: 10px 5px; color: #666;`;
                calendarGrid.appendChild(dayHeader);
            });

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) calendarGrid.appendChild(document.createElement('div'));

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                dayCell.style.cssText = `
                    text-align: center; padding: 10px 5px;
                    cursor: pointer; border-radius: 8px; transition: all 0.2s;
                `;

                dayCell.addEventListener('mouseenter', () => dayCell.style.background = '#f0f0f0');
                dayCell.addEventListener('mouseleave', () => dayCell.style.background = 'transparent');

                dayCell.addEventListener('click', () => {
                    ddInput.value = String(day).padStart(2, '0');
                    mmInput.value = String(month + 1).padStart(2, '0');
                    yyInput.value = String(year); // 4-digit year
                    calendarOverlay.style.display = 'none';
                });

                calendarGrid.appendChild(dayCell);
            }
        }

        prevBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderCalendar(); });
        nextBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderCalendar(); });
        closeBtn.addEventListener('click', () => calendarOverlay.style.display = 'none');
        calendarOverlay.addEventListener('click', e => { if (e.target === calendarOverlay) calendarOverlay.style.display = 'none'; });

        return { overlay: calendarOverlay, render: renderCalendar };
    }

    const modernCalendar = createModernCalendar();
    calendarBtn.addEventListener('click', e => { e.preventDefault(); modernCalendar.render(); modernCalendar.overlay.style.display = 'flex'; });

    // --------- Input validation ---------
    ddInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 2) mmInput.focus();
        if (parseInt(this.value) > 31) this.value = '31';
    });

    mmInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 2) yyInput.focus();
        if (parseInt(this.value) > 12) this.value = '12';
    });

    yyInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length > 4) this.value = this.value.slice(0, 4);
    });

    phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // --------- Form submission ---------
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!nameInput.value.trim()) { alert('Please enter your name'); nameInput.focus(); return; }
        if (!phoneInput.value.trim()) { alert('Please enter your mobile number'); phoneInput.focus(); return; }
        if (!validateEmail(emailInput.value)) { alert('Please enter a valid email address'); emailInput.focus(); return; }

        const formData = {
            name: nameInput.value,
            birthday: `${ddInput.value}/${mmInput.value}/${yyInput.value}`,
            phone: phoneInput.value,
            email: emailInput.value,
            timestamp: new Date().toISOString()
        };

        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        fetch('https://formspree.io/f/mvgwkvor', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(response => {
                if (response.ok) {
                    submitBtn.textContent = 'Welcome to XFUSED!';
                    submitBtn.style.background = '#28a745';
                    alert('Thank you for joining the XFUSED waitlist!');
                    form.reset();
                } else throw new Error('Submission failed');
            })
            .catch(error => {
                submitBtn.textContent = 'Error - Try Again';
                submitBtn.style.background = '#dc3545';
                alert('Something went wrong. Please try again.');
                console.error('Error:', error);
            })
            .finally(() => {
                setTimeout(() => {
                    submitBtn.textContent = 'Count Me In';
                    submitBtn.style.background = '#533338';
                    submitBtn.disabled = false;
                }, 3000);
            });
    });

    // --------- Input focus effect ---------
    document.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('focus', () => input.parentElement.style.transform = 'scale(1.02)');
        input.addEventListener('blur', () => input.parentElement.style.transform = 'scale(1)');
    });

    // --------- Smooth scroll ---------
    const scrollBtn = document.getElementById("scroll-btn");
    const formContainer = document.querySelector(".form-container");
    scrollBtn.addEventListener("click", () => { formContainer.scrollIntoView({ behavior: "smooth", block: "start" }); });

    // --------- Countdown timer ---------
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');

    let days = 100, hours = 1, minutes = 29, seconds = 20;

    function updateDisplay() {
        daysElement.textContent = String(days).padStart(2, '0');
        hoursElement.textContent = String(hours).padStart(2, '0');
        minutesElement.textContent = String(minutes).padStart(2, '0');
        secondsElement.textContent = String(seconds).padStart(2, '0');
    }

    function startCountdown() {
        setInterval(() => {
            if (seconds > 0) seconds--;
            else if (minutes > 0) { minutes--; seconds = 59; }
            else if (hours > 0) { hours--; minutes = 59; seconds = 59; }
            else if (days > 0) { days--; hours = 23; minutes = 59; seconds = 59; }
            updateDisplay();
        }, 1000);
    }

    updateDisplay();
    startCountdown();
});
