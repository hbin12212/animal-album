export default function CityDetail() {
    this.$target = document.createElement('div');
    this.$target.className = 'city-detail';

    this.template = () => {};

    this.render = () => {};

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render();
}
