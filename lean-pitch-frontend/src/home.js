import Axios from 'axios';
import React, { Component } from 'react';
// import Category from './admin/category/Categoy';
import { Spinner } from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contents: [],
        };
        this.contentCompleted = this.contentCompleted.bind(this);
    }
    componentDidMount() {
        Axios.get('http://localhost:9999/allContent', { withCredentials: true }).then((res) => {
            this.setState({
                contents: res.data
            })
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    contentCompleted(id) {
        const req = {
            contentId: id,
            isCompleted: true
        };
        axios.post('http://localhost:9999/userContent', req, { withCredentials: true }).then(res => {
            console.log("clicked,", res);
        }).catch(error => {
            console.log('Error: ', error);
            this.setState({
                errorMessage: 'Incorrect info'
            });
        });
    }
    render() {
        return (
            <div className="background">

                <div className="jumbotron text-center">
                    <h2>Welcome</h2>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <h2>Contents</h2>
                        </div>
                    </div>

                    <div className="row mt-3">
                        {this.state.contents.length > 0 ?
                            this.state.contents.map((data, index) => {
                                console.log("data", data);
                                return (
                                    <div className="col-4 mb-3" key={index}>
                                        <div className="card" >
                                            <img className="card-img-top" src={data.content} alt="" height="200" width="250" />
                                            <h5 className="card-title">{data.content.text}</h5>
                                            <div className="card-body">
                                                <button className="btn btn-info btn-sm" onClick={() => this.contentCompleted(data._id)}>Completed</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            : <div ><Spinner color="primary" /></div>
                        }
                    </div>
                </div>
            </div>

        );
    }
}
export default Home;