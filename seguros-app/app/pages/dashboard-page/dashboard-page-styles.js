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
  margin: 25px;
}

.container {
  width: 100%;
}

.card-component {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

cells-bbva-card-insurance {
  margin-top: 25px;
  width: 30%;
}
`;
