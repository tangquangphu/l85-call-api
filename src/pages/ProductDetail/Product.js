import React, { Component } from 'react';
// import ProductItem from '../ProductItem/ProductItem';

import callApi from './../../utils/apiCaller';
class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // đặt tên phải trùng với name
      id :'',
      txtName : '',
      txtPrice : '',
      chkbStatus : ''
    }
  }
  componentDidMount(){
    var {match} = this.props;
    if(match){
      //lấy params
        var id = match.params.id;
        console.log(id);
        callApi(`products/${id}`, 'GET', null).then(res =>{
          //  console.log(res.data);
          var data = res.data;
          this.setState({
            id: data.id,
            txtName : data.name,
            txtPrice: data.price,
            chkbStatus : data.status
          });
          
        });
        
    }
  }
  render() {
    var {txtName, txtPrice, chkbStatus } = this.state;
    
    return (
        <div >
        
            {txtName} - {txtPrice} - {chkbStatus ? 'còn hàng' : 'hết hàng'} 

        </div>
    );
  }
}

export default Product;
