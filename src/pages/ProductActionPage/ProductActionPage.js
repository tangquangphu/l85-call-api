import React, { Component } from 'react';

//API
// import callApi from './../../utils/apiCaller';

import {Link} from 'react-router-dom';

import {actAddProductRequest,actGetProductRequest, actUpdateProductRequest} from './../../actions/index';
import {connect} from 'react-redux';

class ProductActionPage extends Component {
  //tạo state để hứng giá trị ô input
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
  //cập nhật sản phẩm
  //hàm này chỉ là lấy sản phẩm chi tiết ra 
  componentDidMount(){
    var {match} = this.props;
    if(match){
      //lấy params
        var id = match.params.id;
        console.log(id);
        // callApi(`products/${id}`, 'GET', null).then(res =>{
        //    console.log(res.data);
        //   var data = res.data;
        //   this.setState({
        //     id: data.id,
        //     txtName : data.name,
        //     txtPrice: data.price,
        //     chkbStatus : data.status
        //   });
        // });
        this.props.onEditProduct(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.itemEditing){
      var {itemEditing} = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName : itemEditing.name,
        txtPrice : itemEditing.price,
        chkbStatus : itemEditing.status
      });
    }
  }
  onChange =(e) => {
    var target = e.target;
    var name = target.name;
    var value= target.type ==='checkbox' ? target.checked :target.value;
    this.setState({
      [name] : value
    });
  }

  //thêm và update dữ liệu
  onSave = (e) => {
    //state này là từ dữ liệu ô input
    // console.log(this.state);
    var {id,txtName, txtPrice, chkbStatus } = this.state;
    var {history} =this.props;
    e.preventDefault();
    var product = {
      id: id,
      name: txtName,
      price : txtPrice,
      status : chkbStatus
    };
    if(id){  //update dữ liệu
      // console.log('Updating.....');
      // callApi(`products/${id}`, 'PUT',{
      //   name : txtName,
      //   price : txtPrice,
      //   status : chkbStatus
      // }).then(res =>{
      //   history.goBack();
      //   console.log('Updated');
      // });
      this.props.onUpdateProduct(product);
  
    }else{
    //thêm dữ liệu
    // callApi('products','POST',{
    //   name : txtName,
    //   price : txtPrice,
    //   status : chkbStatus
    // }).then(res => {
    //   console.log(res);
    //   history.goBack();
    //   // history.push("/");
    // });
    this.props.onAddProduct(product);
    
    }
    history.goBack();
  }
  render() {
    var {txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
        
        <div className="panel panel-info">

            <div className="panel-heading">
              <h3 className="panel-title">Form</h3>
            </div> {/* heading */}

            <div className="panel-body">
              <form onSubmit={ this.onSave}>
                <div className="form-group">
                  <label >Tên sản phẩm</label>
                  <input  type="text" 
                          className="form-control" 
                          name="txtName"
                          value={txtName}
                          onChange={this.onChange}
                          />
                </div>

                <div className="form-group">
                  <label >Giá sản phẩm</label>
                  <input  type="number" 
                          className="form-control" 
                          name="txtPrice"
                          value={txtPrice}
                          onChange={this.onChange}
                          />
                </div>

                <div className="form-group">
                  <label>Trạng thái: </label>
                </div>
                <div className="checkbox">
                  <label >
                    <input type="checkbox" 
                           name="chkbStatus"
                           value={chkbStatus}
                           onChange={this.onChange}
                           checked = {chkbStatus}
                           /> Còn hàng
                  </label>
                </div>

                <button type="submit" className="btn btn-primary mr-10">Lưu</button>
                <Link to="/product-list" className="btn btn-danger">Trở lại</Link>
              </form>
            </div> {/* body */}
        </div> {/* panel */}
      
      </div>
    );
  }
}
const mapsStateToProps = (state)=> {
  return {
    itemEditing : state.itemEditing
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    onAddProduct : (product) => {
      dispatch(actAddProductRequest(product));
    },
    onEditProduct: (id) => {
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct : (product) => {
      dispatch(actUpdateProductRequest(product));
    }
  }
}

export default connect(mapsStateToProps,mapDispatchToProps)(ProductActionPage);
