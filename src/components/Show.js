import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../Firebase';


class Show extends Component{

    constructor(props) {
        super(props);
        this.state = {
          board: {},
          key: ''
        };
    }
    
    componentDidMount() {

        //We are pointingto a specific document in the collection
        //Basically property id holds the document id, so we can uniquely point out to a particular document
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);

        //We use get() method to retrive the particular document
        ref.get().then((doc) => {

            //check whether doc exists
            if (doc.exists) {

                this.setState({
                //doc.data() returns a JSON object
                board: doc.data(),
                key: doc.id,
                isLoading: false
                });
            } 
            else {
                console.log("No such document!");
            }
        });
    }
    
    delete(id){
        //To a particular document we call the method delete()
        firebase.firestore().collection('boards').doc(id).delete().then(() => {

            console.log("Document successfully deleted!");
            this.props.history.push("/")

        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }
    
    render() {

        return (
            <div class="container">
                <div class="panel panel-default">

                    <div class="panel-heading">
                    <h4><Link to="/">Board List</Link></h4>
                        <h3 class="panel-title">
                        {this.state.board.title}
                        </h3>
                    </div>

                    <div class="panel-body">
                        <dl>
                        <dt>Description:</dt>
                        <dd>{this.state.board.description}</dd>
                        <dt>Author:</dt>
                        <dd>{this.state.board.author}</dd>
                        </dl>
                        <Link to={`/edit/${this.state.key}`} class="btn btn-success">Edit</Link>&nbsp;
                        <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        );
    }

}

export default Show;
