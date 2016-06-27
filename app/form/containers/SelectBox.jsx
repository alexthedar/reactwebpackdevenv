'use strict'

import React, { Component } from 'react'
import AllFilters from './AllFilters'
import _ from 'lodash'
import update from 'react-addons-update'


// const data = require('../../mockaroodata')
// LOAD DATA Current in Temp
const jsonData = require('json!../../../fakedata/FAKEDATA4.json');
let DATA = jsonData;
//end load data

export default class SelectBox extends Component{
  constructor(){
    super();
    this.state = {
      reportId: '',
      reportInfo:'',
      showFilters:'',
      submitted: null
    }
    this.dropdownSelect = this.dropdownSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  dropdownSelect(e){
    e.preventDefault();
    let value = e.currentTarget.value;
    this.setState({
      reportId: value ,
      showFilters: (DATA[value].primary_filters) ? true : false,
      reportInfo: DATA[value],
      selectionValues: []
    });
  }

  handleChange(e){
    let val = e.target.value;
    let arr = this.state.selectionValues;
    _.includes(arr, val)? this.removeValue(arr, val): this.addValue(arr, val);
  }

  addValue(arr, val){
    let newArr = arr.concat([val]);
    this.setState({
      selectionValues: newArr
    })
  }

  removeValue(arr, val){
    let index = _.indexOf(arr, val);
    let newArr = update(arr, {$splice: [[index, 1]]})
    this.setState({
      selectionValues: newArr
    })
  }

  handleSubmit() {
    if (this.refs.reportFilterForm.isValid()) {
      this.setState({submitted: this.refs.reportFilterForm.getFormData()})
    }
  }

  getOptions(data){
    //need id to find filters
    return data.map((option, index) => {
                      var props = { ...option}
                      return  <option
                        key={index}
                        value={index}
                        >{option.report_name}
                      </option>
                    });
  }

  getAllFilters(){
    var t = <div className="well col-sm-8 col-sm-push-1">
            <section>
              <button onClick={this.handleSubmit} className="btn btn-block btn-primary">Submit</button>
            </section>
            <br />
            <section>
              <AllFilters
                handleSubmit={this.handleSubmit}
                reportInfo = {this.state.reportInfo}
                selectionValues={this.state.selectionValues}
                onChange={this.handleChange}/>
            </section>
          </div>
          debugger
          return t
  }

  render(){
    //temporary
    if (this.state.submitted !== null) {
      submitted = <div className="alert alert-success">
        <p> data:</p>
        <pre><code>{JSON.stringify(this.state.submitted, null, '  ')}</code></pre>
      </div>
    }
    //end temp

    var submitted, allFilters;
    let options = this.getOptions(DATA);
    allFilters = this.state.showFilters ? this.getAllFilters() : '';

    return(
        <div>
        <form>
          <div className="col-sm-4">
          <div className="row">
            <label htmlFor="reportSelect">Reports Label</label>
                <select id="reportSelect" className="form-control" placeholder="Select Report"  onChange={this.dropdownSelect}>{options}
                </select>
          </div>
          <div className="row">
              <small className="text-muted">
                Additional Text: {this.state.showFilters.toString()}
              </small>
          </div>
        </div>
          {allFilters}
        </form>
        {submitted}
        </div>
    )
  }
}

//convert string to bool
function boolConvert(data){
  let isTrue = (data === 'true');
  return isTrue;
}
