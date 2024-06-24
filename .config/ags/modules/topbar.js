import { NetworkInformation } from './widgets/internet.js';
import { Workspaces } from './widgets/workspace.js';
import { HardwareBox } from './widgets/hardware/all.js';
import { SysTrayBox } from './widgets/systray.js';
import { NotificationCenterButton } from './menus/notification_center.js';
import { MenuButton } from './menus/left_menu.js';

import {
    Window,
    CenterBox,
    Box,
    Label,
} from 'resource:///com/github/Aylur/ags/widget.js';
import { execAsync } from 'resource:///com/github/Aylur/ags/utils.js';
import weatherService from './services/WeatherService.js';
import { Widget } from './utils/imports.js';
import themeService from './services/ThemeService.js';

const Clock = () =>
    Label({
        className: 'clock small-shadow unset',
    }).poll(1000, (self) =>
        execAsync(['date', '+(%I:%M) %A, %d %B'])
            .then((date) => (self.label = date))
            .catch(print)
    );

const DynamicWallpaper = () =>
    Widget.Button({
        className: 'unset dynamic-wallpaper',
        onClicked: () => {
            themeService.toggleDynamicWallpaper();
        },
    }).hook(themeService, (btn) => {
        if (!themeService.isDynamicTheme) {
            btn.visible = false;
            return;
        }

        btn.visible = true;
        if (themeService.dynamicWallpaperIsOn) btn.label = '󰋹';
        else btn.label = '󰋩';
    });

// layout of the bar
const Right = () =>
    Box({
        children: [
            Workspaces(),
            HardwareBox(),
            DynamicWallpaper(),
            // NotificationIndicator(),
            // ClientTitle(),
        ],
    });

const Center = () =>
    Box({
        children: [Clock()],
    });

const Left = () =>
    Box({
        hpack: 'end',
        children: [
            // Volume(),
            NotificationCenterButton(),
            NetworkInformation(),
            SysTrayBox(),
            MenuButton(),
        ],
    });

export const Bar = ({ monitor } = {}) =>
    Window({
        name: `bar${monitor || ''}`, // name has to be unique
        className: 'bar-bg unset',
        monitor: monitor,
        anchor: ['top', 'left', 'right'],
        exclusivity: 'exclusive',
        child: CenterBox({
            className: 'bar shadow',
            startWidget: Right(),
            centerWidget: Center(),
            endWidget: Left(),
        }),
    });
