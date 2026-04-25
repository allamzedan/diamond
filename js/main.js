'use strict';

const EMAIL_ADDRESS = 'domains@mazajcontent.com';

function showToast() {
  const toast = document.getElementById('toast');

  if (!toast) {
    return;
  }

  toast.classList.add('show');

  window.setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');

  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'absolute';
  textarea.style.left = '-9999px';

  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

function copyEmail(email) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(email).then(showToast).catch(() => {
      fallbackCopyText(email);
      showToast();
    });

    return;
  }

  fallbackCopyText(email);
  showToast();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-copy-email]').forEach((button) => {
    button.addEventListener('click', () => {
      copyEmail(button.dataset.copyEmail || EMAIL_ADDRESS);
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.value-card, .buyer-card, .marketplace-panel').forEach((element) => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
  });
});