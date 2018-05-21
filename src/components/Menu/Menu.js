import React, { Component } from 'react';

import {Route, Link} from 'react-router-dom';

const menus=[
    {
        name: 'Trang chủ',
        to : '/',
        exact :true
    },
    {
        name: 'Quản Lý Sản phẩm',
        to : '/product-list',
        exact :false
    },
];

//custom menuLink có công dụng là active khi click
const MenuLink = ({label, to, actionOnlyWhenExact}) => {
    return(
        <Route
            path={to}
            exact={actionOnlyWhenExact}
            children={ ({match}) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                );
            }}
        ></Route>
    );
};

class Menu extends Component {
  render() {
    return (
        <div className="navbar navbar-default" >
            <a className="navbar-brand" >CALL API</a>
            <ul className="nav navbar-nav">
                {this.showMenus(menus)}
            </ul>
        </div>
    );
  }

  //hiển thị menu
  showMenus= (menus) => {
      var result = null;
      if( menus.length >0) {
          result= menus.map((menu, index) =>{
            return (
                <MenuLink   key={index}
                            label={menu.name}
                            to={menu.to}
                            actionOnlyWhenExact={menu.exact}
                ></MenuLink>
            );  
          });
      }
      return result;
  }
}

export default Menu;
