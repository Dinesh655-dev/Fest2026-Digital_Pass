const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const navLinks = document.querySelectorAll('.main-nav a');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  });
});

const ticketState = {
  fullName: '',
  rollNumber: '',
  imageUrl: '',
  selectedArtists: [],
  selectedFood: {},
  selectedActivities: [],
  selectedPass: null,
  passPrice: 0,
  ticketId: '',
  generatedAt: '',
};

const artists = [
  { id: 'neon-valley', name: 'Neon Valley', genre: 'INDIE POP', description: 'Glowing hooks and late-night campus anthems.', initials: 'NV', color: '#6666f3' },
  { id: 'raaga-route', name: 'Raaga Route', genre: 'FOLK FUSION', description: 'Classical roots with a restless electric edge.', initials: 'RR', color: '#ff4f87' },
  { id: 'mono-monsoon', name: 'Mono Monsoon', genre: 'ALT ROCK', description: 'Big guitars, bigger choruses, zero holding back.', initials: 'MM', color: '#1a8878' },
  { id: 'dj-azura', name: 'DJ Azura', genre: 'ELECTRONIC', description: 'A sunset-to-starlight set built for the main field.', initials: 'DA', color: '#e2731a' },
  { id: 'the-paper-kites', name: 'Paper Kites', genre: 'ACOUSTIC', description: 'Warm harmonies and songs made for singing along.', initials: 'PK', color: '#8e5ab5' },
  { id: 'southside-collective', name: 'Southside Collective', genre: 'HIP-HOP', description: 'Sharp verses, live beats, and all-out energy.', initials: 'SC', color: '#d73e66' },
];

const foodMenu = [
  { id: 'masala-fries', name: 'Masala Fries', description: 'Crisp fries dusted with tangy house masala.', price: 120, icon: '🍟', color: '#ffbe2e' },
  { id: 'tandoori-wrap', name: 'Tandoori Wrap', description: 'Smoky paneer, crunchy slaw, and mint chutney.', price: 180, icon: '🌯', color: '#ff7047' },
  { id: 'cheese-corn', name: 'Cheese Corn Cup', description: 'Buttery sweet corn with chilli and cheese.', price: 100, icon: '🌽', color: '#7bbf64' },
  { id: 'cold-coffee', name: 'Cold Coffee', description: 'A chilled coffee hit for a long fest day.', price: 90, icon: '🥤', color: '#a76c47' },
  { id: 'momo-box', name: 'Momo Box', description: 'Steamed veg momos with a fiery red dip.', price: 150, icon: '🥟', color: '#ec808b' },
  { id: 'choco-waffle', name: 'Choco Waffle', description: 'Golden waffle with chocolate drizzle.', price: 160, icon: '🧇', color: '#956344' },
];

const activities = [
  { id: 'laser-tag', name: 'Laser Tag Arena', category: 'TEAM GAME', description: 'Suit up for a neon-lit tactical showdown.', price: 140, icon: '🔫', color: '#f45a94' },
  { id: 'escape-room', name: 'Escape Room', category: 'PUZZLE', description: 'Crack the clues before the countdown hits zero.', price: 120, icon: '🔐', color: '#8e5ab5' },
  { id: 'climbing-wall', name: 'Climbing Wall', category: 'ADVENTURE', description: 'Take the colourful route to the top.', price: 100, icon: '🧗', color: '#1a8878' },
  { id: 'arcade-duel', name: 'Arcade Duel', category: 'ARCADE', description: 'Pick a rival and chase a high score.', price: 80, icon: '🕹️', color: '#e2731a' },
  { id: 'paint-splash', name: 'Paint Splash', category: 'CREATIVE', description: 'Make a tiny masterpiece with no rules.', price: 90, icon: '🎨', color: '#6666f3' },
  { id: 'open-mic', name: 'Open Mic Slot', category: 'STAGE', description: 'Claim five minutes and bring your best.', price: 60, icon: '🎤', color: '#d73e66' },
];

const passes = [
  { id: 'bronze', name: 'Bronze', price: 299, description: 'The essential Fest 2026 entry pass.', benefits: ['Festival entry for all four days', 'Access to general stages', 'Digital souvenir pass'] },
  { id: 'silver', name: 'Silver', price: 499, description: 'Extra room for the moments you came for.', benefits: ['Everything in Bronze', 'Fast-track entry lane', 'Reserved zone at the main stage'] },
  { id: 'gold', name: 'Gold', price: 799, description: 'The all-in way to experience the fest.', benefits: ['Everything in Silver', 'Artist meet-and-greet lottery entry', 'Fest 2026 merchandise kit'] },
];

