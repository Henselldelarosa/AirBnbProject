const Fab = props => {
  return (
    <div className={props.hidden ? 'fab is-hidden' : 'fab'} onClick={props.onClick}>
      <span aria-label="add a spot" role="img" className="fab-symbol">➕</span>
    </div>
  );
};

export default Fab;
