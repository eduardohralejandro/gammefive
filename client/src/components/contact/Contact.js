import React, { Component, Fragment } from "react";
import axios from 'axios'


class Contact extends Component {
    state = {
        firstName: "",
        lastName: "",
        email: "",
        message:""
        
    }
    sendData =  async (e) => {
        e.preventDefault()

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }

      

        await axios.post('/api/contact', data).then(res => {

            
                if (res.status ===  200) {
                    this.setState({message:'you did it '})
                } else {
                    this.setState({message: 'it seams there was a problem, try again'})
                }
        }).catch(error => {
               return console.log('important error', error)
            })
          

 
        // await axios.post('/contact', data)
   
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render() {
    return (
      <Fragment>
        
            <form onSubmit={(e) => this.sendData(e)}>
                <input onChange={(e) => this.handleOnChange(e)} name="firstName" type='text' placeholder='name' />
                <input onChange={(e) => this.handleOnChange(e)} name="lastName" type='text'  placeholder='Lastname'/>
                <input onChange={(e) => this.handleOnChange(e)} name="email" type='email' placeholder="email" />
                <button>send</button>
            </form>
            <p>{this.state.message}</p>
      </Fragment>
    );
  }
}

export default Contact;
