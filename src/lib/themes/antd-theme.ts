import type {ThemeConfig} from 'antd';

const theme: ThemeConfig = {
    token: {
        fontSize: 16,
        borderRadius: 4,
        wireframe: true
    },
    components: {
        Form: {
            itemMarginBottom: 8
        },
        Typography: {
            colorLink: "rgb(20, 20, 20)",
        },
        Segmented:{
            colorBgLayout: "rgba(0, 0, 0, 0.15)",
        },
        Divider: {
            lineWidth: 2
        },
        Card:{
            colorBorderSecondary: "rgb(226, 222, 222)"
        }
    },

};

export default theme;