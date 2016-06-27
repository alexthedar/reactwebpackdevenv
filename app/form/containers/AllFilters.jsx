'use strict'

import React, { Component } from 'react'
import {CheckBoxWrapper, RadioButtonWrapper, DropDownWrapper, DateWrapper} from './FilterWrappers'
import _ from 'lodash'
import update from 'react-addons-update'


export default class AllFilters extends Component{
  constructor(props){
    super(props);
  }

  getFiltersArray(filters){
    return filters.map(filter => {
      let filterInfo = { ...filter}
      return <Filter
              key={filter.name}
              ref={filter.name}
              filterInfo={filterInfo}
              value={this.props.value}
              selectionValues={this.props.selectionValues}/>

    })
  }
  render(){
    let filtersArray = this.getFiltersArray(this.props.reportInfo.primary_filters);
    console.log(filtersArray)
    return(
      <div>
        {filtersArray}
      </div>
    )
  }
}

export class Filter extends Component{
  constructor(props){
    super(props);
    this.state={
      value: this.props.value
    }
  }
  render(){
    let filter=getFilter(this)
    return(
      <fieldset>
        <legend htmlFor={this.props.filterInfo.name}>
          {this.props.filterInfo.name}
        </legend>
        {filter}
        <br />
      </fieldset>
    )
  }
}

function getFilter(data){
    let filter;
    let options = data.props.filterInfo.options
    let type = data.props.filterInfo.type

    switch (options.length) {
      case 1:
      case 2:
        filter = <RadioButtonWrapper {...data.props} />
        break;
      case 3:
      case 4:
      case 5:
      filter = <CheckBoxWrapper {...data.props} />
        break;
      case 6:
        break;
      default:
      filter = <DropDownWrapper {...data.props}/>
    }
    if(type === 'date'){
      filter = <DateWrapper {...data.props}/>}
    return filter;
  }
