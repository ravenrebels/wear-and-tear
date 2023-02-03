export function getTokenName() {
  const defaultToken = "LEMONADE";

  let params = new URLSearchParams(window.location.search);
  if (params.has("asset")) {
    return params.get("asset");
  }
  return defaultToken;
}
