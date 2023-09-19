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
});