const detailsForm = document.querySelector('#student-details-form');
const fullNameInput = document.querySelector('#full-name');
const rollNumberInput = document.querySelector('#roll-number');
const imageUrlInput = document.querySelector('#image-url');
const previewImage = document.querySelector('#profile-preview');
const previewPlaceholder = document.querySelector('#preview-placeholder');
const previewLoading = document.querySelector('#preview-loading');
const artistsStep = document.querySelector('#artists-step');
const foodStep = document.querySelector('#food-step');
const gamesStep = document.querySelector('#games-step');
const passStep = document.querySelector('#pass-step');
const reviewStep = document.querySelector('#review-step');
const backToDetailsButton = document.querySelector('#back-to-details');
const backToArtistsButton = document.querySelector('#back-to-artists');
const artistGrid = document.querySelector('#artist-grid');
const artistSelectionCount = document.querySelector('#artist-selection-count');
const artistSelectionError = document.querySelector('#artist-selection-error');
const continueToFoodButton = document.querySelector('#continue-to-food');
const backToFoodButton = document.querySelector('#back-to-food');
const continueToGamesButton = document.querySelector('#continue-to-games');
const foodGrid = document.querySelector('#food-grid');
const foodSummaryItems = document.querySelector('#food-summary-items');
const foodSubtotal = document.querySelector('#food-subtotal');
const activityGrid = document.querySelector('#activity-grid');
const activitySummaryItems = document.querySelector('#activity-summary-items');
const activitySubtotal = document.querySelector('#activity-subtotal');
const continueToPassButton = document.querySelector('#continue-to-pass');
const backToGamesButton = document.querySelector('#back-to-games');
const passGrid = document.querySelector('#pass-grid');
const passSummary = document.querySelector('#pass-summary');
const passSelectionError = document.querySelector('#pass-selection-error');
const continueToReviewButton = document.querySelector('#continue-to-review');
const backToPassButton = document.querySelector('#back-to-pass');
const reviewPersonalDetails = document.querySelector('#review-personal-details');
const reviewArtists = document.querySelector('#review-artists');
const reviewFood = document.querySelector('#review-food');
const reviewActivities = document.querySelector('#review-activities');
const reviewPass = document.querySelector('#review-pass');
const reviewPassPrice = document.querySelector('#review-pass-price');
const reviewFoodPrice = document.querySelector('#review-food-price');
const reviewActivitiesPrice = document.querySelector('#review-activities-price');
const reviewTotalPrice = document.querySelector('#review-total-price');
const reviewValidationError = document.querySelector('#review-validation-error');
const generationStatus = document.querySelector('#generation-status');
const generateTicketButton = document.querySelector('#generate-ticket-button');
const finalTicketStep = document.querySelector('#final-ticket-step');
const digitalTicket = document.querySelector('#digital-ticket');
const backToReviewButton = document.querySelector('#back-to-review');
const PASSES_STORAGE_KEY = 'fest2026_passes';
const savedPassesList = document.querySelector('#saved-passes-list');
const passesEmptyMessage = document.querySelector('#passes-empty');
const viewedPassPanel = document.querySelector('#viewed-pass-panel');
const viewedDigitalTicket = document.querySelector('#viewed-digital-ticket');

let imageHasLoaded = false;
let previewTimer;

function showError(input, message) {
  const error = document.querySelector(`#${input.id}-error`);
  input.classList.toggle('is-invalid', Boolean(message));
  input.setAttribute('aria-invalid', String(Boolean(message)));
  error.textContent = message;
}

function isValidImageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function validateTextField(input, label) {
  const value = input.value.trim();
  const message = value ? '' : `${label} is required.`;
  showError(input, message);
  return !message;
}

function validateImageField() {
  const value = imageUrlInput.value.trim();
  let message = '';

  if (value && !isValidImageUrl(value)) {
    message = 'Enter a valid URL beginning with http:// or https://.';
  } else if (value && !imageHasLoaded) {
    message = 'Please use an image URL that loads successfully.';
  }

  showError(imageUrlInput, message);
  return !message;
}

