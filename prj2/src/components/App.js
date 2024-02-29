import TabBar from './TabBar.js';
import Content from './Content.js';

import { request } from './api.js';

export default function App($app) {
    this.state = {
        animal: 'all',
        photos: [],
    };

    //tab
    const tab = new TabBar({
        $app,
        initialState: [],
        onClick: async (name) => {
            this.setState({
                ...this.state,
                animal: name,
                photos: await request(name),
            });
        },
    });

    //content
    const content = new Content({ $app, initialState: [] });

    //state
    this.setState = (nextState) => {
        this.state = nextState;
        tab.setState(this.state.animal);
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
