import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
  {
    authors {
      id
      name
    }
  }
`;

class AddBook extends Component {

    displayAuthors = () => {
        const { data } = this.props;

        if (data.loading) { 
            return (<option disabled>Loading Authors</option>) 
        } else {
            return data.authors.map(author => ( <option key={author.id} value={author.id}>{author.name}</option>))
        }
    }

    render() {
        return (
            <form id="add-book">

                <div className="field">
                    <label>Book name:</label>
                    <input type="text" />
                </div>

                <div className="field">
                    <label>Genre:</label>
                    <input type="text" />
                </div>

                <div className="field">
                    <label>Author:</label>
                    <select>
                        <option>Select Author</option>
                        {this.displayAuthors()}
                    </select>
                </div>

                <button>+</button>
            </form>
        )
    }
}

export default graphql(getAuthorsQuery)(AddBook);