function loadImagePreview() {
  const url = imageUrlInput.value.trim();
  imageHasLoaded = false;
  previewImage.hidden = true;
  previewPlaceholder.hidden = !url;
  previewLoading.hidden = true;

  if (!url) {
    showError(imageUrlInput, '');
    return;
  }

  if (!isValidImageUrl(url)) {
    showError(imageUrlInput, 'Enter a valid URL beginning with http:// or https://.');
    return;
  }

  showError(imageUrlInput, '');
  previewPlaceholder.hidden = true;
  previewLoading.hidden = false;
  previewImage.src = url;
}

function renderArtists() {
  artistGrid.innerHTML = artists.map((artist) => {
    const isSelected = ticketState.selectedArtists.includes(artist.id);
    return `
      <button class="artist-card${isSelected ? ' is-selected' : ''}" type="button" data-artist-id="${artist.id}" aria-pressed="${isSelected}" style="--artist-color: ${artist.color}">
        <span class="artist-avatar" aria-hidden="true">${artist.initials}</span>
        <span class="artist-genre">${artist.genre}</span>
        <strong class="artist-name">${artist.name}</strong>
        <span class="artist-description">${artist.description}</span>
        <span class="artist-select-label">${isSelected ? 'Selected' : 'Select artist'}</span>
      </button>`;
  }).join('');
  const count = ticketState.selectedArtists.length;
  artistSelectionCount.textContent = `${count} artist${count === 1 ? '' : 's'} selected`;
}

function showArtistsStep() {
  detailsForm.hidden = true;
  foodStep.hidden = true;
  gamesStep.hidden = true;
  passStep.hidden = true;
  reviewStep.hidden = true;
  artistsStep.hidden = false;
  renderArtists();
  artistsStep.focus();
}

function formatPrice(price) {
  return `₹${price}`;
}

function getFoodSubtotal() {
  return foodMenu.reduce((total, food) => total + (food.price * (ticketState.selectedFood[food.id] || 0)), 0);
}

function getActivitiesSubtotal() {
  return activities.reduce((total, activity) => (
    ticketState.selectedActivities.includes(activity.id) ? total + activity.price : total
  ), 0);
}

function renderFood() {
  foodGrid.innerHTML = foodMenu.map((food) => {
    const quantity = ticketState.selectedFood[food.id] || 0;
    const controls = quantity === 0
      ? `<button class="food-add-button" type="button" data-food-id="${food.id}" data-food-action="add">Add to food list</button>`
      : `<div class="quantity-controls" aria-label="${food.name} quantity">
          <button type="button" data-food-id="${food.id}" data-food-action="decrease" aria-label="Remove one ${food.name}">−</button>
          <span>${quantity}</span>
          <button type="button" data-food-id="${food.id}" data-food-action="increase" aria-label="Add one ${food.name}">+</button>
        </div>`;
    return `
      <article class="food-card" style="--food-color: ${food.color}">
        <div class="food-card-top"><span class="food-icon" aria-hidden="true">${food.icon}</span><span class="food-price">${formatPrice(food.price)}</span></div>
        <h4 class="food-name">${food.name}</h4>
        <p class="food-description">${food.description}</p>
        <div class="food-card-actions">${controls}</div>
      </article>`;
  }).join('');

  const selectedItems = foodMenu.filter((food) => ticketState.selectedFood[food.id] > 0);
  const subtotal = getFoodSubtotal();
  foodSummaryItems.innerHTML = selectedItems.length === 0
    ? '<p class="empty-order">No food items selected</p>'
    : selectedItems.map((food) => `<div class="summary-item"><span>${food.name} × ${ticketState.selectedFood[food.id]}</span><strong>${formatPrice(food.price * ticketState.selectedFood[food.id])}</strong></div>`).join('');
  foodSubtotal.textContent = formatPrice(subtotal);
}

function showFoodStep() {
  artistsStep.hidden = true;
  gamesStep.hidden = true;
  passStep.hidden = true;
  reviewStep.hidden = true;
  foodStep.hidden = false;
  renderFood();
  foodStep.focus();
}

