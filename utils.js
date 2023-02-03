export function getty(id) {
  return document.getElementById(id);
}
export function updateDOM(id, value) {
  const d = getty(id);
  if (d) {
    d.innerHTML = value;
  } else {
    console.error("Could not update DOM", id, "not found");
  }
}
