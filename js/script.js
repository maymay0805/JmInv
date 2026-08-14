const frontScene = document.getElementById('frontScene');
const backScene = document.getElementById('backScene');
const openBtn = document.getElementById('openInvitation');
const soundBtn = document.getElementById('soundToggle');
const viewInvitationBtn = document.getElementById('viewInvitationBtn');
const invitationModal = document.getElementById('invitationModal');
const closeModalBtn = document.getElementById('closeModal');
const modalOverlay = document.getElementById('modalOverlay');
const rsvpButton = document.querySelector('.secondary-btn');
const rsvpSection = document.getElementById('rsvpSection');
const audio = document.getElementById('happyBirthdayAudio');

// Prevent scroll on front scene by default
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';

if (openBtn) {
  openBtn.addEventListener('click', () => {
    frontScene.classList.add('is-hidden');
    backScene.classList.add('is-visible');
    // Allow scroll when back scene is visible - back scene will handle its own overflow
    // Play audio when back scene opens
    audio.play().catch(err => console.log('Autoplay failed:', err));
  });
}

if (soundBtn) {
  soundBtn.addEventListener('click', () => {
    const icon = soundBtn.querySelector('i');
    if (audio.paused) {
      audio.play();
      icon.classList.remove('fa-volume-off');
      icon.classList.add('fa-volume-high');
    } else {
      audio.pause();
      icon.classList.remove('fa-volume-high');
      icon.classList.add('fa-volume-off');
    }
  });
}

// Modal functionality
if (viewInvitationBtn) {
  viewInvitationBtn.addEventListener('click', () => {
    invitationModal.classList.add('is-active');
  });
}

function closeInvitationModal() {
  if (invitationModal) {
    invitationModal.classList.remove('is-active');
  }
}

function scrollToRsvp() {
  if (rsvpSection) {
    rsvpSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    closeInvitationModal();
  });
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', () => {
    closeInvitationModal();
  });
}

if (rsvpButton && rsvpSection) {
  rsvpButton.addEventListener('click', () => {
    closeInvitationModal();
    scrollToRsvp();
  });
}

const invitationRsvpBtn = document.querySelector('.rsvp-btn');
if (invitationRsvpBtn) {
  invitationRsvpBtn.addEventListener('click', () => {
    closeInvitationModal();
    scrollToRsvp();
  });
}

// Countdown Timer
function updateCountdown() {
  // Birthday: September 1, 2026 at 2:00 PM
  const birthdayDate = new Date('2026-09-01T14:00:00').getTime();
  const now = new Date().getTime();
  const difference = birthdayDate - now;

  if (difference > 0) {
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
  }
}

// Update countdown every second
updateCountdown();
setInterval(updateCountdown, 1000);

// Attendance buttons functionality
const attendanceBtns = document.querySelectorAll('.attendance-btn');
const attendanceInput = document.getElementById('attendance');

attendanceBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    attendanceBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (attendanceInput) {
      attendanceInput.value = btn.dataset.value;
    }
  });
});

// RSVP Form submission
const rsvpForm = document.getElementById('rsvpForm');
if (rsvpForm) {
  rsvpForm.addEventListener('submit', (e) => {
    // Allow formspree to handle the submission naturally
    // The form will post to formspree endpoint
    console.log('RSVP Form submitted to Formspree');
  });
}
