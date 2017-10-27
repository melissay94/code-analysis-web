/*= =================================================

    VIEW (React)

  ************************************************** */

const Search = props => React.DOM.input({
  type: 'input',
  onChange: props.onChange,
  placeholder: 'Search for people',
});

const ControlBar = props => React.DOM.div({ className: 'control-bar' }, [
  React.createElement(Search, { key: 'search', onChange: props.onSearch }),
  React.DOM.button({ key: 'shuffle', onClick: props.shuffleList, className: 'btn btn-outline-dark' }, null, 'Shuffle People'),
  React.DOM.button({ key: 'sort-first', onClick: props.sortByFirst, className: 'btn btn-outline-dark' }, null, 'Sort by First Name'),
  React.DOM.button({ key: 'sort-last', onClick: props.sortByLast, className: 'btn btn-outline-dark' }, null, 'Sort by Last Name'),
]);

const Thumbnail = props => React.DOM.img({
  className: 'image',
  src: props.src !== 'http:undefined' ? props.src : 'images/default.png',
});

const ListRow = props => React.DOM.tr({ key: `${props.person.firstName} ${props.person.lastName}`, className: props.className }, [
  React.DOM.td({ key: 'thumb' }, React.createElement(Thumbnail, { src: getImageUrl(props.person) })),
  React.DOM.td({ key: 'first' }, null, getFirstName(props.person)),
  React.DOM.td({ key: 'last' }, null, getLastName(props.person)),
]);

const ListContainer = props => React.DOM.table({ className: 'list-container' }, [
  React.DOM.thead({ key: 'thead' }, React.DOM.tr({}, [
    React.DOM.th({ key: 'thumb-h' }, null, 'Employee Picture'),
    React.DOM.th({ key: 'first-h' }, null, 'First Name'),
    React.DOM.th({ key: 'last-h' }, null, 'Last Name'),
  ])),
  React.DOM.tbody({ key: 'tbody' }, 
    props.personList.map((person, index) => 
      React.createElement(ListRow, { 
        key: `person-${person.id}`,
        className: `row-${index%2? 'even' : 'odd'}`,
        person 
      }))),
]);

const App = React.createClass({
  getInitialState() {
    return {
      personList: [],
      visiblePersonList: [],
    };
  },

  componentDidMount() {
    getPersonList().then(personList =>
      this.setState({
        personList,
        visiblePersonList: personList,
      }));
  },

  shuffleList() {
    this.setState({
      visiblePersonList: shuffleList(this.state.personList),
    });
  },

  sortByFirst() {
    this.setState({
      visiblePersonList: sortByFirstName(this.state.personList),
    });
  },

  sortByLast() {
    this.setState({
      visiblePersonList: sortByLastName(this.state.personList),
    });
  },

  onSearch(e) {
    this.setState({
      visiblePersonList: filterByName(e.target.value, this.state.personList),
    });
  },

  render() {
    let { visiblePersonList } = this.state;

    return React.DOM.div({ className: 'app-container' }, [
      React.DOM.h1({ key: 'header' }, ['WillowTree Employee Search']),
      React.createElement(ControlBar, {
        key: 'controlBar',
        onSearch: this.onSearch,
        shuffleList: this.shuffleList,
        sortByFirst: this.sortByFirst,
        sortByLast: this.sortByLast,
      }),
      React.createElement(ListContainer, { key: 'list', personList: visiblePersonList }),
    ]);
  },
});

ReactDOM.render(
  React.createElement(App),
  document.getElementById('app'),
);
