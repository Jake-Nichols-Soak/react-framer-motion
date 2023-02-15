# Soak Embeddable Framework

## Setup

### Requirements

1. Node 14+

> ⚠️ If you are going to be embedding this into an existing client site you should update the `index.html` holding templates to include the stylesheet of the parent site. This avoids any unexpected side effects from style leaks.
> 
> For example - SwissRE: 
> 
> `<link rel="stylesheet" href="https://www.swissre.com/.resources/swissre-web/webresources/css/ui.css" />`

### Installation

1. Run `npm i`

### Commands

| Command | Action |
|:--------|:-------|
| `npm run build` | Perform a one-off build in development mode |
| `npm run build:prod` | Fully optimised production build output |
| `npm run serve` | Run a watched instance using BrowserSync and Hot Module Reloading |
| `npm run lint` | Check codebase against the linter rules |
| `npm run lint:fix` | Automatically fix minor issues while checking linter compliance |

## Structure

The embeddable framework is designed to provide a sensible base for custom widgets into external websites. It minimises
the number of files to be bundled to the client by loading all files directly into the main application JS. This retains
the full availability of PostCSS.

All classes are prefixed by `[data-soak-widget]` including any CSS resets. 

### Global Configuration

As the environment on which the embedded applications may not be within our control there is a simple configuration layer
that allows defaults to be overridden.

Within `./src/soak-embed.js` you can set the default values:

```javascript
const defaultConfig = {
  selector: '[data-soak-widget]',
  dataPath: '/data/data.json',
  // add default global config variables here
};
```

These can be overridden in the window by adding the following before loading the widget script:

```html
<script>
    window.soak_widget_config = {
      // ...
    }
</script>
```

_Note: merging is done via shallow comparison so nested properties will be replaced entirely_.

### Configuration Context

Accessing configuration values is possible using the ConfigurationContext that is automatically applied to all widgets
components. This means you can access the values from any depth of component.

```jsx
import {useConfig} from '@/app/contexts/ConfigurationContext';

const MyComponent = () => {
    const {getConfigValue} = useConfig();
}
```

The available properties from the `useConfig()` hook are:

- `getConfigValue` - retrieve a single value. You can use dot notation for nested properties: `option.property.nested.value`
- `setConfigValue` - set / override a config value. You can use dot notation for nested properties.
- `configuration` - access the raw configuration state object

### Widget Definitions

The framework supports multiple widgets in a single embed script. They are rendered by looping through HTML selectors
and reading a unique reference ID via data attributes.

Each widget should be a top level React component, however you are free to build these from as many smaller components as you like. For larger
builds you are encouraged to follow the Atomic pattern used by full-scale application builds.

```jsx
// WidgetOne.jsx

const WidgetOne = () => {
  // ...
}

export default WidgetOne;
```

Within the root javascript file `soak-embed.js` import the widget component and set up the loading mechanism:

```jsx
import WidgetOne from './app/WidgetOne';
import WidgetTwo from './app/WidgetTwo';

// ...

switch (widgetType) {
    case 'widget-one':
        Widget = WidgetOne;
        break;
    case 'widget-two':
        Widget = WidgetTwo;
        break;
    default:
        throw new Error(`${widgetType} is not a valid widget name.`);
}
```

To preview the widgets you must update both the `./index.html` and `./dist/index.html` with the new entrypoints:

```html
<div data-soak-widget="widget-one"></div>
<div data-soak-widget="widget-two"></div>
```

### Data Loading

How data is processed is out of the scope of this project, however it is recommended to load it via a single JSON file
asynchronously to prevent blocking of the page load, especially with large datasets.

Within `./src/app/utilities/api.js` is an example / helper function for loading this in via the SWR hook pattern:

```js
export const useJsonData = (dataPath) => {
  const { data, error } = useSWR(dataPath, fetcher, {
    revalidateOnFocus: false
  });

  return {
    data,
    isLoading: !error && !data,
    hasError: error
  };
};
```

## Hosting

This project comes with a basic setup for Netlify hosting. This is the recommended approach for previewing the embedded
application to clients.

- [Netlify Login Details](https://start.1password.com/open/i?a=4DJ2WECU3REFDIJDN4PKVGHWJA&v=dnhou57wgvq3hogpldi5jdicoe&i=v3qj4de4vfeutpejb4ii4n5m5u&h=soakdigital.1password.com)
