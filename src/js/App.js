import React from 'react';
import image from '../images/expand-vertical-4.svg';
import Collapsible from './Collapsible';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      bikes: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {

  }

    render() {
      const {isLoading, bikes} = this.state;

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
                        !isLoading && bikes.length > 0 ? bikes.map(bike => {
                          return <Collapsible title="Overview">
                              <p>Lorem ipsum dolor sit amet.</p>
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
