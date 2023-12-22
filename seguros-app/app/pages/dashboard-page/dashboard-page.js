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
import '@capacitacion-cells/cells-bbva-card-insurance/cells-bbva-card-insurance.js';
import '@bbva-web-components/bbva-web-header-public-web/bbva-web-header-public-web.js';

import { getMovements } from '../../scripts/utils/movements-mock.js';
import { normalizeUriString } from '../../scripts/utils/text.js';

import { data } from './data.js';

import styles from './dashboard-page-styles.js';

/* eslint-disable new-cap */
class DashboardPage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'dashboard-page';
  }

  constructor() {
    super();
    this.movements = [];
    this.dataHeader = {
      title: 'Seguros',
      name: '',
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
    this.publish('segure_detail', e.detail);
    this.navigate('predictive');
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">          
          <bbva-header-main
             icon-left-primary="coronita:back"
            @header-main-icon-left-primary-click=${() =>  this.navigate('login')}

            icon-left-secondary="coronita:pets"
            @header-main-icon-left-secondary-click=${() => this.navigate('insurance')}

            icon-right-secondary="coronita:mooncar"
            @header-main-icon-right-secondary-click=${() => this.navigate('checkbox')}
            
            icon-right-primary="coronita:communication"
            @header-main-icon-right-primary-click=${() => this.navigate('predictive')}       

            text="SEGUROS  RIMAC - BBVA"
            ></bbva-header-main>  
            <!-- <bbva-web-header-public-web 
              description="Home de BBVA" 
              logo-href="https://www.bbva.es" 
              logo-target="_blank" 
              tab-1-href="https://www.bbva.es/personas.html" 
              tab-1-target="_blank" 
              tab-2-href="https://www.bbva.es/empresas.html" 
              tab-2-target="_blank" 
              show-register="" 
              register-href="https://www.bbva.es/general/hazte-cliente/abrir-cuenta-bancaria-online.html" register-target="_blank" show-login="" show-search="">
              
          </bbva-web-header-public-web> -->
        </div>

        <div slot="app__main" class="container">
          <cells-bbva-header-info-insurnace
            name=${this.userName}
            title=${this.dataHeader.title}
            document=${this.dataHeader.document}
            >           
          </cells-bbva-header-info-insurnace>

          
          <div class="card-component">
            ${this.data.map(element =>
    html`<cells-bbva-card-insurance
                title=${element.title}
                description=${element.description}
                options=${JSON.stringify(element.item)}
                @event-button=${this._actionButtonCotiza}></cells-bbva-card-insurance>`
  )}
          </div>

        

          <!-- ${this.movementList ? html`${this.movementList}` : html`<cells-skeleton-loading-page visible></cells-skeleton-loading-page>`} -->

          <bbva-help-modal
            id="logoutModal"
            header-icon="coronita:info"
            header-text=${this.t('dashboard-page.logout-modal.header')}
            button-text=${this.t('dashboard-page.logout-modal.button')}
            @help-modal-footer-button-click=${() => window.cells.logout()}>
            <div slot="slot-content">
              <span>${this.t('dashboard-page.logout-modal.slot')}</span>
            </div>
          </bbva-help-modal>
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(DashboardPage.is, DashboardPage);