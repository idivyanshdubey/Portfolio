/// <reference types="react-scripts" />

declare module 'react-plotly.js' {
  import { Component } from 'react';
  export default class Plot extends Component<any> {}
}
