export default function RegionList() {
    this.$target = document.createElement('div');
    this.$target.className = 'region-list';

    this.template = () => {};

    this.render = () => {};

    this.setState = (newState) => {
        this.state = newState;
        this.render();
    };

    this.render();
}
