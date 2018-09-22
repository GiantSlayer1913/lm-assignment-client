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
    this.fetchData();
  }

  fetchData() {
      fetch('https://api.citybik.es/v2/networks/hubway?fields=stations')
      .then(res => res.json())
      .then(parsedJSON => parsedJSON.network.map(station => (
        {
          name: `${station.name}`
        }
      ))
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
