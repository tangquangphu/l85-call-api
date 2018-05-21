import React, { Component } from 'react';
import Link from 'react-router-dom/Link';


class ProductItem extends Component {

    onDelete =(id) => {
        // console.log(id);
        if(confirm('Bạn chắc chắn muốn xóa không ???')){ //eslint-disable-line
            // console.log(id);
            this.props.onDelete(id);
        }
        
    }

  render() {
      var {product, index} = this.props;
    //   console.log(product, index);
      
      var statusName = product.status ? "Còn hàng" : "Hết hàng" ;
      var statusClass = product.status ? "warning": "default" ;
    return (
        <tr>
            <td>{index + 1}</td>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
                <span className={`label label-${statusClass}`}>
                    {statusName}
                </span>
            </td>
            <td>
                <Link to={`/product/${product.id}/edit`} 
                        className="btn btn-success mr-10"
                >Sửa</Link>
                <Link to={`/product/${product.id}`} 
                        className="btn btn-warning mr-10"
                >Chi tiết</Link>
                <button type="button" 
                        className="btn btn-danger"
                        onClick={ () => this.onDelete(product.id)}
                >Xóa</button>
            </td>
        </tr>
    );
  }
}

export default ProductItem;
