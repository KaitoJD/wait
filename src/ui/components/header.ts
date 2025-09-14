import blessed from 'blessed';

export class Header {
    static create(screen: blessed.Widgets.Screen): blessed.Widgets.BoxElement {
        const header = blessed.box({
            top: 0,
            left: 0,
            width: '100%',
            height: 3,
            content: '{center}WAIT - Weather App In Terminal{/center}',
            tags: true,
            style: {
                fg: 'white',
                bg: 'blue',
                bold: true
            },
            border: {
                type: 'line'
            }
        });

        screen.append(header);
        return header;
    }
}