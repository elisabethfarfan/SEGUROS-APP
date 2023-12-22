(function() {
  'use strict';

  window.CellsPolymer.start({
    routes: {
      'login': '/',
      'dashboard': '/dashboard',
      'insurance': '/insurance',
      'checkbox': '/checkbox',
      'predictive': '/predictive',
      'movement-detail': '/movement/:id/:label',
      'help': '/help',
      'welcome': '/welcome'
    }
  });
}());
