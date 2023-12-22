/* eslint-disable no-alert */
import { CellsPage } from '@cells/cells-page';
import { BbvaCoreIntlMixin } from '@bbva-web-components/bbva-core-intl-mixin';
import { html, css } from 'lit-element';

import '@cells-components/cells-template-paper-drawer-panel';
import '@cells-components/cells-skeleton-loading-page';
import '@bbva-web-components/bbva-header-main/bbva-header-main';
import '@bbva-web-components/bbva-list-movement/bbva-list-movement.js';
import '@bbva-web-components/bbva-help-modal/bbva-help-modal.js';
import '@capacitacion-cells/cells-bbva-card-insurance/cells-bbva-card-insurance';
import '@bbva-web-components/bbva-foundations-icons/bbva-foundations-icons.js';
import '@bbva-web-components/bbva-help-modal/bbva-help-modal.js';
import '@bbva-web-components/bbva-web-table-informative/bbva-web-table-informative';


/* eslint-disable new-cap */
class InsurancePage extends BbvaCoreIntlMixin(CellsPage) {
  static get is() {
    return 'insurance-page';
  }

  static get properties() {
    return {
      userName: { type: String },
      data: { type: Object },
    };
  }

  /* eslint-disable new-cap */
  constructor() {
    super();

  }

  _actionButtonCotiza(e) {
    this.navigate('dashboard');
  }

  /* eslint-disable new-cap */
  render() {
    return html` 
    <cells-template-paper-drawer-panel mode='seamed'>
    <div slot="app__header">
    <div slot="app__header">
          <!-- <bbva-header-main
            icon-left-primary="coronita:on"
            accessibility-text-icon-left-primary="Cerrar Sesión"
            @header-main-icon-left-primary-click=${() => this._logoutModal.open()}

            icon-right-primary="coronita:help"
            accessibility-text-icon-right-primary="Ayuda"
            @header-main-icon-right-primary-click=${() => this.navigate('help')}

            text=${this.t('dashboard-page.header', '', { name: this.userName })}>
          </bbva-header-main> -->
          <bbva-header-main
             icon-left-primary="coronita:back"
            @header-main-icon-left-primary-click=${() =>  this.navigate('dashboard')}

            icon-left-secondary="coronita:pets"
            @header-main-icon-left-secondary-click=${() => this.navigate('insurance')}

            icon-right-secondary="coronita:mooncar"
            @header-main-icon-right-secondary-click=${() => this.navigate('checkbox')}
            
            icon-right-primary="coronita:communication"
            @header-main-icon-right-primary-click=${() => this.navigate('predictive')}       

            text="SEGUROS PETS RIMAC - BBVA"
            ></bbva-header-main>          
        </div>
        </div>
        <div slot='app__main' class="container">
          <cells-bbva-card-insurance
          title=${'Seguro Pet Lover'}
          description=${'Este seguro brinda reembolso de gastos médicos por accidente y una indemnización por muerte accidental para el asegurado e incluye asistencias médicas, estéticas, psicológicas y de gastos funerarios para una mascota (perro o gato).'}
          options=${JSON.stringify([
    'Libre elección de médico',
    'Sin tiempos de esper',
    'Asistencia de calidad'
  ])}
          @event-button=${this._actionButtonCotiza}    
          ></cells-bbva-card-insurance> 
          
          <div data-grid="region">
            <div data-grid="zone">
              <bbva-web-table-informative heading="Consideraciones" cols="4" rows="2">
                <span slot="rh-c1">1. Asistencia Médica Veterinaria</span>
                <span slot="rh-c2">2. Carencia y/o Copago</span>
                <span slot="rh-c3">3. Monto Máximo</span>
                <span slot="rh-c4">4. N° Máximo Atenciones</span>

                <span slot="r1-c1">Gastos médicos por enfermedad</span>
                <span slot="r1-c2">Carencia 30 días</span>
                <span slot="r1-c3">Hasta S/ 1,000 por atención</span>
                <span slot="r1-c4">2 atenciones</span>

                <span slot="r2-c1">Gastos médicos por accidente</span>
                <span slot="r2-c2">Carencia 90 días</span>
                <span slot="r2-c3">Hasta S/ 150</span>
                <span slot="r2-c4">1 atención</span>

                <p slot="notes">Términos y condiciones</p>
              </bbva-web-table-informative>
            </div>

        </div>
    </cells-template-paper-drawer-panel>`;
  }

}

window.customElements.define(InsurancePage.is, InsurancePage);