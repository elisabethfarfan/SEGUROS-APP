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
import '@capacitacion-cells/cells-bbva-form-predictive/cell-bbva-form-predictive.js';
import '@bbva-web-components/bbva-web-card-product/bbva-web-card-product.js';
import { getMovements } from '../../scripts/utils/movements-mock.js';
import { normalizeUriString } from '../../scripts/utils/text.js';

import { data } from './data.js';

import styles from './predictive-page-styles.js';

/* eslint-disable new-cap */
class PredictivePage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'predictive-page';
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
      title: { type: String },
      description: { type: String },
      items: { type: Array},
      dataHeader: { type: Object },
      data: { type: Array },
      userName: { type: String },

    };
  }


  onPageEnter() {
    this.subscribe('segure_detail', (detail) => {
      this.title = detail.title;
      this.description = detail.description;
      this.items = detail.options;

    });

    this.subscribe('user_name', (userName) => this.userName = userName);
  }


  _actionButtonCotiza(e) {
    this.publish('predictive_detail', e.detail);

    // this.navigate('movement-detail', { id, label: normalizeUriString(label), });
    this.navigate('welcome');
  }

  render() {
    return html`
      <cells-template-paper-drawer-panel mode="seamed">
        <div slot="app__header">
        <bbva-header-main
             icon-left-primary="coronita:back"
            @header-main-icon-left-primary-click=${() => this.navigate('dashboard')}

            icon-left-secondary="coronita:pets"
            @header-main-icon-left-secondary-click=${() => this.navigate('insurance')}

            icon-right-secondary="coronita:mooncar"
            @header-main-icon-right-secondary-click=${() => this.navigate('checkbox')}
            
            icon-right-primary="coronita:communication"
            @header-main-icon-right-primary-click=${() => this.navigate('predictive')}       

            text="SEGUROS PETS RIMAC - BBVA"
            ></bbva-header-main>  
        </div>

        <div slot="app__main" class="container">

          <cells-bbva-header-info-insurnace
            .name=${this.userName}
            .title=${this.title}
            .document=${this.dataHeader.document}
            >           
          </cells-bbva-header-info-insurnace> 

          <div class="predictive-form">
            <bbva-web-card-product
              badge-text="Lorem"
              image="resources/images/touch/image.jpg"
              editorial-text="2 min"
              editorial-label="Video"
              editorial-icon="bbva:play"
              feedback-text="242 votes"
              feedback-checked=""
              heading="${this.title}"
              categories-list-label="Categories List"
              main-link-icon="bbva:info"
              link-icon="bbva:info"
            >
              <p slot="description">
                ${this.description}
              </p>
                         
              <bbva-web-list-item-bullet slot="option"
                >${this.description}</bbva-web-list-item-bullet
              >
              <bbva-web-list-item-bullet slot="option"
                >${this.description}</bbva-web-list-item-bullet
              >             
              <bbva-web-badge-category
                slot="${this.title}"
                icon="bbva:insurance"
                text="Category"
              ></bbva-web-badge-category>
            </bbva-web-card-product> 

            <cell-bbva-form-predictive 
              .title=${this.title}
              .options=${this.data} 
              @event-datos=${this._actionButtonCotiza}      
            ></cell-bbva-form-predictive> 
          </div>
        </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(PredictivePage.is, PredictivePage);