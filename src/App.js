import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Loader from './Components/Loader/Loader';
import Verses from './Components/Verses/Verses';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acc_token: '',
      chapters: [],
      currentPage: '',
      verses: [],
    }
    const url = 'http://gita-backend.glitch.me/get_token';
    const options = {
      mode: 'cors',
    }
    
    fetch(url, options)
    .then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          this.setState({
            acc_token: data.access_token,
          });
          this.getChapters(data.access_token);
        });
      } else {
        console.log('Error occured. Try again later.');
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  updatePage = (page) => {
    this.setState({
      currentPage: page,
    })
  }

  // Get chapters And verses
  getChapters = (token) => {
    const url = `https://bhagavadgita.io/api/v1/chapters?access_token=${token}`;
    const options = {
        'mode': 'cors',
    }
    fetch(url, options)
    .then((res) => {
        if(res.ok) {
             res.json().then((data) => {
                this.setState({
                    chapters: data,
                });
                const script = document.createElement('script');
                script.innerHTML = `
                    $('.modal').modal(); 
                `;
                document.body.appendChild(script);
                return;
             });
        } else {
            console.log('Error in retrieving chapters');
        }
    })
    .catch((err) => {
        console.log('Chapters error', err);
    });
  }

  updateVerses = () => {
    console.log('Hello');
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar />
          <main className='container'>
            <Route exact path='/gita/' render={(props) => <Home {...props} updatePage={this.updatePage} chapters={this.state.chapters} currentPage={this.state.currentPage}/>} />
            <Route exact path='/gita/about' render={(props) => <h2>about</h2>} />
            <Route exact path='/gita/source' render={(props) => <h2>Sources</h2>} />
            <Route exact path='/gita/verses/:ch' render={(props) => <Verses updateVerses={this.updateVerses} {...props} verses={this.state.verses} />} />
          </main>
          <Loader nChapters={this.state.chapters.length} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
