const $url = document.querySelector('#url');
const $img = document.querySelector('img');
const $form = document.querySelector('form');

$url.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const obj = {
    entryId: data.nextEntryId,
    title: $form.elements.title.value,
    photoUrl: $form.elements.url.value,
    notes: $form.elements.notes.value,
  };

  data.entries.unshift(obj);
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  data.nextEntryId++;
  $form.reset();
  $ul.prepend(renderEntry(obj));

  if (data.entries.length > 0) {
    toggleNoEntries();
  }
  viewSwap('entries');
});

const $ul = document.querySelector('ul');

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $ul.append($li);

  const $div = document.createElement('div');
  $div.setAttribute('class', 'column-half');
  $li.append($div);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $div.append($img);

  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half');
  $li.append($div2);

  const $title = document.createElement('h3');
  $div2.append($title);
  $title.textContent = entry.title;

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $div2.append($notes);

  return $li;
}

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const newLi = renderEntry(data.entries[i]);
    $ul.append(newLi);
  }
});

function toggleNoEntries() {
  if (data.entries.length > 0) {
    $emptyMes.setAttribute('class', 'hidden no-entry-text');
  } else {
    $emptyMes.setAttribute('class', 'no-entry-text');
  }
}

const $emptyMes = document.querySelector('.no-entry-text');

const $entries = document.querySelector('#entries');
const $entryForm = document.querySelector('#entry-form');

function viewSwap(view) {
  if (view === 'entries') {
    data.view = 'entries';
    $entries.setAttribute('class', '');
    $entryForm.setAttribute('class', 'hidden');
  } else if (view === 'entry-form') {
    data.view = 'entry-form';
    $entryForm.setAttribute('class', '');
    $entries.setAttribute('class', 'hidden');
  }
}

const $entriesTab = document.querySelector('#entries-tab');
$entriesTab.addEventListener('click', function (event) {
  if (event.target === $entriesTab) {
    viewSwap('entries');
  }
});

const $newEntry = document.querySelector('.new');
$newEntry.addEventListener('click', function (event) {
  if (event.target === $newEntry) {
    viewSwap('entry-form');
  }
});
