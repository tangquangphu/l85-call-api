import React, { Component } from 'react';

//ProductListPage đảm nhiệm xuất ra List và Item
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';

//kết nối react và redux sử dụng để lấy dữ liệu trên store và thao tác trên reducer
import {connect} from 'react-redux';


// import callApi from './../../utils/apiCaller';

//Thẻ Link (nơi mà buton click dẫn đến routes)
import {Link} from 'react-router-dom';


//các action để lấy dữ liệu từ API lên store(reducer)
import {actFetchProductsRequest, actDeleteProductRequest} from './../../actions/index';


class ProductListPage extends Component {
  // constructor(props){
  //   super(props);
    
  // }
  componentDidMount(){
    // callApi('products','GET',null).then(res =>{
    //   // this.setState({
    //   //   products: res.data
    //   // });
    //   this.props.fetchAllProducts(res.data);
    // });
    this.props.fetchAllProducts();
    // console.log(this.props.fetchAllProducts);
    
  }
  onDelete = (id) => {
    //   var{products} = this.state;
    // callApi(`products/${id}`,'DELETE',null).then(res =>{
    //     // console.log(res);
    //     if(res.status === 200) {
    //         var index = this.findIndex(products, id);
    //         if( index !== -1){
    //             products.splice(index, 1);
    //             this.setState({
    //                 products :products
    //             });
    //         }
    //     }
    // });
    // console.log(id);
    this.props.onDeleteProduct(id);
  }
  // findIndex = (products, id) =>{
  //     var result = -1;
  //     products.forEach((product, index) =>{
  //       if(product.id === id){
  //           result = index;
  //       }
  //     });
  //     return result;
  // }

  render() {
    // var {products}=this.props;
    var products = this.props.products;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">

        {/* Add button */}
        {/* Đổi button thành Link */}
        <Link to="product/add"  className="btn btn-info mb-10">Thêm sản phẩm</Link>
        <a href="https://www.facebook.com/" className="btn btn-danger mb-10">facebook</a>
        {/* Product List */}
        <ProductList>
          {this.showProduct(products)}
        </ProductList>

      </div>
    );
  }

  //hiển thị produchItem
  showProduct(products){
    var result= null;
    if(products.length > 0){
      result = products.map((product, index) => {
        return (
          <ProductItem  key={index}
                        product={product}
                        index={index}
                        onDelete = {this.onDelete}
          ></ProductItem>
        );
      });
    }
    return result;
  }
}

const mapStateToProps = state =>{
  return {
    products : state.products
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    //lấy dữ liệu trên API để đẩy lên store
    fetchAllProducts : () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct : (id) => {
      dispatch(actDeleteProductRequest(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
