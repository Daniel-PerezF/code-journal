const $url = document.querySelector('#url');
const $img = document.querySelector('img');

$url.addEventListener('input', function (event) {
  $img.setAttribute('src', event.target.value);
});

const $form = document.querySelector('#entry-form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const obj = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.url.value,
    notes: $form.elements.notes.value,
  };
  return obj;
});
