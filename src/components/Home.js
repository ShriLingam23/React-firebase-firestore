import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import firebase from '../Firebase';

class Home extends Component{

    constructor(props) {
        super(props);

        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;

        this.state = {
          boards: []
        };
    }
    
    onCollectionUpdate = (querySnapshot) => {
        //Used to store array of boards from firestore database
        const boards = [];
        
        //querySnapshot it's the data returned from firebase
        querySnapshot.forEach((doc) => {
            
            //doc is single entry in the collection called document
            //Here we are deconstructing the json object
            const { title, description, author } = doc.data();
            
            //Pushing an object into the array
            boards.push({
                key: doc.id,
                doc, // DocumentSnapshot
                title,
                description,
                author,
            });
            
            
        });

        //Finally setting the state
        this.setState({
            boards
        });
    }
    
    componentDidMount() {
        //Here we are listening for the realtime updates ie:onSnapshot()
        //We pass the method that perform some actions when there is any updates
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }


    render() {
        return (
          <div class="container">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title">
                  BOARD LIST
                </h3>
              </div>
              <div class="panel-body">
                <h4><Link to="/create">Add Board</Link></h4>
                <table class="table table-stripe">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Author</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.boards.map(board =>
                      <tr>
                        <td><Link to={`/show/${board.key}`}>{board.title}</Link></td>
                        <td>{board.description}</td>
                        <td>{board.author}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
    }


}

export default Home;
