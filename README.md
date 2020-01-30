# Sanity Dashboard Widget: Document Chart

A widget for the Sanity Content Studio Dashboard which displays a barchart giving a count of your doument types

Disclaimer: This widget is intended as proof of concept/example for building your own Sanity dashboard plugins. It's so feature-incomplete that there are more empty checkboxes on this repo than there are neurons in a cephalopd brain 🦑

## Usage

```bash
cd <my-studio-folder>
sanity install dashboard-widget-document-chart
```

Then add something like to your `dashboardConfig.js` file

```js
{
  name: 'document-chart',
  options: {types: ['post', 'author', 'sanity.imageAsset']},
  layout: {width: 'full'}
}
```

Swap those types for whichever types you have in your Studio, and want to render in this chart.

There's more on how to configure your dashboard at https://www.sanity.io/docs/dashboard#how-to-configure-the-dashboard-5c1617e3633d
