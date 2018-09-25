import React from 'react';

import Auxi from '../../hoc/Auxi'

const layout = ( props ) => {
  return (
    <Auxi>
      <div>Toolbar, SideDrawer, Backdrop</div>
      <main>
        {props.children}
      </main>
    </Auxi>
  );
};

export default layout;
