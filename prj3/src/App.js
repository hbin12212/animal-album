import TabBar from './components/TabBar.js';
import Content from './components/Content.js';
import { request } from './components/api.js';

export default function App($app) {
    this.state = {
        currentTab: window.location.pathname.replace('/', '') || 'all',
        photos: [],
    };

    const tab = new TabBar({
        $app,
        initialState: this.state.currentTab,
        onClick: async (name) => {
            history.pushState(null, null, name); // URL 변경
            this.updateContent(name);
        },
    });

    const content = new Content({ $app, initialState: [] });

    this.setState = (newState) => {
        this.state = newState;
        tab.setState(this.state.currentTab);
        content.setState(this.state.photos);
    };

    this.updateContent = async (tabName) => {
        console.log(tabName);
        const name = tabName === 'all' ? '' : tabName;

        const photos = await request(name);
        this.setState({
            ...this.state,
            currentTab: tabName,
            photos,
        });
    };

    window.addEventListener('popstate', () => {
        console.log(window.location.pathname);
        this.updateContent(window.location.pathname.replace('/', '') || 'all');
    });

    const init = async () => {
        this.updateContent(this.state.currentTab);
    };

    init();
}
