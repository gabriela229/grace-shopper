import React from 'react';
import { connect } from 'react-redux';

const CategoriesList = ({ categories }) => {
  return (
    <div>
      <h1>
        Categories
      </h1>
    </div>
  );
}

const mapStateToProps = ({ categories }) => {
  return {
    categories
  };
};

export default connect(mapStateToProps)(CategoriesList);