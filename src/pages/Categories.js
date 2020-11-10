import React from 'react';

import {MenuCard} from '../components';

const Categories = () => {
  
  return(
    <div className="categories container row">
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="T-shirts" image='https://cdn.zeeman.com/media/catalog/product/cache/5050dbc22447fab33b3d2c8a729076f7/2/0/2020087789498_Front_01.jpg' url={'/category/Tshirts'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Shirts" image='https://cf75d1d9c.cloudimg.io/crop_px/0,0,1800,2700-483/n/imageserver/original/DM0DM04406973_973BRIGHR%20COBA.jpg' url={'/category/Shirts'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Sweaters" image='https://media.s-bol.com/mBN9gpZ4oPn/550x601.jpg' url={'/category/Sweaters'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Pants" image='https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80' url={'/category/Pants'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Underpants" image='https://img01.ztat.net/article/spp-media-p1/4d33ed15e10135449531f97550260ef8/3d937f499e3444f5855984e4f312b3ec.jpg?imwidth=1800&filter=packshot' url={'/category/Underpants'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Socks" image='https://img01.ztat.net/article/spp-media-p1/0cbfb1030bcb3bdcb254ba95eeb24344/1427f9b07eca41f3a119b845cb6f389f.jpg?imwidth=1800' url={'/category/Socks'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Shoes" image='https://img01.ztat.net/article/spp-media-p1/e55a06fef7d93746af7275be2782a6ca/661044678b5d46ffb8a7dcdb86c4c013.jpg?imwidth=1800' url={'/category/Shoes'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Bags" image='https://img01.ztat.net/article/spp-media-p1/e1beb6b3de923351a023142eb7833874/f7f0f6ec4c3e4f00a65259c10fa3796a.jpg?imwidth=1800' url={'/category/Bags'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Hats" image='https://img01.ztat.net/article/spp-media-p1/b0b3d9f3fc3e38d5983b40859136411c/4d4591e1061f44cb85c356d35cee82f2.jpg?imwidth=1800' url={'/category/Hats'} />
      </div>
    </div>
  );
};

export default Categories;