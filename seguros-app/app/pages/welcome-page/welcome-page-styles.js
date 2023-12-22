/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
:root {
  --page-bg-color: #5472d3;
  --page-header-color: #5472d3;
}

bbva-header-main {
  --bbva-header-main-bg-color: var(--page-header-color);
}

cells-template-paper-drawer-panel {
  --cells-template-paper-drawer-panel-section-bg: var(--page-bg-color);
}

cells-bbva-header-info-insurnace {
  margin: 15px;
}

.container {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.card-component {
  width: 100%;
}

cells-bbva-header-info-insurnace {
  width: 100%;
}

bbva-web-card-product {
  width: 50%;
}

.card-product {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
`;
