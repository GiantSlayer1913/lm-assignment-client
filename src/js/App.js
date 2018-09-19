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

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

      fetch('https://api.citybik.es/v2/networks/hubway?fields=stations')
      .then(res => res.json())
      .then(parsedJSON => console.log(parsedJSON.network.stations))
      .then(parsedJSON => parsedJSON.networks.map(station => (
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
                          return <Collapsible key={station} title={name}>
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
