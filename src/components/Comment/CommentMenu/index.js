import React from 'react';

const CommentMenu = (props) => {
  const { menuRef, openEditor, openDeleteConfirm, toggleMenu } = props;

  const openEdit = () => {
    openEditor();
    toggleMenu();
  }

  const openDelete = () => {
    openDeleteConfirm();
    toggleMenu();
  }

  return (
    <div ref={ menuRef } className='menu-panel absolute mobile:right-10 z-50'>
      <button className='m-2 card-item' onClick={ openEdit } ><i className='far fa-edit' ></i> Edit</button>
      <hr></hr>
      <button className='m-2 card-item' onClick={ openDelete } ><i className='fas fa-trash' ></i> Delete</button>
    </div>
  );
}

export default CommentMenu;