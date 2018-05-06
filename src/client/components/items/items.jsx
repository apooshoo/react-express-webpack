import React from 'react';

import styles from './style.scss';

class Items extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}]
    };
    this.handleOnScroll = this.handleOnScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }

  getMoreData() {
    if (this.state.requestSent) {
      return;
    }

    this.setState({requestSent: true});

    // enumerate a slow query
    setTimeout(() => {
      // throw "Too big";
      const newItemList = [{number: Math.random()}, {number: Math.random()}, {number: Math.random()}];
      this.setState({requestSent: false});
      this.setState({items: [...this.state.items, ...newItemList]});
    }, 2000);
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({hasError: true});
    // You can also log the error to an error reporting service
    console.log(error, info);
  }

  handleOnScroll() {
    // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;

    const clientHeight = document.documentElement.clientHeight || window.innerHeight;

    const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    if (scrolledToBottom) {
      this.getMoreData();
    }
  }

  render() {
    const items = this.state.items.map((item, index) => (
      <div key={item.number.toString()} className={styles.item}>
        {index} : {item.number}
      </div>
    ));

    return (
      <div className="hype">
        <div>{items}</div>
        <div>
          {(() => {
            if (this.state.requestSent) {
              return (
                <div className={styles.dataLoading}>
                  <i className="fa fa-refresh fa-spin" />
                </div>
              );
            }
            return <div className={styles.dataLoading} />;
          })()}
        </div>
      </div>
    );
  }
}

export default Items;