/* eslint-disable no-useless-constructor */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { courseActions } from '../../actions/course.actions';

const styles = {
    card: {
        width: "344px",
        // height: "225px",
        borderRadius: "10px",
        backgroundColor: "#ffffff"
    },
    txt1: {
        fontFamily: 'Charter - Bold',
        fontSize: 14,
        fontWeight: 700,
        color: '#000000'
    },
    txt2: {
        color: '#000000',
        fontSize: 12,
        fontWeight: 400,
        textDecoration: 'underline',
        fontFamily: 'Charter - Roman',
        paddingRight: 15, 
    },
    txt3: {
        color: '#f32362',
        fontFamily: 'Charter - Roman',
        fontSize: 12,
        fontWeight: 400,
        textDecoration: 'underline'
    },
    doneBtn: {
        width: 344,
        height: 40,
        borderRadius: 10,
        backgroundColor: "#007de9",
        marginTop: 20,
    },
    cancelBtn: {
        width: 344,
        height: 40,
        borderRadius: 10,
        // backgroundColor: "#007de9",
        marginTop: 20,
        border: "1px solid #ffffff"
    },
    textInput: {
        width: 44,
        height: 40,
        border: '1px solid #d6d6d6',
        backgroundColor: '#ffffff',
        marginRight: 2
    },
    labelTxt: {
        color: '#000000',
        fontSize: 12,
        fontWeight: 400,
        fontFamily: 'Charter - Roman',
        paddingRight: 2
    }
}

class EditModal extends Component {
    constructor(props){
        super(props)
        this.state={
            editState: false,
            course: {
                id: '',
                courseName: '',
                description: ''
            }
        }
    }
    handleRename = () => {
        this.setState({
            editState: !this.state.editState
        })
    }
    handleChange = (e) => {
        const {name, value} = e.target
        const { course } = this.state
        this.setState({
            course: {
                ...course,
                [name]: value,
                id: this.props.course._id
            }
        });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const { course } = this.state
        // console.log(course)
        this.props.dispatch(courseActions.courseUpdate(course))
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div style={{display: 'block'}}>
                <div style={styles.card}>
                    <div className="col-sm-12" style={{padding:0, paddingTop:10, display: 'flex', alignItems: 'baseline'}}>
                        <div className="col-sm-6">
                            {   
                                !this.state.editState&&
                                <p style={styles.txt1}>
                                    {/* {this.props.course.courseName} */}
                                </p>
                            }
                            {   
                                this.state.editState&&
                                <input 
                                    type="text"
                                    name="courseName"
                                    onChange={this.handleChange}
                                    value={this.state.courseName}
                                />
                            }
                        </div>
                        <div className="col-sm-6" style={{textAlign: 'right'}}>
                            <a onClick={this.handleRename} style={styles.txt2}>Rename</a>
                            <a style={styles.txt3}>Delete</a>
                        </div> 
                    </div>
                    <div className="col-sm-12" style={{padding:0, paddingTop:10, display: 'flex', alignItems: 'baseline'}}>
                        <div className="col-sm-6">
                            <p style={styles.txt1}>Service Range*</p>
                        </div>
                        <div className="col-sm-6" style={{padding:0}}>
                            <div className="form-check" style={{padding:0}}>
                                <label style={{margin:0}}>
                                    <input type="radio" name="radio" defaultChecked="true"/> <span className="label-text">Everywhere</span>
                                </label>
                            </div>
                            <div className="form-check" style={{padding:0}}>
                                <label style={{margin:0}}>
                                    <input type="radio" name="radio"/> <span className="label-text">Specific Area</span>
                                </label>
                            </div>
                            <div style={{display: 'flex', paddingTop: 10}}>
                                <div>
                                    <span style={styles.labelTxt}>Hole</span>
                                    <input type="text" style={styles.textInput}/>
                                </div>
                                <div>
                                    <span style={styles.labelTxt}>to Hole</span>
                                    <input type="text" style={styles.textInput}/>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="col-sm-12" style={{padding:0, paddingTop:10, display: 'flex', alignItems: 'baseline'}}>
                        <div className="col-sm-6">
                            {/* <p style={styles.txt1}>Description</p> */}
                            <div className="form-group">
                                <p style={styles.txt1}>Description</p>
                                {   
                                    !this.state.editState&&
                                    <textarea className="form-control" rows="5" style={{width: 310}}></textarea>
                                }
                                {   
                                    this.state.editState&&
                                    <textarea 
                                        className="form-control" 
                                        rows="5" 
                                        style={{width: 310}}
                                        onChange={this.handleChange}
                                        value={this.state.description}
                                        name="description"
                                    ></textarea>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="submit" className="btn btn-primary" style={styles.doneBtn}>
                        <p style={{color: 'white'}}>Done</p>
                    </button>
                </div>
                <div>
                    <button type="button" onClick={this.props.handleEditClose} className="btn btn-default" style={styles.cancelBtn}>
                        <p style={{color: 'white'}}>Cancel</p>
                    </button>   
                </div>
            </div>
            </form>
        );
    }
}
EditModal.propTypes = {
    dispatch: PropTypes.func.isRequired
}

export default connect()(EditModal);