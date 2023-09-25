const $url = document.querySelector('#url');
const $img = document.querySelector('img');
const $form = document.querySelector('form');

$url.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});
// const $allLi = document.querySelectorAll('li');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  const obj = {
    entryId: data.nextEntryId,
    title: $form.elements.title.value,
    photoUrl: $form.elements.url.value,
    notes: $form.elements.notes.value,
  };
  if (data.editing === null) {
    data.entries.unshift(obj);
    data.nextEntryId++;

    $ul.prepend(renderEntry(obj));
  } else {
    const $allLi = document.querySelectorAll('li');

    for (let i = 0; i < data.entries.length; i++) {
      if (data.editing.entryId === data.entries[i].entryId) {
        data.entries[i].title = $form.elements.title.value;
        data.entries[i].photoUrl = $form.elements.url.value;
        data.entries[i].notes = $form.elements.notes.value;
        $allLi[i].replaceWith(renderEntry(data.entries[i]));
      }
    }
  }
  $form.reset();
  data.editing = null;
  viewSwap('entries');
  toggleNoEntries();
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
});

function renderEntry(entry) {
  const $li = document.createElement('li');
  $li.setAttribute('class', 'row');
  $li.setAttribute('data-entry-id', entry.entryId);
  $ul.append($li);

  const $div = document.createElement('div');
  $div.setAttribute('class', 'column-half');
  $li.append($div);

  const $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.alt = 'User input image';
  $div.append($img);

  const $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half');
  $li.append($div2);

  const $rowDiv = document.createElement('div');
  $rowDiv.setAttribute('class', 'row');
  $div2.append($rowDiv);

  const $div3 = document.createElement('div');
  $div3.setAttribute('class', 'pencil-column');
  $rowDiv.append($div3);

  const $title = document.createElement('h3');
  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa fa-pencil');
  $pencil.setAttribute('aria-hidden', 'true');
  $pencil.setAttribute('id', 'pencil');
  $div3.append($title);
  $div3.append($pencil);
  $title.textContent = entry.title;

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $div2.append($notes);

  return $li;
}

const $ul = document.querySelector('ul');
const $title = document.querySelector('#title');
const $notes = document.querySelector('#notes');
const $entryImg = document.querySelector('#entry-image');
const $editEntry = document.querySelector('#edit-entry');
// const $save = document.querySelector("#save");
const $delete = document.querySelector('#delete');
const $hdnCol = document.querySelector('.hidden-column');
$delete.addEventListener('click', function (event) {
  $hdnCol.style.display = 'inline-block';
  $container2.setAttribute('class', 'container2');
});

const $cancel = document.querySelector('#cancel');
const $container2 = document.querySelector('.container2');
$cancel.addEventListener('click', function (event) {
  $hdnCol.style.display = 'none';
  $container2.setAttribute('class', 'hidden');
});

const $confirm = document.querySelector('#confirm');
$confirm.addEventListener('click', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      const $allLi = document.querySelectorAll('li');

      $allLi[i].remove(data.entries[i]);
      viewSwap('entries');
      toggleNoEntries();
      $hdnCol.style.display = 'none';
      $container2.setAttribute('class', 'hidden');
      $form.reset();
      data.editing = null;
    }
  }
});

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    $delete.style.visibility = 'visible';
    viewSwap('entry-form');
    const dataId = Number(
      event.target.closest('li').getAttribute('data-entry-id')
    );

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === dataId) {
        data.editing = data.entries[i];
        $editEntry.textContent = 'Edit Entry';
        $title.value = data.editing.title;
        $url.value = data.editing.photoUrl;
        $notes.value = data.editing.notes;
        $entryImg.setAttribute('src', data.editing.photoUrl);
        $editEntry.textContent = 'Edit Entry';
      }
    }
  }
});

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $newLi = renderEntry(data.entries[i]);
    $ul.append($newLi);
  }
  viewSwap(data.view);
  toggleNoEntries();
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
    $form.reset();
  }
});

const $newEntry = document.querySelector('.new');
$newEntry.addEventListener('click', function (event) {
  $form.reset();
  $editEntry.textContent = 'New Entry';
  $img.setAttribute('src', './images/placeholder-image-square.jpg');
  $delete.style.visibility = 'hidden';
  viewSwap('entry-form');
});