function renderActivities() {
  activityGrid.innerHTML = activities.map((activity) => {
    const isSelected = ticketState.selectedActivities.includes(activity.id);
    return `
      <article class="activity-card${isSelected ? ' is-selected' : ''}" style="--activity-color: ${activity.color}">
        <div class="activity-card-top"><span class="activity-icon" aria-hidden="true">${activity.icon}</span><span class="food-price">${formatPrice(activity.price)}</span></div>
        <p class="activity-category">${activity.category}</p>
        <h4 class="activity-name">${activity.name}</h4>
        <p class="activity-description">${activity.description}</p>
        <button class="activity-toggle" type="button" data-activity-id="${activity.id}" aria-pressed="${isSelected}">${isSelected ? 'Remove activity' : 'Add activity'}</button>
      </article>`;
  }).join('');

  const selectedItems = activities.filter((activity) => ticketState.selectedActivities.includes(activity.id));
  const subtotal = getActivitiesSubtotal();
  activitySummaryItems.innerHTML = selectedItems.length === 0
    ? '<p class="empty-order">No games or activities selected</p>'
    : selectedItems.map((activity) => `<div class="summary-item"><span>${activity.name}</span><strong>${formatPrice(activity.price)}</strong></div>`).join('');
  activitySubtotal.textContent = formatPrice(subtotal);
}

function showGamesStep() {
  foodStep.hidden = true;
  passStep.hidden = true;
  reviewStep.hidden = true;
  gamesStep.hidden = false;
  renderActivities();
  gamesStep.focus();
}

function renderPasses() {
  passGrid.innerHTML = passes.map((pass) => {
    const isSelected = ticketState.selectedPass === pass.id;
    return `
      <article class="pass-card ${pass.id}${isSelected ? ' is-selected' : ''}">
        <p class="pass-tier">FEST 2026 · ${pass.name.toUpperCase()}</p>
        <h4 class="pass-name">${pass.name}</h4>
        <p class="pass-description">${pass.description}</p>
        <p class="pass-price">${formatPrice(pass.price)}</p>
        <ul class="pass-benefits">${pass.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}</ul>
        <button class="pass-select-button" type="button" data-pass-id="${pass.id}" aria-pressed="${isSelected}">${isSelected ? 'Selected' : `Choose ${pass.name}`}</button>
      </article>`;
  }).join('');
  const selectedPass = passes.find((pass) => pass.id === ticketState.selectedPass);
  passSummary.textContent = selectedPass ? `${selectedPass.name} · ${formatPrice(selectedPass.price)}` : 'No pass selected';
}

function showPassStep() {
  gamesStep.hidden = true;
  reviewStep.hidden = true;
  passStep.hidden = false;
  renderPasses();
  passStep.focus();
}

function renderReview() {
  const selectedArtists = artists.filter((artist) => ticketState.selectedArtists.includes(artist.id));
  const selectedFood = foodMenu.filter((food) => ticketState.selectedFood[food.id] > 0);
  const selectedActivities = activities.filter((activity) => ticketState.selectedActivities.includes(activity.id));
  const selectedPass = passes.find((pass) => pass.id === ticketState.selectedPass);
  const foodSubtotal = getFoodSubtotal();
  const activitiesSubtotal = getActivitiesSubtotal();
  const passPrice = selectedPass ? selectedPass.price : 0;
  const total = passPrice + foodSubtotal + activitiesSubtotal;

  const photo = ticketState.imageUrl
    ? `<img class="review-photo" src="${ticketState.imageUrl}" alt="${ticketState.fullName || 'Student'} profile preview">`
    : '<span class="review-photo-empty" aria-hidden="true">✦</span>';
  reviewPersonalDetails.innerHTML = `<div class="review-personal">${photo}<div><p class="review-primary">${ticketState.fullName || 'Name not provided'}</p><p class="review-secondary">${ticketState.rollNumber || 'Roll number not provided'}</p></div></div>`;
  reviewArtists.innerHTML = selectedArtists.length === 0
    ? '<p class="none-selected">None selected</p>'
    : `<ul class="review-list">${selectedArtists.map((artist) => `<li><span>${artist.name}</span><span>${artist.genre}</span></li>`).join('')}</ul>`;
  reviewFood.innerHTML = selectedFood.length === 0
    ? '<p class="none-selected">None selected</p>'
    : `<ul class="review-list">${selectedFood.map((food) => `<li><span>${food.name} × ${ticketState.selectedFood[food.id]} <small>(${formatPrice(food.price)} each)</small></span><span>${formatPrice(food.price * ticketState.selectedFood[food.id])}</span></li>`).join('')}<li><strong>Food subtotal</strong><strong>${formatPrice(foodSubtotal)}</strong></li></ul>`;
  reviewActivities.innerHTML = selectedActivities.length === 0
    ? '<p class="none-selected">None selected</p>'
    : `<ul class="review-list">${selectedActivities.map((activity) => `<li><span>${activity.name}</span><span>${formatPrice(activity.price)}</span></li>`).join('')}<li><strong>Activities subtotal</strong><strong>${formatPrice(activitiesSubtotal)}</strong></li></ul>`;
  reviewPass.innerHTML = selectedPass
    ? `<h4 class="review-pass-name">${selectedPass.name} Pass · ${formatPrice(selectedPass.price)}</h4><p class="review-pass-description">${selectedPass.description}</p><ul class="review-benefits">${selectedPass.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}</ul>`
    : '<p class="none-selected">None selected</p>';
  reviewPassPrice.textContent = formatPrice(passPrice);
  reviewFoodPrice.textContent = formatPrice(foodSubtotal);
  reviewActivitiesPrice.textContent = formatPrice(activitiesSubtotal);
  reviewTotalPrice.textContent = formatPrice(total);
}

