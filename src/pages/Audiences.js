import React from 'react';

import {MenuCard} from '../components';

const AllAudience = () => {
  
  return(
    <div className="audiences container row">
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Men" image='https://bordoni.be/wp-content/uploads/2020/01/errere.jpg' url={'/audience/Men'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Women" image='https://img01.ztat.net/article/spp-media-p1/821092f38a3b391a91d5f3e725b61b96/b5acb29bc59243779d780f1473f52826.jpg?imwidth=1800' url={'/audience/Women'} />
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        <MenuCard title="Kids" image='https://www.ralphlauren.eu/on/demandware.static/-/Library-Sites-RalphLauren_EU_Library/default/dw1ed37fe4/img/202011/11102020-eu-kids-lp-holiday-dressing-casual/20201110_kids_lp_c03_banner.jpg' url={'/audience/Kids'} />
      </div>
    </div>
  );
};

export default AllAudience;