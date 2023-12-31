/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('code-journal-entries', dataJSON);
});

const journalStorage = localStorage.getItem('code-journal-entries');

if (journalStorage !== null) {
  data = JSON.parse(journalStorage);
}
