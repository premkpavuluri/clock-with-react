class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { currentTime: "01:01:01" }
    }

    // 1
    componentDidMount() {
        console.log("Clock mounted");
        this.intervalId = setInterval(() => {
            console.log("Ticking...");
            this.setState((_) => {
                return { currentTime: this.getTime() }
            })
        }, 1000)
    }

    // 2
    componentWillUnmount() {
        console.log("Will unmount");
        clearInterval(this.intervalId);
    }

    getTime() {
        const today = new Date()
        return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    }

    render() {
        const timer = React.createElement(
            'div',
            { style: this.props.styles },
            `${this.state.currentTime}`);

        return timer;
    }
}

class HatlableClock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { finished: false };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        return this.setState(({ finished }) => ({ finished: !finished }));
    }

    render() {
        const clock = React.createElement(Clock, { styles: this.props.styles });
        const haltScreen = React.createElement('div', { style: this.props.styles }, 'Halted');
        const containerStyles = { display: 'flex', 'flexDirection': 'column' };
        const text = this.state.finished ? 'Start the Clock' : 'Stop the Clock';
        const button = React.createElement('button', { 
            onClick: this.handleClick,
            style: {
                'color': 'cyan',
                'backgroundColor': 'black'
            }
        }, text);
        

        return this.state.finished
            ? React.createElement('div', { style: containerStyles }, haltScreen, button)
            : React.createElement('div', { style: containerStyles }, clock, button);
    }
}

const styles =
{
    'color': 'cyan',
    'backgroundColor': 'black',
    'height': '1000px',
    'width': 'auto',
    'fontSize': '100px',
    'display': 'flex',
    'justifyContent': 'center',
    'alignItems': 'center',
    'textShadow': '0px 2px 11px cyan'
}
const mainContainer = document.getElementById('main_container');
const hatlableClock = React.createElement(HatlableClock, { styles });

ReactDOM.render(hatlableClock, mainContainer);