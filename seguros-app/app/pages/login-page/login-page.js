import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';

import '@cells-components/cells-template-paper-drawer-panel';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-form-field';
import '@bbva-web-components/bbva-form-password';
import '@bbva-web-components/bbva-button-default';
import '@bbva-web-components/bbva-form-toggle';

import styles from './login-page-styles.js';

import { cleanUp } from '../../scripts/utils/movements-mock';

import { default as darkModeStyles } from '../../scripts/appDarkMode-themeStyles.js';
import { setDocumentComponentsDarkModeStyles } from '@bbva-web-components/bbva-core-lit-helpers/src/BbvaCoreLitThemeHelpers';

setDocumentComponentsDarkModeStyles([ darkModeStyles ]);

/* eslint-disable new-cap */
class LoginPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'login-page';
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    this._userInput = this.shadowRoot.querySelector('#user');
    this._passwordInput = this.shadowRoot.querySelector('#password');
  }

  toggleDarkMode() {
    if (document.querySelector(':root').getAttribute('color-scheme-dark') === 'true') {
      document.querySelector(':root').removeAttribute('color-scheme-dark');
    } else {
      document.querySelector(':root').setAttribute('color-scheme-dark', 'true');
    }
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
          <bbva-header-main
            text="BBVA">
          </bbva-header-main>
          <bbva-form-toggle
            label="Theme" radio="" tag-on="🌙" value="night"
            tag-off="☀️" value-off="day"
            @change=${this.toggleDarkMode}>
          </bbva-form-toggle>
        </div>

        <div slot="app__main" class="container">
          <bbva-form-field
            id="user"
            validate-on-blur
            label=${this.t('login-page.user-input')}
            required>
          </bbva-form-field>

          <bbva-form-password
            id="password"
            validate-on-blur
            label=${this.t('login-page.password-input')}
            required>
          </bbva-form-password>

          <bbva-button-default
            @click=${this.handleValidation}>
              ${this.t('login-page.button')}
          </bbva-button-default>
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  handleValidation() {
    let canContinue = true;

    [this._userInput, this._passwordInput].forEach((el) => (el.validate(), el.invalid && (canContinue = false)));

    if (canContinue) {
      this.publish('user_name', this._userInput.value);
      this.navigate('dashboard');
    }
  }

  onPageEnter() {
    // Cada vez que accedamos al login, simulamos una limpieza de los datos almacenados en memoria.
    cleanUp();
  }

  onPageLeave() {
    // Cada vez que salgamos del login, limpiamos las cajas de texto.
    setTimeout(() => [this._userInput, this._passwordInput].forEach((el) => el.clearInput()), 3 * 1000);
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(LoginPage.is, LoginPage);