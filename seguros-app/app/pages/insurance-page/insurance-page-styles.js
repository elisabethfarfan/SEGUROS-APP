/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
cells-bbva-card-insurance {
  width: 100%;
}

.container {
  display: flex;
  justify-content: center;
}

bbva-web-table-informative {
  margin: 2.5rem 2.5rem;
}

@media (min-width: 62rem) {
  bbva-web-table-informative {
    margin: 4.5rem auto;
  }
}
`;
