import domLoaded from 'dom-loaded';
import React from 'react';
import {createRoot} from 'react-dom/client';
import {IntlProvider} from 'react-intl';
import {ConfigurationProvider} from './app/contexts/ConfigurationContext';

// Import embeddable widgets
import '@/soak-embed.css';
import ExampleWidget from '@/app/ExampleWidget';
import {getLocaleMessages} from '@/app/locales';

// Global Config
const defaultConfig = {
  selector: '[data-soak-widget]',
  dataPath: '/data',
  imagePath: '/assets/images',
  locale: 'en',
  // add default global config variables here
};

(async () => {
  await domLoaded;

  const config = {
    ...defaultConfig,
    ...window['soak_widget_config'] || {}
  };

  const widgetContainers = document.querySelectorAll(config.selector);

  if (!widgetContainers) {
    console.error(`Could not initialize widget - unable to find element: ${config.selector}`);
    return;
  }

  [...widgetContainers].forEach(container => {
    const widgetType = container.dataset.soakWidget;

    if (!widgetType) {
      console.error('Please define a widget type on container:', container);
      return;
    }

    let Widget;

    // Map the widget to the value in the HTML data attribute.
    switch (widgetType) {
      case 'soak-example':
        Widget = ExampleWidget;
        break;
      default:
        throw new Error(`${widgetType} is not a valid widget name.`);
    }

    const root = createRoot(container);

    root.render((
      <ConfigurationProvider config={config}>
        <IntlProvider locale={config.locale} messages={getLocaleMessages(config.locale)}>
          <Widget />
        </IntlProvider>
      </ConfigurationProvider>
    ));
  });
})();
