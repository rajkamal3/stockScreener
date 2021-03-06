import React, { Component } from 'react';
import axios from 'axios';
import parse from 'node-html-parser';
import styles from './invest.module.css';

class IndicesSchema extends Component {
    constructor(props) {
        super(props);

        this.state = {
            indices: {
                
            }
        }
    }

    componentDidMount() {
        const header = {
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Origin": "*",
            "User-Agent": "PostmanRuntime/7.22.0",
            "Accept": "*/*",
            "Postman-Token": "6dd814e9-4517-4ab3-8b14-0d4630576312",
            "X-Frame-Options": "SAMEORIGIN"
        }

        axios.get(this.props.link, header).then(res => {
            const parsed = parse(res.data);
            
            let nifty = parsed.querySelector('#market_action').querySelectorAll('tr')[1].querySelectorAll('td')[1].querySelector('b');
            let niftyPointChange = parsed.querySelector('#market_action').querySelectorAll('tr')[1].querySelectorAll('td')[2];
            let niftyPercentageChange = parsed.querySelector('#market_action').querySelectorAll('tr')[1].querySelectorAll('td')[3];
            let sensex = parsed.querySelector('#market_action').querySelectorAll('tr')[2].querySelectorAll('td')[1].querySelector('b');
            let sensexPointChange = parsed.querySelector('#market_action').querySelectorAll('tr')[2].querySelectorAll('td')[2];
            let sensexPercentageChange = parsed.querySelector('#market_action').querySelectorAll('tr')[2].querySelectorAll('td')[3];

            this.setState({
                indices: {
                    "sensex": sensex.innerHTML,
                    "sensexPointChange": sensexPointChange.innerHTML,
                    "sensexPercentageChange": sensexPercentageChange.innerHTML,
                    "nifty": nifty.innerHTML,
                    "niftyPointChange": niftyPointChange.innerHTML,
                    "niftyPercentageChange": niftyPercentageChange.innerHTML,
                    "niftyMidcap": '',
                    "niftySmallcap": ''
                }
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    render () {
        const anchorStyles = {
            color: 'white',
            fontWeight: 'bold',
            textDecoration: 'none'
        };

        return (
            <div className={styles.indices}>
                <div>
                    <a className='indexName' style={anchorStyles} target='_blank' href={'http://www.google.com/search?q=nifty50'}>Nifty: {this.state.indices.nifty} {this.state.indices.niftyPointChange} {this.state.indices.niftyPercentageChange}%</a>
                </div>
                <div>
                    <a className='indexName' style={anchorStyles} target='_blank' href={'http://www.google.com/search?q=sensex'}>Sensex: {this.state.indices.sensex} {this.state.indices.sensexPointChange} {this.state.indices.sensexPercentageChange}%</a>
                </div>
            </div>
        )
    }

}

export default IndicesSchema;
