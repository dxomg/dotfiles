import MusicPlayer from '../MusicPLayer.js';
import WeatherService from '../../services/WeatherService.js';
import FuzzyClock from '../FuzzyClock.js';
import Saying from '../Saying.js';
import { TitleText, local } from '../../utils/helpers.js';
import { Widget } from '../../utils/imports.js';
import settings from '../../settings.js';

const iconImage = Widget.Icon({
    icon: `${settings.assets.wallpapers}/image.png`,
    size: 70,
    className: 'my-wd-user-icon',
});

const weatherIcon = Widget.Label({
    label: '',
    className: 'my-weather-wd-icon',
});

const RowOne = () =>
    Widget.Box({
        className: 'weather-wd-row-one small-shadow',
        children: [],
    }).hook(WeatherService, (self) => {
        const tt = TitleText({
            title: `Hi, ${settings.username}`,
            // titleClass: "weather-wd-title",
            // text: WeatherService.arValue,
            textClass: 'my-weather-wd-text',
            boxClass: 'my-weather-wd-title-text-box',
            titleXalign: local === 'RTL' ? 1 : 0,
            textXalign: local === 'RTL' ? 1 : 0,
        });

        //weatherIcon.label = WeatherService.weatherCode;

        self.children = [weatherIcon, tt, iconImage];
    });

const DesktopWidget = () =>
    Widget.Box({
        vertical: true,
        children: [
            RowOne(),
            // FuzzyClock("my-fuzzy-clock-box small-shadow"),
            MusicPlayer('my-desktop-music-box small-shadow'),
            // Saying("saying-wd-label small-shadow"),
        ],
    });

const DesktopWidget2 = () =>
    Widget.Box({
        vertical: true,
        children: [
            // RowOne(),
            //FuzzyClock('my-fuzzy-clock-box small-shadow'),
            // MusicPlayer("my-desktop-music-box small-shadow"),
            //Saying('saying-wd-label small-shadow'),
        ],
    });

const FWidget = () =>
    Widget.Window({
        name: `desktop_black_hole_widget_widget`,
        margins: [80, 80],
        layer: 'background',
        visible: false,
        focusable: false,
        anchor: ['top', 'right'],
        child: DesktopWidget(),
    });

const FWidget2 = () =>
    Widget.Window({
        name: `desktop_black_hole_widget_widget_2`,
        margins: [80, 80],
        layer: 'background',
        visible: false,
        focusable: false,
        anchor: ['bottom', 'left'],
        child: DesktopWidget2(),
    });

const blackHoleWidget = FWidget();
const blackHoleWidget2 = FWidget2();

globalThis.ShowBHWidget = () => {
    blackHoleWidget.visible = true;
    blackHoleWidget2.visible = true;
};
globalThis.HideBHWidget = () => {
    blackHoleWidget.visible = false;
    blackHoleWidget2.visible = false;
};

export default blackHoleWidget;
