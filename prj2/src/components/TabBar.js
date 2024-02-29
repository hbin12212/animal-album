export default function TabBar({ $app, initialState, onClick }) {
    this.state = initialState;
    this.$target = document.createElement('div');
    this.$target.className = 'tab-bar';

    $app.appendChild(this.$target);
    this.onClick = onClick;

    this.template = () => {
        let temp = `<div class="clicked" id="all">전체</div>
       <div id="penguin">펭귄</div><div id="koala">코알라</div><div id="panda">판다</div>`;

        return temp;
    };

    this.render = () => {
        this.$target.innerHTML = this.template();
        const $test = this.$target.querySelectorAll('div');
        $test.forEach((elm) => {
            elm.addEventListener('click', () => {
                if (elm.id === 'all') {
                    onClick();
                } else {
                    onClick(elm.id);
                }
            });
        });
    };

    this.setState = (nextState) => {
        this.state = nextState;
        this.render();
    };

    this.render();
}
