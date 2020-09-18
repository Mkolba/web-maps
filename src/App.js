import React from 'react';
import { View } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import './index.css';
import bridge from '@vkontakte/vk-bridge';


import Newsfeed from './panels/Newsfeed';
import Map from './panels/Map/Map';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activePanel: 'newsfeed',
			history: ['newsfeed'],
			globState: {mood: null, coords: [55.76, 37.64]},
		}
	}

	componentDidMount() {
		window.onpopstate = this.goBack;

		bridge.subscribe(({ detail: { type, data }}) => {
	    if (type === 'VKWebAppUpdateConfig' && data.scheme) {
	      this.setScheme(data.scheme);
			}
  	})
	}

	setScheme = (scheme) => {
		let isLight = ['bright_light', 'client_light'].includes(scheme);
		this.setState({ scheme: isLight ? 'bright_light' : 'space_gray' });
		document.getElementById('app__body').setAttribute('scheme', scheme);
		bridge.send('VKWebAppSetViewSettings', {
				 'status_bar_style': isLight ? 'dark' : 'light',
				 'action_bar_color': isLight ? '#ffffff' : '#191919',
				 'navigation_bar_color': isLight ? '#ffffff' : '#191919',
		}).catch(e => {});
	}

	commit = (data) => {
		this.setState({ globState: data });
	}

	go = (panel) => {
		window.history.pushState({panel: panel}, panel);
		this.setState({ history: [...this.state.history, panel], activePanel: panel })
	}

	goBack = () => {
		let history = this.state.history;

		if (history.length === 1) {
      bridge.send("VKWebAppClose", {"status": "success" });
		} else {
			this.setState({ activePanel: history[history.length - 2] });
			history.pop();
			if (history.length === 1) {
				this.setState({ globState: {mood: null, coords: [55.76, 37.64]} })
			}
		}

	}

	render() {
		const props = {go: this.go, goBack: this.goBack, data: this.state.globState, commit: this.commit}

		return (
			<View activePanel={this.state.activePanel} header={!(this.state.activePanel.indexOf('page') > -1)}>
				<Map id='map' {...props}/>
				<Newsfeed id='newsfeed' mood={this.state.globState.mood} {...props} />
			</View>
		);
	}
}

export default App;
