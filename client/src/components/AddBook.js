import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries/queries";

class AddBook extends Component {
    state = {
        name: '',
        genre: '',
        authorId: '',
    }

    handleTextChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submitForm = e => {
        e.preventDefault();

        this.props.addBookMutation({
            variables: {
                name: this.state.name, 
                genre: this.state.genre, 
                authorId: this.state.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        })
    }

    displayAuthors = () => {
        const data = this.props.getAuthorsQuery;
        if (data.loading) { 
            return (<option disabled>Loading Authors</option>) 
        } else {
            return data.authors.map(author => ( <option key={author.id} value={author.id}>{author.name}</option>))
        }
    }

    render() {
        return (
            <form id="add-book" onSubmit={this.submitForm}>

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" name="name" onChange={this.handleTextChange}/>
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" name="genre" onChange={this.handleTextChange}/>
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select name="authorId" onChange={this.handleTextChange}>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);

