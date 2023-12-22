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
import '@capacitacion-cells/cells-bbva-welcome/cells-bbva-welcome.js';

import { getMovements } from '../../scripts/utils/movements-mock.js';
import { normalizeUriString } from '../../scripts/utils/text.js';

import styles from './welcome-page-styles.js';

/* eslint-disable new-cap */
class WelcomePage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'welcome-page';
  }

  constructor() {
    super();
    this.dataHeader = {
      title: 'Seguros',
      document: 12345678
    };
    this.data = {};

  }

  static get properties() {
    return {
      data: {type: Object},
      userName: { type: String },
      dataHeader: { type: Object },
      title: { type: String },
      description: { type: String },
      items: { type: Array},
      placa: { type: String},
      marca: { type: String},
      anio: { type: String},
      circulacion: { type: String},
      glp: { type: String},
      modelo: { type: String}
    };
  }

  firstUpdated(changedProps) {
    super.firstUpdated(changedProps);

    this._logoutModal = this.shadowRoot.querySelector('#logoutModal');
  }

  onPageEnter() {
    this.subscribe('segure_detail', (detail) => {
      this.title = detail.title;
      this.description = detail.description;
      this.items = detail.options;
    });

    this.subscribe('predictive_detail', (detail) => {
      console.log(detail);

      // this.anio = detail.anio;
      // this.placa = detail.placa;
      // this.glp = detail.glp;
      // this.marca = detail.marca;
      // this.modelo = detail.modelo;
      // this.circulacion = detail.circulacion;
      this.data = {
        placa: detail.placa,
        marca: detail.marca,
        anio: detail.anio,
        circulacion: detail.circulacion,
        glp: detail.glp
      };
      console.log(this.data);
    });

    this.subscribe('user_name', (userName) => this.userName = userName);

  }

  _actionButtonClose(e) {
    this.navigate('dashboard');
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
              name=${this.userName}
              title=${this.dataHeader.title}
              document=${this.dataHeader.document}
              >           
            </cells-bbva-header-info-insurnace>

            <div class="card-product">
              <h1>!Felicitaciones, haz adquirido el ${this.title} !</h1>
                <bbva-web-card-product
                  badge-text="Lorem"
                  image="resources/images/touch/seguro vehicular.jpg"
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
                    >Año del vehículo ${this.data?.anio}</bbva-web-list-item-bullet
                  >
                  <bbva-web-list-item-bullet slot="option"
                    >Marca del vehículo ${this.data?.marca}</bbva-web-list-item-bullet
                  >
                  <bbva-web-list-item-bullet slot="option"
                    >Placa del vehículo ${this.data?.placa}</bbva-web-list-item-bullet
                  >
                  <bbva-web-list-item-bullet slot="option"
                    >Modelo del vehículo ${this.data?.modelo}</bbva-web-list-item-bullet
                  >
                  <bbva-web-list-item-bullet slot="option"
                    >Circulación del vehículo ${this.data?.circulacion}</bbva-web-list-item-bullet
                  >
                  <bbva-web-list-item-bullet slot="option"
                    >Cambio a GLP del vehículo ${this.data?.glp}</bbva-web-list-item-bullet
                  >
                     
                  <bbva-web-badge-category
                    slot="${this.title}"
                    icon="bbva:insurance"
                    text="Category"
                  ></bbva-web-badge-category>
                </bbva-web-card-product> 
            </div> 
         </div>
     </cells-template-paper-drawer-panel>`;
  }

  static get styles() {
    return [ styles ];
  }
}

window.customElements.define(WelcomePage.is, WelcomePage);