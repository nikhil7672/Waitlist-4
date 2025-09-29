// Modern calendar & form submission script
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const nameInput = document.querySelector('input[placeholder="Your Name What Should We Call You?"]');
    const ddInput = document.querySelector('input[placeholder="DD"]');
    const mmInput = document.querySelector('input[placeholder="MM"]');
    const yyInput = document.querySelector('input[placeholder="YY"]');
    const phoneInput = document.querySelector('input[placeholder="Mobile Number (For Launch Updates)"]');
    const emailInput = document.querySelector('input[placeholder="Email (Where We\'ll Send Your Invite)"]');
    const calendarBtn = document.querySelector('.calendar-btn');
    const submitBtn = document.querySelector('.submit-btn');

    // Create modern calendar popup
    function createModernCalendar() {
        const calendarOverlay = document.createElement('div');
        calendarOverlay.className = 'calendar-overlay';
        calendarOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
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
        prevBtn.innerHTML = '←';
        prevBtn.type = 'button';
        prevBtn.style.cssText = `
            background: #f0f0f0;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
        `;

        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '→';
        nextBtn.type = 'button';
        nextBtn.style.cssText = `
            background: #f0f0f0;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
        `;

        const calendarGrid = document.createElement('div');
        calendarGrid.style.cssText = `
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
            margin-bottom: 20px;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.textContent = 'Close';
        closeBtn.type = 'button';
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
            
            monthYear.textContent = `${currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
            
            calendarGrid.innerHTML = '';
            
            // Day headers
            const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayHeaders.forEach(day => {
                const dayHeader = document.createElement('div');
                dayHeader.textContent = day;
                dayHeader.style.cssText = `
                    text-align: center;
                    font-weight: bold;
                    padding: 10px 5px;
                    color: #666;
                `;
                calendarGrid.appendChild(dayHeader);
            });

            const firstDay = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            for (let i = 0; i < firstDay; i++) {
                const emptyDay = document.createElement('div');
                calendarGrid.appendChild(emptyDay);
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayCell = document.createElement('div');
                dayCell.textContent = day;
                dayCell.style.cssText = `
                    text-align: center;
                    padding: 10px 5px;
                    cursor: pointer;
                    border-radius: 8px;
                    transition: all 0.2s;
                `;

                dayCell.addEventListener('mouseenter', function() {
                    this.style.background = '#f0f0f0';
                });

                dayCell.addEventListener('mouseleave', function() {
                    this.style.background = 'transparent';
                });

                dayCell.addEventListener('click', function() {
                    const selectedDay = String(day).padStart(2, '0');
                    const selectedMonth = String(month + 1).padStart(2, '0');
                    const selectedYear = String(year).slice(-2);

                    ddInput.value = selectedDay;
                    mmInput.value = selectedMonth;
                    yyInput.value = selectedYear;

                    calendarOverlay.style.display = 'none';
                });

                calendarGrid.appendChild(dayCell);
            }
        }

        prevBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        nextBtn.addEventListener('click', function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        closeBtn.addEventListener('click', function() {
            calendarOverlay.style.display = 'none';
        });

        calendarOverlay.addEventListener('click', function(e) {
            if (e.target === calendarOverlay) {
                calendarOverlay.style.display = 'none';
            }
        });

        return { overlay: calendarOverlay, render: renderCalendar };
    }

    const modernCalendar = createModernCalendar();

    // Calendar button
    calendarBtn.addEventListener('click', function(e) {
        e.preventDefault();
        modernCalendar.render();
        modernCalendar.overlay.style.display = 'flex';
    });

    // Birthday input validation
    ddInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 2) mmInput.focus();
        if (parseInt(this.value) > 31) this.value = '31';
    });

    mmInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 2) yyInput.focus();
        if (parseInt(this.value) > 12) this.value = '12';
    });

    yyInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Phone validation
    phoneInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9+]/g, '');
    });

    // Email validation
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!nameInput.value.trim()) {
            alert('Please enter your name');
            nameInput.focus();
            return;
        }

        if (!phoneInput.value.trim()) {
            alert('Please enter your mobile number');
            phoneInput.focus();
            return;
        }

        if (!validateEmail(emailInput.value)) {
            alert('Please enter a valid email address');
            emailInput.focus();
            return;
        }

        const formData = {
            name: nameInput.value,
            birthday: `${ddInput.value}/${mmInput.value}/${yyInput.value}`,
            phone: phoneInput.value,
            email: emailInput.value,
            timestamp: new Date().toISOString()
        };

        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        // --- Send to Formspree ---
        fetch('https://mail.google.com/mail/u/4/#inbox', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                submitBtn.textContent = 'Welcome to XFUSED!';
                submitBtn.style.background = '#28a745';
                alert('Thank you for joining the XFUSED waitlist!');
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
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

    // Input focus effects
    const inputs = document.querySelectorAll('.form-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll to form
    const scrollBtn = document.getElementById("scroll-btn");
    const formContainer = document.querySelector(".form-container");

    scrollBtn.addEventListener("click", () => {
        formContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// Initial values
let days = 100;
let hours = 1;
let minutes = 29;
let seconds = 20;

let countdownInterval;

// Update the display
function updateDisplay() {
  daysElement.textContent = days.toString().padStart(2, '0');
  hoursElement.textContent = hours.toString().padStart(2, '0');
  minutesElement.textContent = minutes.toString().padStart(2, '0');
  secondsElement.textContent = seconds.toString().padStart(2, '0');
}

// Start the countdown immediately
function startCountdown() {
  countdownInterval = setInterval(() => {
    if (seconds > 0) {
      seconds--;
    } else if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else if (hours > 0) {
      hours--;
      minutes = 59;
      seconds = 59;
    } else if (days > 0) {
      days--;
      hours = 23;
      minutes = 59;
      seconds = 59;
    } else {
      clearInterval(countdownInterval);
      return;
    }
    updateDisplay();
  }, 1000);
}

// Initialize
updateDisplay();
startCountdown();