function showReviewStep() {
  passStep.hidden = true;
  finalTicketStep.hidden = true;
  reviewStep.hidden = false;
  reviewValidationError.textContent = '';
  generationStatus.textContent = '';
  renderReview();
  reviewStep.focus();
}

function createTicketId() {
  const random = globalThis.crypto?.randomUUID
    ? crypto.randomUUID().replaceAll('-', '').slice(0, 10)
    : `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  return `FEST26-${random.toUpperCase()}`;
}

function getSavedPasses() {
  try {
    const parsed = JSON.parse(localStorage.getItem(PASSES_STORAGE_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeSavedPasses(records) {
  localStorage.setItem(PASSES_STORAGE_KEY, JSON.stringify(records));
}

function buildPassRecord() {
  const selectedPass = passes.find((item) => item.id === ticketState.selectedPass);
  return {
    ticketId: ticketState.ticketId,
    fullName: ticketState.fullName,
    rollNumber: ticketState.rollNumber,
    imageUrl: ticketState.imageUrl,
    selectedPass: ticketState.selectedPass,
    passName: selectedPass ? selectedPass.name : '',
    passPrice: ticketState.passPrice,
    selectedArtists: [...ticketState.selectedArtists],
    selectedFood: { ...ticketState.selectedFood },
    selectedActivities: [...ticketState.selectedActivities],
    finalPrice: ticketState.passPrice + getFoodSubtotal() + getActivitiesSubtotal(),
    generatedAt: ticketState.generatedAt,
  };
}

function saveGeneratedPass(record) {
  const existing = getSavedPasses();
  if (existing.some((pass) => pass.ticketId === record.ticketId)) {
    return;
  }
  existing.push(record);
  writeSavedPasses(existing);
}

function hideViewedPass() {
  viewedPassPanel.hidden = true;
  viewedPassPanel.removeAttribute('data-ticket-id');
  viewedDigitalTicket.innerHTML = '';
}

function deleteSavedPass(ticketId) {
  writeSavedPasses(getSavedPasses().filter((pass) => pass.ticketId !== ticketId));
  if (viewedPassPanel.dataset.ticketId === ticketId) {
    hideViewedPass();
  }
  renderSavedPasses();
}

function renderDigitalTicket(container, data) {
  const pass = passes.find((item) => item.id === data.selectedPass);
  const passName = (pass ? pass.name : data.passName || 'Pass').toUpperCase();
  const selectedArtists = data.selectedArtists || [];
  const selectedFood = data.selectedFood || {};
  const selectedActivities = data.selectedActivities || [];
  const artistNames = artists.filter((item) => selectedArtists.includes(item.id)).map((item) => item.name).join(', ');
  const food = foodMenu.filter((item) => selectedFood[item.id] > 0).map((item) => `${item.name} × ${selectedFood[item.id]}`).join(', ') || 'No food selected';
  const activitiesText = activities.filter((item) => selectedActivities.includes(item.id)).map((item) => item.name).join(', ') || 'No activities selected';
  const total = data.finalPrice ?? (Number(data.passPrice) || 0);
  const initials = (data.fullName || '').split(' ').map((name) => name[0]).filter(Boolean).join('').slice(0, 2).toUpperCase();
  const photo = data.imageUrl ? `<img class="ticket-photo" src="${data.imageUrl}" alt="${data.fullName}">` : `<span class="ticket-avatar">${initials}</span>`;
  container.innerHTML = `<div class="ticket-row"><span>FEST 2026</span><span>DIGITAL PASS</span></div><div class="ticket-person">${photo}<div><p class="ticket-name">${data.fullName}</p><p class="ticket-roll">${data.rollNumber}</p></div></div><div class="ticket-details"><div><p class="ticket-label">PASS · ${passName}</p><p>${artistNames}</p><p>${food}</p><p>${activitiesText}</p></div><div><p class="ticket-label">PASS NO.</p><p>${data.ticketId}</p><p class="ticket-label">ISSUED</p><p>${data.generatedAt}</p></div></div><div class="ticket-total"><span>FINAL PRICE</span><span>${formatPrice(total)}</span></div>`;
  container.querySelector('.ticket-photo')?.addEventListener('error', (event) => {
    event.target.replaceWith(Object.assign(document.createElement('span'), { className: 'ticket-avatar', textContent: initials }));
  });
}

function renderFinalTicket() {
  renderDigitalTicket(digitalTicket, buildPassRecord());
}

function viewSavedPass(ticketId) {
  const record = getSavedPasses().find((pass) => pass.ticketId === ticketId);
  if (!record) return;
  viewedPassPanel.hidden = false;
  viewedPassPanel.dataset.ticketId = ticketId;
  renderDigitalTicket(viewedDigitalTicket, record);
  viewedPassPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSavedPasses() {
  const records = getSavedPasses();
  passesEmptyMessage.hidden = records.length > 0;
  savedPassesList.hidden = records.length === 0;
  savedPassesList.innerHTML = records.map((record) => `
    <article class="saved-pass-card">
      <p class="saved-pass-kicker">FEST 2026</p>
      <h3 class="saved-pass-name">${record.fullName}</h3>
      <p class="saved-pass-meta">${record.passName} Pass</p>
      <p class="saved-pass-id">${record.ticketId}</p>
      <p class="saved-pass-price">${formatPrice(record.finalPrice)}</p>
      <p class="saved-pass-date">${record.generatedAt}</p>
      <div class="saved-pass-actions">
        <button class="button button-primary" type="button" data-pass-action="view" data-ticket-id="${record.ticketId}">View Pass</button>
        <button class="button button-outline" type="button" data-pass-action="delete" data-ticket-id="${record.ticketId}">Delete</button>
      </div>
    </article>
  `).join('');
}

function validateTicketForGeneration() {
  const missing = [];
  if (!ticketState.fullName) missing.push('full name');
  if (!ticketState.rollNumber) missing.push('roll number');
  if (ticketState.selectedArtists.length === 0) missing.push('at least one artist');
  if (!ticketState.selectedPass) missing.push('a pass');
  return missing;
}

function updateProgress(currentStep) {
  document.querySelectorAll('.progress-steps li').forEach((step, index) => {
    step.classList.toggle('current', index === currentStep - 1);
  });
}

previewImage.addEventListener('load', () => {
  imageHasLoaded = true;
  previewLoading.hidden = true;
  previewImage.hidden = false;
  showError(imageUrlInput, '');
});

previewImage.addEventListener('error', () => {
  imageHasLoaded = false;
  previewImage.hidden = true;
  previewLoading.hidden = true;
  previewPlaceholder.hidden = false;
  showError(imageUrlInput, 'We couldn’t load that image. Check the link and try another one.');
});

[fullNameInput, rollNumberInput].forEach((input) => {
  input.addEventListener('input', () => {
    ticketState[input.name] = input.value.trim();
    if (input.classList.contains('is-invalid')) {
      validateTextField(input, input === fullNameInput ? 'Full name' : 'Institute roll number');
    }
  });
});

imageUrlInput.addEventListener('change', loadImagePreview);
imageUrlInput.addEventListener('blur', loadImagePreview);
imageUrlInput.addEventListener('input', () => {
  ticketState.imageUrl = imageUrlInput.value.trim();
  imageHasLoaded = false;
  window.clearTimeout(previewTimer);
  previewTimer = window.setTimeout(loadImagePreview, 450);
});

detailsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const isNameValid = validateTextField(fullNameInput, 'Full name');
  const isRollNumberValid = validateTextField(rollNumberInput, 'Institute roll number');
  const isImageValid = validateImageField();

  if (!isNameValid || !isRollNumberValid || !isImageValid) {
    return;
  }

  Object.assign(ticketState, {
    fullName: fullNameInput.value.trim(),
    rollNumber: rollNumberInput.value.trim(),
    imageUrl: imageUrlInput.value.trim(),
  });
  updateProgress(2);
  showArtistsStep();
});

backToDetailsButton.addEventListener('click', () => {
  artistsStep.hidden = true;
  detailsForm.hidden = false;
  updateProgress(1);
  fullNameInput.focus();
});

artistGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.artist-card');
  if (!card) return;

  const { artistId } = card.dataset;
  const selectedIndex = ticketState.selectedArtists.indexOf(artistId);
  if (selectedIndex === -1) {
    ticketState.selectedArtists.push(artistId);
  } else {
    ticketState.selectedArtists.splice(selectedIndex, 1);
  }

  artistSelectionError.textContent = '';
  renderArtists();
});

continueToFoodButton.addEventListener('click', () => {
  if (ticketState.selectedArtists.length === 0) {
    artistSelectionError.textContent = 'Select at least one artist to continue.';
    return;
  }

  updateProgress(3);
  showFoodStep();
});

backToArtistsButton.addEventListener('click', () => {
  updateProgress(2);
  showArtistsStep();
});

foodGrid.addEventListener('click', (event) => {
  const control = event.target.closest('[data-food-action]');
  if (!control) return;

  const { foodId, foodAction } = control.dataset;
  const currentQuantity = ticketState.selectedFood[foodId] || 0;
  if (foodAction === 'add' || foodAction === 'increase') {
    ticketState.selectedFood[foodId] = currentQuantity + 1;
  } else if (foodAction === 'decrease') {
    if (currentQuantity <= 1) {
      delete ticketState.selectedFood[foodId];
    } else {
      ticketState.selectedFood[foodId] = currentQuantity - 1;
    }
  }
  renderFood();
});

continueToGamesButton.addEventListener('click', () => {
  updateProgress(4);
  showGamesStep();
});

backToFoodButton.addEventListener('click', () => {
  updateProgress(3);
  showFoodStep();
});

activityGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-activity-id]');
  if (!button) return;

  const { activityId } = button.dataset;
  const selectedIndex = ticketState.selectedActivities.indexOf(activityId);
  if (selectedIndex === -1) {
    ticketState.selectedActivities.push(activityId);
  } else {
    ticketState.selectedActivities.splice(selectedIndex, 1);
  }
  renderActivities();
});

continueToPassButton.addEventListener('click', () => {
  updateProgress(5);
  showPassStep();
});

backToGamesButton.addEventListener('click', () => {
  updateProgress(4);
  showGamesStep();
});

passGrid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-pass-id]');
  if (!button) return;

  const pass = passes.find((item) => item.id === button.dataset.passId);
  ticketState.selectedPass = pass.id;
  ticketState.passPrice = pass.price;
  passSelectionError.textContent = '';
  renderPasses();
});

continueToReviewButton.addEventListener('click', () => {
  if (!ticketState.selectedPass) {
    passSelectionError.textContent = 'Choose a pass to continue to review.';
    return;
  }

  passStep.hidden = true;
  updateProgress(6);
  showReviewStep();
});

backToPassButton.addEventListener('click', () => {
  reviewStep.hidden = true;
  updateProgress(5);
  showPassStep();
});

generateTicketButton.addEventListener('click', () => {
  const missing = validateTicketForGeneration();
  if (missing.length > 0) {
    reviewValidationError.textContent = `Complete ${missing.join(', ')} before generating your ticket.`;
    generationStatus.textContent = '';
    return;
  }

  ticketState.ticketId = createTicketId();
  ticketState.generatedAt = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  reviewValidationError.textContent = '';
  reviewStep.hidden = true;
  finalTicketStep.hidden = false;
  saveGeneratedPass(buildPassRecord());
  renderSavedPasses();
  renderFinalTicket();
  finalTicketStep.focus();
});

backToReviewButton.addEventListener('click', () => {
  finalTicketStep.hidden = true;
  showReviewStep();
});

savedPassesList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-pass-action]');
  if (!button) return;

  const { passAction, ticketId } = button.dataset;
  if (passAction === 'view') {
    viewSavedPass(ticketId);
  } else if (passAction === 'delete') {
    deleteSavedPass(ticketId);
  }
});

renderSavedPasses();
