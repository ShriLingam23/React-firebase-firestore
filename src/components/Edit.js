import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../Firebase';

class Edit extends Component {


    constructor(props) {

        super(props);

        this.state = {
            key: '',
            title: '',
            description: '',
            author: ''
        };
    }

    componentDidMount() {
        
        //First we retrive the particular doc using get()
        const ref = firebase.firestore().collection('boards').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const board = doc.data();
                this.setState({
                    key: doc.id,
                    title: board.title,
                    description: board.description,
                    author: board.author
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ board: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        //Deconstructing the json object
        const { title, description, author } = this.state;

        //We use set() to update the particular doc which is refered through doc.id
        //we pass the JSON object similar to that of add()
        const updateRef = firebase.firestore().collection('boards').doc(this.state.key);
        updateRef.set({
            title,
            description,
            author
        }).then((docRef) => {
            this.setState({
                key: '',
                title: '',
                description: '',
                author: ''
            });
            this.props.history.push("/show/" + this.props.match.params.id)
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        return (
            <div class="container">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">
                            EDIT BOARD
                </h3>
                    </div>
                    <div class="panel-body">
                        <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Board List</Link></h4>
                        <form onSubmit={this.onSubmit}>
                            <div class="form-group">
                                <label for="title">Title:</label>
                                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.onChange} placeholder="Title" />
                            </div>
                            <div class="form-group">
                                <label for="description">Description:</label>
                                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
                            </div>
                            <div class="form-group">
                                <label for="author">Author:</label>
                                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
                            </div>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }


}

export default Edit;
