import LoadCommonPlugins from './blocks';

if (window.SPFrontPanel) {
    // 打包时请注意“plugin-line-chart-0.0.2”这个值最好自定义每次都加个版本，保持不同
    window.SPFrontPanel.addPlugin("plugin-line-chart-0.0.2", (editor, opts = {}) => {
        LoadCommonPlugins(editor, opts);
    });
}
