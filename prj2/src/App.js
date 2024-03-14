import TabBar from './components/TabBar.js';
import Content from './components/Content.js';

import { request } from './components/api.js';

export default function App($app) {
    this.state = {
        currentTab: 'all',
        photos: [],
    };

    //tab
    const tab = new TabBar({
        $app,
        initialState: [],
        onClick: async (name) => {
            this.setState({
                ...this.state,
                currentTab: name,
                photos: await request(name === 'all' ? '' : name),
            });
        },
    });

    //content
    const content = new Content({ $app, initialState: [] });

    //state
    this.setState = (newState) => {
        this.state = newState;
        tab.setState(this.state.currentTab);
        content.setState(this.state.photos);
    };

    const init = async () => {
        try {
            this.setState({
                ...this.state,
            });
            const animalData = await request();
            this.setState({
                ...this.state,
                photos: animalData,
            });
        } catch (error) {
            console.log(error);
        }
    };

    init();
}
