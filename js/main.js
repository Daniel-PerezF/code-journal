const $url = document.querySelector('#url');
$url.addEventListener('input', handleUrl);

const $img = document.querySelector('img');

function handleUrl(event) {
  $img.setAttribute('src', event.target.value);
}
