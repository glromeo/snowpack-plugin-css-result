import {html, LitElement} from "lit-element";

import styles from "./styles.scss";

customElements.define("hello-world", class HelloWorld extends LitElement {

    static styles = [styles];

    render() {
        return html`
            <div class="ribbon"><span>It works!</span></div>
        `;
    }
})