//COMPONENTS
import Header from './components/Header.js';
import RegionList from './components/RegionList.js';
import CityList from './components/CityList.js';
import CityDetail from './components/CityDetail.js';
//API
import { request } from './components/api.js';

export default function App($app) {
    const getSortBy = () => {
        if (window.location.search) {
            return window.location.search.split('sort=')[1].split('&')[0];
        }
        return 'total';
    };

    const getSearchWord = () => {
        if (window.location.search && window.location.search.includes('search=')) {
            return window.location.search.split('search=')[1];
        }
        return '';
    };

    this.state = {
        startIdx: 0,
        sortBy: getSortBy(),
        searchWord: getSearchWord(),
        region: '',
        cities: '',
    };

    const header = new Header({
        $app,
        initialState: {
            sortBy: this.state.sortBy,
            searchWord: this.state.searchWord,
        },
        handleSortChange: async (sortBy) => {
            const pageUrl = `/${this.state.region}?sort=${sortBy}`;
            history.pushState(
                null,
                null,
                this.state.searchWord ? pageUrl + `&search=${this.state.searchWord}` : pageUrl
            );
            const cities = await request(0, this.state.region, sortBy, this.state.searchWord);
            this.setState({
                ...this.state,
                startIdx: 0,
                sortBy: sortBy,
                cities: cities,
            });
        },
        handleSearch: async (searchWord) => {
            history.pushState(null, null, `/${this.state.region}?sort=${this.state.sortBy}&search=${searchWord}`);
            const cities = await request(0, this.state.region, this.state.sortBy, searchWord);
            this.setState({
                ...this.state,
                startIdx: 0,
                cities: cities,
                searchWord: searchWord,
            });
        },
    });
    const regionList = new RegionList();
    const cityList = new CityList({
        $app,
        initialState: this.state.cities,
        handleLoadMore: async () => {
            const newStartIdx = this.state.startIdx + 40;
            const newCities = await request(newStartIdx, this.state.region, this.state.sortBy);
            this.setState({
                ...this.state,
                startIdx: newStartIdx,
                cities: {
                    cities: [...this.state.cities.cities, ...newCities.cities],
                    isEnd: newCities.isEnd,
                },
            });
        },
    });
    const cityDetail = new CityDetail();

    this.setState = (newState) => {
        this.state = newState;
        header.setState({ sortBy: this.state.sortBy, searchWord: this.state.searchWord });
        cityList.setState(this.state.cities);
    };

    const init = async () => {
        const cities = await request(this.state.startIdx, this.state.region, this.state.sortBy, this.state.searchWord);
        this.setState({
            ...this.state,
            cities: cities,
        });
    };

    init();
}
