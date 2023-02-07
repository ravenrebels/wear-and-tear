import { getMnemonic, setMnemonic } from "../mnemonicHandler";
class Words extends HTMLElement {
  connectedCallback() {
    const mnemonic = getMnemonic();
    this.innerHTML = `
    <article>
        <h2>Advanced</h2>
        <label for="switch">
        <input 
            type="checkbox" 
            id="switch" 
            name="show" 
            role="switch">
        Show my secret password
      </label>
        <form style="display:none">
        <p><i>Write down or copy these words to be able to restore your tokens later</i></p>
            <textarea name="words">${mnemonic}</textarea>
            <button type="submit">Save</button>
           
        </form>
    </article>`;

    function submitListener(event) {
      event.preventDefault();
      const text = this.querySelector("[name=words]").value;
      alert("text " + text);
      setMnemonic(text);
    }
    this.querySelector("form").addEventListener("submit", submitListener);

    const show = this.querySelector("[name='show']");

    show.addEventListener("change", (event) => {
      event.preventDefault();
      const form = this.querySelector("form");

      const willShow = event.target.checked;

      form.style.display = willShow ? "block" : "none";
    });
  }
}

customElements.define("rr-words", Words);
