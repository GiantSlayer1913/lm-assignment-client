import React from 'react';
import image from '../images/expand-vertical-4.svg';
import Collapsible from './Collapsible';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      stations: []
    }
  }

  componentWillMount() {
        localStorage.getItem('staions') && this.setState({
            contacts: JSON.parse(localStorage.getItem('stations')),
            isLoading: false
        })
    }

  componentDidMount() {
    const date = localStorage.getItem('stationsDate');
    const stationsDate = date && new Date(parseInt(date));
    const now = new Date();
    const dataAge = Math.round((now - stationsDate) / (1000 * 60)); // in minutes
    const tooOld = dataAge >= 1;
      if(tooOld){
          this.fetchData();
      } else {
          console.log(`Using data from localStorage that are ${dataAge} minutes old.`);
      }
  }

  fetchData() {

    this.setState({
            isLoading: true,
            stations: []
        })

      fetch('https://api.citybik.es/v2/networks/hubway?fields=stations')
      .then(res => res.json())
      .then(parsedJSON => console.log(parsedJSON.network.stations))
      .then(parsedJSON => parsedJSON.network.stations.map(station => (
        {
          name: `${network.station.name}`,
          free_bikes: `${network.station.free_bikes}`,
          empty_slots: `${network.station.empty_slots}`
      }
    )))
      .then(stations => this.setState({
        stations,
        isLoading: false
      }))
        .catch(error => console.log('parsing failed', error))
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('contacts', JSON.stringify(nextState.stations));
        localStorage.setItem('stationsDate', Date.now());
    }

    render() {
      const {isLoading, stations} = this.state;

        return (
            <div>
                <header>
                    <img src={image} />
                    <h1>Bike Rental Availability <button className="btn btn-sm btn-danger">Fetch now
                    </button>
                    </h1>
                </header>
                <div className={`content ${isLoading ? 'is-loading' : ''}`}>
                    <div className="panel-group">
                      {
                        !isLoading && stations.length > 0 ? stations.map(station => {
                          const {name, free_bikes, empty_slots} = station;
                          return
                          <Collapsible
                          key={station} title={name}>
                          <p>{free_bikes}<br />{empty_slots}</p>
                          </Collapsible>
                        }) : null

                      }
                    </div>
                      <div className="loader">
                        <div className="icon"></div>
                      </div>
                </div>
            </div>
        );
    }
}
export default App;
