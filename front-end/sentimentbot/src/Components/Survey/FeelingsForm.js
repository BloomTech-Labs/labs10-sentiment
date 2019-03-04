import React from 'react';
import { connect } from 'react-redux';

import { getPreFeeling } from "../../actions/preFeelings";
import { addPreFeeling } from "../../actions/preFeelings";
import { editPreFeeling } from "../../actions/preFeelings";
import { deletePreFeeling } from "../../actions/preFeelings";
import { fetchSinglePreFeeling } from "../../actions/preFeelings";


class PreFeelingList extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  }
    componentDidMount() {
        this.props.fetchSinglePreFeeling();
    }

    render() {
        return (
            <div>
                { !this.props.getPreFeeling && this.props.prefeelings.length ? 
                <ul>
                    {this.props.prefeelings.map(prefeeling =>
                        <li key={prefeeling.id}>
                            <p>{prefeeling.feeling_text}</p>
                        </li>
                    )}
                </ul> : null
                } 
            </div>
        );
    }
}
function mapStateToProps(state) {
  return {
    prefeelings: state.preFeelingReducer.prefeelings,
    isFetching: state.preFeelingReducer.isFetching,
    error: state.preFeelingReducer.error,
    singlePreFeelings: state.preFeelingReducer.singlePreFeeling,
  };
}
export default connect(
  mapStateToProps,{
    getPreFeeling,
    addPreFeeling,
    editPreFeeling,
    deletePreFeeling,
    fetchSinglePreFeeling, 
  }
  )(PreFeelingList);
