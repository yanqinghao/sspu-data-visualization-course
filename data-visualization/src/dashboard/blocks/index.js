import lineChartDemo from './lineChartDemo';

import { CATEGORIES } from "../common/constants";

export default (editor, options) => {
  [lineChartDemo].forEach((plugin) => {
    window.SPFrontPanel.addBlock(editor, options, plugin, CATEGORIES.ECHARTS);
  });
};
