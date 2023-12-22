import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';
import { spread } from '@open-wc/lit-helpers';

import '@cells-components/cells-template-paper-drawer-panel';
import '@cells-components/cells-skeleton-loading-page';
import '@bbva-web-components/bbva-header-main';
import '@bbva-web-components/bbva-list-movement/bbva-list-movement.js';
import '@bbva-web-components/bbva-help-modal/bbva-help-modal.js';

import '@capacitacion-cells/cells-bbva-header-info-insurnace/cells-bbva-header-info-insurnace.js';
import '@capacitacion-cells/cells-bbva-checkbox/cells-bbva-checkbox.js';

import { getMovements } from '../../scripts/utils/movements-mock.js';
import { normalizeUriString } from '../../scripts/utils/text.js';

import { data } from './data.js';

import styles from './checkbox-page-styles.js';

/* eslint-disable new-cap */
class CheckboxPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'checkbox-page';
  }

  constructor() {
    super();
    this.movements = [];
    this.dataHeader = {
      title: 'Seguros',
      name: 'Mariela Milagros Quispe Minaya',
      document: 12345678
    };
    this.data = data;
  }

  static get properties() {
    return {
      userName: { type: String },
      movements: { type: Array },
      dataHeader: { type: Object },
      data: {type: Array}
    };
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    this._logoutModal = this.shadowRoot.querySelector('#logoutModal');
  }

  onPageEnter() {
    this.subscribe('user_name', (userName) => this.userName = userName);

    if (!this.movements.length) {
      getMovements().then((movements) => {
        this.movements = movements;
      });
    }
  }

  onPageLeave() {

  }

  handleMovementClick({ id, label }) {
    this.publish('movement_title', label);
    this.navigate('movement-detail', { id, label: normalizeUriString(label), });
  }

  get movementList() {
    if (!this.movements.length) {
      return null;
    }

    return this.movements.map((movement) => {
      const movementProperties = this.buildMovementProperties(movement);
      return html`
        <bbva-list-movement
          ...="${spread(movementProperties)}">
        </bbva-list-movement>
      `;
    });
  }

  buildMovementProperties(movement) {
    const { description, label, parsedAmount, parsedAcountingBalance, categoryDescription, badge, icon, product } = movement;

    return {
      ...(description && { 'description': description }),
      ...(label && { 'card-title': label }),
      ...(parsedAmount && { 'amount': parsedAmount.value, 'local-currency': parsedAmount.currency, 'currency-code': parsedAmount.currency }),
      ...(parsedAcountingBalance && { 'secondary-amount': parsedAcountingBalance.value }),
      ...(categoryDescription && { 'concept': categoryDescription }),
      ...(badge && { 'badge-text': badge.label, 'badge-text-type': badge.status }),
      ...(icon && { icon }),
      ...(product && { mask: product }),
      '@click': () => this.handleMovementClick(movement),
      'class': 'bbva-global-semidivider',
      'aria-label': 'Ver detalle del pago con tarjeta',
      'language': 'es',
    };
  }

  _actionButtonCotiza(e) {
    this.navigate('welcome');
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
        <bbva-header-main
             icon-left-primary="coronita:back"
            @header-main-icon-left-primary-click=${() =>  this.navigate('dashboard')}

            icon-left-secondary="coronita:pets"
            @header-main-icon-left-secondary-click=${() => this.navigate('insurance')}

            icon-right-secondary="coronita:mooncar"
            @header-main-icon-right-secondary-click=${() => this.navigate('checkbox')}
            
            icon-right-primary="coronita:communication"
            @header-main-icon-right-primary-click=${() => this.navigate('predictive')}       

            text="SEGUROS VEHICULAR RIMAC - BBVA"
            ></bbva-header-main>  
        </div>

        <div slot="app__main" class="container">
          <cells-bbva-header-info-insurnace
            name=${this.dataHeader.name}
            title=${this.dataHeader.title}
            document=${this.dataHeader.document}
            >
           
          </cells-bbva-header-info-insurnace>
          <div class="card-component">
            <cells-bbva-checkbox 
            title=${this.data.title}
            description=${this.data.description}
            options=${JSON.stringify(this.data.options)}
            @event-button=${this._actionButtonCotiza}>
          </cells-bbva-checkbox>
          </div>

        

          <!-- ${this.movementList ? html`${this.movementList}` : html`<cells-skeleton-loading-page visible></cells-skeleton-loading-page>`} -->

          <!-- <bbva-help-modal
            id="logoutModal"
            header-icon="coronita:info"
            header-text=${this.t('dashboard-page.logout-modal.header')}
            button-text=${this.t('dashboard-page.logout-modal.button')}
            @help-modal-footer-button-click=${() => window.cells.logout()}>
            <div slot="slot-content">
              <span>${this.t('dashboard-page.logout-modal.slot')}</span>
            </div>
          </bbva-help-modal> -->
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(CheckboxPage.is, CheckboxPage);