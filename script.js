const mobileToggle = document.querySelector('.mobile-menu-toggle');
const siteNav = document.querySelector('.site-nav');
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const bookingForm = document.getElementById('booking-form');
const bookingMessage = document.getElementById('booking-message');
const dateInput = document.getElementById('date');

if (mobileToggle && siteNav) {
  mobileToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    galleryItems.forEach((item) => {
      const category = item.dataset.category;
      item.style.display = filter === 'all' || category === filter ? 'block' : 'none';
    });
  });
});

if (dateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  dateInput.min = `${yyyy}-${mm}-${dd}`;
}

if (bookingForm) {
  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = bookingForm.fullName.value.trim();
    const email = bookingForm.email.value.trim();
    const phone = bookingForm.phone.value.trim();
    const service = bookingForm.service.value;
    const date = bookingForm.date.value;
    const time = bookingForm.time.value;

    if (!name || !email || !phone || !service || !date || !time) {
      bookingMessage.textContent = 'Please complete all required fields before submitting.';
      bookingMessage.style.color = '#c03d58';
      return;
    }

    bookingMessage.textContent = `Thank you, ${name}! Your booking request for ${service} on ${date} at ${time} has been received. We'll contact you soon to confirm.`;
    bookingMessage.style.color = '#7c2b45';
    bookingForm.reset();
    if (dateInput) {
      dateInput.min = dateInput.min; // preserve min date after reset
    }
  });
}

const navLinks = document.querySelectorAll('.site-nav a');
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
  });
});
